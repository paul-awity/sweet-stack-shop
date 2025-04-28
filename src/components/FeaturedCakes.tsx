
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFearturedCakes, Cake } from '../data/cakes';
import CakeCard from './CakeCard';
import { Button } from '@/components/ui/button';

const FeaturedCakes = () => {
  const [cakes, setCakes] = useState<Cake[]>([]);

  useEffect(() => {
    const featured = getFearturedCakes();
    setCakes(featured);
  }, []);

  return (
    <section className="py-16 bg-cream-50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Our Featured Cakes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Indulge in our most popular selections, handcrafted with the finest ingredients
            and designed to make your special moments even sweeter.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cakes.map((cake) => (
            <div key={cake.id} className="h-full">
              <CakeCard cake={cake} featured />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-cake-500 hover:bg-cake-600">
            <Link to="/products">View All Cakes</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCakes;
