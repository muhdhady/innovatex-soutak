"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, ThumbsUp, Sparkles, User } from "lucide-react";

export default function ForumPage() {
  const [query, setQuery] = useState("");
  const [showAiAnswer, setShowAiAnswer] = useState(false);

  // Mock Search Handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) setShowAiAnswer(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="text-center py-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Community Answers</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
            Ask about visa renewals, parking rules, or utility bills. 
            Our AI scans official government docs to answer instantly.
        </p>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                    className="pl-10 h-11 text-lg shadow-sm" 
                    placeholder="e.g. How to renew driving license?" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <Button type="submit" className="h-11 bg-uae-green hover:bg-[#005036]">
                Ask AI
            </Button>
        </form>
      </div>

      {/* THE "GOOGLE AI" ANSWER CARD */}
      {showAiAnswer && (
        <Card className="border-2 border-blue-100 bg-blue-50/30 shadow-md overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
                <div className="flex items-center gap-2 text-blue-700">
                    <Sparkles className="h-5 w-5 fill-blue-200" />
                    <span className="font-bold text-sm uppercase tracking-wide">AI Generated Summary</span>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Renewing Driving License in UAE
                </h3>
                <p className="text-gray-700 leading-relaxed">
                    To renew your driving license, you must first complete an <strong>eye test</strong> at an approved optical center. Once cleared, you can renew via the <strong>MOI App</strong> or <strong>RTA Website</strong>. 
                </p>
                <ul className="list-disc list-inside mt-3 text-sm text-gray-600 space-y-1">
                    <li>Cost: Approx. AED 300 + Eye Test fees.</li>
                    <li>Validity: 5 Years (Residents), 10 Years (Citizens).</li>
                    <li>Fine: AED 10 per month for late renewal.</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-blue-100 flex gap-4 text-xs text-gray-500">
                    <span>Source: RTA Official Portal (Updated 2025)</span>
                </div>
            </CardContent>
        </Card>
      )}

      {/* Community Questions Feed */}
      <h2 className="font-bold text-xl text-gray-900 pt-4">Recent Discussions</h2>
      <div className="grid gap-4">
        
        {/* Mock Question 1 */}
        <Card>
            <CardContent className="p-5">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="font-semibold text-gray-800 hover:underline cursor-pointer">
                            Golden Visa requirements for software engineers?
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                            I heard the salary requirement changed recently. Does anyone know if the 30k AED limit is still strict?
                        </p>
                    </div>
                    <Badge variant="secondary">Visa</Badge>
                </div>
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                        <User className="h-3 w-3" /> Omar K.
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> 12 Replies
                    </div>
                    <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" /> 45 Helpful
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Mock Question 2 */}
        <Card>
            <CardContent className="p-5">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="font-semibold text-gray-800 hover:underline cursor-pointer">
                            Best way to pay SEWA bill without login?
                        </h3>
                        <p className="text-sm text-gray-500">
                            Is there a quick pay option? I lost my account password.
                        </p>
                    </div>
                    <Badge variant="secondary">Utilities</Badge>
                </div>
                <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                        <User className="h-3 w-3" /> Sarah J.
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" /> 3 Replies
                    </div>
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}