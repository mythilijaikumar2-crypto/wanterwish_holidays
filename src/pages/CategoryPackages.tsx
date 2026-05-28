import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaWhatsapp, FaArrowRight,
  FaCompass, FaRegEye, FaTimes, FaInfoCircle,
  FaMapMarkedAlt, FaGlobe, FaGraduationCap, FaSchool,
  FaExpandAlt, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

import { tourPackages } from '../data/packages';
import { tourCategories } from '../data/categories';
import { useTranslation } from 'react-i18next';

// Local hero banner image imports
import southIndiaBanner from '../assets/South India Tour Packages/Munnar/Tea Gardens1.jpg';
import indianBanner from '../assets/Indian Tour Packages/Kashmir/srinagar.jpeg';
import internationalBanner from '../assets/International Tour Packages/Singapore/Marina Bay Sands1.jpg';
import schoolBanner from '../assets/Indian Tour Packages/Goa/Fort Aguada.jpeg';

// Category custom imagery mapper for header covers (uses local assets)
const categoryImages: Record<string, { banner: string; gradient: string; tag: string }> = {
  "south-india": {
    banner: southIndiaBanner,
    gradient: "from-teal-900/90 to-emerald-950/95",
    tag: "God's Own Country & Sacred Temples"
  },
  "indian-tours": {
    banner: indianBanner,
    gradient: "from-blue-900/90 to-indigo-950/95",
    tag: "Himalayan Vistas & Royal Regality"
  },
  "international-tours": {
    banner: internationalBanner,
    gradient: "from-orange-950/90 to-red-950/95",
    tag: "Futuristic Wonders & Dream Shores"
  },
  "college-school-tours": {
    banner: schoolBanner,
    gradient: "from-purple-950/90 to-orange-950/95",
    tag: "Fun, High-Energy Bonding & Safe Group Learning"
  }
};

// Metadata and Dynamic glob import for Gallery items just like in Gallery.tsx
interface GalleryItem {
  id: number;
  url: string;
  category: 'indian-tours' | 'international' | 'groups';
  title: string;
  location: string;
}

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

// Vite glob imports for all local tour category images (recursive subfolders)
const globIndianImages = import.meta.glob('../assets/Indian Tour Packages/**/*.{jpeg,jpg,png,gif,webp,avif}', { eager: true });
const globSouthIndiaImages = import.meta.glob('../assets/South India Tour Packages/**/*.{jpeg,jpg,png,gif,webp,avif}', { eager: true });
const globInternationalImages = import.meta.glob('../assets/International Tour Packages/**/*.{jpeg,jpg,png,gif,webp,avif}', { eager: true });
// Legacy wanderimages folder (Indian tours)
const globWanderImages = import.meta.glob('../assets/wanderimages/indiantourimgs/*.{jpeg,jpg,png,gif,webp}', { eager: true });

// Helper: extract folder name (destination) and filename from a glob path
const parseImagePath = (path: string): { destination: string; filename: string } => {
  const parts = path.split('/');
  const filename = (parts.pop() || '').replace(/\.[^.]+$/, '');
  const destination = parts.pop() || 'India';
  return { destination, filename };
};

// Build gallery items from a glob result map
const buildGalleryItems = (
  globMap: Record<string, unknown>,
  category: GalleryItem['category'],
  startId: number
): GalleryItem[] =>
  Object.entries(globMap).map(([path, module], idx) => {
    const { destination, filename } = parseImagePath(path);
    
    // Check legacy imageMetadataMap first safely to prevent prototype lookup/pollution
    const meta = (() => {
      if (!filename || filename === '__proto__' || filename === 'constructor') return undefined;
      const matched = Object.entries(imageMetadataMap).find(([key]) => key === filename);
      if (matched) {
        const [, val] = matched;
        return val;
      }
      return undefined;
    })();
    const title = meta?.title ?? `${filename.replace(/[_-]/g, ' ')} - ${destination}`;
    const location = meta?.location ?? destination;
    return {
      id: startId + idx,
      url: (module as { default: string }).default,
      category,
      title,
      location,
    };
  });

