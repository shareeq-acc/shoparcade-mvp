import { useState, FormEvent } from 'react';
import { Mail, CheckCircle, Heart, Sparkles, Send } from 'lucide-react';

export default function FinalCTA() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please input your email address first.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please input a valid email address.');
      return;
    }

    setError('');
    setIsSubscribed(true);
  };

  return (
    <section className="py-16 bg-[#fdfaf8] font-sans border-b border-rose-50/20 relative overflow-hidden" id="final-cta">
      {/* Absolute decorative floating background hearts */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
        <Heart className="absolute top-10 left-[15%] w-12 h-12 text-rose-500 fill-current animate-pulse" />
        <Heart className="absolute bottom-10 right-[15%] w-16 h-16 text-rose-500 fill-current animate-pulse" />
        <Heart className="absolute top-[40%] right-[30%] w-8 h-8 text-rose-500 fill-current" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-850 shadow-slate-950/20">
          
          {/* Inner luxury card background details */}
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left: Headline & Description */}
            <div className="text-left space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black leading-tight">
                Never Miss a Special Celebration Again
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                Subscribe to our premium newsletters to receive 15% off your very first order, plus automated birthday reminder alerts for your closest family.
              </p>
            </div>

            {/* Right: Interactive subscription container */}
            <div className="w-full">
              {isSubscribed ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center animate-in scale-in duration-300">
                  <CheckCircle className="w-10 h-10 text-rose-400 mx-auto mb-3 animate-bounce" />
                  <h3 className="text-base font-bold">You are officially in!</h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto">
                    Check your inbox at <span className="font-bold underline text-white">{email}</span> for your 15% discount code and our free reminders setup dashboard.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubscribed(false);
                      setEmail('');
                    }}
                    className="mt-4 text-[11px] font-bold text-slate-900 bg-white hover:bg-rose-50 px-4 py-1.5 rounded-full transition-all"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 space-y-3">
                    <label htmlFor="cta-email-input" className="block text-xs font-bold text-slate-300">
                      Enter your email address:
                    </label>
                    <div className="flex bg-white rounded-full p-1.5 sm:p-2 border border-rose-100 items-center">
                      <div className="pl-3 flex items-center text-rose-500 shrink-0">
                        <Mail className="w-4 h-4 sm:w-4 sm:h-4" />
                      </div>
                      <input
                        type="email"
                        id="cta-email-input"
                        placeholder="e.g. mom-birthday@email.com"
                        className="w-full text-sm sm:text-base text-gray-800 placeholder-gray-400 bg-transparent outline-none border-none focus:ring-0 px-2 sm:px-3 py-2 sm:py-2.5"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                      />
                      <button
                        type="submit"
                        className="bg-rose-500 hover:bg-rose-600 text-white rounded-full p-2.5 sm:py-2 sm:px-5 flex items-center justify-center gap-1.5 text-xs font-bold hover:scale-103 active:scale-97 transition-all cursor-pointer shrink-0 shadow-sm"
                        id="subscribe-cta-btn"
                      >
                        <span className="hidden sm:inline">Join</span>
                        <Send className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>

                    {error && (
                      <p className="text-[11px] font-semibold text-rose-300 text-left pl-1">
                        ⚠️ {error}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-300">
                    <Heart className="w-3 h-3 text-rose-400 fill-current animate-pulse" />
                    <span>No spam, strictly custom curation. Cancel at any time.</span>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
