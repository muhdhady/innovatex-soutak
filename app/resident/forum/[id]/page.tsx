import { addReply } from "@/app/actions/forum-actions"; // Import Server Action
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThumbsUp, AlertTriangle, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function DiscussionPage({ params }: { params: Promise<{ id: string }> }) {
  // In a real app, fetch post by ID. For now, we mock the view.
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* ORIGINAL QUESTION */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Golden Visa requirements for software engineers?
        </h1>
        <div className="flex items-center gap-3 text-sm text-gray-500">
            <Badge variant="outline">Visa & Immigration</Badge>
            <span>• Posted by Omar K.</span>
            <span>• 2 hours ago</span>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            I heard the salary requirement changed recently. Does anyone know if the 30k AED limit is still strict for the creative/tech category? I have an offer for 28k and wondering if I can apply.
        </p>
      </div>

      {/* AI WARNING NOTE (The "Outdated" Check) */}
      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg flex gap-4 items-start">
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
        <div className="space-y-1">
            <p className="text-sm font-bold text-amber-800">Automated System Note</p>
            <p className="text-sm text-amber-700">
                This discussion mentions "30k AED salary". Please note that as of <strong>January 2026</strong>, new regulations allow exceptions for high-demand tech roles. Please verify on the official ICP portal.
            </p>
        </div>
      </div>

      <div className="h-px bg-gray-200 my-8" />

      {/* REPLIES */}
      <h2 className="font-bold text-xl">Community Answers</h2>
      <div className="space-y-4">
        
        {/* Answer 1 (Verified/Helpful) */}
        <Card className="border-green-100 bg-green-50/30">
            <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarFallback className="bg-uae-dark text-white">FA</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-gray-900 flex items-center gap-2">
                                Fatima Al Ali 
                                <ShieldCheck className="h-4 w-4 text-uae-green" />
                            </p>
                            <p className="text-xs text-gray-500">Top Contributor (Lvl 5)</p>
                        </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Best Answer
                    </Badge>
                </div>
                <p className="text-gray-800">
                    Yes, for specialized AI and Tech roles, the requirement is flexible if you have a bachelor's degree in CS. I applied last month with 25k and got approved under the "Specialized Talents" track.
                </p>
                <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-600 px-0">
                        <ThumbsUp className="mr-2 h-4 w-4" /> Helpful (24)
                    </Button>
                </div>
            </CardContent>
        </Card>

        {/* Answer 2 */}
        <Card>
            <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-gray-100">
                        <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-gray-900">John Smith</p>
                        <p className="text-xs text-gray-500">New Member</p>
                    </div>
                </div>
                <p className="text-gray-600">
                    Make sure your degree is attested by MOFA. That took me 2 weeks and delayed my application.
                </p>
                <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600 px-0">
                        <ThumbsUp className="mr-2 h-4 w-4" /> Helpful (3)
                    </Button>
                </div>
            </CardContent>
        </Card>

      </div>

      {/* REPLY BOX */}
      <Card className="mt-8 bg-gray-50 border-dashed">
        <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Add your answer</h3>
            <p className="text-xs text-gray-500">Earn 50 points for every helpful reply!</p>
            <form className="space-y-4">
                <Textarea placeholder="Type your experience or advice here..." className="bg-white" />
                <Button className="bg-uae-dark text-white">Post Answer</Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}