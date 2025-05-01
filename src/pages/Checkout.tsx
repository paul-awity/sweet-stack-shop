import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useCartStore } from '../store/cartStore';
import { useDeliveryStore } from '../store/deliveryStore';
import { nanoid } from 'nanoid';
import PaystackButton from '../components/PaystackButton';
import MpesaPayment from '../components/MpesaPayment';
import { Phone } from 'lucide-react';
import { useSettingsStore } from '../store/settingsStore';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Checkout = () => {
  const { cart, clearCart, calculateTotal } = useCartStore();
  const { addDelivery } = useDeliveryStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { settings } = useSettingsStore();

  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });
  const [paymentStep, setPaymentStep] = useState<'customer' | 'method'>('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deliveryFee = settings.deliveryFee;
  const currencyCode = settings.currencyCode;
  const enableMpesa = settings.enableMpesa;
  const enablePaystack = settings.enablePaystack;
  const enableGuestCheckout = settings.enableGuestCheckout;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(customerDetails).some(value => value.trim() === '')) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields.',
        variant: 'destructive',
      });
      return;
    }
    setPaymentStep('method');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currencyCode || 'NGN',
    }).format(price);
  };

  const total = calculateTotal();

  const handlePaymentSuccess = (transactionId: string) => {
    setIsSubmitting(true);
    const deliveryId = nanoid();
    const deliveryData = {
      id: deliveryId,
      customerDetails,
      cartItems: cart,
      total,
      deliveryFee,
      transactionId,
      status: 'pending',
    };

    addDelivery(deliveryData);
    clearCart();
    setIsSubmitting(false);
    toast({
      title: 'Order Placed',
      description: `Your order has been placed successfully. Delivery ID: ${deliveryId}`,
    });
    navigate(`/delivery/${deliveryId}`);
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="container px-4 mx-auto py-8">
          <h1 className="font-serif text-3xl font-bold mb-6">Checkout</h1>
          
          {paymentStep === 'customer' && (
            <div className="max-w-lg mx-auto">
              <h2 className="text-xl font-medium mb-6">Customer Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={customerDetails.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={customerDetails.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={customerDetails.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={customerDetails.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={customerDetails.address}
                    onChange={handleChange}
                    placeholder="Delivery Address"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    value={customerDetails.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    value={customerDetails.state}
                    onChange={handleChange}
                    placeholder="State"
                  />
                </div>
                <Button type="submit" className="w-full bg-cake-500 hover:bg-cake-600">
                  Proceed to Payment
                </Button>
              </form>
            </div>
          )}
          
          {paymentStep === 'method' && (
            <div className="max-w-lg mx-auto">
              <h2 className="text-xl font-medium mb-6">Select Payment Method</h2>
              
              <div className="space-y-4">
                {enablePaystack && (
                  <div className="border p-4 rounded-lg">
                    <PaystackButton
                      amount={total + deliveryFee}
                      email={email}
                      onSuccess={handlePaymentSuccess}
                      text="Pay with Paystack"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Secure payment via Paystack
                    </p>
                  </div>
                )}
                
                {enableMpesa && (
                  <div className="border p-4 rounded-lg">
                    <MpesaPayment
                      amount={total + deliveryFee}
                      onSuccess={handlePaymentSuccess}
                    />
                  </div>
                )}
                
                <div className="border p-4 rounded-lg">
                  <Button
                    onClick={() => handlePaymentSuccess('PAY-ON-DELIVERY')}
                    variant="outline"
                    className="w-full"
                  >
                    Pay on Delivery
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    Pay with cash when your order arrives
                  </p>
                </div>
              </div>
              
              <Button
                onClick={() => setPaymentStep('customer')}
                variant="ghost"
                className="mt-6"
              >
                Back
              </Button>
            </div>
          )}
          
          <div className="max-w-lg mx-auto mt-8">
            <h2 className="text-xl font-medium mb-6">Order Summary</h2>
            <ul className="divide-y divide-gray-200">
              {cart.map((item: CartItem) => (
                <li key={item.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded mr-4" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2">
              <div className="flex justify-between">
                <p className="font-medium">Subtotal:</p>
                <p className="font-medium">{formatPrice(total)}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">Delivery Fee:</p>
                <p className="font-medium">{formatPrice(deliveryFee)}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Total:</p>
                <p className="font-bold">{formatPrice(total + deliveryFee)}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;
