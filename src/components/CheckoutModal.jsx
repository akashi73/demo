import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Truck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  Mail,
  AlertCircle,
  Sparkles
} from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  checkoutSummary, 
  onOrderSuccess,
  currentUser 
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1); // 1: Address, 2: Delivery & Payment
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    pincode: '221001',
    landmark: '',
    paymentMethod: 'Razorpay Gateway (UPI / Cards / Netbanking)',
    deliverySpeed: 'Standard'
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRazorpayPopup, setShowRazorpayPopup] = useState(false);
  const [razorpayOrderData, setRazorpayOrderData] = useState(null);

  // Sync if currentUser logs in
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: currentUser.name || prev.name,
        email: currentUser.email || prev.email,
        phone: currentUser.phone || prev.phone,
        address: currentUser.address || prev.address
      }));
    }
  }, [currentUser]);

  // Pincode auto-lookup helper
  const handlePincodeChange = (pin) => {
    setFormData(prev => ({ ...prev, pincode: pin }));
    if (pin.length === 6) {
      if (pin.startsWith('11')) setFormData(prev => ({ ...prev, city: 'New Delhi', state: 'Delhi' }));
      else if (pin.startsWith('40')) setFormData(prev => ({ ...prev, city: 'Mumbai', state: 'Maharashtra' }));
      else if (pin.startsWith('56')) setFormData(prev => ({ ...prev, city: 'Bengaluru', state: 'Karnataka' }));
      else if (pin.startsWith('70')) setFormData(prev => ({ ...prev, city: 'Kolkata', state: 'West Bengal' }));
      else if (pin.startsWith('30')) setFormData(prev => ({ ...prev, city: 'Jaipur', state: 'Rajasthan' }));
      else if (pin.startsWith('22')) setFormData(prev => ({ ...prev, city: 'Varanasi', state: 'Uttar Pradesh' }));
      else if (pin.startsWith('50')) setFormData(prev => ({ ...prev, city: 'Hyderabad', state: 'Telangana' }));
      else if (pin.startsWith('83')) setFormData(prev => ({ ...prev, city: 'Ranchi', state: 'Jharkhand' }));
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return setErrorMsg('Please enter recipient full name');
    if (!formData.phone.trim() || formData.phone.length < 10) return setErrorMsg('Please enter a valid 10-digit mobile number');
    if (!formData.address.trim()) return setErrorMsg('Please enter delivery street address');
    if (!formData.pincode.trim() || formData.pincode.length < 6) return setErrorMsg('Please enter a valid 6-digit PIN code');

    setErrorMsg('');
    setStep(2);
  };

  const executeOrderSubmission = async (paymentRef = null) => {
    setIsSubmitting(true);
    setErrorMsg('');

    const speedFee = formData.deliverySpeed === 'Express' ? 49 : 0;
    const finalBill = checkoutSummary.finalTotal + speedFee;

    const payload = {
      customerName: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      items: cartItems.map(i => ({
        id: i.productId,
        name: i.name,
        size: i.size,
        price: i.price,
        quantity: i.quantity
      })),
      totalAmount: checkoutSummary.subtotal,
      discountAmount: checkoutSummary.discountAmount,
      shippingFee: checkoutSummary.shippingFee + speedFee,
      finalAmount: finalBill,
      paymentMethod: formData.paymentMethod,
      giftMessage: checkoutSummary.giftNote || null,
      razorpayPaymentId: paymentRef
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setShowRazorpayPopup(false);
        onOrderSuccess(data.order);
      } else {
        setErrorMsg(data.error || 'Failed to place order. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlaceOrderClick = async () => {
    const speedFee = formData.deliverySpeed === 'Express' ? 49 : 0;
    const finalBill = checkoutSummary.finalTotal + speedFee;

    // If Razorpay chosen, trigger Razorpay flow
    if (formData.paymentMethod.includes('Razorpay')) {
      setIsSubmitting(true);
      try {
        const res = await fetch('/api/payment/razorpay/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: finalBill, currency: 'INR' })
        });
        const rzpData = await res.json();
        if (rzpData.success) {
          setRazorpayOrderData({
            ...rzpData,
            totalAmount: finalBill
          });
          setShowRazorpayPopup(true);
        } else {
          executeOrderSubmission();
        }
      } catch (err) {
        executeOrderSubmission();
      } finally {
        setIsSubmitting(false);
      }
    } else {
      executeOrderSubmission();
    }
  };

  const handleSimulateRazorpaySuccess = () => {
    const fakePayId = `pay_rzp_${Math.floor(10000000 + Math.random() * 90000000)}`;
    executeOrderSubmission(fakePayId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div 
        className="relative bg-[#FBF7EF] rounded-3xl max-w-2xl w-full border border-[#E9DCC7] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 px-6 border-b border-[#E9DCC7] bg-[#FFFCF6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#8F2024]" />
            <h3 className="font-serif font-black text-lg text-[#701B25]">
              Secure Checkout • Naani Pickles
            </h3>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-[#F7F1DF] hover:bg-[#ebdaba] text-[#701B25] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Indicator */}
        <div className="px-6 py-3 bg-[#F7F1DF] border-b border-[#E9DCC7] flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1.5 font-bold ${step === 1 ? 'text-[#8F2024]' : 'text-[#806F60]'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-[#8F2024] text-[#FFF8E9]' : 'bg-[#E9DCC7] text-[#62564D]'}`}>1</span>
            <span>Delivery Address</span>
          </div>

          <div className="h-0.5 w-12 bg-[#E9DCC7]" />

          <div className={`flex items-center gap-1.5 font-bold ${step === 2 ? 'text-[#8F2024]' : 'text-[#806F60]'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-[#8F2024] text-[#FFF8E9]' : 'bg-[#E9DCC7] text-[#62564D]'}`}>2</span>
            <span>Delivery & Payment</span>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-6 space-y-5 flex-1">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: Address Form */}
          {step === 1 && (
            <form id="address-form" onSubmit={handleNextStep} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#62564D] block mb-1">
                    Recipient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#62564D] block mb-1">
                    Mobile Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#62564D] block mb-1">
                  Email Address (For Invoices & Tracking Updates)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="youremail@example.com"
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#62564D] block mb-1">
                  House / Flat / Street Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#806F60] absolute left-3 top-3" />
                  <input 
                    type="text" 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House No., Building Name, Street / Mohalla"
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#62564D] block mb-1">
                    PIN Code *
                  </label>
                  <input 
                    type="text" 
                    maxLength={6}
                    required
                    value={formData.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    placeholder="221001"
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white font-mono text-[#62564D]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#62564D] block mb-1">
                    City *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#62564D] block mb-1">
                    State *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#62564D] block mb-1">
                  Nearby Landmark (Optional)
                </label>
                <input 
                  type="text" 
                  value={formData.landmark}
                  onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                  placeholder="Near Hanuman Temple, opposite Community Hall"
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E9DCC7] focus:outline-none focus:border-[#8F2024] bg-white text-[#62564D]"
                />
              </div>

            </form>
          )}

          {/* STEP 2: Delivery Speed & Payment Method */}
          {step === 2 && (
            <div className="space-y-5">
              
              {/* Delivery Speed */}
              <div>
                <label className="text-xs font-bold text-[#62564D] uppercase tracking-wider block mb-2">
                  Select Delivery Mode:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliverySpeed: 'Standard' })}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      formData.deliverySpeed === 'Standard'
                        ? 'border-[#8F2024] bg-[#F7F1DF] shadow-sm'
                        : 'border-[#E9DCC7] bg-white hover:bg-[#F7F1DF]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#701B25]">Standard Delivery</span>
                      <span className="text-[#285331] font-bold text-xs">FREE</span>
                    </div>
                    <p className="text-[11px] text-[#806F60] mt-0.5">3 to 5 business days via India Post / DTDC</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliverySpeed: 'Express' })}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      formData.deliverySpeed === 'Express'
                        ? 'border-[#8F2024] bg-[#F7F1DF] shadow-sm'
                        : 'border-[#E9DCC7] bg-white hover:bg-[#F7F1DF]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#701B25]">Bluedart Air Express</span>
                      <span className="text-[#8F2024] font-bold text-xs">+₹49</span>
                    </div>
                    <p className="text-[11px] text-[#806F60] mt-0.5">24-48 Hours priority air courier</p>
                  </button>
                </div>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="text-xs font-bold text-[#62564D] uppercase tracking-wider block mb-2">
                  Select Payment Method:
                </label>
                <div className="space-y-2">
                  {[
                    { 
                      id: 'Razorpay Gateway (UPI / Cards / Netbanking)', 
                      name: 'Razorpay Secure Checkout', 
                      icon: CreditCard, 
                      badge: 'Instant UPI, Cards & Netbanking',
                      highlight: true,
                      desc: 'Google Pay, PhonePe, Paytm, Visa, RuPay, Netbanking'
                    },
                    { 
                      id: 'UPI Direct (GPay / PhonePe / Paytm)', 
                      name: 'UPI Direct QR Transfer', 
                      icon: QrCode 
                    },
                    { 
                      id: 'Cash on Delivery (COD)', 
                      name: 'Cash on Delivery (Pay cash on arrival)', 
                      icon: Banknote, 
                      note: 'Zero extra handling fee on COD' 
                    }
                  ].map((p) => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, paymentMethod: p.id })}
                        className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          formData.paymentMethod === p.id 
                            ? 'border-[#8F2024] bg-[#F7F1DF] shadow-md ring-1 ring-[#8F2024]' 
                            : 'border-[#E9DCC7] bg-white hover:bg-[#F7F1DF]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                            p.highlight ? 'bg-[#701B25] text-[#FFF8E9] shadow' : 'bg-[#F7F1DF] text-[#701B25]'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-xs text-[#701B25] flex items-center gap-2">
                              <span>{p.name}</span>
                              {p.badge && (
                                <span className="text-[9px] bg-[#E5AC28] text-[#701B25] font-black px-1.5 py-0.2 rounded">
                                  {p.badge}
                                </span>
                              )}
                            </div>
                            {p.desc && (
                              <span className="text-[10px] text-[#806F60] block">{p.desc}</span>
                            )}
                            {p.note && (
                              <span className="text-[10px] text-[#806F60] block">{p.note}</span>
                            )}
                          </div>
                        </div>

                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          formData.paymentMethod === p.id ? 'border-[#8F2024] bg-[#8F2024]' : 'border-[#E9DCC7]'
                        }`}>
                          {formData.paymentMethod === p.id && (
                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Address Summary pill */}
              <div className="p-3 bg-[#F7F1DF] border border-[#E9DCC7] rounded-xl text-xs text-[#62564D] flex items-start justify-between">
                <div>
                  <div className="font-bold text-[#701B25]">Delivering to: {formData.name}</div>
                  <div className="text-[11px] text-[#62564D]">{formData.address}, {formData.city}, {formData.state} - {formData.pincode}</div>
                  <div className="text-[11px] text-[#806F60]">Contact: {formData.phone}</div>
                </div>
                <button 
                  onClick={() => setStep(1)}
                  className="text-xs text-[#8F2024] font-bold hover:underline"
                >
                  Edit
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 px-6 border-t border-[#E9DCC7] bg-[#FFFCF6] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#806F60]">Total Payable:</span>
            <div className="text-2xl font-black text-[#701B25]">
              ₹{checkoutSummary.finalTotal + (formData.deliverySpeed === 'Express' ? 49 : 0)}
            </div>
          </div>

          <div className="flex gap-2">
            {step === 2 && (
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-full border border-[#E9DCC7] hover:bg-[#F7F1DF] text-[#62564D] font-bold text-xs flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            )}

            {step === 1 ? (
              <button 
                type="submit"
                form="address-form"
                className="px-6 py-2.5 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] font-bold text-xs sm:text-sm shadow-lg flex items-center gap-1.5"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button 
                type="button"
                disabled={isSubmitting}
                onClick={handlePlaceOrderClick}
                className="px-8 py-3 rounded-full bg-[#8F2024] hover:bg-[#701B25] text-[#FFF8E9] font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Connecting Gateway...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#D69A19]" />
                    <span>Pay ₹{checkoutSummary.finalTotal + (formData.deliverySpeed === 'Express' ? 49 : 0)}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>

      {/* RAZORPAY PAYMENT MODAL POPUP SIMULATOR */}
      {showRazorpayPopup && razorpayOrderData && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in">
          <div 
            className="relative bg-white rounded-3xl max-w-sm w-full shadow-2xl overflow-hidden border border-blue-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Razorpay Brand Blue Header */}
            <div className="bg-[#0C2340] text-white p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500 text-white font-bold text-sm flex items-center justify-center shadow">
                    R
                  </div>
                  <span className="font-black text-sm tracking-wide">Razorpay Checkout</span>
                </div>
                <button 
                  onClick={() => setShowRazorpayPopup(false)}
                  className="text-stone-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-2">
                <div className="text-[11px] text-blue-200">{razorpayOrderData.name || 'Naani Pickles™'}</div>
                <div className="text-2xl font-black text-white">₹{razorpayOrderData.totalAmount}</div>
                <div className="text-[10px] text-blue-300 font-mono">Order ID: {razorpayOrderData.orderId}</div>
              </div>
            </div>

            {/* Gateway Body */}
            <div className="p-5 space-y-4 text-xs">
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900">
                🔒 Connected via Razorpay Key: <strong className="font-mono">{razorpayOrderData.keyId}</strong>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-stone-700 block">Select Instant Payment Mode:</span>
                
                <button
                  type="button"
                  onClick={handleSimulateRazorpaySuccess}
                  className="w-full p-3 rounded-xl border border-stone-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">⚡</span>
                    <div>
                      <div className="font-bold text-stone-900 group-hover:text-blue-700">UPI / QR Code</div>
                      <div className="text-[10px] text-stone-500">Google Pay, PhonePe, Paytm, BHIM</div>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600 font-bold">Pay Now →</span>
                </button>

                <button
                  type="button"
                  onClick={handleSimulateRazorpaySuccess}
                  className="w-full p-3 rounded-xl border border-stone-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">💳</span>
                    <div>
                      <div className="font-bold text-stone-900 group-hover:text-blue-700">Credit / Debit Card</div>
                      <div className="text-[10px] text-stone-500">Visa, Mastercard, RuPay</div>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600 font-bold">Pay Now →</span>
                </button>

                <button
                  type="button"
                  onClick={handleSimulateRazorpaySuccess}
                  className="w-full p-3 rounded-xl border border-stone-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🏦</span>
                    <div>
                      <div className="font-bold text-stone-900 group-hover:text-blue-700">Netbanking</div>
                      <div className="text-[10px] text-stone-500">All 58+ Indian Banks</div>
                    </div>
                  </div>
                  <span className="text-xs text-blue-600 font-bold">Pay Now →</span>
                </button>
              </div>

              <div className="pt-2 text-center text-[10px] text-stone-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Secured with 256-bit SSL encryption by Razorpay</span>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
