import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt } from 'react-icons/fa';
import type { Destination } from '../data/destinations';


interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <Link to={`/packages?search=${destination.name}`}>
      <motion.div
        whileHover="hover"
        initial="rest"
        animate="rest"
        variants={{
          rest: { y: 0, scale: 1 },
          hover: { y: -8, scale: 1.01 }
        }}
        transition={{ type: "spring" as const, stiffness: 250, damping: 20 }}
        className="relative h-[380px] w-full rounded-2xl overflow-hidden shadow-premium cursor-pointer group"
      >
        {/* Destination Image with hover-zoom effect */}
        <motion.img
          src={destination.image}
          alt={destination.name}
          variants={{
            hover: { scale: 1.1 }
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Shadow overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-navy via-primary-navy/40 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300"></div>


        {/* Highlights overlay - visible on hover on larger screens */}
        <div className="absolute top-4 right-4 flex flex-col gap-1 items-end z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-orange-cta text-primary-navy text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md animate-pulse">
            Top Choice
          </span>
        </div>

        {/* Content Section */}
        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end text-white z-10">
          <div className="flex items-center gap-1.5 text-orange-cta mb-2">
            <FaMapMarkerAlt className="text-sm shrink-0 animate-bounce" />
            <span className="text-xs font-semibold tracking-wider uppercase font-heading">
              {destination.tagline}
            </span>
          </div>

          <h3 className="font-heading font-bold text-2xl mb-2 group-hover:text-orange-cta transition-colors duration-300">
            {destination.name}
          </h3>

          <motion.p
            variants={{
              rest: { y: 15, opacity: 0, height: 0, marginBottom: 0 },
              hover: { y: 0, opacity: 1, height: "auto", marginBottom: 16 }
            }}
            transition={{ type: "spring" as const, stiffness: 100, damping: 15 }}
            className="text-white/80 text-xs md:text-sm line-clamp-2 leading-relaxed overflow-hidden"
          >
            {destination.description}
          </motion.p>

          <motion.div 
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1, transition: { staggerChildren: 0.08 } }
            }}
            className="flex flex-wrap gap-1.5 pt-1"
          >
            {destination.highlights.slice(0, 3).map((hl, idx) => (
              <motion.span 
                key={idx} 
                variants={{
                  rest: { y: 10, opacity: 0 },
                  hover: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 150, damping: 12 } }
                }}
                className="text-[10px] bg-white/10 hover:bg-white/20 border border-white/10 px-2 py-0.5 rounded-md backdrop-blur-sm transition-colors font-medium"
              >
                {hl}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};
