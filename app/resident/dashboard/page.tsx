import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; 
import { 
    AlertTriangle, 
    MessageSquare, 
    CreditCard, 
    ArrowRight, 
    Trophy,
    Activity
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, Ahmed.</h1>
            <p className="text-gray-500">You are helping make the UAE better every day.</p>
        </div>
        {/* Mobile Points View (Hidden on Desktop) */}
        <div className="md:hidden flex items-center gap-3 bg-white p-3 rounded-xl border shadow-sm">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <div>
                <p className="text-xs text-gray-400 font-bold">CURRENT SCORE</p>
                <p className="font-bold text-uae-green">1,240 pts</p>
            </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Points Card */}
        <Card className="col-span-2 shadow-sm border-gray-200">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase">Contribution Level</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">Gold Member</div>
            <div className="mt-3">
                <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span>1,240 pts</span>
                    <span>Next: Platinum (2,000)</span>
                </div>
                {/* Visual Progress Bar simulating gamification */}
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-[62%] rounded-full"></div>
                </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions Answered */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase">Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">12</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <Activity className="h-3 w-3" /> +2 this week
            </p>
          </CardContent>
        </Card>

        {/* Active Tickets */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase">Pending Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-800">1</div>
            <p className="text-xs text-gray-400 mt-1">
                Awaiting Review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Primary Actions */}
      <h2 className="text-lg font-semibold text-gray-900 pt-2">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Report Issue */}
        <Link href="/resident/report" className="group">
            <Card className="h-full hover:shadow-md transition-all cursor-pointer border-l-4 border-l-red-500 hover:border-l-8">
                <CardContent className="p-6 flex flex-col items-start gap-4">
                    <div className="h-12 w-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <AlertTriangle className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">Report Issue</h3>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            Spotted something wrong? Report infrastructure or service issues instantly.
                        </p>
                    </div>
                    <Button variant="ghost" className="p-0 text-red-600 font-semibold mt-auto hover:bg-transparent group-hover:gap-2 transition-all">
                        Create Ticket <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </Link>

        {/* 2. Ask Question */}
        <Link href="/resident/forum" className="group">
            <Card className="h-full hover:shadow-md transition-all cursor-pointer border-l-4 border-l-blue-500 hover:border-l-8">
                <CardContent className="p-6 flex flex-col items-start gap-4">
                    <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">Community Forum</h3>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            Have a question? Get instant answers from AI or the community.
                        </p>
                    </div>
                    <Button variant="ghost" className="p-0 text-blue-600 font-semibold mt-auto hover:bg-transparent group-hover:gap-2 transition-all">
                        Ask Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </Link>

        {/* 3. Pay Bills */}
        <Link href="/resident/pay" className="group">
            <Card className="h-full hover:shadow-md transition-all cursor-pointer border-l-4 border-l-green-500 hover:border-l-8">
                <CardContent className="p-6 flex flex-col items-start gap-4">
                    <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                        <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900">Payments</h3>
                        <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                            Pay DEWA, SEWA, Salik, and fines in one unified portal.
                        </p>
                    </div>
                    <Button variant="ghost" className="p-0 text-green-600 font-semibold mt-auto hover:bg-transparent group-hover:gap-2 transition-all">
                        Pay Bills <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
            </Card>
        </Link>

      </div>
    </div>
  );
}