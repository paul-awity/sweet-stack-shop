
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CakeCard from '../components/CakeCard';
import { cakes, Cake } from '../data/cakes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Products = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const categoryParam = urlParams.get('category');

  const [filteredCakes, setFilteredCakes] = useState<Cake[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Cakes' },
    { id: 'chocolate', name: 'Chocolate' },
    { id: 'vanilla', name: 'Vanilla' },
    { id: 'fruit', name: 'Fruit' },
    { id: 'specialty', name: 'Specialty' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    filterCakes();
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const filterCakes = () => {
    let results = [...cakes];
    
    // Apply category filter if not "all"
    if (activeCategory && activeCategory !== 'all') {
      results = results.filter(cake => cake.category === activeCategory);
    }
    
    // Apply search term filter if any
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      results = results.filter(cake =>
        cake.name.toLowerCase().includes(search) ||
        cake.description.toLowerCase().includes(search)
      );
    }
    
    setFilteredCakes(results);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category === 'all' ? null : category);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterCakes();
  };

  return (
    <>
      <Navbar />
      
      <main className="pt-16 min-h-screen">
        {/* Page Header */}
        <div className="bg-cream-50 py-12">
          <div className="container px-4 mx-auto">
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-center">Our Cakes</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-center">
              Browse our collection of delicious handcrafted cakes made with the finest ingredients.
              Perfect for any celebration or simply to treat yourself.
            </p>
          </div>
        </div>
        
        {/* Filters & Search */}
        <div className="bg-white py-6 border-b border-gray-200 sticky top-16 z-10">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id || (category.id === 'all' && !activeCategory) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryChange(category.id)}
                    className={activeCategory === category.id || (category.id === 'all' && !activeCategory) ? "bg-cake-500 hover:bg-cake-600" : ""}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
              
              <form onSubmit={handleSearch} className="relative max-w-xs w-full">
                <Input
                  type="text"
                  placeholder="Search cakes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </form>
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="container px-4 mx-auto py-12">
          {filteredCakes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCakes.map((cake) => (
                <CakeCard key={cake.id} cake={cake} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No cakes found</h3>
              <p className="text-gray-500">Try changing your filters or search term</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Products;
