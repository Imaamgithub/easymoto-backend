import { Request, Response } from "express";
import { RidersService } from "../services/riders.service";

export const getRiders = async (_req: Request, res: Response) => {
      const riders = await RidersService.getAll();
        res.json(riders);
};

export const createRider = async (req: Request, res: Response) => {
  try {
    const rider = await RidersService.create(req.body);
    res.json(rider);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

import { updateRiderLocation } from '../services/location.service'

export async function updateLocation(req: Request, res: Response) {

  const { riderId, lat, lng } = req.body

  await updateRiderLocation(riderId, lat, lng)

  res.json({ success: true })
}