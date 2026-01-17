"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateTicketStatus(ticketId: string, status: string, department?: string) {
  // Simulate sending an email or routing to a master list
  console.log(`[System] Ticket ${ticketId} updated to ${status}. Assigned to: ${department || "N/A"}`);

  await prisma.ticket.update({
    where: { id: ticketId },
    data: { 
        status: status,
        // In a real app, you'd save the 'assignedDepartment' here too
    }
  });

  revalidatePath("/employee/tickets");
  revalidatePath(`/employee/tickets/${ticketId}`);
}