import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Heart, 
  Share2, 
  Eye, 
  BookOpen, 
  Sparkles, 
  Sun, 
  Check, 
  Copy, 
  MessageCircle, 
  Tag, 
  ChevronRight,
  Bookmark
} from 'lucide-react';

export default function BlogPostDetailPage({ slug, onNavigate }) {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  useEffect(() => {
    fetchPost();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/blog/posts/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data.post);
        setRelatedPosts(data.relatedPosts || []);
        setLikes(data.post.likes || 0);
      } else {
        setPost(null);
      }
    } catch (err) {
      console.error('Error loading article:', err);
      setPost(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;
    setLikes(prev => prev + 1);
    setHasLiked(true);
    try {
      await fetch(`/api/blog/posts/${slug}/like`, { method: 'POST' });
    } catch (e) {}
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 3000);
    }
  };

  const currentUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post?.title ? `${post.title} — Naani Pickles Heirloom Blog` : 'Naani Pickles Blog');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBF7EF] flex items-center justify-center py-24">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-[#D69A19] border-t-[#8F2024] animate-spin mx-auto" />
          <p className="font-serif text-sm text-[#701B25] font-bold">Unrolling Grandmother's Chronicle...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FBF7EF] py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-[#E9DCC7] shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#F7F1DF] text-[#DF905B] flex items-center justify-center mx-auto text-2xl">
            📜
          </div>
          <h2 className="font-serif text-2xl font-black text-[#701B25]">Article Not Found</h2>
          <p className="text-xs sm:text-sm text-[#62564D] leading-relaxed font-sans">
            The heirloom recipe or courtyard chronicle you are looking for may have been moved or archived.
          </p>
          <button
            onClick={() => onNavigate('/blog')}
            className="px-6 py-2.5 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] text-xs font-bold shadow-md transition-colors"
          >
            ← Return to All Blog Articles
          </button>
        </div>
      </div>
    );
  }

  // Simple Markdown to HTML formatter for rich content
  const renderFormattedContent = (content) => {
    if (!content) return null;

    // Split content by paragraphs/blocks
    const lines = content.split('\n');
    const elements = [];
    let currentKey = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // H2 Heading (## )
      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={currentKey++} className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-[#701B25] mt-8 mb-3 pt-4 border-t border-[#E9DCC7] leading-tight">
            {line.replace('## ', '')}
          </h2>
        );
      }
      // H3 Heading (### )
      else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={currentKey++} className="font-serif text-lg sm:text-xl font-bold text-[#8F2024] mt-6 mb-2 leading-snug">
            {line.replace('### ', '')}
          </h3>
        );
      }
      // Blockquote (> )
      else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={currentKey++} className="my-6 p-4 sm:p-6 rounded-2xl bg-[#F7F1DF] border-l-4 border-[#8F2024] text-[#701B25] font-serif italic text-sm sm:text-base shadow-sm relative">
            <span className="text-3xl text-[#D69A19] font-serif leading-none absolute top-2 left-2 opacity-50">“</span>
            <p className="relative z-10 pl-4">{line.replace('> ', '').replace(/\*/g, '')}</p>
          </blockquote>
        );
      }
      // Unordered list item (- or * )
      else if (line.startsWith('- ') || line.startsWith('* ')) {
        const itemText = line.substring(2);
        elements.push(
          <li key={currentKey++} className="ml-4 pl-2 text-xs sm:text-sm text-[#62564D] leading-relaxed font-sans mb-1.5 list-disc marker:text-[#8F2024]">
            <span dangerouslySetInnerHTML={{ __html: formatInline(itemText) }} />
          </li>
        );
      }
      // Ordered list item (1. 2. etc)
      else if (/^\d+\.\s/.test(line)) {
        const itemText = line.replace(/^\d+\.\s/, '');
        elements.push(
          <li key={currentKey++} className="ml-4 pl-2 text-xs sm:text-sm text-[#62564D] leading-relaxed font-sans mb-1.5 list-decimal marker:text-[#D69A19] marker:font-bold">
            <span dangerouslySetInnerHTML={{ __html: formatInline(itemText) }} />
          </li>
        );
      }
      // Horizontal rule (---)
      else if (line.trim() === '---') {
        elements.push(<hr key={currentKey++} className="my-8 border-[#E9DCC7]" />);
      }
      // Empty line
      else if (line.trim() === '') {
        continue;
      }
      // Normal paragraph
      else {
        elements.push(
          <p key={currentKey++} className="text-xs sm:text-base text-[#62564D] leading-relaxed font-sans mb-4">
            <span dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
          </p>
        );
      }
    }

    return elements;
  };

  // Helper for bold and italic markdown tags
  const formatInline = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  };

  return (
    <div className="min-h-screen bg-[#FBF7EF] text-[#62564D] pb-24">
      
      {/* 1. Sticky Breadcrumb Navigation Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-[#FFFCF6]/95 backdrop-blur-md border-b border-[#E9DCC7] py-2.5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 min-w-0">
          <nav className="flex items-center gap-1.5 text-xs text-[#806F60] min-w-0 overflow-hidden">
            <button 
              onClick={() => onNavigate('/')}
              className="hover:text-[#701B25] transition-colors shrink-0"
            >
              Home
            </button>
            <span className="shrink-0">/</span>
            <button 
              onClick={() => onNavigate('/blog')}
              className="hover:text-[#701B25] transition-colors shrink-0"
            >
              Blog
            </button>
            <span className="shrink-0">/</span>
            <span className="text-[#701B25] font-bold truncate">
              {post.title}
            </span>
          </nav>

          <button
            onClick={() => onNavigate('/blog')}
            className="shrink-0 text-xs font-bold text-[#701B25] hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">All Articles</span>
          </button>
        </div>
      </div>

      {/* 2. Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-4">
        
        {/* Category & Meta Pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="bg-[#8F2024] text-[#FFF8E9] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {post.category}
          </span>
          <span className="text-[#E9DCC7]">•</span>
          <span className="text-[#806F60] flex items-center gap-1 text-[11px] sm:text-xs">
            <Clock className="w-3.5 h-3.5 text-[#D69A19]" />
            {post.readTime}
          </span>
          <span className="text-[#E9DCC7]">•</span>
          <span className="text-[#806F60] flex items-center gap-1 text-[11px] sm:text-xs">
            <Calendar className="w-3.5 h-3.5 text-[#D69A19]" />
            {post.publishedAt}
          </span>
          <span className="text-[#E9DCC7]">•</span>
          <span className="text-[#806F60] flex items-center gap-1 text-[11px] sm:text-xs">
            <Eye className="w-3.5 h-3.5 text-[#806F60]" />
            {post.views || 1} Reads
          </span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#701B25] tracking-tight leading-[1.18]">
          {post.title}
        </h1>

        {/* Hindi Subtitle */}
        {post.hindiTitle && (
          <p className="font-serif italic text-base sm:text-xl text-[#DF905B]">
            {post.hindiTitle}
          </p>
        )}

        {/* Author Bio Row */}
        <div className="pt-2 pb-4 border-b border-[#E9DCC7] flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={post.authorImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"}
              alt={post.author}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#D69A19] shadow-sm"
            />
            <div>
              <span className="text-sm font-bold text-[#701B25] block leading-tight">
                {post.author}
              </span>
              <span className="text-xs text-[#806F60]">
                {post.authorRole || "Head Recipe Curator • Estd. 1964"}
              </span>
            </div>
          </div>

          {/* Social Share Buttons Header */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-[#806F60] mr-1 hidden sm:inline">Share:</span>
            
            {/* WhatsApp */}
            <a 
              href={`https://api.whatsapp.com/send?text=${shareTitle}%20${currentUrl}`}
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-full bg-[#285331]/10 text-[#285331] hover:bg-[#285331]/20 transition-colors"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Twitter/X */}
            <a 
              href={`https://twitter.com/intent/tweet?text=${shareTitle}&url=${currentUrl}`}
              target="_blank" 
              rel="noreferrer"
              className="p-2 rounded-full bg-[#F7F1DF] text-[#701B25] hover:bg-[#ebdaba] transition-colors"
              title="Share on X"
            >
              <Share2 className="w-4 h-4" />
            </a>

            {/* Copy Link */}
            <button 
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-[#F7F1DF] text-[#701B25] hover:bg-[#ebdaba] transition-colors relative"
              title="Copy Article Link"
            >
              {showCopiedToast ? <Check className="w-4 h-4 text-[#285331]" /> : <Copy className="w-4 h-4" />}
            </button>
            {showCopiedToast && (
              <span className="text-[10px] text-[#285331] font-bold ml-1">Copied!</span>
            )}
          </div>
        </div>

      </header>

      {/* 3. Featured Hero Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 my-6">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E9DCC7] bg-stone-900">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#F7F1DF]">
            <span className="italic font-serif text-[11px] sm:text-xs">
              📸 Naani Pickles 1964 Heritage Courtyard Archive
            </span>
            <span className="bg-black/50 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px]">
              Varanasi, UP
            </span>
          </div>
        </div>
      </div>

      {/* 4. Main Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 text-[#62564D]">
        
        {/* Lead Excerpt */}
        <div className="p-4 sm:p-5 bg-[#F7F1DF] rounded-2xl border border-[#E9DCC7] mb-8">
          <p className="font-serif text-base sm:text-lg text-[#701B25] font-medium leading-relaxed italic">
            "{post.excerpt}"
          </p>
        </div>

        {/* Rich Body Content */}
        <div className="prose prose-stone max-w-none">
          {renderFormattedContent(post.content)}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-[#E9DCC7] flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#806F60] uppercase flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#DF905B]" /> Tags:
            </span>
            {post.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="bg-white px-3 py-1 rounded-full text-xs font-medium text-[#62564D] border border-[#E9DCC7] hover:border-[#D69A19]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 5. Article Claps / Like Action & Social Share Bar */}
        <div className="my-10 p-6 rounded-3xl bg-[#F7F1DF] border-2 border-[#D69A19] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <button
              onClick={handleLike}
              className={`p-3 rounded-2xl flex items-center gap-2 font-bold text-xs sm:text-sm shadow-sm transition-all transform active:scale-95 ${
                hasLiked 
                  ? 'bg-[#8F2024] text-[#FFF8E9]' 
                  : 'bg-white hover:bg-[#F7F1DF] text-[#701B25] border border-[#D69A19]'
              }`}
            >
              <Heart className={`w-5 h-5 ${hasLiked ? 'fill-white' : ''}`} />
              <span>{hasLiked ? 'Liked! (धन्यवाद)' : 'Applaud This Story'}</span>
              <span className="bg-[#E5AC28] text-[#701B25] px-2 py-0.5 rounded-full text-xs font-black">
                {likes}
              </span>
            </button>
            <span className="text-xs text-[#806F60] hidden sm:inline">
              Give love to Badi Amma's kitchen team
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F7F1DF] text-[#62564D] text-xs font-bold border border-[#E9DCC7] flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-[#DF905B]" />
              <span>{showCopiedToast ? 'Link Copied!' : 'Copy Link'}</span>
            </button>

            <a 
              href={`https://api.whatsapp.com/send?text=${shareTitle}%20${currentUrl}`}
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2.5 rounded-full bg-[#285331] hover:bg-[#1f4126] text-[#FFF8E9] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </article>

      {/* 6. Related Articles Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 border-t border-[#E9DCC7] mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-serif text-xl sm:text-2xl font-black text-[#701B25] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D69A19]" />
              <span>More Stories from Grandma's Kitchen</span>
            </h3>
            <button
              onClick={() => onNavigate('/blog')}
              className="text-xs font-bold text-[#8F2024] hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {relatedPosts.map((rel) => (
              <div 
                key={rel.id}
                onClick={() => onNavigate(`/blog/${rel.slug}`)}
                className="group cursor-pointer bg-white rounded-2xl border border-[#E9DCC7] p-3 shadow-sm hover:shadow-lg hover:border-[#D69A19] transition-all space-y-2"
              >
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-100">
                  <img 
                    src={rel.featuredImage} 
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <span className="absolute top-2 left-2 bg-[#8F2024]/90 backdrop-blur-sm text-[#FFF8E9] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                    {rel.category}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#701B25] group-hover:text-[#8F2024] transition-colors line-clamp-2 leading-snug">
                  {rel.title}
                </h4>
                <div className="flex items-center justify-between text-[10px] text-[#806F60] pt-1">
                  <span>{rel.publishedAt}</span>
                  <span className="text-[#8F2024] font-bold">Read →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Bottom Back Navigation */}
      <div className="text-center mt-12">
        <button
          onClick={() => onNavigate('/blog')}
          className="px-6 py-3 rounded-full bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] text-xs font-bold border border-[#D69A19] shadow-sm transition-all inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Heirloom Chronicles</span>
        </button>
      </div>

    </div>
  );
}
