import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

admin.initializeApp();
const db = admin.database();

async function sendExpoPush(token, title, body, data = {}) {
  if (!token) return null;
  const url = functions.config().expo?.push_url || 'https://exp.host/--/api/v2/push/send';
  try {
    const msg = { to: token, title, body, data, sound: 'default' };
    const res = await axios.post(url, msg, { headers: { 'Content-Type': 'application/json' } });
    return res.data;
  } catch (err) {
    console.error('sendExpoPush error', err?.response?.data || err.message);
    return null;
  }
}

async function sendFCM(token, title, body, data = {}) {
  if (!token) return null;
  try {
    await admin.messaging().send({
      token,
      notification: { title, body },
      data: Object.entries(data || {}).reduce((acc, [k, v]) => { acc[k]=String(v); return acc; }, {})
    });
  } catch (err) {
    console.error('sendFCM error', err);
  }
}

exports.autoDispatchOnOrderCreate = functions.region('us-central1').database.ref('/orders/{orderId}').onCreate(async (snap, ctx) => {
  const orderId = ctx.params.orderId;
  const order = snap.val();
  if (!order) return null;
  const pickupLat = order.pickupLat ?? order.pickup?.lat ?? null;
  const pickupLng = order.pickupLng ?? order.pickup?.lng ?? null;
  if (pickupLat == null || pickupLng == null) {
    await db.ref(`/orders/${orderId}`).update({ status: 'WaitingForPickupCoords' });
    return null;
  }
  if (order.assignedRiderId) return null;

  const ridersSnap = await db.ref('/riders').once('value');
  const riders = ridersSnap.val() || {};
  const riderEntries = Object.entries(riders).filter(([id, r]) => r && r.available === true && r.lat != null && r.lng != null);
  if (riderEntries.length === 0) {
    await db.ref(`/orders/${orderId}`).update({ status: 'WaitingForRider', updatedAt: Date.now() });
    return null;
  }

  const origins = `${pickupLat},${pickupLng}`;
  const destinations = riderEntries.map(([id, r]) => `${r.lat},${r.lng}`).join('|');
  const apiKey = functions.config().google?.apikey;
  if (!apiKey) return null;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origins)}&destinations=${encodeURIComponent(destinations)}&key=${apiKey}&mode=driving`;

  let response;
  try {
    response = await axios.get(url);
  } catch (err) {
    console.error('Distance Matrix error', err?.response?.data || err.message);
    return null;
  }

  const elements = response.data?.rows?.[0]?.elements || [];
  if (!elements.length) return null;

  let bestIndex = -1;
  let bestTime = Number.POSITIVE_INFINITY;
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const eta = el?.duration?.value;
    if (typeof eta === 'number' && eta < bestTime) {
      bestTime = eta;
      bestIndex = i;
    }
  }
  if (bestIndex === -1) return null;
  const bestRiderId = riderEntries[bestIndex][0];

  const riderRef = db.ref(`/riders/${bestRiderId}`);
  const txn = await riderRef.transaction((r) => {
    if (r && r.available === true) {
      r.available = false;
      r.currentOrder = orderId;
      return r;
    }
    return;
  }, undefined, false);

  if (!txn.committed) {
    await db.ref(`/orders/${orderId}`).update({ status: 'WaitingForRider', updatedAt: Date.now() });
    return null;
  }

  await db.ref(`/orders/${orderId}`).update({
    assignedRiderId: bestRiderId,
    assignedAt: Date.now(),
    status: 'Assigned',
    estimatedEtaSeconds: bestTime
  });

  const riderNode = (await riderRef.once('value')).val();
  const pushToken = riderNode?.pushToken || riderNode?.expoPushToken || riderNode?.fcmToken || null;
  if (pushToken) {
    const title = 'New Delivery Assigned';
    const body = `Order ${orderId} assigned to you. Pickup nearby.`;
    if (String(pushToken).startsWith('ExponentPushToken')) {
      await sendExpoPush(pushToken, title, body, { orderId });
    } else {
      await sendFCM(pushToken, title, body, { orderId });
    }
  }

  await db.ref(`/events/${Date.now()}_${orderId}`).set({ type: 'assignment', orderId, riderId: bestRiderId, time: Date.now(), etaSeconds: bestTime });
  return null;
});

exports.getEtaForOrder = functions.region('us-central1').https.onCall(async (data, ctx) => {
  const orderId = data.orderId;
  if (!orderId) throw new functions.https.HttpsError('invalid-argument', 'orderId required');
  const orderSnap = await db.ref(`orders/${orderId}`).once('value');
  const order = orderSnap.val();
  if (!order || !order.assignedRiderId) throw new functions.https.HttpsError('not-found', 'order or assigned rider not found');
  const riderId = order.assignedRiderId;
  const riderSnap = await db.ref(`riders/${riderId}`).once('value');
  const rider = riderSnap.val();
  if (!rider || rider.lat == null || rider.lng == null) throw new functions.https.HttpsError('not-found', 'rider location not found');
  const destLat = order.destination?.lat ?? order.destinationLat ?? null;
  const destLng = order.destination?.lng ?? order.destinationLng ?? null;
  if (destLat == null || destLng == null) throw new functions.https.HttpsError('invalid-argument', 'destination missing');
  const origin = `${rider.lat},${rider.lng}`;
  const destination = `${destLat},${destLng}`;
  const apiKey = functions.config().google?.apikey;
  if (!apiKey) throw new functions.https.HttpsError('failed-precondition', 'Google API key not configured');
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}&mode=driving`;
  const resp = await axios.get(url);
  const element = resp.data?.rows?.[0]?.elements?.[0];
  if (!element) throw new functions.https.HttpsError('internal', 'Distance matrix response invalid');
  const etaSeconds = element.duration?.value ?? null;
  const distanceMeters = element.distance?.value ?? null;
  await db.ref(`orders/${orderId}`).update({ etaSeconds, distanceMeters, lastEtaUpdate: Date.now() });
  return { etaSeconds, distanceMeters };
});

