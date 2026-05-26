import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaWhatsapp } from 'react-icons/fa';
import logoImg from '../assets/wanderlogopng.png';


export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

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

  // Close navigation drawer and dropdown on route changes
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  const packageCategories = [
    { name: "Indian Tour Packages", id: "indian-tours" },
    { name: "South India Tour Packages", id: "south-india" },
    { name: "International Tour Packages", id: "international-tours" },
    { name: "College / School Tour Packages", id: "college-school-tours" }
  ];

  // Help generate active state styling
  const isActive = (path: string) => location.pathname === path;

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

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
      (!isHomePage || isScrolled) ? 'glass-nav py-3.5 shadow-lg' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="h-10 w-10 overflow-hidden rounded-xl bg-white p-1 shadow-md group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 shrink-0">
              <img src={logoImg} alt="WanderWish Holidays Logo" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg md:text-xl tracking-tight text-white group-hover:text-orange-cta transition-colors duration-300">
                WanderWish
              </span>
              <span className="text-[9px] uppercase tracking-widest text-orange-cta font-bold font-sans">
                Holidays
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            <Link to="/" className={linkStyles('/')}>Home</Link>
            <Link to="/about" className={linkStyles('/about')}>About</Link>
            
            {/* Desktop Packages Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDropdownOpen(true);
                }}
                className={`flex items-center gap-1 cursor-pointer focus:outline-none ${linkStyles('/packages')}`}
              >
                Packages
                <FaChevronDown className={`text-[10px] mt-0.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-56 mt-2 rounded-2xl overflow-hidden bg-primary-navy shadow-2xl py-2 border border-white/10 z-50"
                  >
                    {packageCategories.map((cat, idx) => (
                      <Link
                        key={idx}
                        to={`/packages/category/${cat.id}`}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-5 py-2.5 text-xs text-white/90 hover:text-primary-navy hover:bg-orange-cta transition-colors duration-200 font-semibold"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/destinations" className={linkStyles('/destinations')}>Destinations</Link>
            <Link to="/gallery" className={linkStyles('/gallery')}>Gallery</Link>
            <Link to="/contact" className={linkStyles('/contact')}>Contact</Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/918825813453?text=Hi%20WanderWish%20Holidays!%20I'd%20like%20to%20plan%20a%20vacation%20trip.%20Please%20help%20me%20design%20an%20itinerary."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-cta hover:bg-orange-cta/90 text-primary-navy font-heading font-bold text-xs px-5 py-3 rounded-xl transition-all duration-300 shadow-md hover:scale-105 active:scale-95 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <FaWhatsapp className="text-sm shrink-0" />
              Plan Your Trip
            </a>
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
      </div>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full bg-primary-navy/98 border-t border-white/5 backdrop-blur-xl overflow-hidden shadow-2xl"
          >
            <div className="px-5 pt-4 pb-6 space-y-2 flex flex-col">
              <Link to="/" className={mobileLinkStyles('/')}>Home</Link>
              <Link to="/about" className={mobileLinkStyles('/about')}>About</Link>
              
              {/* Nested Categories list on Mobile */}
              <div className="py-2 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-cta block mb-2">
                  Our Packages
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

              <Link to="/destinations" className={mobileLinkStyles('/destinations')}>Destinations</Link>
              <Link to="/gallery" className={mobileLinkStyles('/gallery')}>Gallery</Link>
              <Link to="/contact" className={mobileLinkStyles('/contact')}>Contact</Link>
              
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
  );
};
