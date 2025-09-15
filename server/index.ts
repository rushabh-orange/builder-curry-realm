import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan"; // for request logging

import { handleDemo } from "./routes/demo";
import travelRoutes from "./routes/travel";
import { loginHandler } from "./routes/auth";

// --- ENV checks ---
const requiredEnv = ["NODE_ENV", "PORT"];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  console.error("❌ Missing required env vars:", missing.join(", "));
  if (process.env.NODE_ENV !== "test") process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logging in dev
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.get("/api/ping", (_req, res) => {
  const ping = process.env.PING_MESSAGE ?? "pong";
  res.json({ message: ping });
});

app.get("/api/demo", handleDemo);
app.post("/api/login", loginHandler);

// travel routes mounted under /api/travel
app.use("/api/travel", travelRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found", path: req.originalUrl });
});

// error handler
interface AppError extends Error {
  status?: number;
  details?: any;
}

app.use(
  (err: AppError, req: Request, res: Response, _next: NextFunction) => {
    console.error("🔥 Error:", err);

    const status = err.status || 500;
    const payload: any = { message: err.message || "Internal Server Error" };

    if (err.details) payload.details = err.details;

    if (process.env.NODE_ENV === "development") {
      payload.stack = err.stack;
    }

    res.status(status).json(payload);
  }
);

export function createServer() {
  return app;
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });
}
