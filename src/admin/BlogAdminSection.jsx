import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Check, 
  X, 
  Search, 
  FolderPlus, 
  Image, 
  Copy, 
  ExternalLink, 
  Calendar, 
  Clock, 
  Tag, 
  Sparkles, 
  Save, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  SlidersHorizontal,
  Bold,
  Italic,
  List,
  Quote,
  Heading2,
  Heading3
} from 'lucide-react';

export default function BlogAdminSection({ onNavigateToPost }) {
  const [subTab, setSubTab] = useState('all-posts'); // 'all-posts', 'editor', 'categories', 'media'
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusMessage, setStatusMessage] = useState(null);

  // Post Editor State
  const [editingPostId, setEditingPostId] = useState(null);
  const [editorForm, setEditorForm] = useState({
    title: '',
    hindiTitle: '',
    slug: '',
    category: "Grandma's Kitchen",
    tags: '',
    author: 'Grandmother Shanti Devi',
    authorRole: 'Head Recipe Curator • Estd. 1964',
    authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85',
    excerpt: '',
    content: '',
    status: 'published',
    isFeatured: false
  });
  const [editorPreviewMode, setEditorPreviewMode] = useState(false);
  const [isSavingPost, setIsSavingPost] = useState(false);

  // New Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [isAddingCat, setIsAddingCat] = useState(false);

  // Media Library Upload Form State
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState('Heritage & Courtyard');
  const [isAddingMedia, setIsAddingMedia] = useState(false);
  const [copiedMediaId, setCopiedMediaId] = useState(null);

  useEffect(() => {
    fetchAllBlogAdminData();
  }, []);

  const fetchAllBlogAdminData = async () => {
    setIsLoading(true);
    try {
      const [postsRes, catsRes, mediaRes] = await Promise.all([
        fetch('/api/blog/posts?all=true').then(r => r.json()),
        fetch('/api/blog/categories').then(r => r.json()),
        fetch('/api/blog/media').then(r => r.json())
      ]);

      if (postsRes && postsRes.posts) setPosts(postsRes.posts);
      if (catsRes) setCategories(catsRes);
      if (mediaRes) setMediaList(mediaRes);
    } catch (err) {
      console.error('Error loading blog admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const showStatus = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // ----------------- POST CRUD -----------------
  const handleOpenNewPost = () => {
    setEditingPostId(null);
    setEditorForm({
      title: '',
      hindiTitle: '',
      slug: '',
      category: categories[0]?.name || "Grandma's Kitchen",
      tags: 'Heirloom, Traditional, Sun Cured',
      author: 'Grandmother Shanti Devi',
      authorRole: 'Head Recipe Curator • Estd. 1964',
      authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      featuredImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85',
      excerpt: '',
      content: '## The Sacred Courtyard Heritage\n\nBegin writing your authentic story here...\n\n### Ingredients & Sun Curing\n- Cold-pressed Kachi Ghani mustard oil\n- Sendha rock salt\n- Coarsely cracked yellow rai',
      status: 'published',
      isFeatured: false
    });
    setEditorPreviewMode(false);
    setSubTab('editor');
  };

  const handleOpenEditPost = (post) => {
    setEditingPostId(post.id);
    setEditorForm({
      title: post.title || '',
      hindiTitle: post.hindiTitle || '',
      slug: post.slug || '',
      category: post.category || "Grandma's Kitchen",
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
      author: post.author || 'Grandmother Shanti Devi',
      authorRole: post.authorRole || 'Head Recipe Curator • Estd. 1964',
      authorImage: post.authorImage || '',
      featuredImage: post.featuredImage || '',
      excerpt: post.excerpt || '',
      content: post.content || '',
      status: post.status || 'published',
      isFeatured: !!post.isFeatured
    });
    setEditorPreviewMode(false);
    setSubTab('editor');
  };

  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!editorForm.title || !editorForm.content) {
      alert('Please enter both Title and Content for the article.');
      return;
    }

    setIsSavingPost(true);
    try {
      const url = editingPostId ? `/api/blog/posts/${editingPostId}` : '/api/blog/posts';
      const method = editingPostId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editorForm)
      });

      if (res.ok) {
        showStatus(editingPostId ? 'Article updated successfully!' : 'New article published!');
        fetchAllBlogAdminData();
        setSubTab('all-posts');
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save post.');
      }
    } catch (err) {
      alert('Network error while saving post.');
    } finally {
      setIsSavingPost(false);
    }
  };

  const handleToggleStatus = async (post) => {
    try {
      const res = await fetch(`/api/blog/posts/${post.id}/status`, { method: 'PATCH' });
      if (res.ok) {
        const data = await res.json();
        setPosts(posts.map(p => p.id === post.id ? { ...p, status: data.status } : p));
        showStatus(`Article marked as "${data.status}"`);
      }
    } catch (e) {}
  };

  const handleDeletePost = async (post) => {
    if (!window.confirm(`Are you sure you want to delete "${post.title}"?`)) return;
    try {
      const res = await fetch(`/api/blog/posts/${post.id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter(p => p.id !== post.id));
        showStatus(`Deleted article: "${post.title}"`);
      }
    } catch (e) {}
  };

  // ----------------- CATEGORY CRUD -----------------
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName) return;
    setIsAddingCat(true);
    try {
      const res = await fetch('/api/blog/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName, description: newCatDesc })
      });
      if (res.ok) {
        const data = await res.json();
        setCategories([...categories, { ...data.category, count: 0 }]);
        setNewCatName('');
        setNewCatDesc('');
        showStatus('New blog category added successfully!');
      }
    } catch (e) {} finally {
      setIsAddingCat(false);
    }
  };

  const handleDeleteCategory = async (catId) => {
    if (!window.confirm('Delete this blog category?')) return;
    try {
      const res = await fetch(`/api/blog/categories/${catId}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== catId));
        showStatus('Category deleted.');
      }
    } catch (e) {}
  };

  // ----------------- MEDIA LIBRARY CRUD -----------------
  const handleAddMedia = async (e) => {
    e.preventDefault();
    if (!newMediaUrl) return;
    setIsAddingMedia(true);
    try {
      const res = await fetch('/api/blog/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newMediaTitle || 'Heritage Photo',
          url: newMediaUrl,
          category: newMediaCategory
        })
      });
      if (res.ok) {
        const data = await res.json();
        setMediaList([data.media, ...mediaList]);
        setNewMediaUrl('');
        setNewMediaTitle('');
        showStatus('Media asset saved to library!');
      }
    } catch (e) {} finally {
      setIsAddingMedia(false);
    }
  };

  const handleDeleteMedia = async (mediaId) => {
    if (!window.confirm('Remove this photo from media library?')) return;
    try {
      const res = await fetch(`/api/blog/media/${mediaId}`, { method: 'DELETE' });
      if (res.ok) {
        setMediaList(mediaList.filter(m => m.id !== mediaId));
        showStatus('Media item removed.');
      }
    } catch (e) {}
  };

  const handleCopyMediaUrl = (url, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedMediaId(id);
      setTimeout(() => setCopiedMediaId(null), 2500);
    }
  };

  // Editor Toolbar formatting helper
  const insertFormatting = (prefix, suffix = '') => {
    const textarea = document.getElementById('blog-content-editor');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || 'text';
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent = textarea.value.substring(0, start) + replacement + textarea.value.substring(end);
    setEditorForm({ ...editorForm, content: newContent });

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  // Filtered Posts for All Posts Table
  const filteredPosts = posts.filter(p => {
    const matchesCat = categoryFilter === 'all' || p.category?.toLowerCase() === categoryFilter.toLowerCase();
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = !q || 
      p.title?.toLowerCase().includes(q) || 
      p.author?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  // KPI Metrics
  const totalPosts = posts.length;
  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftCount = posts.filter(p => p.status === 'draft').length;
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Toast Feedback */}
      {statusMessage && (
        <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-between shadow-md animate-in fade-in">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> {statusMessage}
          </span>
          <button onClick={() => setStatusMessage(null)}>✕</button>
        </div>
      )}

      {/* Blog Management Sub-Navigation Bar */}
      <div className="bg-white p-3 rounded-2xl border border-[#E9DCC7] shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar">
          
          <button
            onClick={() => setSubTab('all-posts')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'all-posts'
                ? 'bg-[#8F2024] text-white shadow-md'
                : 'bg-stone-50 hover:bg-[#F7F1DF] text-[#62564D] border border-[#E9DCC7]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>All Posts ({totalPosts})</span>
          </button>

          <button
            onClick={handleOpenNewPost}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'editor' && !editingPostId
                ? 'bg-[#8F2024] text-white shadow-md'
                : 'bg-stone-50 hover:bg-[#F7F1DF] text-[#62564D] border border-[#E9DCC7]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Post</span>
          </button>

          <button
            onClick={() => setSubTab('categories')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'categories'
                ? 'bg-[#8F2024] text-white shadow-md'
                : 'bg-stone-50 hover:bg-[#F7F1DF] text-[#62564D] border border-[#E9DCC7]'
            }`}
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setSubTab('media')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              subTab === 'media'
                ? 'bg-[#8F2024] text-white shadow-md'
                : 'bg-stone-50 hover:bg-[#F7F1DF] text-[#62564D] border border-[#E9DCC7]'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            <span>Media Library ({mediaList.length})</span>
          </button>

        </div>

        <button
          onClick={fetchAllBlogAdminData}
          className="p-2 rounded-xl bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] text-xs font-semibold flex items-center gap-1 transition-colors"
          title="Refresh Data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. ALL POSTS SUB-TAB                                     */}
      {/* ======================================================== */}
      {subTab === 'all-posts' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* KPI Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E9DCC7] shadow-sm">
              <span className="text-[10px] font-bold text-[#806F60] uppercase tracking-wider block">Total Articles</span>
              <span className="font-serif text-2xl font-black text-[#701B25]">{totalPosts}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#E9DCC7] shadow-sm">
              <span className="text-[10px] font-bold text-[#806F60] uppercase tracking-wider block">Published Live</span>
              <span className="font-serif text-2xl font-black text-[#285331]">{publishedCount}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#E9DCC7] shadow-sm">
              <span className="text-[10px] font-bold text-[#806F60] uppercase tracking-wider block">Drafts</span>
              <span className="font-serif text-2xl font-black text-[#D69A19]">{draftCount}</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#E9DCC7] shadow-sm">
              <span className="text-[10px] font-bold text-[#806F60] uppercase tracking-wider block">Total Reads</span>
              <span className="font-serif text-2xl font-black text-[#4C7897]">{totalViews.toLocaleString()}</span>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#E9DCC7] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-[#806F60] absolute left-3 top-3" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, author..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 rounded-xl border border-[#E9DCC7] focus:outline-none focus:ring-1 focus:ring-[#8F2024] text-[#62564D]"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs bg-stone-50 border border-[#E9DCC7] rounded-xl px-3 py-2 text-[#62564D] focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>

              <button
                onClick={handleOpenNewPost}
                className="px-4 py-2 bg-[#8F2024] hover:bg-[#701B25] text-white text-xs font-bold rounded-xl shadow-md transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Article</span>
              </button>
            </div>
          </div>

          {/* Posts Table / Card Listing */}
          <div className="bg-white rounded-3xl border border-[#E9DCC7] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] text-left text-xs text-[#62564D]">
                <thead className="bg-[#F7F1DF] text-[#701B25] font-serif border-b border-[#E9DCC7] text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Article</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Author</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Published Date</th>
                    <th className="py-3 px-4">Reads</th>
                    <th className="py-3 px-4 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F7F1DF]/40 transition-colors">
                        
                        {/* Article Info */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img 
                              src={p.featuredImage} 
                              alt={p.title}
                              className="w-12 h-12 rounded-xl object-cover border border-[#E9DCC7] shrink-0 bg-stone-100" 
                            />
                            <div className="min-w-0 max-w-xs">
                              <span className="font-bold text-[#701B25] block truncate leading-tight hover:text-[#8F2024] cursor-pointer" onClick={() => handleOpenEditPost(p)}>
                                {p.title}
                              </span>
                              <span className="text-[10px] text-[#806F60] font-mono truncate block mt-0.5">
                                /blog/{p.slug}
                              </span>
                              {p.isFeatured && (
                                <span className="bg-[#D69A19]/20 text-[#701B25] text-[9px] font-bold px-1.5 py-0.2 rounded mt-0.5 inline-block border border-[#D69A19]">
                                  ★ Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4">
                          <span className="bg-[#F7F1DF] text-[#701B25] font-semibold px-2.5 py-1 rounded-full text-[10px] border border-[#E9DCC7]">
                            {p.category}
                          </span>
                        </td>

                        {/* Author */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-medium text-[#62564D]">
                          {p.author}
                        </td>

                        {/* Status Toggle */}
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleToggleStatus(p)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              p.status === 'published'
                                ? 'bg-[#285331]/10 text-[#285331] border border-[#285331]/30 hover:bg-[#285331]/20'
                                : 'bg-[#D69A19]/10 text-[#D69A19] border border-[#D69A19]/30 hover:bg-[#D69A19]/20'
                            }`}
                            title="Click to toggle status"
                          >
                            ● {p.status}
                          </button>
                        </td>

                        {/* Published Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-[#806F60]">
                          {p.publishedAt || 'Unpublished'}
                        </td>

                        {/* Reads / Views */}
                        <td className="py-3.5 px-4 font-bold text-[#62564D]">
                          {p.views || 0}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-3.5 px-4 text-right pr-6">
                          <div className="flex items-center justify-end gap-1.5">
                            
                            {/* Preview in Storefront */}
                            <button
                              onClick={() => {
                                if (onNavigateToPost) onNavigateToPost(`/blog/${p.slug}`);
                              }}
                              className="p-1.5 rounded-lg bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] transition-colors"
                              title="Preview on Public Blog"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>

                            {/* Edit Post */}
                            <button
                              onClick={() => handleOpenEditPost(p)}
                              className="p-1.5 rounded-lg bg-[#F7F1DF] hover:bg-[#E9DCC7] text-[#701B25] transition-colors"
                              title="Edit Article"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete Post */}
                            <button
                              onClick={() => handleDeletePost(p)}
                              className="p-1.5 rounded-lg bg-[#8F2024]/10 hover:bg-[#8F2024]/20 text-[#8F2024] transition-colors"
                              title="Delete Article"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-10 text-stone-400">
                        No articles found matching filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 2. ADD / EDIT POST EDITOR SUB-TAB                        */}
      {/* ======================================================== */}
      {subTab === 'editor' && (
        <form onSubmit={handleSavePost} className="bg-white p-6 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-6 animate-in fade-in">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#E9DCC7]">
            <div>
              <h4 className="font-serif text-lg font-black text-[#701B25]">
                {editingPostId ? 'Edit Heirloom Chronicle' : 'Compose New Heirloom Article'}
              </h4>
              <p className="text-xs text-[#806F60]">
                Write authentic recipes, courtyard wisdom, and stories for Naani Pickles readers.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditorPreviewMode(!editorPreviewMode)}
                className="px-3.5 py-1.5 rounded-xl border border-[#E9DCC7] text-xs font-bold hover:bg-[#F7F1DF] text-[#701B25] transition-colors"
              >
                {editorPreviewMode ? 'Back to Editor' : 'Live Preview'}
              </button>

              <button
                type="button"
                onClick={() => setSubTab('all-posts')}
                className="px-3 py-1.5 rounded-xl text-[#806F60] text-xs hover:bg-stone-100"
              >
                Cancel
              </button>
            </div>
          </div>

          {!editorPreviewMode ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Form: Main Content */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-[#62564D] uppercase tracking-wider mb-1">
                    Article Title (English) *
                  </label>
                  <input 
                    type="text"
                    required
                    value={editorForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      setEditorForm({
                        ...editorForm,
                        title,
                        slug: editorForm.slug === '' || !editingPostId ? slug : editorForm.slug
                      });
                    }}
                    placeholder="e.g. The Lost Art of 21-Day Sun Curing in Ceramic Barnis"
                    className="w-full px-3.5 py-2.5 text-sm bg-stone-50 rounded-xl border border-[#E9DCC7] focus:outline-none focus:ring-1 focus:ring-[#8F2024] font-serif font-bold text-[#701B25]"
                  />
                </div>

                {/* Hindi Title / Tagline */}
                <div>
                  <label className="block text-xs font-bold text-[#62564D] uppercase tracking-wider mb-1">
                    Hindi Subtitle / Shloka (Optional)
                  </label>
                  <input 
                    type="text"
                    value={editorForm.hindiTitle}
                    onChange={(e) => setEditorForm({ ...editorForm, hindiTitle: e.target.value })}
                    placeholder="e.g. मिट्टी की बरनी और 21 दिनों की धूप की प्राचीन परंपरा"
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 rounded-xl border border-[#E9DCC7] focus:outline-none focus:ring-1 focus:ring-[#8F2024] font-serif italic text-[#DF905B]"
                  />
                </div>

                {/* SEO Slug */}
                <div>
                  <label className="block text-xs font-bold text-[#62564D] uppercase tracking-wider mb-1">
                    SEO URL Slug (/blog/...)
                  </label>
                  <input 
                    type="text"
                    required
                    value={editorForm.slug}
                    onChange={(e) => setEditorForm({ ...editorForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-') })}
                    placeholder="lost-art-of-21-day-sun-curing-ceramic-barnis"
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 rounded-xl border border-[#E9DCC7] focus:outline-none focus:ring-1 focus:ring-[#8F2024] font-mono text-[#62564D]"
                  />
                </div>

                {/* Short Excerpt */}
                <div>
                  <label className="block text-xs font-bold text-[#62564D] uppercase tracking-wider mb-1">
                    Short Description / Excerpt (Shows in Cards & Social Previews)
                  </label>
                  <textarea 
                    rows={3}
                    value={editorForm.excerpt}
                    onChange={(e) => setEditorForm({ ...editorForm, excerpt: e.target.value })}
                    placeholder="A 2-3 sentence synopsis highlighting the recipe, grandmother's technique, or health benefits..."
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 rounded-xl border border-[#E9DCC7] focus:outline-none focus:ring-1 focus:ring-[#8F2024] font-sans text-[#62564D]"
                  />
                </div>

                {/* Rich Content Editor with Quick Formatting Toolbar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-[#62564D] uppercase tracking-wider">
                      Article Content (Supports Markdown & HTML) *
                    </label>
                    
                    {/* Quick Formatting Toolbar */}
                    <div className="flex items-center gap-1 bg-[#F7F1DF] p-1 rounded-lg border border-[#E9DCC7]">
                      <button 
                        type="button" 
                        onClick={() => insertFormatting('## ')}
                        className="p-1 hover:bg-white rounded text-[11px] font-bold text-[#701B25]" 
                        title="Heading 2"
                      >
                        <Heading2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => insertFormatting('### ')}
                        className="p-1 hover:bg-white rounded text-[11px] font-bold text-[#701B25]" 
                        title="Heading 3"
                      >
                        <Heading3 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => insertFormatting('**', '**')}
                        className="p-1 hover:bg-white rounded text-[11px] font-bold text-[#701B25]" 
                        title="Bold"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => insertFormatting('*', '*')}
                        className="p-1 hover:bg-white rounded text-[11px] font-bold text-[#701B25]" 
                        title="Italic"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => insertFormatting('> ')}
                        className="p-1 hover:bg-white rounded text-[11px] font-bold text-[#701B25]" 
                        title="Blockquote"
                      >
                        <Quote className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button" 
                        onClick={() => insertFormatting('- ')}
                        className="p-1 hover:bg-white rounded text-[11px] font-bold text-[#701B25]" 
                        title="Bullet List"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <textarea 
                    id="blog-content-editor"
                    rows={14}
                    required
                    value={editorForm.content}
                    onChange={(e) => setEditorForm({ ...editorForm, content: e.target.value })}
                    placeholder="Write the full recipe, story, ingredient breakdown, and preservation rules..."
                    className="w-full px-4 py-3 text-xs bg-stone-50 rounded-2xl border border-[#E9DCC7] focus:outline-none focus:ring-1 focus:ring-[#8F2024] font-mono text-[#62564D] leading-relaxed"
                  />
                </div>

              </div>

              {/* Right Sidebar: Metadata & Publishing Controls */}
              <div className="lg:col-span-4 space-y-4 bg-[#F7F1DF] p-5 rounded-2xl border border-[#E9DCC7]">
                
                {/* Publish Action Box */}
                <div className="bg-white p-4 rounded-xl border border-[#E9DCC7] shadow-sm space-y-3">
                  <span className="text-xs font-bold text-[#701B25] uppercase tracking-wider block">
                    Publishing Status
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEditorForm({ ...editorForm, status: 'published' })}
                      className={`py-2 px-3 rounded-lg text-xs font-bold text-center transition-all ${
                        editorForm.status === 'published'
                          ? 'bg-[#285331] text-white shadow-sm'
                          : 'bg-stone-100 text-[#62564D] hover:bg-stone-200'
                      }`}
                    >
                      ● Published
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorForm({ ...editorForm, status: 'draft' })}
                      className={`py-2 px-3 rounded-lg text-xs font-bold text-center transition-all ${
                        editorForm.status === 'draft'
                          ? 'bg-[#D69A19] text-white shadow-sm'
                          : 'bg-stone-100 text-[#62564D] hover:bg-stone-200'
                      }`}
                    >
                      Draft
                    </button>
                  </div>

                  <label className="flex items-center gap-2 pt-2 text-xs font-semibold text-[#62564D] cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={editorForm.isFeatured}
                      onChange={(e) => setEditorForm({ ...editorForm, isFeatured: e.target.checked })}
                      className="rounded text-[#8F2024] focus:ring-[#8F2024]"
                    />
                    <span>Feature on Blog Home Hero</span>
                  </label>

                  <button
                    type="submit"
                    disabled={isSavingPost}
                    className="w-full py-2.5 bg-[#8F2024] hover:bg-[#701B25] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSavingPost ? 'Saving...' : editingPostId ? 'Update Article' : 'Publish Article'}</span>
                  </button>
                </div>

                {/* Category Select */}
                <div>
                  <label className="block text-xs font-bold text-[#62564D] uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={editorForm.category}
                    onChange={(e) => setEditorForm({ ...editorForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E9DCC7] focus:outline-none font-semibold text-[#62564D]"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-xs font-bold text-[#62564D] uppercase tracking-wider mb-1">
                    Featured Image URL *
                  </label>
                  <input 
                    type="url"
                    required
                    value={editorForm.featuredImage}
                    onChange={(e) => setEditorForm({ ...editorForm, featuredImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E9DCC7] focus:outline-none text-[#62564D]"
                  />
                  {editorForm.featuredImage && (
                    <div className="mt-2 relative aspect-[16/9] rounded-xl overflow-hidden border border-[#E9DCC7] bg-stone-100">
                      <img 
                        src={editorForm.featuredImage} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => setSubTab('media')}
                    className="mt-2 text-[11px] font-bold text-[#8F2024] hover:underline flex items-center gap-1"
                  >
                    <Image className="w-3.5 h-3.5" /> Pick from Media Library
                  </button>
                </div>

                {/* Author Info */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-[#62564D] uppercase tracking-wider">
                    Author Details
                  </label>
                  <input 
                    type="text"
                    value={editorForm.author}
                    onChange={(e) => setEditorForm({ ...editorForm, author: e.target.value })}
                    placeholder="Author Name (e.g. Grandmother Shanti Devi)"
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E9DCC7] focus:outline-none text-[#62564D]"
                  />
                  <input 
                    type="text"
                    value={editorForm.authorRole}
                    onChange={(e) => setEditorForm({ ...editorForm, authorRole: e.target.value })}
                    placeholder="Author Role (e.g. Head Recipe Curator)"
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E9DCC7] focus:outline-none text-[#62564D]"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-bold text-[#62564D] uppercase tracking-wider mb-1">
                    Tags (Comma Separated)
                  </label>
                  <input 
                    type="text"
                    value={editorForm.tags}
                    onChange={(e) => setEditorForm({ ...editorForm, tags: e.target.value })}
                    placeholder="Sun Curing, Varanasi, Ayurveda, Raw Mango"
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-[#E9DCC7] focus:outline-none text-[#62564D]"
                  />
                </div>

              </div>

            </div>
          ) : (
            /* Live Editor Preview Mode */
            <div className="p-6 bg-[#F7F1DF] rounded-2xl border border-[#E9DCC7] max-w-3xl mx-auto space-y-4">
              <span className="bg-[#8F2024] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                {editorForm.category}
              </span>
              <h2 className="font-serif text-3xl font-black text-[#701B25]">{editorForm.title || 'Untitled Article'}</h2>
              {editorForm.hindiTitle && <p className="font-serif italic text-base text-[#DF905B]">{editorForm.hindiTitle}</p>}
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#E9DCC7]">
                <img src={editorForm.featuredImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <p className="font-serif italic text-sm text-[#701B25] bg-white p-4 rounded-xl border border-[#E9DCC7]">
                "{editorForm.excerpt}"
              </p>
              <div className="bg-white p-6 rounded-2xl border border-[#E9DCC7] space-y-3 font-sans text-xs leading-relaxed text-[#62564D]">
                {editorForm.content}
              </div>
            </div>
          )}

        </form>
      )}

      {/* ======================================================== */}
      {/* 3. CATEGORIES MANAGEMENT SUB-TAB                         */}
      {/* ======================================================== */}
      {subTab === 'categories' && (
        <div className="space-y-6 animate-in fade-in">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Add New Category Form */}
            <div className="lg:col-span-5 bg-white p-5 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-4">
              <h4 className="font-serif text-base font-bold text-[#701B25] flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#D69A19]" />
                <span>Add Blog Category</span>
              </h4>
              <p className="text-xs text-[#806F60]">
                Create new themes to organize traditional recipes, cooking tips, and courtyard lore.
              </p>

              <form onSubmit={handleAddCategory} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#62564D] uppercase tracking-wider mb-1">
                    Category Name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Seasonal Chutneys"
                    className="w-full px-3 py-2 text-xs bg-stone-50 rounded-xl border border-[#E9DCC7] focus:outline-none focus:ring-1 focus:ring-[#8F2024] text-[#62564D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#62564D] uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea 
                    rows={3}
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    placeholder="Short description of articles featured in this section..."
                    className="w-full px-3 py-2 text-xs bg-stone-50 rounded-xl border border-[#E9DCC7] focus:outline-none focus:ring-1 focus:ring-[#8F2024] text-[#62564D]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAddingCat}
                  className="w-full py-2.5 bg-[#8F2024] hover:bg-[#701B25] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  {isAddingCat ? 'Saving...' : 'Add Category'}
                </button>
              </form>
            </div>

            {/* Right: Existing Categories List */}
            <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-[#E9DCC7] shadow-sm space-y-3">
              <h4 className="font-serif text-base font-bold text-[#701B25]">
                Active Blog Categories ({categories.length})
              </h4>

              <div className="divide-y divide-stone-100">
                {categories.map((c) => (
                  <div key={c.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#701B25]">{c.name}</span>
                        <span className="bg-[#D69A19]/20 text-[#701B25] text-[10px] font-bold px-2 py-0.2 rounded-full border border-[#D69A19]">
                          {c.count || 0} Posts
                        </span>
                      </div>
                      <p className="text-[11px] text-[#806F60] mt-0.5 line-clamp-1">
                        {c.description || 'No description provided.'}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteCategory(c.id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors shrink-0"
                      title="Delete category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* 4. MEDIA LIBRARY SUB-TAB                                 */}
      {/* ======================================================== */}
      {subTab === 'media' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Add Media Banner */}
          <div className="bg-white p-5 rounded-3xl border border-[#E9DCC7] shadow-sm">
            <h4 className="font-serif text-base font-bold text-[#701B25] mb-1 flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#D69A19]" />
              <span>Add New Image Asset</span>
            </h4>
            <p className="text-xs text-[#806F60] mb-4">
              Save high-resolution photography for articles, banner visuals, and recipe step-by-step guides.
            </p>

            <form onSubmit={handleAddMedia} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-5">
                <label className="block text-[11px] font-bold text-[#62564D] uppercase mb-1">
                  Image Direct URL (Unsplash or CDN) *
                </label>
                <input 
                  type="url"
                  required
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 rounded-xl border border-[#E9DCC7] focus:outline-none text-[#62564D]"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[11px] font-bold text-[#62564D] uppercase mb-1">
                  Title / Caption
                </label>
                <input 
                  type="text"
                  value={newMediaTitle}
                  onChange={(e) => setNewMediaTitle(e.target.value)}
                  placeholder="e.g. Rooftop Ceramic Barnis"
                  className="w-full px-3 py-2 text-xs bg-stone-50 rounded-xl border border-[#E9DCC7] focus:outline-none text-[#62564D]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[#62564D] uppercase mb-1">
                  Category
                </label>
                <select
                  value={newMediaCategory}
                  onChange={(e) => setNewMediaCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-stone-50 rounded-xl border border-[#E9DCC7] focus:outline-none text-[#62564D]"
                >
                  <option value="Heritage & Courtyard">Heritage & Courtyard</option>
                  <option value="Spices & Ingredients">Spices & Ingredients</option>
                  <option value="Pickles & Jars">Pickles & Jars</option>
                  <option value="Serving & Thalis">Serving & Thalis</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isAddingMedia}
                  className="w-full py-2 bg-[#8F2024] hover:bg-[#701B25] text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                >
                  {isAddingMedia ? 'Adding...' : 'Add to Library'}
                </button>
              </div>
            </form>
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {mediaList.map((m) => (
              <div 
                key={m.id}
                className="group bg-white rounded-2xl border border-[#E9DCC7] p-2 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-100 mb-2">
                    <img 
                      src={m.url} 
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <span className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                      {m.category}
                    </span>
                  </div>

                  <span className="font-bold text-xs text-[#701B25] block truncate leading-tight">
                    {m.title}
                  </span>
                  <span className="text-[10px] text-[#806F60] block mt-0.5">
                    {m.uploadedAt || 'Oct 2026'}
                  </span>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between mt-2">
                  <button
                    onClick={() => handleCopyMediaUrl(m.url, m.id)}
                    className="text-[10px] font-bold text-[#8F2024] hover:underline flex items-center gap-1"
                  >
                    {copiedMediaId === m.id ? (
                      <span className="text-[#285331] flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Copied!
                      </span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy URL
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDeleteMedia(m.id)}
                    className="p-1 text-stone-400 hover:text-red-600 transition-colors"
                    title="Delete photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
