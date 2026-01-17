import { prisma } from "@/lib/prisma";
import ForumView from "@/components/forum-view";

export const dynamic = "force-dynamic"; // Ensure we always see new posts

export default async function ForumPage() {
  // Fetch real posts from DB (Newest first)
  const posts = await prisma.forumPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: { replies: true } // Include replies to count them
  });

  return <ForumView dbPosts={posts} />;
}