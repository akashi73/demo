import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MapPin, 
  Briefcase, 
  CheckCircle, 
  Star, 
  Phone, 
  Mail, 
  MessageSquare, 
  Sparkles, 
  Filter, 
  ShieldCheck, 
  IndianRupee, 
  UserCheck, 
  Clock, 
  SendHorizontal,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function TalentDirectory({
  candidates,
  categories,
  currentUser,
  hrJobs = [],
  onSelectCandidate,
  onOpenMessageWithCandidate,
  onInviteCandidate
}) {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [minExpFilter, setMinExpFilter] = useState('0');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [inviteModalCandidate, setInviteModalCandidate] = useState(null);
  const [selectedJobToInvite, setSelectedJobToInvite] = useState('');

  // Filter candidates
  const filtered = candidates.filter(cand => {
    if (categoryFilter !== 'all' && cand.category !== categoryFilter) return false;
    if (availableOnly && !cand.availability.toLowerCase().includes('immediate')) return false;
    if (minExpFilter !== '0' && (cand.experienceYears || 0) < Number(minExpFilter)) return false;

    if (locationFilter) {
      const loc = locationFilter.toLowerCase();
      const match = (cand.location && cand.location.toLowerCase().includes(loc)) ||
                    (cand.locality && cand.locality.toLowerCase().includes(loc));
      if (!match) return false;
    }

    if (search) {
      const s = search.toLowerCase();
      const match = cand.name.toLowerCase().includes(s) ||
                    (cand.title && cand.title.toLowerCase().includes(s)) ||
                    (cand.skills && cand.skills.some(sk => sk.toLowerCase().includes(s))) ||
                    (cand.bio && cand.bio.toLowerCase().includes(s));
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner for HR Talent Pool */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              Direct Recruiter Access • Naukri Resdex & Apna Style
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Candidate Skill Database
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Search and hire skilled workers, technicians, facility staff, office assistants, and specialists directly. Zero agency commission.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/15">
            <div>
              <p className="text-2xl font-extrabold text-white">{candidates.length}</p>
              <p className="text-xs text-slate-300">Verified Profiles</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <p className="text-2xl font-extrabold text-emerald-400">100%</p>
              <p className="text-xs text-slate-300">Direct Contact</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Keyword / Skill Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Search skill (e.g. Deep Cleaning, Tally)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Skill Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              placeholder="Filter City (e.g. Mumbai, Delhi)..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Min Experience */}
          <div>
            <select
              value={minExpFilter}
              onChange={(e) => setMinExpFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="0">Any Experience</option>
              <option value="1">1+ Year Experience</option>
              <option value="2">2+ Years Experience</option>
              <option value="3">3+ Years Experience</option>
              <option value="5">5+ Years Experience</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Badges */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAvailableOnly(!availableOnly)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                availableOnly 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Immediately Available Only
            </button>

            {(search || categoryFilter !== 'all' || locationFilter || minExpFilter !== '0' || availableOnly) && (
              <button
                onClick={() => {
                  setSearch('');
                  setCategoryFilter('all');
                  setLocationFilter('');
                  setMinExpFilter('0');
                  setAvailableOnly(false);
                }}
                className="text-xs text-blue-600 hover:underline font-semibold"
              >
                Reset All Filters
              </button>
            )}
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{filtered.length}</strong> candidates
          </span>
        </div>
      </div>

      {/* Candidate Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No matching candidates found</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the filters or searching for another skill.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(cand => (
            <div
              key={cand.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between card-hover"
            >
              <div>
                {/* Top Avatar & Badges */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={cand.avatar}
                      alt={cand.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="font-extrabold text-slate-900 text-sm hover:text-blue-600 cursor-pointer"
                          onClick={() => onSelectCandidate(cand)}
                        >
                          {cand.name}
                        </h3>
                        {cand.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" title="Verified Skill" />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-blue-600 line-clamp-1">{cand.title}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-xs font-bold text-amber-800">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                    <span>{cand.rating || 4.8}</span>
                  </div>
                </div>

                {/* Key specs badge */}
                <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3">
                  <div className="flex items-center gap-1 text-slate-600">
                    <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                    <span className="truncate">{String(cand.location || 'India').split(',')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{cand.experience || '1 Year'} Exp</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-emerald-700">
                    <IndianRupee className="w-3 h-3 shrink-0" />
                    <span>Exp. {String(cand.expectedSalary || '₹20,000 / month').split(' /')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate text-emerald-700 font-semibold">{cand.availability || 'Immediate'}</span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="mb-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Verified Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {cand.skills.slice(0, 4).map((sk, idx) => (
                      <span 
                        key={idx}
                        className="text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 rounded-md"
                      >
                        {sk}
                      </span>
                    ))}
                    {cand.skills.length > 4 && (
                      <span className="text-[10px] text-slate-400 font-semibold px-1">
                        +{cand.skills.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Bio Excerpt */}
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed italic">
                  "{cand.bio}"
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onSelectCandidate(cand)}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                >
                  Full Profile
                </button>

                <button
                  onClick={() => onOpenMessageWithCandidate(cand)}
                  className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-colors border border-blue-200"
                  title="Direct Message"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>

                {currentUser.role === 'hr' && (
                  <button
                    onClick={() => {
                      setInviteModalCandidate(cand);
                      if (hrJobs.length > 0) setSelectedJobToInvite(hrJobs[0].id);
                    }}
                    className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-blue-500/20 flex items-center gap-1"
                  >
                    <SendHorizontal className="w-3.5 h-3.5" />
                    Invite
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invite Modal for HR */}
      {inviteModalCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Invite {inviteModalCandidate.name} to Apply
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Select one of your company's active job vacancies to invite this candidate directly.
            </p>

            {hrJobs.length === 0 ? (
              <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-lg border border-amber-200">
                You do not have any active job posts yet. Please post a job first!
              </p>
            ) : (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">Select Job Post</label>
                <select
                  value={selectedJobToInvite}
                  onChange={(e) => setSelectedJobToInvite(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                >
                  {hrJobs.map(j => (
                    <option key={j.id} value={j.id}>
                      {j.title} ({String(j.location || '').split(',')[0]} - {String(j.salaryDisplay || '').split(' /')[0]})
                    </option>
                  ))}
                </select>

                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => setInviteModalCandidate(null)}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      onInviteCandidate(inviteModalCandidate, selectedJobToInvite);
                      setInviteModalCandidate(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                  >
                    Send Invitation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
