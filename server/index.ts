import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  getStats,
  getTravelRequests,
  getExpenseReports,
  getMonthlyExpenses,
  getTravelRequest,
  updateTravelRequestStatus,
  getExpenseReport,
  updateExpenseReportStatus,
} from "./routes/travel";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Travel Admin Dashboard API routes
  app.get("/api/stats", getStats);
  app.get("/api/travel-requests", getTravelRequests);
  app.get("/api/travel-requests/:id", getTravelRequest);
  app.put("/api/travel-requests/:id/status", updateTravelRequestStatus);
  app.get("/api/expense-reports", getExpenseReports);
  app.get("/api/expense-reports/:id", getExpenseReport);
  app.put("/api/expense-reports/:id/status", updateExpenseReportStatus);
  app.get("/api/monthly-expenses", getMonthlyExpenses);

  return app;
}
