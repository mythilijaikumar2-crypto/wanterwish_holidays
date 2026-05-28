import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaInstagram, 
  FaUser, FaPhoneAlt, FaPaperPlane, FaCheckCircle, 
  FaClock, FaTag, FaCommentDots, FaArrowRight
} from 'react-icons/fa';


export const Contact: React.FC = () => {
  // Contact Form states
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formSubject, setFormSubject] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [shakeKey, setShakeKey] = useState(0); // triggers shake animation on error
  const [confettiParticles, setConfettiParticles] = useState<any[]>([]);

  // 🎊 Confetti shower colors
  const confettiColors = [
    '#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#F97316',
    '#34D399', '#60A5FA', '#F472B6', '#FBBF24', '#818CF8',
    '#FB923C', '#2DD4BF', '#E879F9', '#38BDF8', '#A3E635'
  ];

  // Clear specific field error when user types
  const clearFieldError = (field: string) => {
    if (formErrors[field]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formName.trim()) errors.name = "Full name is required.";
    if (!formPhone.trim()) errors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(formPhone.trim())) errors.phone = "Provide a valid 10-digit number.";
    if (!formSubject.trim()) errors.subject = "Subject is required.";
    if (!formMessage.trim()) errors.message = "Message details are required.";
    if (formEmail.trim() && !/\S+@\S+\.\S+/.test(formEmail)) errors.email = "Provide a valid email address.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setShakeKey(prev => prev + 1); // trigger shake
      return;
    }

    setFormErrors({});
    
    // Generate confetti particles here (pure event handler, side effects allowed!)
    const particles = Array.from({ length: 45 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,              // random horizontal position %
      size: Math.random() * 8 + 5,          // 5–13px
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      delay: Math.random() * 0.8,           // stagger up to 0.8s
      duration: Math.random() * 1.5 + 1.8,  // 1.8–3.3s fall time
      rotateEnd: Math.random() * 720 - 360, // spin between -360 and 360
      drift: Math.random() * 60 - 30,       // horizontal sway px
      shape: Math.random() > 0.5 ? 'circle' : 'rect' // mix shapes
    }));
    setConfettiParticles(particles);
    setFormSubmitted(true);
  };

  const hasErrors = Object.keys(formErrors).length > 0;
  const errorCount = Object.keys(formErrors).length;

  // Shared field variant for stagger
  const fieldVariant = {
    hidden: { opacity: 0, y: 18 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring' as const, stiffness: 120, damping: 15 } 
    }
  };

  return (
    <div className="bg-custom-bg min-h-screen pt-28 pb-20">
      
      {/* Page Header Cover with Cinematic Zoom-out Entry */}
      <div className="relative h-[250px] bg-primary-navy overflow-hidden flex items-center justify-center mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80')" }}
        ></motion.div>
        <div className="absolute inset-0 bg-linear-to-b from-primary-navy/80 to-primary-navy"></div>
        <div className="relative text-center text-white z-10 px-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-orange-cta font-heading text-xs font-bold uppercase tracking-widest block mb-2"
          >
            Get In Touch
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.2 }}
            className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-white m-0"
          >
            Contact Us
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-20">
          
          {/* LEFT: Info Badges & Map */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring" as const, stiffness: 85, damping: 14 }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div>
              <span className="text-teal-accent font-heading font-bold text-xs uppercase tracking-wider block mb-2">
                Have questions?
              </span>
              <h2 className="font-heading font-extrabold text-3xl text-primary-navy mb-4">
                Reach Out To WanderWish
              </h2>
              <p className="text-text-gray text-xs md:text-sm leading-relaxed">
                Whether you are coordinating a massive student group tour, a custom corporate outing, or a serene family getaway, our founder **Vinothini** will directly assist in planning your logistics.
              </p>
            </div>

            {/* Direct Cards */}
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 }
                }
              }}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-4"
            >
              
              {/* Card 1: WhatsApp */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 14 } }
                }}
                whileHover={{ y: -4, scale: 1.01 }}
                href="https://wa.me/918825813453"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-light-gray/40 shadow-premium hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                  <FaWhatsapp className="text-2xl" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-text-gray/50 uppercase tracking-widest block mb-0.5">WhatsApp / Call</span>
                  <h4 className="font-heading font-bold text-sm text-primary-navy">+91 88258 13453</h4>
                </div>
              </motion.a>

              {/* Card 2: Email */}
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 14 } }
                }}
                whileHover={{ y: -4, scale: 1.01 }}
                href="mailto:Wanderwishholidays@gmail.com"
                className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-light-gray/40 shadow-premium hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-teal-50 text-teal-accent flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                  <FaEnvelope className="text-lg" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-text-gray/50 uppercase tracking-widest block mb-0.5">Email Address</span>
                  <h4 className="font-heading font-bold text-sm text-primary-navy break-all">Wanderwishholidays@gmail.com</h4>
                </div>
              </motion.a>

              {/* Card 3: Address */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 14 } }
                }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-light-gray/40 shadow-premium group transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-cta flex items-center justify-center text-xl shrink-0">
                  <FaMapMarkerAlt className="text-lg" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-text-gray/50 uppercase tracking-widest block mb-0.5">Our Chennai Office</span>
                  <h4 className="font-heading font-bold text-xs md:text-sm text-primary-navy leading-normal">
                    No 12/694 Ground Floor, Mahalakshmi Nagar, 6th Street, Kovilambakkam, Chennai - 600129
                  </h4>
                </div>
              </motion.div>

              {/* Card 4: Hours */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 14 } }
                }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-light-gray/40 shadow-premium transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center text-xl shrink-0">
                  <FaClock className="text-lg" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-text-gray/50 uppercase tracking-widest block mb-0.5">Operational Hours</span>
                  <h4 className="font-heading font-bold text-sm text-primary-navy">Mon - Sat: 9:30 AM - 7:30 PM (Sunday Closed)</h4>
                </div>
              </motion.div>

            </motion.div>

            {/* Social media connections */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-primary-navy text-white p-6 rounded-3xl border border-white/5 shadow-premium flex items-center justify-between gap-4 transition-all duration-300"
            >
              <div>
                <h4 className="font-heading font-bold text-sm text-white">Join Our Instagram</h4>
                <p className="text-white/60 text-[11px] mt-1">Get updates on ongoing group discounts.</p>
              </div>
              <a
                href="https://instagram.com/wanderwish_holidays"
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 w-11 bg-white/5 hover:bg-linear-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 text-white flex items-center justify-center rounded-2xl transition-all duration-300 border border-white/10 hover:scale-105 shadow-md cursor-pointer"
                title="Follow WanderWish on Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
            </motion.div>

          </motion.div>

          {/* RIGHT: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring" as const, stiffness: 85, damping: 14 }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 shadow-premium border border-light-gray/40"
          >
            {/* Form Header with icon */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="h-9 w-9 rounded-xl bg-linear-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-md shrink-0">
                <FaCommentDots className="text-white text-base" />
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-primary-navy">
                Send Us A Message
              </h3>
            </motion.div>
            <p className="text-text-gray text-xs md:text-sm mb-8 ml-12">
              Fill in the form below — we'll get back to you personally.
            </p>

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.div
                  key={`form-shake-${shakeKey}`}
                  animate={shakeKey > 0 ? {
                    x: [0, -8, 8, -6, 6, -3, 3, 0],
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                <motion.form
                  key="contact-main-form"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -10 }}
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.09 } }
                  }}
                  onSubmit={handleContactSubmit}
                  className="flex flex-col gap-5"
                >

                  {/* 🚨 Error Banner */}
                  <AnimatePresence>
                    {hasErrors && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3"
                      >
                        <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-red-500 text-xs font-bold">!</span>
                        </div>
                        <div>
                          <p className="text-red-600 text-xs font-bold mb-0.5">
                            Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} below
                          </p>
                          <p className="text-red-400 text-[10px]">
                            Required fields are marked with *. Complete all to send your message.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Grid fields: Name & Phone */}
                  <motion.div variants={fieldVariant} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="relative">
                      <div className={`absolute top-1/2 left-3 -translate-y-1/2 h-7 w-7 rounded-lg flex items-center justify-center shadow-sm pointer-events-none z-10 transition-colors duration-200 ${
                        formErrors.name ? 'bg-linear-to-br from-red-400 to-red-600' : 'bg-linear-to-br from-blue-400 to-blue-600'
                      }`}>
                        <FaUser className="text-white" style={{ fontSize: '0.6rem' }} />
                      </div>
                      <motion.input
                        whileFocus={{ scale: 1.01, boxShadow: formErrors.name ? '0 0 0 3px rgba(239,68,68,0.2)' : '0 0 0 3px rgba(13,148,136,0.15)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        type="text"
                        placeholder="Your Full Name *"
                        value={formName}
                        onChange={(e) => { setFormName(e.target.value); clearFieldError('name'); }}
                        className={`w-full pl-12 pr-4 py-3.5 bg-custom-bg border text-xs rounded-xl focus:outline-none focus:bg-white text-primary-navy font-medium placeholder-text-gray/50 transition-all duration-200 ${
                          formErrors.name ? 'border-red-400 focus:border-red-400 bg-red-50/30 shadow-[0_0_0_2px_rgba(239,68,68,0.1)]' : 'border-light-gray/60 focus:border-teal-accent'
                        }`}
                      />
                      {formErrors.name && (
                        <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 block mt-1 pl-1 font-semibold">{formErrors.name}</motion.span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <div className={`absolute top-1/2 left-3 -translate-y-1/2 h-7 w-7 rounded-lg flex items-center justify-center shadow-sm pointer-events-none z-10 transition-colors duration-200 ${
                        formErrors.phone ? 'bg-linear-to-br from-red-400 to-red-600' : 'bg-linear-to-br from-green-400 to-green-600'
                      }`}>
                        <FaPhoneAlt className="text-white" style={{ fontSize: '0.6rem' }} />
                      </div>
                      <motion.input
                        whileFocus={{ scale: 1.01, boxShadow: formErrors.phone ? '0 0 0 3px rgba(239,68,68,0.2)' : '0 0 0 3px rgba(13,148,136,0.15)' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        type="tel"
                        placeholder="10-Digit Mobile Phone *"
                        value={formPhone}
                        onChange={(e) => { setFormPhone(e.target.value); clearFieldError('phone'); }}
                        className={`w-full pl-12 pr-4 py-3.5 bg-custom-bg border text-xs rounded-xl focus:outline-none focus:bg-white text-primary-navy font-medium placeholder-text-gray/50 transition-all duration-200 ${
                          formErrors.phone ? 'border-red-400 focus:border-red-400 bg-red-50/30 shadow-[0_0_0_2px_rgba(239,68,68,0.1)]' : 'border-light-gray/60 focus:border-teal-accent'
                        }`}
                      />
                      {formErrors.phone && (
                        <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 block mt-1 pl-1 font-semibold">{formErrors.phone}</motion.span>
                      )}
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div variants={fieldVariant} className="relative">
                    <div className={`absolute top-1/2 left-3 -translate-y-1/2 h-7 w-7 rounded-lg flex items-center justify-center shadow-sm pointer-events-none z-10 transition-colors duration-200 ${
                      formErrors.email ? 'bg-linear-to-br from-red-400 to-red-600' : 'bg-linear-to-br from-purple-400 to-purple-600'
                    }`}>
                      <FaEnvelope className="text-white" style={{ fontSize: '0.6rem' }} />
                    </div>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: formErrors.email ? '0 0 0 3px rgba(239,68,68,0.2)' : '0 0 0 3px rgba(13,148,136,0.15)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      type="email"
                      placeholder="Email Address (Optional)"
                      value={formEmail}
                      onChange={(e) => { setFormEmail(e.target.value); clearFieldError('email'); }}
                      className={`w-full pl-12 pr-4 py-3.5 bg-custom-bg border text-xs rounded-xl focus:outline-none focus:bg-white text-primary-navy font-medium placeholder-text-gray/50 transition-all duration-200 ${
                        formErrors.email ? 'border-red-400 focus:border-red-400 bg-red-50/30 shadow-[0_0_0_2px_rgba(239,68,68,0.1)]' : 'border-light-gray/60 focus:border-teal-accent'
                      }`}
                    />
                    {formErrors.email && (
                      <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 block mt-1 pl-1 font-semibold">{formErrors.email}</motion.span>
                    )}
                  </motion.div>

                  {/* Subject */}
                  <motion.div variants={fieldVariant} className="relative">
                    <div className={`absolute top-1/2 left-3 -translate-y-1/2 h-7 w-7 rounded-lg flex items-center justify-center shadow-sm pointer-events-none z-10 transition-colors duration-200 ${
                      formErrors.subject ? 'bg-linear-to-br from-red-400 to-red-600' : 'bg-linear-to-br from-orange-400 to-orange-500'
                    }`}>
                      <FaTag className="text-white" style={{ fontSize: '0.6rem' }} />
                    </div>
                    <motion.input
                      whileFocus={{ scale: 1.01, boxShadow: formErrors.subject ? '0 0 0 3px rgba(239,68,68,0.2)' : '0 0 0 3px rgba(13,148,136,0.15)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      type="text"
                      placeholder="Message Subject (e.g. Requesting Manali Itinerary) *"
                      value={formSubject}
                      onChange={(e) => { setFormSubject(e.target.value); clearFieldError('subject'); }}
                      className={`w-full pl-12 pr-4 py-3.5 bg-custom-bg border text-xs rounded-xl focus:outline-none focus:bg-white text-primary-navy font-medium placeholder-text-gray/50 transition-all duration-200 ${
                        formErrors.subject ? 'border-red-400 focus:border-red-400 bg-red-50/30 shadow-[0_0_0_2px_rgba(239,68,68,0.1)]' : 'border-light-gray/60 focus:border-teal-accent'
                      }`}
                    />
                    {formErrors.subject && (
                      <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 block mt-1 pl-1 font-semibold">{formErrors.subject}</motion.span>
                    )}
                  </motion.div>

                  {/* Message Textarea */}
                  <motion.div variants={fieldVariant} className="relative">
                    <div className={`absolute top-3.5 left-3 h-7 w-7 rounded-lg flex items-center justify-center shadow-sm pointer-events-none z-10 transition-colors duration-200 ${
                      formErrors.message ? 'bg-linear-to-br from-red-400 to-red-600' : 'bg-linear-to-br from-teal-400 to-teal-600'
                    }`}>
                      <FaCommentDots className="text-white" style={{ fontSize: '0.6rem' }} />
                    </div>
                    <motion.textarea
                      whileFocus={{ scale: 1.005, boxShadow: formErrors.message ? '0 0 0 3px rgba(239,68,68,0.2)' : '0 0 0 3px rgba(13,148,136,0.15)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      rows={5}
                      placeholder="Type your travel requirements, dates, group size, destinations..."
                      value={formMessage}
                      onChange={(e) => { setFormMessage(e.target.value); clearFieldError('message'); }}
                      className={`w-full pl-12 pr-4 py-3.5 bg-custom-bg border text-xs rounded-xl focus:outline-none focus:bg-white text-primary-navy font-medium placeholder-text-gray/50 resize-none transition-all duration-200 ${
                        formErrors.message ? 'border-red-400 focus:border-red-400 bg-red-50/30 shadow-[0_0_0_2px_rgba(239,68,68,0.1)]' : 'border-light-gray/60 focus:border-teal-accent'
                      }`}
                    />
                    {formErrors.message && (
                      <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] text-red-500 block mt-1 pl-1 font-semibold">{formErrors.message}</motion.span>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div variants={fieldVariant}>
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.18)' }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="relative w-full overflow-hidden bg-primary-navy text-orange-cta font-heading font-bold text-sm py-4 px-6 rounded-2xl shadow-md inline-flex items-center justify-center gap-3 cursor-pointer group"
                    >
                      {/* Shimmer sweep on hover */}
                      <motion.span
                        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                        initial={{ x: '-120%' }}
                        whileHover={{ x: '220%' }}
                        transition={{ duration: 0.55, ease: 'easeInOut' }}
                      />
                      {/* Plane icon tilts on hover */}
                      <motion.span
                        className="inline-flex items-center"
                        whileHover={{ x: 3, rotate: -20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                      >
                        <FaPaperPlane className="text-sm text-orange-cta" />
                      </motion.span>
                      <span>Send Your Message</span>
                      <span className="inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <FaArrowRight className="text-xs text-orange-cta/70" />
                      </span>
                    </motion.button>
                  </motion.div>

                </motion.form>
                </motion.div>
              ) : (
                /* Success state with confetti shower */
                <motion.div
                  key="contact-success-state"
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring" as const, stiffness: 120, damping: 15 }}
                  className="relative text-center py-12 flex flex-col items-center overflow-hidden min-h-[340px]"
                >
                  {/* 🎊 Confetti Shower Layer */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                    {confettiParticles.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ 
                          y: -20, 
                          x: 0,
                          opacity: 1, 
                          rotate: 0,
                          scale: 0 
                        }}
                        animate={{ 
                          y: 420, 
                          x: p.drift,
                          opacity: [1, 1, 0.8, 0], 
                          rotate: p.rotateEnd,
                          scale: [0, 1.2, 1, 0.6]
                        }}
                        transition={{ 
                          duration: p.duration, 
                          delay: p.delay, 
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        style={{
                          position: 'absolute',
                          left: `${p.x}%`,
                          top: 0,
                          width: p.size,
                          height: p.shape === 'circle' ? p.size : p.size * 0.5,
                          backgroundColor: p.color,
                          borderRadius: p.shape === 'circle' ? '50%' : '2px',
                        }}
                      />
                    ))}
                  </div>

                  {/* Success Content (above confetti) */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div 
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring" as const, stiffness: 220, damping: 12, delay: 0.1 }}
                      className="h-20 w-20 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-6 shadow-lg"
                    >
                      <FaCheckCircle className="text-4xl text-white" />
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="font-heading font-extrabold text-2xl text-primary-navy mb-2"
                    >
                      Message Sent! 🎉
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-text-gray text-xs md:text-sm leading-relaxed mb-8 max-w-md"
                    >
                      Thank you, <strong>{formName}</strong>! Your enquiry about <strong>"{formSubject}"</strong> has been recorded. Vinothini will personally reach out to <strong>{formPhone}</strong> soon.
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormName("");
                        setFormPhone("");
                        setFormEmail("");
                        setFormSubject("");
                        setFormMessage("");
                        setConfettiParticles([]);
                      }}
                      className="bg-teal-50 hover:bg-teal-100 text-teal-accent font-bold text-xs px-6 py-3 rounded-xl border border-teal-200/50 cursor-pointer inline-flex items-center gap-2"
                    >
                      <FaPaperPlane className="text-xs" />
                      Send Another Message
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </div>
  );
};
