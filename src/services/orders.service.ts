import { OrderState } from "../domain /order-state";
import { transitionOrder } from "../domain /order-state-machine";
import { Order } from "../models/Order";

export class OrdersService {
  static createOrder(data: Partial<Order>) {
    return {
      id: crypto.randomUUID(),
      ...data,
      state: OrderState.CREATED,
    };
  }

  static changeState(order: Order, next: OrderState) {
    order.state = transitionOrder(order.state, next);
    return order;
  }
}