import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaBullseye, FaEye, FaAward, FaUsers, FaGlobeAsia, FaHeadset } from 'react-icons/fa';



export const About: React.FC = () => {
  const stats = [
    { label: "Founded Year", value: "2026", icon: FaCalendarAlt, color: "bg-blue-500/10 text-blue-500" },
    { label: "Special Packages", value: "50+", icon: FaGlobeAsia, color: "bg-teal-accent/10 text-teal-accent" },
    { label: "Happy Travelers", value: "1,200+", icon: FaUsers, color: "bg-orange-cta/10 text-orange-cta" },
    { label: "Support Hours", value: "24 / 7", icon: FaHeadset, color: "bg-purple-500/10 text-purple-500" }
  ];

  return (
    <div className="bg-custom-bg min-h-screen pt-28 pb-20">
      
      {/* Page Header Cover */}
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
            Who We Are
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.2 }}
            className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-white m-0"
          >
            About WanderWish
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Profile: Story & Founder */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Column 1: Image container */}
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" as const, stiffness: 80, damping: 15 }}
            whileHover={{ y: -8, rotate: -1 }}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-4 bg-teal-accent/10 rounded-3xl -rotate-3 -z-10 transition-transform group-hover:scale-102"></div>
            <div className="absolute -inset-4 bg-orange-cta/10 rounded-3xl rotate-3 -z-10 transition-transform group-hover:scale-102"></div>
            <div className="overflow-hidden rounded-2xl shadow-premium aspect-4/5">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                alt="Vinothini - Founder of WanderWish Holidays" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
              />
            </div>
            {/* Founder details badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring" as const, stiffness: 100, damping: 14, delay: 0.3 }}
              className="absolute bottom-6 left-6 right-6 bg-primary-navy/95 backdrop-blur-md text-white p-4 rounded-xl shadow-xl border border-white/10 group-hover:border-orange-cta/30 transition-colors duration-300"
            >
              <span className="text-orange-cta text-[10px] font-bold tracking-widest uppercase block mb-1">
                Founder & Lead Director
              </span>
              <h3 className="font-heading font-extrabold text-lg text-white m-0">
                Vinothini
              </h3>
              <p className="text-white/60 text-xs mt-1">
                Founded WanderWish Holidays in 2026.
              </p>
            </motion.div>
          </motion.div>

          {/* Column 2: Text block */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
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
              Dream. Explore. Repeat.
            </motion.span>
            
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 14 } } }}
              className="font-heading font-extrabold text-3xl md:text-4xl text-primary-navy"
            >
              Crafting Exceptional Custom Travel Experiences Since 2026
            </motion.h2>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="text-text-gray text-sm md:text-base leading-relaxed"
            >
              WanderWish Holidays was established under the leadership of our founder, **Vinothini**, with a straightforward mission: to curate seamless, secure, highly personalized, and stunning travel itineraries that allow explorers to discover the global beauty with total peace of mind.
            </motion.p>
            
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              className="text-text-gray text-sm md:text-base leading-relaxed"
            >
              We specialize in creating customized holidays for couples, leisure packages for families, action-packed college getaways, and safely supervised educational field trips for schools. Grounded in transparency and outstanding customer support, WanderWish Holidays ensures that every tour is filled with beautiful, lifetime-lasting smiles.
            </motion.p>

            {/* Quote block */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 14 } }
              }}
              className="border-l-4 border-orange-cta bg-orange-50/50 p-5 rounded-r-xl"
            >
              <p className="text-primary-navy font-medium italic text-xs md:text-sm leading-relaxed">
                "Travel is not just about check-marking pins on a map; it is about building deep connections, creating joyful spaces, and discovering yourself in beautiful, foreign horizons. At WanderWish, we ensure your journey is as magnificent as your destination."
              </p>
              <span className="block text-right text-xs font-bold text-teal-accent mt-2">
                - Vinothini, Founder
              </span>
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
