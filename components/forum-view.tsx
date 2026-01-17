"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { createPost } from "@/app/actions/forum-actions"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, MessageSquare, ThumbsUp, Sparkles, User, ArrowRight, Loader2 } from "lucide-react";

// Mock Data (Fallback)
const HARDCODED_POSTS = [
  { id: "mock1", title: "Golden Visa for Software Engineers?", authorName: "Omar K.", replies: 12, likes: 45, category: "Visa", isMock: true },
  { id: "mock2", title: "Paying SEWA bill without login", authorName: "Sarah J.", replies: 3, likes: 8, category: "Utilities", isMock: true },
];

export default function ForumView({ dbPosts }: { dbPosts: any[] }) {
  const [query, setQuery] = useState("");
  const [showAiAnswer, setShowAiAnswer] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  
  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [postLoading, setPostLoading] = useState(false);

  // Combine Real DB Posts + Mock Posts
  const allPosts = [...dbPosts, ...HARDCODED_POSTS];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setAiLoading(true);
    setTimeout(() => {
        setShowAiAnswer(true);
        setAiLoading(false);
    }, 1500);
  };

  // Wrapper to handle Server Action + Close Dialog
  const handlePostSubmit = async (formData: FormData) => {
    setPostLoading(true);
    await createPost(formData); // Call the server action
    setPostLoading(false);
    setIsDialogOpen(false); // Close the box
    alert("Question posted successfully!"); 
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* 1. HERO SECTION */}
      <div className="text-center py-10 space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Community Answers</h1>
        <p className="text-gray-500 max-w-lg mx-auto text-lg">
            Ask anything. Get instant answers from AI, or connect with verified residents.
        </p>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2 relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input 
                className="pl-12 h-14 text-lg shadow-lg border-gray-200 rounded-full" 
                placeholder="How do I renew my driving license?" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button 
                type="button" 
                onClick={handleSearch}
                disabled={aiLoading}
                className="absolute right-2 top-2 h-10 rounded-full bg-uae-green hover:bg-[#005036] px-6"
            >
                {aiLoading ? <Loader2 className="animate-spin" /> : "Search"}
            </Button>
        </form>
      </div>

      {/* 2. AI ANSWER SECTION */}
      {showAiAnswer && (
        <div className="animate-in slide-in-from-bottom-4 duration-700">
            <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50/50 to-white shadow-xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 text-blue-700">
                            <Sparkles className="h-5 w-5 fill-blue-200" />
                            <span className="font-bold text-sm uppercase tracking-wide">Instant Answer</span>
                        </div>
                        <Badge variant="outline" className="bg-white/50 text-[10px] text-gray-400">Powered by Govt. Data</Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 capitalize">
                        {query}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        According to the latest RTA guidelines, you can renew your license online. You must first clear all fines and complete an eye test.
                    </p>

                    <div className="mt-6 pt-6 border-t border-blue-100 flex items-center justify-between">
                        <p className="text-sm text-gray-500 font-medium">Not the answer you were looking for?</p>
                        
                        {/* POST QUESTION DIALOG */}
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="secondary" className="bg-white border hover:bg-gray-50 text-gray-900">
                                    Post to Community <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Ask the Community</DialogTitle>
                                </DialogHeader>
                                <form action={handlePostSubmit} className="space-y-4 pt-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Title</label>
                                        <Input name="title" defaultValue={query} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Details</label>
                                        <Textarea name="content" placeholder="Provide more context..." required />
                                    </div>
                                    <Button type="submit" disabled={postLoading} className="w-full bg-uae-dark text-white">
                                        {postLoading ? <Loader2 className="animate-spin mr-2" /> : "Post Question"}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </div>
      )}

      {/* 3. DISCUSSION FEED (Real + Mock) */}
      <div className="pt-8">
        <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-2xl text-gray-900">Recent Discussions</h2>
        </div>
        
        <div className="grid gap-4">
            {allPosts.map((post) => (
                // Use a fake ID link for mock posts, real ID for real posts
                <Link key={post.id} href={post.isMock ? "#" : `/resident/forum/${post.id}`}>
                    <Card className="hover:shadow-md transition-all cursor-pointer group border-gray-100">
                        <CardContent className="p-5">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg text-gray-800 group-hover:text-uae-green transition-colors">
                                        {post.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.authorName}</span>
                                        <span className="flex items-center gap-1">
                                            <MessageSquare className="h-3 w-3" /> 
                                            {/* Handle different data structures safely */}
                                            {post.replies?.length || post.replies || 0} Replies
                                        </span>
                                        <span className="flex items-center gap-1 text-green-600 font-medium"><ThumbsUp className="h-3 w-3" /> {post.likes} Helpful</span>
                                    </div>
                                </div>
                                <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200">
                                    {post.category || "General"}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
}