import Link from "next/link";
import { prisma } from "@/lib/prisma"; // Import DB
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";

export const dynamic = "force-dynamic"; // Ensure it refreshes on every load

export default async function TicketsPage() {
  // Fetch real tickets from DB, sorted by newest first
  const tickets = await prisma.ticket.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ticket Queue</h1>
          <p className="text-gray-500">Manage and assign incoming citizen reports.</p>
        </div>
        <Button className="bg-uae-dark text-white">Export CSV</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incoming Reports</CardTitle>
          <CardDescription>Real-time feed of resident submissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No tickets found. Wait for residents to report issues!
                    </TableCell>
                </TableRow>
              ) : (
                tickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                    <TableCell className="font-medium text-xs font-mono">
                        {ticket.id.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell className="font-medium">{ticket.title}</TableCell>
                    <TableCell>{ticket.category}</TableCell>
                    <TableCell>
                        <Badge variant={ticket.status === "OPEN" ? "destructive" : "outline"}>
                        {ticket.status}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <span className={`font-bold text-sm ${
                            ticket.priority === "HIGH" ? "text-red-600" : "text-gray-500"
                        }`}>
                            {ticket.priority}
                        </span>
                    </TableCell>
                    <TableCell className="text-right">
                        <Link href={`/employee/tickets/${ticket.id}`}>
                            <Button size="sm" variant="ghost">
                                View <ArrowUpRight className="ml-1 h-4 w-4" />
                            </Button>
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