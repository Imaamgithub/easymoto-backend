import express from "express";
import routes from "./routes/index.routes";

const app = express();

app.use(express.json());

// Register all routes
app.use("/", routes);

export default app;
