
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreditCard, UserRound } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PaystackButton from '@/components/PaystackButton';
import MpesaPayment from '@/components/MpesaPayment';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from '../store/cartStore';
import { useSettingsStore } from '../store/settingsStore';
import { nanoid } from 'nanoid';

const schema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
  address: z.string().min(5, { message: 'Address is required' }),
  city: z.string().min(2, { message: 'City is required' }),
  state: z.string().min(2, { message: 'State is required' }),
});

type FormValues = z.infer<typeof schema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const { settings } = useSettingsStore();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'mpesa' | 'card'>('card');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isGuest, setIsGuest] = useState(true);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: 'Lagos',
    }
  });

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="pt-24 min-h-screen">
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-3xl font-bold mb-6">Your cart is empty</h1>
            <p className="mb-8">You haven't added any items to your cart yet.</p>
            <Button onClick={() => navigate('/products')}>Browse Products</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleCheckout = (data: FormValues) => {
    if (paymentMethod === 'card') {
      // This would be integrated with another payment processor in a real app
      setIsProcessingOrder(true);
      
      setTimeout(() => {
        completeOrder(data, `CARD-${nanoid(8)}`);
      }, 2000);
    }
    // Paystack and M-Pesa are handled in their respective components
  };

  const handlePaystackSuccess = () => {
    const data = form.getValues();
    completeOrder(data, `PAYSTACK-${nanoid(8)}`);
  };

  const handleMpesaSuccess = (transactionId: string) => {
    const data = form.getValues();
    completeOrder(data, transactionId);
  };

  const completeOrder = (data: FormValues, transactionId: string) => {
    setIsProcessingOrder(false);
    
    // We would normally send this to a backend API
    const orderData = {
      id: `ORD-${nanoid(8)}`,
      customer: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      },
      shipping: {
        address: data.address,
        city: data.city,
        state: data.state,
      },
      items: items,
      total: total,
      deliveryFee: settings.deliveryFee,
      grandTotal: total + settings.deliveryFee,
      paymentMethod,
      transactionId,
      status: 'Processing',
      created: new Date().toISOString(),
    };

    // Store order in local storage for demo purposes
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear the cart and redirect to a success page
    clearCart();
    
    toast({
      title: "Order Placed Successfully!",
      description: `Your order #${orderData.id} has been placed successfully.`,
    });
    
    navigate(`/delivery/${orderData.id}`);
  };

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-center mb-8">Checkout</h1>

          {settings.enableGuestCheckout && !isLoggedIn && (
            <div className="max-w-3xl mx-auto mb-8">
              <Tabs defaultValue={isGuest ? "guest" : "login"} className="w-full" onValueChange={(value) => setIsGuest(value === "guest")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="guest">
                    <UserRound className="h-4 w-4 mr-2" />
                    Guest Checkout
                  </TabsTrigger>
                  <TabsTrigger value="login">
                    <UserRound className="h-4 w-4 mr-2" />
                    Login
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="guest" className="pt-4">
                  <p className="text-gray-600 mb-4">
                    Continue as a guest to checkout without creating an account.
                  </p>
                </TabsContent>

                <TabsContent value="login" className="pt-4">
                  <div className="text-center py-8">
                    <p className="mb-4">Please log in to continue with checkout.</p>
                    <Button onClick={() => navigate('/login')} className="bg-cake-500 hover:bg-cake-600">
                      Log In
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              
              <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(handleCheckout)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Your street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Your city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Your state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-4 pt-4">Payment Method</h2>
                  
                  <div className="border rounded-md p-4">
                    <Tabs 
                      defaultValue="card" 
                      onValueChange={(value) => setPaymentMethod(value as 'card' | 'paystack' | 'mpesa')}
                      className="w-full"
                    >
                      <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
                        <TabsTrigger value="card">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Credit Card
                        </TabsTrigger>
                        {settings.enablePaystack && (
                          <TabsTrigger value="paystack">
                            <img 
                              src="https://paystack.com/favicon.png" 
                              alt="Paystack" 
                              className="h-4 w-4 mr-2" 
                            />
                            Paystack
                          </TabsTrigger>
                        )}
                        {settings.enableMpesa && (
                          <TabsTrigger value="mpesa">
                            <Phone className="h-4 w-4 mr-2" />
                            M-Pesa
                          </TabsTrigger>
                        )}
                      </TabsList>
                      
                      <TabsContent value="card" className="pt-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="1234 5678 9012 3456" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            
                            <div>
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" />
                            </div>
                          </div>
                          
                          <Button 
                            className="w-full bg-cake-500 hover:bg-cake-600" 
                            type="submit"
                            disabled={isProcessingOrder}
                          >
                            {isProcessingOrder ? 'Processing...' : 'Complete Order'}
                          </Button>
                        </div>
                      </TabsContent>
                      
                      {settings.enablePaystack && (
                        <TabsContent value="paystack" className="pt-4">
                          <PaystackButton
                            email={form.getValues('email') || 'customer@example.com'}
                            amount={Math.round((total + settings.deliveryFee) * 100)}
                            onSuccess={handlePaystackSuccess}
                          />
                        </TabsContent>
                      )}
                      
                      {settings.enableMpesa && (
                        <TabsContent value="mpesa" className="pt-4">
                          <MpesaPayment
                            amount={total + settings.deliveryFee}
                            onSuccess={handleMpesaSuccess}
                          />
                        </TabsContent>
                      )}
                    </Tabs>
                  </div>
                </form>
              </Form>
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="bg-gray-50 p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <span className="font-medium">{item.cake.name}</span>
                        <span className="text-gray-500 block text-sm">
                          Qty: {item.quantity}
                        </span>
                      </div>
                      <span>
                        {new Intl.NumberFormat('en-NG', {
                          style: 'currency',
                          currency: settings.currencyCode,
                        }).format(item.cake.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      {new Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: settings.currencyCode,
                      }).format(total)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>
                      {new Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: settings.currencyCode,
                      }).format(settings.deliveryFee)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat('en-NG', {
                        style: 'currency',
                        currency: settings.currencyCode,
                      }).format(total + settings.deliveryFee)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
