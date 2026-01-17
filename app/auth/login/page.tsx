"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShieldCheck, User, Briefcase } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // This function handles the "Fake" login logic
  const handleSimulatedLogin = async (role: "resident" | "employee") => {
    setLoading(true);
    
    // We use hardcoded credentials that match our API route
    const email = role === "resident" ? "resident@uae.ae" : "admin@gov.ae";
    const password = "123"; 

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
        if(role === "resident") router.push("/resident/dashboard");
        else router.push("/employee/dashboard");
    } else {
        setLoading(false);
        alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-uae-light flex flex-col items-center justify-center p-4">
      
      {/* 1. Authentic Header */}
      <div className="mb-10 text-center space-y-4">
        <div className="mx-auto w-24 h-24 bg-white rounded-3xl shadow-sm flex items-center justify-center border border-gray-100">
             {/* This simulates the UAE Pass App Icon */}
             <ShieldCheck className="h-12 w-12 text-uae-green" />
        </div>
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Soutak</h1>
            <p className="text-gray-500 text-sm">Unified Government Services</p>
        </div>
      </div>

      {/* 2. The Main "UAE Pass" Card */}
      <Card className="w-full max-w-sm shadow-xl border-none bg-white">
        <CardContent className="pt-8 pb-8 px-8 flex flex-col gap-6">
          <div className="text-center space-y-2">
            <h2 className="font-semibold text-xl">Sign In</h2>
            <p className="text-gray-400 text-sm">Access securely using your digital identity</p>
          </div>

          {/* 3. The "Demo" Modal Trigger */}
          <Dialog>
            <DialogTrigger asChild>
                <Button 
                    className="w-full h-14 text-lg font-medium bg-uae-green hover:bg-[#005036] transition-all rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                    disabled={loading}
                >
                  <ShieldCheck className="w-6 h-6 text-white/90" />
                  Log in with UAE Pass
                </Button>
            </DialogTrigger>

            {/* 4. The Hidden "Hackathon Control" Panel */}
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Demo Mode</DialogTitle>
                <DialogDescription>
                  Select a persona to simulate the login experience.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 pt-4">
                
                {/* Resident Option */}
                <div 
                    onClick={() => handleSimulatedLogin("resident")}
                    className="cursor-pointer border-2 border-gray-100 hover:border-uae-green hover:bg-green-50 rounded-xl p-4 flex flex-col items-center gap-3 transition-all"
                >
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-uae-green">
                        <User className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-sm">Resident</span>
                </div>

                {/* Employee Option */}
                <div 
                    onClick={() => handleSimulatedLogin("employee")}
                    className="cursor-pointer border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 rounded-xl p-4 flex flex-col items-center gap-3 transition-all"
                >
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Briefcase className="h-5 w-5" />
                    </div>
                    <span className="font-semibold text-sm">Govt. Employee</span>
                </div>

              </div>
            </DialogContent>
          </Dialog>

          <div className="text-center">
            <p className="text-xs text-gray-300">By logging in, you agree to the Terms of Service</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}