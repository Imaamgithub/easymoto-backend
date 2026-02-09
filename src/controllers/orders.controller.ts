import { Request, Response } from "express";
import { OrdersService } from "../services/orders.service";
export const getAllOrders = async (_req: Request, res: Response) => {
  const orders = await OrdersService.getAll();
  res.json(orders);
};

export const getOrderById = async (req: Request, res: Response) => {
  const order = await OrdersService.getById(String(req.params.id));
  const id = String(req.params.id);
  res.json(order);
};

export const createOrder = async (req: Request, res: Response) => {  };
export const assignOrder = async (req: Request, res: Response) => {  };
export const acceptOrder = async (req: Request, res: Response) => {  };
export const pickupOrder = async (req: Request, res: Response) => {  };
export const deliverOrder = async (req: Request, res: Response) => {  };
