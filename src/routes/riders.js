const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, phone } = req.body;

  // basic validation
  if (!name || !phone) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // simulate DB save (replace with PostgreSQL later)
  const rider = {
    id: Date.now(),
    name,
    phone,
  };

  res.status(201).json(rider);
});

module.exports = router;