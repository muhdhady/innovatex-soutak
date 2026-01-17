import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, ArrowUpRight, Flame, Filter } from "lucide-react";

export const dynamic = "force-dynamic";

// Helper component for Sortable Table Headers
function SortHead({ label, sortKey, currentSort, currentStatus }: { label: string, sortKey: string, currentSort: string, currentStatus: string }) {
    const isActive = currentSort === sortKey;
    return (
        <TableHead>
            {/* We keep the current status filter when sorting */}
            <Link 
                href={`/employee/tickets?sort=${sortKey}&status=${currentStatus}`} 
                className="flex items-center gap-1 hover:text-black cursor-pointer group"
            >
                {label}
                <ArrowUpDown className={`h-3 w-3 ${isActive ? "text-black" : "text-gray-300 group-hover:text-gray-500"}`} />
            </Link>
        </TableHead>
    )
}

// Helper to generate Filter Links (Preserves existing Sort)
function FilterButton({ label, value, activeValue, currentSort }: { label: string, value: string, activeValue: string, currentSort: string }) {
    const isActive = activeValue === value;
    return (
        <Link href={`/employee/tickets?status=${value}&sort=${currentSort}`}>
            <Button 
                variant={isActive ? "default" : "outline"} 
                size="sm" 
                className={`rounded-full ${isActive ? "bg-uae-dark hover:bg-black" : "text-gray-600 border-gray-300"}`}
            >
                {label}
            </Button>
        </Link>
    )
}

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TicketsPage(props: Props) {
  const searchParams = await props.searchParams;
  
  // 1. Get Params
  const sort = (searchParams.sort as string) || 'createdAt';
  const status = (searchParams.status as string) || 'ALL';

  // 2. Build Query
  const orderBy = 
    sort === 'priority' ? { priority: 'desc' as const } : 
    sort === 'reportCount' ? { reportCount: 'desc' as const } :
    sort === 'status' ? { status: 'asc' as const } :
    { createdAt: 'desc' as const };

  // Only filter if not "ALL"
  const where = status === 'ALL' ? {} : { status: status };

  
  // @ts-ignore
  const tickets = await prisma.ticket.findMany({ 
      where, 
      orderBy 
  });

  return (
    <div className="p-8 space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ticket Queue</h1>
          <p className="text-gray-500">Manage and assign incoming citizen reports.</p>
        </div>
      </div>

      <div className="flex items-center gap-3 pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500 mr-2">
            <Filter className="h-4 w-4" />
            <span>Filter by:</span>
        </div>
        {/* Filter Tabs */}
        <FilterButton label="All Tickets" value="ALL" activeValue={status} currentSort={sort} />
        <FilterButton label="Pending Review" value="OPEN" activeValue={status} currentSort={sort} />
        <FilterButton label="Resolved" value="CLOSED" activeValue={status} currentSort={sort} />
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Incoming Reports</CardTitle>
          <CardDescription>
            Showing {tickets.length} {status === 'ALL' ? '' : status.toLowerCase().replace('_', ' ')} ticket(s).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                {/* Pass currentStatus to headers so sorting doesn't reset the filter */}
                <SortHead label="Subject" sortKey="title" currentSort={sort} currentStatus={status} />
                <SortHead label="Category" sortKey="category" currentSort={sort} currentStatus={status} />
                <SortHead label="Reports" sortKey="reportCount" currentSort={sort} currentStatus={status} />
                <SortHead label="Status" sortKey="status" currentSort={sort} currentStatus={status} />
                <SortHead label="Priority" sortKey="priority" currentSort={sort} currentStatus={status} />
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center py-12 text-gray-400">No tickets found for this filter.</TableCell></TableRow>
              ) : (
                tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                        <TableCell className="font-medium text-xs font-mono text-gray-400">
                            {ticket.id.slice(-4).toUpperCase()}
                        </TableCell>
                        <TableCell className="font-medium">{ticket.title}</TableCell>
                        <TableCell>{ticket.category}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-1 font-semibold text-gray-700">
                                {ticket.reportCount}
                                {ticket.reportCount > 4 && <Flame className="h-4 w-4 text-orange-500 animate-pulse" />}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Badge variant={ticket.status === "OPEN" ? "destructive" : ticket.status === "CLOSED" ? "outline" : "secondary"}>
                                {ticket.status.replace("_", " ")}
                            </Badge>
                        </TableCell>
                        <TableCell>
                             <span className={`font-bold text-xs px-2 py-1 rounded-full w-fit ${
                                ticket.priority === "IMMEDIATE" ? "bg-purple-100 text-purple-700 animate-pulse border border-purple-200" :
                                ticket.priority === "HIGH" ? "bg-red-100 text-red-700 border border-red-200" :
                                "bg-gray-100 text-gray-600"
                            }`}>
                                {ticket.priority}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">
                            <Link href={`/employee/tickets/${ticket.id}`}>
                                <Button size="sm" variant="ghost">View <ArrowUpRight className="ml-1 h-4 w-4" /></Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}