"use client";

import { useState } from "react";
import { createTicket } from "@/app/actions"; // Import the Server Action
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2, MapPin } from "lucide-react";

export default function ReportIssuePage() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Infrastructure");
  const [aiPreview, setAiPreview] = useState("");

  // Simulated Client-Side AI Preview
  const handleAiCheck = () => {
    setLoading(true);
    setTimeout(() => {
        setAiPreview("Based on your description, this will be routed to the **Roads & Transport Authority (RTA)** with **High Priority**.");
        setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Report an Issue</h1>
        <p className="text-gray-500">
            Our AI Assistant will analyze your report and route it instantly.
        </p>
      </div>

      <Card className="shadow-lg border-t-4 border-t-uae-green">
        <CardHeader>
            <CardTitle>Issue Details</CardTitle>
        </CardHeader>
        <CardContent>
          {/* We use the Server Action 'createTicket' here */}
          <form action={createTicket} className="space-y-6">
            
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input name="title" placeholder="e.g., Pothole on Sheikh Zayed Road" required />
            </div>

            {/* Hidden Input for Category */}
            <input type="hidden" name="category" value={category} />

            {/* Category Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <div className="flex gap-2 flex-wrap">
                {['Infrastructure', 'Sanitation', 'Noise', 'Traffic'].map((cat) => (
                    <div 
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`cursor-pointer px-4 py-2 rounded-full text-sm border transition-all ${
                            category === cat 
                            ? 'bg-uae-green text-white border-uae-green shadow-md' 
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        {cat}
                    </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                name="description" 
                placeholder="Describe the location and the issue in detail..." 
                className="min-h-[120px]"
                required
              />
            </div>

            {/* AI Assistant Section */}
            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-800">
                        <Wand2 className="h-4 w-4" />
                        <span className="text-sm font-bold">AI Pre-Check</span>
                    </div>
                    <Button 
                        type="button" 
                        size="sm"
                        variant="ghost"
                        onClick={handleAiCheck}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                    >
                        {loading ? "Analyzing..." : "Analyze Priority"}
                    </Button>
                </div>
                
                {aiPreview && (
                    <p className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-blue-100 animate-in fade-in" 
                       dangerouslySetInnerHTML={{ __html: aiPreview }} 
                    />
                )}
            </div>

            <Button 
                type="submit" 
                className="w-full bg-uae-green hover:bg-[#005036] h-12 text-lg font-medium shadow-md transition-all hover:scale-[1.01]"
            >
              Submit Ticket
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}