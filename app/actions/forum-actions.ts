"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  
  await prisma.forumPost.create({
    data: {
      title,
      content,
      category: "General",
      authorName: "Ahmed Al Mansoori",
      // WE MUST CONNECT THE USER NOW:
      user: {
        connectOrCreate: {
            where: { email: "resident@uae.ae" },
            create: { email: "resident@uae.ae", role: "resident", name: "Ahmed Al Mansoori" }
        }
      }
    }
  });

  revalidatePath("/resident/forum");
}

export async function addReply(postId: string, content: string) {
  await prisma.forumReply.create({
    data: {
      content,
      postId,
      authorName: "Ahmed Al Mansoori",
    }
  });
  revalidatePath(`/resident/forum/${postId}`);
}