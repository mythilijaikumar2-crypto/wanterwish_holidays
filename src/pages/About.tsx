import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, FaBullseye, FaEye, FaAward, FaUsers, 
  FaGlobeAsia, FaHeadset, FaMapMarkedAlt, FaGraduationCap, 
  FaSuitcase, FaHeart 
} from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';



export const About: React.FC = () => {
  const stats = [
    { label: "Founded Year", value: "2026", icon: FaCalendarAlt, color: "bg-blue-500/10 text-blue-500" },
    { label: "Special Packages", value: "50+", icon: FaGlobeAsia, color: "bg-teal-accent/10 text-teal-accent" },
    { label: "Happy Travelers", value: "1,200+", icon: FaUsers, color: "bg-orange-cta/10 text-orange-cta" },
    { label: "Support Hours", value: "24 / 7", icon: FaHeadset, color: "bg-purple-500/10 text-purple-500" }
  ];

  return (
    <div className="bg-custom-bg min-h-screen pt-28 pb-20">
      
      {/* Cinematic Perspective Video Hero */}
      <div className="relative min-h-[480px] bg-primary-navy overflow-hidden flex items-center justify-center mb-16 rounded-b-[3rem] border-b border-teal-500/10 shadow-2xl">
        {/* Video Element */}
        <div className="absolute inset-0 z-0 scale-105 transform">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          >
            <source src="/src/assets/v1.mp4" type="video/mp4" />
          </video>
          {/* Stunning radial and linear overlay gradient combination */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/85 via-primary-navy/60 to-primary-navy"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,154,170,0.25),transparent_70%)]"></div>
        </div>

        {/* Floating cinematic grid lines for depth/perspective */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:35px_35px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)] pointer-events-none opacity-45 z-10"></div>

        {/* Content with 3D tilt perspective entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 30, rotateX: 12 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative text-center text-white z-20 px-4 max-w-4xl"
          style={{ perspective: 1000 }}
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-orange-cta font-heading text-xs font-bold uppercase block mb-3"
          >
            Who We Are
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 85, damping: 14, delay: 0.3 }}
            className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white m-0 drop-shadow-lg"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-100 to-orange-cta">WanderWish</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/80 text-xs md:text-sm font-medium max-w-2xl mx-auto mt-4 leading-relaxed font-sans"
          >
            Curating seamless, customized travel itineraries and school expeditions across gorgeous destinations with full hospitality.
          </motion.p>
        </motion.div>

        {/* Ambient bottom curved horizon mask */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-custom-bg to-transparent z-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Interactive Company Story & Service Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Column 1: Dynamic Typing Animation Showcase Box */}
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
            className="lg:col-span-5 bg-primary-navy text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group border border-white/10 flex flex-col justify-between min-h-[460px]"
          >
            {/* Visual ambient glows inside the box */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-accent/5 rounded-bl-full pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-orange-cta/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div>
              <span className="text-orange-cta font-heading text-xs font-bold uppercase tracking-wider block mb-4">
                What We Do Best
              </span>
              
              {/* Massive Typing Animation display */}
              <div className="min-h-[140px] flex flex-col justify-start">
                <span className="font-heading font-black text-2xl md:text-3xl text-white/60 block leading-tight">
                  At WanderWish,
                </span>
                <span className="font-heading font-black text-2xl md:text-3xl text-orange-cta block mt-2 leading-tight">
                  <TypeAnimation
                    sequence={[
                      'We plan custom family tours.',
                      2000,
                      'We orchestrate school expeditions.',
                      2000,
                      'We design college tour packages.',
                      2000,
                      'We coordinate corporate getaways.',
                      2000,
                      'We tailor honeymoon packages.',
                      2000
                    ]}
                    wrapper="span"
                    speed={45}
                    repeat={Infinity}
                  />
                </span>
              </div>
            </div>

            {/* Interactive category buttons inside the grid showcase */}
            <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 hover:border-orange-cta/30 transition-all duration-300 group/item">
                <div className="h-8 w-8 rounded-lg bg-orange-cta/10 text-orange-cta flex items-center justify-center text-sm group-hover/item:scale-110 transition-transform">
                  <FaMapMarkedAlt />
                </div>
                <span className="text-[11px] font-bold tracking-wide uppercase text-white/95">Family Leisure</span>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 hover:border-teal-accent/30 transition-all duration-300 group/item">
                <div className="h-8 w-8 rounded-lg bg-teal-accent/10 text-teal-accent flex items-center justify-center text-sm group-hover/item:scale-110 transition-transform">
                  <FaGraduationCap />
                </div>
                <span className="text-[11px] font-bold tracking-wide uppercase text-white/95">Student Trips</span>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group/item">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm group-hover/item:scale-110 transition-transform">
                  <FaSuitcase />
                </div>
                <span className="text-[11px] font-bold tracking-wide uppercase text-white/95">Corporate MICE</span>
              </div>

              <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 hover:border-pink-500/30 transition-all duration-300 group/item">
                <div className="h-8 w-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center text-sm group-hover/item:scale-110 transition-transform">
                  <FaHeart />
                </div>
                <span className="text-[11px] font-bold tracking-wide uppercase text-white/95">Honeymoons</span>
              </div>
            </div>

          </motion.div>

          {/* Column 2: Detailed Company Story Narrative */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { staggerChildren: 0.1, delayChildren: 0.15 }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <motion.span 
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="text-teal-accent font-heading font-bold text-xs uppercase tracking-wider block"
            >
              Our Journey & Philosophy
            </motion.span>
            
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 14 } } }}
              className="font-heading font-extrabold text-3xl md:text-4xl text-primary-navy"
            >
              Crafting Exceptional Custom Travel Experiences Across India
            </motion.h2>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="text-text-gray text-xs md:text-sm leading-relaxed"
            >
              WanderWish Holidays was established as a premier destination management company with a clear and straightforward mission: to curate exceptionally detailed, secure, and personalized itineraries that turn your travel expectations into unforgettable real memories. We believe that holiday planning should be completely stress-free, which is why our agency coordinates every logistical element with absolute precision.
            </motion.p>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="text-text-gray text-xs md:text-sm leading-relaxed"
            >
              We specialize in custom holiday planning. From securing hand-picked quality hotel accommodations and arranging safe, licensed private transport vehicles to managing certified local tour guides, ticketing admissions, and tailored dining experiences, we leave nothing to chance. Each itinerary is thoroughly vetted to guarantee seamless transitions and complete safety for every traveler.
            </motion.p>

            <motion.p 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="text-text-gray text-xs md:text-sm leading-relaxed"
            >
              Our institutional and corporate operations are held to the highest industry standards. When coordinating massive student travel programs for schools and colleges, or designing reward getaways for corporate groups, we prioritize safety, timing coordination, and detailed supervision above all else. This professional approach has made WanderWish Holidays a trusted name for group expeditions.
            </motion.p>
            
            {/* Quote block */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 14 } }
              }}
              className="border-l-4 border-orange-cta bg-orange-50/50 p-5 rounded-r-xl"
            >
              <p className="text-primary-navy font-semibold italic text-xs leading-relaxed">
                "Travel is not just about check-marking pins on a physical map; it is about building deep connections, experiencing foreign cultures, and discovering yourself in beautiful, vast horizons. At WanderWish, we ensure your journey is as comfortable and magnificent as your destination."
              </p>
            </motion.div>
          </motion.div>

        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring" as const, stiffness: 100, damping: 14, delay: idx * 0.08 }}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.06)" }}
                className="bg-white rounded-2xl p-6 shadow-premium border border-light-gray/40 text-center flex flex-col items-center group cursor-default transition-all duration-300"
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3 ${stat.color}`}>
                  <StatIcon className="text-xl" />
                </div>
                <h3 className="font-heading font-black text-3xl text-primary-navy mb-1">
                  {stat.value}
                </h3>
                <span className="text-xs font-semibold text-text-gray/80 tracking-wide uppercase">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Mission & Vision Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 80, damping: 15 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(20, 184, 166, 0.08)" }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-premium border border-light-gray/40 relative overflow-hidden group transition-all duration-300 hover:border-teal-accent/20"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-accent/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-teal-accent/10 text-teal-accent mb-6 shadow-inner transition-transform group-hover:scale-105 group-hover:-rotate-3">
              <FaBullseye className="text-xl" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-primary-navy mb-4 transition-colors group-hover:text-teal-accent">
              Our Mission
            </h3>
            <p className="text-text-gray text-xs md:text-sm leading-relaxed">
              To design bespoke, secure, and inspiring domestic and international holiday tour packages. By focusing on customer comfort, handpicked hotel stays, and professional guided details, we aim to design stress-free getaways that convert travel desires into beautiful actual experiences.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 80, damping: 15 }}
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(249, 115, 22, 0.08)" }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-premium border border-light-gray/40 relative overflow-hidden group transition-all duration-300 hover:border-orange-cta/20"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-cta/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-orange-cta/10 text-orange-cta mb-6 shadow-inner transition-transform group-hover:scale-105 group-hover:rotate-3">
              <FaEye className="text-xl" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-primary-navy mb-4 transition-colors group-hover:text-orange-cta">
              Our Vision
            </h3>
            <p className="text-text-gray text-xs md:text-sm leading-relaxed">
              To be recognized as India's premier boutique travel agency, acclaimed for our transparency, student group care, and customized honeymoon solutions. We envision a future where WanderWish is synonymous with extraordinary, reliable, and lifetime-enriching holiday escapes.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Us trust banners */}
        <div className="bg-primary-navy rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80')" }}></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            <span className="text-orange-cta font-heading text-xs font-bold uppercase tracking-widest block mb-2">
              Our Service Guarantee
            </span>
            <h3 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-6">
              Why Travelers Choose WanderWish Holidays
            </h3>
            <p className="text-white/70 text-xs md:text-sm leading-relaxed max-w-2xl mb-8">
              We treat each traveler as a personal guest. By handling accommodation bookings, transportation details, meals planning, and activity admissions securely, we let you concentrate on what truly matters: making beautiful memories with your companions.
            </p>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15 }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-4"
            >
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 14 } }
                }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <FaAward className="text-3xl text-orange-cta group-hover:scale-110 transition-transform duration-300" />
                <span className="font-heading font-bold text-sm">Vetted Accommodations</span>
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 14 } }
                }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <FaUsers className="text-3xl text-orange-cta group-hover:scale-110 transition-transform duration-300" />
                <span className="font-heading font-bold text-sm">Professional Guides</span>
              </motion.div>
              
              <motion.div 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 14 } }
                }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center gap-2 group cursor-default"
              >
                <FaHeadset className="text-3xl text-orange-cta group-hover:scale-110 transition-transform duration-300" />
                <span className="font-heading font-bold text-sm">24/7 Operations Concierge</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};
