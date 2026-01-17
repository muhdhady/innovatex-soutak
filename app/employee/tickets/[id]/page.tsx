import { prisma } from "@/lib/prisma";
import { TicketActionPanel } from "./ticket-actions"; // Extracting client logic
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, MapPin, User, Sparkles } from "lucide-react";

interface PageProps { params: Promise<{ id: string }>; }

export default async function TicketDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  const ticket = await prisma.ticket.findUnique({ where: { id } });

  if (!ticket) return <div>Ticket not found</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 animate-in slide-in-from-bottom-2">
      
      {/* Header with Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">Ticket Details</h1>
                <Badge variant={ticket.status === "OPEN" ? "destructive" : "secondary"}>{ticket.status}</Badge>
            </div>
            <p className="text-gray-500 mt-1">Reference ID: #{id.slice(-6).toUpperCase()}</p>
        </div>
        
        {/* Functional Buttons Component */}
        <TicketActionPanel ticketId={ticket.id} currentStatus={ticket.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Info */}
        <Card className="md:col-span-2 shadow-sm">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    AI Analysis & Summary
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                
                {/* AI Box */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-2">
                    <div className="flex justify-between items-start">
                        <p className="text-blue-900 text-sm font-medium leading-relaxed">
                            {ticket.aiSummary || "No AI summary generated for this ticket."}
                        </p>
                    </div>
                    {/* Trust Indicator */}
                    <div className="flex items-center gap-2 pt-2 border-t border-blue-100/50 mt-2">
                         {ticket.aiAccuracy ? (
                            <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-[10px]">
                                <CheckCircle className="h-3 w-3 mr-1" /> Verified by Resident
                            </Badge>
                         ) : (
                            <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 text-[10px]">
                                <AlertTriangle className="h-3 w-3 mr-1" /> Flagged Inaccurate
                            </Badge>
                         )}
                    </div>
                </div>
                
                {/* User Description */}
                <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900 border-l-4 border-uae-dark pl-3">Resident Description</h3>
                    <p className="text-gray-600 text-sm leading-relaxed p-4 bg-gray-50 rounded-lg">
                        "{ticket.description}"
                    </p>
                </div>
            </CardContent>
        </Card>

        {/* Sidebar Info */}
        <Card className="h-fit shadow-sm">
            <CardHeader>
                <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <span className="text-xs text-gray-400">PRIORITY LEVEL</span>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`font-bold ${ticket.priority === "IMMEDIATE" ? "text-purple-600" : ticket.priority === "HIGH" ? "text-red-600" : "text-gray-700"}`}>
                            {ticket.priority}
                        </span>
                        {ticket.priority === "HIGH" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                </div>
                
                <div className="border-t pt-4">
                    <span className="text-xs text-gray-400">VIRAL SCORE</span>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-xl font-bold">{ticket.reportCount}</span>
                        <span className="text-xs text-gray-500">Reports merged</span>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <span className="text-xs text-gray-400">SUBMITTED BY</span>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Ahmed Al Mansoori</p>
                            <p className="text-xs text-gray-500">Resident</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}