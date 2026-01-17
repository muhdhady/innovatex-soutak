import Link from "next/link";
import { ShieldCheck, User, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ResidentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-uae-light flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/resident/dashboard" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-uae-green/10 rounded-lg flex items-center justify-center group-hover:bg-uae-green/20 transition-colors">
                <ShieldCheck className="h-5 w-5 text-uae-green" />
            </div>
            <span className="font-bold text-xl tracking-tight text-uae-dark">Soutak</span>
          </Link>

          {/* Right Side: Gamification & Profile */}
          <div className="flex items-center gap-4">
            
            {/* Gamification Points (Visible on Desktop) */}
            <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">Citizen Score</span>
                <span className="text-uae-green font-bold text-lg leading-none">1,240 pts</span>
            </div>

            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-uae-dark relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
            </Button>

            {/* Avatar Placeholder */}
            <div className="h-9 w-9 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                <User className="h-5 w-5 text-gray-500" />
            </div>
            
            {/* Logout */}
            <Link href="/auth/login">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500">
                    <LogOut className="h-5 w-5" />
                </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 py-8">
        {children}
      </main>
    </div>
  );
}