exports.onRiderNodeChange = functions.region('us-central1').database.ref('/riders/{riderId}').onWrite(async (change, ctx) => {
  const riderId = ctx.params.riderId;
  const after = change.after.val();
  const before = change.before.val();
  if (!after) return null;
  const currentOrder = after.currentOrder;
  if (!currentOrder) return null;
  if (before && before.lat === after.lat && before.lng === after.lng) return null;
  const destLat = (await db.ref(`orders/${currentOrder}/destination/lat`).once('value')).val();
  const destLng = (await db.ref(`orders/${currentOrder}/destination/lng`).once('value')).val();
  if (destLat == null || destLng == null) return null;
  const apiKey = functions.config().google?.apikey;
  if (!apiKey) return null;
  const origin = `${after.lat},${after.lng}`;
  const destination = `${destLat},${destLng}`;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}&mode=driving`;
  try {
    const resp = await axios.get(url);
    const element = resp.data?.rows?.[0]?.elements?.[0];
    if (!element) return null;
    const etaSeconds = element.duration?.value ?? null;
    const distanceMeters = element.distance?.value ?? null;
    await db.ref(`orders/${currentOrder}`).update({ etaSeconds, distanceMeters, lastEtaUpdate: Date.now() });
    const thresholdMeters = 300;
    if (distanceMeters != null && distanceMeters <= thresholdMeters) {
      const notified = (await db.ref(`orders/${currentOrder}/proximityNotified`).once('value')).val();
      if (!notified) {
        const orderSnap = await db.ref(`orders/${currentOrder}`).once('value');
        const order = orderSnap.val();
        const customerToken = order?.customerPushToken || null;
        const msg = `Your rider is nearby (${Math.round(distanceMeters)} m).`;
        if (customerToken) {
          if (String(customerToken).startsWith('ExponentPushToken')) {
            await sendExpoPush(customerToken, 'Rider Nearby', msg, { orderId: currentOrder });
          } else {
            await sendFCM(customerToken, 'Rider Nearby', msg, { orderId: currentOrder });
          }
        }
        await db.ref(`orders/${currentOrder}`).update({ proximityNotified: true });
      }
    }
  } catch (err) {
    console.error('onRiderNodeChange error', err?.response?.data || err.message);
  }
  return null;
});
