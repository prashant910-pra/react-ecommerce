import React, { useState, useMemo, useEffect } from 'react';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';
import CategoryFilter from '@/components/CategoryFilter';
import Cart from '@/components/Cart';
import Checkout from '@/components/Checkout';
import OrderConfirmation from '@/components/OrderConfirmation';
import AuthModal from '@/components/AuthModal';
import OrderHistory from '@/components/OrderHistory';
import OrderDetails from '@/components/OrderDetails';
import { mockProducts, categories } from '@/lib/mockData';
import { Product } from '@/types';
import { getCall } from '@/api/api';
import { API_URL } from '@/common/constant';
import { useAuth } from '@/contexts/AuthContext';


type ViewType = 'grid' | 'list';
type SortType = 'name' | 'price-low' | 'price-high' | 'rating';
type PageType = 'products' | 'checkout' | 'confirmation' | 'order-history' | 'order-details';



export default function EcommercePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewType, setViewType] = useState<ViewType>('grid');
  const [sortBy, setSortBy] = useState<SortType>('name');
  const [currentPage, setCurrentPage] = useState<PageType>('products');
  const [orderId, setOrderId] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const { state } = useAuth();

  useEffect(() => {
    getCall(API_URL+'/api/products').then((response) => {
      setProducts(response.data);
    }).catch((error) => {
      console.error('Error fetching products:', error);
    });
  }, []);

  useEffect(() => {
    console.log('Products updated:', products);
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products,searchQuery, selectedCategory, sortBy]);

  // Count products by category
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(category => {
      if (category === 'All Categories') {
        counts[category] = products.length;
      } else {
        counts[category] = products.filter(p => p.category === category).length;
      }
    });
    return counts;
  }, [products]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
  };

  const handleOrderComplete = (newOrderId: string) => {
    setOrderId(newOrderId);
    setCurrentPage('confirmation');
  };

  const handleBackToProducts = () => {
    setCurrentPage('products');
  };

  const handleContinueShopping = () => {
    setCurrentPage('products');
  };

  const handleLoginClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleOrderHistoryClick = () => {
    setCurrentPage('order-history');
  };

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentPage('order-details');
  };

  if (currentPage === 'checkout') {
    return (
      <Checkout
        onBack={handleBackToProducts}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  if (currentPage === 'confirmation') {
    return (
      <OrderConfirmation
        orderId={orderId}
        onContinueShopping={handleContinueShopping}
      />
    );
  }

  if (currentPage === 'order-history') {
    return (
      <OrderHistory
        onBack={handleBackToProducts}
        onViewOrder={handleViewOrder}
      />
    );
  }

  if (currentPage === 'order-details') {
    return (
      <OrderDetails
        orderId={selectedOrderId}
        onBack={() => setCurrentPage('order-history')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onCartClick={handleCartOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLoginClick={handleLoginClick}
        onOrderHistoryClick={handleOrderHistoryClick}
      />

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Categories */}
          <div className="lg:w-64">
            <div className="hidden lg:block sticky top-20">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                productCounts={productCounts}
              />
            </div>

            {/* Mobile Category Filter */}
            <div className="lg:hidden mb-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Categories
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Categories</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <CategoryFilter
                      categories={categories}
                      selectedCategory={selectedCategory}
                      onCategoryChange={setSelectedCategory}
                      productCounts={productCounts}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <p className="text-sm text-gray-600">
                  {filteredAndSortedProducts.length} products found
                  {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={(value: SortType) => setSortBy(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="hidden sm:flex border rounded-md">
                  <Button
                    variant={viewType === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewType('grid')}
                    className={`rounded-l-none ${viewType === 'grid' ? 'bg-pink-500' : 'ghost'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewType === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewType('list')}
                    className={`rounded-l-none ${viewType === 'list' ? 'bg-pink-500' : 'ghost'}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All Categories');
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewType === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1'
              }`}>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    loginStatus={state.isAuthenticated}
                    onProductClick={handleProductClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
      />

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
        loginStatus={state.isAuthenticated}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}