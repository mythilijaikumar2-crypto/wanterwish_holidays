import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaChevronRight } from 'react-icons/fa';
import logoImg from '../assets/wanderlogopng.png';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Packages", path: "/packages" },
    { name: "Destinations", path: "/destinations" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact Us", path: "/contact" }
  ];

  const packageCategories = [
    { name: "Indian Tour Packages", id: "indian-tours" },
    { name: "South India Tour Packages", id: "south-india" },
    { name: "International Tour Packages", id: "international-tours" },
    { name: "College / School Tour Packages", id: "college-school-tours" }
  ];

  return (
    <footer className="bg-primary-navy text-white pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core footer columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Column 1: Brand details */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="h-10 w-10 overflow-hidden rounded-xl bg-white p-1 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
                <img src={logoImg} alt="WanderWish Holidays Logo" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-orange-cta transition-colors">
                  WanderWish
                </span>
                <span className="text-[10px] uppercase tracking-widest text-orange-cta font-bold">
                  Holidays
                </span>
              </div>
            </Link>
            
            <p className="text-white/60 text-xs md:text-sm leading-relaxed mt-2">
              Dream. Explore. Repeat. Designing the ultimate, stress-free holiday and group tours worldwide. Let us convert your travel dreams into lifetime adventures.
            </p>
            
            {/* Instagram Badge */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com/wanderwish_holidays"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 bg-white/5 hover:bg-linear-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 text-white hover:scale-110 flex items-center justify-center rounded-xl transition-all duration-300 border border-white/10 shadow-md cursor-pointer"
                title="Follow us on Instagram"
              >
                <FaInstagram className="text-lg" />
              </a>
              <span className="text-xs text-white/50 font-medium">@wanderwish_holidays</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-xs md:text-sm mb-6 text-orange-cta tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-white hover:translate-x-1.5 flex items-center gap-1.5 text-xs md:text-sm font-medium transition-all duration-200"
                  >
                    <FaChevronRight className="text-[8px] text-teal-accent" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Tour Categories */}
          <div>
            <h4 className="font-heading font-bold text-xs md:text-sm mb-6 text-orange-cta tracking-wider uppercase">
              Our Specialties
            </h4>
            <ul className="space-y-3">
              {packageCategories.map((cat, idx) => (
                <li key={idx}>
                  <Link
                    to={`/packages/category/${cat.id}`}
                    className="text-white/60 hover:text-white hover:translate-x-1.5 flex items-center gap-1.5 text-xs md:text-sm font-medium transition-all duration-200"
                  >
                    <FaChevronRight className="text-[8px] text-teal-accent" />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details */}
          <div className="flex flex-col">
            <h4 className="font-heading font-bold text-xs md:text-sm mb-6 text-orange-cta tracking-wider uppercase">
              Contact Details
            </h4>
            <div className="space-y-4">
              <a
                href="https://wa.me/918825813453"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 text-white/70 hover:text-white transition-colors duration-200 group text-xs md:text-sm font-medium"
              >
                <FaWhatsapp className="text-green-500 text-lg shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="block font-bold text-[10px] uppercase tracking-wider text-white/50">WhatsApp / Call</span>
                  <span className="text-white/95 font-semibold text-sm">+91 88258 13453</span>
                </div>
              </a>
              
              <a
                href="mailto:Wanderwishholidays@gmail.com"
                className="flex gap-3 text-white/70 hover:text-white transition-colors duration-200 group text-xs md:text-sm font-medium"
              >
                <FaEnvelope className="text-teal-accent text-base shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <div>
                  <span className="block font-bold text-[10px] uppercase tracking-wider text-white/50">Email Address</span>
                  <span className="text-white/95 font-semibold break-all text-xs">Wanderwishholidays@gmail.com</span>
                </div>
              </a>

              <div className="flex gap-3 text-white/70 text-xs md:text-sm font-medium">
                <FaMapMarkerAlt className="text-orange-cta text-base shrink-0 mt-1" />
                <div>
                  <span className="block font-bold text-[10px] uppercase tracking-wider text-white/50">Our Head Office</span>
                  <span className="text-white/80 leading-relaxed text-xs">
                    No 12/694 Ground Floor, Mahalakshmi Nagar, 6th Street, Kovilambakkam, Chennai - 600129
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs text-white/40">
            <span>© {currentYear} WanderWish Holidays. All rights reserved.</span>
            <span className="hidden md:inline text-white/15">|</span>
            <span>Founded in 2026 by Vinothini</span>
          </div>
          
          <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-orange-cta/80 tracking-widest">
            <span>Dream</span>
            <span className="h-1 w-1 bg-white/20 rounded-full"></span>
            <span>Explore</span>
            <span className="h-1 w-1 bg-white/20 rounded-full"></span>
            <span>Repeat</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