const staticGalleryItems: GalleryItem[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=800&q=80",
    category: "groups",
    title: "College Student Bonfire Night",
    location: "Calangute, Goa"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    category: "groups",
    title: "High School Field Excursion",
    location: "Aerospace Museum, Bangalore"
  },
];

// ─── Package Image Carousel ───────────────────────────────────────────────────
interface PackageCarouselProps {
  images: string[];
  alt: string;
  duration: string;
}

const PackageCarousel: React.FC<PackageCarouselProps> = ({ images, alt, duration }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = (idx: number, dir: 1 | -1) => {
    setDirection(dir);
    setCurrent(idx);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    go((current - 1 + images.length) % images.length, -1);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    go((current + 1) % images.length, 1);
  };

  return (
    <div className="relative h-[180px] w-full overflow-hidden shrink-0 bg-gray-100">
      {/* Animated image */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.img
          key={current}
          src={images.at(current) || ''}
          alt={`${alt} - photo ${current + 1}`}
          custom={direction}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: d * 40 }),
            center: { opacity: 1, x: 0 },
            exit: (d: number) => ({ opacity: 0, x: d * -40 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </AnimatePresence>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-primary-navy/80 via-primary-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
        <span className="text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 bg-teal-accent/90 px-2.5 py-1 rounded-xl backdrop-blur-sm">
          <FaRegEye /> {current + 1} / {images.length} Photos
        </span>
      </div>

      {/* Duration badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="text-[9px] font-bold px-2.5 py-1 rounded-full border bg-white/95 text-primary-navy border-light-gray shadow-sm tracking-wider uppercase font-heading">
          {duration}
        </span>
      </div>

      {/* Counter badge */}
      {images.length > 1 && (
        <div className="absolute top-3 right-3 z-10 text-[9px] font-bold text-white bg-black/45 px-2 py-0.5 rounded-full backdrop-blur-sm">
          {current + 1}/{images.length}
        </div>
      )}

      {/* Prev arrow */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/35 hover:bg-black/65 text-white transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Previous photo"
        >
          <FaChevronLeft className="text-[10px]" />
        </button>
      )}

      {/* Next arrow */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/35 hover:bg-black/65 text-white transition-all duration-200 opacity-0 group-hover:opacity-100 cursor-pointer"
          aria-label="Next photo"
        >
          <FaChevronRight className="text-[10px]" />
        </button>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); go(i, i > current ? 1 : -1); }}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? 'w-4.5 h-1.2 bg-white shadow-sm'
                  : 'w-1.2 h-1.2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
// ─────────────────────────────────────────────────────────────────────────────

