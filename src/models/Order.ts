import { OrderState } from "../domain /order-state";

export interface Order {
  id: string;
  state: OrderState;
  riderId?: string;
}