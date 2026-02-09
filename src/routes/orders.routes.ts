import { Router } from "express";
import {
  createOrder,
  assignOrder,
  acceptOrder,
  pickupOrder,
  deliverOrder,
  getOrderById,
  getAllOrders
} from "../controllers/orders.controller";

const router = Router();

router.post("/", createOrder);
router.get("/:id", getOrderById);
router.post("/:id/assign", assignOrder);
router.post("/:id/accept", acceptOrder);
router.post("/:id/pickup", pickupOrder);
router.post("/:id/deliver", deliverOrder);

router.get("/", getAllOrders);
router.get("/:id", getOrderById);

export default router;