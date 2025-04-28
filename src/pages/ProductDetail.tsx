
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getCakeById, getCakesByCategory, Cake } from '../data/cakes';
import { useCartStore } from '../store/cartStore';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Minus, Plus, CakeSlice } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import CakeCard from '../components/CakeCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [cake, setCake] = useState<Cake | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState<Cake[]>([]);
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const cakeData = getCakeById(id);
      if (cakeData) {
        setCake(cakeData);
        // Get related cakes
        const relatedCakes = getCakesByCategory(cakeData.category)
          .filter(c => c.id !== id)
          .slice(0, 4);
        setRelated(relatedCakes);
      }
    }
  }, [id]);

  const handleAddToCart = () => {
    if (cake) {
      addToCart(cake, quantity);
      toast({
        title: 'Added to Cart',
        description: `${quantity} ${quantity > 1 ? 'items' : 'item'} added to your cart`,
      });
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  if (!cake) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <p className="mb-6">Sorry, the cake you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-cake-500 hover:bg-cake-600">
            <Link to="/products">Browse All Cakes</Link>
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <main className="pt-16 min-h-screen">
        <div className="container px-4 mx-auto py-12">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2">
              <div className="space-y-6">
                <div>
                  <h1 className="font-serif text-3xl font-bold mb-2">{cake.name}</h1>
                  <p className="text-xl font-semibold text-cake-700">{formatPrice(cake.price)}</p>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-700 mb-4">{cake.description}</p>
                  
                  {cake.ingredients && (
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Ingredients:</h3>
                      <div className="flex flex-wrap gap-2">
                        {cake.ingredients.map((ingredient, index) => (
                          <div 
                            key={index}
                            className="bg-cream-50 text-sm px-3 py-1 rounded-full"
                          >
                            {ingredient}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {cake.allergens && (
                    <div>
                      <h3 className="font-medium mb-2">Allergens:</h3>
                      <div className="flex flex-wrap gap-2">
                        {cake.allergens.map((allergen, index) => (
                          <div 
                            key={index}
                            className="bg-cake-50 text-cake-700 text-sm px-3 py-1 rounded-full"
                          >
                            {allergen}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center mb-6">
                    <span className="mr-4">Quantity:</span>
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={decrementQuantity}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 border-x">{quantity}</span>
                      <button 
                        onClick={incrementQuantity}
                        className="px-3 py-1 text-gray-600 hover:text-gray-800"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full mb-4 bg-cake-500 hover:bg-cake-600"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                  
                  <div className="flex items-center justify-center text-gray-600 text-sm">
                    <CakeSlice size={16} className="mr-2" />
                    <span>Freshly baked and delivered within 24 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-serif text-2xl font-bold mb-6">You may also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {related.map((relatedCake) => (
                  <CakeCard key={relatedCake.id} cake={relatedCake} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ProductDetail;
