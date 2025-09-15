import express from "express";
import { RequestHandler } from "express";
import { body, param, validationResult } from "express-validator";

const router = express.Router();

export interface StatsResponse {
  activeTrips: number;
  pendingExpenses: string;
  awaitingApproval: number;
  monthlyBudget: string;
}

export interface ApprovalStats {
  pendingApproval: number;
  approvedToday: number;
  totalBudget: string;
  rejected: number;
}

export interface TravelRequest {
  id: string;
  name: string;
  avatar: string;
  from: string;
  to: string;
  status: "pending" | "approved" | "rejected";
  requestDate: string;
}

export interface TravelRequestApproval {
  id: string;
  employee: {
    name: string;
    avatar: string;
    department: string;
  };
  destination: {
    location: string;
    purpose: string;
  };
  travelDates: {
    startDate: string;
    endDate: string;
    duration: string;
  };
  budget: string;
  status: "pending" | "approved" | "rejected";
  priority: "high" | "medium" | "low";
  requestDate: string;
}

export interface ExpenseReport {
  id: string;
  title: string;
  submittedBy: string;
  amount: string;
  status: "pending" | "approved" | "rejected";
  submissionDate: string;
}

export interface MonthlyExpense {
  month: string;
  amount: number;
}

// Mock data for demonstration
const mockStats: StatsResponse = {
  activeTrips: 24,
  pendingExpenses: "$12,450",
  awaitingApproval: 18,
  monthlyBudget: "$45,000",
};

const mockApprovalStats: ApprovalStats = {
  pendingApproval: 12,
  approvedToday: 8,
  totalBudget: "$45.2K",
  rejected: 3,
};

const mockTravelRequests: TravelRequest[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/4fa4c38ef3892012b166bc2fbb474ffbd49bda2e?width=100",
    from: "New York",
    to: "London",
    status: "pending",
    requestDate: "2025-01-15",
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/584eb215fe812bf81c2c9ffc953c457482b1f3de?width=100",
    from: "San Francisco",
    to: "Tokyo",
    status: "approved",
    requestDate: "2025-01-14",
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar:
      "https://api.builder.io/api/v1/image/assets/TEMP/39373ec2416a0763f8d322ef0bcb73c6be64dd70?width=100",
    from: "Chicago",
    to: "Berlin",
    status: "rejected",
    requestDate: "2025-01-13",
  },
];

const mockTravelRequestApprovals: TravelRequestApproval[] = [
  {
    id: "1",
    employee: {
      name: "Sarah Johnson",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/4fa4c38ef3892012b166bc2fbb474ffbd49bda2e?width=100",
      department: "Engineering",
    },
    destination: {
      location: "San Francisco, CA",
      purpose: "Client Meeting",
    },
    travelDates: {
      startDate: "2025-03-15",
      endDate: "2025-03-18",
      duration: "4 days",
    },
    budget: "$2,450",
    status: "pending",
    priority: "high",
    requestDate: "2025-01-15",
  },
  {
    id: "2",
    employee: {
      name: "Mike Chen",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/584eb215fe812bf81c2c9ffc953c457482b1f3de?width=100",
      department: "San Francisco",
    },
    destination: {
      location: "New York, NY",
      purpose: "Conference",
    },
    travelDates: {
      startDate: "2025-03-22",
      endDate: "2025-03-22",
      duration: "1 day",
    },
    budget: "$3,200",
    status: "pending",
    priority: "medium",
    requestDate: "2025-01-14",
  },
  {
    id: "3",
    employee: {
      name: "Sarah Johnson",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/4fa4c38ef3892012b166bc2fbb474ffbd49bda2e?width=100",
      department: "Engineering",
    },
    destination: {
      location: "San Francisco, CA",
      purpose: "Client Meeting",
    },
    travelDates: {
      startDate: "2025-03-15",
      endDate: "2025-03-18",
      duration: "4 days",
    },
    budget: "$2,450",
    status: "pending",
    priority: "high",
    requestDate: "2025-01-13",
  },
  {
    id: "4",
    employee: {
      name: "Mike Chen",
      avatar: "https://api.builder.io/api/v1/image/assets/TEMP/584eb215fe812bf81c2c9ffc953c457482b1f3de?width=100",
      department: "San Francisco",
    },
    destination: {
      location: "New York, NY",
      purpose: "Conference",
    },
    travelDates: {
      startDate: "2025-03-22",
      endDate: "2025-03-22",
      duration: "1 day",
    },
    budget: "$3,200",
    status: "pending",
    priority: "medium",
    requestDate: "2025-01-12",
  },
];

