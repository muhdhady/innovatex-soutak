"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Zap, 
    Car, 
    Wifi, 
    Smartphone, 
    CreditCard, 
    Flame, 
    AlertCircle, 
    Droplets,
    ArrowRight
} from "lucide-react";

const services = [
  { 
    name: "DEWA", 
    icon: Zap, 
    color: "text-green-600", 
    bg: "bg-green-50", 
    desc: "Electricity & Water",
    due: "AED 450.00"
  },
  { 
    name: "SEWA", 
    icon: Zap, 
    color: "text-blue-600", 
    bg: "bg-blue-50", 
    desc: "Sharjah Electricity",
    due: "Paid"
  },
  { 
    name: "RTA", 
    icon: Car, 
    color: "text-red-600", 
    bg: "bg-red-50", 
    desc: "Vehicle Fines",
    due: "AED 200.00"
  },
  { 
    name: "Salik", 
    icon: CreditCard, 
    color: "text-orange-600", 
    bg: "bg-orange-50", 
    desc: "Toll Top-up",
    due: "Low Balance"
  },
  { 
    name: "Etisalat", 
    icon: Wifi, 
    color: "text-emerald-600", 
    bg: "bg-emerald-50", 
    desc: "eLife Connection",
    due: "AED 399.00"
  },
  { 
    name: "Du", 
    icon: Smartphone, 
    color: "text-cyan-600", 
    bg: "bg-cyan-50", 
    desc: "Postpaid Mobile",
    due: "Paid"
  },
  { 
    name: "MOI Fines", 
    icon: AlertCircle, 
    color: "text-gray-600", 
    bg: "bg-gray-50", 
    desc: "Federal Traffic",
    due: "Clear"
  },
  { 
    name: "Empower", 
    icon: Flame, 
    color: "text-blue-500", 
    bg: "bg-blue-50", 
    desc: "District Cooling",
    due: "AED 120.50"
  },
];

export default function PayPage() {
  const handlePay = (serviceName: string) => {
    alert(`Redirecting to ${serviceName} payment gateway...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-500">Manage all your government and utility bills in one place.</p>
        </div>
        <Card className="w-fit bg-uae-dark text-white border-none shadow-lg">
            <CardContent className="p-4 flex items-center gap-4">
                <div>
                    <p className="text-xs text-gray-300 opacity-80">TOTAL DUE</p>
                    <p className="text-2xl font-bold">AED 1,169.50</p>
                </div>
                <Button variant="secondary" className="bg-white text-uae-dark hover:bg-gray-100">
                    Pay All
                </Button>
            </CardContent>
        </Card>
      </div>

      {/* Grid of Services */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {services.map((service) => (
            <Card 
                key={service.name} 
                onClick={() => handlePay(service.name)}
                className="group cursor-pointer hover:shadow-md transition-all border-gray-100"
            >
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                    {/* Icon Bubble */}
                    <div className={`h-16 w-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${service.bg} ${service.color}`}>
                        <service.icon className="h-8 w-8" />
                    </div>
                    
                    {/* Text Info */}
                    <div className="space-y-1">
                        <h3 className="font-bold text-gray-900">{service.name}</h3>
                        <p className="text-xs text-gray-500">{service.desc}</p>
                    </div>

                    {/* Status / Price */}
                    <div className={`text-sm font-semibold py-1 px-3 rounded-full ${
                        service.due === "Paid" || service.due === "Clear" 
                        ? "bg-gray-100 text-gray-500" 
                        : "bg-red-50 text-red-600"
                    }`}>
                        {service.due}
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}