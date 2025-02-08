"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactUsPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
      
      <Card className="mb-6">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-500" />
            <p>Email: support@marketplace.com</p>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-500" />
            <p>Phone: 0123-456-789</p>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <p>Address: 123 ABC Street, District 1, Ho Chi Minh City</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
