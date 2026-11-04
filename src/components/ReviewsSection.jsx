import React, { useState, useEffect } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquare, 
  Plus, 
  X, 
  MapPin, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    location: '',
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {}
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setReviews([data.review, ...reviews]);
        setShowWriteModal(false);
        setNewReview({ userName: '', location: '', rating: 5, comment: '' });
      }
    } catch (err) {
      alert('Error submitting review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reviews-wall" className="py-20 bg-[#FBF7EF] border-b border-[#E9DCC7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F1DF] text-[#701B25] text-xs font-bold uppercase tracking-wider border border-[#E9DCC7]">
              <Sparkles className="w-3.5 h-3.5 text-[#D69A19]" />
              Voices of Nostalgia
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#701B25] tracking-tight">
              Loved by 28,400+ Dining Tables Across India
            </h2>
            <p className="text-xs sm:text-sm text-[#62564D] max-w-xl">
              Authentic stories from food lovers, diaspora families, and grandchildren who missed the irreplaceable taste of home.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="text-2xl font-black text-[#701B25] flex items-center justify-end gap-1">
                <span>4.96</span>
                <span className="text-[#D69A19] text-lg">★</span>
              </div>
              <div className="text-xs text-[#806F60]">Based on verified orders</div>
            </div>

            <button
              onClick={() => setShowWriteModal(true)}
              className="px-5 py-2.5 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] font-bold text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" /> Share Your Story
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div 
              key={rev.id} 
              className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#E9DCC7] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D69A19] text-sm">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-[11px] text-[#806F60]">{rev.date}</span>
                </div>

                <p className="font-serif italic text-[#62564D] text-xs sm:text-sm leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E9DCC7] flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-[#701B25] flex items-center gap-1">
                    <span>{rev.userName}</span>
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#285331]" title="Verified Customer" />
                    )}
                  </div>
                  <div className="text-[11px] text-[#806F60] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#806F60]" />
                    <span>{rev.location}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setReviews(reviews.map(r => r.id === rev.id ? { ...r, likes: (r.likes || 0) + 1 } : r));
                  }}
                  className="flex items-center gap-1 text-[11px] text-[#806F60] hover:text-[#701B25] transition-colors p-1"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{rev.likes || 1}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write a Review Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in">
          <div className="relative bg-[#FBF7EF] rounded-3xl max-w-md w-full border border-[#E9DCC7] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E9DCC7] pb-3">
              <h4 className="font-serif font-black text-lg text-[#701B25]">
                Write a Taste Review
              </h4>
              <button 
                onClick={() => setShowWriteModal(false)}
                className="p-1 rounded-full text-[#806F60] hover:text-[#701B25]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostReview} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#62564D] block mb-1">Your Full Name *</label>
                <input 
                  type="text" 
                  required
                  value={newReview.userName}
                  onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                  placeholder="e.g. Shalini Verma"
                  className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                />
              </div>

              <div>
                <label className="font-bold text-[#62564D] block mb-1">Your City / State *</label>
                <input 
                  type="text" 
                  required
                  value={newReview.location}
                  onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                  placeholder="e.g. Pune, Maharashtra"
                  className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                />
              </div>

              <div>
                <label className="font-bold text-[#62564D] block mb-1">Rating *</label>
                <div className="flex gap-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      className={`px-3 py-1 rounded-lg border text-xs font-bold ${
                        newReview.rating === star ? 'bg-[#8F2024] text-[#FFF8E9] border-[#8F2024]' : 'bg-white text-[#62564D] border-[#E9DCC7]'
                      }`}
                    >
                      {star} ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#62564D] block mb-1">Your Review & Nostalgia Story *</label>
                <textarea 
                  required
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Tell us which pickle you tried and how it tasted with your meals..."
                  className="w-full p-2.5 rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] font-bold text-xs shadow-md transition-all"
                >
                  {isSubmitting ? 'Posting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
