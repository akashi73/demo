import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  IndianRupee, 
  Share2, 
  Copy, 
  CheckCircle, 
  Award, 
  Users, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Smartphone, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Clock, 
  AlertCircle,
  Building2,
  ExternalLink
} from 'lucide-react';

export default function AffiliateView({ currentUser }) {
  const [loading, setLoading] = useState(true);
  const [affiliateData, setAffiliateData] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI QR');
  const [upiInput, setUpiInput] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Payout request modal
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('1000');
  const [payoutUpi, setPayoutUpi] = useState('');
  const [payoutSubmitting, setPayoutSubmitting] = useState(false);

  const [notification, setNotification] = useState(null);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const loadAffiliateStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/affiliate/${currentUser.id}`);
      const data = await res.json();
      setAffiliateData(data);
      if (data.upiId) setPayoutUpi(data.upiId);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAffiliateStatus();
  }, [currentUser.id]);

  // Handle Join Affiliate Payment
  const handleCompletePayment = async (e) => {
    e.preventDefault();
    setProcessingPayment(true);

    // Simulate real gateway delay of 1.2s
    setTimeout(async () => {
      try {
        const res = await fetch('/api/affiliate/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: currentUser.id,
            upiId: upiInput || `${currentUser.name.toLowerCase().replace(/\s+/g, '')}@upi`,
            paymentMethod,
            amountPaid: 999
          })
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Payment failed');
        }

        const newAff = await res.json();
        setAffiliateData({ isAffiliate: true, ...newAff, payoutHistory: [] });
        setShowPaymentModal(false);
        showToast('Payment of ₹999 verified! You are now a Certified Placement Partner.');
      } catch (err) {
        showToast(err.message, 'error');
      } finally {
        setProcessingPayment(false);
      }
    }, 1200);
  };

  // Handle Payout Request
  const handleRequestPayout = async (e) => {
    e.preventDefault();
    setPayoutSubmitting(true);

    try {
      const res = await fetch('/api/affiliate/payout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          amount: Number(payoutAmount),
          upiId: payoutUpi
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Payout request failed');
      }

      await loadAffiliateStatus();
      setShowPayoutModal(false);
      showToast(`Payout request of ₹${payoutAmount} submitted to admin!`);
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setPayoutSubmitting(false);
    }
  };

  const copyToClipboard = (text, isCode = false) => {
    navigator.clipboard.writeText(text);
    if (isCode) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
    showToast('Copied to clipboard!');
  };

  const getWhatsAppShareUrl = (referralCode) => {
    const text = `Join SkillConnect - India's direct skill hiring platform! Register your skills or post jobs directly with zero middlemen. Use my Partner Referral Code *${referralCode}* to get verified status: http://localhost:5000/?ref=${referralCode}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500 text-sm">
        Loading affiliate partner details...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-2xl text-xs font-bold border flex items-center gap-2 ${
          notification.type === 'error'
            ? 'bg-rose-900 text-white border-rose-700'
            : 'bg-slate-900 text-white border-slate-700'
        }`}>
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* ================= SCENARIO A: USER IS NOT YET AN AFFILIATE ================= */}
      {!affiliateData?.isAffiliate ? (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-10 text-white border border-blue-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                SkillConnect Affiliate & Talent Scout Program
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Become a Certified Talent Partner & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-300">
                  Earn Up to ₹25,000 / Month
                </span>
              </h1>

              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Refer skilled workers, job seekers, or hiring companies. Every time someone registers with your link or gets hired, you earn guaranteed direct UPI commissions.
              </p>

              {/* Commission Structure Cards */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider block">Candidate Referrals</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">₹250</div>
                  <p className="text-[11px] text-slate-300 mt-0.5">Per verified candidate who registers with your code.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider block">Successful Hiring</span>
                  <div className="text-2xl font-black text-blue-400 mt-1">₹1,500</div>
                  <p className="text-[11px] text-slate-300 mt-0.5">When your referred candidate receives a job offer.</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                  <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider block">Company Employer Onboarding</span>
                  <div className="text-2xl font-black text-amber-400 mt-1">₹3,000</div>
                  <p className="text-[11px] text-slate-300 mt-0.5">When a company posts active vacancies via your link.</p>
                </div>
              </div>

              {/* Fee and CTA */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-white">₹999</span>
                    <span className="text-xs text-slate-400 line-through">₹2,999</span>
                    <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded">
                      66% OFF Partner Fee
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">One-time Partner Verification & Lifetime License Fee</p>
                </div>

                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm px-7 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  <span>Activate Affiliate License (Pay ₹999)</span>
                </button>
              </div>

            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-3">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Branded Referral Links & QR</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Get a custom referral code and shareable WhatsApp message templates to broadcast to local worker communities, IT parks, and facility teams.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-3">
                <IndianRupee className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Instant Weekly UPI Payouts</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Transfer your commission balance straight to your PhonePe, Google Pay, Paytm, or bank account whenever your balance reaches ₹500+.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">Placement Partner Credential</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Receive an official Talent Scout & Placement Partner certificate backed by SkillConnect and direct liaison support with HR recruiters.
              </p>
            </div>
          </div>

        </div>
      ) : (

        /* ================= SCENARIO B: ACTIVE AFFILIATE DASHBOARD ================= */
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Partner Status Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-500/20 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    {affiliateData.tier || 'Gold Partner'} • Active
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    Partner ID: {affiliateData.id}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {affiliateData.userName}'s Partner Dashboard
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  License Paid: <strong className="text-emerald-400">₹{affiliateData.feePaid}</strong> • Txn: {affiliateData.txnId}
                </p>
              </div>

              {/* Withdraw Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowPayoutModal(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
                >
                  <IndianRupee className="w-4 h-4" />
                  <span>Withdraw to UPI (Min ₹500)</span>
                </button>
              </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10 text-center">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Commission Earned</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 block">
                  ₹{affiliateData.totalEarned.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-slate-300 mt-0.5 block">Lifetime revenue</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Available Wallet Balance</span>
                <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">
                  ₹{affiliateData.walletBalance.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-emerald-400 mt-0.5 block">Ready to withdraw</span>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Withdrawn</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-300 mt-1 block">
                  ₹{affiliateData.totalWithdrawn.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">Transferred to UPI</span>
              </div>
            </div>
          </div>

          {/* Referral Tools Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Share2 className="w-4 h-4 text-blue-600" />
              Your Dedicated Referral Links & Promotion Tools
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Code Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Your Unique Referral Code</span>
                  <span className="text-base font-black text-blue-700 tracking-wider mt-0.5 block">{affiliateData.referralCode}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(affiliateData.referralCode, true)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              {/* Link Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3">
                <div className="truncate">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Shareable Registration Link</span>
                  <span className="text-xs font-semibold text-slate-700 truncate mt-0.5 block">{affiliateData.referralLink}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => copyToClipboard(affiliateData.referralLink)}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                  </button>

                  <a
                    href={getWhatsAppShareUrl(affiliateData.referralCode)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Referrals Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  Your Referred Talent & Commission Ledger ({affiliateData.referrals?.length || 0})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Live tracking of candidate registrations and placements.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-100">
                  <tr>
                    <th className="p-3.5">Referred Person / Company</th>
                    <th className="p-3.5">Type</th>
                    <th className="p-3.5">Skill Domain</th>
                    <th className="p-3.5">Hiring Status</th>
                    <th className="p-3.5">Commission Credited</th>
                    <th className="p-3.5 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {affiliateData.referrals && affiliateData.referrals.map((ref, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="p-3.5 font-bold text-slate-900">{ref.name}</td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          ref.type === 'Employer' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                        }`}>
                          {ref.type}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600">{ref.skill}</td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-[10px]">
                          ✓ {ref.status}
                        </span>
                      </td>
                      <td className="p-3.5 font-extrabold text-emerald-700">
                        +₹{ref.commission.toLocaleString('en-IN')}
                      </td>
                      <td className="p-3.5 text-right text-slate-400 text-[11px]">{ref.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payout History Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  Payout Withdrawal History
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Direct transfers to your registered UPI ID.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-100">
                  <tr>
                    <th className="p-3.5">Request ID</th>
                    <th className="p-3.5">Withdrawal Amount</th>
                    <th className="p-3.5">Destination UPI</th>
                    <th className="p-3.5">Transfer Status</th>
                    <th className="p-3.5">Bank Ref / IMPS</th>
                    <th className="p-3.5 text-right">Requested At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {affiliateData.payoutHistory && affiliateData.payoutHistory.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-6 text-center text-slate-400 italic">No payout requests yet.</td>
                    </tr>
                  ) : (
                    affiliateData.payoutHistory && affiliateData.payoutHistory.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="p-3.5 font-mono text-[11px] font-bold text-slate-600">{p.id}</td>
                        <td className="p-3.5 font-extrabold text-slate-900">₹{p.amount.toLocaleString('en-IN')}</td>
                        <td className="p-3.5 font-semibold text-blue-700">{p.upiId}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            p.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-500 text-[11px]">{p.txnRef || 'Processing in bank queue...'}</td>
                        <td className="p-3.5 text-right text-slate-400 text-[11px]">
                          {new Date(p.requestedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ================= PAYMENT CHECKOUT MODAL (₹999 Fee) ================= */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Secure Checkout
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">Activate Partner License</h3>
              </div>
              <button onClick={() => setShowPaymentModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            {/* Price Box */}
            <div className="my-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">Affiliate Partner License</p>
                <p className="text-[11px] text-slate-500">Lifetime access & unlimited commission tracking</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-blue-700">₹999</span>
                <span className="block text-[10px] text-emerald-600 font-bold">One-time payment</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Select Payment Method</label>
              
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI QR')}
                  className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'UPI QR'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-blue-600" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Card')}
                  className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('NetBanking')}
                  className={`p-2.5 rounded-xl border text-center font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'NetBanking'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-blue-600" />
                  <span>NetBanking</span>
                </button>
              </div>

              {/* Dynamic QR Mock */}
              {paymentMethod === 'UPI QR' && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
                  <div className="w-28 h-28 bg-white border-2 border-slate-300 rounded-xl p-2 mx-auto flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-slate-800" />
                  </div>
                  <p className="text-[11px] font-semibold text-slate-600">Scan via PhonePe / GPay / Paytm or enter UPI ID below</p>
                  <input
                    type="text"
                    placeholder="e.g. mobile@upi"
                    value={upiInput}
                    onChange={(e) => setUpiInput(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-center font-bold"
                  />
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="space-y-2">
                  <input type="text" placeholder="Card Number (4532 ...)" className="w-full text-xs p-2.5 border rounded-xl font-mono" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="MM/YY" className="text-xs p-2.5 border rounded-xl text-center" />
                    <input type="password" placeholder="CVV" maxLength="3" className="text-xs p-2.5 border rounded-xl text-center" />
                  </div>
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              onClick={handleCompletePayment}
              disabled={processingPayment}
              className="mt-5 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
            >
              {processingPayment ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying Payment (₹999)...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay ₹999 & Activate Partner Account</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ================= WITHDRAWAL PAYOUT MODAL ================= */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-extrabold text-slate-900 mb-1">Request UPI Payout</h3>
            <p className="text-xs text-slate-500 mb-4">
              Available Balance: <strong className="text-emerald-700">₹{affiliateData.walletBalance}</strong>
            </p>

            <form onSubmit={handleRequestPayout} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Withdrawal Amount (₹)</label>
                <input
                  type="number"
                  min="500"
                  max={affiliateData.walletBalance}
                  required
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Minimum withdrawal: ₹500</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your UPI ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. name@okhdfcbank"
                  value={payoutUpi}
                  onChange={(e) => setPayoutUpi(e.target.value)}
                  className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPayoutModal(false)}
                  className="flex-1 py-2.5 border rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={payoutSubmitting}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/25"
                >
                  {payoutSubmitting ? 'Submitting...' : 'Confirm Transfer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
