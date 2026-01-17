"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ... imports

export async function createTicket(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  const aiSummary = formData.get("aiSummary") as string;
  const aiAccuracy = formData.get("aiAccuracy") === "true"; 

  // 1. CHECK FOR DUPLICATES (The "Analyze" Logic)
  // We check if an OPEN ticket exists with the same Category and a similar Title
  const existingTicket = await prisma.ticket.findFirst({
    where: {
      category: category,
      status: "OPEN",
      title: {
        contains: title.split(" ")[0], // Simple check: does it contain the first word? (e.g. "Pothole")
        mode: "insensitive",
      },
    },
  });

  // 2. IF DUPLICATE FOUND: INCREMENT & UPDATE PRIORITY
  if (existingTicket) {
    const newCount = existingTicket.reportCount + 1;
    let newPriority = existingTicket.priority;

    // The "Viral" Logic
    if (newCount >= 10) newPriority = "IMMEDIATE";
    else if (newCount >= 5) newPriority = "HIGH";

    await prisma.ticket.update({
      where: { id: existingTicket.id },
      data: {
        reportCount: newCount,
        priority: newPriority,
      }
    });

    // Redirect with a special flag so we can show a message "Added to existing ticket!"
    revalidatePath("/employee/tickets");
    redirect("/resident/dashboard?merged=true");
    return;
  }

  // 3. IF NEW: CREATE NORMALLY
  // (Your existing AI priority logic)
  let priority = description.toLowerCase().includes("danger") ? "HIGH" : "LOW";

  await prisma.ticket.create({
    data: {
      title,
      description,
      category,
      priority,
      aiSummary,
      aiAccuracy,
      status: "OPEN",
      reportCount: 1, // Start at 1
      user: {
        connectOrCreate: {
          where: { email: "resident@uae.ae" },
          create: { email: "resident@uae.ae", role: "resident", name: "Ahmed Al Mansoori" },
        },
      },
    },
  });

  revalidatePath("/employee/tickets");
  redirect("/resident/dashboard?ticketCreated=true");
}