import { useState, useEffect } from 'react';
import { Star, Heart, ShoppingBag, Eye, X, Check, Edit3, Gift, Info, Clock, Flame, Percent } from 'lucide-react';
import { Product, CartItem } from '../types';
import { products, categories } from '../data';

interface ProductsProps {
  searchQuery: string;
  selectedCategoryId: string | null;
  onAddToCart: (product: Product, quantity: number, wrapper?: string, cardText?: string) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
}

const WRAPPERS = [
  { id: 'standard', name: 'Signature Luxury Gift Box (Standard)', price: 0, color: 'bg-rose-900' },
  { id: 'crimson', name: 'Crimson Velvet Wrap & Gold Bow', price: 2.99, color: 'bg-red-800' },
  { id: 'golden', name: 'Golden Elegance & Ivory Silk Ribbon', price: 3.49, color: 'bg-amber-500' },
  { id: 'floral', name: 'Handcrafted Meadow Floral Paper', price: 1.99, color: 'bg-emerald-700' },
];

const PRODUCT_TYPES = [
  { id: 'all', name: 'All Curations' },
  { id: 'flowers', name: 'Fresh Flowers' },
  { id: 'cakes', name: 'Artisan Cakes' },
  { id: 'sweets', name: 'Delicate Sweets' },
  { id: 'baskets', name: 'Gift Baskets' }
];

