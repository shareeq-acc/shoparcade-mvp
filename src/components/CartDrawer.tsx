import { useState, FormEvent } from 'react';
import { X, Trash2, ShoppingBag, Gift, Edit2, Check, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  // Coupon state
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Checkout phase state: 'cart' | 'checkout' | 'success'
  const [phase, setPhase] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutNotes, setCheckoutNotes] = useState('');
  const [checkoutDate, setCheckoutDate] = useState('');
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  // Compute values
  const getWrapPrice = (wrapperName?: string) => {
    if (!wrapperName) return 0;
    if (wrapperName.includes('Velvet')) return 2.99;
    if (wrapperName.includes('Elegance')) return 3.49;
    if (wrapperName.includes('Meadow')) return 1.99;
    return 0;
  };

  const itemSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const wrapTotal = cart.reduce((sum, item) => sum + getWrapPrice(item.selectedWrapper) * item.quantity, 0);
  
  const discountAmount = (itemSubtotal + wrapTotal) * (discountPercent / 100);
  const finalSubtotal = itemSubtotal + wrapTotal - discountAmount;
  
  const shippingFee = finalSubtotal >= 30.00 || finalSubtotal === 0 ? 0 : 5.99;
  const finalTotal = finalSubtotal + shippingFee;

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'GIFT15') {
      setCouponApplied(true);
      setDiscountPercent(15);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try GIFT15!');
    }
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutAddress || !checkoutPhone || !checkoutDate) {
      setFormError("Please fill in all required delivery details.");
      return;
    }
    setFormError('');
    setPhase('success');
  };

  const resetAll = () => {
    onClearCart();
    setPhase('cart');
    setCheckoutName('');
    setCheckoutAddress('');
    setCheckoutPhone('');
    setCheckoutNotes('');
    setCheckoutDate('');
    setCoupon('');
    setCouponApplied(false);
    setDiscountPercent(0);
    setFormError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end font-sans">
      
      {/* Background Dimming Layer */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/50 backdrop-blur-xs animate-in fade-in duration-200"
      />

      {/* Main Drawer Slide */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 z-10">
        
        {/* --- HEADER --- */}
        <div className="p-5 border-b border-rose-100 flex items-center justify-between bg-[#fdfaf8]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            <span className="text-lg font-serif font-black text-slate-800">
              Your Gift Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
            aria-label="Close cart"
            id="cart-drawer-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* --- DYNAMIC BODY CHANGER --- */}
        <div className="flex-grow overflow-y-auto p-5 space-y-6">
          
          {/* PHASE 1: CART DISPLAY */}
          {phase === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 text-rose-200 mx-auto stroke-1 animate-bounce mb-4" />
                  <h3 className="font-serif font-black text-slate-800 text-lg">Your Cart is Empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Take a look at our curated collections and choose something beautiful to send!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-5 py-2.5 rounded-full transition-all shadow-md cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 border border-rose-100/60 rounded-2xl bg-[#FFFDFD] relative group hover:border-rose-200 transition-all"
                    >
                      {/* Product image */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl border border-rose-50"
                        referrerPolicy="no-referrer"
                      />

                      {/* Item Info block */}
                      <div className="flex-grow min-w-0 text-left">
                        <h4 className="font-serif font-bold text-gray-800 text-sm truncate pr-4">
                          {item.product.name}
                        </h4>
                        
                        {/* Selected customization badges */}
                        <div className="space-y-1 mt-1">
                          <p className="text-[10px] text-slate-500 flex items-center gap-1">
                            <span className="font-bold text-rose-500">Price:</span> ${item.product.price}
                          </p>
                          {item.selectedWrapper && (
                            <p className="text-[10px] text-slate-400 italic flex items-center gap-1.5 truncate">
                              <span className="w-2 h-2 rounded-full bg-rose-500" />
                              <span>Wrap: {item.selectedWrapper.split('(')[0]}</span>
                            </p>
                          )}
                          {item.greetingCardText && (
                            <p className="text-[10px] text-slate-400 italic truncate flex items-center gap-1.5">
                              <Edit2 className="w-2.5 h-2.5 text-rose-500" />
                              <span>Card: &ldquo;{item.greetingCardText}&rdquo;</span>
                            </p>
                          )}
                        </div>

                        {/* Quantity management & Delete */}
                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-rose-50/80">
                          <div className="flex items-center border border-rose-100 bg-rose-50/10 rounded-full p-0.5 scale-90 -ml-2">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-rose-50 font-bold"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-xs font-black text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-rose-50 font-bold"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-xs font-extrabold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Trash Delete button on hover/always */}
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors"
                        aria-label="Delete item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  ))}

                  {/* Promo coupon wrapper code */}
                  <form onSubmit={handleApplyCoupon} className="pt-4 border-t border-rose-100/50">
                    <div className="flex bg-rose-50/20 border border-rose-100 rounded-xl p-1.5">
                      <div className="pl-2 flex items-center text-slate-400">
                        <Ticket className="w-4 h-4 text-rose-500" />
                      </div>
                      <input
                        type="text"
                        placeholder="Promo Code (Try GIFT15)"
                        className="w-full text-xs text-slate-800 placeholder-slate-400 bg-transparent outline-none px-3"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        disabled={couponApplied}
                      />
                      <button
                        type="submit"
                        disabled={couponApplied}
                        className={`text-xs font-bold py-1.5 px-4 rounded-lg transition-all ${
                          couponApplied 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                        }`}
                      >
                        {couponApplied ? 'Applied' : 'Apply'}
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-[10px] text-red-600 font-bold mt-1 text-left pl-2">⚠️ {couponError}</p>
                    )}
                    {couponApplied && (
                      <p className="text-[10px] text-emerald-600 font-bold mt-1 text-left pl-2">🎉 Success! 15% discount applied successfully.</p>
                    )}
                  </form>
                </div>
              )}
            </>
          )}

          {/* PHASE 2: SECURE DELIVERY CHECKOUT FORM */}
          {phase === 'checkout' && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-left">
              <div className="bg-rose-50/30 p-4 rounded-2xl border border-rose-100/30 mb-2">
                <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wide">Secure Gift Delivery</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Please provide coordinates of where this gift should surprise its recipient.</p>
              </div>

              {/* Recipient Full Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Recipient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grandma Rose"
                  className="w-full text-xs border border-rose-100 rounded-xl p-3 focus:border-rose-400 outline-none"
                  value={checkoutName}
                  onChange={(e) => setCheckoutName(e.target.value)}
                />
              </div>

              {/* Complete delivery address */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Delivery Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 123 Sunshine Avenue, Brooklyn, NY"
                  className="w-full text-xs border border-rose-100 rounded-xl p-3 focus:border-rose-400 outline-none"
                  value={checkoutAddress}
                  onChange={(e) => setCheckoutAddress(e.target.value)}
                />
              </div>

              {/* Delivery contact Phone */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Recipient Phone Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. +1 (555) 019-2834"
                  className="w-full text-xs border border-rose-100 rounded-xl p-3 focus:border-rose-400 outline-none"
                  value={checkoutPhone}
                  onChange={(e) => setCheckoutPhone(e.target.value)}
                />
              </div>

              {/* Date of delivery surprise */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Surprise Delivery Date *</label>
                <input
                  type="date"
                  required
                  className="w-full text-xs border border-rose-100 rounded-xl p-3 focus:border-rose-400 outline-none text-slate-800"
                  value={checkoutDate}
                  onChange={(e) => setCheckoutDate(e.target.value)}
                />
              </div>

              {/* Delivery instructions / notes */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Special Delivery Instructions (Optional)</label>
                <textarea
                  placeholder="e.g. Leave with doorman, ring bell twice, ring when near..."
                  rows={2}
                  className="w-full text-xs border border-rose-100 rounded-xl p-3 focus:border-rose-400 outline-none placeholder-slate-400 text-slate-800"
                  value={checkoutNotes}
                  onChange={(e) => setCheckoutNotes(e.target.value)}
                />
              </div>

              {formError && (
                <div className="text-[11px] font-bold text-rose-500 bg-rose-50/50 p-2 rounded-lg border border-rose-100 text-left">
                  ⚠️ {formError}
                </div>
              )}

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setPhase('cart')}
                  className="w-1/3 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 hover:bg-slate-100 py-3 rounded-full transition-all"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  className="w-2/3 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 py-3 rounded-full transition-all shadow-md shadow-rose-200/20 hover:scale-101 cursor-pointer"
                >
                  Confirm Surprise Dispatch
                </button>
              </div>
            </form>
          )}

          {/* PHASE 3: CONGRATULATIONS SUCCESS SUMMARY SCREEN */}
          {phase === 'success' && (
            <div className="text-center py-10 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500 animate-bounce">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-black text-gray-900 text-xl">Surprise Dispatched Successfully!</h3>
                <p className="text-xs text-gray-500">Your gift order has been queued in our calligraphy &amp; design workshops.</p>
              </div>

              {/* Order summary card info */}
              <div className="bg-rose-50/40 border border-rose-100/50 rounded-2xl p-5 text-left space-y-3">
                <div className="flex justify-between border-b border-rose-100 pb-2 text-[11px] font-bold text-rose-500">
                  <span>ESTIMATED DELIVERY</span>
                  <span>{checkoutDate}</span>
                </div>
                
                <div className="space-y-1 text-xs text-gray-700">
                  <p><span className="font-bold">Recipient:</span> {checkoutName}</p>
                  <p><span className="font-bold">Destination:</span> {checkoutAddress}</p>
                  <p><span className="font-bold">Contact Phone:</span> {checkoutPhone}</p>
                  {checkoutNotes && <p className="italic text-gray-500 text-[11px]"><span className="font-bold font-sans not-italic text-gray-700">Special Instructions:</span> &ldquo;{checkoutNotes}&rdquo;</p>}
                </div>

                <div className="border-t border-rose-100 pt-3 space-y-1 text-xs font-semibold">
                  <div className="flex justify-between text-gray-500">
                    <span>Gifts Subtotal</span>
                    <span>${itemSubtotal.toFixed(2)}</span>
                  </div>
                  {wrapTotal > 0 && (
                    <div className="flex justify-between text-gray-500">
                      <span>Premium Wraps</span>
                      <span>${wrapTotal.toFixed(2)}</span>
                    </div>
                  )}
                  {couponApplied && (
                    <div className="flex justify-between text-emerald-600">
                      <span>15% Club Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping Fee</span>
                    <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-900 font-extrabold text-sm pt-2 border-t border-dashed border-rose-200">
                    <span>Total Amount Charged</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50/50 text-emerald-800 text-[11px] font-bold py-2 px-4 rounded-xl border border-emerald-100 flex items-center gap-2 justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Simulated Order Completed. No real payment required!</span>
              </div>

              <button
                onClick={resetAll}
                className="w-full text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 py-3 rounded-full transition-all cursor-pointer"
                id="success-done-btn"
              >
                Return to Store Page
              </button>
            </div>
          )}

        </div>

        {/* --- DYNAMIC FOOTER / CALCULATOR CHANGER --- */}
        {phase === 'cart' && cart.length > 0 && (
          <div className="p-5 border-t border-rose-100 bg-[#fdfaf8] space-y-4">
            
            {/* Price Calculations */}
            <div className="space-y-2 text-xs font-semibold text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span>${itemSubtotal.toFixed(2)}</span>
              </div>
              
              {wrapTotal > 0 && (
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-rose-500" />
                    <span>Selected Custom Wraps</span>
                  </span>
                  <span>${wrapTotal.toFixed(2)}</span>
                </div>
              )}

              {couponApplied && (
                <div className="flex justify-between text-emerald-600">
                  <span>15% Coupon Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
              </div>

              {shippingFee > 0 && (
                <p className="text-[10px] text-rose-500 font-bold text-left bg-white p-1.5 border border-rose-100 rounded-sm">
                  💡 Tip: Add ${(30.00 - finalSubtotal).toFixed(2)} more to unlock FREE shipping!
                </p>
              )}

              <div className="flex justify-between text-slate-900 font-extrabold text-base pt-3 border-t border-dashed border-rose-200">
                <span>Estimated Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* CTA to Checkout phase */}
            <button
              onClick={() => setPhase('checkout')}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-3.5 px-6 rounded-full shadow-lg shadow-slate-950/10 hover:scale-101 active:scale-99 transition-all cursor-pointer"
              id="checkout-trigger-btn"
            >
              <span>Proceed to Delivery details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
