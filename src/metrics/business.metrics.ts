import client, { Counter } from "prom-client";

/**
 * Total orders created
 */
export const ordersTotal = new client.Counter({
  name: "easymoto_orders_total",
  help: "Total number of orders created",
});

/**
 * Orders by state
 */
export const ordersStateTotal = new client.Counter({
  name: "easymoto_orders_state_total",
  help: "Total orders by state",
  labelNames: ["state"],
});

/**
 * Order delivery duration
 */
export const orderDeliveryDuration = new client.Histogram({
  name: "easymoto_order_delivery_duration_seconds",
  help: "Time from creation to delivery",
  buckets: [30, 60, 120, 300, 600, 1200, 1800, 3600],
});

/**
 * Revenue proxy metric
 */
export const revenueTotal = new client.Counter({
  name: "easymoto_revenue_total",
  help: "Total simulated revenue",
});

ordersTotal.inc();
ordersStateTotal.inc({ state: "CREATED" });

ordersStateTotal.inc({ state: "DELIVERED" });

ordersStateTotal.inc({ state: "DELIVERED" });

// example revenue calculation
const deliveryFee = 5; // placeholder
revenueTotal.inc(deliveryFee);

// record delivery time
orderDeliveryDuration.observe(1000); // example delivery time in seconds

export const riderPerformanceGauge = new client.Gauge({
  name: "easymoto_rider_performance_score",
  help: "Rider performance score",
  labelNames: ["riderId"],
});
