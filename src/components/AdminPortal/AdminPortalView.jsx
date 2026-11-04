import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Briefcase, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Star, 
  Search, 
  Filter, 
  ArrowRight, 
  FileText, 
  Award, 
  Clock, 
  MapPin, 
  Sparkles,
  Zap,
  Building2,
  ExternalLink,
  MessageSquare,
  IndianRupee,
  TrendingUp
} from 'lucide-react';

export default function AdminPortalView({ 
  onSwitchToUserPortal,
  currentUser 
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalJobs: 0,
    pendingJobs: 0,
    flaggedJobs: 0,
    totalCandidates: 0,
    unverifiedCandidates: 0,
    pendingReports: 0,
    totalApplications: 0
  });

  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [reports, setReports] = useState([]);
  const [affiliatesData, setAffiliatesData] = useState({ affiliates: [], payoutRequests: [], summary: {} });
  const [searchJob, setSearchJob] = useState('');
  const [searchCand, setSearchCand] = useState('');
  const [filterJobStatus, setFilterJobStatus] = useState('all');
  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const loadAdminData = async () => {
    try {
      const [overviewRes, jobsRes, candRes, reportsRes, affRes] = await Promise.all([
        fetch('/api/admin/overview').then(r => r.json()),
        fetch('/api/jobs').then(r => r.json()),
        fetch('/api/candidates').then(r => r.json()),
        fetch('/api/admin/reports').then(r => r.json()),
        fetch('/api/admin/affiliates').then(r => r.json())
      ]);

      setStats(overviewRes);
      setJobs(jobsRes);
      setCandidates(candRes);
      setReports(reportsRes);
      setAffiliatesData(affRes);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    }
  };

  const handleProcessPayout = async (payoutId, status) => {
    try {
      const res = await fetch(`/api/admin/payouts/${payoutId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          txnRef: status === 'Approved' ? `IMPS_${Date.now()}` : 'Rejected by Admin'
        })
      });

      if (!res.ok) throw new Error('Failed to process payout');
      showNotification(`Payout #${payoutId} marked as ${status}!`);
      loadAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Job moderation actions
  const handleUpdateJobStatus = async (jobId, moderationStatus, featured) => {
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moderationStatus, featured })
      });

      if (!res.ok) throw new Error('Failed to update job');
      const updated = await res.json();

      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, ...updated } : j));
      showNotification(`Job #${jobId} status updated to ${moderationStatus}!`);
      loadAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Candidate verification actions
  const handleVerifyCandidate = async (candId, verified, backgroundCheck, trustScore) => {
    try {
      const res = await fetch(`/api/admin/candidates/${candId}/verify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified, backgroundCheck, trustScore })
      });

      if (!res.ok) throw new Error('Failed to update verification');
      const updated = await res.json();

      setCandidates(prev => prev.map(c => c.id === candId ? { ...c, ...updated } : c));
      showNotification(`Candidate ${updated.name} verification updated!`);
      loadAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Report resolution action
  const handleUpdateReport = async (repId, status, adminNotes) => {
    try {
      const res = await fetch(`/api/admin/reports/${repId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes })
      });

      if (!res.ok) throw new Error('Failed to update report');
      const updated = await res.json();

      setReports(prev => prev.map(r => r.id === repId ? updated : r));
      showNotification(`Report #${repId} marked as ${status}!`);
      loadAdminData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Filtered jobs
  const filteredJobs = jobs.filter(j => {
    if (filterJobStatus !== 'all' && (j.moderationStatus || 'Approved') !== filterJobStatus) return false;
    if (searchJob) {
      const s = searchJob.toLowerCase();
      return j.title.toLowerCase().includes(s) || j.company.toLowerCase().includes(s) || j.category.toLowerCase().includes(s);
    }
    return true;
  });

  // Filtered candidates
  const filteredCandidates = candidates.filter(c => {
    if (searchCand) {
      const s = searchCand.toLowerCase();
      return c.name.toLowerCase().includes(s) || c.category.toLowerCase().includes(s) || (c.skills && c.skills.some(sk => sk.toLowerCase().includes(s)));
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 border border-purple-400">
          <CheckCircle className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className="bg-slate-950 border-b border-purple-900/40 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Brand Logo & Portal Name */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-white">SkillConnect</span>
                  <span className="text-[10px] font-extrabold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/40 px-2 py-0.5 rounded-full">
                    Admin Portal
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-400">Operations, Trust & Quality Moderation</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1.5">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                📊 Dashboard
              </button>

              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'jobs'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                🛡️ Job Moderation ({jobs.length})
              </button>

              <button
                onClick={() => setActiveTab('candidates')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'candidates'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                🔍 Candidate Verification ({candidates.length})
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative ${
                  activeTab === 'reports'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                📨 Reports & Tickets ({reports.length})
                {stats.pendingReports > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block ml-1"></span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('affiliates')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all relative ${
                  activeTab === 'affiliates'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                🤝 Affiliate Desk ({affiliatesData?.affiliates?.length || 0})
                {affiliatesData?.summary?.pendingPayoutsCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block ml-1"></span>
                )}
              </button>
            </nav>

            {/* Right Admin Profile & Quick Switch to User Portal */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
                  alt="Sneha Kapoor"
                  className="w-8 h-8 rounded-full object-cover border border-purple-400"
                />
                <div className="text-left">
                  <p className="text-xs font-bold text-white">Sneha Kapoor</p>
                  <p className="text-[10px] text-purple-300">Operations Admin</p>
                </div>
              </div>

              <button
                onClick={onSwitchToUserPortal}
                className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                title="View how candidates & HR see the portal"
              >
                <span>View User Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Submenu */}
        <div className="flex md:hidden px-3 py-2 border-t border-slate-800 gap-2 overflow-x-auto text-xs">
          <button onClick={() => setActiveTab('overview')} className={`px-2.5 py-1 rounded font-semibold whitespace-nowrap ${activeTab === 'overview' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('jobs')} className={`px-2.5 py-1 rounded font-semibold whitespace-nowrap ${activeTab === 'jobs' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>Job Moderation</button>
          <button onClick={() => setActiveTab('candidates')} className={`px-2.5 py-1 rounded font-semibold whitespace-nowrap ${activeTab === 'candidates' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>Candidate Verification</button>
          <button onClick={() => setActiveTab('reports')} className={`px-2.5 py-1 rounded font-semibold whitespace-nowrap ${activeTab === 'reports' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}>Reports</button>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ================= TAB 1: OVERVIEW DASHBOARD ================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            
            {/* Banner */}
            <div className="bg-gradient-to-r from-purple-900/60 to-indigo-950/80 rounded-3xl p-6 sm:p-8 border border-purple-500/20 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-500/20 border border-purple-500/30 px-3 py-1 rounded-full mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Operational Trust & Security Shield Active
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Operations & Verification Hub
                  </h1>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                    Review and moderate job posts from facility managers, verify candidate technical and housekeeping certifications, and handle support tickets.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5"
                  >
                    <span>Review Job Postings</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Active Vacancies</span>
                <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">{stats.totalJobs}</span>
                <span className="text-[11px] font-semibold text-emerald-400 mt-1 block">100% Verified Employers</span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Registered Candidates</span>
                <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">{stats.totalCandidates}</span>
                <span className="text-[11px] font-semibold text-purple-300 mt-1 block">{stats.unverifiedCandidates} pending review</span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Applications Processed</span>
                <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">{stats.totalApplications}</span>
                <span className="text-[11px] font-semibold text-blue-400 mt-1 block">Across all sectors</span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl shadow-sm">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Open Inquiries & Tickets</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-400 mt-1 block">{stats.pendingReports}</span>
                <span className="text-[11px] font-semibold text-amber-300 mt-1 block">Requires admin action</span>
              </div>
            </div>

            {/* Quick Action Tables in Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recent Jobs Moderation Queue */}
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                    Latest Job Openings Awaiting Review
                  </h3>
                  <button onClick={() => setActiveTab('jobs')} className="text-xs text-purple-400 hover:underline">View All</button>
                </div>

                <div className="space-y-3">
                  {jobs.slice(0, 3).map(job => (
                    <div key={job.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <h4 className="font-bold text-white line-clamp-1">{job.title}</h4>
                        <p className="text-slate-400 text-[11px]">{job.company} • {job.location}</p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {job.moderationStatus || 'Approved'}
                        </span>
                        <button
                          onClick={() => handleUpdateJobStatus(job.id, 'Approved', true)}
                          className="px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-[10px] font-bold"
                        >
                          Feature
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidate Verification Queue */}
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    Candidates Verification Status
                  </h3>
                  <button onClick={() => setActiveTab('candidates')} className="text-xs text-blue-400 hover:underline">View All</button>
                </div>

                <div className="space-y-3">
                  {candidates.slice(0, 3).map(cand => (
                    <div key={cand.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <img src={cand.avatar} alt={cand.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                        <div>
                          <h4 className="font-bold text-white">{cand.name}</h4>
                          <p className="text-slate-400 text-[11px]">{cand.title}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {cand.backgroundCheck || 'Verified'}
                        </span>
                        <button
                          onClick={() => handleVerifyCandidate(cand.id, !cand.verified, 'Verified', 98)}
                          className={`px-2 py-1 rounded text-[10px] font-bold ${
                            cand.verified ? 'bg-slate-700 text-slate-300' : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {cand.verified ? 'Verified ✓' : 'Approve'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ================= TAB 2: JOB MODERATION ================= */}
        {activeTab === 'jobs' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white">Job Postings Moderation</h2>
                <p className="text-xs text-slate-400">Approve, reject, feature, or suspend employer job vacancies.</p>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search job or company..."
                  value={searchJob}
                  onChange={(e) => setSearchJob(e.target.value)}
                  className="text-xs px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                />

                <select
                  value={filterJobStatus}
                  onChange={(e) => setFilterJobStatus(e.target.value)}
                  className="text-xs px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
                >
                  <option value="all">All Moderation Statuses</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Flagged">Flagged</option>
                </select>
              </div>
            </div>

            {/* Jobs Table */}
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Job Designation</th>
                      <th className="p-3.5">Employer / Company</th>
                      <th className="p-3.5">Domain</th>
                      <th className="p-3.5">Salary Offer</th>
                      <th className="p-3.5">Applicants</th>
                      <th className="p-3.5">Moderation Status</th>
                      <th className="p-3.5 text-right">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-medium">
                    {filteredJobs.map(job => (
                      <tr key={job.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3.5">
                          <div className="font-bold text-white">{job.title}</div>
                          <div className="text-[11px] text-slate-400">{job.location} ({job.area || 'Main'})</div>
                        </td>
                        <td className="p-3.5 font-semibold text-slate-200">
                          {job.company}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 text-[10px] font-bold">
                            {job.category}
                          </span>
                        </td>
                        <td className="p-3.5 text-emerald-400 font-bold">
                          {job.salaryDisplay.split(' /')[0]}
                        </td>
                        <td className="p-3.5 font-bold text-blue-400">
                          {job.applicantsCount || 0} applied
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            job.moderationStatus === 'Flagged'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : job.moderationStatus === 'Pending'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {job.moderationStatus || 'Approved'}
                          </span>
                          {job.featured && (
                            <span className="ml-1 px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-500/30 text-purple-300">
                              Featured ★
                            </span>
                          )}
                        </td>
                        <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleUpdateJobStatus(job.id, 'Approved', !job.featured)}
                            className="px-2.5 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-[10px] font-bold"
                          >
                            {job.featured ? 'Unfeature' : 'Feature ★'}
                          </button>
                          <button
                            onClick={() => handleUpdateJobStatus(job.id, 'Flagged', false)}
                            className="px-2.5 py-1 bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-700 rounded-lg text-[10px] font-bold"
                          >
                            Flag / Suspend
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

        {/* ================= TAB 3: CANDIDATE VERIFICATION ================= */}
        {activeTab === 'candidates' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-white">Candidate Verification & Trust Desk</h2>
                <p className="text-xs text-slate-400">Verify skill badges, review background verification, and set trust scores.</p>
              </div>

              <input
                type="text"
                placeholder="Search candidate name or skill..."
                value={searchCand}
                onChange={(e) => setSearchCand(e.target.value)}
                className="text-xs px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Candidates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCandidates.map(cand => (
                <div key={cand.id} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={cand.avatar} alt={cand.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-500 shadow-sm" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-white text-sm">{cand.name}</h3>
                            {cand.verified && <CheckCircle className="w-4 h-4 text-blue-400" />}
                          </div>
                          <p className="text-xs font-semibold text-purple-300">{cand.title}</p>
                          <p className="text-[11px] text-slate-400">{cand.location}</p>
                        </div>
                      </div>

                      <div className="bg-purple-900/40 border border-purple-700/50 px-2 py-1 rounded-lg text-center">
                        <span className="text-[10px] text-purple-300 font-bold block">Trust Score</span>
                        <span className="text-xs font-black text-emerald-400">{cand.trustScore || 95}%</span>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/50 space-y-1">
                      <p><strong>Category:</strong> {cand.category}</p>
                      <p><strong>Experience:</strong> {cand.experience} • <strong>Expected:</strong> {cand.expectedSalary}</p>
                      <p><strong>Mobile:</strong> {cand.phone} • <strong>Status:</strong> {cand.availability}</p>
                    </div>

                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {cand.skills && cand.skills.slice(0, 3).map((sk, idx) => (
                        <span key={idx} className="text-[10px] font-semibold bg-purple-900/30 text-purple-200 border border-purple-800 px-2 py-0.5 rounded">
                          ✓ {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Moderation Controls */}
                  <div className="pt-3 border-t border-slate-700 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleVerifyCandidate(cand.id, !cand.verified, cand.backgroundCheck || 'Verified', cand.trustScore || 96)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                        cand.verified 
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {cand.verified ? 'Revoke Badge' : 'Grant Verified Badge'}
                    </button>

                    <button
                      onClick={() => handleVerifyCandidate(cand.id, cand.verified, cand.backgroundCheck === 'Verified' ? 'In Progress' : 'Verified', 99)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
                    >
                      BG Check: {cand.backgroundCheck || 'Verified'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB 4: DISPUTES & REPORTS ================= */}
        {activeTab === 'reports' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-extrabold text-white">Dispute & Support Inquiries</h2>
              <p className="text-xs text-slate-400">Tickets and inquiries submitted by job seekers, HR recruiters, or automated safety scans.</p>
            </div>

            <div className="space-y-4">
              {reports.map(rep => (
                <div key={rep.id} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-white">{rep.title}</span>
                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${
                          rep.status === 'Resolved'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {rep.status}
                        </span>
                      </div>
                      <p className="text-xs text-purple-300 mt-0.5">
                        Filed by: <strong>{rep.reporterName}</strong> ({rep.reporterRole}) • Date: {rep.date}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateReport(rep.id, 'Resolved', 'Verified by Admin Sneha Kapoor.')}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                      >
                        Mark Resolved ✓
                      </button>
                      <button
                        onClick={() => handleUpdateReport(rep.id, 'Dismissed', 'Deemed non-actionable.')}
                        className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-xs font-bold"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {rep.details}
                  </p>

                  {rep.adminNotes && (
                    <div className="text-[11px] bg-slate-900 p-2.5 rounded-xl border border-slate-700 text-slate-400">
                      <strong className="text-slate-200">Admin Resolution Note:</strong> {rep.adminNotes}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= TAB 5: AFFILIATE PARTNERS & PAYOUTS ================= */}
        {activeTab === 'affiliates' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div>
              <h2 className="text-xl font-extrabold text-white">Affiliate Partners & Payout Desk</h2>
              <p className="text-xs text-slate-400">Manage user affiliate activations, track collected licensing fees, and approve UPI payouts.</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Talent Partners</span>
                <span className="text-2xl font-black text-white mt-1 block">{affiliatesData?.summary?.totalAffiliates || 0}</span>
                <span className="text-[11px] font-semibold text-purple-300 mt-0.5 block">Paid Onboarding Fee</span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Fees Collected</span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">
                  ₹{(affiliatesData?.summary?.totalFeesCollected || 0).toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] font-semibold text-emerald-300 mt-0.5 block">₹999 per license</span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Commission Earned</span>
                <span className="text-2xl font-black text-blue-400 mt-1 block">
                  ₹{(affiliatesData?.summary?.totalCommissionsEarned || 0).toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] font-semibold text-blue-300 mt-0.5 block">To talent scouts</span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending UPI Withdrawals</span>
                <span className="text-2xl font-black text-amber-400 mt-1 block">
                  ₹{(affiliatesData?.summary?.pendingPayoutsAmount || 0).toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] font-semibold text-amber-300 mt-0.5 block">
                  {affiliatesData?.summary?.pendingPayoutsCount || 0} requests awaiting transfer
                </span>
              </div>
            </div>

            {/* Payout Requests Queue Table */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                <h3 className="font-extrabold text-white text-sm">Payout Withdrawal Queue</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Partner Name</th>
                      <th className="p-3.5">Withdrawal Amount</th>
                      <th className="p-3.5">Destination UPI</th>
                      <th className="p-3.5">Request Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Admin Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-medium">
                    {affiliatesData?.payoutRequests?.map(p => (
                      <tr key={p.id} className="hover:bg-slate-800/50">
                        <td className="p-3.5 font-bold text-white">{p.userName}</td>
                        <td className="p-3.5 font-extrabold text-emerald-400">₹{p.amount.toLocaleString('en-IN')}</td>
                        <td className="p-3.5 font-mono text-purple-300">{p.upiId}</td>
                        <td className="p-3.5 text-slate-400">{new Date(p.requestedAt).toLocaleDateString()}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            p.status === 'Approved'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          {p.status === 'Pending' ? (
                            <>
                              <button
                                onClick={() => handleProcessPayout(p.id, 'Approved')}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold"
                              >
                                Approve & Transfer UPI
                              </button>
                              <button
                                onClick={() => handleProcessPayout(p.id, 'Rejected')}
                                className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-[10px] font-bold"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-[11px] text-slate-400 font-mono">Ref: {p.txnRef}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Active Partners List */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                <h3 className="font-extrabold text-white text-sm">Active Enrolled Affiliate Partners</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Partner Name</th>
                      <th className="p-3.5">Referral Code</th>
                      <th className="p-3.5">Fee Paid</th>
                      <th className="p-3.5">Total Earned</th>
                      <th className="p-3.5">Wallet Balance</th>
                      <th className="p-3.5">Referrals Count</th>
                      <th className="p-3.5 text-right">Payment Txn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-medium">
                    {affiliatesData?.affiliates?.map(a => (
                      <tr key={a.id} className="hover:bg-slate-800/50">
                        <td className="p-3.5 font-bold text-white">{a.userName}</td>
                        <td className="p-3.5 font-mono text-blue-300 font-bold">{a.referralCode}</td>
                        <td className="p-3.5 text-emerald-400 font-bold">₹{a.feePaid} (Paid)</td>
                        <td className="p-3.5 font-bold text-white">₹{a.totalEarned.toLocaleString('en-IN')}</td>
                        <td className="p-3.5 font-bold text-emerald-300">₹{a.walletBalance.toLocaleString('en-IN')}</td>
                        <td className="p-3.5 font-bold text-purple-300">{a.referrals?.length || 0}</td>
                        <td className="p-3.5 text-right font-mono text-[10px] text-slate-400">{a.txnId}</td>
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
