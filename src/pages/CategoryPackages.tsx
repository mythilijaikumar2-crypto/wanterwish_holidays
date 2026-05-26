import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaMapMarkerAlt, FaWhatsapp, FaArrowRight,
  FaCompass, FaRegEye, FaTimes, FaCameraRetro, FaInfoCircle,
  FaMapMarkedAlt, FaGlobe, FaGraduationCap, FaSchool
} from 'react-icons/fa';

import { tourPackages } from '../data/packages';
import { tourCategories } from '../data/categories';

// Category custom imagery mapper for header covers
const categoryImages: Record<string, { banner: string; gradient: string; tag: string }> = {
  "south-india": {
    banner: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
    gradient: "from-teal-900/90 to-emerald-950/95",
    tag: "God's Own Country & Sacred Temples"
  },
  "indian-tours": {
    banner: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80",
    gradient: "from-blue-900/90 to-indigo-950/95",
    tag: "Himalayan Vistas & Royal Regality"
  },
  "international-tours": {
    banner: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80",
    gradient: "from-orange-950/90 to-red-950/95",
    tag: "Futuristic Wonders & Dream Shores"
  },
  "college-school-tours": {
    banner: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=1600&q=80",
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

// Vite glob import for local images
const globImages = import.meta.glob('../assets/wanderimages/indiantourimgs/*.{jpeg,jpg,png,gif,webp}', { eager: true });

const staticGalleryItems: GalleryItem[] = [
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
  }
];

export const CategoryPackages: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

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
            Category Not Found
          </h2>
          <p className="text-text-gray text-xs md:text-sm leading-relaxed mb-8">
            The package category you are trying to view does not exist or has been modified.
          </p>
          <Link
            to="/packages"
            className="w-full justify-center bg-primary-navy hover:bg-primary-navy/90 text-orange-cta font-heading font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all inline-flex items-center"
          >
            Go to Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Filter tour packages belonging to this category
  const categoryPackages = tourPackages.filter(p => p.category === category.id);

  // Map category layout details
  const layoutDetails = categoryImages[category.id] || {
    banner: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    gradient: "from-primary-navy/90 to-primary-navy/98",
    tag: "Exclusive WanderWish Holiday Experience"
  };

  // Compile real gallery media matching this category
  const importedItems: GalleryItem[] = Object.entries(globImages).map(([path, module], idx) => {
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

  const fullGalleryList = [...staticGalleryItems, ...importedItems];

  // Filter gallery photos relevant to active category
  const filteredPhotos = fullGalleryList.filter(item => {
    if (category.id === 'indian-tours' && item.category === 'indian-tours') return true;
    if (category.id === 'south-india' && item.location.toLowerCase().includes('kerala') || item.location.toLowerCase().includes('ooty') || item.location.toLowerCase().includes('south')) return true;
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
              Featured Catalogue
            </span>
            <h2 className="font-heading font-black text-3xl md:text-4xl text-primary-navy uppercase tracking-tight">
              Select Your Dream Holiday
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
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
                  className="flex flex-col overflow-hidden rounded-3xl bg-white border border-light-gray/45 shadow-premium hover:shadow-2xl group transition-all duration-300 relative h-full"
                >
                  {/* Photo Section with Zoom & Hover Actions */}
                  <div className="relative h-[250px] w-full overflow-hidden shrink-0">
                    <motion.img
                      src={pkg.image}
                      alt={pkg.title}
                      variants={{ hover: { scale: 1.08 } }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="h-full w-full object-cover"
                    />
                    
                    {/* Dark gradient slide overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-primary-navy/85 via-primary-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1 bg-teal-accent/90 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                        <FaRegEye /> Interactive Visuals
                      </span>
                    </div>

                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] font-bold px-3 py-1.5 rounded-full border bg-white/95 text-primary-navy border-light-gray shadow-sm tracking-wider uppercase font-heading">
                        {pkg.duration}
                      </span>
                    </div>
                  </div>

                  {/* Card Info Section */}
                  <div className="flex flex-col justify-between p-7 grow">
                    <div>
                      <h3 className="font-heading font-extrabold text-xl text-primary-navy mb-3 line-clamp-1 group-hover:text-teal-accent transition-colors duration-300">
                        {pkg.title}
                      </h3>
                      
                      <p className="text-text-gray text-xs md:text-sm line-clamp-2 leading-relaxed mb-6">
                        {pkg.description}
                      </p>

                      {/* Flexed Places Covered tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {pkg.placesCovered.map((place, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-primary-navy/80 bg-custom-bg border border-light-gray/60 px-3 py-1.5 rounded-xl"
                          >
                            <FaMapMarkerAlt className="text-[9px] text-teal-accent" />
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* pricing and action buttons grid flex */}
                    <div className="mt-auto pt-5 border-t border-light-gray/45 flex flex-col gap-4">

                      <div className="grid grid-cols-2 gap-3 shrink-0">
                        <Link
                          to={`/packages/${pkg.id}`}
                          className="flex items-center justify-center gap-1.5 text-xs font-bold text-primary-navy bg-custom-bg hover:bg-light-gray/60 border border-light-gray py-4 px-3 rounded-xl transition-all duration-300 cursor-pointer"
                        >
                          Details
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
                          className="flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg py-4 px-3 rounded-xl transition-all duration-300"
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
                Traveler Diaries
              </span>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-primary-navy uppercase tracking-tight">
                Trips Captured On Location
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
                    className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10"
                  >
                    <div className="flex items-center gap-1 text-orange-cta mb-1">
                      <FaCompass className="text-[10px]" />
                      <span className="text-[9px] font-extrabold uppercase tracking-widest font-heading">{photo.location}</span>
                    </div>
                    <h4 className="font-heading font-bold text-base text-white mb-2">{photo.title}</h4>
                    
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-teal-accent bg-teal-accent/10 border border-teal-accent/20 px-2.5 py-1 rounded-lg w-fit backdrop-blur-sm">
                      <FaCameraRetro /> View Large
                    </span>
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
            Tailor-Made Holidays
          </span>
          <h3 className="font-heading font-black text-3xl md:text-4xl uppercase mb-4 text-white">
            Need A Fully Customized Plan?
          </h3>
          <p className="text-white/75 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed mb-8">
            Tell us your preferred days, locations, and headcount. Our founder, **Vinothini**, will design a customized itinerary aligned perfectly with your demands.
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

      {/* 6. Lightbox Overlay Photo Preview Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-navy/95 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 110, damping: 15 }}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-primary-navy border border-white/10 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all cursor-pointer"
                title="Close"
              >
                <FaTimes className="text-base" />
              </button>

              <div className="aspect-16/10 w-full overflow-hidden">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 bg-primary-navy text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/5">
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-white">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-white/60 text-xs mt-1">
                    Past tour captured live under the {category.name} catalog.
                  </p>
                </div>
                
                <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-cta bg-orange-50/10 border border-orange-200/20 px-3.5 py-1.5 rounded-xl uppercase tracking-wider">
                  <FaCompass className="text-xs" /> {selectedPhoto.location}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
