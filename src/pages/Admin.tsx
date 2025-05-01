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
import { Pencil, Trash2, Plus, LayoutDashboard, Package, Users, Settings, ShoppingBag } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { useSettingsStore } from '../store/settingsStore';

// Mock orders data for admin dashboard
const mockOrders = [
  { id: 'ORD-001', customer: 'John Doe', date: '2023-04-15', status: 'Delivered', total: 13000 },
  { id: 'ORD-002', customer: 'Jane Smith', date: '2023-04-16', status: 'Processing', total: 7500 },
  { id: 'ORD-003', customer: 'Robert Johnson', date: '2023-04-17', status: 'Pending', total: 19500 },
  { id: 'ORD-004', customer: 'Emily Brown', date: '2023-04-18', status: 'Cancelled', total: 6500 }
];

// Mock customers data for admin dashboard
const mockCustomers = [
  { id: 'CUST-001', name: 'John Doe', email: 'john@example.com', orders: 5, totalSpent: 45000 },
  { id: 'CUST-002', name: 'Jane Smith', email: 'jane@example.com', orders: 3, totalSpent: 28500 },
  { id: 'CUST-003', name: 'Robert Johnson', email: 'robert@example.com', orders: 1, totalSpent: 19500 },
  { id: 'CUST-004', name: 'Emily Brown', email: 'emily@example.com', orders: 2, totalSpent: 13000 }
];

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [productList, setProductList] = useState<Cake[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Cake | null>(null);
  const [orders, setOrders] = useState(mockOrders);
  const [customers, setCustomers] = useState(mockCustomers);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettingsStore();
  const [localSettings, setLocalSettings] = useState(settings);

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

  const handleEditProduct = (cake: Cake) => {
    setCurrentProduct(cake);
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setCurrentProduct(null);
    setEditMode(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  const handleSettingsChange = (key: string, value: any) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    updateSettings(localSettings);
    toast({
      title: 'Settings Saved',
      description: 'Your store settings have been updated successfully.',
    });
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Total Products</h3>
            <Package className="text-cake-500" />
          </div>
          <p className="text-3xl font-bold">{productList.length}</p>
          <p className="text-sm text-gray-500 mt-2">
            {productList.filter(p => p.featured).length} featured products
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Total Orders</h3>
            <ShoppingBag className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold">{orders.length}</p>
          <p className="text-sm text-gray-500 mt-2">
            {orders.filter(o => o.status === 'Processing').length} in processing
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Total Customers</h3>
            <Users className="text-green-500" />
          </div>
          <p className="text-3xl font-bold">{customers.length}</p>
          <p className="text-sm text-gray-500 mt-2">
            {customers.reduce((acc, customer) => acc + customer.orders, 0)} total orders
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Revenue</h3>
            <LayoutDashboard className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold">
            {formatPrice(orders.reduce((acc, order) => acc + order.total, 0))}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            All time revenue
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderProductsTable = () => (
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
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditProduct(cake)}
                    >
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
  );

  const renderOrdersTable = () => (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Order ID</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Customer</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Total</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 font-medium">{order.id}</td>
                <td className="px-6 py-4">{order.customer}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'Processing' 
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">{formatPrice(order.total)}</td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCustomersTable = () => (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Customer ID</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Orders</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Total Spent</th>
              <th className="px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map(customer => (
              <tr key={customer.id}>
                <td className="px-6 py-4 font-medium">{customer.id}</td>
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.orders}</td>
                <td className="px-6 py-4">{formatPrice(customer.totalSpent)}</td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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
          
          <Tabs defaultValue="dashboard">
            <TabsList className="mb-8">
              <TabsTrigger value="dashboard">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="products">
                <Package className="h-4 w-4 mr-2" />
                Products
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="customers">
                <Users className="h-4 w-4 mr-2" />
                Customers
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <h2 className="text-xl font-semibold mb-6">Dashboard Overview</h2>
              {renderDashboard()}
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium text-lg mb-4">Recent Orders</h3>
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-left">
                          <tr>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">ID</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">Customer</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">Status</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {orders.slice(0, 3).map(order => (
                            <tr key={order.id}>
                              <td className="px-4 py-3 font-medium">{order.id}</td>
                              <td className="px-4 py-3">{order.customer}</td>
                              <td className="px-4 py-3">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : order.status === 'Processing' 
                                      ? 'bg-blue-100 text-blue-800'
                                      : order.status === 'Pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-4 py-3">{formatPrice(order.total)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-4">Popular Products</h3>
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 text-left">
                          <tr>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">Product</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">Category</th>
                            <th className="px-4 py-3 text-sm font-medium text-gray-500">Price</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {productList.filter(cake => cake.featured).slice(0, 3).map(cake => (
                            <tr key={cake.id}>
                              <td className="px-4 py-3">
                                <div className="flex items-center">
                                  <img 
                                    src={cake.image} 
                                    alt={cake.name} 
                                    className="h-10 w-10 rounded object-cover mr-3" 
                                  />
                                  <span className="font-medium">{cake.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-3 capitalize">{cake.category}</td>
                              <td className="px-4 py-3">{formatPrice(cake.price)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="products">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Products</h2>
                <Button className="bg-cake-500 hover:bg-cake-600">
                  <Plus className="h-4 w-4 mr-2" /> Add New Product
                </Button>
              </div>
              
              {renderProductsTable()}
            </TabsContent>
            
            <TabsContent value="orders">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Order Management</h2>
                <div className="flex gap-2">
                  <Button variant="outline">Export</Button>
                  <Button variant="outline">Filter</Button>
                </div>
              </div>
              
              {renderOrdersTable()}
            </TabsContent>
            
            <TabsContent value="customers">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Customer Management</h2>
                <div className="flex gap-2">
                  <Button variant="outline">Export</Button>
                  <Button variant="outline">Filter</Button>
                </div>
              </div>
              
              {renderCustomersTable()}
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="bg-white p-8 rounded-lg border">
                <h3 className="text-xl font-medium mb-6">Store Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-4">
                    <h4 className="font-medium">Store Information</h4>
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Store Name</Label>
                      <Input 
                        id="storeName" 
                        value={localSettings.storeName} 
                        onChange={(e) => handleSettingsChange('storeName', e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeEmail">Store Email</Label>
                      <Input 
                        id="storeEmail" 
                        value={localSettings.storeEmail}
                        onChange={(e) => handleSettingsChange('storeEmail', e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storePhone">Store Phone</Label>
                      <Input 
                        id="storePhone" 
                        value={localSettings.storePhone}
                        onChange={(e) => handleSettingsChange('storePhone', e.target.value)} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryFee">Delivery Fee</Label>
                      <Input 
                        id="deliveryFee" 
                        type="number"
                        value={localSettings.deliveryFee}
                        onChange={(e) => handleSettingsChange('deliveryFee', Number(e.target.value))} 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Payment Settings</h4>
                    <div className="space-y-2">
                      <Label htmlFor="currencyCode">Currency</Label>
                      <select
                        id="currencyCode"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        value={localSettings.currencyCode}
                        onChange={(e) => handleSettingsChange('currencyCode', e.target.value)}
                      >
                        <option value="NGN">Nigerian Naira (₦)</option>
                        <option value="KES">Kenyan Shilling (KSh)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="GBP">British Pound (£)</option>
                        <option value="EUR">Euro (€)</option>
                      </select>
                    </div>
                    
                    <div className="pt-4 space-y-4">
                      <h4 className="font-medium">Checkout Options</h4>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="enablePaystack">Paystack Payments</Label>
                          <p className="text-sm text-gray-500">Enable payment via Paystack</p>
                        </div>
                        <Switch
                          id="enablePaystack"
                          checked={localSettings.enablePaystack}
                          onCheckedChange={(checked) => handleSettingsChange('enablePaystack', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="enableMpesa">M-Pesa Payments</Label>
                          <p className="text-sm text-gray-500">Enable payment via M-Pesa</p>
                        </div>
                        <Switch
                          id="enableMpesa"
                          checked={localSettings.enableMpesa}
                          onCheckedChange={(checked) => handleSettingsChange('enableMpesa', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="enableGuestCheckout">Guest Checkout</Label>
                          <p className="text-sm text-gray-500">Allow customers to checkout without an account</p>
                        </div>
                        <Switch
                          id="enableGuestCheckout"
                          checked={localSettings.enableGuestCheckout}
                          onCheckedChange={(checked) => handleSettingsChange('enableGuestCheckout', checked)}
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-2">
                      <Label htmlFor="primaryColor">Brand Color</Label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="color"
                          id="primaryColor"
                          value={localSettings.primaryColor}
                          onChange={(e) => handleSettingsChange('primaryColor', e.target.value)}
                          className="h-10 w-20"
                        />
                        <span className="text-sm">{localSettings.primaryColor}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Label className="block mb-4">Preview:</Label>
                  <div className="flex gap-4">
                    <Button 
                      style={{ backgroundColor: localSettings.primaryColor }}
                      className="hover:opacity-90"
                    >
                      Primary Button
                    </Button>
                    <Button variant="outline" className="border-gray-300">
                      Secondary Button
                    </Button>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setLocalSettings(settings)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-cake-500 hover:bg-cake-600"
                    onClick={saveSettings}
                  >
                    Save Changes
                  </Button>
                </div>
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
