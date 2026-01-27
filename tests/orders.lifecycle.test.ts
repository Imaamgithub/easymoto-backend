import request from "supertest";

// Create an in-memory mock of prisma to avoid requiring a real database
const ordersStore: Record<string, any> = {};

const prismaMock = {
  order: {
    create: jest.fn(async ({ data }: any) => {
      const id = `order_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      const order = { id, ...data };
      ordersStore[id] = order;
      return order;
    }),
    findMany: jest.fn(async () => Object.values(ordersStore)),
    findUnique: jest.fn(async ({ where: { id } }: any) => ordersStore[id] ?? null),
    update: jest.fn(async ({ where: { id }, data }: any) => {
      const existing = ordersStore[id];
      if (!existing) throw new Error("Order not found");
      const updated = { ...existing, ...data };
      ordersStore[id] = updated;
      return updated;
    }),
  },
};

// Replace prisma before loading the app
jest.doMock("../src/config/prisma", () => ({ prisma: prismaMock }));

describe("Order lifecycle - real flow", () => {
  let app: any;

  beforeAll(async () => {
    // import the app after mocking prisma
    app = (await import("../src/app")).default;
  });

  beforeEach(() => {
    // clear in-memory store and mock histories
    for (const k of Object.keys(ordersStore)) delete ordersStore[k];
    jest.clearAllMocks();
  });

  it("should create -> assign -> accept -> pickup -> deliver -> complete", async () => {
    // CREATE
    const createRes = await request(app)
      .post("/orders")
      .send({
        customerName: "Alice",
        customerPhone: "123456789",
        pickupAddress: "A St",
        deliveryAddress: "B Ave",
      })
      .expect(201);

    const id = createRes.body.id;
    expect(createRes.body.status).toBe("CREATED");

    // ASSIGN
    const assignRes = await request(app)
      .post(`/orders/${id}/assign`)
      .send({ riderId: "rider-1" })
      .expect(200);
    expect(assignRes.body.status).toBe("ASSIGNED");

    // ACCEPT
    const acceptRes = await request(app).post(`/orders/${id}/accept`).expect(200);
    expect(acceptRes.body.status).toBe("ACCEPTED");

    // PICKUP
    const pickupRes = await request(app).post(`/orders/${id}/pickup`).expect(200);
    expect(pickupRes.body.status).toBe("PICKED_UP");

    // DELIVER
    const deliverRes = await request(app).post(`/orders/${id}/deliver`).expect(200);
    expect(deliverRes.body.status).toBe("DELIVERED");

    // COMPLETE
    const completeRes = await request(app).post(`/orders/${id}/complete`).expect(200);
    expect(completeRes.body.status).toBe("COMPLETED");
  });
});
