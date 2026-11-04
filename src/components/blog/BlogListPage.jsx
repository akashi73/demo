import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Sparkles, 
  Sun, 
  Flame, 
  Heart, 
  Tag, 
  Eye, 
  ChevronRight,
  Filter,
  RefreshCw,
  SlidersHorizontal,
  Mail,
  Check
} from 'lucide-react';

export default function BlogListPage({ onNavigate }) {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Fetch published posts and categories
  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    setIsLoading(true);
    try {
      const [postsRes, catsRes] = await Promise.all([
        fetch('/api/blog/posts').then(r => r.json()),
        fetch('/api/blog/categories').then(r => r.json())
      ]);

      if (postsRes && postsRes.posts) {
        setPosts(postsRes.posts);
      }
      if (catsRes) {
        setCategories(catsRes);
      }
    } catch (err) {
      console.error('Error fetching blog data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter posts by category and search
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = activeCategory === 'All' || 
        post.category?.toLowerCase() === activeCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        post.title?.toLowerCase().includes(query) ||
        post.hindiTitle?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.author?.toLowerCase().includes(query) ||
        (Array.isArray(post.tags) && post.tags.some(t => t.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  // Featured post: find first post with isFeatured = true, or first post in list
  const featuredPost = useMemo(() => {
    if (searchQuery.trim() || activeCategory !== 'All') return null; // hide hero when searching/filtering
    return posts.find(p => p.isFeatured) || posts[0] || null;
  }, [posts, searchQuery, activeCategory]);

  // Regular grid posts: exclude featured post if featured post is shown
  const gridPosts = useMemo(() => {
    if (featuredPost && !searchQuery.trim() && activeCategory === 'All') {
      return filteredPosts.filter(p => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, featuredPost, searchQuery, activeCategory]);

  const visiblePosts = gridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < gridPosts.length;

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newsletterEmail })
    });
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setNewsletterSubscribed(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FBF7EF] text-[#62564D] pb-20">
      
      {/* 1. Heritage Blog Header Banner */}
      <section className="relative overflow-hidden bg-[#F7F1DF] border-b border-[#E9DCC7] pt-8 pb-12 sm:pt-12 sm:pb-16 px-4">
        {/* Subtle Decorative Ambient Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#D69A19]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#701B25]/10 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-3">
          
          {/* Breadcrumb Trail */}
          <nav className="inline-flex items-center gap-1.5 text-xs text-[#806F60] font-medium mb-1">
            <button 
              onClick={() => onNavigate('/')}
              className="hover:text-[#701B25] transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-[#701B25] font-bold">Heirloom Chronicle & Recipes</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFCF6] text-[#701B25] text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-[#E9DCC7]">
            <BookOpen className="w-3.5 h-3.5 text-[#D69A19]" />
            <span>रसोई और धूप की कहानियाँ • Naani's Journal</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-[#701B25] tracking-tight leading-tight">
            Heirloom Kitchen Chronicle
          </h1>

          <p className="font-serif text-sm sm:text-base text-[#DF905B] italic">
            "स्वाद की विरासत, धूप के नुस्खे, और दादी-नानी का दुलार"
          </p>

          <p className="text-xs sm:text-sm text-[#62564D] max-w-2xl mx-auto font-sans leading-relaxed">
            Step inside our 1964 courtyard. Read authentic small-batch pickle recipes, Ayurvedic digestive wisdom, the science of ceramic barni curing, and heartwarming stories of Indian family culinary heritage.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-full border-2 border-[#E9DCC7] shadow-md focus-within:border-[#8F2024] focus-within:ring-2 focus-within:ring-[#F7F1DF] transition-all p-1">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#D69A19] ml-3 shrink-0" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, recipes, ingredients, spices..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-transparent focus:outline-none text-[#62564D] placeholder-[#806F60] font-sans"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-1 mr-1 text-[#806F60] hover:text-[#701B25] text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-6 sm:mt-10">
        
        {/* 2. Category Filter Pills */}
        <div className="w-full overflow-x-auto no-scrollbar pb-3 border-b border-[#E9DCC7] mb-8">
          <div className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap min-w-max">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                activeCategory === 'All'
                  ? 'bg-[#8F2024] text-[#FFF8E9] shadow-md'
                  : 'bg-white hover:bg-[#F7F1DF] text-[#62564D] border border-[#E9DCC7]'
              }`}
            >
              <span>All Stories</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeCategory === 'All' ? 'bg-[#E5AC28] text-[#701B25]' : 'bg-[#F7F1DF] text-[#806F60]'
              }`}>
                {posts.length}
              </span>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                  activeCategory.toLowerCase() === cat.name.toLowerCase()
                    ? 'bg-[#8F2024] text-[#FFF8E9] shadow-md'
                    : 'bg-white hover:bg-[#F7F1DF] text-[#62564D] border border-[#E9DCC7]'
                }`}
              >
                <span>{cat.name}</span>
                {cat.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeCategory.toLowerCase() === cat.name.toLowerCase()
                      ? 'bg-[#E5AC28] text-[#701B25]' 
                      : 'bg-[#F7F1DF] text-[#806F60]'
                  }`}>
                    {cat.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Featured / Highlighted Article Hero */}
        {featuredPost && (
          <div className="mb-10 sm:mb-14">
            <div 
              onClick={() => onNavigate(`/blog/${featuredPost.slug}`)}
              className="group cursor-pointer bg-[#FFFFFF] rounded-3xl border-2 border-[#E9DCC7] shadow-xl hover:shadow-2xl hover:border-[#D69A19] transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Left Large Visual */}
              <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto overflow-hidden bg-stone-900">
                <img 
                  src={featuredPost.featuredImage} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                <div className="absolute top-3 left-3 bg-[#8F2024] text-[#FFF8E9] text-xs font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#D69A19]" />
                  <span>★ Featured Chronicle</span>
                </div>
              </div>

              {/* Right Content Column */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#F7F1DF] text-[#701B25] text-xs font-bold px-2.5 py-0.5 rounded-full border border-[#E9DCC7]">
                      {featuredPost.category}
                    </span>
                    <span className="text-[#806F60] text-xs">•</span>
                    <span className="text-xs text-[#806F60] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#D69A19]" />
                      {featuredPost.readTime}
                    </span>
                    <span className="text-[#806F60] text-xs">•</span>
                    <span className="text-xs text-[#806F60] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#D69A19]" />
                      {featuredPost.publishedAt}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#701B25] group-hover:text-[#8F2024] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  {featuredPost.hindiTitle && (
                    <p className="text-xs sm:text-sm font-serif italic text-[#DF905B]">
                      {featuredPost.hindiTitle}
                    </p>
                  )}

                  <p className="text-xs sm:text-sm text-[#62564D] leading-relaxed font-sans line-clamp-3 sm:line-clamp-4">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E9DCC7] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={featuredPost.authorImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"}
                      alt={featuredPost.author} 
                      className="w-8 h-8 rounded-full object-cover border border-[#E9DCC7]"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#701B25] block leading-none">
                        {featuredPost.author}
                      </span>
                      <span className="text-[10px] text-[#806F60]">
                        {featuredPost.authorRole}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#8F2024] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Chronicle <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* 4. Section Title for Grid */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="font-serif text-lg sm:text-2xl font-black text-[#701B25] flex items-center gap-2">
            <span>{activeCategory === 'All' ? 'Latest Heritage Articles' : `${activeCategory} Stories`}</span>
            <span className="text-xs font-sans text-[#806F60] font-semibold">({filteredPosts.length})</span>
          </h3>
          {searchQuery && (
            <span className="text-xs text-[#806F60]">
              Filtering by: <strong className="text-[#701B25]">"{searchQuery}"</strong>
            </span>
          )}
        </div>

        {/* 5. Responsive Posts Grid: 2 columns on mobile, 2–3 on tablets, 3 on desktop */}
        {visiblePosts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {visiblePosts.map((post) => (
              <article 
                key={post.id}
                onClick={() => onNavigate(`/blog/${post.slug}`)}
                className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl border border-[#E9DCC7] shadow-sm hover:shadow-xl hover:border-[#D69A19] transition-all duration-300 flex flex-col overflow-hidden h-full"
              >
                {/* Card Thumbnail Image */}
                <div className="relative aspect-square sm:aspect-[16/10] bg-[#F7F1DF] overflow-hidden">
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="bg-[#8F2024]/95 text-[#FFF8E9] text-[8px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md uppercase tracking-wider backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Read Time Pill */}
                  <div className="absolute bottom-2 right-2 bg-[#701B25]/85 backdrop-blur-sm text-[#FFF8E9] text-[8px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#D69A19]/30">
                    <Clock className="w-2.5 h-2.5 text-[#D69A19]" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3 sm:p-5 flex flex-col justify-between flex-grow space-y-2 sm:space-y-3">
                  <div className="space-y-1.5 sm:space-y-2">
                    
                    {/* Date and Author Icon */}
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[#806F60]">
                      <Calendar className="w-3 h-3 text-[#D69A19] shrink-0" />
                      <span>{post.publishedAt}</span>
                      <span className="text-[#E9DCC7]">•</span>
                      <span className="truncate">{post.author}</span>
                    </div>

                    {/* Title */}
                    <h4 className="font-serif text-sm sm:text-lg font-bold text-[#701B25] group-hover:text-[#8F2024] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h4>

                    {/* Hindi Subtitle if available */}
                    {post.hindiTitle && (
                      <p className="text-[10px] sm:text-xs text-[#DF905B] font-serif italic truncate">
                        {post.hindiTitle}
                      </p>
                    )}

                    {/* Short Description */}
                    <p className="text-[11px] sm:text-xs text-[#62564D] line-clamp-2 leading-relaxed font-sans">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-2 border-t border-[#E9DCC7] flex items-center justify-between text-xs font-bold text-[#8F2024] mt-auto">
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Story <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </span>
                    <span className="text-[#806F60] font-normal text-[10px] flex items-center gap-0.5">
                      <Eye className="w-3 h-3" /> {post.views || 0}
                    </span>
                  </div>

                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-[#D69A19] max-w-xl mx-auto my-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F7F1DF] text-[#DF905B] flex items-center justify-center mx-auto text-2xl">
              🏺
            </div>
            <h4 className="font-serif text-xl font-bold text-[#701B25]">
              No Heirloom Articles Found
            </h4>
            <p className="text-xs sm:text-sm text-[#62564D] max-w-md mx-auto leading-relaxed">
              We couldn't find any stories matching your current category filter or search query. Try clearing your filters or exploring our other heritage chronicles.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] text-xs font-bold shadow-md transition-colors"
            >
              Reset Search & Show All Stories
            </button>
          </div>
        )}

        {/* 6. Load More / Pagination Button */}
        {hasMore && (
          <div className="text-center mt-10 sm:mt-14">
            <button
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-7 py-3 rounded-full bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] font-bold text-xs sm:text-sm border-2 border-[#D69A19] shadow-sm hover:shadow transition-all flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4 text-[#DF905B]" />
              <span>Load More Stories (और कहानियाँ)</span>
              <span className="text-[10px] bg-[#8F2024] text-[#FFF8E9] px-2 py-0.5 rounded-full">
                {gridPosts.length - visibleCount} Remaining
              </span>
            </button>
          </div>
        )}

        {/* 7. Newsletter Subscription Banner */}
        <section className="mt-16 sm:mt-24 bg-[#701B25] rounded-3xl p-6 sm:p-12 text-[#FFF8E9] shadow-2xl relative overflow-hidden border border-[#D69A19]/30">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#D69A19]/10 blur-2xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase text-[#D69A19]">
              दादी-नानी की डाक • Badi Amma's Monthly Letter
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black">
              Get Secret Seasonal Pickle Recipes & Courtyard Updates
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F1DF] leading-relaxed font-sans max-w-xl mx-auto">
              Join 12,000+ pickle lovers. We share seasonal harvest alerts, sun-curing schedules, forgotten regional recipes, and early access to limited small-batch jars.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="pt-2 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input 
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full px-4 py-3 rounded-full text-xs text-[#62564D] bg-white placeholder-[#806F60] focus:outline-none focus:ring-2 focus:ring-[#D69A19]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#D69A19] hover:bg-[#E5AC28] text-[#701B25] font-bold text-xs shadow-lg transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5"
              >
                {newsletterSubscribed ? (
                  <>
                    <Check className="w-4 h-4 text-[#285331]" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>Subscribe Free →</span>
                )}
              </button>
            </form>
            <p className="text-[10px] text-[#F7F1DF]/70">
              No spam, ever. Only authentic recipes and seasonal batch blessings.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
