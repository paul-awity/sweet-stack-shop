
import React from 'react';
import { Button } from "@/components/ui/button";
import { usePaystackPayment } from 'react-paystack';

interface PaystackButtonProps {
  email: string;
  amount: number;
  onSuccess: () => void;
}

interface PaystackResponse {
  reference: string;
  status: string;
  message: string;
  transaction: string;
}

const PaystackButton: React.FC<PaystackButtonProps> = ({ email, amount, onSuccess }) => {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

  const config = {
    reference: (new Date()).getTime().toString(),
    email,
    amount, // Amount is in the smallest currency unit (kobo/cent)
    publicKey,
  };

  const initializePayment = usePaystackPayment(config);

  const handleSuccess = () => {
    console.log('Payment successful');
    onSuccess();
  };

  const handleClose = () => {
    console.log('Payment closed');
  }

  return (
    <Button 
      onClick={() => {
        initializePayment(handleSuccess, handleClose);
      }}
      className="w-full bg-cake-500 hover:bg-cake-600"
    >
      Pay with Paystack
    </Button>
  );
};

export default PaystackButton;
