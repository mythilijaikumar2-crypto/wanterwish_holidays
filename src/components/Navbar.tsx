import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaWhatsapp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import logoImg from '../assets/wanderlogopng.png';


export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll detection to update background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close navigation drawer and dropdown on route changes asynchronously to avoid synchronous cascading state updates
  useEffect(() => {
    const handle = setTimeout(() => {
      setIsOpen(false);
      setIsDropdownOpen(false);
    }, 0);
    return () => clearTimeout(handle);
  }, [location]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // 200ms grace period buffer for diagonal sweeping
  };

  const packageCategories = [
    { name: "Indian Tour Packages", id: "indian-tours" },
    { name: "South India Tour Packages", id: "south-india" },
    { name: "International Tour Packages", id: "international-tours" },
    { name: "College / School Tour Packages", id: "college-school-tours" }
  ];

  // Help generate active state styling
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const linkStyles = (path: string) => {
    const activeClass = "text-orange-cta font-semibold";
    const inactiveClass = isScrolled 
      ? "text-white/80 hover:text-orange-cta" 
      : "text-white/90 hover:text-orange-cta";
    return `text-sm transition-all duration-300 font-medium ${isActive(path) ? activeClass : inactiveClass}`;
  };

  const mobileLinkStyles = (path: string) => {
    return `text-lg font-semibold block py-3 border-b border-white/10 ${
      isActive(path) ? 'text-orange-cta' : 'text-white'
    }`;
  };



  return (
    <div className="fixed top-0 left-0 w-full z-40 px-4 sm:px-6 lg:px-8 pt-3 transition-all duration-500">
      <nav className={`mx-auto max-w-7xl transition-all duration-500 ease-out rounded-2xl glass-nav border border-white/10 ${
        isScrolled 
          ? 'shadow-2xl py-1.5 px-6 scale-[0.98]' 
          : 'shadow-xl py-2 px-6'
      }`}>
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <motion.div 
              whileHover={{ 
                scale: 1.15, 
                rotate: [0, -10, 10, -5, 5, 0],
                boxShadow: "0 0 25px rgba(27, 154, 170, 0.7)",
                borderColor: "rgba(246, 166, 35, 0.8)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 15 }}
              className="h-11 w-11 min-w-11 rounded-xl bg-white p-0.5 flex items-center justify-center shadow-md border border-teal-500/20 transition-all duration-300"
            >
              <img src={logoImg} alt="WanderWish Holidays Logo" className="h-full w-full object-contain" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-lg md:text-xl tracking-tight text-white group-hover:text-orange-cta transition-colors duration-300">
                {t('brandName')}
              </span>
              <span className="text-[9px] uppercase tracking-widest text-orange-cta font-black font-sans leading-none mt-0.5">
                {t('brandSub')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`relative py-2 ${linkStyles('/')}`}>
              <span>{t('navHome')}</span>
              {isActive('/') && (
                <motion.span 
                  layoutId="activeIndicator" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-cta rounded-full shadow-[0_0_8px_rgba(246,166,35,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            
            <Link to="/about" className={`relative py-2 ${linkStyles('/about')}`}>
              <span>{t('navAbout')}</span>
              {isActive('/about') && (
                <motion.span 
                  layoutId="activeIndicator" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-cta rounded-full shadow-[0_0_8px_rgba(246,166,35,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            
            {/* Desktop Packages Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                to="/packages"
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
                className={`flex items-center gap-1 cursor-pointer focus:outline-none ${linkStyles('/packages')}`}
              >
                <span>{t('navPackages')}</span>
                <FaChevronDown className={`text-[10px] mt-0.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                {isActive('/packages') && (
                  <motion.span 
                    layoutId="activeIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-cta rounded-full shadow-[0_0_8px_rgba(246,166,35,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-60 pt-3 z-50"
                  >
                    <div className="rounded-2xl overflow-hidden bg-primary-navy shadow-2xl py-2.5 border border-white/10 backdrop-blur-xl">
                      {packageCategories.map((cat, idx) => (
                        <Link
                          key={idx}
                          to={`/packages/category/${cat.id}`}
                          onClick={() => setIsDropdownOpen(false)}
                          className="block px-5 py-3 text-xs text-white/90 hover:text-primary-navy hover:bg-orange-cta transition-all duration-200 font-bold"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/destinations" className={`relative py-2 ${linkStyles('/destinations')}`}>
              <span>{t('navDestinations')}</span>
              {isActive('/destinations') && (
                <motion.span 
                  layoutId="activeIndicator" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-cta rounded-full shadow-[0_0_8px_rgba(246,166,35,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            
            <Link to="/gallery" className={`relative py-2 ${linkStyles('/gallery')}`}>
              <span>{t('navGallery')}</span>
              {isActive('/gallery') && (
                <motion.span 
                  layoutId="activeIndicator" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-cta rounded-full shadow-[0_0_8px_rgba(246,166,35,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            
            <Link to="/contact" className={`relative py-2 ${linkStyles('/contact')}`}>
              <span>{t('navContact')}</span>
              {isActive('/contact') && (
                <motion.span 
                  layoutId="activeIndicator" 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-cta rounded-full shadow-[0_0_8px_rgba(246,166,35,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px -5px rgba(246, 166, 35, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/918825813453?text=Hi%20WanderWish%20Holidays!%20I'd%20like%20to%20plan%20a%20vacation%20trip.%20Please%20help%20me%20design%20an%20itinerary."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-cta hover:bg-orange-cta/90 text-primary-navy font-heading font-black text-xs px-6 py-3.5 rounded-xl transition-all duration-300 shadow-md inline-flex items-center gap-1.5 cursor-pointer"
            >
              <FaWhatsapp className="text-sm shrink-0" />
              Plan Your Trip
            </motion.a>
          </div>

          {/* Mobile hamburger toggle button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-orange-cta p-2 focus:outline-none cursor-pointer"
            >
              {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>

        </div>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full bg-primary-navy/98 border-t border-white/5 backdrop-blur-xl max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-thin shadow-2xl"
          >
            <div className="px-5 pt-4 pb-6 space-y-2 flex flex-col">
              <Link to="/" className={mobileLinkStyles('/')}>{t('navHome')}</Link>
              <Link to="/about" className={mobileLinkStyles('/about')}>{t('navAbout')}</Link>
              <Link to="/packages" className={mobileLinkStyles('/packages')}>{t('navPackages')}</Link>
              
              {/* Nested Categories list on Mobile */}
              <div className="py-2 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-cta block mb-2">
                  {t('browseByCategory')}
                </span>
                <div className="grid grid-cols-1 gap-2 pl-3">
                  {packageCategories.map((cat, idx) => (
                    <Link
                      key={idx}
                      to={`/packages/category/${cat.id}`}
                      className="text-sm text-white/80 hover:text-orange-cta py-1.5 font-medium block"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/destinations" className={mobileLinkStyles('/destinations')}>{t('navDestinations')}</Link>
              <Link to="/gallery" className={mobileLinkStyles('/gallery')}>{t('navGallery')}</Link>
              <Link to="/contact" className={mobileLinkStyles('/contact')}>{t('navContact')}</Link>
              
              <div className="pt-6">
                <a
                  href="https://wa.me/918825813453?text=Hi%20WanderWish%20Holidays!%20I'd%20like%20to%20plan%20a%20vacation%20trip.%20Please%20help%20me%20design%20an%20itinerary."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full justify-center bg-orange-cta hover:bg-orange-cta/90 text-primary-navy font-heading font-bold text-sm py-4 px-6 rounded-xl transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <FaWhatsapp className="text-lg shrink-0" />
                  Plan Your Trip
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
    </div>
  );
};
