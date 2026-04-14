import { Request, Response } from "express"
import { OrdersService } from "../services/orders.service"

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerName, customerPhone, pickupAddress, deliveryAddress, demo } = req.body

    const order = await OrdersService.create({
      customerName,
      customerPhone,
      pickupAddress,
      deliveryAddress,
      demo
    })
    
    console.log("🔥 BODY RECEIVED:", req.body);

    console.log("BODY:", req.body); // 👈 debug
    res.status(201).json({
      message: "Order created",
      success: true,
      data: order,
    });
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to create order" })
  }
}




export const assignOrder = async (req: Request, res: Response) => {
  try {
    const { orderId, riderId } = req.body

    const order = await OrdersService.assign(orderId, riderId)

    res.json(order)
  } catch (error) {
    res.status(500).json({ error: "Failed to assign order" })
  }
}

export const acceptOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body

    const order = await OrdersService.accept(orderId)

    res.json(order)
  } catch (error) {
    res.status(500).json({ error: "Failed to accept order" })
  }
}

export const pickupOrder = async (req: Request, res: Response) => {
  res.json({ message: "pickup order" })
}

export const deliverOrder = async (req: Request, res: Response) => {
  res.json({ message: "deliver order" })
}


import { prisma } from "../config/prisma"

export const getOrderById = async (req: any, res: any) => {
  try {
    const { id } = req.params

    const order = await prisma.order.findUnique({
      where: { id }
    })

    res.json(order)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" })
  }
}

export const getAllOrders = async (req: any, res: any) => {
  try {
    const orders = await prisma.order.findMany()

    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" })
  }
}

console.log("🔥 CONTROLLER HIT");
