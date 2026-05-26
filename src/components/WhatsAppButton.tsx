import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export const WhatsAppButton: React.FC = () => {
  const whatsappNumber = "918825813453";
  const defaultMessage = encodeURIComponent("Hi WanderWish Holidays! I am planning a holiday and would like to know more about your custom tour packages. Please guide me.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group cursor-pointer"
      title="Chat on WhatsApp"
    >
      {/* Ripple Animation */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping -z-10"></span>
      
      <FaWhatsapp className="text-3xl md:text-4xl" />
      
      {/* Hover tooltip */}
      <span className="absolute right-16 bg-primary-navy text-white text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300 shadow-lg whitespace-nowrap border border-white/10 hidden md:block">
        Enquire on WhatsApp
      </span>
    </a>
  );
};
