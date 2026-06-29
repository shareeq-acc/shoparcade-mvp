import { useState, FormEvent } from 'react';
import { Gift, Search, Heart, ShoppingBag, User, Sparkles, Menu, X } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cart: CartItem[];
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onSearch: (query: string) => void;
}

export default function Navbar({
  cart,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  onSearch,
}: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      if (sectionId === 'hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight : 110;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset - 16;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/60 backdrop-blur-md border-b border-rose-50/50 shadow-xs transition-all duration-300">
      {/* Top bar with promo & contact */}
      <div className="w-full bg-slate-900 text-white text-xs py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-1.5 font-sans tracking-wide">
        <div className="flex items-center gap-1">
          <span>FREE DELIVERY on orders over $30.00</span>
        </div>
        <div className="hidden md:block italic font-medium text-rose-100">
          Make Every Moment Special
        </div>
        <div className="flex items-center gap-3 text-rose-100">
          <span>Need help?</span>
          <a href="tel:+1300123456" className="font-bold hover:text-white transition-colors">
            +1 (300) 123-4567
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Hamburger menu for mobile */}
        <div className="flex-1 flex md:hidden items-center justify-start">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-gray-500 hover:text-rose-500 transition-colors"
            aria-label="Toggle Menu"
            id="nav-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center cursor-pointer group shrink-0"
          id="logo-container"
        >
          <img 
            src="/src/assets/images/gift_logo_1782687479039.jpg" 
            alt="GIFT Logo" 
            className="h-12 w-12 sm:h-14 sm:w-14 object-contain transition-transform group-hover:scale-105 duration-300"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <button
            onClick={() => handleNavClick('hero')}
            className="hover:text-red-600 cursor-pointer transition-colors duration-200 relative group py-2"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
          </button>
          <button
            onClick={() => handleNavClick('categories')}
            className="hover:text-red-600 cursor-pointer transition-colors duration-200 relative group py-2"
          >
            Categories
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
          </button>
          <button
            onClick={() => handleNavClick('reviews')}
            className="hover:text-red-600 cursor-pointer transition-colors duration-200 relative group py-2"
          >
            Reviews
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
          </button>
          <button
            onClick={() => handleNavClick('trust-badges')}
            className="hover:text-red-600 cursor-pointer transition-colors duration-200 relative group py-2"
          >
            Why Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
          </button>
          <button
            onClick={() => handleNavClick('faqs')}
            className="hover:text-red-600 cursor-pointer transition-colors duration-200 relative group py-2"
          >
            FAQs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
          </button>
        </nav>

        {/* Search, Wishlist, Cart & Profile Icons */}
        <div className="flex-1 md:flex-initial flex items-center justify-end gap-2 sm:gap-4">
          {/* Dynamic Search Box Icon */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-full transition-all ${
                searchOpen 
                  ? 'text-rose-600 bg-rose-50/80' 
                  : 'text-slate-500 hover:text-rose-600 hover:bg-slate-50'
              }`}
              aria-label="Search"
              id="search-trigger-btn"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Info Icon */}
          <button
            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-50 rounded-full transition-all hidden sm:block"
            aria-label="Profile"
            onClick={() => alert("Welcome to Gifts n Gifts! You can sign up or view your profile during the simulated checkout.")}
          >
            <User className="w-5 h-5" />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={onWishlistClick}
            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-50 rounded-full transition-all relative"
            aria-label="Wishlist"
            id="wishlist-btn"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
            )}
          </button>

          {/* Cart Icon with total items */}
          <button
            onClick={onCartClick}
            className="p-2.5 bg-red-600 text-white hover:bg-red-700 rounded-full transition-all relative flex items-center justify-center shadow-md shadow-red-100 hover:scale-105 duration-200"
            aria-label="Shopping Cart"
            id="cart-btn"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[9px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Row Container on its own line */}
      {searchOpen && (
        <div className="w-full bg-slate-50 border-t border-rose-50/50 py-3.5 px-4 animate-in slide-in-from-top duration-200">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-rose-500 shrink-0" />
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
              <input
                type="text"
                placeholder="Search premium gifts, roses, cakes, chocolate baskets..."
                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent outline-none py-1"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch(e.target.value);
                }}
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onSearch('');
                  }}
                  className="p-1 mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
                onSearch('');
              }}
              className="text-[10px] sm:text-xs font-bold text-slate-500 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-slate-200/40 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-white/95 backdrop-blur-md border-t border-rose-50/50 py-4 px-6 shadow-xl animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4 text-base font-semibold text-slate-700">
            {/* Mobile Search Bar at the top of the Nav list */}
            <form onSubmit={handleSearchSubmit} className="relative w-full mb-2">
              <input
                type="text"
                placeholder="Search premium gifts, cakes, roses..."
                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-slate-50 border border-rose-100 rounded-xl py-2.5 pl-10 pr-10 outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/20 transition-all font-normal"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch(e.target.value);
                }}
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    onSearch('');
                  }}
                  className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-2.5 rounded-full hover:bg-slate-200/50"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            <button
              onClick={() => handleNavClick('hero')}
              className="text-left py-2.5 hover:text-rose-500 border-b border-rose-50/50 flex items-center justify-between"
            >
              <span>Home</span>
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="text-left py-2.5 hover:text-rose-500 border-b border-rose-50/50 flex items-center justify-between"
            >
              <span>Categories</span>
            </button>
            <button
              onClick={() => handleNavClick('reviews')}
              className="text-left py-2.5 hover:text-rose-500 border-b border-rose-50/50 flex items-center justify-between"
            >
              <span>Reviews</span>
            </button>
            <button
              onClick={() => handleNavClick('trust-badges')}
              className="text-left py-2.5 hover:text-rose-500 border-b border-rose-50/50 flex items-center justify-between"
            >
              <span>Why Us</span>
            </button>
            <button
              onClick={() => handleNavClick('faqs')}
              className="text-left py-2.5 hover:text-rose-500 flex items-center justify-between"
            >
              <span>FAQs</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
