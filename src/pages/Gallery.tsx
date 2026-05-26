import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaRegEye, FaFilter, FaCompass } from 'react-icons/fa';

interface GalleryItem {
  id: number;
  url: string;
  category: 'indian-tours' | 'international' | 'groups';
  title: string;
  location: string;
}

// Comprehensive name & location mapper for all 57 newly added Indian Tour images
const imageMetadataMap: Record<string, { title: string; location: string }> = {
  agrafort: { title: "Agra Fort Heritage", location: "Agra, Uttar Pradesh" },
  akshardhamteple: { title: "Swaminarayan Akshardham", location: "Delhi" },
  amer: { title: "Amer Fort Palace", location: "Jaipur, Rajasthan" },
  andaman: { title: "Andaman Islands Coast", location: "Andaman Islands" },
  ataltunel: { title: "Atal Tunnel Highway", location: "Manali, Himachal" },
  betaabvalley: { title: "Betaab Valley Meadows", location: "Pahalgam, Kashmir" },
  boating: { title: "Boating in Lakes", location: "Kashmir" },
  buland: { title: "Buland Darwaza Gate", location: "Fatehpur Sikri" },
  cellular: { title: "Cellular Jail Memorial", location: "Port Blair, Andaman" },
  christchurch: { title: "Christ Church Ridge", location: "Shimla, Himachal" },
  citypalace: { title: "City Palace Heritage", location: "Jaipur, Rajasthan" },
  dallake: { title: "Shikara Ride on Dal Lake", location: "Srinagar, Kashmir" },
  delhi: { title: "Delhi City Streetscape", location: "Delhi" },
  gateway: { title: "Gateway of India", location: "Mumbai, Maharashtra" },
  goldtemple: { title: "The Golden Temple", location: "Amritsar, Punjab" },
  gulmarg: { title: "Snowy Gulmarg Gondola", location: "Gulmarg, Kashmir" },
  hadimbatmple: { title: "Hadimba Devi Temple", location: "Manali, Himachal" },
  havelockisland: { title: "Havelock Island Beach", location: "Andaman Islands" },
  hawamahal: { title: "Iconic Hawa Mahal", location: "Jaipur, Rajasthan" },
  humayuntomb: { title: "Humayun's Tomb Garden", location: "Delhi" },
  jachootemple: { title: "Jakhoo Temple Hill", location: "Shimla, Himachal" },
  jaipur: { title: "Pink City Jaipur Heritage", location: "Jaipur, Rajasthan" },
  jalmahal: { title: "Jal Mahal Palace", location: "Jaipur, Rajasthan" },
  jollybuoy: { title: "Jolly Buoy Coral Beach", location: "Andaman Islands" },
  kueri: { title: "Kueri Scenic Landscape", location: "Himachal Pradesh" },
  ladakh: { title: "Ladakh Monasteries", location: "Ladakh" },
  lakshmanpur: { title: "Lakshmanpur Natural Bridge", location: "Neil Island, Andaman" },
  lotustemple: { title: "Lotus Temple Sanctuary", location: "Delhi" },
  magnetichill: { title: "Magnetic Hill Highway", location: "Ladakh" },
  manalihimalayas: { title: "Manali Himalayas Range", location: "Manali, Himachal" },
  manaliroad: { title: "Manali Scenic Highway", location: "Manali, Himachal" },
  manutemple: { title: "Manu Temple Old Manali", location: "Manali, Himachal" },
  mightyladakh: { title: "Mighty Ladakh Ranges", location: "Ladakh" },
  nahargarh: { title: "Nahargarh Fort Sunset", location: "Jaipur, Rajasthan" },
  neilislan: { title: "Neil Island Sandy Beaches", location: "Andaman Islands" },
  northbayisland: { title: "North Bay Island Coral", location: "Andaman Islands" },
  nubravalley: { title: "Nubra Valley Sand Dunes", location: "Ladakh" },
  oldmanali: { title: "Old Manali Riverside", location: "Manali, Himachal" },
  pahalgam: { title: "Pahalgam Valley Rivers", location: "Pahalgam, Kashmir" },
  pangong: { title: "Deep Blue Pangong Lake", location: "Ladakh" },
  qutubminar: { title: "Qutub Minar Complex", location: "Delhi" },
  radhanagarbeach: { title: "Radhanagar Sunset Beach", location: "Havelock, Andaman" },
  radhangar: { title: "Radhanagar Pristine Waters", location: "Andaman Islands" },
  ramjhul: { title: "Ram Jhula Bridge", location: "Rishikesh, Uttarakhand" },
  redfort: { title: "Historic Red Fort", location: "Delhi" },
  rishikesh: { title: "Ganga Aarti at Rishikesh", location: "Rishikesh, Uttarakhand" },
  rohtangpass: { title: "Rohtang Pass Snow Peak", location: "Manali, Himachal" },
  rossisland: { title: "Ross Island Ruins", location: "Andaman Islands" },
  sanglavalley: { title: "Sangla Valley Hills", location: "Kinnaur, Himachal" },
  shanthistupa: { title: "Shanti Stupa Dome", location: "Ladakh" },
  shimla: { title: "Shimla Hill Station Ridge", location: "Shimla, Himachal" },
  solangvalley: { title: "Solang Valley Adventures", location: "Manali, Himachal" },
  sonamarg: { title: "Sonamarg Meadow of Gold", location: "Sonamarg, Kashmir" },
  srinagar: { title: "Srinagar Shikara Floating", location: "Srinagar, Kashmir" },
  tajmahal: { title: "The Majestic Taj Mahal", location: "Agra, Uttar Pradesh" },
  triveni: { title: "Triveni Ghat River Banks", location: "Rishikesh, Uttarakhand" },
  varanasi: { title: "Varanasi Ghats at Sunset", location: "Varanasi, Uttar Pradesh" }
};

