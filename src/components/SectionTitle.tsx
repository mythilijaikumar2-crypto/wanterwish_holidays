import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  center = true,
  light = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`max-w-3xl mb-12 ${center ? 'mx-auto text-center' : 'text-left'}`}
    >
      {subtitle && (
        <span className="text-orange-cta font-heading text-sm font-semibold tracking-widest uppercase block mb-2">
          {subtitle}
        </span>
      )}
      
      <h2 className={`font-heading font-bold text-3xl md:text-4xl lg:text-5xl leading-tight ${
        light ? 'text-white' : 'text-primary-navy'
      }`}>
        {title}
      </h2>
      
      <div className={`flex items-center gap-1.5 mt-4 ${center ? 'justify-center' : 'justify-start'}`}>
        <span className="h-1 w-12 bg-teal-accent rounded-full"></span>
        <span className="h-1 w-2 bg-orange-cta rounded-full"></span>
        <span className="h-1 w-1 bg-teal-accent rounded-full"></span>
      </div>
    </motion.div>
  );
};