export const CategoryPackages: React.FC = () => {
  const { t } = useTranslation();
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // Reset detail panel when modal closes
  const closeModal = () => {
    setSelectedPhoto(null);
  };

  // Find the current category object
  const category = tourCategories.find(c => c.id === categoryId);

  // Scroll to top on categoryId change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 pb-20 px-4 bg-custom-bg">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-premium text-center border border-light-gray/40">
          <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTimes className="text-3xl" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-primary-navy mb-2">
            {t('categoryNotFound')}
          </h2>
          <p className="text-text-gray text-xs md:text-sm leading-relaxed mb-8">
            {t('categoryNotFoundDesc')}
          </p>
          <Link
            to="/packages"
            className="w-full justify-center bg-primary-navy hover:bg-primary-navy/90 text-orange-cta font-heading font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all inline-flex items-center"
          >
            {t('goToCatalog')}
          </Link>
        </div>
      </div>
    );
  }

  // Filter tour packages belonging to this category
  const categoryPackages = tourPackages.filter(p => p.category === category.id);

  // Map category layout details safely without bracket notation
  const layoutDetails = (() => {
    const catId = category.id;
    if (!catId || catId === '__proto__' || catId === 'constructor') return undefined;
    const matched = Object.entries(categoryImages).find(([key]) => key === catId);
    if (matched) {
      const [, val] = matched;
      return val;
    }
    return undefined;
  })() || {
    banner: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-primary-navy/90 to-primary-navy/98",
    tag: "Exclusive WanderWish Holiday Experience"
  };

  // Build category-specific gallery items from local asset folders
  const indianItems: GalleryItem[] = [
    ...buildGalleryItems(globIndianImages, 'indian-tours', 100),
    ...buildGalleryItems(globWanderImages, 'indian-tours', 1000),
  ];
  const southIndiaItems: GalleryItem[] = buildGalleryItems(globSouthIndiaImages, 'indian-tours', 2000);
  const internationalItems: GalleryItem[] = buildGalleryItems(globInternationalImages, 'international', 3000);

  const fullGalleryList = [...staticGalleryItems, ...indianItems, ...southIndiaItems, ...internationalItems];

  // Filter gallery photos relevant to active category
  const filteredPhotos = fullGalleryList.filter(item => {
    if (category.id === 'indian-tours' && item.category === 'indian-tours') {
      // Only show items from the Indian Tour Packages folder (id >= 100) or wander images (id >= 1000)
      // Exclude south india items (id >= 2000)
      return item.id < 2000;
    }
    if (category.id === 'south-india') {
      // Show south india items (id >= 2000 & < 3000)
      return item.id >= 2000 && item.id < 3000;
    }
    if (category.id === 'international-tours' && item.category === 'international') return true;
    if (category.id === 'college-school-tours' && item.category === 'groups') return true;
    return false;
  });


  // Category Icon Resolver
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'FaCompass': return <FaCompass className="text-xl" />;
      case 'FaMapMarkedAlt': return <FaMapMarkedAlt className="text-xl" />;
      case 'FaGlobe': return <FaGlobe className="text-xl" />;
      case 'FaGraduationCap': return <FaGraduationCap className="text-xl" />;
      case 'FaSchool': return <FaSchool className="text-xl" />;
      default: return <FaCompass className="text-xl" />;
    }
  };


  const whatsappNumber = "918825813453";
  const customMessage = encodeURIComponent(
    `Hi WanderWish Holidays! I am planning a holiday and would like to enquire about the "${category.name}" packages. Please share custom itinerary plans.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${customMessage}`;

  return (
    <div className="bg-custom-bg min-h-screen pt-28 pb-20 overflow-x-hidden">
      
      {/* 1. Cinematic Zoom-out Hero Banner Cover with Glassmorphism Overlay */}
      <div className="relative h-[360px] md:h-[420px] bg-primary-navy overflow-hidden flex items-end pb-12 md:pb-16 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('${layoutDetails.banner}')` }}
        ></motion.div>
        
        {/* Dynamic gradient overlay matching category styling */}
        <div className={`absolute inset-0 bg-linear-to-t ${layoutDetails.gradient} via-primary-navy/40 to-transparent`}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 text-white">
          <div className="flex flex-col gap-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl w-fit backdrop-blur-md border border-white/10"
            >
              <span className="text-orange-cta font-extrabold flex items-center shrink-0">
                {getCategoryIcon(category.icon)}
              </span>
              <span className="text-orange-cta font-heading text-[10px] md:text-xs font-bold uppercase tracking-widest">
                {category.tagline}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.2 }}
              className="font-heading font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-white leading-none m-0"
            >
              {category.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-white/80 text-xs md:text-sm leading-relaxed max-w-2xl font-medium font-sans m-0"
            >
              {category.description}
            </motion.p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* 3. Staggered Gallery Grid (Flex/Grid) */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-orange-cta font-heading text-xs font-bold uppercase tracking-widest block mb-2">
              {t('featuredCatalogue')}
            </span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-primary-navy uppercase tracking-tight">
              {t('selectDreamHoliday')}
            </h2>
            <div className="h-1.5 w-16 bg-teal-accent mx-auto mt-4 rounded-full"></div>
          </div>

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 }
              }
            }}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {categoryPackages.map((pkg) => {

              const cardWhatsappMessage = encodeURIComponent(
                `Hi WanderWish Holidays! I am exploring packages under "${category.name}" and am very interested in: "${pkg.title}" (${pkg.duration}). Please share full details.`
              );
              const cardWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${cardWhatsappMessage}`;

              return (
                <motion.div
                  key={pkg.id}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1, 
                      transition: { type: "spring", stiffness: 100, damping: 16 } 
                    }
                  }}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  onClick={() => navigate(`/packages/${pkg.id}`)}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white border border-light-gray/45 shadow-premium hover:shadow-2xl group transition-all duration-300 relative h-full cursor-pointer"
                >
                  {/* Photo Carousel Section */}
                  <PackageCarousel
                    images={pkg.images}
                    alt={pkg.title}
                    duration={pkg.duration}
                  />

                  {/* Card Info Section */}
                  <div className="flex flex-col justify-between p-4 grow">
                    <div>
                      <h3 className="font-heading font-extrabold text-base text-primary-navy mb-1.5 line-clamp-1 group-hover:text-teal-accent transition-colors duration-300">
                        {pkg.title}
                      </h3>
                      
                      <p className="text-text-gray text-xs md:text-sm line-clamp-2 leading-relaxed mb-3">
                        {pkg.description}
                      </p>

                      {/* Flexed Places Covered tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pkg.placesCovered.map((place, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[9px] font-bold text-primary-navy/80 bg-custom-bg border border-light-gray/60 px-2 py-1 rounded-lg"
                          >
                            <FaMapMarkerAlt className="text-[8px] text-teal-accent" />
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* pricing and action buttons grid flex */}
                    <div className="mt-auto pt-3 border-t border-light-gray/45 flex flex-col gap-4">

                      <div className="grid grid-cols-2 gap-3 shrink-0">
                        <Link
                          to={`/packages/${pkg.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-primary-navy bg-custom-bg hover:bg-light-gray/60 border border-light-gray py-2.5 px-3 rounded-xl transition-all duration-300 cursor-pointer"
                        >
                          {t('detailsLabel')}
                          <motion.span
                            variants={{ hover: { x: 3 } }}
                            transition={{ type: "spring", stiffness: 200, damping: 10 }}
                          >
                            <FaArrowRight className="text-[9px]" />
                          </motion.span>
                        </Link>
                        
                        <a
                          href={cardWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-white bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg py-2.5 px-3 rounded-xl transition-all duration-300"
                        >
                          <FaWhatsapp className="text-sm shrink-0" />
                          Enquire
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* 4. Category-specific Real Photo Gallery (Grid Flex & Lightbox Modal) */}
        {filteredPhotos.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <span className="text-orange-cta font-heading text-xs font-bold uppercase tracking-widest block mb-2">
                {t('travelerDiaries')}
              </span>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-primary-navy uppercase tracking-tight">
                {t('tripsCapturedOnLocation')}
              </h2>
              <div className="h-1.5 w-16 bg-teal-accent mx-auto mt-4 rounded-full"></div>
            </div>

            {/* Masonry layout using grid flex wrap */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            >
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.id}
                  whileHover="hover"
                  initial="rest"
                  animate="rest"
                  onClick={() => setSelectedPhoto(photo)}
                  className="relative overflow-hidden rounded-2xl shadow-premium border border-light-gray/40 aspect-4/3 group cursor-pointer"
                >
                  <motion.img 
                    src={photo.url} 
                    alt={photo.title} 
                    variants={{ hover: { scale: 1.06 } }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Visual detail drop list on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-primary-navy/95 via-primary-navy/10 to-transparent opacity-0 group-hover:opacity-95 transition-opacity duration-300"></div>

                  <motion.div 
                    variants={{
                      rest: { opacity: 0, y: 15 },
                      hover: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
                    }}
                    className="absolute inset-0 p-5 flex flex-col justify-end text-white z-10"
                  >
                    <div className="flex items-center gap-1 text-orange-cta mb-1">
                      <FaMapMarkerAlt className="text-[10px]" />
                      <span className="text-[9px] font-extrabold uppercase tracking-widest font-heading">{photo.location}</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-white mb-3 line-clamp-2">{photo.title}</h4>
                    
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-white/80 bg-white/10 border border-white/20 px-2.5 py-1.5 rounded-lg w-fit backdrop-blur-sm">
                        <FaExpandAlt className="text-[8px]" /> View Photo
                      </span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-primary-navy bg-orange-cta px-2.5 py-1.5 rounded-lg w-fit cursor-pointer hover:bg-orange-400 transition-colors">
                        <FaInfoCircle className="text-[8px]" /> Details
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* 5. Custom Group Consult Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary-navy rounded-3xl p-8 md:p-12 text-white border border-white/5 shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-cta/5 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-accent/5 rounded-tr-full"></div>
          
          <span className="text-orange-cta font-heading text-xs font-bold uppercase tracking-widest block mb-2">
            {t('tailorMadeHolidays')}
          </span>
          <h3 className="font-heading font-black text-3xl md:text-4xl uppercase mb-4 text-white">
            {t('needCustomPlan')}
          </h3>
          <p className="text-white/75 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed mb-8">
            {t('customPlanDesc')}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-heading font-bold text-xs py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
            >
              <FaWhatsapp className="text-lg" />
              Chat Directly on WhatsApp
            </a>
            
            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/15 border border-white/15 text-white font-heading font-bold text-xs py-4 px-8 rounded-2xl transition-all duration-300 flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
            >
              <FaInfoCircle className="text-sm" />
              Contact Desk Enquiry
            </Link>
          </div>
        </motion.div>

      </div>

      {/* 6. Lightbox Overlay Photo Preview Modal with Direct Details & CTAs */}
      <AnimatePresence>
        {selectedPhoto && (() => {
          // Dynamic matching to rich package
          const matchedPackageId = (() => {
            const locLower = selectedPhoto.location.toLowerCase();
            const matched = tourPackages.find(p => 
              p.title.toLowerCase().includes(locLower) || 
              p.placesCovered.some(pl => pl.toLowerCase().includes(locLower)) ||
              p.description.toLowerCase().includes(locLower)
            );
            return matched ? matched.id : null;
          })();

          const detailsUrl = matchedPackageId ? `/packages/${matchedPackageId}` : '/packages';
          const detailsLabel = matchedPackageId ? "Full Details" : "View Packages";

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-navy/95 backdrop-blur-md"
              onClick={closeModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: "spring", stiffness: 110, damping: 15 }}
                className="relative max-w-3xl w-full rounded-3xl max-h-[90vh] overflow-y-auto scrollbar-thin bg-[#0d1b2a] border border-white/10 shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all cursor-pointer"
                  title="Close"
                >
                  <FaTimes className="text-sm" />
                </button>

                {/* Photo */}
                <div className="w-full overflow-hidden aspect-16/10 max-h-[50vh]">
                  <img 
                    src={selectedPhoto.url} 
                    alt={selectedPhoto.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info and Action Buttons Bottom Bar */}
                <div className="p-6 bg-[#0d1b2a] border-t border-white/8 flex flex-col gap-5 relative z-10 text-white">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <FaMapMarkerAlt className="text-orange-cta text-[10px] shrink-0" />
                        <span className="text-orange-cta text-[10px] font-extrabold uppercase tracking-widest font-heading">
                          {selectedPhoto.location}
                        </span>
                      </div>
                      <h3 className="font-heading font-black text-xl text-white leading-tight m-0">
                        {selectedPhoto.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-white/70 text-xs leading-relaxed m-0">
                    {t('exploreStunningVistas')}<span className="text-white font-semibold">{selectedPhoto.title}</span> located in <span className="text-orange-cta font-medium">{selectedPhoto.location}</span>. Part of our curated <span className="text-teal-accent font-medium">{category.name}</span>, this popular spot offers memories of a lifetime with premium accommodation and guided routes.
                  </p>

                  {/* Always-visible direct action buttons */}
                  <div className="grid grid-cols-2 gap-4 mt-1">
                    <Link
                      to={detailsUrl}
                      onClick={closeModal}
                      className="inline-flex items-center justify-center gap-2 text-xs font-bold text-primary-navy bg-orange-cta hover:bg-orange-400 py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md text-center cursor-pointer"
                    >
                      <FaInfoCircle className="text-xs shrink-0" />
                      {detailsLabel}
                    </Link>
                    
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi WanderWish! I saw the gorgeous photo of "${selectedPhoto.title}" in ${selectedPhoto.location} and would like to plan a custom holiday itinerary.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-green-500 hover:bg-green-600 py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md text-center"
                    >
                      <FaWhatsapp className="text-sm shrink-0" />
                      Enquire
                    </a>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
};

