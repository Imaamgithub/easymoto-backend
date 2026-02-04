import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.json({
      id: "ORDER_001",
          status: "CREATED",
              data: req.body
                });
                });

                router.post("/:id/assign", (req, res) => {
                  res.json({ status: "ASSIGNED" });
                  });

                  router.post("/:id/accept", (req, res) => {
                    res.json({ status: "ACCEPTED" });
                    });

                    router.post("/:id/pickup", (req, res) => {
                      res.json({ status: "PICKED_UP" });
                      });

                      router.post("/:id/deliver", (req, res) => {
                        res.json({ status: "DELIVERED" });
                        });

                        export default router;