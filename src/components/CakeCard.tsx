
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Bookmark, BookmarkPlus, BookmarkMinus } from 'lucide-react';
import { Cake } from '../data/cakes';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useCompareStore } from '../store/compareStore';
import { useToast } from '../hooks/use-toast';

interface CakeCardProps {
  cake: Cake;
  featured?: boolean;
}

const CakeCard = ({ cake, featured = false }: CakeCardProps) => {
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addToCompare, isInCompare } = useCompareStore();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(cake, 1);
    toast({
      title: 'Added to Cart',
      description: `${cake.name} has been added to your cart`,
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(cake.id)) {
      removeFromWishlist(cake.id);
      toast({
        title: 'Removed from Wishlist',
        description: `${cake.name} has been removed from your wishlist`,
      });
    } else {
      addToWishlist(cake);
      toast({
        title: 'Added to Wishlist',
        description: `${cake.name} has been added to your wishlist`,
      });
    }
  };

  const handleAddToCompare = () => {
    if (isInCompare(cake.id)) {
      toast({
        title: 'Already in Compare',
        description: `${cake.name} is already in your comparison list`,
      });
      return;
    }

    addToCompare(cake);
    toast({
      title: 'Added to Compare',
      description: `${cake.name} has been added to your comparison list`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  const isWishlisted = isInWishlist(cake.id);

  return (
    <Card className={`overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-md ${featured ? 'h-full' : ''}`}>
      <div className="relative pb-[56.25%]">
        <img
          src={cake.image}
          alt={cake.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {featured && (
          <div className="absolute top-2 left-2 bg-cake-500 text-white text-xs px-2 py-1 rounded">
            Featured
          </div>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="bg-white hover:bg-gray-100 w-8 h-8 rounded-full"
            onClick={handleWishlistToggle}
          >
            {isWishlisted ? 
              <BookmarkMinus size={16} className="text-cake-500" /> : 
              <BookmarkPlus size={16} />
            }
          </Button>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="mb-2">
          <h3 className="font-serif text-lg font-medium mb-1">
            <Link to={`/product/${cake.id}`} className="hover:text-cake-500 transition-colors">
              {cake.name}
            </Link>
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{cake.description}</p>
        </div>
        <div className="font-semibold text-lg text-cake-700">
          {formatPrice(cake.price)}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <div className="flex gap-2">
          <Link 
            to={`/product/${cake.id}`}
            className="text-sm font-medium text-cake-500 hover:text-cake-600 transition-colors"
          >
            View Details
          </Link>
          <button 
            onClick={handleAddToCompare}
            className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors"
          >
            Compare
          </button>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 border-cake-200 hover:bg-cake-50 hover:text-cake-700 transition-colors"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={16} />
          <span>Add</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CakeCard;
