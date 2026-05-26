import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaWhatsapp, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import type { TourPackage } from '../data/packages';


interface PackageCardProps {
  pkg: TourPackage;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg }) => {

  // Generate customized WhatsApp query link
  const whatsappNumber = "918825813453";
  const customMessage = encodeURIComponent(
    `Hi WanderWish Holidays! I am interested in planning an holiday for the package: "${pkg.title}" (${pkg.duration}). Please share the detailed availability and custom options.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${customMessage}`;

  // Dynamically set category badge colors
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'south-india':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
      case 'indian-tours':
        return 'bg-blue-50 text-blue-700 border-blue-200/50';
      case 'international-tours':
        return 'bg-orange-50 text-orange-700 border-orange-200/50';
      case 'college-school-tours':
        return 'bg-purple-50 text-purple-700 border-purple-200/50';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200/50';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'south-india': return 'South India';
      case 'indian-tours': return 'Indian Tour';
      case 'international-tours': return 'International';
      case 'college-school-tours': return 'College / School Tour';
      default: return 'Holiday';
    }
  };

  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      animate="rest"
      variants={{
        rest: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)" },
        hover: { y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08)" }
      }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
      className="flex flex-col overflow-hidden rounded-2xl bg-white border border-light-gray/40 h-full group"
    >
      {/* Package Image */}
      <div className="relative h-[220px] w-full overflow-hidden shrink-0">
        <motion.img
          src={pkg.image}
          alt={pkg.title}
          variants={{
            hover: { scale: 1.08 }
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full w-full object-cover"
        />
        
        {/* Category Badge overlay */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm tracking-wider uppercase font-heading ${getCategoryStyles(pkg.category)}`}>
            {getCategoryName(pkg.category)}
          </span>
        </div>
      </div>

      {/* Package Content */}
      <div className="flex flex-col justify-between p-6 grow">

        <div>
          {/* Duration info */}
          <div className="flex items-center gap-1.5 text-xs text-text-gray/80 font-medium mb-3">
            <FaClock className="text-teal-accent" />
            <span>{pkg.duration}</span>
          </div>

          <h3 className="font-heading font-bold text-lg md:text-xl text-primary-navy mb-2 line-clamp-1 group-hover:text-teal-accent transition-colors duration-300">
            {pkg.title}
          </h3>

          <p className="text-text-gray text-xs md:text-sm line-clamp-2 leading-relaxed mb-4">
            {pkg.description}
          </p>

          {/* Places Covered tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {pkg.placesCovered.slice(0, 3).map((place, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-primary-navy/80 bg-custom-bg border border-light-gray/70 px-2 py-0.5 rounded-md"
              >
                <FaMapMarkerAlt className="text-[9px] text-teal-accent" />
                {place}
              </span>
            ))}
            {pkg.placesCovered.length > 3 && (
              <span className="text-[10px] font-bold text-teal-accent bg-teal-accent/5 px-2 py-0.5 rounded-md border border-teal-accent/10">
                +{pkg.placesCovered.length - 3} More
              </span>
            )}
          </div>
        </div>

        {/* Action CTAs */}
        <div className="grid grid-cols-2 gap-3 mt-auto pt-2 border-t border-light-gray/40 shrink-0">
          <Link
            to={`/packages/${pkg.id}`}
            className="flex items-center justify-center gap-1.5 text-xs font-bold text-primary-navy bg-custom-bg hover:bg-light-gray/60 border border-light-gray py-3.5 px-3 rounded-xl transition-all duration-300 cursor-pointer"
          >
            {"Details"}
            <motion.span
              variants={{ hover: { x: 3 } }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 10 }}
            >
              <FaArrowRight className="text-[9px]" />
            </motion.span>
          </Link>
          
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg py-3.5 px-3 rounded-xl transition-all duration-300"
          >
            <motion.span
              variants={{ hover: { scale: 1.15 } }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 10 }}
            >
              <FaWhatsapp className="text-sm shrink-0" />
            </motion.span>
            {"Enquire"}
          </a>
        </div>
      </div>
    </motion.div>
  );
};
