import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaWhatsapp, FaArrowRight, FaPlane, FaCompass, FaGlobe, FaMapMarkedAlt } from 'react-icons/fa';

export const Hero: React.FC = () => {
  // Animation Variants for staggered content entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: -40, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 120, damping: 14 } 
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 85, damping: 11 } 
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring" as const, stiffness: 90, damping: 15 } 
    }
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const ctaLeftVariants = {
    hidden: { opacity: 0, x: -35, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
    }
  };

  const ctaRightVariants = {
    hidden: { opacity: 0, x: 35, scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-primary-navy">
      {/* Background Image with Dark Vignette Overlay and Cinematic Zoom-out Entry */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80')" 
        }}
      ></motion.div>
      <div className="absolute inset-0 bg-linear-to-b from-primary-navy/80 via-primary-navy/70 to-primary-navy opacity-90"></div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-teal-accent/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-orange-cta/5 rounded-full blur-3xl animate-pulse duration-500"></div>

      {/* Floating Travel Icons */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[12%] text-white/10 hidden md:block text-5xl pointer-events-none"
      >
        <FaCompass />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[30%] left-[8%] text-white/5 hidden md:block text-6xl pointer-events-none"
      >
        <FaGlobe />
      </motion.div>
      <motion.div 
        animate={{ y: [0, -25, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[10%] text-white/10 hidden md:block text-5xl pointer-events-none"
      >
        <FaMapMarkedAlt />
      </motion.div>
      <motion.div 
        animate={{ 
          x: [-20, 30, -20],
          y: [-10, 15, -10],
          rotate: [0, 12, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[15%] text-white/10 hidden md:block text-4xl pointer-events-none"
      >
        <FaPlane className="rotate-45" />
      </motion.div>

      {/* Hero Content Section */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex flex-col items-center text-center z-10"
      >
        
        {/* Animated Badge */}
        <motion.div
          variants={badgeVariants}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-6 shadow-lg hover:bg-white/20 transition-colors duration-300"
        >
          <FaPlane className="text-orange-cta text-xs animate-bounce" />
          <span className="text-[10px] md:text-xs font-bold tracking-widest text-white uppercase font-sans">
            Start Your Next Adventure
          </span>
        </motion.div>

        {/* Brand Tagline Header with Elastic Typography Entrance */}
        <motion.h1
          variants={titleVariants}
          className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 uppercase"
        >
          Dream. <span className="text-teal-accent">Explore.</span> <span className="text-orange-cta">Repeat.</span>
        </motion.h1>

        {/* Brand Subheading */}
        <motion.p
          variants={descriptionVariants}
          className="max-w-2xl text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium mb-8 leading-relaxed font-sans"
        >
          Plan Your Perfect Trip with WanderWish Holidays
        </motion.p>

        {/* Auto Typing Banner */}
        <motion.div
          variants={descriptionVariants}
          className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-orange-cta mb-12 h-12 flex items-center justify-center"
        >
          <TypeAnimation
            sequence={[
              'Explore Manali',
              2000,
              'Explore Delhi',
              2000,
              'Explore Singapore',
              2000,
              'Explore South India',
              2000,
              'Plan College Tours',
              2000,
              'Plan School Trips',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="cursor-default"
          />
        </motion.div>

        {/* Click Actions */}
        <motion.div
          variants={listContainerVariants}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <motion.div variants={ctaLeftVariants} className="w-full sm:w-auto">
            <Link
              to="/packages"
              className="w-full sm:w-auto bg-teal-accent hover:bg-teal-accent/95 text-white font-heading font-bold text-sm px-8 py-4.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-teal-accent/20 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore Packages
              <FaArrowRight className="text-xs" />
            </Link>
          </motion.div>
          
          <motion.div variants={ctaRightVariants} className="w-full sm:w-auto">
            <a
              href="https://wa.me/918825813453?text=Hi%20WanderWish%20Holidays!%20I%27d%20like%20to%20plan%20a%20vacation%20trip.%20Please%20help%20me%20design%20an%20itinerary."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-heading font-bold text-sm px-8 py-4.5 rounded-xl transition-all duration-300 shadow-md border border-white/20 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaWhatsapp className="text-lg text-green-400 shrink-0" />
              Plan Your Trip
            </a>
          </motion.div>
        </motion.div>

      </motion.div>

      {/* Decorative Wave Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[35px] text-custom-bg fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,87.43,26.24,186,52.24,263.39,67.23,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  );
};
