
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import ShoppingAssistant from './components/ShoppingAssistant';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, Category } from './types';
import { Sparkles, X, Star } from 'lucide-react';
import { getDetailedProductReview } from './services/geminiService';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productAiPitch, setProductAiPitch] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    // Visual feedback
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl z-[100] animate-bounce';
    toast.innerText = `Added ${product.name} to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleViewDetails = async (product: Product) => {
    setSelectedProduct(product);
    setProductAiPitch(null);
    setIsAiLoading(true);
    const pitch = await getDetailedProductReview(product);
    setProductAiPitch(pitch);
    setIsAiLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onMenuClick={() => {}}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-indigo-900 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900 opacity-90" />
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Elevate Your Shopping <br /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">Gemini Intelligence</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
              Discover a curated collection of premium products, enhanced by the world's most capable AI. Shopping has never been this smart.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })} className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-xl">
                Explore Shop
              </button>
              <button className="px-8 py-4 bg-indigo-600/30 text-white border border-indigo-400/50 rounded-full font-bold hover:bg-indigo-600/50 transition-all backdrop-blur-sm">
                AI Assistant
              </button>
            </div>
          </div>
        </section>

        {/* Categories & Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-8 space-x-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as Category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <h3 className="text-xl font-bold text-gray-500">No products found for "{searchTerm}"</h3>
              <p className="text-gray-400 mt-2">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-indigo-600" />
              <span className="text-xl font-bold">GEMINI HUB</span>
            </div>
            <p className="text-gray-500 leading-relaxed">
              Your futuristic shopping destination. Experience the intersection of premium retail and artificial intelligence.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Shipping Info</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Stay Connected</h4>
            <p className="text-gray-500 mb-4">Subscribe to our newsletter for exclusive deals and AI insights.</p>
            <div className="flex">
              <input type="email" placeholder="Email address" className="bg-gray-100 border-none rounded-l-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500 w-full" />
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-xl hover:bg-indigo-700 transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
          © 2024 Gemini Commerce Hub. Powered by Google Gemini AI.
        </div>
      </footer>

      {/* Overlays */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
            alert("This is a demo! In a real app, you'd go to Stripe/PayPal now.");
            setCart([]);
            setIsCartOpen(false);
        }}
      />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white z-10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 flex flex-col">
              <div className="text-indigo-600 font-bold text-sm uppercase mb-2">{selectedProduct.category}</div>
              <h2 className="text-3xl font-extrabold mb-4">{selectedProduct.name}</h2>
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">{selectedProduct.rating} (124 reviews)</span>
              </div>

              <div className="text-4xl font-bold mb-6">${selectedProduct.price.toFixed(2)}</div>

              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
              </div>

              {/* AI Highlights Section */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Sparkles className="h-12 w-12 text-indigo-600" />
                </div>
                <h4 className="font-bold text-indigo-900 mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Gemini AI Highlights
                </h4>
                {isAiLoading ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-4 bg-indigo-200 rounded w-full" />
                    <div className="h-4 bg-indigo-200 rounded w-3/4" />
                    <div className="h-4 bg-indigo-200 rounded w-5/6" />
                  </div>
                ) : (
                  <div className="text-sm text-indigo-800 whitespace-pre-line prose prose-indigo">
                    {productAiPitch}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all transform active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <ShoppingAssistant products={MOCK_PRODUCTS} />
    </div>
  );
};

export default App;
