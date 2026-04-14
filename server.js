const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// riders route
app.post("/riders", (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const rider = {
    id: Date.now(),
    name,
    phone,
  };

  res.status(201).json(rider);
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});


const express = require("express");
const pool = require("./db");

app.use(express.json());

// CREATE RIDER (DB)
app.post("/riders", async (req, res) => {
  const { name, phone } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO riders (name, phone) VALUES ($1, $2) RETURNING *",
      [name, phone]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// GET RIDERS
app.get("/riders", async (req, res) => {
  const result = await pool.query("SELECT * FROM riders");
  res.json(result.rows);
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});


// CREATE ORDER
app.post("/orders", async (req, res) => {
  const { pickup, dropoff } = req.body;

  const result = await pool.query(
    "INSERT INTO orders (pickup, dropoff) VALUES ($1, $2) RETURNING *",
    [pickup, dropoff]
  );

  res.json(result.rows[0]);
});


// CREATE ORDER
app.post("/orders", async (req, res) => {
  const { pickup, dropoff } = req.body;

  const result = await pool.query(
    "INSERT INTO orders (pickup, dropoff) VALUES ($1, $2) RETURNING *",
    [pickup, dropoff]
  );

  res.json(result.rows[0]);
});

// ASSIGN RIDER
app.post("/orders/:id/assign", async (req, res) => {
  const orderId = req.params.id;

  const rider = await pool.query(
    "SELECT * FROM riders WHERE status='available' LIMIT 1"
  );

  if (rider.rows.length === 0) {
    return res.json({ message: "No riders available" });
  }

  const riderId = rider.rows[0].id;

  await pool.query(
    "UPDATE orders SET rider_id=$1, status='assigned' WHERE id=$2",
    [riderId, orderId]
  );

  await pool.query(
    "UPDATE riders SET status='busy' WHERE id=$1",
    [riderId]
  );

  res.json({ message: "Rider assigned", riderId });
});

