/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Reviews from './components/Reviews';
import FAQs from './components/FAQs';
import TrustBadges from './components/TrustBadges';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { Product, CartItem } from './types';
import { products } from './data';
import { Sparkles, Gift, Check, X } from 'lucide-react';

export default function App() {
  // Cart state sync with local storage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('gift_store_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state sync with local storage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('gift_store_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>('all');
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Sync to local storage on state changes
  useEffect(() => {
    localStorage.setItem('gift_store_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('gift_store_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Gentle auto-rotation of occasions/categories every 6 seconds when idle
  useEffect(() => {
    if (!isAutoRotating) return;
    const occasions = ['all', 'birthday', 'anniversary', 'wedding', 'holidays', 'corporate', 'new-arrivals', 'deals'];
    const interval = setInterval(() => {
      setSelectedCategoryId((prev) => {
        const currentIdx = occasions.indexOf(prev || 'all');
        const nextIdx = (currentIdx + 1) % occasions.length;
        return occasions[nextIdx];
      });
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const handleSelectCategory = (catId: string | null) => {
    setIsAutoRotating(false); // Stop auto-rotation immediately on user choice!
    setSelectedCategoryId(catId);
  };

  // Handler: Add item to shopping cart (handles wrapper & handwritten card custom details)
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    selectedWrapper?: string,
    greetingCardText?: string
  ) => {
    setCart((prevCart) => {
      // Find matching item (with identical custom wrappers & card texts)
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedWrapper === selectedWrapper &&
          item.greetingCardText === greetingCardText
      );

      if (existingIndex > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIndex].quantity += quantity;
        return nextCart;
      }

      return [
        ...prevCart,
        {
          product,
          quantity,
          selectedWrapper,
          greetingCardText,
        },
      ];
    });

    // Alert Notification
    setAlertMessage(`Added ${quantity}x "${product.name}" to your surprise gift bag!`);
    setTimeout(() => setAlertMessage(null), 3000);
  };

  // Handler: Remove item from cart
  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Handler: Update item quantity in cart
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Handler: Clear full cart
  const handleClearCart = () => {
    setCart([]);
  };

  // Handler: Toggle wishlist addition
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const isWish = prev.includes(productId);
      const productName = products.find((p) => p.id === productId)?.name || 'Gift';

      if (isWish) {
        setAlertMessage(`Removed "${productName}" from your wishlist.`);
        setTimeout(() => setAlertMessage(null), 2500);
        return prev.filter((id) => id !== productId);
      } else {
        setAlertMessage(`💖 Saved "${productName}" to your wishlist!`);
        setTimeout(() => setAlertMessage(null), 2500);
        return [...prev, productId];
      }
    });
  };

  const handleWishlistClick = () => {
    if (wishlist.length === 0) {
      setAlertMessage("Your wishlist is empty. Tap the heart icons on popular products to save items!");
      setTimeout(() => setAlertMessage(null), 4000);
    } else {
      // Filter products by wishlist keys
      setSelectedCategoryId(null);
      setSearchQuery('');
      setAlertMessage(`Filtering your wishlist: ${wishlist.length} saved items!`);
      setTimeout(() => setAlertMessage(null), 3000);
      
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Helper: filter products grid based on wishlist if active
  const isWishlistFilteredOnly = wishlist.length > 0 && selectedCategoryId === null && searchQuery === 'wishlist-only';

  return (
    <div className="min-h-screen w-full max-w-full bg-[#fdfaf8] text-slate-900 flex flex-col justify-between selection:bg-rose-200 selection:text-rose-900 relative">
      
      {/* Floating Global Micro-Notification Banner */}
      {alertMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-gray-900 text-white text-xs font-bold py-3 px-5 rounded-2xl shadow-2xl border border-gray-800 flex items-center gap-2.5 animate-in slide-in-from-bottom duration-300">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
          <span>{alertMessage}</span>
          <button onClick={() => setAlertMessage(null)} className="ml-3 text-gray-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 1. NAVBAR SECTION */}
      <Navbar
        cart={cart}
        wishlistCount={wishlist.length}
        onCartClick={() => setCartOpen(true)}
        onWishlistClick={handleWishlistClick}
        onSearch={(query) => setSearchQuery(query)}
      />

      <main className="w-full overflow-x-hidden flex flex-col">
        {/* 2. HERO SECTION */}
        <Hero 
          onAddToCart={handleAddToCart} 
          allProducts={products} 
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={handleSelectCategory}
        />

        {/* 4. PRODUCTS SECTION */}
        <Products
          searchQuery={searchQuery}
          selectedCategoryId={selectedCategoryId}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
        />

        {/* 5. REVIEWS SECTION */}
        <Reviews />

        {/* Trust Badges */}
        <TrustBadges />

        {/* 6. FAQS SECTION */}
        <FAQs />

        {/* 7. FINAL CTA SECTION */}
        <FinalCTA />
      </main>

      {/* 8. FOOTER SECTION */}
      <Footer />

      {/* 9. CART DRAWER OVERLAY PANEL */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
