// server/index.ts
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan"; // optional; add to package.json if not present

import { handleDemo } from "./routes/demo";
import travelRoutes from "./routes/travel"; // export default or route object
import authRoutes from "./routes/auth"; // if exists

// --- ENV checks ---
const requiredEnv = ["NODE_ENV", "PORT"];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  console.error("Missing required env vars:", missing.join(", "));
  // Fail fast in non-test environments
  if (process.env.NODE_ENV !== "test") process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

// logging - only in dev
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// mount routes
app.use("/api/demo", handleDemo);
app.use("/api/travel", travelRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req: Request, res: Response) =>
  res.status(404).json({ error: "Not Found", path: req.originalUrl })
);

// centralized error handler
interface AppError extends Error {
  status?: number;
  details?: any;
}

app.use(
  (err: AppError, req: Request, res: Response, next: NextFunction) => {
    // log full error on server
    console.error(err);

    const status = err.status || 500;
    const payload: any = { message: err.message || "Internal Server Error" };

    // include details (non-sensitive) when provided
    if (err.details) payload.details = err.details;

    // In development include stack
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
    console.log(`Server listening on http://localhost:${port}`);
  });
}
