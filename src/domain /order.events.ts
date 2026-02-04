export type OrderEvent =
  | { type: "ORDER_CREATED"; orderId: string }
  | { type: "ORDER_ASSIGNED"; orderId: string; riderId: string }
  | { type: "ORDER_PICKED_UP"; orderId: string }
  | { type: "ORDER_DELIVERED"; orderId: string };