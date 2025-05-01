
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Phone } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface MpesaPaymentProps {
  amount: number;
  onSuccess: (transactionId: string) => void;
}

const MpesaPayment: React.FC<MpesaPaymentProps> = ({ amount, onSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid phone number',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    
    // In a real implementation, this would call an API endpoint to initiate M-Pesa payment
    // For demo purposes, we'll simulate a successful payment after 3 seconds
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      
      const mockTransactionId = `MPESA-${Date.now()}`;
      toast({
        title: 'Payment Successful',
        description: `Transaction ID: ${mockTransactionId}`,
      });
      
      onSuccess(mockTransactionId);
    }, 3000);
  };

  if (isPaid) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-md text-center">
        <Check className="w-12 h-12 text-green-500 mx-auto mb-2" />
        <p className="text-green-800 font-medium">M-Pesa payment successful!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone-number">M-Pesa Phone Number</Label>
        <div className="flex gap-2">
          <Input
            id="phone-number"
            type="tel"
            placeholder="e.g. 07XXXXXXXX"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isProcessing}
          />
        </div>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Pay with M-Pesa
          </span>
        )}
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        You will receive a prompt on your phone to complete the payment.
      </p>
    </form>
  );
};

export default MpesaPayment;