// Vite's dynamic glob import feature to fetch all local Indian Tour images
const globImages = import.meta.glob('../assets/wanderimages/indiantourimgs/*.{jpeg,jpg,png,gif,webp}', { eager: true });

export const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'indian-tours' | 'international' | 'groups'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Map imported images to GalleryItem objects
  const importedIndianTourItems: GalleryItem[] = Object.entries(globImages).map(([path, module], idx) => {
    const filename = path.split('/').pop()?.split('.')[0] || 'image';
    const meta = imageMetadataMap[filename] || {
      title: filename.charAt(0).toUpperCase() + filename.slice(1) + " Sights",
      location: "India"
    };
    return {
      id: 100 + idx,
      url: (module as { default: string }).default,
      category: 'indian-tours' as const,
      title: meta.title,
      location: meta.location
    };
  });

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
      category: "indian-tours",
      title: "Snowy Peak Trekking",
      location: "Solang, Manali"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
      category: "international",
      title: "Marina Bay Light Show",
      location: "Singapore"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      category: "indian-tours",
      title: "Alleppey Houseboat Sunset",
      location: "Kerala Backwaters"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=800&q=80",
      category: "groups",
      title: "College Student Bonfire Night",
      location: "Calangute, Goa"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
      category: "indian-tours",
      title: "Mughal Red Fort Architecture",
      location: "Old Delhi"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
      category: "international",
      title: "Sentosa Cable Car Skyline",
      location: "Singapore Hub"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80",
      category: "indian-tours",
      title: "Nilgiri Mountain Toy Train",
      location: "Ooty Hills"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      category: "groups",
      title: "High School Field Excursion",
      location: "Aerospace Museum, Bangalore"
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
      category: "international",
      title: "Exotic Beachside Sunset",
      location: "Bali Coastline"
    },
    ...importedIndianTourItems
  ];

  const filteredItems = galleryItems.filter(item => {
    return filter === 'all' || item.category === filter;
  });

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
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=90')" }}
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
              Capturing Memories
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
              WanderWish Gallery
            </motion.h1>
          </div>

          {/* Subheading text: Framer Motion Fade Pop */}
          <motion.p 
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 15, delay: 0.55 }}
            className="text-white/85 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-medium font-sans m-0"
          >
            Take a visual tour through actual snapshots from our customized packages, school explorations, and family holidays.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro heading & Filter pills merged in a premium Glassmorphic Dashboard Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 14 }}
          className="bg-white rounded-3xl p-6 md:p-8 border border-light-gray/45 shadow-premium flex flex-col lg:flex-row items-center justify-between gap-6 mb-16 relative z-10"
        >
          <div className="text-center lg:text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-accent block mb-1">
              Interactive Explorer
            </span>
            <h2 className="font-heading font-black text-2xl md:text-3xl text-primary-navy mb-2 uppercase tracking-tight">
              Moments of Pure Joy
            </h2>
            <p className="text-text-gray text-xs md:text-sm leading-relaxed m-0">
              Browse authentic tour snapshots from our actual family packages, energetic college getaways, and safely supervised school field excursions.
            </p>
          </div>

          {/* Filter Pills with Perfect Flex Alignments */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0 justify-center">
            <span className="text-[10px] font-bold text-primary-navy/60 uppercase tracking-widest flex items-center gap-1.5 shrink-0">
              <FaFilter className="text-[9px] text-teal-accent" /> Categories:
            </span>
            
            <div className="flex flex-wrap bg-custom-bg p-1.5 rounded-2xl border border-light-gray/70 gap-1.5 justify-center">
              {(['all', 'indian-tours', 'international', 'groups'] as const).map((cat) => {
                const getCatLabel = (c: string) => {
                  if (c === 'all') return 'All Photos';
                  if (c === 'indian-tours') return 'Indian Sights';
                  if (c === 'international') return 'International';
                  return 'College & Schools';
                };

                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`text-[10px] font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer capitalize whitespace-nowrap ${
                      filter === cat 
                        ? 'bg-primary-navy text-orange-cta shadow-md font-bold scale-102' 
                        : 'text-text-gray hover:text-primary-navy hover:bg-light-gray/40'
                    }`}
                  >
                    {getCatLabel(cat)}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Masonry-style Grid with perfect responsive gaps and staggering Framer Motion reveals */}
        <motion.div 
          layout
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.06 }
            }
          }}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.93, y: 25 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 16 } },
                  exit: { opacity: 0, scale: 0.93, transition: { duration: 0.2 } }
                }}
                whileHover="hover"
                initial="rest"
                animate="rest"
                onClick={() => setSelectedItem(item)}
                className="relative overflow-hidden rounded-3xl shadow-premium hover:shadow-2xl border border-light-gray/40 aspect-4/3 group cursor-pointer"
              >
                <motion.img 
                  src={item.url} 
                  alt={item.title} 
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-full h-full object-cover"
                />
                
                {/* Backdrop dark cover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-primary-navy via-primary-navy/30 to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-300"></div>

                {/* Cover visual text details with strict flex alignments */}
                <motion.div 
                  variants={{
                    rest: { opacity: 0, y: 15 },
                    hover: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
                  }}
                  className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10"
                >
                  <div className="flex items-center gap-1.5 text-orange-cta mb-1.5">
                    <FaCompass className="text-[10px]" />
                    <span className="text-[9px] font-black uppercase tracking-widest font-heading">
                      {item.location}
                    </span>
                  </div>
                  
                  <h4 className="font-heading font-black text-lg text-white mb-3 leading-tight">
                    {item.title}
                  </h4>
                  
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold text-teal-accent bg-teal-accent/10 border border-teal-accent/20 px-3 py-1.5 rounded-xl w-fit backdrop-blur-md">
                    <FaRegEye className="text-xs" /> Zoom Photo
                  </span>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 10. Lightbox Overlay Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-navy/95 backdrop-blur-md"
              onClick={() => setSelectedItem(null)}
            >
              {/* Animated Lightbox Content Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring" as const, stiffness: 110, damping: 15 }}
                className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-primary-navy border border-white/10 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal close icon */}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer"
                  title="Close Preview"
                >
                  <FaTimes className="text-base" />
                </button>

                {/* Big Image */}
                <div className="aspect-16/10 w-full overflow-hidden">
                  <img 
                    src={selectedItem.url} 
                    alt={selectedItem.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Footer details inside Modal */}
                <div className="p-6 bg-primary-navy text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/5">
                  <div>
                    <h3 className="font-heading font-extrabold text-xl text-white">
                      {selectedItem.title}
                    </h3>
                    <p className="text-white/60 text-xs mt-1">
                      WanderWish Holidays custom group packages.
                    </p>
                  </div>
                  
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-cta bg-orange-50/10 border border-orange-200/20 px-3.5 py-1.5 rounded-xl uppercase tracking-wider">
                    <FaCompass className="text-xs" /> {selectedItem.location}
                  </span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
