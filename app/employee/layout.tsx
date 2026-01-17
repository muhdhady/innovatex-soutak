import Link from "next/link";
import { 
  LayoutDashboard, 
  Ticket, 
  Settings, 
  LogOut, 
  ShieldCheck 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-uae-dark text-white hidden md:flex flex-col">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-700">
          <ShieldCheck className="h-6 w-6 text-uae-green" />
          <span className="font-bold text-lg tracking-wide">GovPortal</span>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <Link href="/employee/dashboard">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/employee/tickets">
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
              <Ticket className="mr-2 h-4 w-4" />
              Tickets Queue
            </Button>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-uae-green flex items-center justify-center font-bold">
              FA
            </div>
            <div>
              <p className="text-sm font-medium">Fatima Al Kaabi</p>
              <p className="text-xs text-gray-400">Senior Officer</p>
            </div>
          </div>
          <Link href="/auth/login">
            <Button variant="outline" className="w-full border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700 bg-transparent">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}