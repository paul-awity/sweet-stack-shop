
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cakes, Cake } from '../data/cakes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [productList, setProductList] = useState<Cake[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setProductList(cakes);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple admin validation - in a real app, this would be handled by a backend
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setLoginError('');
      toast({
        title: 'Login Successful',
        description: 'Welcome to the admin dashboard',
      });
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProductList(prev => prev.filter(cake => cake.id !== id));
    toast({
      title: 'Product Deleted',
      description: 'The product has been removed',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <main className="pt-16 min-h-screen">
          <div className="container px-4 mx-auto py-12">
            <div className="max-w-md mx-auto">
              <h1 className="font-serif text-3xl font-bold mb-6 text-center">Admin Login</h1>
              
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleLogin}>
                    {loginError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        {loginError}
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      
                      <Button type="submit" className="w-full bg-cake-500 hover:bg-cake-600">
                        Login
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
              
              <p className="text-center mt-4 text-sm text-gray-500">
                For demo purposes, use username: admin and password: password
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="container px-4 mx-auto py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-serif text-3xl font-bold">Admin Dashboard</h1>
            <Button 
              variant="outline" 
              onClick={() => setIsLoggedIn(false)}
              className="border-cake-500 text-cake-500 hover:bg-cake-50"
            >
              Logout
            </Button>
          </div>
          
          <Tabs defaultValue="products">
            <TabsList className="mb-8">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Products</h2>
                <Button className="bg-cake-500 hover:bg-cake-600">
                  <Plus className="h-4 w-4 mr-2" /> Add New Product
                </Button>
              </div>
              
              <div className="bg-white rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 text-left">
                      <tr>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">Image</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">Name</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">Category</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">Price</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">Featured</th>
                        <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {productList.map(cake => (
                        <tr key={cake.id}>
                          <td className="px-6 py-4">
                            <img 
                              src={cake.image} 
                              alt={cake.name} 
                              className="h-12 w-12 object-cover rounded"
                            />
                          </td>
                          <td className="px-6 py-4 font-medium">{cake.name}</td>
                          <td className="px-6 py-4 capitalize">{cake.category}</td>
                          <td className="px-6 py-4">{formatPrice(cake.price)}</td>
                          <td className="px-6 py-4">
                            {cake.featured ? (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                Yes
                              </span>
                            ) : (
                              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                No
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDeleteProduct(cake.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="bg-white p-8 rounded-lg border text-center">
                <h3 className="text-xl font-medium mb-2">Order Management</h3>
                <p className="text-gray-500 mb-4">Order management functionality will be implemented in the next phase.</p>
                <Button variant="outline">View Demo Data</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="customers">
              <div className="bg-white p-8 rounded-lg border text-center">
                <h3 className="text-xl font-medium mb-2">Customer Management</h3>
                <p className="text-gray-500 mb-4">Customer management functionality will be implemented in the next phase.</p>
                <Button variant="outline">View Demo Data</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="bg-white p-8 rounded-lg border text-center">
                <h3 className="text-xl font-medium mb-2">Store Settings</h3>
                <p className="text-gray-500 mb-4">Store configuration will be implemented in the next phase.</p>
                <Button variant="outline">View Demo Options</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Admin;
