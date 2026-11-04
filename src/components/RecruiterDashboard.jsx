import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  Users, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Phone, 
  Mail, 
  MessageSquare, 
  Sparkles, 
  ArrowRight, 
  Trash2, 
  UserCheck, 
  PlusCircle,
  FileText,
  Filter
} from 'lucide-react';

export default function RecruiterDashboard({
  currentUser,
  jobs,
  applications,
  onUpdateAppStatus,
  onOpenPostJob,
  onSelectCandidate,
  onOpenMessageWithCandidate,
  onDeleteJob
}) {
  const [selectedJobFilter, setSelectedJobFilter] = useState('all');
  const [interviewModalApp, setInterviewModalApp] = useState(null);
  const [interviewDate, setInterviewDate] = useState('2026-10-28T11:00');
  const [interviewLocation, setInterviewLocation] = useState('Office Reception / Online Meet');
  const [editingNotesAppId, setEditingNotesAppId] = useState(null);
  const [notesText, setNotesText] = useState('');

  // Filter jobs for current HR user or show all if demo
  const hrJobs = currentUser.role === 'hr' 
    ? jobs.filter(j => j.companyId === currentUser.id || j.company.includes(String(currentUser.company || '').split(' ')[0] || ''))
    : jobs;

  // Filter applications for these jobs
  const relevantApps = applications.filter(app => {
    if (selectedJobFilter !== 'all' && app.jobId !== selectedJobFilter) return false;
    return hrJobs.some(j => j.id === app.jobId);
  });

  const stages = [
    { key: 'Applied', title: '📥 Applied (Screening)', color: 'bg-blue-50 border-blue-200 text-blue-800' },
    { key: 'Shortlisted', title: '🌟 Shortlisted', color: 'bg-indigo-50 border-indigo-200 text-indigo-800' },
    { key: 'Interview Scheduled', title: '📅 Interview Scheduled', color: 'bg-amber-50 border-amber-200 text-amber-800' },
    { key: 'Hired', title: '🤝 Hired / Offer Made', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' }
  ];

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!interviewModalApp) return;

    onUpdateAppStatus(interviewModalApp.id, {
      status: 'Interview Scheduled',
      interviewDate,
      interviewLocation
    });

    setInterviewModalApp(null);
  };

  const handleSaveNotes = (appId) => {
    onUpdateAppStatus(appId, { recruiterNotes: notesText });
    setEditingNotesAppId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Recruiter Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.companyLogo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser.company || 'Company'}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentUser.company || 'Employer Hiring Dashboard'}
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  <CheckCircle className="w-3 h-3 text-blue-600" />
                  Verified Employer
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                Recruiter: <strong className="text-slate-800">{currentUser.name}</strong> • {currentUser.companyIndustry || 'Facility Management & Services'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPostJob}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Post New Requirement
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 text-center">
          <div className="p-3 bg-slate-50 rounded-xl">
            <span className="text-2xl font-extrabold text-slate-900">{hrJobs.length}</span>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Active Job Postings</p>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl">
            <span className="text-2xl font-extrabold text-blue-700">{relevantApps.length}</span>
            <p className="text-xs font-semibold text-blue-600 mt-0.5">Total Applications</p>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl">
            <span className="text-2xl font-extrabold text-amber-700">
              {relevantApps.filter(a => a.status === 'Interview Scheduled').length}
            </span>
            <p className="text-xs font-semibold text-amber-600 mt-0.5">Interviews Line-up</p>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl">
            <span className="text-2xl font-extrabold text-emerald-700">
              {relevantApps.filter(a => a.status === 'Hired').length}
            </span>
            <p className="text-xs font-semibold text-emerald-600 mt-0.5">Hired Candidates</p>
          </div>
        </div>
      </div>

      {/* Active Jobs Management Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Your Active Postings ({hrJobs.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hrJobs.map(job => (
            <div 
              key={job.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                    {job.category}
                  </span>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {job.applicantsCount || 0} Applicants
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{job.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{job.location} • {String(job.salaryDisplay || '₹20,000 / month').split(' /')[0]}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedJobFilter(job.id)}
                  className={`text-xs font-bold ${selectedJobFilter === job.id ? 'text-blue-700 underline' : 'text-slate-600 hover:text-blue-600'}`}
                >
                  View Pipeline →
                </button>

                <button
                  onClick={() => onDeleteJob(job.id)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded"
                  title="Delete job posting"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ATS Pipeline Header & Filter */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              Applicant Tracking System (ATS Pipeline)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Screen, shortlist, schedule interviews, and roll out hiring offers in real time.
            </p>
          </div>

          {/* Job Filter Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Filter by Vacancy:</span>
            <select
              value={selectedJobFilter}
              onChange={(e) => setSelectedJobFilter(e.target.value)}
              className="text-xs font-semibold p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Vacancies ({relevantApps.length} applicants)</option>
              {hrJobs.map(j => (
                <option key={j.id} value={j.id}>{j.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ATS Columns Funnel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {stages.map(stage => {
            const stageApps = relevantApps.filter(a => a.status === stage.key);

            return (
              <div 
                key={stage.key}
                className="bg-slate-50/80 rounded-2xl p-3 border border-slate-200 flex flex-col"
              >
                {/* Column Title */}
                <div className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-between mb-3 ${stage.color}`}>
                  <span>{stage.title}</span>
                  <span className="bg-white/70 px-2 py-0.5 rounded-full text-[11px] font-extrabold">
                    {stageApps.length}
                  </span>
                </div>

                {/* Candidate Cards in Stage */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
                  {stageApps.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs italic">
                      No candidates in this stage
                    </div>
                  ) : (
                    stageApps.map(app => (
                      <div
                        key={app.id}
                        className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-2.5"
                      >
                        {/* Candidate Avatar & Name */}
                        <div className="flex items-center gap-2.5">
                          <img
                            src={app.candidateAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                            alt={app.candidateName}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div className="truncate">
                            <h4 
                              onClick={() => onSelectCandidate({ id: app.candidateId, name: app.candidateName, avatar: app.candidateAvatar, title: app.jobTitle, skills: app.candidateSkills, phone: app.candidatePhone, email: app.candidateEmail, experience: app.candidateExperience, expectedSalary: app.candidateExpectedSalary, location: app.jobLocation, bio: app.recruiterNotes })}
                              className="font-bold text-slate-900 text-xs hover:text-blue-600 cursor-pointer truncate"
                            >
                              {app.candidateName}
                            </h4>
                            <p className="text-[10px] text-slate-500 truncate">{app.jobTitle}</p>
                          </div>
                        </div>

                        {/* Specs */}
                        <div className="text-[10px] text-slate-600 bg-slate-50 p-2 rounded-lg flex items-center justify-between">
                          <span>💼 {app.candidateExperience || '2 Yrs Exp'}</span>
                          <span className="font-bold text-emerald-700">{app.candidateExpectedSalary || '₹22,000/mo'}</span>
                        </div>

                        {/* Interview Details if Scheduled */}
                        {app.interviewDate && (
                          <div className="bg-amber-50 border border-amber-200 p-2 rounded-lg text-[10px] text-amber-900">
                            <p className="font-bold flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-amber-600" />
                              Interview: {new Date(app.interviewDate).toLocaleDateString()} at {new Date(app.interviewDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-slate-600 mt-0.5 truncate">📍 {app.interviewLocation}</p>
                          </div>
                        )}

                        {/* Recruiter Notes */}
                        <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          {editingNotesAppId === app.id ? (
                            <div className="space-y-1.5">
                              <textarea
                                value={notesText}
                                onChange={(e) => setNotesText(e.target.value)}
                                className="w-full p-1 text-xs border rounded"
                                rows="2"
                              />
                              <div className="flex gap-1 justify-end">
                                <button
                                  onClick={() => setEditingNotesAppId(null)}
                                  className="text-[10px] text-slate-400 hover:text-slate-600 px-1"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleSaveNotes(app.id)}
                                  className="text-[10px] font-bold text-blue-600 px-1.5 py-0.5 bg-blue-50 rounded"
                                >
                                  Save Note
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div 
                              onClick={() => {
                                setEditingNotesAppId(app.id);
                                setNotesText(app.recruiterNotes || '');
                              }}
                              className="cursor-pointer hover:text-slate-700"
                              title="Click to edit notes"
                            >
                              <span className="font-semibold text-slate-700">Notes: </span>
                              {app.recruiterNotes || 'Click to add internal note...'}
                            </div>
                          )}
                        </div>

                        {/* Action buttons & Stage Shift */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                          <select
                            value={app.status}
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              if (newStatus === 'Interview Scheduled') {
                                setInterviewModalApp(app);
                              } else {
                                onUpdateAppStatus(app.id, { status: newStatus });
                              }
                            }}
                            className="text-[10px] font-bold py-1 px-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none"
                          >
                            <option value="Applied">Move: Applied</option>
                            <option value="Shortlisted">Move: Shortlist</option>
                            <option value="Interview Scheduled">Schedule Interview</option>
                            <option value="Hired">Hire / Offer</option>
                            <option value="Rejected">Reject</option>
                          </select>

                          <button
                            onClick={() => onOpenMessageWithCandidate({ id: app.candidateId, name: app.candidateName })}
                            className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                            title="Chat with applicant"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {interviewModalApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Schedule Interview with {interviewModalApp.candidateName}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Position: {interviewModalApp.jobTitle}
            </p>

            <form onSubmit={handleScheduleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Interview Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location or Meeting Link</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UrbanAssist Andheri HQ, or Google Meet link"
                  value={interviewLocation}
                  onChange={(e) => setInterviewLocation(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setInterviewModalApp(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                >
                  Confirm Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