export default function Products({
  searchQuery,
  selectedCategoryId,
  onAddToCart,
  onToggleWishlist,
  wishlist,
}: ProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedType, setSelectedType] = useState('all');
  
  // Customization state for Quick View
  const [quantity, setQuantity] = useState(1);
  const [selectedWrapper, setSelectedWrapper] = useState('standard');
  const [cardText, setCardText] = useState('');
  const [personalizeOpen, setPersonalizeOpen] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);

  // Reset active type filter when selected occasion changes
  useEffect(() => {
    setSelectedType('all');
  }, [selectedCategoryId]);

  // Daily Countdown Timer for Deals Section
  const [timeLeft, setTimeLeft] = useState(() => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    let diff = endOfDay.getTime() - now.getTime();
    if (diff <= 0) diff = 12 * 60 * 60 * 1000; // default fallback
    return diff;
  });

  useEffect(() => {
    if (selectedCategoryId !== 'deals') return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          // Reset to a new cycle
          const now = new Date();
          const endOfDay = new Date();
          endOfDay.setHours(23, 59, 59, 999);
          return Math.max(endOfDay.getTime() - now.getTime(), 1000);
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCategoryId]);

  const formatTime = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;
    
    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0')
    };
  };

  const timer = formatTime(timeLeft);

  // Filter products based on selected category, physical type, and search queries
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategoryId && selectedCategoryId !== 'all'
      ? (selectedCategoryId === 'deals' 
          ? (product.category === 'deals' || (!!product.originalPrice && product.originalPrice > product.price))
          : product.category === selectedCategoryId)
      : true;
    const matchesType = selectedType === 'all'
      ? true
      : product.type === selectedType;
    const matchesSearch = searchQuery
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesType && matchesSearch;
  });

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setSelectedWrapper('standard');
    setCardText('');
    setPersonalizeOpen(false);
    setSuccessAnim(false);
  };

  const handleQuickAdd = (product: Product) => {
    onAddToCart(product, 1);
    // Trigger small notification
    setSuccessAnim(true);
    setTimeout(() => setSuccessAnim(false), 2000);
  };

  const handleCustomAddToCart = () => {
    if (selectedProduct) {
      const wrapName = WRAPPERS.find(w => w.id === selectedWrapper)?.name || 'Standard';
      onAddToCart(selectedProduct, quantity, wrapName, cardText);
      setSuccessAnim(true);
      setTimeout(() => {
        setSuccessAnim(false);
        setSelectedProduct(null); // Close modal
      }, 1200);
    }
  };

  return (
    <section className="pt-24 pb-16 scroll-mt-20 bg-[#fdfaf8] font-sans border-b border-rose-50/20" id="products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-serif font-black text-slate-800 tracking-tight">
              {selectedCategoryId && selectedCategoryId !== 'all'
                ? `${categories.find(c => c.id === selectedCategoryId)?.name} Specialties` 
                : 'All Popular Thoughtful Gifts'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Curated items crafted to inspire deep smiles and warm memories.
            </p>
          </div>
          
          <div className="text-xs font-semibold text-slate-500 bg-rose-50/50 border border-rose-100/30 rounded-full px-4 py-2">
            Showing <span className="text-rose-500 font-bold">{filteredProducts.length}</span> of {products.length} products
          </div>
        </div>

        {/* Product Type Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-rose-100/10">
          {PRODUCT_TYPES.map((type) => {
            const isActive = selectedType === type.id;
            // Count total matching items in this physical category and selected occasion
            const count = products.filter(p => {
              const matchesOccasion = selectedCategoryId 
                ? (selectedCategoryId === 'deals' 
                    ? (p.category === 'deals' || (!!p.originalPrice && p.originalPrice > p.price))
                    : (selectedCategoryId === 'all' ? true : p.category === selectedCategoryId))
                : true;
              const matchesType = type.id === 'all' ? true : p.type === type.id;
              return matchesOccasion && matchesType;
            }).length;

            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/15 scale-102 border border-red-600'
                    : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200'
                }`}
              >
                <span>{type.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Special Deals Countdown Banner */}
        {selectedCategoryId === 'deals' && (
          <div className="mb-12 bg-linear-to-r from-red-500/10 via-rose-500/5 to-amber-500/5 border border-red-200/50 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            {/* Banner Left Details */}
            <div className="relative z-10 flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
              <div className="p-4 bg-red-600 text-white rounded-2xl shadow-lg shadow-red-600/20 animate-pulse">
                <Flame className="w-8 h-8 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-xs font-extrabold text-red-600 uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-md border border-red-200/40">
                    Flash Offer
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Limited items available</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-black text-slate-800 mt-2">
                  Exceptional Surprises, Delightful Values
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-lg">
                  Save up to 30% off on our signature artisan gift hampers, floral bundles, and keepsake collections. Includes standard handwritten greeting cards!
                </p>
              </div>
            </div>

            {/* Countdown Clock Display */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md border border-slate-200 p-3 sm:p-4 rounded-2xl shadow-md flex flex-row items-center gap-3 sm:gap-4 shrink-0 justify-center w-full sm:w-auto max-w-sm sm:max-w-none">
              <div className="text-left sm:text-right">
                <span className="block text-[11px] sm:text-[10px] uppercase font-bold text-slate-500 sm:text-slate-400 tracking-wider">Deals end in</span>
              </div>
              
              <div className="h-8 w-px bg-slate-200" />

              <div className="flex gap-1.5">
                {/* Hours Box */}
                <div className="flex flex-col items-center">
                  <div className="bg-slate-900 text-white font-mono text-base sm:text-lg font-black w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center rounded-lg shadow-xs">
                    {timer.hours}
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Hrs</span>
                </div>
                
                <span className="text-slate-400 font-bold text-base sm:text-lg self-center -mt-4">:</span>

                {/* Minutes Box */}
                <div className="flex flex-col items-center">
                  <div className="bg-slate-900 text-white font-mono text-base sm:text-lg font-black w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center rounded-lg shadow-xs">
                    {timer.minutes}
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Min</span>
                </div>

                <span className="text-slate-400 font-bold text-base sm:text-lg self-center -mt-4">:</span>

                {/* Seconds Box */}
                <div className="flex flex-col items-center">
                  <div className="bg-red-600 text-white font-mono text-base sm:text-lg font-black w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center rounded-lg shadow-md animate-pulse">
                    {timer.seconds}
                  </div>
                  <span className="text-[9px] font-bold text-red-500 mt-1 uppercase tracking-wider">Sec</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty state when query returns nothing */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-rose-50/10 rounded-3xl border border-dashed border-rose-100/40 max-w-xl mx-auto">
            <ShoppingBag className="w-12 h-12 text-rose-300 mx-auto mb-4 stroke-1 animate-bounce" />
            <h3 className="text-lg font-bold text-slate-800">No Match Found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any gifts matching &ldquo;{searchQuery}&rdquo;. Try another search keyword or explore different occasions!
            </p>
            <button
              onClick={() => {
                location.reload();
              }}
              className="mt-5 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded-full transition-all shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-rose-100/30 shadow-xs hover:shadow-xl hover:shadow-rose-100/10 hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col h-full"
                  id={`product-card-${product.id}`}
                >
                  {/* Image wrapper */}
                  <div className="relative aspect-square overflow-hidden bg-rose-50/20">
                    
                    {/* Tags on top-left */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
                      {product.tag && (
                        <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full shadow-md text-white ${
                          product.tag === 'Best Seller' ? 'bg-slate-950/80 backdrop-blur-xs' :
                          product.tag === 'New' ? 'bg-teal-600/90 backdrop-blur-xs' :
                          product.tag === 'Limited' ? 'bg-amber-600/90 backdrop-blur-xs' : 'bg-rose-500/90 backdrop-blur-xs'
                        }`}>
                          {product.tag}
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart Toggle Icon on top-right */}
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md backdrop-blur-xs transition-all duration-300 cursor-pointer ${
                        isWishlisted 
                          ? 'bg-rose-600 text-white hover:bg-rose-700' 
                          : 'bg-white/80 text-gray-400 hover:text-rose-600 hover:scale-105'
                      }`}
                      aria-label="Add to wishlist"
                      id={`wishlist-toggle-${product.id}`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-white' : ''}`} />
                    </button>

                    {/* Image with extreme hover-zoom */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />

                    {/* Dark gradient and Action Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
                      <button
                        onClick={() => openQuickView(product)}
                        className="bg-white hover:bg-rose-50 text-slate-800 text-xs font-bold py-2 px-3.5 rounded-full shadow-md flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                        id={`quickview-btn-${product.id}`}
                      >
                        <Eye className="w-3.5 h-3.5 text-rose-500" />
                        <span>Customize &amp; Buy</span>
                      </button>
                    </div>
                  </div>

                  {/* Details Block */}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-rose-500 mb-1">
                      {product.category.replace('-', ' ')}
                    </span>
                    <h3 className="font-serif font-bold text-slate-800 text-base line-clamp-1 group-hover:text-rose-500 transition-colors mb-1.5">
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-grow">
                      {product.description}
                    </p>

                    {/* Rating and Price row */}
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-rose-50/60">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-current" />
                          <span className="text-xs font-bold text-slate-800">{product.rating}</span>
                          <span className="text-[10px] text-slate-400">({product.reviewsCount})</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-base font-extrabold text-slate-900">${product.price}</span>
                          {product.originalPrice && (
                            <>
                              <span className="text-xs text-slate-400 line-through">${product.originalPrice}</span>
                              <span className="text-[10px] text-red-600 font-extrabold bg-red-50 border border-red-100/50 px-1.5 py-0.5 rounded-sm">
                                Save ${(product.originalPrice - product.price).toFixed(2)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Direct Add to Cart Button */}
                      <button
                        onClick={() => handleQuickAdd(product)}
                        className="p-3 bg-rose-50/50 hover:bg-rose-500 text-rose-500 hover:text-white rounded-full transition-all duration-300 shadow-xs hover:scale-105 cursor-pointer"
                        title="Add to cart instantly"
                        aria-label="Add to cart instantly"
                        id={`add-instant-${product.id}`}
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- CUSTOM QUICK-VIEW & PERSONALIZATION MODAL --- */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-250">
            <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative border border-rose-100/30 flex flex-col md:flex-row max-h-[90vh] md:max-h-none">
              
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-rose-50 text-slate-500 hover:text-slate-800 rounded-full shadow-md transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Visual Area */}
              <div className="md:w-1/2 relative bg-rose-50/10 p-6 flex items-center justify-center border-r border-rose-100/30 max-h-[250px] md:max-h-none overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover max-h-[220px] md:max-h-[450px] rounded-2xl shadow-md"
                  referrerPolicy="no-referrer"
                />
                
                {selectedProduct.tag && (
                  <span className="absolute top-8 left-8 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {selectedProduct.tag}
                  </span>
                )}
              </div>

              {/* Personalization & Control Area */}
              <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[60vh] md:max-h-[500px]">
                <span className="text-xs uppercase font-extrabold tracking-widest text-rose-500">
                  Occasion-Fit curation
                </span>
                <h3 className="font-serif font-black text-slate-800 text-2xl mt-1">
                  {selectedProduct.name}
                </h3>

                {/* Rating Block */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">{selectedProduct.rating}</span>
                  <span className="text-xs text-slate-400">({selectedProduct.reviewsCount} verified ratings)</span>
                </div>

                <p className="text-xs md:text-sm text-slate-600 mt-4 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Price Display */}
                <div className="flex items-center gap-3 mt-4 bg-rose-50/40 p-3 rounded-xl border border-rose-100/30">
                  <span className="text-2xl font-black text-slate-900">${selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">${selectedProduct.originalPrice}</span>
                  )}
                  <span className="ml-auto text-[10px] text-emerald-700 font-extrabold uppercase bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                    In Stock &amp; Ready to Ship
                  </span>
                </div>

                {/* Interactive Custom Personalization Toggle */}
                <div className="mt-6 border-t border-rose-50/60 pt-5">
                  <button
                    onClick={() => setPersonalizeOpen(!personalizeOpen)}
                    className="flex items-center gap-2 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer bg-rose-50/40 py-2 px-4 rounded-lg w-full"
                  >
                    <Gift className="w-4 h-4" />
                    <span>{personalizeOpen ? "Hide Custom Personalizations" : "🎁 Personalize this Gift (Add Wrapper & handwritten note)"}</span>
                    <Edit3 className="w-3.5 h-3.5 ml-auto" />
                  </button>

                  {personalizeOpen ? (
                    <div className="mt-4 space-y-4 animate-in slide-in-from-top-3 duration-200">
                      
                      {/* Wrapping Options */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">
                          1. Select Luxury Wrap Style:
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {WRAPPERS.map((wrap) => (
                            <button
                              key={wrap.id}
                              onClick={() => setSelectedWrapper(wrap.id)}
                              className={`flex items-center gap-3 p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                                selectedWrapper === wrap.id
                                  ? 'border-rose-500 bg-rose-50/40 font-semibold'
                                  : 'border-slate-200 bg-white hover:border-slate-300'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-full ${wrap.color} border border-white`} />
                              <span>{wrap.name}</span>
                              {wrap.price > 0 && (
                                <span className="ml-auto text-[10px] font-bold text-rose-500 bg-white px-2 py-0.5 border border-rose-100 rounded-sm">
                                  +${wrap.price}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Handwritten Card Message Option */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex justify-between">
                          <span>2. Handwritten Greeting Card Message:</span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 rounded-sm border border-emerald-100">FREE PROMO</span>
                        </label>
                        <textarea
                          placeholder="Type your gift card message here... We will write it in premium calligraphy by hand! (e.g. 'Happy Birthday Mom! With love, John.')"
                          rows={2.5}
                          className="w-full text-xs border border-slate-200 rounded-xl p-3 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 outline-none placeholder-slate-400 bg-slate-50/50 text-slate-800"
                          value={cardText}
                          onChange={(e) => setCardText(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <Info className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>Comes standard in our luxury velvet-finished gift box. Tap the button above to add handwritten greeting cards.</span>
                    </div>
                  )}
                </div>

                {/* Quantity & Buy control row */}
                <div className="mt-6 border-t border-rose-50/60 pt-5 flex items-center gap-4">
                  
                  {/* Quantity selector */}
                  <div className="flex items-center border border-rose-100 bg-rose-50/10 rounded-full p-1">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-rose-50 font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-black text-slate-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-rose-50 font-bold cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Add with personalization btn */}
                  <button
                    onClick={handleCustomAddToCart}
                    className="flex-grow flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-3 px-6 rounded-full shadow-lg shadow-slate-950/10 hover:scale-101 duration-250 cursor-pointer"
                    id="add-custom-product-btn"
                  >
                    {successAnim ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400 animate-ping" />
                        <span>Added to Gift Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add customized Gift to Cart</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
