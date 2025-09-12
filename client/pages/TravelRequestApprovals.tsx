import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { api } from "@/lib/http";
import { 
  Download, 
  Filter, 
  Search, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  XCircle,
  ChevronDown
} from "lucide-react";

interface ApprovalStats {
  pendingApproval: number;
  approvedToday: number;
  totalBudget: string;
  rejected: number;
}

interface TravelRequestApproval {
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

interface ApprovalResponse {
  requests: TravelRequestApproval[];
  total: number;
  page: number;
  limit: number;
}

export default function TravelRequestApprovals() {
  const [stats, setStats] = useState<ApprovalStats | null>(null);
  const [approvals, setApprovals] = useState<ApprovalResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, approvalsRes] = await Promise.all([
        api.get("/approval-stats"),
        api.get("/travel-request-approvals"),
      ]);
      setStats(statsRes.data);
      setApprovals(approvalsRes.data);
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await api.put(`/travel-requests/${id}/status`, { status });
      loadData(); // Reload data after update
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-orange-100 text-orange-600 border-orange-200",
      approved: "bg-green-600 text-white",
      rejected: "bg-red-600 text-white",
    };
    
    const labels = {
      pending: "Pending",
      approved: "Approved", 
      rejected: "Rejected",
    };

    return (
      <Badge className={`${variants[status as keyof typeof variants]} rounded-sm px-3 py-1`}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-green-100 text-green-600 border-green-200",
      medium: "bg-green-100 text-green-600 border-green-200",
      low: "bg-gray-100 text-gray-600 border-gray-200",
    };

    const labels = {
      high: "High",
      medium: "Medium",
      low: "Low",
    };

    return (
      <Badge className={`${variants[priority as keyof typeof variants]} rounded-sm px-3 py-1`}>
        {labels[priority as keyof typeof labels]}
      </Badge>
    );
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    };

    if (startDate === endDate) {
      return formatDate(start);
    }
    
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold text-foreground">
              Travel Request Approvals
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
              Review and approve employee travel requests
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <Card className="bg-white shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-[70px] h-[70px] rounded-lg bg-orange-50 flex items-center justify-center">
                    <Clock className="h-9 w-9 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stats.pendingApproval}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Pending Approval
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-[70px] h-[70px] rounded-lg bg-green-50 flex items-center justify-center">
                    <CheckCircle className="h-9 w-9 text-green-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stats.approvedToday}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Approved Today
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-[70px] h-[70px] rounded-lg bg-blue-50 flex items-center justify-center">
                    <DollarSign className="h-9 w-9 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stats.totalBudget}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Budget
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-[70px] h-[70px] rounded-lg bg-red-50 flex items-center justify-center">
                    <XCircle className="h-9 w-9 text-red-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {stats.rejected}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Rejected
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="bg-white shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by employee name or request ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[170px]">
                    <SelectValue placeholder="All Status" />
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="All Departments" />
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                  <SelectTrigger className="w-full sm:w-[170px]">
                    <SelectValue placeholder="Date Range" />
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Requests Table */}
        <Card className="bg-white shadow-[0_2px_2px_0_rgba(59,130,247,0.30)]">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 pb-0">
              <h2 className="text-xl font-semibold text-foreground">
                Recent Travel Requests
              </h2>
              <div className="text-sm text-blue-600 font-medium mt-2 sm:mt-0">
                12 pending requests
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50/30">
                    <TableHead className="text-blue-600 font-semibold text-xs uppercase tracking-wider">
                      Employee
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold text-xs uppercase tracking-wider">
                      Destination
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold text-xs uppercase tracking-wider">
                      Travel Dates
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold text-xs uppercase tracking-wider">
                      Budget
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold text-xs uppercase tracking-wider">
                      Status
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold text-xs uppercase tracking-wider">
                      Priority
                    </TableHead>
                    <TableHead className="text-blue-600 font-semibold text-xs uppercase tracking-wider">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvals?.requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={request.employee.avatar}
                            alt={request.employee.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div>
                            <div className="font-medium text-foreground">
                              {request.employee.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {request.employee.department}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">
                            {request.destination.location}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {request.destination.purpose}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-foreground">
                            {formatDateRange(request.travelDates.startDate, request.travelDates.endDate)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {request.travelDates.duration}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">
                          {request.budget}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(request.status)}
                      </TableCell>
                      <TableCell>
                        {getPriorityBadge(request.priority)}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {request.status === "pending" && (
                            <>
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleStatusUpdate(request.id, "approved")}
                              >
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleStatusUpdate(request.id, "rejected")}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6 pt-4 border-t">
              <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
                Showing 1-10 of {approvals?.total || 0} requests
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive={currentPage === 1}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive={false}>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive={false}>
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
