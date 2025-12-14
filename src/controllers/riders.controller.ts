import { Request, Response } from "express";
import { RidersService } from "../services/riders.service";

export const getRiders = async (_req: Request, res: Response) => {
      const riders = await RidersService.getAll();
        res.json(riders);
};