const mockExpenseReports: ExpenseReport[] = [
  {
    id: "1",
    title: "Q1 2025 Business Travel",
    submittedBy: "Submitted by Alex Rivera",
    amount: "$3,245",
    status: "pending",
    submissionDate: "2025-01-15",
  },
  {
    id: "2",
    title: "Client Meeting Expenses",
    submittedBy: "Submitted by Lisa Park",
    amount: "$3,245",
    status: "approved",
    submissionDate: "2025-01-14",
  },
  {
    id: "3",
    title: "Conference Attendance",
    submittedBy: "Submitted by David Kim",
    amount: "$3,245",
    status: "rejected",
    submissionDate: "2025-01-13",
  },
];

const mockMonthlyExpenses: MonthlyExpense[] = [
  { month: "Jan", amount: 1500 },
  { month: "Feb", amount: 2500 },
  { month: "Mar", amount: 1000 },
  { month: "Apr", amount: 2700 },
  { month: "May", amount: 2750 },
  { month: "Jun", amount: 1600 },
  { month: "Jul", amount: 2800 },
  { month: "Aug", amount: 2900 },
  { month: "Sep", amount: 800 },
  { month: "Oct", amount: 700 },
  { month: "Nov", amount: 1900 },
  { month: "Dec", amount: 2000 },
];

// ---- Async handler wrapper ----
const asyncHandler =
  (fn: RequestHandler) =>
  (req: any, res: any, next: any) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// ---- Routes ----
router.get("/stats", asyncHandler((req, res) => res.json(mockStats)));
router.get("/approval-stats", asyncHandler((req, res) => res.json(mockApprovalStats)));

router.get("/requests", asyncHandler((req, res) => res.json(mockTravelRequests)));
router.get("/requests/:id",
  param("id").isString(),
  asyncHandler((req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const request = mockTravelRequests.find(r => r.id === req.params.id);
    if (!request) return res.status(404).json({ error: "Travel request not found" });
    res.json(request);
  })
);

router.get("/request-approvals", asyncHandler((req, res) =>
  res.json({ requests: mockTravelRequestApprovals, total: 45, page: 1, limit: 10 })
));

router.post(
  "/requests/:id/status",
  [
    param("id").isString(),
    body("status").isIn(["pending", "approved", "rejected"]),
  ],
  asyncHandler((req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const idx = mockTravelRequestApprovals.findIndex(r => r.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Travel request not found" });

    mockTravelRequestApprovals[idx].status = req.body.status;
    res.json(mockTravelRequestApprovals[idx]);
  })
);

router.get("/expense-reports", asyncHandler((req, res) => res.json(mockExpenseReports)));

router.get("/expense-reports/:id",
  param("id").isString(),
  asyncHandler((req, res) => {
    const report = mockExpenseReports.find(r => r.id === req.params.id);
    if (!report) return res.status(404).json({ error: "Expense report not found" });
    res.json(report);
  })
);

router.post(
  "/expense-reports/:id/status",
  [
    param("id").isString(),
    body("status").isIn(["pending", "approved", "rejected"]),
  ],
  asyncHandler((req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const idx = mockExpenseReports.findIndex(r => r.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Expense report not found" });

    mockExpenseReports[idx].status = req.body.status;
    res.json(mockExpenseReports[idx]);
  })
);

router.get("/monthly-expenses", asyncHandler((req, res) => res.json(mockMonthlyExpenses)));

// ---- Export router ----
export default router;
