import { OrderState } from "./order-state";
import { transitionOrder } from "./order-state-machine";

export function assertTransition(from: OrderState, to: OrderState) {
  if (!transitionOrder(from, to)) {
    throw new Error(`Invalid transition from ${from} to ${to}`);
  }
}