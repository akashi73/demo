import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  Users, 
  ShieldCheck, 
  Settings, 
  Layers, 
  Server, 
  Activity, 
  Trash2, 
  Edit, 
  Plus, 
  Search, 
  CheckCircle, 
  AlertOctagon, 
  ExternalLink,
  Sparkles,
  Key,
  Database,
  ArrowRight,
  UserCheck,
  Building2
} from 'lucide-react';

export default function SuperAdminPortalView({ 
  onSwitchToUserPortal,
  onSwitchToAdminPortal,
  currentUser 
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [overview, setOverview] = useState({
    metrics: {},
    systemHealth: {}
  });

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState({});
  const [auditLogs, setAuditLogs] = useState([]);

  const [searchUser, setSearchUser] = useState('');
  const [filterUserRole, setFilterUserRole] = useState('all');
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Sparkles');
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const loadSuperAdminData = async () => {
    try {
      const [overRes, usersRes, catRes, setRes, logsRes] = await Promise.all([
        fetch('/api/superadmin/overview').then(r => r.json()),
        fetch('/api/superadmin/users').then(r => r.json()),
        fetch('/api/categories').then(r => r.json()),
        fetch('/api/superadmin/settings').then(r => r.json()),
        fetch('/api/superadmin/logs').then(r => r.json())
      ]);

      setOverview(overRes);
      setUsers(usersRes);
      setCategories(catRes);
      setSettings(setRes);
      setAuditLogs(logsRes);
    } catch (err) {
      console.error('Error fetching superadmin data:', err);
    }
  };

  useEffect(() => {
    loadSuperAdminData();
  }, []);

  // Change user role / status
  const handleUpdateUser = async (userId, updates) => {
    try {
      const res = await fetch(`/api/superadmin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });

      if (!res.ok) throw new Error('Failed to update user');
      const updated = await res.json();

      setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updated } : u));
      showNotification(`User ${updated.name} updated successfully!`);
      loadSuperAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete user
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user permanently?')) return;

    try {
      const res = await fetch(`/api/superadmin/users/${userId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');

      setUsers(prev => prev.filter(u => u.id !== userId));
      showNotification('User deleted permanently.');
      loadSuperAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Add Category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    try {
      const res = await fetch('/api/superadmin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatName, icon: newCatIcon, count: 0 })
      });

      if (!res.ok) throw new Error('Failed to add category');
      const newCat = await res.json();

      setCategories(prev => [...prev, newCat]);
      setNewCatName('');
      showNotification(`Category "${newCat.name}" added to platform taxonomy!`);
      loadSuperAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete Category
  const handleDeleteCategory = async (catId) => {
    if (!window.confirm('Delete this skill category?')) return;

    try {
      const res = await fetch(`/api/superadmin/categories/${catId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete category');

      setCategories(prev => prev.filter(c => c.id !== catId));
      showNotification('Category removed.');
      loadSuperAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Update Settings
  const handleToggleSetting = async (key) => {
    const updatedVal = !settings[key];
    const newSettings = { ...settings, [key]: updatedVal };
    setSettings(newSettings);

    try {
      const res = await fetch('/api/superadmin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [key]: updatedVal })
      });

      if (!res.ok) throw new Error('Failed to update setting');
      showNotification(`Setting "${key}" updated!`);
      loadSuperAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredUsers = users.filter(u => {
    if (filterUserRole !== 'all' && u.role !== filterUserRole) return false;
    if (searchUser) {
      const s = searchUser.toLowerCase();
      return u.name.toLowerCase().includes(s) || (u.email && u.email.toLowerCase().includes(s)) || (u.phone && u.phone.includes(s));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-rose-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 border border-rose-400">
          <CheckCircle className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Super Admin Top Header */}
      <header className="bg-black/80 border-b border-rose-900/40 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-white">SkillConnect</span>
                  <span className="text-[10px] font-extrabold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded-full">
                    Super Admin Master
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-400">System Architecture & Executive Governance</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                👑 Master Dashboard
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'users'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                👥 Users & Roles ({users.length})
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'categories'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                🏷️ Skill Taxonomy ({categories.length})
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                ⚙️ Platform Flags
              </button>

              <button
                onClick={() => setActiveTab('logs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'logs'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                📜 Audit Logs
              </button>
            </nav>

            {/* Cross-linking shortcuts */}
            <div className="flex items-center gap-2">
              <button
                onClick={onSwitchToAdminPortal}
                className="text-xs font-bold bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                title="Jump to Operations Admin"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span>Admin Hub</span>
              </button>

              <button
                onClick={onSwitchToUserPortal}
                className="text-xs font-bold bg-blue-950 hover:bg-blue-900 text-blue-200 border border-blue-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                title="View user portal"
              >
                <span>User Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Submenu */}
        <div className="flex md:hidden px-3 py-2 border-t border-slate-900 gap-2 overflow-x-auto text-xs">
          <button onClick={() => setActiveTab('overview')} className={`px-2.5 py-1 rounded font-semibold whitespace-nowrap ${activeTab === 'overview' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('users')} className={`px-2.5 py-1 rounded font-semibold whitespace-nowrap ${activeTab === 'users' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>User Management</button>
          <button onClick={() => setActiveTab('categories')} className={`px-2.5 py-1 rounded font-semibold whitespace-nowrap ${activeTab === 'categories' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>Categories</button>
          <button onClick={() => setActiveTab('settings')} className={`px-2.5 py-1 rounded font-semibold whitespace-nowrap ${activeTab === 'settings' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>Settings</button>
          <button onClick={() => setActiveTab('logs')} className={`px-2.5 py-1 rounded font-semibold whitespace-nowrap ${activeTab === 'logs' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>Audit Logs</button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ================= TAB 1: MASTER OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            
            {/* Executive Banner */}
            <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-black p-6 sm:p-8 rounded-3xl border border-rose-500/20 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-300 bg-rose-500/20 border border-rose-500/30 px-3 py-1 rounded-full mb-3">
                    <Crown className="w-3.5 h-3.5 text-rose-400" />
                    Super Admin Executive Terminal
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Platform Master Governance
                  </h1>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                    Total control over user permissions, role elevation, skill taxonomies, system feature flags, and real-time security logs.
                  </p>
                </div>

                {/* System Health Pill */}
                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl flex items-center gap-4 shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                    <Server className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <p className="font-extrabold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Node.js API {overview.systemHealth?.nodeVersion || 'v24.22'}
                    </p>
                    <p className="text-slate-400">RAM: {overview.systemHealth?.memoryUsage || '42 MB'} • Port: 5000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Users</span>
                <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">{overview.metrics?.totalUsers || users.length}</span>
                <span className="text-[11px] font-semibold text-rose-400 mt-1 block">Full Database Count</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Candidates / Seekers</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 block">{overview.metrics?.candidatesCount || 7}</span>
                <span className="text-[11px] font-semibold text-slate-400 mt-1 block">Facility & skilled trades</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recruiters & Companies</span>
                <span className="text-2xl sm:text-3xl font-black text-blue-400 mt-1 block">{overview.metrics?.recruitersCount || 3}</span>
                <span className="text-[11px] font-semibold text-slate-400 mt-1 block">Active hiring licenses</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Admins & Super Admins</span>
                <span className="text-2xl sm:text-3xl font-black text-purple-400 mt-1 block">
                  {(overview.metrics?.adminsCount || 1) + (overview.metrics?.superadminsCount || 1)}
                </span>
                <span className="text-[11px] font-semibold text-purple-300 mt-1 block">Privileged operators</span>
              </div>
            </div>

            {/* System Engine Specifications */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2 mb-4">
                <Database className="w-4 h-4 text-rose-500" />
                Backend Infrastructure & Architecture
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-black/50 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-semibold block">Data Storage</span>
                  <p className="font-bold text-white text-sm mt-1">Single-Source JSON Engine</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">d:\housekepping data\server\data.json</p>
                </div>

                <div className="bg-black/50 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-semibold block">REST API Endpoints</span>
                  <p className="font-bold text-white text-sm mt-1">26 Modular Routes</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">User, HR, Ops Admin, Super Admin</p>
                </div>

                <div className="bg-black/50 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-semibold block">Security & RBAC</span>
                  <p className="font-bold text-emerald-400 text-sm mt-1">Active Role Isolation</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Candidates, HRs, Admins, Super Admins</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: USER MANAGEMENT & ROLE ELEVATION ================= */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white">Master User Management & Role Elevator</h2>
                <p className="text-xs text-slate-400">Promote any user to Admin, Super Admin, HR, or Candidate in 1 click.</p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search user name or phone..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="text-xs px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />

                <select
                  value={filterUserRole}
                  onChange={(e) => setFilterUserRole(e.target.value)}
                  className="text-xs px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                >
                  <option value="all">All Roles</option>
                  <option value="candidate">Candidate</option>
                  <option value="hr">HR Recruiter</option>
                  <option value="admin">Operations Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-black/90 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">User / Avatar</th>
                      <th className="p-3.5">Contact / Email</th>
                      <th className="p-3.5">Current Role (Click to Elevate)</th>
                      <th className="p-3.5">Account Status</th>
                      <th className="p-3.5 text-right">Super Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-medium">
                    {filteredUsers.map(u => (
                      <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3.5 flex items-center gap-3">
                          <img
                            src={u.avatar || u.companyLogo || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                            alt={u.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-700"
                          />
                          <div>
                            <div className="font-bold text-white text-xs">{u.name}</div>
                            <div className="text-[11px] text-slate-400">{u.title || u.company || 'User'}</div>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <div className="text-slate-200">{u.email}</div>
                          <div className="text-[11px] text-slate-500">{u.phone}</div>
                        </td>

                        {/* Role Switcher Dropdown */}
                        <td className="p-3.5">
                          <select
                            value={u.role}
                            onChange={(e) => handleUpdateUser(u.id, { role: e.target.value })}
                            className={`text-xs font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                              u.role === 'superadmin'
                                ? 'bg-rose-950 text-rose-300 border-rose-800'
                                : u.role === 'admin'
                                ? 'bg-purple-950 text-purple-300 border-purple-800'
                                : u.role === 'hr'
                                ? 'bg-indigo-950 text-indigo-300 border-indigo-800'
                                : 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            }`}
                          >
                            <option value="candidate">Candidate (Job Seeker)</option>
                            <option value="hr">HR Recruiter (Employer)</option>
                            <option value="admin">Operations Admin</option>
                            <option value="superadmin">Super Admin</option>
                          </select>
                        </td>

                        {/* Status Toggle */}
                        <td className="p-3.5">
                          <button
                            onClick={() => handleUpdateUser(u.id, { status: u.status === 'Suspended' ? 'Active' : 'Suspended' })}
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              u.status === 'Suspended'
                                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {u.status || 'Active'}
                          </button>
                        </td>

                        {/* Action buttons */}
                        <td className="p-3.5 text-right whitespace-nowrap space-x-2">
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
                            title="Delete User Permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 3: SKILL TAXONOMY / CATEGORIES ================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white">Skill Categories & Taxonomies</h2>
                <p className="text-xs text-slate-400">Define skill domains available for registration and job matching.</p>
              </div>
            </div>

            {/* Add Category Form */}
            <form onSubmit={handleAddCategory} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Enter new Category Name (e.g. Solar Energy Technician, Electric Vehicle Tech)..."
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="flex-1 text-xs px-3.5 py-2.5 bg-black border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-semibold"
              />

              <button
                type="submit"
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-rose-600/30 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </button>
            </form>

            {/* Categories List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map(cat => (
                <div key={cat.id} className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-extrabold text-white text-xs">{cat.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{cat.count || 20}+ Skilled Workers</p>
                  </div>

                  <button
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-rose-950/40"
                    title="Remove Category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB 4: PLATFORM FLAGS & SETTINGS ================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-extrabold text-white">Platform Configuration & Feature Flags</h2>
              <p className="text-xs text-slate-400">Toggle live platform rules, anti-fraud barriers, and recruitment requirements.</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl divide-y divide-slate-800">
              
              {/* Flag 1 */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm">1-Click Instant Apply</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Allow candidates to apply instantly using their registered Digital Skill Card.</p>
                </div>
                <button
                  onClick={() => handleToggleSetting('allowInstantApply')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.allowInstantApply ? 'bg-rose-600' : 'bg-slate-700'
                  }`}
                >
                  <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    settings.allowInstantApply ? 'right-0.5' : 'left-0.5'
                  }`}></span>
                </button>
              </div>

              {/* Flag 2 */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm">Require Mobile OTP for Job Posting</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Mandate phone OTP confirmation before publishing vacancies.</p>
                </div>
                <button
                  onClick={() => handleToggleSetting('requireOtp')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.requireOtp ? 'bg-rose-600' : 'bg-slate-700'
                  }`}
                >
                  <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    settings.requireOtp ? 'right-0.5' : 'left-0.5'
                  }`}></span>
                </button>
              </div>

              {/* Flag 3 */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm">Admin Approval Required for New Jobs</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Hold new job postings in pending review until approved by Ops Admin.</p>
                </div>
                <button
                  onClick={() => handleToggleSetting('requireJobApproval')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.requireJobApproval ? 'bg-rose-600' : 'bg-slate-700'
                  }`}
                >
                  <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    settings.requireJobApproval ? 'right-0.5' : 'left-0.5'
                  }`}></span>
                </button>
              </div>

              {/* Flag 4 */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm">Mandatory Skill Assessment Quiz</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Require candidates to take the 3-question competency test before applying.</p>
                </div>
                <button
                  onClick={() => handleToggleSetting('requireSkillQuiz')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.requireSkillQuiz ? 'bg-rose-600' : 'bg-slate-700'
                  }`}
                >
                  <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    settings.requireSkillQuiz ? 'right-0.5' : 'left-0.5'
                  }`}></span>
                </button>
              </div>

              {/* Flag 5 */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-white text-sm">Maintenance Mode</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Temporarily show maintenance notice to public visitors.</p>
                </div>
                <button
                  onClick={() => handleToggleSetting('maintenanceMode')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.maintenanceMode ? 'bg-rose-600' : 'bg-slate-700'
                  }`}
                >
                  <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    settings.maintenanceMode ? 'right-0.5' : 'left-0.5'
                  }`}></span>
                </button>
              </div>

              {/* Flag 6: Affiliate Service */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-4 bg-rose-950/20">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-white text-sm">Affiliate Partner Service (Paid User Activation)</h4>
                    <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                      Monetization Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Users pay ₹999 one-time activation fee to become certified Talent Scout Partners and earn UPI commissions on candidate referrals and placements.
                  </p>
                </div>
                <button
                  onClick={() => handleToggleSetting('affiliateProgramEnabled')}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    settings.affiliateProgramEnabled ? 'bg-rose-600' : 'bg-slate-700'
                  }`}
                >
                  <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    settings.affiliateProgramEnabled ? 'right-0.5' : 'left-0.5'
                  }`}></span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ================= TAB 5: AUDIT LOGS ================= */}
        {activeTab === 'logs' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-extrabold text-white">Security & Administrative Audit Stream</h2>
              <p className="text-xs text-slate-400">Immutable ledger of administrative actions, role elevations, and quality checks.</p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-black/90 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5">Admin Actor</th>
                      <th className="p-3.5">Action Executed</th>
                      <th className="p-3.5">Technical Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-medium">
                    {auditLogs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3.5 text-slate-400 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </td>
                        <td className="p-3.5 font-bold text-rose-300">
                          {log.user}
                        </td>
                        <td className="p-3.5 font-semibold text-white">
                          {log.action}
                        </td>
                        <td className="p-3.5 text-slate-400">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
