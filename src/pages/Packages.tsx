import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter, FaRegFolderOpen } from 'react-icons/fa';
import { PackageCard } from '../components/PackageCard';

import { tourPackages } from '../data/packages';
import { tourCategories } from '../data/categories';

export const Packages: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Derive state directly from URL search parameters on every render
  const activeCategory = searchParams.get('category') || "all";
  const searchQuery = searchParams.get('search') || "";

  // Filter categories helper
  const filterPills = [
    { id: "all", name: "All Packages" },
    ...tourCategories.map(cat => ({ id: cat.id, name: cat.shortName }))
  ];

  // Handle category tab switching
  const handleCategoryChange = (catId: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (catId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', catId);
    }
    setSearchParams(newParams);
  };

  // Handle live search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('search', query);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  // Perform filtration logic based on active state and query text
  const filteredPackages = tourPackages.filter(pkg => {
    const matchesCategory = activeCategory === "all" || pkg.category === activeCategory;
    
    const cleanQuery = searchQuery.toLowerCase().trim();
    const matchesSearch = cleanQuery === "" || 
      pkg.title.toLowerCase().includes(cleanQuery) || 
      pkg.description.toLowerCase().includes(cleanQuery) ||
      pkg.placesCovered.some(place => place.toLowerCase().includes(cleanQuery));

    return matchesCategory && matchesSearch;
  });


  return (
    <div className="bg-custom-bg min-h-screen pt-28 pb-20">
      
      {/* Page Header Cover with Cinematic Zoom-out Entry */}
      <div className="relative h-[250px] bg-primary-navy overflow-hidden flex items-center justify-center mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 0.45, scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80')" }}
        ></motion.div>
        <div className="absolute inset-0 bg-linear-to-b from-primary-navy/80 to-primary-navy"></div>

        <div className="relative text-center text-white z-10 px-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-orange-cta font-heading text-xs font-bold uppercase tracking-widest block mb-2"
          >
            Perfect Holidays
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, damping: 12, delay: 0.2 }}
            className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-white m-0"
          >
            Our Tour Packages
          </motion.h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search & Filter Hub Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 85, damping: 14 }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-premium border border-light-gray/40 mb-12 flex flex-col gap-6 md:gap-8 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Search Input bar */}
            <div className="lg:col-span-8 relative">
              <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-text-gray/50 text-base" />
              <input
                type="text"
                placeholder="Search packages by location (e.g. Manali, Singapore, Temple, Beach)..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-11 pr-5 py-4 rounded-2xl bg-custom-bg border border-light-gray/60 text-sm focus:outline-none focus:border-teal-accent focus:bg-white transition-all text-primary-navy font-medium placeholder-text-gray/50"
              />
            </div>

            {/* Clear Button */}
            <div className="lg:col-span-4 flex items-center justify-end">
              {(searchQuery !== "" || activeCategory !== "all") && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSearchParams({});
                  }}
                  className="text-xs font-bold text-orange-cta hover:text-orange-cta/80 bg-orange-50 px-4 py-3.5 rounded-xl border border-orange-200/50 cursor-pointer w-full lg:w-auto text-center"
                >
                  Clear All Filters
                </motion.button>
              )}
            </div>

          </div>

          {/* Responsive Category Pills */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-navy/70">
              <FaFilter className="text-teal-accent text-xs" />
              <span>Filter By Category:</span>
            </div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2.5 overflow-x-auto pb-1 scrollbar-thin"
            >
              {filterPills.map(pill => (
                <motion.button
                  key={pill.id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, x: -10 },
                    visible: { opacity: 1, scale: 1, x: 0, transition: { type: "spring" as const, stiffness: 120, damping: 14 } }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryChange(pill.id)}
                  className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === pill.id
                      ? 'bg-primary-navy text-orange-cta border-primary-navy shadow-md scale-102 font-bold'
                      : 'bg-custom-bg hover:bg-light-gray/40 text-text-gray border-light-gray/60'
                  }`}
                >
                  {pill.name}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Catalog Results Grid */}
        <AnimatePresence mode="popLayout">
          {filteredPackages.length > 0 ? (
            <motion.div 
              layout
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08 }
                }
              }}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredPackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 90, damping: 14 } },
                    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
                  }}
                >
                  <PackageCard pkg={pkg} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* No Results Placeholder fallback state */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" as const, stiffness: 100, damping: 15 }}
              className="text-center py-24 bg-white rounded-3xl border border-light-gray/40 shadow-premium max-w-xl mx-auto p-8"
            >
              <div className="h-16 w-16 bg-orange-50 text-orange-cta rounded-full flex items-center justify-center mx-auto mb-6">
                <FaRegFolderOpen className="text-2xl" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-primary-navy mb-2">
                No Tour Packages Found
              </h3>
              <p className="text-text-gray text-xs md:text-sm leading-relaxed mb-6">
                We couldn't find any tour packages matching your search parameters. Try altering your keyword search or select a different category pill above.
              </p>
              <button
                onClick={() => {
                  setSearchParams({});
                }}
                className="inline-flex items-center gap-2 bg-primary-navy hover:bg-primary-navy/90 text-orange-cta font-heading font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Reset Search Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
