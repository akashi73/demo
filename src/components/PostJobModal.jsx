import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  Building2, 
  MapPin, 
  IndianRupee, 
  Zap, 
  Sparkles, 
  Plus, 
  CheckCircle2,
  Clock
} from 'lucide-react';

export default function PostJobModal({ 
  isOpen, 
  onClose, 
  categories, 
  currentUser,
  onJobCreated 
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    title: '',
    company: currentUser.role === 'hr' ? currentUser.company : 'UrbanAssist Facility Services',
    companyId: currentUser.role === 'hr' ? currentUser.id : 'user-hr-1',
    category: 'Facility & Housekeeping',
    location: 'Mumbai, Maharashtra',
    area: 'Andheri East',
    jobType: 'Full Time',
    workMode: 'On-site',
    minExp: '1',
    maxExp: '3',
    salaryMin: '20000',
    salaryMax: '28000',
    openings: '3',
    urgent: true,
    skillsInput: 'Deep Cleaning, Floor Buffing, Sanitation',
    benefitsInput: 'PF & ESIC, Overtime Pay (1.5x), Free Uniform, Monthly Attendance Bonus',
    description: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const perkPresets = [
    'PF & ESIC', 
    'Free Food & Accommodation', 
    'Overtime Pay (1.5x)', 
    'Travel / Cab Allowance', 
    'Health Insurance', 
    'Monthly Attendance Bonus'
  ];

  const handleAddPerk = (perk) => {
    const list = formData.benefitsInput.split(',').map(s => s.trim()).filter(Boolean);
    if (!list.includes(perk)) {
      setFormData({
        ...formData,
        benefitsInput: [...list, perk].join(', ')
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.company.trim()) {
      setError('Job Title and Company Name are required.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const payload = {
        title: formData.title,
        company: formData.company,
        companyId: formData.companyId,
        category: formData.category,
        location: formData.location,
        area: formData.area,
        jobType: formData.jobType,
        workMode: formData.workMode,
        minExp: Number(formData.minExp) || 0,
        maxExp: Number(formData.maxExp) || 3,
        salaryMin: Number(formData.salaryMin) || 18000,
        salaryMax: Number(formData.salaryMax) || 25000,
        openings: Number(formData.openings) || 1,
        urgent: Boolean(formData.urgent),
        skills: formData.skillsInput.split(',').map(s => s.trim()).filter(Boolean),
        benefits: formData.benefitsInput.split(',').map(s => s.trim()).filter(Boolean),
        description: formData.description || `Immediate requirement for ${formData.title} at ${formData.company}. Competitive salary with verified benefits.`
      };

      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to create job posting');

      const newJob = await res.json();
      onJobCreated(newJob);
      onClose();
    } catch (err) {
      setError(err.message || 'Error creating job');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md mb-1">
              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
              HR & Employer Job Posting
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Post a New Requirement</h2>
            <p className="text-xs text-slate-500">Reach skilled applicants directly across India within minutes.</p>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          
          {/* Job Title & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Job Designation / Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Housekeeping Lead, HVAC Tech"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company / Facility Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. UrbanAssist Facilities"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Category & Openings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Skill Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Openings / Vacancies</label>
              <input
                type="number"
                min="1"
                value={formData.openings}
                onChange={(e) => setFormData({ ...formData, openings: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Location & Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">City / Region *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mumbai, Delhi NCR, Bangalore"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Locality / Landmark</label>
              <input
                type="text"
                placeholder="e.g. Andheri East, Cyber City"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Salary Min & Max */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Min Salary (₹/month)</label>
              <input
                type="number"
                step="1000"
                value={formData.salaryMin}
                onChange={(e) => setFormData({ ...formData, salaryMin: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Max Salary (₹/month)</label>
              <input
                type="number"
                step="1000"
                value={formData.salaryMax}
                onChange={(e) => setFormData({ ...formData, salaryMax: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Experience Range & Urgent flag */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Min Exp (Yrs)</label>
              <input
                type="number"
                min="0"
                value={formData.minExp}
                onChange={(e) => setFormData({ ...formData, minExp: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Max Exp (Yrs)</label>
              <input
                type="number"
                min="0"
                value={formData.maxExp}
                onChange={(e) => setFormData({ ...formData, maxExp: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="pb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.urgent}
                  onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  Urgent Hiring
                </span>
              </label>
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Required Skills & Machine Knowledge (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Deep Cleaning, Floor Scrubbing Machine, Chemical Safety"
              value={formData.skillsInput}
              onChange={(e) => setFormData({ ...formData, skillsInput: e.target.value })}
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Benefits & Perks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Perks, Benefits & Allowances
            </label>
            <input
              type="text"
              placeholder="e.g. PF & ESIC, Overtime Pay, Food Allowance"
              value={formData.benefitsInput}
              onChange={(e) => setFormData({ ...formData, benefitsInput: e.target.value })}
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none mb-1.5"
            />
            <div className="flex flex-wrap gap-1">
              <span className="text-[10px] text-slate-400 font-semibold self-center mr-1">Quick add:</span>
              {perkPresets.map((perk, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleAddPerk(perk)}
                  className="text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md"
                >
                  + {perk}
                </button>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Full Job Description & Day-to-Day Duties
            </label>
            <textarea
              rows="3"
              placeholder="Provide key details regarding shift timings, reporting manager, facility size, and key tools..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5"
            >
              <Briefcase className="w-4 h-4" />
              {submitting ? 'Publishing...' : 'Publish Job Listing'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
