import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCartStore } from '../store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '../hooks/use-toast';
import PaystackButton from '../components/PaystackButton';
import { useDeliveryStore, Delivery } from '../store/deliveryStore';
import { v4 as uuidv4 } from 'uuid';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const { addDelivery } = useDeliveryStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect to cart if empty
    if (items.length === 0) {
      navigate('/cart');
      toast({
        title: 'Empty Cart',
        description: 'Your cart is empty. Please add items before checkout.',
      });
    }
  }, [items, navigate, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed to payment
      // In a real app, you would store the order and customer details
    }
  };

  const handlePaymentSuccess = () => {
    // Create a new delivery
    const deliveryId = uuidv4();
    const orderId = uuidv4().substring(0, 8);
    
    const newDelivery: Delivery = {
      id: deliveryId,
      orderId,
      orderDate: new Date().toISOString(),
      status: 'preparing',
      estimatedArrival: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
      items: [...items],
      currentLocation: {
        lat: 6.5244,
        lng: 3.3792,
        address: 'Sweet Stack Bakery, Allen Avenue, Ikeja, Lagos'
      },
      destination: {
        lat: 6.4698,
        lng: 3.5852,
        address: `${formData.address}, ${formData.city}, ${formData.state}`
      },
      deliveryPerson: {
        id: 'dp1',
        name: 'John Doe',
        phone: '+2341234567890',
        image: 'https://i.pravatar.cc/150?img=32',
        rating: 4.8,
      },
      events: [
        {
          time: new Date().toISOString(),
          status: 'Order Confirmed',
          description: 'Your order has been confirmed and is being prepared.',
        }
      ],
    };
    
    addDelivery(newDelivery);
    clearCart();
    
    navigate(`/delivery/${deliveryId}`);
    toast({
      title: 'Order Successful!',
      description: 'Thank you for your order. We will deliver your cake soon!',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-16 min-h-screen">
        <div className="container px-4 mx-auto py-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-10 text-center">Checkout</h1>
          
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Customer Details */}
              <div>
                <h2 className="font-serif text-xl font-semibold mb-6">Your Details</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? 'border-red-500' : ''}
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500">{errors.firstName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? 'border-red-500' : ''}
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500">{errors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'border-red-500' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500">{errors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={errors.city ? 'border-red-500' : ''}
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500">{errors.city}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={errors.state ? 'border-red-500' : ''}
                      />
                      {errors.state && (
                        <p className="text-sm text-red-500">{errors.state}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>
                <div className="border rounded-lg p-6 bg-gray-50 mb-6">
                  <div className="space-y-4 mb-6">
                    <div className="max-h-60 overflow-auto">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between items-center py-2 border-b">
                          <div className="flex items-center gap-2">
                            <img 
                              src={item.cake.image} 
                              alt={item.cake.name} 
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{item.cake.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span>{formatPrice(item.cake.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery</span>
                      <span>{formatPrice(1500)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(total + 1500)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h2 className="font-serif text-xl font-semibold">Payment</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Complete your purchase securely with Paystack.
                  </p>
                  
                  {formData.email ? (
                    <PaystackButton 
                      email={formData.email}
                      amount={(total + 1500) * 100} // Paystack expects amount in kobo
                      onSuccess={handlePaymentSuccess}
                    />
                  ) : (
                    <Button 
                      type="submit"
                      className="w-full bg-cake-500 hover:bg-cake-600"
                    >
                      Continue to Payment
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Checkout;
