import { Request, Response } from "express";

export function rootController(req: Request, res: Response) {
    res.send("EasyMoto Backend API is running 🚀");
}