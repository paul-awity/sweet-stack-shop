
import { Link } from 'react-router-dom';
import { ShoppingCart, User, CakeSlice } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '../store/cartStore';
import { useState, useEffect } from 'react';

export function Navbar() {
  const { items } = useCartStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 shadow-md backdrop-blur-sm py-2' : 'bg-transparent py-4'}`}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <CakeSlice className="h-6 w-6 text-cake-500" />
          <span className="text-xl font-serif font-bold">Sweet Stack</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-cake-500 transition-colors">Home</Link>
          <Link to="/products" className="font-medium hover:text-cake-500 transition-colors">Cakes</Link>
          <Link to="/about" className="font-medium hover:text-cake-500 transition-colors">About</Link>
          <Link to="/contact" className="font-medium hover:text-cake-500 transition-colors">Contact</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/admin" className="flex items-center space-x-1 text-sm font-medium hover:text-cake-500 transition-colors">
            <User size={18} />
            <span>Admin</span>
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 hover:text-cake-500 transition-colors" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-cake-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-cake-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-500 hover:text-gray-800"
          >
            <span className="sr-only">Open main menu</span>
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-current transform transition duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current transition duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`h-0.5 w-full bg-current transform transition duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className={`md:hidden bg-white absolute w-full transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container px-4 mx-auto py-4 space-y-2">
          <Link to="/" className="block py-2 font-medium hover:text-cake-500" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/products" className="block py-2 font-medium hover:text-cake-500" onClick={() => setIsMobileMenuOpen(false)}>Cakes</Link>
          <Link to="/about" className="block py-2 font-medium hover:text-cake-500" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" className="block py-2 font-medium hover:text-cake-500" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <Link to="/admin" className="block py-2 font-medium hover:text-cake-500" onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
