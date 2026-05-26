import React from 'react';
import { motion } from 'framer-motion';
import { DestinationCard } from '../components/DestinationCard';

import { destinations } from '../data/destinations';

export const Destinations: React.FC = () => {
  return (
    <div className="bg-custom-bg min-h-screen pt-28 pb-20">
      
      {/* Page Header Cover with Premium Cinematic Reveal and Intro Animations */}
      <div className="relative h-[360px] md:h-[420px] bg-primary-navy overflow-hidden flex items-center justify-center mb-16">
        
        {/* Parallax Zoom Background Entry */}
        <motion.div 
          initial={{ opacity: 0, scale: 1.25 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80')" }}
        ></motion.div>
        
        {/* Sleek Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-navy via-primary-navy/40 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-b from-primary-navy/80 via-transparent to-transparent"></div>

        {/* Hero Reveal & Introduction Content */}
        <div className="relative text-center text-white z-10 px-4 max-w-4xl mx-auto flex flex-col items-center gap-4">
          
          {/* Badge: Framer Motion Spring Fade Pop */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.15 }}
            className="flex items-center gap-2 bg-white/10 px-4.5 py-2 rounded-2xl w-fit backdrop-blur-md border border-white/10 shadow-lg"
          >
            <span className="h-2 w-2 rounded-full bg-teal-accent animate-pulse"></span>
            <span className="text-orange-cta font-heading text-[10px] md:text-xs font-black uppercase tracking-widest">
              Beautiful Escape Spots
            </span>
          </motion.div>

          {/* Title: Unfolding Mask Reveal Animation */}
          <div className="overflow-hidden py-1">
            <motion.h1 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 75, damping: 14, delay: 0.3 }}
              className="font-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white m-0 leading-none"
            >
              Popular Destinations
            </motion.h1>
          </div>

          {/* Subheading text: Framer Motion Fade Pop */}
          <motion.p 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0.55 }}
            className="text-white/85 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-medium font-sans m-0"
          >
            Explore our handpicked collection of breathtaking destinations. From the mist-covered valleys of the South to snowy Himalayan routes and futuristic cities.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 90, damping: 14 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-teal-accent font-heading font-bold text-xs uppercase tracking-wider block mb-2">
            Dream. Explore. Repeat.
          </span>
          <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-primary-navy mb-4">
            Handpicked Places For Your Next Holiday Getaway
          </h2>
          <p className="text-text-gray text-xs md:text-sm leading-relaxed">
            WanderWish Holidays curates remarkable packages across scenic hill stations, vibrant heritage hubs, and futuristic global cities. Choose your destination below to browse corresponding tour itineraries.
          </p>
        </motion.div>

        {/* Responsive Grid list of DestinationCards */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {destinations.map((dest) => (
            <motion.div
              key={dest.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
              }}
            >
              <DestinationCard destination={dest} />
            </motion.div>
          ))}
        </motion.div>


        {/* Dynamic call to action card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" as const, stiffness: 85, damping: 14 }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-light-gray/40 shadow-premium mt-20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-orange-cta/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
          
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-cta block mb-2 font-heading">
              Custom Itineraries
            </span>
            <h3 className="font-heading font-extrabold text-2xl text-primary-navy mb-3">
              Planning to travel somewhere else?
            </h3>
            <p className="text-text-gray text-xs md:text-sm leading-relaxed">
              We customize holidays for any location worldwide. Share your dream getaway with us and we'll craft the perfect tailor-made itinerary.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://wa.me/918825813453?text=Hi%20WanderWish%20Holidays!%20I%20want%20to%20plan%20a%20trip%20to%20a%20custom%20destination.%20Please%20help%20me%20design%20an%20itinerary."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-navy hover:bg-primary-navy/95 text-orange-cta font-heading font-bold text-xs md:text-sm px-8 py-4 rounded-xl shadow-md transition-all shrink-0 cursor-pointer text-center"
          >
            Request Custom Destination
          </motion.a>
        </motion.div>

      </div>
    </div>
  );
};
