
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useWishlistStore } from '../store/wishlistStore';
import { useCartStore } from '../store/cartStore';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState(items);

  useEffect(() => {
    window.scrollTo(0, 0);
    setWishlistItems(items);
  }, [items]);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
    toast({
      title: 'Removed from Wishlist',
      description: "Item removed from your wishlist",
    });
  };

  const handleAddToCart = (id: string) => {
    const cake = wishlistItems.find(item => item.id === id);
    if (cake) {
      addToCart(cake, 1);
      toast({
        title: 'Added to Cart',
        description: `${cake.name} has been added to your cart`,
      });
      // Optionally remove from wishlist after adding to cart
      // removeFromWishlist(id);
    }
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
      <main className="pt-16 min-h-screen bg-gray-50">
        <div className="container px-4 mx-auto py-12">
          <h1 className="font-serif text-3xl font-bold mb-6">My Wishlist</h1>
          
          {wishlistItems.length === 0 ? (
            <div className="bg-white p-10 rounded-lg shadow-sm text-center">
              <Heart className="mx-auto mb-4 text-cake-300" size={48} />
              <h2 className="text-xl font-medium mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">
                Save your favorite items to keep track of them and make purchasing easier.
              </p>
              <Button asChild className="bg-cake-500 hover:bg-cake-600">
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative pb-[60%]">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-serif text-xl font-medium mb-2">
                      <Link to={`/product/${item.id}`} className="hover:text-cake-500">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg text-cake-700">
                        {formatPrice(item.price)}
                      </span>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 hover:bg-red-50 border-red-200"
                        >
                          <Trash2 size={16} />
                        </Button>
                        
                        <Button 
                          size="sm"
                          onClick={() => handleAddToCart(item.id)}
                          className="bg-cake-500 hover:bg-cake-600"
                        >
                          <ShoppingCart size={16} className="mr-1" />
                          <span>Add to Cart</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Wishlist;
