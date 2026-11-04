import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  CheckCircle, 
  Clock, 
  Calendar, 
  MessageSquare, 
  AlertCircle, 
  Award, 
  User, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function CandidateDashboard({
  currentUser,
  applications,
  onOpenMessageWithRecruiter,
  onOpenQuiz,
  onOpenEditProfile
}) {
  // Filter applications for current candidate
  const myApplications = applications.filter(a => a.candidateId === currentUser.id);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Hired':
        return { label: 'Hired / Offer Letter Rolled Out', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'Interview Scheduled':
        return { label: 'Interview Scheduled', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'Shortlisted':
        return { label: 'Shortlisted for Next Round', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'Rejected':
        return { label: 'Not Selected', bg: 'bg-rose-100 text-rose-800 border-rose-200' };
      default:
        return { label: 'Under Review by HR', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
    }
  };

  const getStepNumber = (status) => {
    switch (status) {
      case 'Shortlisted': return 2;
      case 'Interview Scheduled': return 3;
      case 'Hired': return 4;
      default: return 1;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Profile Overview Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{currentUser.name}</h1>
                {currentUser.verified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Skill Badge Active
                  </span>
                ) : (
                  <button
                    onClick={onOpenQuiz}
                    className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded hover:bg-amber-200"
                  >
                    Take Skill Test (Get Badge)
                  </button>
                )}
              </div>
              <p className="text-xs font-semibold text-blue-600 mt-0.5">
                {currentUser.title} • {currentUser.category}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-rose-500" />
                {currentUser.location} • Experience: <strong className="text-slate-700">{currentUser.experience}</strong> • Expected: <strong className="text-emerald-700">{currentUser.expectedSalary}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenQuiz}
              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Award className="w-4 h-4 text-amber-600" />
              Retake Skill Quiz
            </button>
          </div>
        </div>

        {/* Skills listed */}
        <div className="pt-4 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 mr-2">Registered Skills:</span>
          {currentUser.skills && currentUser.skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-md border border-slate-200"
            >
              ✓ {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Applications Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-600" />
              My Job Applications ({myApplications.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live status tracking directly updated by company HR teams.
            </p>
          </div>
        </div>

        {myApplications.length === 0 ? (
          <div className="text-center py-12 max-w-md mx-auto">
            <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No applications yet</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Browse vacancies in your skill domain and apply with 1 click to get interviewed.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {myApplications.map(app => {
              const badge = getStatusBadge(app.status);
              const step = getStepNumber(app.status);

              return (
                <div
                  key={app.id}
                  className="bg-slate-50/60 rounded-2xl p-5 border border-slate-200 space-y-4"
                >
                  {/* Top Job Info & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={app.companyLogo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&auto=format&fit=crop&q=80'}
                        alt={app.company}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-white"
                      />
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm">{app.jobTitle}</h3>
                        <p className="text-xs font-bold text-slate-600">{app.company} • {app.jobLocation}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Applied on {new Date(app.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-xl border ${badge.bg}`}>
                        {badge.label}
                      </span>
                      <button
                        onClick={() => onOpenMessageWithRecruiter({ companyId: app.companyId, company: app.company, title: app.jobTitle })}
                        className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-blue-600"
                        title="Chat with Recruiter"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 4-Step Progress Tracker */}
                  <div className="py-2">
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
                      <div className={`p-1.5 rounded-lg border ${step >= 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-400 border-slate-200'}`}>
                        1. Applied
                      </div>
                      <div className={`p-1.5 rounded-lg border ${step >= 2 ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-400 border-slate-200'}`}>
                        2. Shortlisted
                      </div>
                      <div className={`p-1.5 rounded-lg border ${step >= 3 ? 'bg-amber-600 text-white border-amber-600' : 'bg-white text-slate-400 border-slate-200'}`}>
                        3. Interview
                      </div>
                      <div className={`p-1.5 rounded-lg border ${step >= 4 ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white text-slate-400 border-slate-200'}`}>
                        4. Hired / Offer
                      </div>
                    </div>
                  </div>

                  {/* Interview Information Card (if scheduled) */}
                  {app.interviewDate && (
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <span className="font-extrabold text-amber-900 flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-amber-600" />
                          Interview Scheduled: {new Date(app.interviewDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                        </span>
                        <p className="text-amber-800 text-[11px] mt-0.5">
                          Venue: <strong>{app.interviewLocation}</strong>
                        </p>
                      </div>

                      <div className="text-[11px] font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-lg">
                        Please keep ID & Certificates ready
                      </div>
                    </div>
                  )}

                  {/* Recruiter Feedback / Notes */}
                  {app.recruiterNotes && (
                    <div className="text-xs bg-white p-3 rounded-xl border border-slate-200 text-slate-600">
                      <span className="font-bold text-slate-800">Recruiter Feedback: </span>
                      {app.recruiterNotes}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
