import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ticket, AlertCircle, CheckCircle, Clock, ArrowRight } from "lucide-react";

export default async function EmployeeDashboard() {
  // Fetch everything in parallel
  const [total, high, open, closed, categoryData, recentUrgent] = await Promise.all([
    prisma.ticket.count(),
    prisma.ticket.count({ where: { priority: "HIGH" } }),
    prisma.ticket.count({ where: { status: "OPEN" } }),
    prisma.ticket.count({ where: { status: "CLOSED" } }),
    // Group by Category
    prisma.ticket.groupBy({
        by: ['category'],
        _count: { category: true },
        orderBy: { _count: { category: 'desc' } },
        take: 5
    }),
    // Fetch 3 most recent HIGH/IMMEDIATE tickets
    prisma.ticket.findMany({
        where: { priority: { in: ["HIGH", "IMMEDIATE"] }, status: "OPEN" },
        orderBy: { createdAt: 'desc' },
        take: 3
    })
  ]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Government Dashboard</h1>
            <p className="text-gray-500">Overview of incoming citizen reports and performance.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500 shadow-sm"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-500">TOTAL REPORTS</CardTitle><Ticket className="h-4 w-4 text-blue-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{total}</div></CardContent></Card>
        <Card className="border-l-4 border-l-red-500 shadow-sm bg-red-50/10"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-red-600">HIGH PRIORITY</CardTitle><AlertCircle className="h-4 w-4 text-red-600" /></CardHeader><CardContent><div className="text-2xl font-bold text-red-700">{high}</div></CardContent></Card>
        <Card className="border-l-4 border-l-orange-500 shadow-sm"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-500">PENDING REVIEW</CardTitle><Clock className="h-4 w-4 text-orange-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{open}</div></CardContent></Card>
        <Card className="border-l-4 border-l-green-500 shadow-sm"><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-gray-500">RESOLVED</CardTitle><CheckCircle className="h-4 w-4 text-green-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{closed}</div></CardContent></Card>
      </div>

      {/* REAL CHARTS & LISTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Category Distribution */}
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Issues by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {categoryData.length === 0 ? <p className="text-gray-500 text-sm">No data yet.</p> : 
                 categoryData.map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-uae-green" />
                            <span className="text-sm font-medium text-gray-700">{item.category}</span>
                        </div>
                        <span className="text-sm font-bold">{item._count.category}</span>
                    </div>
                 ))
                }
            </CardContent>
        </Card>

        {/* 2. Urgent Attention List */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" /> Urgent Attention
                </CardTitle>
                <Link href="/employee/tickets" className="text-xs text-blue-600 hover:underline">View All</Link>
            </CardHeader>
            <CardContent className="space-y-4">
                {recentUrgent.length === 0 ? <p className="text-gray-500 text-sm">No urgent tickets pending.</p> :
                 recentUrgent.map((t) => (
                    <Link key={t.id} href={`/employee/tickets/${t.id}`} className="block group">
                        <div className="border rounded-lg p-3 hover:bg-gray-50 transition-colors flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-sm text-gray-900 group-hover:text-blue-600">{t.title}</p>
                                <p className="text-xs text-gray-500">{t.category} • {new Date(t.createdAt).toLocaleDateString()}</p>
                            </div>
                            <Badge variant="destructive" className="text-[10px]">{t.priority}</Badge>
                        </div>
                    </Link>
                 ))
                }
            </CardContent>
        </Card>

      </div>
    </div>
  );
}