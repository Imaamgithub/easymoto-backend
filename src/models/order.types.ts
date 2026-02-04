export enum OrderStatus {
  CREATED = "CREATED",
  ASSIGNED = "ASSIGNED",
  ACCEPTED = "ACCEPTED",
  PICKED_UP = "PICKED_UP",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

export const AllowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.CREATED]: [OrderStatus.ASSIGNED, OrderStatus.CANCELED],
  [OrderStatus.ASSIGNED]: [OrderStatus.ACCEPTED, OrderStatus.CANCELED],
  [OrderStatus.ACCEPTED]: [OrderStatus.PICKED_UP, OrderStatus.CANCELED],
  [OrderStatus.PICKED_UP]: [OrderStatus.DELIVERED, OrderStatus.CANCELED],
  [OrderStatus.DELIVERED]: [OrderStatus.COMPLETED],
  [OrderStatus.COMPLETED]: [],
  [OrderStatus.CANCELED]: [],
};

export const isValidTransition = (from: OrderStatus, to: OrderStatus) =>
  AllowedTransitions[from].includes(to);
