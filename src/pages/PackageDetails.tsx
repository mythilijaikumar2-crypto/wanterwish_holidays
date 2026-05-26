import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  FaClock, FaWhatsapp, FaChevronDown, 
  FaCheckCircle, FaTimesCircle, FaInfoCircle, FaCalendarAlt, 
  FaUserFriends, FaMapMarkerAlt, FaEnvelope, FaUser, FaPhoneAlt 
} from 'react-icons/fa';
import { tourPackages } from '../data/packages';

export const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const pkg = tourPackages.find(p => p.id === id);


  // Scroll to top upon mounting this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Page state controllers
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<'includes' | 'excludes' | 'terms'>('includes');
  
  // Form input states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formPax, setFormPax] = useState("1");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 pb-20 px-4 bg-custom-bg">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-premium text-center border border-light-gray/40">
          <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTimesCircle className="text-3xl" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-primary-navy mb-2">
            Package Not Found
          </h2>
          <p className="text-text-gray text-xs md:text-sm leading-relaxed mb-8">
            The holiday package you are trying to view does not exist or has been relocated. Please check the packages catalog page.
          </p>
          <Link
            to="/packages"
            className="w-full justify-center bg-primary-navy hover:bg-primary-navy/90 text-orange-cta font-heading font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all inline-flex items-center"
          >
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }


  // Generate customized WhatsApp query link
  const whatsappNumber = "918825813453";
  const customMessage = encodeURIComponent(
    `Hi WanderWish Holidays! I am planning a holiday and would like to enquire about the package: "${pkg.title}" (${pkg.duration}). Please let me know the availability.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${customMessage}`;

  // Toggle Accordion Day panels
  const toggleDay = (day: number) => {
    setActiveDay(activeDay === day ? null : day);
  };

  // Handle Enquiry Lead Submission
  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formName.trim()) errors.name = "Full name is required.";
    if (!formPhone.trim()) errors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formPhone.trim())) errors.phone = "Provide a valid 10-digit number.";
    if (formEmail.trim() && !/\S+@\S+\.\S+/.test(formEmail)) errors.email = "Provide a valid email address.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormSubmitted(true);
  };

  return (
    <div className="bg-custom-bg min-h-screen pt-28 pb-20">
      
      {/* Dynamic Header Banner Cover */}
      <div className="relative h-[380px] bg-primary-navy overflow-hidden flex items-end pb-12 mb-12">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-102" 
          style={{ backgroundImage: `url('${pkg.bannerImage}')` }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-primary-navy via-primary-navy/40 to-transparent"></div>

        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-white">
          <div className="flex flex-col gap-3 max-w-3xl">
            <span className="text-orange-cta font-heading text-xs font-bold uppercase tracking-widest block w-fit bg-white/10 px-3 py-1 rounded-md backdrop-blur-sm">
              Holiday Details
            </span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-tight">
              {pkg.title}
            </h1>
            
            {/* Quick badges row */}
            <div className="flex flex-wrap gap-4 items-center text-xs md:text-sm font-medium mt-2 text-white/90">
              <div className="flex items-center gap-1.5">
                <FaClock className="text-orange-cta shrink-0" />
                <span>{pkg.duration}</span>
              </div>
              <span className="h-1.5 w-1.5 bg-white/20 rounded-full hidden sm:inline"></span>
              <div className="flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-orange-cta shrink-0" />
                <span>{pkg.placesCovered.length} Key Places</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column split details layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Itinerary & Inclusions tabs */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* 1. Description */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-premium border border-light-gray/40">
              <h2 className="font-heading font-extrabold text-2xl text-primary-navy mb-4">
                About the Tour
              </h2>
              <p className="text-text-gray text-xs md:text-sm leading-relaxed whitespace-pre-line">
                {pkg.description}
              </p>
              
              {/* Places Covered List Grid */}
              <h3 className="font-heading font-bold text-base text-primary-navy mt-6 mb-3">
                Sightseeing Places Covered:
              </h3>
              <div className="flex flex-wrap gap-2">
                {pkg.placesCovered.map((place, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-accent bg-teal-50 border border-teal-200/50 px-3.5 py-1.5 rounded-xl shadow-xs"
                  >
                    <FaMapMarkerAlt className="text-[10px]" />
                    {place}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Expandable Day-wise Itinerary */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-premium border border-light-gray/40">
              <h2 className="font-heading font-extrabold text-2xl text-primary-navy mb-6">
                Day-by-Day Itinerary
              </h2>
              
              <div className="flex flex-col gap-4">
                {pkg.itinerary.map((day) => (
                  <div 
                    key={day.day} 

                    className={`rounded-2xl border transition-all duration-300 ${
                      activeDay === day.day 
                        ? 'border-teal-accent bg-teal-50/5' 
                        : 'border-light-gray/60 bg-white'
                    }`}
                  >
                    <button
                      onClick={() => toggleDay(day.day)}
                      className="w-full flex items-center justify-between p-5 text-left cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-4">
                        <span className={`h-10 w-10 shrink-0 rounded-xl font-heading font-bold text-xs flex items-center justify-center ${
                          activeDay === day.day 
                            ? 'bg-primary-navy text-orange-cta' 
                            : 'bg-custom-bg text-text-gray'
                        }`}>
                          Day {day.day}
                        </span>
                        <h4 className="font-heading font-bold text-sm md:text-base text-primary-navy">
                          {day.title}
                        </h4>
                      </div>
                      
                      <FaChevronDown className={`text-text-gray/50 text-xs transition-transform duration-300 shrink-0 ml-4 ${
                        activeDay === day.day ? 'rotate-180' : ''
                      }`} />
                    </button>

                    <AnimatePresence initial={false}>
                      {activeDay === day.day && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pl-14 text-xs md:text-sm text-text-gray leading-relaxed border-t border-light-gray/30 pt-4">
                            {day.details}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Inclusions / Exclusions Tabs Component */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-premium border border-light-gray/40">
              
              {/* Tab headers grid */}
              <div className="grid grid-cols-3 border-b border-light-gray/60">
                <button
                  onClick={() => setActiveTab('includes')}
                  className={`py-4 font-heading font-bold text-xs md:text-sm text-center border-b-2 cursor-pointer transition-all ${
                    activeTab === 'includes' 
                      ? 'border-teal-accent text-teal-accent bg-teal-50/5' 
                      : 'border-transparent text-text-gray hover:text-primary-navy hover:bg-custom-bg'
                  }`}
                >
                  What's Included
                </button>
                <button
                  onClick={() => setActiveTab('excludes')}
                  className={`py-4 font-heading font-bold text-xs md:text-sm text-center border-b-2 cursor-pointer transition-all ${
                    activeTab === 'excludes' 
                      ? 'border-orange-cta text-orange-cta bg-orange-50/5' 
                      : 'border-transparent text-text-gray hover:text-primary-navy hover:bg-custom-bg'
                  }`}
                >
                  What's Excluded
                </button>
                <button
                  onClick={() => setActiveTab('terms')}
                  className={`py-4 font-heading font-bold text-xs md:text-sm text-center border-b-2 cursor-pointer transition-all ${
                    activeTab === 'terms' 
                      ? 'border-primary-navy text-primary-navy bg-primary-navy/5' 
                      : 'border-transparent text-text-gray hover:text-primary-navy hover:bg-custom-bg'
                  }`}
                >
                  Important Terms
                </button>
              </div>

              {/* Tab contents section */}
              <div className="p-6 md:p-8">
                
                {/* 3.1 What's Included list */}
                {activeTab === 'includes' && (
                  <ul className="space-y-4">
                    {pkg.includes.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-500 text-lg shrink-0 mt-0.5" />
                        <span className="text-text-gray text-xs md:text-sm leading-relaxed">{inc}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* 3.2 What's Excluded list */}
                {activeTab === 'excludes' && (
                  <ul className="space-y-4">
                    {pkg.excludes.map((exc, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaTimesCircle className="text-red-500 text-lg shrink-0 mt-0.5" />
                        <span className="text-text-gray text-xs md:text-sm leading-relaxed">{exc}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* 3.3 Important Terms list */}
                {activeTab === 'terms' && (
                  <ul className="space-y-4">
                    {pkg.terms.map((term, idx) => (
                      <li key={idx} className="flex items-start gap-3 bg-primary-navy/5 border border-primary-navy/5 p-4 rounded-xl">
                        <FaInfoCircle className="text-primary-navy text-lg shrink-0 mt-0.5" />
                        <span className="text-primary-navy text-xs md:text-sm leading-relaxed font-medium">{term}</span>
                      </li>
                    ))}
                  </ul>
                )}

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Enquiry form + Pricing details */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
            
            {/* Standard consultation showcase widget */}
            <div className="bg-primary-navy rounded-3xl p-6 md:p-8 text-white border border-white/5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-cta/5 rounded-bl-full"></div>
              
              <span className="text-orange-cta font-heading text-xs font-bold uppercase tracking-widest block mb-1">
                Consult With Founder
              </span>
              <p className="text-white/70 text-[11px] leading-relaxed mb-6 border-b border-white/10 pb-4">
                Connect directly with our founder, **Vinothini**, on WhatsApp to receive dynamic package options, premium customization, and direct booking details.
              </p>

              {/* Directly Open WhatsApp Enquiry */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-heading font-bold text-xs py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaWhatsapp className="text-xl" />
                Enquire via WhatsApp
              </a>
            </div>

            {/* Premium Enquiry Lead Generation Form */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-premium border border-light-gray/40">
              <h3 className="font-heading font-extrabold text-lg text-primary-navy mb-1">
                Book / Enquire Today
              </h3>
              <p className="text-text-gray text-[11px] leading-relaxed mb-6">
                Submit your contact details and our founder **Vinothini** will coordinate directly.
              </p>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form 
                    key="enquiry-form"
                    onSubmit={handleEnquirySubmit} 
                    className="flex flex-col gap-4.5"
                  >
                    {/* Input 1: Full Name */}
                    <div className="relative">
                      <FaUser className="absolute top-1/2 left-3.5 -translate-y-1/2 text-text-gray/40 text-xs" />
                      <input
                        type="text"
                        placeholder="Your Full Name *"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className={`w-full pl-9 pr-4 py-3 bg-custom-bg border text-xs rounded-xl focus:outline-none focus:bg-white text-primary-navy font-medium placeholder-text-gray/50 ${
                          formErrors.name ? 'border-red-400 focus:border-red-400' : 'border-light-gray/60 focus:border-teal-accent'
                        }`}
                      />
                      {formErrors.name && <span className="text-[10px] text-red-500 block mt-1 pl-1 font-semibold">{formErrors.name}</span>}
                    </div>

                    {/* Input 2: Mobile Phone */}
                    <div className="relative">
                      <FaPhoneAlt className="absolute top-1/2 left-3.5 -translate-y-1/2 text-text-gray/40 text-xs" />
                      <input
                        type="tel"
                        placeholder="10-Digit Mobile Phone *"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className={`w-full pl-9 pr-4 py-3 bg-custom-bg border text-xs rounded-xl focus:outline-none focus:bg-white text-primary-navy font-medium placeholder-text-gray/50 ${
                          formErrors.phone ? 'border-red-400 focus:border-red-400' : 'border-light-gray/60 focus:border-teal-accent'
                        }`}
                      />
                      {formErrors.phone && <span className="text-[10px] text-red-500 block mt-1 pl-1 font-semibold">{formErrors.phone}</span>}
                    </div>

                    {/* Input 3: Email Address */}
                    <div className="relative">
                      <FaEnvelope className="absolute top-1/2 left-3.5 -translate-y-1/2 text-text-gray/40 text-xs" />
                      <input
                        type="email"
                        placeholder="Email Address (Optional)"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className={`w-full pl-9 pr-4 py-3 bg-custom-bg border text-xs rounded-xl focus:outline-none focus:bg-white text-primary-navy font-medium placeholder-text-gray/50 ${
                          formErrors.email ? 'border-red-400 focus:border-red-400' : 'border-light-gray/60 focus:border-teal-accent'
                        }`}
                      />
                      {formErrors.email && <span className="text-[10px] text-red-500 block mt-1 pl-1 font-semibold">{formErrors.email}</span>}
                    </div>

                    {/* Grid Inputs: Date & Travelers */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <FaCalendarAlt className="absolute top-1/2 left-3.5 -translate-y-1/2 text-text-gray/40 text-xs" />
                        <input
                          type="date"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          className="w-full pl-9 pr-3 py-3 bg-custom-bg border border-light-gray/60 text-xs rounded-xl focus:outline-none focus:bg-white text-primary-navy font-medium"
                          title="Preferred Travel Date"
                        />
                      </div>

                      <div className="relative">
                        <FaUserFriends className="absolute top-1/2 left-3.5 -translate-y-1/2 text-text-gray/40 text-xs" />
                        <select
                          value={formPax}
                          onChange={(e) => setFormPax(e.target.value)}
                          className="w-full pl-9 pr-3 py-3 bg-custom-bg border border-light-gray/60 text-xs rounded-xl focus:outline-none focus:bg-white text-primary-navy font-medium cursor-pointer"
                          title="Number of Travelers"
                        >
                          {[1, 2, 3, 4, 5, 6, "7-10", "10-20", "20-40", "40+"].map(num => (
                            <option key={num} value={num}>{num} Pax</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Input 5: Message details */}
                    <div>
                      <textarea
                        rows={3}
                        placeholder="Write any customization queries or preferences here..."
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        className="w-full p-4.5 bg-custom-bg border border-light-gray/60 text-xs rounded-xl focus:outline-none focus:bg-white text-primary-navy font-medium placeholder-text-gray/50 resize-none"
                      ></textarea>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="w-full bg-primary-navy hover:bg-primary-navy/95 text-orange-cta font-heading font-bold text-xs py-4 px-6 rounded-2xl transition-all duration-300 shadow-md hover:scale-102 active:scale-98 cursor-pointer"
                    >
                      Submit Booking Enquiry
                    </button>
                  </motion.form>
                ) : (
                  /* Form Submission success block */
                  <motion.div 
                    key="submission-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 flex flex-col items-center"
                  >
                    <div className="h-14 w-14 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                      <FaCheckCircle className="text-2xl" />
                    </div>
                    <h4 className="font-heading font-bold text-lg text-primary-navy mb-2">
                      Enquiry Submitted!
                    </h4>
                    <p className="text-text-gray text-[11px] leading-relaxed mb-6">
                      Thank you, **{formName}**! Your holiday inquiry for **{pkg.title}** has been captured. Our director, **Vinothini**, will contact you via **{formPhone}** very shortly.
                    </p>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormName("");
                        setFormPhone("");
                        setFormEmail("");
                        setFormDate("");
                        setFormPax("1");
                        setFormMessage("");
                      }}
                      className="text-xs font-bold text-teal-accent hover:text-teal-accent/80 bg-teal-50 px-4 py-2.5 rounded-xl border border-teal-200/50 cursor-pointer"
                    >
                      Enquire Another Package
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
