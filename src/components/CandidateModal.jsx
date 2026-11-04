import React from 'react';
import { 
  X, 
  MapPin, 
  Briefcase, 
  CheckCircle, 
  Star, 
  Phone, 
  Mail, 
  MessageSquare, 
  Sparkles, 
  Award, 
  Clock, 
  Printer, 
  Share2, 
  ShieldCheck, 
  IndianRupee,
  GraduationCap
} from 'lucide-react';

export default function CandidateModal({ 
  candidate, 
  onClose, 
  onOpenMessageWithCandidate 
}) {
  if (!candidate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 animate-in zoom-in-95 duration-150">
        
        {/* Header bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md">
              Digital Skill Card & CV
            </span>
            <span className="text-xs font-semibold text-slate-400">ID: SKILL-{candidate.id.replace('user-cand-', '')}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Digital Skill Card Container (Printable) */}
        <div className="mt-6 border-2 border-slate-200 rounded-2xl p-6 bg-gradient-to-br from-white to-slate-50 relative overflow-hidden shadow-sm">
          
          {/* Top Banner inside card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-slate-900">{candidate.name}</h2>
                  {candidate.verified && (
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Skill
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-blue-600">{candidate.title}</p>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  {candidate.location} {candidate.locality && `(${candidate.locality})`}
                </p>
              </div>
            </div>

            {/* Quick Rating Badge */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 text-center shrink-0">
              <div className="flex items-center justify-center gap-1 text-sm font-extrabold text-amber-900">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>{candidate.rating || 4.9}</span>
              </div>
              <span className="text-[10px] text-amber-700 font-semibold">{candidate.reviewsCount || 15} Verified Reviews</span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Experience</span>
              <span className="font-extrabold text-slate-800">{candidate.experience}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Expected Salary</span>
              <span className="font-extrabold text-emerald-700">{candidate.expectedSalary}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Availability</span>
              <span className="font-extrabold text-slate-800">{candidate.availability}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Shift Mode</span>
              <span className="font-extrabold text-slate-800">{candidate.shift || 'Full-time'}</span>
            </div>
          </div>

          {/* Bio Summary */}
          <div className="py-4 border-b border-slate-200">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Professional Summary & Specialization
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {candidate.bio}
            </p>
          </div>

          {/* Skills Breakdown */}
          <div className="py-4 border-b border-slate-200">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Verified Practical Skills & Tools
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {candidate.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold rounded-lg"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education & Qualifications */}
          <div className="pt-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <GraduationCap className="w-4 h-4 text-slate-400" />
              <span><strong>Education:</strong> {candidate.education || 'High School / Vocational Certification'}</span>
            </div>
          </div>

          {/* Direct Contact Bar */}
          <div className="mt-5 p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-slate-700">
              <span className="flex items-center gap-1.5 font-bold">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                {candidate.phone}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {candidate.email}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a 
                href={`tel:${candidate.phone}`}
                className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 rounded-lg font-bold"
              >
                Call
              </a>
              <a 
                href={`https://wa.me/${candidate.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
              >
                WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            Print Digital Skill Card
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenMessageWithCandidate(candidate);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              Chat Directly with Candidate
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
