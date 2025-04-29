
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCompareStore } from '../store/compareStore';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useToast } from '../hooks/use-toast';

const Compare = () => {
  const { items, removeFromCompare, clearAll } = useCompareStore();
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const [compareItems, setCompareItems] = useState(items);

  useEffect(() => {
    window.scrollTo(0, 0);
    setCompareItems(items);
  }, [items]);

  const handleRemove = (id: string) => {
    removeFromCompare(id);
    toast({
      title: 'Removed from Compare',
      description: "Item removed from comparison list",
    });
  };

  const handleAddToCart = (cakeId: string) => {
    const cake = compareItems.find(item => item.id === cakeId);
    if (cake) {
      addToCart(cake, 1);
      toast({
        title: 'Added to Cart',
        description: `${cake.name} has been added to your cart`,
      });
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
          <h1 className="font-serif text-3xl font-bold mb-6">Compare Products</h1>
          
          {compareItems.length === 0 ? (
            <div className="bg-white p-10 rounded-lg shadow-sm text-center">
              <h2 className="text-xl font-medium mb-4">Your comparison list is empty</h2>
              <p className="text-gray-600 mb-6">
                Add items to compare them and find the perfect cake for your occasion.
              </p>
              <Button asChild className="bg-cake-500 hover:bg-cake-600">
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">
                  {compareItems.length} {compareItems.length === 1 ? 'item' : 'items'} for comparison
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => clearAll()}
                  className="text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50"
                >
                  Clear All
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-sm">
                  <thead>
                    <tr>
                      <th className="p-4 text-left font-medium text-gray-600">Feature</th>
                      {compareItems.map(item => (
                        <th key={item.id} className="p-4 min-w-[250px]">
                          <div className="relative pb-[60%]">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="absolute inset-0 w-full h-full object-cover rounded-lg"
                            />
                            <button 
                              onClick={() => handleRemove(item.id)}
                              className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm"
                            >
                              <X size={16} className="text-gray-500" />
                            </button>
                          </div>
                          <h3 className="mt-3 text-lg font-serif font-medium">
                            <Link to={`/product/${item.id}`} className="hover:text-cake-500">
                              {item.name}
                            </Link>
                          </h3>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-4 font-medium">Price</td>
                      {compareItems.map(item => (
                        <td key={`${item.id}-price`} className="p-4 font-semibold text-cake-700">
                          {formatPrice(item.price)}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Category</td>
                      {compareItems.map(item => (
                        <td key={`${item.id}-category`} className="p-4 capitalize">
                          {item.category}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Description</td>
                      {compareItems.map(item => (
                        <td key={`${item.id}-desc`} className="p-4">
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Ingredients</td>
                      {compareItems.map(item => (
                        <td key={`${item.id}-ingredients`} className="p-4">
                          {item.ingredients ? (
                            <div className="flex flex-wrap gap-1">
                              {item.ingredients.map((ingredient, idx) => (
                                <span 
                                  key={idx} 
                                  className="text-xs bg-cream-50 px-2 py-1 rounded-full"
                                >
                                  {ingredient}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">Not specified</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Allergens</td>
                      {compareItems.map(item => (
                        <td key={`${item.id}-allergens`} className="p-4">
                          {item.allergens ? (
                            <div className="flex flex-wrap gap-1">
                              {item.allergens.map((allergen, idx) => (
                                <span 
                                  key={idx} 
                                  className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-full"
                                >
                                  {allergen}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">Not specified</span>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4"></td>
                      {compareItems.map(item => (
                        <td key={`${item.id}-actions`} className="p-4">
                          <Button 
                            onClick={() => handleAddToCart(item.id)}
                            className="w-full bg-cake-500 hover:bg-cake-600"
                          >
                            <ShoppingCart size={16} className="mr-2" />
                            Add to Cart
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Compare;
