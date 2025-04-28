
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeaturedCakes from '../components/FeaturedCakes';
import { Button } from '@/components/ui/button';
import { CakeSlice, Award, Gift, Truck } from 'lucide-react';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 md:pt-0 md:h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1587248720327-8eb72564be1e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3" 
            alt="Background cake" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/30"></div>
        </div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-xl md:ml-12 py-16 md:py-0 animate-fade-in">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-chocolate-800">
              Handcrafted Cakes for Every Occasion
            </h1>
            <p className="text-lg mb-8 text-chocolate-700">
              Indulge in our delicious artisanal cakes, made with love and the finest ingredients.
              Perfect for birthdays, weddings, and special moments.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-cake-500 hover:bg-cake-600 text-white px-6 py-2">
                <Link to="/products">Order Now</Link>
              </Button>
              <Button asChild variant="outline" className="border-cake-500 text-cake-500 hover:bg-cake-50">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-cake-100 flex items-center justify-center mb-4">
                <CakeSlice className="h-8 w-8 text-cake-500" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Premium Ingredients</h3>
              <p className="text-gray-600">We use only the finest ingredients to create our delicious cakes, ensuring every bite is perfection.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-cake-100 flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-cake-500" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Master Bakers</h3>
              <p className="text-gray-600">Our cakes are handcrafted by expert bakers with years of experience and passion.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-cake-100 flex items-center justify-center mb-4">
                <Truck className="h-8 w-8 text-cake-500" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Enjoy convenient delivery to your doorstep, ensuring your cake arrives fresh and beautiful.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cakes Section */}
      <FeaturedCakes />

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. See what our valued customers have to say about our delicious cakes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-cream-50 p-6 rounded-lg border border-cream-100 relative">
              <div className="text-cake-500 text-4xl font-serif absolute top-4 left-4 opacity-30">"</div>
              <p className="text-gray-700 mb-4 pt-4">
                The chocolate cake I ordered for my daughter's birthday was absolutely divine! Everyone loved it and asked where I got it from.
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Lagos</p>
                </div>
              </div>
            </div>

            <div className="bg-cream-50 p-6 rounded-lg border border-cream-100 relative">
              <div className="text-cake-500 text-4xl font-serif absolute top-4 left-4 opacity-30">"</div>
              <p className="text-gray-700 mb-4 pt-4">
                Sweet Stack's red velvet cake is the best I've ever tasted. The cream cheese frosting is perfectly balanced. Will order again!
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-medium">Michael Obi</p>
                  <p className="text-sm text-gray-500">Abuja</p>
                </div>
              </div>
            </div>

            <div className="bg-cream-50 p-6 rounded-lg border border-cream-100 relative">
              <div className="text-cake-500 text-4xl font-serif absolute top-4 left-4 opacity-30">"</div>
              <p className="text-gray-700 mb-4 pt-4">
                I ordered a custom cake for our anniversary and it exceeded my expectations. The attention to detail was incredible!
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-medium">Chioma Eze</p>
                  <p className="text-sm text-gray-500">Port Harcourt</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-cake-500 text-cake-500 hover:bg-cake-50">
              <Link to="/contact">Leave a Review</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cake-500 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Ready to Order Your Perfect Cake?</h2>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Whether it's for a birthday, wedding, or just because, we have the perfect cake for every occasion.
          </p>
          <Button asChild className="bg-white text-cake-500 hover:bg-cream-100">
            <Link to="/products">Browse Our Cakes</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Index;
