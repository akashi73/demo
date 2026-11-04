import React, { useState } from 'react';
import { 
  X, 
  User, 
  Building2, 
  Phone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Briefcase, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Zap,
  MapPin,
  Clock
} from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  initialMode = 'login', // 'login' or 'signup'
  onAuthSuccess 
}) {
  if (!isOpen) return null;

  const [mode, setMode] = useState(initialMode);
  const [signupRole, setSignupRole] = useState('candidate'); // 'candidate' or 'hr'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form
  const [loginData, setLoginData] = useState({
    emailOrPhone: '',
    password: ''
  });

  // Signup form
  const [signupData, setSignupData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    companyIndustry: 'Integrated Facility Management & Cleaning',
    category: 'Hotel & Resort Housekeeping',
    location: 'Mumbai, Maharashtra',
    experience: '2 Years',
    expectedSalary: '22000',
    shift: 'Morning Shift (7 AM - 3 PM)',
    skills: 'Room Cleaning, Floor Buffing, Diversey Chemicals'
  });

  const housekeepingCategories = [
    'Hotel & Resort Housekeeping',
    'Hospital & Healthcare Sanitation',
    'Corporate Office & Tech Park Cleaning',
    'Residential & Villa Deep Cleaning',
    'Industrial & Mechanized Floor Scrubbing',
    'Facility Supervisors & Lead Housekeepers',
    'Glass Façade & High-Rise Cleaning',
    'Carpet, Sofa & Upholstery Care'
  ];

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.emailOrPhone.trim()) {
      setError('Please enter your mobile number or email.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      onAuthSuccess(data.user, data.token);
      onClose();
    } catch (err) {
      setError(err.message || 'Login error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!signupData.name.trim() || (!signupData.phone.trim() && !signupData.email.trim())) {
      setError('Name and Mobile number are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        role: signupRole,
        name: signupData.name,
        phone: signupData.phone,
        email: signupData.email,
        password: signupData.password || 'password123',
        location: signupData.location,
        company: signupData.company,
        companyIndustry: signupData.companyIndustry,
        category: signupData.category,
        experience: signupData.experience,
        expectedSalary: signupData.expectedSalary,
        shift: signupData.shift,
        skills: signupData.skills
      };

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      onAuthSuccess(data.user, data.token);
      onClose();
    } catch (err) {
      setError(err.message || 'Registration error occurred');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Demo Quick Logins
  const handleQuickDemoLogin = (emailOrPhone) => {
    setLoginData({
      emailOrPhone,
      password: 'password123'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8 animate-in zoom-in-95 duration-150 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Tag */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-xs shadow-md shadow-blue-500/20">
            S
          </div>
          <span className="text-sm font-extrabold tracking-tight text-slate-900">
            Skill<span className="text-blue-600">Connect</span> Housekeeping Portal
          </span>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="flex rounded-xl bg-slate-100 p-1 mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Create Free Account
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
            {error}
          </div>
        )}

        {/* ================= MODE 1: LOGIN ================= */}
        {mode === 'login' ? (
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-extrabold text-slate-900">Welcome Back</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Sign in to manage your applications, hiring vacancies, or partner commissions.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number or Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="+91 98201 44521 or rahul@example.com"
                    value={loginData.emailOrPhone}
                    onChange={(e) => setLoginData({ ...loginData, emailOrPhone: e.target.value })}
                    className="w-full text-xs font-semibold pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="w-full text-xs font-semibold pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5"
              >
                <span>{loading ? 'Verifying Account...' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Logins for Instant Demonstration */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                ⚡ 1-Click Demo Accounts (Fast Testing)
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('rahul.sharma@example.com')}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg border border-slate-200 text-left font-semibold text-slate-700 transition-colors"
                >
                  <p className="font-bold">Rahul Sharma</p>
                  <p className="text-[10px] text-slate-400">Housekeeping Supervisor</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('hr@urbanassist.com')}
                  className="p-2 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-lg border border-slate-200 text-left font-semibold text-slate-700 transition-colors"
                >
                  <p className="font-bold">UrbanAssist HR</p>
                  <p className="text-[10px] text-slate-400">Facility Employer</p>
                </button>
              </div>
            </div>
          </div>
        ) : (

          /* ================= MODE 2: SIGNUP ================= */
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-extrabold text-slate-900">Create Free Account</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select your account type to access verified jobs or hiring tools.
              </p>
            </div>

            {/* Role Selector Cards */}
            <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs font-bold">
              <button
                type="button"
                onClick={() => setSignupRole('candidate')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  signupRole === 'candidate'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-extrabold text-sm mb-0.5">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Job Seeker</span>
                </div>
                <p className="text-[10px] text-slate-500 font-normal">
                  Housekeeping, cleaning, janitor, room attendant, or supervisor.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSignupRole('hr')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  signupRole === 'hr'
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-extrabold text-sm mb-0.5">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span>Employer / HR</span>
                </div>
                <p className="text-[10px] text-slate-500 font-normal">
                  Hotels, hospitals, tech parks, facility management companies.
                </p>
              </button>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSignupSubmit} className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {signupRole === 'hr' ? 'Contact Person / HR Name *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={signupRole === 'hr' ? 'e.g. Vikram Sethi' : 'e.g. Ramesh Patil'}
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Company Info if Employer */}
              {signupRole === 'hr' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Facility Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Grand Vista Hotels / UrbanCare"
                      value={signupData.company}
                      onChange={(e) => setSignupData({ ...signupData, company: e.target.value })}
                      className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Industry Sector</label>
                    <select
                      value={signupData.companyIndustry}
                      onChange={(e) => setSignupData({ ...signupData, companyIndustry: e.target.value })}
                      className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Integrated Facility Management & Cleaning">Facility Management</option>
                      <option value="Luxury Hotels & Boutique Resorts">Luxury Hospitality</option>
                      <option value="Hospitals & Healthcare Facilities">Hospitals & Healthcare</option>
                      <option value="Commercial Offices & IT Tech Parks">Commercial IT Parks</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile (+91) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Candidate Housekeeping Details */}
              {signupRole === 'candidate' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Housekeeping Specialty *</label>
                      <select
                        value={signupData.category}
                        onChange={(e) => setSignupData({ ...signupData, category: e.target.value })}
                        className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                      >
                        {housekeepingCategories.map((c, i) => (
                          <option key={i} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Total Experience</label>
                      <select
                        value={signupData.experience}
                        onChange={(e) => setSignupData({ ...signupData, experience: e.target.value })}
                        className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="Fresher (Trained)">Fresher (Trained)</option>
                        <option value="1-2 Years">1-2 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5+ Years (Lead/Supervisor)">5+ Years (Lead/Supervisor)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Expected Monthly Wage (₹)</label>
                      <input
                        type="number"
                        placeholder="22000"
                        value={signupData.expectedSalary}
                        onChange={(e) => setSignupData({ ...signupData, expectedSalary: e.target.value })}
                        className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Shift</label>
                      <select
                        value={signupData.shift}
                        onChange={(e) => setSignupData({ ...signupData, shift: e.target.value })}
                        className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="Morning Shift (7 AM - 3 PM)">Morning Shift (7 AM - 3 PM)</option>
                        <option value="Night Shift (10 PM - 6 AM)">Night Shift (10 PM - 6 AM)</option>
                        <option value="Rotational / Day">Rotational / Day</option>
                        <option value="24x7 In-house (with Room & Food)">24x7 In-house (Room + Food)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* City / Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">City / Preferred Location *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai, Delhi NCR, Bangalore, Goa"
                  value={signupData.location}
                  onChange={(e) => setSignupData({ ...signupData, location: e.target.value })}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Create Password *</label>
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5"
              >
                <span>{loading ? 'Creating Account...' : 'Complete Free Registration'}</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
