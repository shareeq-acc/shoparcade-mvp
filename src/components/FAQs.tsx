import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, PhoneCall, Check } from 'lucide-react';
import { faqs } from '../data';

export default function FAQs() {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [showSupportInfo, setShowSupportInfo] = useState(false);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 bg-[#fdfaf8] font-sans border-b border-rose-50/20" id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-rose-500 uppercase tracking-widest bg-rose-50/50 px-3.5 py-1.5 rounded-full border border-rose-100/30">
            Answers &amp; Support
          </span>
          <h2 className="text-3xl font-serif font-black text-slate-800 mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-1 bg-rose-400 mx-auto mt-4 rounded-full"></div>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about our signature handwritten card process, rush same-day shipping, and custom wrapping configurations.
          </p>
        </div>

        {/* FAQs Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'border-rose-300 bg-rose-50/10 shadow-xs' 
                    : 'border-rose-100/30 bg-white hover:border-rose-200 hover:shadow-xs'
                }`}
                id={`faq-block-${faq.id}`}
              >
                {/* Accordion Toggle Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                  id={`faq-toggle-btn-${faq.id}`}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${
                      isOpen ? 'text-rose-500' : 'text-slate-400'
                    }`} />
                    <span className={`text-sm md:text-base font-bold transition-colors ${
                      isOpen ? 'text-slate-900 font-extrabold' : 'text-slate-700'
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Rotating Chevron */}
                  <div className={`p-1.5 rounded-full transition-colors ${
                    isOpen ? 'bg-rose-500 text-white' : 'bg-rose-50/50 text-rose-500 border border-rose-100/30'
                  }`}>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen 
                      ? 'max-h-[500px] border-t border-rose-100/20 p-5 bg-white' 
                      : 'max-h-0'
                  }`}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live helper trust footer with interactive reveal instead of raw alert */}
        <div className="mt-10 flex flex-col gap-4">
          <div className="text-center bg-rose-50/30 border border-rose-100/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-xs text-slate-500 font-semibold">Have any other custom gifting inquiries?</span>
            <button
              onClick={() => setShowSupportInfo(!showSupportInfo)}
              className="text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-1.5 rounded-full transition-all cursor-pointer"
            >
              {showSupportInfo ? "Hide Contact details" : "Chat with a Gifting Expert"}
            </button>
          </div>

          {showSupportInfo && (
            <div className="bg-white border border-rose-100/30 rounded-2xl p-6 text-center shadow-xs animate-in slide-in-from-top-3 duration-200">
              <PhoneCall className="w-8 h-8 text-rose-500 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800">Support Desk Operational 24/7</h4>
              <p className="text-xs text-slate-500 mt-1">
                You can reach our lead concierge directly at <span className="text-rose-500 font-black">+1 (300) 123-4567</span> or via live email at <span className="text-slate-800 underline">concierge@bloomandbox.com</span>. We typically respond to custom wrapping requests within 5 minutes!
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
