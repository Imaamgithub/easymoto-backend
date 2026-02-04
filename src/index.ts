<<<<<<< HEAD
import express from "express";
import routes from "./routes/index.routes";

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`EasyMoto Backend running on http://localhost:${PORT}`);
});
=======
import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
import "./workers/intelligence.worker";
>>>>>>> backup/wip-1765743428
