import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCompass, FaMapMarkedAlt, FaGlobe, FaGraduationCap, FaSchool, FaArrowRight } from 'react-icons/fa';
import type { TourCategory } from '../data/categories';


interface CategoryCardProps {
  category: TourCategory;
}

// Type-safe icon dispatcher to avoid dynamic bracket notation and "any" types
const getIconComponent = (iconName: string): React.ComponentType<{ className?: string }> => {
  switch (iconName) {
    case 'FaCompass': return FaCompass;
    case 'FaMapMarkedAlt': return FaMapMarkedAlt;
    case 'FaGlobe': return FaGlobe;
    case 'FaGraduationCap': return FaGraduationCap;
    case 'FaSchool': return FaSchool;
    default: return FaCompass;
  }
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const iconComponent = getIconComponent(category.icon);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-2 w-full h-full max-w-xs mx-auto min-h-[300px]"
    >
      {/* Decorative backdrop gradient circle */}
      <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-linear-to-br ${category.gradient} opacity-10 group-hover:scale-125 transition-transform duration-500`}></div>

      <div>
        {/* Animated Icon wrapper */}
        <div className={`inline-flex items-center justify-center h-14 w-14 rounded-xl bg-linear-to-br ${category.gradient} text-white shadow-lg mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
          {React.createElement(iconComponent, { className: "text-2xl" })}
        </div>


        <span className="text-xs font-semibold tracking-wider text-teal-accent uppercase block mb-1">
          {category.tagline}
        </span>
        <h3 className="font-heading font-bold text-xl text-primary-navy mb-3">
          {category.shortName}
        </h3>
        <p className="text-text-gray text-sm leading-relaxed mb-6">
          {category.description}
        </p>
      </div>

      <Link
        to={`/packages/category/${category.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-teal-accent hover:text-primary-navy group-hover:translate-x-1.5 transition-all duration-300 w-fit"
      >
        Explore Packages
        <FaArrowRight className="text-xs" />
      </Link>
    </motion.div>
  );
};
