import { OrderState } from "./order-state";
import { emitEvent } from "./event-bus";

const transitions: Record<OrderState, OrderState[]> = {
  [OrderState.CREATED]: [OrderState.ASSIGNED, OrderState.CANCELLED],
  [OrderState.ASSIGNED]: [OrderState.PICKED_UP, OrderState.CANCELLED],
  [OrderState.PICKED_UP]: [OrderState.DELIVERED],
  [OrderState.DELIVERED]: [],
  [OrderState.CANCELLED]: [],
};

export function transitionOrder(
  current: OrderState,
  next: OrderState
): OrderState {
  if (!transitions[current].includes(next)) {
    throw new Error(`Invalid transition from ${current} to ${next}`);
  }

  emitEvent({
    type: "ORDER_STATE_CHANGED",
    payload: { from: current, to: next },
    occurredAt: new Date(),
  });

  return next;
}