
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '../hooks/use-toast';
import { useCartStore } from '../store/cartStore';

interface PaystackButtonProps {
  email: string;
  amount: number;
  onSuccess: () => void;
}

const PaystackButton = ({ email, amount, onSuccess }: PaystackButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { clearCart } = useCartStore();

  const handlePayment = () => {
    setIsProcessing(true);
    // In a real implementation, we would integrate with Paystack SDK
    // For demo purposes, we're simulating a successful payment
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: 'Payment Successful',
        description: 'Your order has been placed successfully!',
      });
      clearCart();
      onSuccess();
    }, 2000);
  };

  return (
    <Button 
      onClick={handlePayment} 
      disabled={isProcessing}
      className="w-full bg-green-600 hover:bg-green-700"
    >
      {isProcessing ? 'Processing...' : `Pay ₦${(amount / 100).toLocaleString()}`}
    </Button>
  );
};

export default PaystackButton;

// For real Paystack integration, we would use:
// import { usePaystackPayment } from 'react-paystack';
// const config = {
//   reference: (new Date()).getTime().toString(),
//   email,
//   amount,
//   publicKey: 'pk_test_your_paystack_public_key',
// };
// const initializePayment = usePaystackPayment(config);
// initializePayment(onSuccess, () => console.log('closed'));
