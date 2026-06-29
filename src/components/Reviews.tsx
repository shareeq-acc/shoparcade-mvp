import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ShieldCheck, 
  Heart, 
  Search, 
  Plus, 
  X, 
  ThumbsUp, 
  Check, 
  MessageSquare,
  Award,
  Sparkles
} from 'lucide-react';
import { reviews as initialReviews } from '../data';
import { Review } from '../types';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=120',
];

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    return initialReviews;
  });

  // Track interactive like/helpful counts for each review ID
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({
    'rev-1': 14,
    'rev-2': 8,
    'rev-3': 5,
  });
  
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Filter & search states
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  // Form states
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newAvatar, setNewAvatar] = useState(PRESET_AVATARS[0]);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);

  const handleHelpfulClick = (reviewId: string) => {
    if (likedReviews[reviewId]) {
      // Unlike
      setHelpfulCounts(prev => ({ ...prev, [reviewId]: Math.max(0, (prev[reviewId] || 0) - 1) }));
      setLikedReviews(prev => ({ ...prev, [reviewId]: false }));
    } else {
      // Like
      setHelpfulCounts(prev => ({ ...prev, [reviewId]: (prev[reviewId] || 0) + 1 }));
      setLikedReviews(prev => ({ ...prev, [reviewId]: true }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newComment.trim()) return;

    const newReviewItem: Review = {
      id: `custom-rev-${Date.now()}`,
      name: newName,
      location: newLocation.trim() || 'Pakistan',
      rating: newRating,
      comment: newComment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      avatar: newAvatar,
    };

    setReviewsList(prev => [newReviewItem, ...prev]);
    setIsSuccessSubmitted(true);

    // Reset Form values
    setTimeout(() => {
      setIsSuccessSubmitted(false);
      setIsWriteOpen(false);
      setNewName('');
      setNewLocation('');
      setNewComment('');
      setNewRating(5);
    }, 2500);
  };

  // Filter list
  const filteredReviews = reviewsList.filter(review => {
    const matchesRating = selectedRatingFilter === 'all' || review.rating === selectedRatingFilter;
    const matchesSearch = review.comment.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          review.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#fdfaf8] font-sans border-b border-rose-100/30" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-full border border-red-100/40 shadow-xs">
            <Heart className="w-3 h-3 fill-current text-red-500 animate-pulse" />
            <span>Heartfelt Stories</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-800 mt-4 tracking-tight">
            Loved by 5,000+ Gift Givers
          </h2>
          <div className="w-12 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
          <p className="text-sm md:text-base text-slate-500 mt-4 leading-relaxed">
            See how our premium wrapping paper, hand-crafted gift sets, and custom handwritten letters have touched the hearts of loved ones nationwide.
          </p>
        </div>

        {/* Dynamic statistics trust bar */}
        <div className="bg-white/90 backdrop-blur-md border border-red-100/20 rounded-3xl p-8 shadow-md shadow-red-950/2 flex flex-col md:flex-row justify-around items-center gap-8 mb-12">
          <div className="text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-3xl font-serif font-black text-red-600">99.4%</span>
            <p className="text-[11px] text-slate-500 font-extrabold uppercase mt-1 tracking-wider">On-Time Surprise Delivery</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-red-100/60" />
          <div className="text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-3xl font-serif font-black text-red-600">4.9 / 5</span>
            <p className="text-[11px] text-slate-500 font-extrabold uppercase mt-1 tracking-wider">Average Customer Rating</p>
          </div>
          <div className="hidden md:block w-px h-12 bg-red-100/60" />
          <div className="text-center flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600 mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-3xl font-serif font-black text-red-600">120k+</span>
            <p className="text-[11px] text-slate-500 font-extrabold uppercase mt-1 tracking-wider">Happy Moments Created</p>
          </div>
        </div>

        {/* Filters and CTA Header */}
        <div className="flex justify-center items-center gap-4 mb-8 bg-[#fffcfb] p-4 rounded-2xl border border-red-100/30">
          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center items-center gap-2">
            <button
              onClick={() => setSelectedRatingFilter('all')}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                selectedRatingFilter === 'all'
                  ? 'bg-red-600 text-white shadow-md shadow-red-200'
                  : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              All Reviews ({reviewsList.length})
            </button>
            <button
              onClick={() => setSelectedRatingFilter(5)}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedRatingFilter === 5
                  ? 'bg-red-600 text-white shadow-md shadow-red-200'
                  : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              5 Star ({reviewsList.filter(r => r.rating === 5).length})
            </button>
            <button
              onClick={() => setSelectedRatingFilter(4)}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedRatingFilter === 4
                  ? 'bg-red-600 text-white shadow-md shadow-red-200'
                  : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
              4 Star ({reviewsList.filter(r => r.rating === 4).length})
            </button>
          </div>
        </div>

        {/* WRITER DRAWER / COLLAPSIBLE FORM CONTAINER */}
        <AnimatePresence>
          {isWriteOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden mb-10"
            >
              <div className="bg-gradient-to-tr from-[#fffbfb] to-[#fffefd] border-2 border-dashed border-red-100/70 rounded-3xl p-6 md:p-8 text-left shadow-lg">
                <AnimatePresence mode="wait">
                  {isSuccessSubmitted ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4 border border-green-200">
                        <Check className="w-8 h-8 stroke-[3px]" />
                      </div>
                      <h3 className="font-serif font-black text-xl text-slate-800">Review Submitted!</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Thank you for sharing your beautiful gifting story! Your review is now live in our store.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      onSubmit={handleFormSubmit}
                      className="space-y-5"
                    >
                      <div>
                        <h3 className="text-lg font-serif font-black text-slate-800">Share Your Happy Moment</h3>
                        <p className="text-[11px] text-slate-500">Your genuine review inspires more people to surprise their loved ones!</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Rating Input */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700">Your Rating *</label>
                          <div className="flex items-center gap-1 bg-white border border-slate-100 p-2.5 rounded-xl w-fit">
                            {[1, 2, 3, 4, 5].map((starValue) => (
                              <button
                                type="button"
                                key={starValue}
                                onClick={() => setNewRating(starValue)}
                                className="p-0.5 transition-transform hover:scale-115 cursor-pointer"
                              >
                                <Star 
                                  className={`w-6 h-6 ${
                                    starValue <= newRating 
                                      ? 'text-amber-400 fill-current' 
                                      : 'text-slate-200 hover:text-amber-300'
                                  }`} 
                                />
                              </button>
                            ))}
                            <span className="text-xs font-bold text-slate-500 ml-2">
                              {newRating === 5 ? 'Excellent!' : newRating === 4 ? 'Very Good' : newRating === 3 ? 'Good' : 'Average'}
                            </span>
                          </div>
                        </div>

                        {/* Avatar Picker */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-slate-700">Choose Profile Picture</label>
                          <div className="flex items-center gap-3">
                            {PRESET_AVATARS.map((avatarUrl, index) => (
                              <button
                                type="button"
                                key={index}
                                onClick={() => setNewAvatar(avatarUrl)}
                                className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all relative cursor-pointer ${
                                  newAvatar === avatarUrl 
                                    ? 'border-red-600 scale-110 shadow-md' 
                                    : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img src={avatarUrl} alt="Avatar option" className="w-full h-full object-cover" />
                                {newAvatar === avatarUrl && (
                                  <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white font-black stroke-[3px]" />
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name Input */}
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-700">Your Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ayesha Malik"
                            className="w-full text-xs bg-white border border-slate-100 rounded-xl p-3 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                          />
                        </div>

                        {/* Location Input */}
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-700">Your Location</label>
                          <input
                            type="text"
                            placeholder="e.g. Islamabad"
                            className="w-full text-xs bg-white border border-slate-100 rounded-xl p-3 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Comment Input */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-700">Your Gifting Story *</label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Tell us about the occasion, how was the flower wrap, the packaging, or the recipient's surprise reaction!"
                          className="w-full text-xs bg-white border border-slate-100 rounded-xl p-3 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100 text-slate-800 placeholder-slate-400"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold py-3 rounded-xl shadow-md transition-all hover:scale-101 active:scale-99 cursor-pointer uppercase tracking-wider"
                      >
                        Submit Live Story
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Carousel Wrapper with Faded Sides */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-3xl">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-500">No reviews found matching that criteria.</p>
            <button
              onClick={() => { setSelectedRatingFilter('all'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-red-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden py-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 reviews-marquee-container">
            {/* Custom Keyframe Styles for Infinite Marquee */}
            <style>{`
              @keyframes marquee-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .reviews-marquee-container {
                -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
                mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
              }
              .reviews-marquee-track {
                display: flex;
                gap: 1.5rem;
                width: max-content;
                animation: marquee-scroll 55s linear infinite;
              }
              .reviews-marquee-track:hover {
                animation-play-state: paused;
              }
            `}</style>

            {/* Infinite Scrolling Track */}
            <div className="reviews-marquee-track py-2">
              {/* Combine multiple iterations to guarantee a continuous fluid loop */}
              {[...filteredReviews, ...filteredReviews, ...filteredReviews].map((review, idx) => {
                const isLiked = likedReviews[review.id];
                const helpfulCount = helpfulCounts[review.id] || 0;
                
                return (
                  <div
                    key={`${review.id}-${idx}`}
                    className="bg-white border border-red-100/20 rounded-3xl p-6 relative hover:shadow-xl hover:shadow-red-950/2 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group w-[290px] sm:w-[360px] shrink-0 text-left"
                    id={`review-card-${review.id}-${idx}`}
                  >
                    {/* Giant Decorative red Colored Quotes */}
                    <span className="absolute top-4 right-6 text-6xl font-serif text-red-600 opacity-5 select-none transition-opacity group-hover:opacity-10">
                      &ldquo;
                    </span>

                    {/* Message Details */}
                    <div>
                      {/* Stars */}
                      <div className="flex items-center gap-0.5 mb-4">
                        {[...Array(5)].map((_, index) => (
                          <Star 
                            key={index} 
                            className={`w-4 h-4 ${
                              index < review.rating 
                                ? 'text-amber-400 fill-current' 
                                : 'text-slate-200'
                            }`} 
                          />
                        ))}
                      </div>

                      {/* Comment Text */}
                      <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-6 font-medium text-left line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    </div>

                    {/* Reviewer Meta info block */}
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-50/80 mt-auto">
                      {/* Avatar */}
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-9 h-9 object-cover rounded-full border border-red-50 shadow-xs"
                        referrerPolicy="no-referrer"
                      />

                      <div className="text-left">
                        <div className="flex items-center gap-1">
                          <h4 className="font-bold text-slate-800 text-xs">{review.name}</h4>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 fill-emerald-50" title="Verified Buyer" />
                        </div>
                        <div className="flex items-center gap-1 text-[9px] text-slate-400 font-bold mt-0.5">
                          <span>{review.location}</span>
                          <span>•</span>
                          <span>{review.date}</span>
                        </div>
                      </div>

                      {/* Interactive Helpfulness Counter Button */}
                      <button
                        onClick={() => handleHelpfulClick(review.id)}
                        className={`ml-auto flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-extrabold transition-all cursor-pointer ${
                          isLiked 
                            ? 'bg-red-50 text-red-600 scale-105 border border-red-100'
                            : 'bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600'
                        }`}
                        title="Was this review helpful?"
                      >
                        <ThumbsUp className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{helpfulCount > 0 ? helpfulCount : ''}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
