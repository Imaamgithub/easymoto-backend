import { Request, Response } from "express";

export function rootController(req: Request, res: Response) {
    res.send("EasyMoto Backend API is running 🚀");
<<<<<<< HEAD
}
=======
}

export enum OrderState {
      CREATED = "CREATED",
        ASSIGNED = "ASSIGNED",
          ACCEPTED = "ACCEPTED",
            PICKED_UP = "PICKED_UP",
              DELIVERED = "DELIVERED",
                CANCELLED = "CANCELLED"
                }
>>>>>>> backup/wip-1765743428
