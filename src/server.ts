import express from "express";
import { config } from "./config/env";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("EasyMoto Backend");
});

const PORT = config.PORT || 3000;

const riderRoutes = require("./routes/riders");
app.use("/riders", riderRoutes);

app.listen(PORT, () => {
  console.log(`🚀 EasyMoto Backend running on http://localhost:${PORT}`);
});