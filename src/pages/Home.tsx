import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaUserShield, FaTags, FaMapMarkedAlt, 
  FaHeadphonesAlt, FaBus, FaSlidersH, 
  FaWhatsapp, FaQuoteLeft, FaStar 
} from 'react-icons/fa';
import { Hero } from '../components/Hero';
import { SectionTitle } from '../components/SectionTitle';
import { CategoryCard } from '../components/CategoryCard';
import { DestinationCard } from '../components/DestinationCard';
import { PackageCard } from '../components/PackageCard';
import { tourCategories } from '../data/categories';
import { destinations } from '../data/destinations';
import { tourPackages } from '../data/packages';

export const Home: React.FC = () => {
  // Select featured packages to show on landing page
  const featuredPackages = tourPackages.filter(pkg => pkg.featured).slice(0, 3);

  const whyChooseUsData = [
    {
      title: "Customized Packages",
      description: "Tailor your itineraries to suit your own schedule, pace, preferences, and pocket constraints perfectly.",
      icon: FaSlidersH,
      color: "text-blue-500 bg-blue-50"
    },
    {
      title: "Best Price Guarantee",
      description: "Get unmatched, competitive pricing on premium hotels, reliable coaches, and entry passes.",
      icon: FaTags,
      color: "text-orange-cta bg-orange-50"
    },
    {
      title: "Safe & Secure Travel",
      description: "Your safety is our top priority. We provide vetted hotels, certified vehicles, and round-the-clock support.",
      icon: FaUserShield,
      color: "text-green-500 bg-green-50"
    },
    {
      title: "Domestic & International",
      description: "From local South India weekend getaways to exotic international destinations across continents.",
      icon: FaMapMarkedAlt,
      color: "text-teal-accent bg-teal-50"
    },
    {
      title: "24/7 Call Support",
      description: "Enjoy stress-free holidays with dedicated support teams tracking your transit at every moment.",
      icon: FaHeadphonesAlt,
      color: "text-purple-500 bg-purple-50"
    },
    {
      title: "School & College Experts",
      description: "Highly structured and securely monitored logistics for educational fields and energetic college tours.",
      icon: FaBus,
      color: "text-red-500 bg-red-50"
    }
  ];

  const testimonials = [
    {
      name: "Akash Raghavan",
      role: "College Union President, Chennai",
      text: "We booked our 5-day Goa college trip with WanderWish Holidays. The experience was absolutely outstanding! The quad-sharing resorts were excellent, transfers were punctual, and the bonfire music night was unforgettable. Huge thanks to Vinothini for personalizing this!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Meera Krishnan",
      role: "Family Traveler, Kochi",
      text: "WanderWish designed a custom 5-night Munnar & Houseboat package for our family. Every hotel room was clean, facing gorgeous valleys, and the houseboat chefs served incredibly delicious Kerala food. Highly recommend their 24/7 WhatsApp support!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "School Principal, Chennai",
      text: "Organizing a school excursion for 80 children is always stressful, but WanderWish Holidays handled it with extreme care and safety. The Visvesvaraya science tour in Bangalore was wonderfully curated. Constant medical support and active tour guides kept us relaxed.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    }
  ];

  const instagramImages = [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=400&q=80"
  ];

  return (
    <div className="bg-custom-bg min-h-screen">
      {/* 1. Hero Landing Section */}
      <Hero />

      {/* 2. Tour Categories Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Explore Our Tour Categories" 
          subtitle="Choose Your Travel Style"
        />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr justify-items-center items-stretch mx-auto max-w-6xl">
          {tourCategories.map(cat => (
            <motion.div
              key={cat.id}
              className="h-full flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <CategoryCard category={cat} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Popular Destinations Section */}
      <section className="py-20 bg-primary-navy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Most Popular Destinations" 
            subtitle="Dream Escapes Awaiting"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <DestinationCard destination={dest} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Packages Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Featured Tour Packages" 
          subtitle="Best Selling Holidays"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <PackageCard pkg={pkg} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Why Choose Us Section */}
      <section className="py-20 bg-primary-navy text-white relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-cta/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle 
            title="The WanderWish Advantage" 
            subtitle="Why Choose Us"
            light={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUsData.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-orange-cta text-primary-navy flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                      <Icon className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-orange-cta transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-xs md:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Gallery Preview Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle 
          title="Share The WanderWish Vibe" 
          subtitle="Moments on Instagram"
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramImages.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square overflow-hidden rounded-xl shadow-md border border-light-gray/40 group cursor-pointer"
            >
              <img 
                src={img} 
                alt={`Instagram Travel Preview ${idx + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary-navy/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaStar className="text-orange-cta text-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="py-20 bg-primary-navy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="What Our Happy Travelers Say" 
            subtitle="Client Testimonials"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-premium border border-light-gray/40 flex flex-col justify-between relative"
              >
                <FaQuoteLeft className="text-orange-cta/15 text-6xl absolute top-6 right-6" />
                
                <div className="relative z-10">
                  <div className="flex gap-1.5 text-orange-cta mb-5">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="text-sm" />
                    ))}
                  </div>

                  <p className="text-text-gray text-xs md:text-sm italic leading-relaxed mb-6 relative">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center gap-3 border-t border-light-gray/40 pt-4 mt-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="h-11 w-11 rounded-full object-cover border-2 border-teal-accent"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-primary-navy">
                      {review.name}
                    </h4>
                    <span className="text-[10px] text-teal-accent font-semibold block uppercase">
                      {review.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact CTA Section */}
      <section className="py-24 bg-linear-to-r from-primary-navy to-teal-accent/90 text-white text-center relative overflow-hidden">
        {/* Geometric highlights */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>

        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 flex flex-col items-center">
          <h2 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-tight mb-4">
            Ready to Explore the World?
          </h2>
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed font-sans">
            Plan your next dream holiday, secure educational tour, or dynamic group trip with WanderWish Holidays.
          </p>

          <a
            href="https://wa.me/918825813453?text=Hi%20WanderWish%20Holidays!%20I'm%20ready%20to%20explore%20the%20world.%20Please%20help%20me%20plan%20my%20next%20trip!"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-cta hover:bg-orange-cta/90 text-primary-navy font-heading font-bold text-sm md:text-base px-10 py-5 rounded-2xl transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer w-full sm:w-auto"
          >
            <FaWhatsapp className="text-xl shrink-0" />
            Contact on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};
