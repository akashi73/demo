import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Clock, 
  Award,
  Plus
} from 'lucide-react';

export default function RegisterSkillModal({ 
  isOpen, 
  onClose, 
  categories, 
  onRegisterSuccess,
  onOpenQuiz
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Mumbai, Maharashtra',
    locality: '',
    category: 'Facility & Housekeeping',
    title: '',
    experienceYears: '2',
    expectedSalary: '22000',
    availability: 'Immediately Available',
    shift: 'Full-time Day Shift',
    education: 'Higher Secondary (12th Passed)',
    skillsInput: 'Deep Cleaning, Floor Scrubbing Machine, Chemical Safety',
    bio: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const commonSkillPresets = {
    'Facility & Housekeeping': ['Deep Cleaning', 'Floor Buffing', 'Chemical Dilution Safety', 'Restroom Sanitation', 'Waste Management', 'Machinery Operation'],
    'Skilled Trades & Maintenance': ['Industrial Wiring', 'HVAC / AC Repair', 'Plumbing', 'Circuit Breakers', 'Carpentry', 'Fire Safety'],
    'Office, Admin & Data Entry': ['MS Excel / Spreadsheets', 'Data Entry', 'Tally ERP 9', 'Front Desk', 'Billing', 'Customer Calls'],
    'Logistics, Delivery & Warehouse': ['Forklift Driving', 'Inventory Stacking', 'RF Scanning', 'Dispatch', 'Heavy Vehicle License'],
    'Hospitality & Food Services': ['Indian Cuisine', 'Continental Food', 'Kitchen Hygiene', 'Buffet Setup', 'Guest Service'],
    'IT, Web & Digital Skills': ['Frontend React', 'HTML/CSS', 'Graphic Design', 'IT Desktop Support', 'Hardware Troubleshooting'],
    'Security & Facility Guard': ['CCTV Monitoring', 'Access Control', 'Visitor Logbook', 'Fire Drill Safety', 'Physical Guarding'],
    'Healthcare & Patient Support': ['Patient Care', 'Elderly Assistance', 'Vital Signs Check', 'First Aid', 'Hospital Protocol']
  };

  const handlePresetSkillClick = (skill) => {
    const current = formData.skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    if (!current.includes(skill)) {
      setFormData({
        ...formData,
        skillsInput: [...current, skill].join(', ')
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Name and Phone number are required.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        title: formData.title || `${formData.category} Specialist`,
        category: formData.category,
        location: formData.location,
        locality: formData.locality,
        experienceYears: Number(formData.experienceYears) || 1,
        experience: `${formData.experienceYears} Years`,
        salaryNumber: Number(formData.expectedSalary) || 20000,
        expectedSalary: `₹${Number(formData.expectedSalary || 20000).toLocaleString('en-IN')} / month`,
        availability: formData.availability,
        shift: formData.shift,
        education: formData.education,
        skills: formData.skillsInput.split(',').map(s => s.trim()).filter(Boolean),
        bio: formData.bio || `Skilled professional with hands-on experience in ${formData.category}. Verified for direct hiring.`
      };

      const res = await fetch('/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to register candidate profile');

      const newCand = await res.json();
      onRegisterSuccess(newCand);
      onClose();
    } catch (err) {
      setError(err.message || 'Error registering profile');
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
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Direct Job Seeker Registration
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Register Your Skills</h2>
            <p className="text-xs text-slate-500">Get hired directly by verified HRs with transparent salary offers.</p>
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
          
          {/* Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patil"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (+91) *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Category & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Primary Skill Domain *</label>
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
              <label className="block text-xs font-bold text-slate-700 mb-1">Role Headline / Title</label>
              <input
                type="text"
                placeholder="e.g. Senior Deep Cleaning Specialist"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Location & Locality */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">City & State *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mumbai, Maharashtra"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Area / Locality</label>
              <input
                type="text"
                placeholder="e.g. Andheri East / Thane"
                value={formData.locality}
                onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Experience, Salary, Availability */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Experience (Years)</label>
              <input
                type="number"
                min="0"
                max="30"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Expected Salary (₹/mo)</label>
              <input
                type="number"
                step="1000"
                value={formData.expectedSalary}
                onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Availability</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="Immediately Available">Immediately</option>
                <option value="Within 7 Days">Within 7 Days</option>
                <option value="Within 15 Days">Within 15 Days</option>
                <option value="1 Month Notice">1 Month</option>
              </select>
            </div>
          </div>

          {/* Skills Input & Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Skills & Machine / Tool Competencies (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Deep Cleaning, Floor Scrubbing, Chemical Safety"
              value={formData.skillsInput}
              onChange={(e) => setFormData({ ...formData, skillsInput: e.target.value })}
              className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none mb-1.5"
            />

            {/* Clickable presets for selected category */}
            {commonSkillPresets[formData.category] && (
              <div className="flex flex-wrap gap-1">
                <span className="text-[10px] text-slate-400 font-semibold self-center mr-1">Tap to add:</span>
                {commonSkillPresets[formData.category].map((preset, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => handlePresetSkillClick(preset)}
                    className="text-[10px] font-semibold bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-600 px-2 py-0.5 rounded-md transition-colors"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Brief Experience Summary / Strengths
            </label>
            <textarea
              rows="2"
              placeholder="e.g. Worked for 3 years in commercial offices handling floor cleaning, waste disposal, and leading a team of 5 workers."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit Actions */}
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
              <Sparkles className="w-4 h-4" />
              {submitting ? 'Registering...' : 'Register Profile & Go Live'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
