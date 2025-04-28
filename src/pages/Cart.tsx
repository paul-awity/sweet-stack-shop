
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCartStore } from '../store/cartStore';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';

const Cart = () => {
  const { items, total, updateQuantity, removeFromCart } = useCartStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-16 min-h-screen">
        <div className="container px-4 mx-auto py-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-10 text-center">Your Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16 max-w-lg mx-auto">
              <div className="mb-6 text-gray-400">
                <ShoppingCart size={64} className="mx-auto" />
              </div>
              <h2 className="font-serif text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any cakes to your cart yet. 
                Browse our delicious selection and find something sweet!
              </p>
              <Button asChild className="bg-cake-500 hover:bg-cake-600">
                <Link to="/products">Browse Cakes</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="border rounded-lg overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b">
                    <div className="col-span-6 font-medium">Product</div>
                    <div className="col-span-2 text-center font-medium">Price</div>
                    <div className="col-span-2 text-center font-medium">Quantity</div>
                    <div className="col-span-2 text-right font-medium">Total</div>
                  </div>
                  
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 p-4 border-b items-center">
                      <div className="col-span-6 flex flex-col md:flex-row items-center md:items-start gap-4">
                        <Link to={`/product/${item.id}`} className="w-24 h-24 shrink-0">
                          <img src={item.cake.image} alt={item.cake.name} className="w-24 h-24 object-cover rounded" />
                        </Link>
                        <div>
                          <h3 className="font-medium">
                            <Link to={`/product/${item.id}`} className="hover:text-cake-500">
                              {item.cake.name}
                            </Link>
                          </h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1 mt-2"
                          >
                            <Trash2 size={14} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-2 text-center my-2 md:my-0">
                        <div className="md:hidden text-sm text-gray-500 mb-1">Price:</div>
                        {formatPrice(item.cake.price)}
                      </div>
                      
                      <div className="col-span-2 flex justify-center my-2 md:my-0">
                        <div className="flex items-center border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-gray-600 hover:text-gray-800"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 py-1 border-x">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-gray-600 hover:text-gray-800"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-span-2 text-right font-medium my-2 md:my-0">
                        <div className="md:hidden text-sm text-gray-500 mb-1">Total:</div>
                        {formatPrice(item.cake.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button asChild variant="outline">
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="border rounded-lg p-6 bg-gray-50 sticky top-28">
                  <h2 className="font-serif text-xl font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
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
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-cake-500 hover:bg-cake-600"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Cart;
