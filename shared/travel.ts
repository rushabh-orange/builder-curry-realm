export interface StatsResponse {
  activeTrips: number;
  pendingExpenses: string;
  awaitingApproval: number;
  monthlyBudget: string;
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
