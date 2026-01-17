"use client";

import { useState } from "react";
import { updateTicketStatus } from "@/app/actions/employee-actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle, XCircle, Send, ChevronDown, Loader2 } from "lucide-react";

export function TicketActionPanel({ ticketId, currentStatus }: { ticketId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (status: string, department?: string) => {
    setLoading(true);
    await updateTicketStatus(ticketId, status, department);
    setLoading(false);
  };

  if (currentStatus === "CLOSED") {
    return <Button variant="outline" disabled>Ticket Closed</Button>;
  }

  return (
    <div className="flex gap-2">
      {/* REJECT BUTTON */}
      <Button 
        variant="outline" 
        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
        onClick={() => handleUpdate("CLOSED")}
        disabled={loading}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="mr-2 h-4 w-4" />}
        Mark as Invalid
      </Button>

      {/* APPROVE & ASSIGN DROPDOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="bg-uae-green hover:bg-[#005036]" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                Approve & Route
                <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Select Department</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleUpdate("ASSIGNED", "Infrastructure Maintenance")}>
                <Send className="mr-2 h-4 w-4 text-blue-500" /> Maintenance Team
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdate("ASSIGNED", "RTA Traffic Control")}>
                <Send className="mr-2 h-4 w-4 text-orange-500" /> Traffic Control
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdate("ASSIGNED", "Waste Management")}>
                <Send className="mr-2 h-4 w-4 text-green-500" /> Sanitation Dept
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleUpdate("IN_PROGRESS", "General")}>
                Mark In Progress (No Route)
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}