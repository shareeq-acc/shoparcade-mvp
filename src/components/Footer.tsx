import { Gift, Instagram, Facebook, Youtube, Twitter, Heart, Compass, ShieldCheck } from 'lucide-react';

export default function Footer() {
  
  const handleLogoClick = () => {
    const element = document.getElementById('hero');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-slate-900">
      


      {/* Middle Footer: Main Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand & Mission column */}
        <div className="space-y-4 text-left">
          <div onClick={handleLogoClick} className="flex items-center cursor-pointer group">
            <img 
              src="/src/assets/images/gift_logo_1782687479039.jpg" 
              alt="GIFT Logo" 
              className="h-12 w-12 object-contain bg-white rounded-lg p-1 transition-transform group-hover:scale-105 duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            We curate beautiful, high-quality bespoke gifts and premium flowers to help you celebrate connections, build smiles, and make every simple shared moment truly spectacular.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-red-600 hover:text-white rounded-full transition-all" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-red-600 hover:text-white rounded-full transition-all" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-red-600 hover:text-white rounded-full transition-all" aria-label="Youtube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-900 hover:bg-red-600 hover:text-white rounded-full transition-all" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Nav links Column */}
        <div className="space-y-3 text-left">
          <h4 className="text-white text-xs uppercase font-extrabold tracking-widest border-b border-slate-900 pb-2">
            Occasions
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button onClick={() => handleNavClick('categories')} className="hover:text-white hover:underline cursor-pointer">
                Birthdays Selection
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('categories')} className="hover:text-white hover:underline cursor-pointer">
                Romantic Anniversaries
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('categories')} className="hover:text-white hover:underline cursor-pointer">
                Weddings &amp; Bridal Keepsakes
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('categories')} className="hover:text-white hover:underline cursor-pointer">
                Holidays &amp; Festive Boxes
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('categories')} className="hover:text-white hover:underline cursor-pointer">
                Corporate Tokens
              </button>
            </li>
          </ul>
        </div>

        {/* Quick links Column */}
        <div className="space-y-3 text-left">
          <h4 className="text-white text-xs uppercase font-extrabold tracking-widest border-b border-slate-900 pb-2">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>
              <button onClick={() => handleNavClick('hero')} className="hover:text-white hover:underline cursor-pointer">
                Home Showcase
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('categories')} className="hover:text-white hover:underline cursor-pointer">
                Browse Categories
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('products')} className="hover:text-white hover:underline cursor-pointer">
                Best Sellers Range
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('reviews')} className="hover:text-white hover:underline cursor-pointer">
                Happy Customer Stories
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('faqs')} className="hover:text-white hover:underline cursor-pointer">
                FAQ Support Center
              </button>
            </li>
          </ul>
        </div>

         {/* Contact info column */}
        <div className="space-y-3 text-left">
          <h4 className="text-white text-xs uppercase font-extrabold tracking-widest border-b border-slate-900 pb-2">
            The Studio Office
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
            <li>
              <p className="font-semibold text-white">Gifts n Gifts Headquarters</p>
              <p className="mt-0.5">85 Sweet Celebration Dr, Ste 100, New York, NY 10001</p>
            </li>
            <li>
              <p className="font-semibold text-white">Support Phone:</p>
              <a href="tel:+1300123456" className="hover:text-white transition-colors">+1 (300) 123-4567</a>
            </li>
            <li>
              <p className="font-semibold text-white">Direct Email:</p>
              <a href="mailto:concierge@giftsngifts.com" className="hover:text-white transition-colors">concierge@giftsngifts.com</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer: Legal & copyright statement */}
      <div className="border-t border-slate-900 py-6 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <div>
            <span>&copy; {new Date().getFullYear()} Gifts n Gifts Present Studio. All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); }} className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); }} className="hover:text-white">Terms of Service</a>
            <span>•</span>
            <a href="#cookies" onClick={(e) => { e.preventDefault(); }} className="hover:text-white">Cookies Settings</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
