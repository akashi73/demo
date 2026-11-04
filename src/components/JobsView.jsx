import React, { useState } from 'react';
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  IndianRupee, 
  CheckCircle, 
  Zap, 
  ShieldCheck, 
  Building2, 
  Share2, 
  Bookmark, 
  Send, 
  User, 
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Calendar,
  MessageSquare
} from 'lucide-react';

export default function JobsView({
  jobs,
  selectedJob,
  setSelectedJob,
  currentUser,
  onApplyJob,
  hasApplied,
  onOpenMessageWithRecruiter,
  filterJobType,
  setFilterJobType,
  urgentOnly,
  setUrgentOnly
}) {
  const [applyNote, setApplyNote] = useState('');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [savedJobs, setSavedJobs] = useState(currentUser.savedJobIds || []);

  const toggleSave = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const currentSelected = selectedJob || (jobs.length > 0 ? jobs[0] : null);

  // Calculate skill match percentage if current user is a candidate
  const calculateSkillMatch = (jobSkills = []) => {
    if (!currentUser || currentUser.role !== 'candidate' || !currentUser.skills) return null;
    const userSkillsLower = currentUser.skills.map(s => s.toLowerCase());
    const matches = jobSkills.filter(s => 
      userSkillsLower.some(us => us.includes(s.toLowerCase()) || s.toLowerCase().includes(us))
    );
    const score = Math.round((matches.length / (jobSkills.length || 1)) * 100);
    return { score, matchingSkills: matches };
  };

  const skillMatch = currentSelected ? calculateSkillMatch(currentSelected.skills) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Filter & View Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Explore Open Vacancies
          </h2>
          <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
            {jobs.length} Available
          </span>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setUrgentOnly(!urgentOnly)}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
              urgentOnly 
                ? 'bg-amber-500 text-white shadow-sm' 
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            Urgent Hiring Only
          </button>

          <select
            value={filterJobType}
            onChange={(e) => setFilterJobType(e.target.value)}
            className="px-3 py-1.5 rounded-lg font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 focus:outline-none"
          >
            <option value="all">All Job Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No jobs match your criteria</h3>
          <p className="text-sm text-slate-500 mt-1">Try clearing your filters or searching for another skill like "Housekeeping", "Electrician" or "Admin".</p>
        </div>
      ) : (
        /* Indeed / Naukri 2-Column Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Job Cards List */}
          <div className="lg:col-span-5 space-y-3.5 max-h-[820px] overflow-y-auto pr-1">
            {jobs.map((job) => {
              const isSelected = currentSelected && currentSelected.id === job.id;
              const isApplied = hasApplied(job.id);
              const isSaved = savedJobs.includes(job.id);

              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`bg-white rounded-xl p-4 border transition-all cursor-pointer relative card-hover ${
                    isSelected 
                      ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Urgent / Applied banner */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                      {job.urgent && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md">
                          <Zap className="w-2.5 h-2.5 fill-current" />
                          Urgent
                        </span>
                      )}
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {job.category}
                      </span>
                    </div>

                    {isApplied ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Applied
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400">
                        {job.openings} Openings
                      </span>
                    )}
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 line-clamp-1">
                    {job.title}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-600">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-semibold text-slate-800 truncate">{job.company}</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" title="Verified Recruiter" />
                  </div>

                  {/* Highlights Grid */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                      <IndianRupee className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{String(job.salaryDisplay || '₹20,000 / month').split(' /')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{String(job.location || 'India').split(',')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{job.minExp}-{job.maxExp} Yrs Exp</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{job.jobType}</span>
                    </div>
                  </div>

                  {/* Skill Chips */}
                  <div className="mt-2.5 flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map((sk, idx) => (
                      <span 
                        key={idx}
                        className="text-[10px] font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded"
                      >
                        {sk}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-medium px-1">
                        +{job.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Bottom micro info */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Posted {job.postedDate}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(job.id);
                        }}
                        className={`p-1 rounded hover:bg-slate-100 ${isSaved ? 'text-blue-600' : 'text-slate-400'}`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Job View */}
          <div className="lg:col-span-7">
            {currentSelected ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm sticky top-24">
                
                {/* Header with Company Logo & Title */}
                <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-100">
                  <div className="flex items-start gap-3.5">
                    <img 
                      src={currentSelected.logo} 
                      alt={currentSelected.company} 
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-sm shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                          {currentSelected.category}
                        </span>
                        {currentSelected.urgent && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                            <Zap className="w-3 h-3 fill-current" />
                            Urgent Requirement
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                        {currentSelected.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                        <span className="font-bold text-slate-800">{currentSelected.company}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          {currentSelected.location} {currentSelected.area && `(${currentSelected.area})`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSave(currentSelected.id)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600"
                    title="Bookmark this job"
                  >
                    <Bookmark className={`w-5 h-5 ${savedJobs.includes(currentSelected.id) ? 'fill-blue-600 text-blue-600' : ''}`} />
                  </button>
                </div>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5 py-3 px-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Monthly Salary</span>
                    <span className="text-sm font-extrabold text-emerald-700">
                      {String(currentSelected.salaryDisplay || '₹20,000 / month').split(' /')[0]}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Experience</span>
                    <span className="text-sm font-bold text-slate-800">
                      {currentSelected.minExp} - {currentSelected.maxExp} Years
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Job Type / Mode</span>
                    <span className="text-sm font-bold text-slate-800">
                      {currentSelected.jobType} • {currentSelected.workMode}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vacancies</span>
                    <span className="text-sm font-bold text-blue-600">
                      {currentSelected.openings} Openings
                    </span>
                  </div>
                </div>

                {/* Skill Match Analyzer (if logged in as candidate) */}
                {skillMatch && (
                  <div className="mb-5 p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-bold text-slate-800">
                          Your Skill Match with {currentUser.name}:
                        </span>
                      </div>
                      <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                        skillMatch.score >= 60 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {skillMatch.score}% Match
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-2">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          skillMatch.score >= 60 ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${Math.max(skillMatch.score, 15)}%` }}
                      ></div>
                    </div>

                    <p className="text-[11px] text-slate-600">
                      {skillMatch.matchingSkills.length > 0 ? (
                        <>Matching verified skills: <strong className="text-slate-800">{skillMatch.matchingSkills.join(', ')}</strong></>
                      ) : (
                        "Take our 1-min skill quiz to earn badges matching this requirement."
                      )}
                    </p>
                  </div>
                )}

                {/* Action CTA Bar */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {hasApplied(currentSelected.id) ? (
                    <div className="flex-1 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      Application Submitted! HR is reviewing your profile
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowApplyModal(true)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold px-6 py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-98 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      1-Click Instant Apply
                    </button>
                  )}

                  <button
                    onClick={() => onOpenMessageWithRecruiter(currentSelected)}
                    className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-sm flex items-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-600" />
                    Chat with HR
                  </button>
                </div>

                {/* Job Description & Requirements */}
                <div className="space-y-5 max-h-[360px] overflow-y-auto pr-2">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Job Description</h4>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-line">
                      {currentSelected.description}
                    </p>
                  </div>

                  {/* Required Skills */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Required Skills & Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentSelected.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits & Perks */}
                  {currentSelected.benefits && currentSelected.benefits.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Company Benefits & Perks</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentSelected.benefits.map((benefit, index) => (
                          <div 
                            key={index}
                            className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recruiter / Company Information */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div>
                      <span className="font-bold text-slate-800">{currentSelected.company}</span>
                      <p className="text-[11px] text-slate-400">Direct hiring • No recruitment agency fee</p>
                    </div>
                    <span className="bg-slate-100 px-2.5 py-1 rounded text-slate-600 font-semibold">
                      {currentSelected.applicantsCount || 0} applied
                    </span>
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>
      )}

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Apply for Position</h3>
                <p className="text-xs text-slate-500">{currentSelected.title} at {currentSelected.company}</p>
              </div>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-3">
              <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-blue-900">
                <p className="font-bold mb-1">Applying as: {currentUser.name} ({currentUser.role === 'candidate' ? currentUser.title : 'Applicant'})</p>
                <p>Phone: {currentUser.phone || '+91 98201 44521'} • Experience: {currentUser.experience || '3 Years'}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message to HR Recruiter (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. I have 4 years experience in commercial deep cleaning and machine operation. Available to join immediately."
                  value={applyNote}
                  onChange={(e) => setApplyNote(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onApplyJob(currentSelected.id, applyNote);
                  setShowApplyModal(false);
                  setApplyNote('');
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/25"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
