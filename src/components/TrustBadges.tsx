import { Compass, ShieldCheck, Heart, Gift } from 'lucide-react';
import { motion } from 'motion/react';

export default function TrustBadges() {
  const badges = [
    {
      icon: Compass,
      title: 'Fast Premium Delivery',
      desc: 'Get your personalized gifts hand-dispatched fast.',
    },
    {
      icon: ShieldCheck,
      title: '100% Secure Checkout',
      desc: 'Fully encrypted transactions for your absolute peace of mind.',
    },
    {
      icon: Heart,
      title: 'Hassle-Free Returns',
      desc: 'A simple 14-day refund window for total gifting confidence.',
    },
    {
      icon: Gift,
      title: '24/7 Gifting Support',
      desc: 'Chat or talk live to certified advisors at any time.',
    },
  ];

  return (
    <section id="trust-badges" className="bg-[#fdfaf8] border-y border-red-50/50 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={idx}
                id={`trust-badge-card-${idx}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center p-6 sm:p-8 bg-white rounded-[32px] border border-red-100/20 shadow-xs hover:shadow-lg hover:shadow-red-950/3 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border border-red-100/30 mb-5 text-red-600 transition-transform duration-300 shadow-inner">
                  <Icon className="w-7 h-7 text-red-600" />
                </div>
                <h4 className="text-slate-800 text-sm sm:text-base font-extrabold tracking-tight mb-2">{badge.title}</h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-500 max-w-[240px]">{badge.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
