
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import DeliveryMap from '../components/DeliveryMap';
import DeliveryStatus from '../components/DeliveryStatus';
import DeliveryPersonInfo from '../components/DeliveryPersonInfo';
import { useDeliveryStore } from '../store/deliveryStore';
import { Button } from '@/components/ui/button';

const Delivery = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getDelivery } = useDeliveryStore();
  const [delivery, setDelivery] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const deliveryData = getDelivery(id);
      if (deliveryData) {
        setDelivery(deliveryData);
      } else {
        toast({
          title: "Delivery not found",
          description: "We couldn't find the delivery you're looking for.",
          variant: "destructive",
        });
        navigate('/');
      }
    }
    setLoading(false);
  }, [id, navigate, toast, getDelivery]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen">
          <div className="container py-12">
            <div className="flex items-center justify-center h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cake-500"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!delivery) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen">
          <div className="container py-12">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Delivery Not Found</h2>
              <p className="mb-8">The delivery you're looking for does not exist or has been completed.</p>
              <Button onClick={() => navigate('/')}>Return to Home</Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <main className="pt-16 min-h-screen">
        <div className="container px-4 mx-auto py-12">
          <div className="mb-6">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Delivery Tracking</h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Order #{delivery.orderId}</span>
              <Badge variant={delivery.status === 'completed' ? 'default' : 'outline'}>
                {delivery.status}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-0">
                  <DeliveryMap
                    deliveryPersonLocation={delivery.currentLocation}
                    destination={delivery.destination}
                    estimatedArrival={delivery.estimatedArrival}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-semibold mb-4">Order Details</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Order Date:</span>
                      <span>{new Date(delivery.orderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Delivery:</span>
                      <span>{new Date(delivery.estimatedArrival).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Address:</span>
                      <span className="text-right">{delivery.destination.address}</span>
                    </div>
                    
                    <Separator />
                    
                    <h3 className="font-medium">Items</h3>
                    <div className="space-y-3 max-h-60 overflow-auto">
                      {delivery.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <img 
                              src={item.cake.image}
                              alt={item.cake.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span>{item.cake.name} <span className="text-gray-500">x{item.quantity}</span></span>
                          </div>
                          <span>₦{item.cake.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <DeliveryPersonInfo 
                person={delivery.deliveryPerson}
                phoneNumber={delivery.deliveryPerson.phone}
              />
              
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-semibold mb-4">Delivery Progress</h2>
                  <DeliveryStatus
                    status={delivery.status}
                    events={delivery.events}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Delivery;
