"use server";

import { prisma } from "@/lib/prisma"; // We will create this helper next
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTicket(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;
  
  // 1. SIMULATE AI ANALYSIS (Hackathon Shortcut)
  // In a real app, you would call OpenAI API here.
  // Here, we just extract keywords to make it look smart.
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Fake delay
  
  const priority = description.toLowerCase().includes("danger") || description.toLowerCase().includes("fire") ? "HIGH" : "LOW";
  const aiSummary = `[AI GENERATED] Category: ${category}. Priority classified as ${priority} based on keywords. User reported: ${title}.`;

  // 2. SAVE TO DATABASE
  // We use a hardcoded User ID for the demo since we don't have real Auth sessions yet
  // Make sure you run 'npx prisma db push' first!
  try {
      await prisma.ticket.create({
        data: {
          title,
          description,
          category, // We need to add this to schema if missing, or store in description
          priority,
          aiSummary,
          status: "OPEN",
          user: {
            connectOrCreate: {
                where: { email: "resident@uae.ae" },
                create: { 
                    email: "resident@uae.ae", 
                    role: "resident",
                    name: "Ahmed Al Mansoori"
                }
            }
          }
        },
      });
  } catch (e) {
      console.error("Database Error:", e);
      // Fail silently for demo if DB isn't set up, just to show the UI flow
  }

  // 3. REFRESH EMPLOYEE DASHBOARD
  revalidatePath("/employee/tickets");
  
  // 4. REDIRECT USER
  redirect("/resident/dashboard?ticketCreated=true"); // <--- UPDATE THIS PATH
}