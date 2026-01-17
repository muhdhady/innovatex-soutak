import { prisma } from "@/lib/prisma"; // Connect to real DB
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, AlertCircle, CheckCircle, Clock } from "lucide-react";

export default async function EmployeeDashboard() {
  // 1. Fetch Real Data from Database
  // We use Promise.all to fetch them in parallel for speed
  const [totalTickets, highPriority, openTickets, closedTickets] = await Promise.all([
    prisma.ticket.count(),
    prisma.ticket.count({ where: { priority: "HIGH" } }),
    prisma.ticket.count({ where: { status: "OPEN" } }),
    prisma.ticket.count({ where: { status: "CLOSED" } }),
  ]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Government Dashboard</h1>
            <p className="text-gray-500">Overview of incoming citizen reports and performance.</p>
        </div>
        <div className="text-sm font-medium text-gray-500 bg-white px-4 py-2 rounded-lg border shadow-sm">
            Sharjah Municipality • Zone 4
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Total Tickets */}
        <Card className="border-l-4 border-l-blue-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">TOTAL REPORTS</CardTitle>
            <Ticket className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
            <p className="text-xs text-gray-400">All time</p>
          </CardContent>
        </Card>

        {/* High Priority (Red) */}
        <Card className="border-l-4 border-l-red-500 shadow-sm bg-red-50/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-red-600">HIGH PRIORITY</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{highPriority}</div>
            <p className="text-xs text-red-400">Requires immediate action</p>
          </CardContent>
        </Card>

        {/* Open/Pending */}
        <Card className="border-l-4 border-l-orange-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">PENDING REVIEW</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets}</div>
            <p className="text-xs text-gray-400">Awaiting assignment</p>
          </CardContent>
        </Card>

        {/* Closed */}
        <Card className="border-l-4 border-l-green-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">RESOLVED</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{closedTickets}</div>
            <p className="text-xs text-gray-400">Tickets closed</p>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder for Graphs (Recharts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="h-[300px] flex items-center justify-center bg-gray-50 border-dashed">
            <p className="text-gray-400 text-sm">Tickets by Category Chart (Coming Soon)</p>
        </Card>
        <Card className="h-[300px] flex items-center justify-center bg-gray-50 border-dashed">
             <p className="text-gray-400 text-sm">Response Time Trends (Coming Soon)</p>
        </Card>
      </div>
    </div>
  );
}