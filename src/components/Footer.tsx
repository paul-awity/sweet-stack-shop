
import { Link } from 'react-router-dom';
import { CakeSlice, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-chocolate-50 pt-12 pb-6">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <CakeSlice className="h-6 w-6 text-cake-500" />
              <span className="text-xl font-serif font-bold">Sweet Stack</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Delicious handcrafted cakes for every occasion. Made with love using the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-cake-500 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-cake-500 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-cake-500 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-cake-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-cake-500 transition-colors">Our Cakes</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-cake-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-cake-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=chocolate" className="text-gray-600 hover:text-cake-500 transition-colors">
                  Chocolate Cakes
                </Link>
              </li>
              <li>
                <Link to="/products?category=vanilla" className="text-gray-600 hover:text-cake-500 transition-colors">
                  Vanilla Cakes
                </Link>
              </li>
              <li>
                <Link to="/products?category=fruit" className="text-gray-600 hover:text-cake-500 transition-colors">
                  Fruit Cakes
                </Link>
              </li>
              <li>
                <Link to="/products?category=specialty" className="text-gray-600 hover:text-cake-500 transition-colors">
                  Specialty Cakes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-cake-500 flex-shrink-0 mt-1" />
                <span className="text-sm text-gray-600">123 Bakery Lane, Cake City, 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-cake-500" />
                <span className="text-sm text-gray-600">+234 812 345 6789</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-cake-500" />
                <span className="text-sm text-gray-600">hello@sweetstack.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Sweet Stack Bakery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
