"use client";

import { useState } from "react";
import { createTicket } from "@/app/actions/resident-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function ReportIssuePage() {
  const [step, setStep] = useState<"input" | "review" | "submit">("input");
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Infrastructure");
  
  // AI State
  const [aiSummary, setAiSummary] = useState("");
  const [aiAccuracy, setAiAccuracy] = useState(true);

  // 1. Mock AI Generator
  const generateAiSummary = () => {
    if (!description) return;
    setLoading(true);

    // Simulate "Thinking" time
    setTimeout(() => {
      // Dynamic logic to make it feel real
      const isUrgent = description.toLowerCase().includes("danger") || description.toLowerCase().includes("urgent");
      const dept = category === "Traffic" ? "RTA" : category === "Sanitation" ? "Waste Mgmt" : "Municipality";
      
      const summary = `Resident reported a ${category} issue regarding "${title}". \n\nAnalysis:\n• Department: ${dept}\n• Urgency: ${isUrgent ? "HIGH" : "Normal"}\n• Key Insight: User provided detailed location data.`;
      
      setAiSummary(summary);
      setStep("review");
      setLoading(false);
    }, 1500);
  };

  // 2. Handle User Verification
  const handleVerification = (isAccurate: boolean) => {
    setAiAccuracy(isAccurate);
    setStep("submit");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Report an Issue</h1>
        <p className="text-gray-500">
            Describe the issue, and our AI will categorize and route it for you.
        </p>
      </div>

      <Card className="shadow-lg border-t-4 border-t-uae-green">
        <CardHeader>
            <CardTitle>Issue Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createTicket} className="space-y-6">
            
            {/* Hidden Inputs to pass data to Server Action */}
            <input type="hidden" name="title" value={title} />
            <input type="hidden" name="description" value={description} />
            <input type="hidden" name="category" value={category} />
            <input type="hidden" name="aiSummary" value={aiSummary} />
            <input type="hidden" name="aiAccuracy" value={String(aiAccuracy)} />

            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Pothole on Sheikh Zayed Road" 
                required 
                disabled={step !== "input"}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <div className="flex gap-2 flex-wrap">
                {['Infrastructure', 'Sanitation', 'Noise', 'Traffic'].map((cat) => (
                    <div 
                        key={cat}
                        onClick={() => step === "input" && setCategory(cat)}
                        className={`cursor-pointer px-4 py-2 rounded-full text-sm border transition-all ${
                            category === cat 
                            ? 'bg-uae-green text-white border-uae-green shadow-md' 
                            : 'bg-white text-gray-600 hover:bg-gray-50'
                        } ${step !== "input" ? 'opacity-60 cursor-not-allowed' : ''}`}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the location and the issue in detail..." 
                className="min-h-[120px]"
                required
                disabled={step !== "input"}
              />
            </div>

            {/* STEP 1: GENERATE BUTTON */}
            {step === "input" && (
                <Button 
                    type="button" 
                    onClick={generateAiSummary}
                    disabled={!title || !description || loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-lg font-medium shadow-md transition-all gap-2"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="h-5 w-5" />}
                    {loading ? "AI is Analyzing..." : "Generate AI Summary"}
                </Button>
            )}

            {/* STEP 2: REVIEW AI SUMMARY */}
            {step !== "input" && (
                <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center gap-2 text-blue-800">
                        <Sparkles className="h-5 w-5 fill-blue-200" />
                        <span className="text-sm font-bold uppercase tracking-wider">AI Generated Summary</span>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-blue-100 text-gray-700 text-sm whitespace-pre-line leading-relaxed shadow-sm">
                        {aiSummary}
                    </div>

                    {step === "review" ? (
                        <div className="space-y-3 pt-2">
                            <p className="text-sm font-medium text-center text-gray-600">Is this summary accurate?</p>
                            <div className="flex gap-3">
                                <Button 
                                    type="button" 
                                    onClick={() => handleVerification(true)}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                >
                                    <CheckCircle className="mr-2 h-4 w-4" /> Yes, looks good
                                </Button>
                                <Button 
                                    type="button" 
                                    onClick={() => handleVerification(false)}
                                    variant="outline"
                                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                                >
                                    <XCircle className="mr-2 h-4 w-4" /> No, it missed details
                                </Button>
                            </div>
                        </div>
                    ) : (
                        // Show Result of User Verification
                        <div className="flex items-center gap-2 text-sm justify-center pt-2">
                            {aiAccuracy ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1 pl-1 pr-3 py-1">
                                    <CheckCircle className="h-3.5 w-3.5" /> Verified by You
                                </Badge>
                            ) : (
                                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1 pl-1 pr-3 py-1">
                                    <AlertCircle className="h-3.5 w-3.5" /> Marked as Inaccurate
                                </Badge>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* STEP 3: FINAL SUBMIT */}
            {step === "submit" && (
                <Button 
                    type="submit" 
                    className="w-full bg-uae-green hover:bg-[#005036] h-12 text-lg font-medium shadow-md transition-all animate-in slide-in-from-bottom-2"
                >
                    Submit Official Report
                </Button>
            )}

          </form>
        </CardContent>
      </Card>
    </div>
  );
}