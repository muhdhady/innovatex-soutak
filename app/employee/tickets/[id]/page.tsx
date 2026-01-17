import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

// Correct Type for Next.js 16
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TicketDetailPage({ params }: PageProps) {
  // Await the params to get the ID
  const { id } = await params;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Ticket Details</h1>
            <p className="text-gray-500">Reference ID: {id}</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                <XCircle className="mr-2 h-4 w-4" /> Reject
            </Button>
            <Button className="bg-uae-green hover:bg-[#005036]">
                <CheckCircle className="mr-2 h-4 w-4" /> Approve & Assign
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        
        {/* Main Info */}
        <Card className="col-span-2">
            <CardHeader>
                <CardTitle className="text-lg">Issue Summary (AI Generated)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-800 text-sm">
                    <strong>AI Analysis:</strong> This user reported a "Broken Street Light" at Al Nahda 2. The attached image suggests exposed wiring which poses a high safety risk. Recommended Priority: <strong>HIGH</strong>.
                </div>
                
                <div className="space-y-1">
                    <h3 className="font-medium text-gray-900">User Description</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        "I was walking near the park entrance and saw the light pole (number 492) is completely dark and the cover at the bottom is broken. Wires are coming out. It is dangerous for kids."
                    </p>
                </div>
            </CardContent>
        </Card>

        {/* Sidebar Info */}
        <Card className="col-span-1 h-fit">
            <CardHeader>
                <CardTitle className="text-sm text-gray-500 uppercase">Metadata</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <span className="text-xs text-gray-400">STATUS</span>
                    <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="font-medium">Pending Review</span>
                    </div>
                </div>
                <div>
                    <span className="text-xs text-gray-400">SUBMITTED BY</span>
                    <p className="font-medium mt-1">Ahmed Al Mansoori</p>
                    <p className="text-xs text-gray-500">Resident (Score: 1,240)</p>
                </div>
                <div>
                    <span className="text-xs text-gray-400">LOCATION</span>
                    <p className="font-medium mt-1">Al Nahda 2, Sharjah</p>
                </div>
            </CardContent>
        </Card>

      </div>
    </div>
  );
}