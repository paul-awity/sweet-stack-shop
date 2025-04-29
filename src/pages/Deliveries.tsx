
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bike, Clock, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDeliveryStore } from '../store/deliveryStore';

const Deliveries = () => {
  const navigate = useNavigate();
  const { deliveries } = useDeliveryStore();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'pickup': return 'bg-purple-100 text-purple-800';
      case 'in_transit': return 'bg-indigo-100 text-indigo-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_transit': return <Bike className="h-5 w-5" />;
      case 'completed': return <Package className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-16 min-h-screen">
        <div className="container px-4 mx-auto py-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-10">Your Deliveries</h1>
          
          {deliveries.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">No Deliveries Yet</h2>
              <p className="text-gray-600 mb-8">You don't have any active deliveries at the moment.</p>
              <Button onClick={() => navigate('/products')}>Shop Now</Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deliveries.map((delivery) => (
                <Card key={delivery.id} className="overflow-hidden">
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Order #{delivery.orderId}</span>
                      <Badge className={getStatusColor(delivery.status)}>
                        {delivery.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-600">{formatDate(delivery.orderDate)}</span>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-cake-50 rounded-full flex items-center justify-center">
                        {getStatusIcon(delivery.status)}
                      </div>
                      <div>
                        <p className="font-medium">
                          {delivery.status === 'completed' 
                            ? 'Delivered' 
                            : 'Estimated delivery at ' + new Date(delivery.estimatedArrival).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })
                          }
                        </p>
                        <p className="text-sm text-gray-600">{delivery.destination.address}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Items</p>
                      <div className="text-sm text-gray-600">
                        {delivery.items.map((item, idx) => (
                          <span key={idx}>
                            {item.quantity}x {item.cake.name}
                            {idx < delivery.items.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => navigate(`/delivery/${delivery.id}`)} 
                      className="w-full"
                      variant="secondary"
                    >
                      Track Delivery
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Deliveries;
