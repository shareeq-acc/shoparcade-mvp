import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ShoppingCart, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight,
  Gift, 
  Heart, 
  Users, 
  Calendar, 
  Briefcase, 
  Award, 
  Percent, 
  Sparkles,
  Cake
} from 'lucide-react';
import { heroSlides } from '../data';
import { Product } from '../types';

interface HeroProps {
  onAddToCart: (product: Product, quantity: number) => void;
  allProducts: Product[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const heroCategories = [
  { id: 'all', name: 'All Gifts', icon: Gift },
  { id: 'birthday', name: 'Birthday', icon: Cake },
  { id: 'anniversary', name: 'Anniversary', icon: Heart },
  { id: 'wedding', name: 'Wedding', icon: Users },
  { id: 'holidays', name: 'Holidays', icon: Calendar },
  { id: 'corporate', name: 'Corporate', icon: Briefcase },
  { id: 'new-arrivals', name: 'New Arrivals', icon: Award },
  { id: 'deals', name: 'Deals', icon: Percent },
];

export default function Hero({ 
  onAddToCart, 
  allProducts,
  selectedCategoryId,
  onSelectCategory
}: HeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const currentSlide = heroSlides[currentSlideIndex];
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  // Auto-play slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentSlideIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlideIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlideIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const handleBuyNow = () => {
    const product = allProducts.find(p => p.id === currentSlide.productId);
    if (product) {
      onAddToCart(product, 1);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);

    // Scroll to products section to show result
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Find associated product
  const currentProduct = allProducts.find(p => p.id === currentSlide.productId);

  // Background serif word depending on the slide
  const bigWords = ['Flowers', 'Hampers', 'Memories'];
  const currentBigWord = bigWords[currentSlideIndex];

  return (
    <>
      <section 
        className="w-full relative overflow-visible min-h-[560px] md:min-h-[620px] lg:min-h-[660px] flex items-center font-sans bg-gradient-to-tr from-[#fff5f5] via-[#fffafb] to-[#fff0f2] border-b border-rose-100/30 pb-16 md:pb-20 pt-8 md:pt-12"
        id="hero"
      >
      {/* Decorative Floating Petals / Ribbons in Background */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-10 left-[10%] w-4 h-4 bg-rose-200 rounded-full opacity-60 blur-xs animate-[bounce_5s_infinite_ease-in-out]"></div>
        <div className="absolute top-[30%] right-[15%] w-3 h-3 bg-rose-300 rounded-full opacity-40 blur-xs animate-[bounce_7s_infinite_ease-in-out_1s]"></div>
        <div className="absolute bottom-20 left-[25%] w-5 h-5 bg-pink-100 rounded-full opacity-70 blur-xs animate-[bounce_6s_infinite_ease-in-out_2s]"></div>
        <div className="absolute top-[60%] left-[8%] w-6 h-3 bg-rose-400/20 rounded-full rotate-45 animate-[pulse_4s_infinite_ease-in-out]"></div>
        <div className="absolute bottom-[40%] right-[8%] w-8 h-4 bg-amber-200/40 rounded-full -rotate-12 animate-[pulse_5s_infinite_ease-in-out]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Product Info & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="space-y-4 md:space-y-6"
              >
                {/* Small Header */}
                <span className="inline-block text-xs font-semibold text-red-600 tracking-widest uppercase bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-red-100/40 shadow-xs">
                  {currentSlide.title}
                </span>

                {/* Subtitle / Name */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-slate-800 leading-tight">
                  {currentSlide.subtitle}
                </h1>

                {/* Description */}
                <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-lg">
                  {currentSlide.description}
                </p>

                {/* Ratings block */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 bg-white/60 px-2 py-0.5 rounded-sm">
                    {currentSlide.rating} Stars
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    ({currentSlide.reviewsCount} Reviews)
                  </span>
                </div>

                {/* Styled Pill Button - Exact replica of Flower UI item with price pill and cart button */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={handleBuyNow}
                    disabled={!currentProduct}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5 pl-6 pr-1.5 transition-all duration-300 shadow-lg shadow-red-600/15 hover:scale-105 active:scale-95 group/btn cursor-pointer"
                  >
                    <span className="text-xs md:text-sm font-bold tracking-wide mr-5">
                      ${currentSlide.price} / {currentSlide.unit}
                    </span>
                    <div className="bg-white text-red-600 rounded-full p-2.5 flex items-center justify-center transition-transform group-hover/btn:translate-x-1 duration-300 shadow-sm">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      const element = document.getElementById('products');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex items-center gap-2 text-xs md:text-sm font-bold text-slate-700 hover:text-red-600 transition-colors group cursor-pointer"
                  >
                    <span>View Catalog</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Center Column: Gigantic Word + Overlapping Product Image */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[300px] md:min-h-[400px] order-1 lg:order-2">
            
            {/* Massive Serif Word in Background */}
            <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentSlide.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.08, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="text-8xl sm:text-9xl md:text-[11rem] lg:text-[12rem] font-serif font-black text-red-300 tracking-tight whitespace-nowrap text-center"
                >
                  {currentBigWord}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Product Image floating overlapping the big word */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/20 backdrop-blur-xs p-4 flex items-center justify-center border border-white/30 shadow-xl overflow-visible">
              
              {/* Inner ambient glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500/10 to-white/10 -z-10 animate-[spin_20s_infinite_linear]" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="w-full h-full relative"
                >
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.subtitle}
                    className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white transform hover:rotate-2 hover:scale-[1.03] transition-transform duration-500 cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating badge for standard overlay feeling */}
                  {currentProduct?.tag && (
                    <span className="absolute top-2 right-2 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-md animate-bounce">
                      {currentProduct.tag}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Mini Slide Index Indicator */}
          <div className="lg:col-span-2 flex flex-col justify-center lg:justify-end items-center order-3 pb-4">
            
            {/* Elegant Capsule Slider control from user design */}
            <div className="flex items-center bg-white p-1.5 rounded-full border border-slate-900 shadow-md">
              
              {/* Left arrow button (faint border, white background) */}
              <button 
                onClick={handlePrev}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-300 active:scale-90 transition-all cursor-pointer shrink-0"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4.5 h-4.5 stroke-[2.5]" />
              </button>

              {/* Slider count styled in gorgeous bold serif font */}
              <span className="text-base font-serif font-bold text-slate-900 tracking-wide select-none flex items-center gap-2 px-3">
                0{currentSlideIndex + 1}
                <span className="text-slate-300 font-sans font-light text-sm">/</span>
                0{heroSlides.length}
              </span>

              {/* Right arrow button (solid red background, white icon) */}
              <button 
                onClick={handleNext}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 text-white hover:bg-red-700 active:scale-90 transition-all cursor-pointer shrink-0 shadow-sm"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4.5 h-4.5 stroke-[2.5]" />
              </button>

            </div>
          </div>

        </div>
      </div>

    </section>

    {/* --- FLOATING CATEGORIES BAR OVERLAPPING BOTTOM BORDER --- */}
    <div 
      className="relative z-40 -mt-10 md:-mt-14 max-w-5xl mx-auto px-4 md:px-6 w-full"
      id="categories"
    >
      <div className="relative w-full group/scroll flex items-center">
        {/* Left scroll chevron */}
        <button
          onClick={scrollLeft}
          className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full bg-white border border-red-100 shadow-lg flex items-center justify-center text-red-600 hover:bg-red-50 hover:text-red-700 active:scale-90 transition-all md:hidden cursor-pointer"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div 
          ref={scrollContainerRef}
          className="w-full bg-white rounded-2xl md:rounded-[2.2rem] p-3 md:p-5 border border-red-100/40 shadow-xl shadow-red-950/5 flex flex-nowrap items-center justify-start md:justify-between gap-3 md:gap-2 overflow-x-auto no-scrollbar scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {heroCategories.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedCategoryId === cat.id;
            return (
              <div key={cat.id} className="flex items-center justify-center shrink-0 w-[85px] sm:w-[95px] md:w-auto md:flex-1">
                <button
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`flex flex-col items-center justify-center py-2 px-1 w-full rounded-xl transition-all duration-300 group cursor-pointer ${
                    isSelected 
                      ? 'bg-red-50 text-red-600 scale-102' 
                      : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <div className={`p-2 rounded-full transition-all duration-300 ${
                    isSelected 
                      ? 'bg-red-600 text-white shadow-sm shadow-red-200' 
                      : 'bg-red-50/50 text-red-600 group-hover:scale-110 group-hover:bg-red-50'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] md:text-xs font-bold mt-1.5 whitespace-nowrap tracking-tight transition-colors ${
                    isSelected ? 'text-red-600' : 'text-slate-700'
                  }`}>
                    {cat.name}
                  </span>
                </button>
                {idx < heroCategories.length - 1 && (
                  <div className="hidden md:block w-px h-10 bg-slate-100/80 ml-2 md:ml-4 self-center shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Right scroll chevron */}
        <button
          onClick={scrollRight}
          className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-50 w-9 h-9 rounded-full bg-white border border-red-100 shadow-lg flex items-center justify-center text-red-600 hover:bg-red-50 hover:text-red-700 active:scale-90 transition-all md:hidden cursor-pointer"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  </>
);
}
