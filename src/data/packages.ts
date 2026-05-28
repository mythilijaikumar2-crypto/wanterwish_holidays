export interface ItineraryDay {
  day: number;
  title: string;
  details: string;
}

export interface TourPackage {
  id: string;
  title: string;
  category: string;
  startingPrice: number;
  duration: string;
  placesCovered: string[];
  image: string;
  images: string[];
  bannerImage: string;
  description: string;
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  terms: string[];
  featured: boolean;
}

// Vite dynamic glob imports for all destination image folders
const globIndianImages = import.meta.glob('../assets/Indian Tour Packages/**/*.{jpeg,jpg,png,gif,webp,avif}', { eager: true });
const globSouthIndiaImages = import.meta.glob('../assets/South India Tour Packages/**/*.{jpeg,jpg,png,gif,webp,avif}', { eager: true });
const globInternationalImages = import.meta.glob('../assets/International Tour Packages/**/*.{jpeg,jpg,png,gif,webp,avif}', { eager: true });
const globWanderImages = import.meta.glob('../assets/wanderimages/indiantourimgs/*.{jpeg,jpg,png,gif,webp}', { eager: true });

// Helper to filter and retrieve all image paths under a given destination folder name
const getImagesForFolder = (globMap: Record<string, any>, folderName: string): string[] => {
  const lowerFolder = folderName.toLowerCase().replace(/\s+/g, '');
  return Object.entries(globMap)
    .filter(([path]) => {
      const parts = path.split('/');
      // e.g., ../assets/Indian Tour Packages/Manali/Solang Valley.jpg
      // The parent folder name is at index parts.length - 2
      const parentFolder = parts[parts.length - 2]?.toLowerCase().replace(/\s+/g, '') || '';
      return parentFolder === lowerFolder;
    })
    .map(([_, module]) => (module as { default: string }).default);
};

// Robust function to resolve cover image, carousel images array, and banner for a package
const resolvePackageImages = (
  folderName: string,
  categoryType: 'indian' | 'south-india' | 'international' | 'groups'
): { image: string; images: string[]; bannerImage: string } => {
  let resolved: string[] = [];
  const lowerFolder = folderName.toLowerCase().replace(/\s+/g, '');

  if (categoryType === 'south-india') {
    resolved = getImagesForFolder(globSouthIndiaImages, folderName);
  } else if (categoryType === 'indian') {
    resolved = getImagesForFolder(globIndianImages, folderName);
  } else if (categoryType === 'international') {
    resolved = getImagesForFolder(globInternationalImages, folderName);
  }

  // Fallback to legacy wander images
  if (resolved.length === 0) {
    resolved = Object.entries(globWanderImages)
      .filter(([path]) => path.toLowerCase().replace(/\s+/g, '').includes(lowerFolder))
      .map(([_, module]) => (module as { default: string }).default);
  }

  // Final fallback to high-quality Unsplash fallbacks
  const defaultImg = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80";
  const defaultBanner = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80";

  const image = resolved[0] || defaultImg;
  const bannerImage = resolved[1] || resolved[0] || defaultBanner;
  const images = resolved.length > 0 ? resolved : [defaultImg];

  return { image, images, bannerImage };
};

// Structural blueprint list of all WanderWish Packages
const packageBlueprints = [
  // ─── Indian Tour Packages ──────────────────────────────────────────────────
  {
    id: "manali-escapade",
    title: "Scenic Manali Escape Tour",
    category: "indian-tours",
    startingPrice: 14999,
    duration: "5 Days / 4 Nights",
    placesCovered: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Jogini Waterfall", "Mall Road"],
    description: "Immerse yourself in the gorgeous snow-drenched mountains of Manali. Wander through apple orchards, hike to majestic waterfalls, and engage in thrilling snow activities.",
    featured: true,
    folderName: "Manali",
    categoryType: "indian" as const,
    itinerary: [
      { day: 1, title: "Arrival in Manali & Local Sightseeing", details: "Arrive in Manali, check in to your premium hotel. Relax, then proceed to visit the iconic Hadimba Devi Temple, Vashisht Hot Springs, and take a peaceful evening walk on the famous Mall Road." },
      { day: 2, title: "Adventure at Solang Valley", details: "Drive to Solang Valley, a heaven for adventure sports. Enjoy optional activities like paragliding, zorbing, and cable car rides amidst stunning Himalayan backdrops." },
      { day: 3, title: "Excursion to Snowy Rohtang Pass", details: "Embark on an early morning excursion to Rohtang Pass (subject to permit). Witness breathtaking panoramic views of snow-covered peaks and enjoy playing in the pristine snow." },
      { day: 4, title: "Jogini Waterfall Trek & Old Manali Cafes", details: "Go on a beautiful light trek to the holy Jogini Waterfalls starting from Vashisht. Spend the evening exploring the hippie culture and outstanding cafes in Old Manali." },
      { day: 5, title: "Departure with Beautiful Memories", details: "Enjoy a hearty breakfast, pack your bags, and check out from the hotel. Head to the bus stand/airport for your onward journey, filled with spectacular memories." }
    ],
    includes: ["4 Nights accommodation in 3-star hotel", "Daily breakfast & dinner (MAP plan)", "All sightseeing transfers in private AC vehicle", "Toll taxes, fuel charges, and driver allowances", "Guided short trek to Jogini Waterfalls"],
    excludes: ["Rohtang Pass permit and local cab charges", "Adventure sports activities fees", "Lunch, snacks, and any personal expenses", "Travel insurance"],
    terms: ["50% advance payment required to confirm the booking.", "Cancellations made 15 days before the trip are eligible for a 100% refund.", "Rohtang Pass visits depend entirely on government permits and weather conditions."]
  },
  {
    id: "delhi-royal-heritage",
    title: "Golden Triangle Delhi Heritage",
    category: "indian-tours",
    startingPrice: 11999,
    duration: "4 Days / 3 Nights",
    placesCovered: ["Qutub Minar", "India Gate", "Red Fort", "Lotus Temple", "Chandni Chowk"],
    description: "Explore the historic monuments, busy bazaars, and beautiful government plazas of India's capital city. Perfect for families, historians, and foodie couples.",
    featured: true,
    folderName: "Delhi",
    categoryType: "indian" as const,
    itinerary: [
      { day: 1, title: "Welcome to Delhi & Evening India Gate Walk", details: "Arrive in Delhi. Get picked up by our driver and check in. In the evening, visit India Gate, drive past the majestic Rashtrapati Bhavan, and enjoy the fountain light show." },
      { day: 2, title: "Historic Old Delhi Extravaganza", details: "Step back in time as you visit the historical Red Fort and Jama Masjid. Enjoy a rickshaw ride through the bustling alleys of Chandni Chowk and savor famous local delicacies." },
      { day: 3, title: "Architectural Marvels of New Delhi", details: "Explore the soaring tower of Qutub Minar, the beautiful gardens of Humayun's Tomb, and the serene flower-shaped Lotus Temple. End the evening with luxury shopping at Connaught Place." },
      { day: 4, title: "Akshardham Temple & Departure", details: "Visit the massive Swaminarayan Akshardham Temple complex to experience India's rich spiritual art. Proceed to Delhi Airport/Railway Station in the afternoon for departure." }
    ],
    includes: ["3 Nights stay in premium city hotels", "Breakfast at the hotel", "Full private AC cab for sightseeing and transfers", "Local tour coordinator support", "Rickshaw ride fee in Chandni Chowk"],
    excludes: ["Monument entry fees & camera permits", "Lunch & Dinner", "Flight/Train ticket charges", "Any guide tips"],
    terms: ["Enquiry quotes are valid for 7 days only.", "Standard check-in time is 12:00 PM and check-out is 11:00 AM.", "Akshardham Temple remains closed on Mondays."]
  },
  {
    id: "kashmir-paradise-tour",
    title: "Heavenly Kashmir Valley Splendor",
    category: "indian-tours",
    startingPrice: 19999,
    duration: "6 Days / 5 Nights",
    placesCovered: ["Srinagar", "Dal Lake", "Gulmarg Gondola", "Pahalgam Valley", "Sonamarg Meadow"],
    description: "Witness paradise on earth. Enjoy romantic Shikara rides on Dal Lake, soar in the high-altitude Gulmarg Gondola, and wander through Pahalgam's pristine pine forests.",
    featured: true,
    folderName: "Kashmir",
    categoryType: "indian" as const,
    itinerary: [
      { day: 1, title: "Arrival in Srinagar & Dal Lake Shikara Ride", details: "Welcome to Srinagar! Check in to a premium traditional Houseboat on Dal Lake. Enjoy a relaxing sunset Shikara ride across floating gardens and peaceful local waterways." },
      { day: 2, title: "Srinagar Mughal Gardens Sightseeing", details: "Explore the royal Shalimar Bagh, Nishat Bagh, and Chashme Shahi Mughal Gardens. Visit the famous Hazratbal Shrine and the majestic Shankaracharya Temple overlooking the city." },
      { day: 3, title: "Excursion to Golden Meadows of Sonamarg", details: "Travel to Sonamarg, the 'Meadow of Gold'. Enjoy horse riding to the breathtaking Thajiwas Glacier and click snapshots alongside the clean, rushing Sindh River." },
      { day: 4, title: "Transfer to Pahalgam - Valley of Shepherds", details: "Drive to Pahalgam. En route, stop by the gorgeous saffron fields of Pampore and the ancient ruins of Avantipur. Visit Betaab Valley and Aru Valley in Pahalgam." },
      { day: 5, title: "High Thrills at Snow-capped Gulmarg", details: "Drive to Gulmarg. Ride the world-famous Gulmarg Gondola (Asia's highest cable car) up to Phase 1 & 2 for panoramic views of snowy Himalayan giants." },
      { day: 6, title: "Srinagar Departure", details: "Enjoy your final breakfast by the lake, shop for famous Kashmiri pashminas and dry fruits, and transfer to Srinagar Airport for departure." }
    ],
    includes: ["1 Night Luxury Houseboat stay, 4 Nights in 3-star Hotels", "Daily breakfast & dinner", "Private AC vehicle transfers", "1-Hour Dal Lake Shikara ride"],
    excludes: ["Gulmarg Gondola cable car ride tickets", "Pony ride fees and local sightseeing union cabs", "Lunch and personal expenses"],
    terms: ["Gondola tickets must be booked online well in advance.", "Refunds are subject to weather permitting in high-altitude passes."]
  },
  {
    id: "leh-ladakh-adventure",
    title: "Mighty Leh Ladakh Road Trip",
    category: "indian-tours",
    startingPrice: 24999,
    duration: "7 Days / 6 Nights",
    placesCovered: ["Pangong Lake", "Nubra Valley", "Khardung La Pass", "Magnetic Hill", "Leh Palace"],
    description: "Embark on an epic adventure through barren mountains and deep blue waters. Cross the towering Khardung La Pass and sleep in premium desert camps in Nubra Valley.",
    featured: true,
    folderName: "Leh Ladakh",
    categoryType: "indian" as const,
    itinerary: [
      { day: 1, title: "Arrival in Leh & Complete Acclimatization", details: "Land at Leh Airport (11,500 ft). Transfer to hotel. Spend the entire day resting and drinking water to acclimatize safely to the high altitude." },
      { day: 2, title: "Leh Local Heritage & Magnetic Hill", details: "Visit the Hall of Fame Museum, Gurudwara Pathar Sahib, the optical illusion of Magnetic Hill, and the scenic Confluence of Indus and Zanskar Rivers." },
      { day: 3, title: "Drive to Nubra Valley via Khardung La Pass", details: "Cross the legendary Khardung La Pass (17,580 ft)—one of the highest motorable roads in the world. Drop down into Nubra Valley, check in to a deluxe campsite, and ride double-humped camels." },
      { day: 4, title: "Nubra to Pangong Lake via Shyok Route", details: "Drive along the wild Shyok River to the breathtaking Pangong Tso Lake (14,270 ft). Witness the lake change colors from azure blue to deep green as the sun moves." },
      { day: 5, title: "Return to Leh & Thiksey Monastery", details: "Drive back to Leh. En route, stop at the beautiful multi-story Thiksey Monastery and the historic Shey Palace. Spend the evening shopping in Leh Main Bazaar." },
      { day: 6, title: "Excursion to Sham Valley & Monasteries", details: "Explore the ancient Alchi Monastery, Likir Monastery, and the Basgo Fort ruins, soaking in Ladakh's rich Tibetan Buddhist heritage." },
      { day: 7, title: "Departure from Leh", details: "Transfer to Leh Airport early morning for your flight home, enjoying magnificent views of the snow-clad Himalayas from your window." }
    ],
    includes: ["6 Nights accommodation (Hotels & Desert Camps)", "Daily breakfast & dinner", "Private robust SUV/Tempo traveler transport", "Inner Line Permits and environment fees"],
    excludes: ["Double-humped camel ride fees", "Lunch, snacks, and oxygen cylinder rentals if any", "Any medical evacuation costs"],
    terms: ["Proper medical clearance is highly recommended.", "Acclimatization on Day 1 is strictly mandatory."]
  },
  {
    id: "jaipur-heritage-tour",
    title: "Royal Pink City Jaipur Wonders",
    category: "indian-tours",
    startingPrice: 10499,
    duration: "4 Days / 3 Nights",
    placesCovered: ["Hawa Mahal", "Amer Fort", "City Palace", "Jal Mahal", "Chokhi Dhani"],
    description: "Step into the royal world of the Rajputs. Marvel at the intricate pink sandstone facade of Hawa Mahal, explore massive hilltop forts, and relish authentic Rajasthani dining.",
    featured: false,
    folderName: "Jaipur",
    categoryType: "indian" as const,
    itinerary: [
      { day: 1, title: "Jaipur Arrival & Evening Birla Temple", details: "Arrive in Jaipur, check in to your heritage-style hotel. In the evening, visit the glowing white-marble Birla Temple and shop for beautiful block-print kurtis in Johri Bazaar." },
      { day: 2, title: "Amer Fort & Jal Mahal Exploration", details: "Visit the stunning Amer Fort situated on a hill; enjoy walking through Sheesh Mahal. Stop at the floating palace of Jal Mahal for scenic photographs in the afternoon." },
      { day: 3, title: "City Palace, Hawa Mahal & Chokhi Dhani", details: "Explore the royal City Palace, the astronomical instruments of Jantar Mantar, and the facade of Hawa Mahal. In the evening, enjoy a traditional cultural dining experience at Chokhi Dhani." },
      { day: 4, title: "Jaipur Departure", details: "After breakfast, pack your souvenirs and transfer to Jaipur Airport/Railway Station for your journey home." }
    ],
    includes: ["3 Nights Heritage Hotel stay", "Daily breakfast at the hotel", "Private AC sedan cab for all sightseeing", "Traditional dinner entry voucher at Chokhi Dhani"],
    excludes: ["Fort entry fees & guide charges", "Lunch and personal shopping"],
    terms: ["Chokhi Dhani operations start from 5:00 PM daily.", "Standard cancellation rules apply."]
  },
  {
    id: "agra-taj-mahal-classic",
    title: "Agra Taj Mahal & Mughal Splendor",
    category: "indian-tours",
    startingPrice: 8999,
    duration: "3 Days / 2 Nights",
    placesCovered: ["Taj Mahal", "Agra Fort", "Buland Darwaza", "Fatehpur Sikri"],
    description: "Stand before the world's greatest monument of love. Tour the red-sandstone corridors of Agra Fort and step through the colossal gateway of Buland Darwaza in Fatehpur Sikri.",
    featured: false,
    folderName: "Agra",
    categoryType: "indian" as const,
    itinerary: [
      { day: 1, title: "Agra Arrival & Sunset view of Taj Mahal", details: "Drive to Agra, check in to your premium hotel. In the late afternoon, head to Mehtab Bagh for a gorgeous sunset view of the Taj Mahal across the Yamuna River." },
      { day: 2, title: "The Iconic Taj Mahal & Massive Agra Fort", details: "Enjoy an early morning visit to the Taj Mahal to avoid the crowds. Return for breakfast, then explore the royal courts, mosque, and prisons inside the historic Agra Fort." },
      { day: 3, title: "Fatehpur Sikri Ruins & Departure", details: "Visit the red sandstone ghost city of Fatehpur Sikri and Buland Darwaza. Proceed to Delhi/Agra Airport for your onward journey." }
    ],
    includes: ["2 Nights stay in 3-star hotel", "Daily breakfast at hotel", "Private AC sedan for Delhi-Agra transfers and local tours"],
    excludes: ["Monument entry fees (Foreigner/Indian rates apply)", "Lunch & dinner"],
    terms: ["Taj Mahal remains strictly closed on Fridays.", "Carry valid government photo IDs for monument entry tickets."]
  },
  {
    id: "amritsar-golden-temple",
    title: "Spiritual Amritsar & Golden Temple",
    category: "indian-tours",
    startingPrice: 7999,
    duration: "3 Days / 2 Nights",
    placesCovered: ["Golden Temple", "Jallianwala Bagh", "Wagah Border Ceremony", "Partition Museum"],
    description: "Experience the profound peace of Sri Harmandir Sahib (Golden Temple) and witness the patriotic fervor of the Wagah Border beating retreat ceremony.",
    featured: false,
    folderName: "Amritsar",
    categoryType: "indian" as const,
    itinerary: [
      { day: 1, title: "Amritsar Arrival & Night Golden Temple View", details: "Arrive in Amritsar, check in to your hotel. Visit the Golden Temple at night when it glows magnificently, and enjoy eating delicious hot parathas at Kesar Da Dhaba." },
      { day: 2, title: "Jallianwala Bagh & High-Energy Wagah Border", details: "Pay respect at Jallianwala Bagh, visit the Partition Museum, and drive in the afternoon to the Wagah Border to join thousands cheering for India's border guards." },
      { day: 3, title: "Amritsar Departure", details: "Enjoy breakfast, take a final peaceful walk around the temple pool, and check out for transfer to Amritsar Airport/Railway Station." }
    ],
    includes: ["2 Nights stay in premium rooms", "Daily breakfast at hotel", "Private AC vehicle transfers"],
    excludes: ["Monument entry permits, camera charges", "Lunch and dinner"],
    terms: ["Golden Temple rules require covering your head and removing shoes before entering.", "Maintain silence and decorum on holy grounds."]
  },
  {
    id: "andaman-escapade",
    title: "Pristine Andaman & Havelock Escapade",
    category: "indian-tours",
    startingPrice: 21999,
    duration: "5 Days / 4 Nights",
    placesCovered: ["Radhanagar Beach", "Cellular Jail", "Havelock Island", "Neil Island", "Ross Island"],
    description: "Escape to white sandy shores and turquoise waters. Spot brilliant coral reefs, enjoy private yacht transfers to Havelock Island, and watch the Light & Sound show at Cellular Jail.",
    featured: false,
    folderName: "Andaman",
    categoryType: "indian" as const,
    itinerary: [
      { day: 1, title: "Port Blair Arrival & Cellular Jail Light Show", details: "Arrive at Port Blair Airport, transfer to hotel. In the evening, visit the historic Cellular Jail and watch the moving Light and Sound show detailing the Indian freedom struggle." },
      { day: 2, title: "Cruise to Havelock Island & Radhanagar Beach", details: "Board a premium high-speed catamaran cruise to Havelock Island. Spend your afternoon on Radhanagar Beach (voted Asia's best beach) watching a stunning sunset." },
      { day: 3, title: "Elephant Beach Scuba & Water Sports", details: "Head to Elephant Beach for optional snorkeling, glass-bottom boat rides, and scuba diving to witness Andaman's vibrant undersea marine life." },
      { day: 4, title: "Ferry to Neil Island Beaches & Ross Island Ruins", details: "Cruise to Neil Island. Visit the natural rocky bridge and Lakshmanpur Beach. Continue to Ross Island to walk amongst British-era ruins and friendly spotted deer." },
      { day: 5, title: "Departure with Island Souvenirs", details: "Check out from your hotel and transfer to Veer Savarkar Airport in Port Blair for your flight back home." }
    ],
    includes: ["4 Nights stay in beach resorts", "Daily breakfast at resorts", "All luxury ferry and catamaran tickets", "Private AC transport for land transfers"],
    excludes: ["Water sports activities (Scuba, Snorkeling, Jet Ski)", "Lunch and Dinner"],
    terms: ["Ferry sailings depend strictly on ocean weather conditions.", "Carry dry clothes, sunscreen, and beach hats."]
  },
  {
    id: "rishikesh-spiritual",
    title: "Yoga & Adventure Rishikesh Retreat",
    category: "indian-tours",
    startingPrice: 9499,
    duration: "4 Days / 3 Nights",
    placesCovered: ["Ram Jhula", "Triveni Ghat", "Ganga Aarti", "Neer Garh Waterfall", "River Rafting"],
    description: "The absolute spiritual adventure. Partake in the mesmerizing Ganga Aarti at Triveni Ghat, practice yoga on the riverbanks, and experience wild white-water rafting.",
    featured: false,
    folderName: "Rishikesh",
    categoryType: "indian" as const,
    itinerary: [
      { day: 1, title: "Arrival in Rishikesh & Ganga Aarti", details: "Arrive in Rishikesh, check in to your peaceful ashram-style resort. In the evening, visit Triveni Ghat to witness the sacred Ganga Aarti ceremony with oil lamps and Sanskrit chants." },
      { day: 2, title: "Ram Jhula, Lakshman Jhula & Beatles Ashram", details: "Cross the swinging suspension bridges of Ram Jhula and Lakshman Jhula. Spend the afternoon exploring the graffiti-walled ruins of the Beatles Ashram inside Rajaji National Park." },
      { day: 3, title: "Thrilling White-Water Rafting & Waterfall Trek", details: "Set off for an exciting 16km white-water rafting run from Shivpuri to Rishikesh. Later, hike to the scenic natural pools of Neer Garh Waterfall." },
      { day: 4, title: "Departure via Haridwar", details: "Enjoy early morning yoga, check out from the resort, and transfer to Haridwar Railway Station or Dehradun Airport for departure." }
    ],
    includes: ["3 Nights in riverside eco-resort", "Daily breakfast & dinner", "Guided 16km River Rafting run with certified safety instructors", "Private AC local transfers"],
    excludes: ["Beatles Ashram entry ticket fee", "Lunch & personal shopping"],
    terms: ["River rafting is allowed for age 14+ only.", "Rafting is subject to river flow clearance by forest authorities."]
  },
  {
    id: "varanasi-spiritual",
    title: "Sacred Kashi Varanasi Spiritual Path",
    category: "indian-tours",
    startingPrice: 8499,
    duration: "3 Days / 2 Nights",
    placesCovered: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat", "Sarnath", "Ganga Morning Boat Ride"],
    description: "Immerse yourself in India's oldest living city. Partake in the grand evening Ganga Aarti at Dashashwamedh Ghat and take a silent sunrise boat ride along the historic ghats.",
    featured: false,
    folderName: "Varanasi",
    categoryType: "indian" as const,
    itinerary: [
      { day: 1, title: "Varanasi Arrival & Dashashwamedh Ganga Aarti", details: "Arrive in Varanasi, check in to your hotel. In the evening, secure a boat or ghat-side seat to watch the magnificent evening Ganga Aarti at Dashashwamedh Ghat." },
      { day: 2, title: "Sunrise Boat Ride & Sarnath Excursion", details: "Take a quiet sunrise rowing boat ride along Manikarnika and Assi Ghats. After breakfast, visit the Kashi Vishwanath Golden Temple and travel to Sarnath where Lord Buddha gave his first sermon." },
      { day: 3, title: "Kashi Temple Walk & Departure", details: "Explore the narrow alleys of Varanasi, shop for famous Banarasi silk sarees, and transfer to Lal Bahadur Shastri Airport for departure." }
    ],
    includes: ["2 Nights stay in city-center hotel", "Daily breakfast at hotel", "Morning rowing boat ride ticket", "Private AC transfers for all sightseeing"],
    excludes: ["Sarnath museum and temple entrance fees", "Lunch & dinner"],
    terms: ["Temple visits involve waiting in queues; follow strict traditional dress codes.", "Guide tips are optional."]
  },
  {
    id: "shimla-hills-tour",
    title: "Charming Shimla Summer Retreat",
    category: "indian-tours",
    startingPrice: 11999,
    duration: "4 Days / 3 Nights",
    placesCovered: ["Shimla Mall Road", "Christ Church", "Jakhoo Temple", "Kufri Adventure Park"],
    description: "The summer capital of British India welcomes you with lovely pine trails, snow views at Kufri, and gothic-style church architecture along the Ridge.",
    featured: false,
    folderName: "Shimla",
    categoryType: "indian" as const,
    itinerary: [
      { day: 1, title: "Arrival in Shimla & Ridge Walk", details: "Arrive in Shimla via scenic mountain roads. Check in to your hotel. Spend your evening strolling along the pedestrian-only Ridge and Mall Road, visiting Christ Church." },
      { day: 2, title: "Jakhoo Hill & Kufri Snow View Excursion", details: "Trek up to Jakhoo Temple (highest point in Shimla) to see the massive 108ft Lord Hanuman statue. In the afternoon, drive to Kufri for horse riding and snow activities." },
      { day: 3, title: "Viceregal Lodge & Chadwick Falls", details: "Visit the grand Viceregal Lodge (where historical partition decisions were drafted) and enjoy a light hike through pine trees to Chadwick Falls." },
      { day: 4, title: "Departure via Kalka Toy Train Route", details: "Enjoy a hearty breakfast, pack your bags, and transfer to Kalka/Chandigarh Station for your onward journey." }
    ],
    includes: ["3 Nights stay in hill-view hotel", "Daily breakfast & dinner", "Private AC transfers for sightseeing", "Guided walk of Mall Road"],
    excludes: ["Kufri adventure ride tickets and pony rentals", "Lunch & personal pocket expenses"],
    terms: ["Pony rides and adventure parks are optional.", "Snow conditions in Kufri vary based on seasonal precipitation."]
  },

  // ─── South India Tour Packages ──────────────────────────────────────────────
  {
    id: "kerala-backwaters-paradise",
    title: "Kerala Backwaters & Hill Stations",
    category: "south-india",
    startingPrice: 16499,
    duration: "6 Days / 5 Nights",
    placesCovered: ["Munnar Tea Gardens", "Thekkady Wildlife", "Alleppey Houseboat", "Kochi Fort"],
    description: "Unwind in God's Own Country. Explore the emerald green carpet of Munnar's tea estates, sail on traditional backwater houseboats, and relish delicious South Indian flavors.",
    featured: true,
    folderName: "Alleppey",
    categoryType: "south-india" as const,
    itinerary: [
      { day: 1, title: "Kochi Arrival & Transfer to Munnar", details: "Arrive at Kochi Airport. Drive through winding roads with gushing waterfalls to Munnar. Check in to your serene resort and relax surrounded by mist-covered hills." },
      { day: 2, title: "Munnar Tea Estates & Mattupetty Dam", details: "Explore Munnar! Visit Eravikulam National Park to spot the rare Nilgiri Tahr, walk through green tea plantations, visit the Tea Museum, and enjoy a boat ride at Mattupetty Dam." },
      { day: 3, title: "Munnar to Thekkady Spice Plantation", details: "Drive to Thekkady, the spice capital. Take a guided tour of organic spice gardens growing cardamom, pepper, and vanilla. Attend a traditional Kalaripayattu martial arts show." },
      { day: 4, title: "Alleppey Houseboat Overnight Experience", details: "Travel to Alleppey. Board your private luxury wooden houseboat. Gliding along beautiful canals, witness village life, and enjoy traditional Keralite meals cooked fresh onboard." },
      { day: 5, title: "Alleppey to Kochi Fort Exploration", details: "Disembark and drive back to historic Kochi. Explore the Chinese Fishing Nets, St. Francis Church, Jewish Synagogue, and the vibrant colonial streets of Fort Kochi." },
      { day: 6, title: "Departure from Kochi", details: "After breakfast, pick up some spices and banana chips for your friends, and transfer to Kochi Airport for your flight back home." }
    ],
    includes: ["2 Nights Munnar, 1 Night Thekkady in premium resorts", "1 Night luxury AC private Houseboat in Alleppey", "All meals onboard the Houseboat", "Daily breakfast at Munnar and Thekkady hotels", "Private AC Sedan car for the entire tour"],
    excludes: ["Boating charges in Mattupetty and Periyar lake", "Entry fees to spice gardens, national parks, and cultural shows", "Flight/Train ticket charges", "Tips and gratuities"],
    terms: ["Alleppey houseboat AC operates from 9:00 PM to 6:00 AM (unless full-time AC is requested and paid).", "Prices are subject to change during Diwali and Christmas peak seasons."]
  },
  {
    id: "ooty-coonoor-hills",
    title: "Charming Ooty & Coonoor Gateway",
    category: "south-india",
    startingPrice: 12500,
    duration: "4 Days / 3 Nights",
    placesCovered: ["Ooty Lake", "Botanical Garden", "Doddabetta Peak", "Coonoor Tea Estates", "Toy Train"],
    description: "The 'Queen of Hill Stations' welcomes you with cool mountain breezes, rich botanical history, and a ride on the iconic Nilgiri Mountain Toy Train.",
    featured: false,
    folderName: "ooty",
    categoryType: "south-india" as const,
    itinerary: [
      { day: 1, title: "Arrival in Coimbatore & Drive to Ooty", details: "Arrive in Coimbatore and drive up the beautiful Nilgiri hills to Ooty. Check in to your heritage hotel and spend the evening enjoying pedal boats on Ooty Lake." },
      { day: 2, title: "Ooty Local Sightseeing & Doddabetta Peak", details: "Visit the stunning Government Botanical Gardens, Rose Garden housing 20,000+ varieties of roses, and drive up to Doddabetta Peak—the highest point in South India for spectacular views." },
      { day: 3, title: "Nilgiri Toy Train & Coonoor Excursion", details: "Embark on the heritage Nilgiri Toy Train ride to Coonoor. Explore the scenic Sim's Park, take photos at Dolphin's Nose viewpoint, and walk through tea estates." },
      { day: 4, title: "Pine Forest, Pykara Lake & Departure", details: "Visit the mystical Pine Forest, Film Nest, and the spectacular Pykara Waterfalls. Head back to Coimbatore Airport/Station by late evening for departure." }
    ],
    includes: ["3 Nights stay in premium double rooms", "Daily breakfast & dinner", "All transfers in private vehicle", "Toy Train tickets (First-class booked in advance)"],
    excludes: ["Boat ride fees on Ooty & Pykara lakes", "Personal items, lunch, and camera entry fees"],
    terms: ["Toy train tickets are subject to availability on official IRCTC portals.", "100% refund if cancelled 20 days prior."]
  },
  {
    id: "mysore-palace-heritage",
    title: "Royal Mysore & Chamundi Hills",
    category: "south-india",
    startingPrice: 9999,
    duration: "3 Days / 2 Nights",
    placesCovered: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens", "Philomena Church"],
    description: "Walk the corridors of the majestic Wodeyar Kings at Mysore Palace, visit the sacred Chamundeshwari Temple, and watch the dancing musical fountains of Brindavan.",
    featured: false,
    folderName: "Mysore",
    categoryType: "south-india" as const,
    itinerary: [
      { day: 1, title: "Arrival in Bangalore & Drive to Mysore", details: "Arrive in Bangalore, get picked up, and drive to historic Mysore. Check in. In the evening, enjoy the musical fountains at Brindavan Gardens." },
      { day: 2, title: "Royal Mysore Palace & Chamundi Temple", details: "Visit the majestic Mysore Palace featuring gorgeous gold-trimmed durbar halls. Drive up Chamundi Hills to seek blessings at the 17th-century Chamundeshwari Temple." },
      { day: 3, title: "St. Philomena Church & Departure via Srirangapatna", details: "Visit the towering Gothic-style St. Philomena Church. Stop at Tipu Sultan's summer palace in Srirangapatna before transferring to Bangalore Airport/Station for departure." }
    ],
    includes: ["2 Nights stay in premium city hotels", "Daily breakfast at hotel", "Private AC vehicle transfers", "All entry tickets to Mysore Palace & Brindavan Gardens"],
    excludes: ["Lunch and dinner", "Camera permits and local guide tips"],
    terms: ["Mysore Palace lighting is only on Sundays and public holidays.", "Standard checkout rules apply."]
  },
  {
    id: "hampi-historical-ruins",
    title: "Ancient Hampi Architectural Heritage",
    category: "south-india",
    startingPrice: 10999,
    duration: "3 Days / 2 Nights",
    placesCovered: ["Virupaksha Temple", "Stone Chariot", "Lotus Mahal", "Hemakuta Hill Sunset"],
    description: "Travel back in time to the capital of the Vijayanagara Empire. Marvel at the monolith stone structures, soaring temple gopurams, and boulders across the Tungabhadra.",
    featured: false,
    folderName: "Hampi",
    categoryType: "south-india" as const,
    itinerary: [
      { day: 1, title: "Arrival in Hampi & Sunset at Hemakuta Hill", details: "Arrive in Hampi, check in to your heritage hotel. In the evening, climb the gentle slope of Hemakuta Hill to enjoy a spectacular sunset over temple ruins." },
      { day: 2, title: "Virupaksha, Stone Chariot & Lotus Mahal", details: "Explore Hampi! Visit the active Virupaksha Temple, the iconic Stone Chariot inside the Vittala Temple complex, and the beautiful Indo-Islamic Lotus Mahal palace." },
      { day: 3, title: "Coracle Ride on Tungabhadra & Departure", details: "Enjoy an exciting traditional circular boat (Coracle) ride on the Tungabhadra River. Check out and transfer to Hospet Railway Station for departure." }
    ],
    includes: ["2 Nights stay in comfortable heritage rooms", "Daily breakfast at hotel", "Guided sightseeing with certified history expert", "Private AC sedan transfers"],
    excludes: ["Coracle ride fees", "Lunch & dinner", "Monument entry tickets"],
    terms: ["Coracle rides are subject to river water level regulations.", "Wear comfortable walking shoes for the bouldery trails."]
  },
  {
    id: "wayanad-wilderness-tour",
    title: "Wayanad Wildlife & Waterfall Trek",
    category: "south-india",
    startingPrice: 11499,
    duration: "4 Days / 3 Nights",
    placesCovered: ["Soochipara Falls", "Edakkal Caves", "Banasura Sagar Dam", "Lakkidi Viewpoint"],
    description: "Immerse yourself in Wayanad's spice-scented forests. Walk through prehistoric stone carvings at Edakkal Caves and click photos by the massive Banasura Sagar earth dam.",
    featured: false,
    folderName: "Wayanad",
    categoryType: "south-india" as const,
    itinerary: [
      { day: 1, title: "Calicut Arrival & Drive to Wayanad", details: "Arrive in Calicut and drive up the scenic Ghat road with 9 hairpin bends. Check in to your forest resort and relax surrounded by cardamom plantations." },
      { day: 2, title: "Edakkal Caves & Banasura Sagar Dam", details: "Hike up to Edakkal Caves to witness neolithic stone carvings. In the afternoon, visit Banasura Sagar (India's largest earth dam) for optional speed boating." },
      { day: 3, title: "Soochipara Waterfalls & Lakkidi Viewpoint", details: "Trek to the three-tiered Soochipara Waterfalls for a refreshing bath. In the evening, view the misty valleys from Lakkidi Viewpoint." },
      { day: 4, title: "Pookode Lake & Departure", details: "Boating in the natural freshwater Pookode Lake. Check out from the resort and transfer to Calicut Airport/Station for departure." }
    ],
    includes: ["3 Nights in forest-view resort", "Daily breakfast & dinner", "Private AC transfers", "All entry tickets to Edakkal Caves and Pookode Lake"],
    excludes: ["Speed boating charges in Banasura Dam", "Lunch, snacks, personal expenses"],
    terms: ["Edakkal Caves hike involves a moderately steep climb of 300+ stone steps.", "Waterfalls might be closed during peak monsoon heavy rains."]
  },
  {
    id: "pondicherry-french-colony",
    title: "French Riviera Pondicherry Retreat",
    category: "south-india",
    startingPrice: 8999,
    duration: "3 Days / 2 Nights",
    placesCovered: ["Auroville", "Rock Beach", "French Quarter", "Promenade Beach", "Paradise Beach"],
    description: "Experience the unique Indo-French lifestyle. Cycle past mustard-colored colonial villas, enjoy wood-fired pizzas, and meditate at the golden Matrimandir in Auroville.",
    featured: false,
    folderName: "Pondicherry",
    categoryType: "south-india" as const,
    itinerary: [
      { day: 1, title: "Chennai Arrival & Drive to Pondicherry", details: "Arrive in Chennai, drive along the scenic East Coast Road (ECR) to Pondicherry. Check in. Stroll along Promenade Beach and watch the waves crash on Rock Beach." },
      { day: 2, title: "Auroville, Matrimandir & French Quarter", details: "Visit the global community of Auroville and view the iconic Matrimandir dome. In the afternoon, enjoy a heritage walk through the mustard-colored streets of the French Quarter." },
      { day: 3, title: "Paradise Beach Boat Ride & Departure", details: "Take a speed boat ride to the pristine sands of Paradise Beach. Check out in the afternoon and drive back to Chennai Airport/Railway Station for departure." }
    ],
    includes: ["2 Nights stay in boutique French-style hotel", "Daily breakfast at hotel", "Private AC transfers", "Paradise Beach speed boat ferry tickets"],
    excludes: ["Auroville inner dome booking (must be booked individually in advance)", "Lunch & dinner"],
    terms: ["Matrimandir inner chamber entry requires individual online slot booking 3 days in advance.", "Promenade beach is pedestrian-only in the evenings."]
  },
  {
    id: "rameswaram-kanyakumari",
    title: "Sacred Rameswaram & Kanyakumari Shore",
    category: "south-india",
    startingPrice: 13999,
    duration: "5 Days / 4 Nights",
    placesCovered: ["Ramanathaswamy Temple", "Dhanushkodi", "Vivekananda Rock", "Pamban Bridge"],
    description: "Cross the historic sea-bridge of Pamban to the holy island of Rameswaram. Drive to the ghost town of Dhanushkodi, and stand at India's southernmost tip in Kanyakumari.",
    featured: false,
    folderName: "Rameswaram",
    categoryType: "south-india" as const,
    itinerary: [
      { day: 1, title: "Madurai Arrival & Temple Tour", details: "Arrive in Madurai. Visit the grand Meenakshi Amman Temple featuring thousands of stone sculptures. Drive to Rameswaram, check in to your hotel." },
      { day: 2, title: "Rameswaram Holy Bath & Pamban Bridge", details: "Take a holy bath at the 22 wells inside Ramanathaswamy Temple. Visit the ghost town of Dhanushkodi, seeing ruins of a church swallowed by the sea in 1964." },
      { day: 3, title: "Rameswaram to Kanyakumari Shore Drive", details: "Drive along coastal roads to Kanyakumari—the meeting point of the Indian Ocean, Arabian Sea, and Bay of Bengal. Witness the spectacular sunset from the shore." },
      { day: 4, title: "Vivekananda Rock Memorial & Sunset View", details: "Take a ferry to the Vivekananda Rock Memorial and the tall Thiruvalluvar Statue. Visit the Kumari Amman Temple and enjoy the evening sunset." },
      { day: 5, title: "Kanyakumari Sunrise & Departure", details: "Watch the incredible ocean sunrise from the hotel balcony. Transfer to Trivandrum Airport or Kanyakumari Railway Station for departure." }
    ],
    includes: ["4 Nights comfortable stay in premium hotels", "Daily breakfast at hotels", "All sightseeing and Madurai-Rameswaram-Kanyakumari transfers in private AC vehicle", "Kanyakumari Vivekananda Rock ferry tickets"],
    excludes: ["Temple entry passes", "Lunch and dinner"],
    terms: ["Dhanushkodi visits depend entirely on high-tide sea conditions.", "Ferry operations to Vivekananda rock are weather dependent."]
  },
  {
    id: "coorg-scenic-hills",
    title: "Coorg Mist & Abbey Falls Escapade",
    category: "south-india",
    startingPrice: 12499,
    duration: "4 Days / 3 Nights",
    placesCovered: ["Abbey Falls", "Raja Seat", "Bylakuppe Golden Temple", "Dubare Elephant Camp"],
    description: "Welcome to the 'Scotland of India'. Tour organic coffee estates, feed elephants at Dubare Camp, and explore Bylakuppe, India's largest Tibetan settlement.",
    featured: false,
    folderName: "Coorg",
    categoryType: "south-india" as const,
    itinerary: [
      { day: 1, title: "Bangalore Arrival & Bylakuppe Golden Temple", details: "Arrive in Bangalore. Drive to Coorg. En route, stop by the massive Tibetan Golden Temple in Bylakuppe. Check in to your coffee estate resort." },
      { day: 2, title: "Dubare Elephant Camp & Abbey Falls", details: "Visit Dubare Elephant Camp for interactive elephant washing and feeding. In the afternoon, visit the roaring Abbey Falls tucked inside deep green foliage." },
      { day: 3, title: "Talakaveri Temple & Raja's Seat Sunset", details: "Travel to Talakaveri (origin of the Kaveri River) on Brahmagiri Hill. Spend your evening watching a beautiful sunset from the gardens of Raja's Seat." },
      { day: 4, title: "Coffee Estate Walk & Departure", details: "Take a guided walk through coffee and spice plantations. Check out from the resort and transfer to Bangalore Airport/Station for departure." }
    ],
    includes: ["3 Nights stay in premium coffee estate resort", "Daily breakfast & dinner", "Private AC transfers", "Guided coffee plantation walk"],
    excludes: ["Dubare Elephant camp activities fees", "Lunch & personal shopping"],
    terms: ["Dubare elephant activities close by 11:30 AM; morning start is necessary.", "Talakaveri temple involves walking on stairs; maintain dress decency."]
  },
  {
    id: "kodaikanal-misty-lake",
    title: "Misty Kodaikanal Lake & Pillar Rocks",
    category: "south-india",
    startingPrice: 11999,
    duration: "4 Days / 3 Nights",
    placesCovered: ["Kodai Lake", "Pillar Rocks", "Coaker's Walk", "Bryant Park"],
    description: "The 'Gift of the Forest' welcomes you with cool mountain fog, scenic lakes, and massive granite cliffs known as the Pillar Rocks.",
    featured: false,
    folderName: "Kodaikanal",
    categoryType: "south-india" as const,
    itinerary: [
      { day: 1, title: "Madurai Arrival & Drive to Kodaikanal", details: "Arrive in Madurai, drive up the scenic Ghat road to Kodaikanal. Check in to your resort and enjoy a relaxing evening pedal boat ride on Kodaikanal Lake." },
      { day: 2, title: "Coaker's Walk & Bryant Park", details: "Take a refreshing morning walk along Coaker's Walk for valley views. Explore the beautiful rose gardens and greenhouse inside Bryant Park." },
      { day: 3, title: "Pillar Rocks & Guna Caves Excursion", details: "Visit the towering 122-meter Pillar Rocks and the mystical deep crevices of Guna Caves (Devil's Kitchen). Spend the evening buying local homemade chocolates." },
      { day: 4, title: "Pine Forest & Departure via Madurai", details: "Visit the iconic Pine Forest and Chadwick Falls. Check out and transfer to Madurai Airport/Railway Station for departure." }
    ],
    includes: ["3 Nights in valley-facing resort", "Daily breakfast & dinner", "Private AC transfers for all sightseeing", "Pedal boat ride voucher on Kodai Lake"],
    excludes: ["Entry fees to Guna Caves & Bryant Park", "Lunch and personal expenses"],
    terms: ["Monsoon fog may block panoramic valley views.", "Always dress in warm layers as evening temperatures drop."]
  },
  {
    id: "yercaud-hill-station",
    title: "Yercaud Lake & Quiet Hills Gateway",
    category: "south-india",
    startingPrice: 9499,
    duration: "3 Days / 2 Nights",
    placesCovered: ["Yercaud Lake", "Pagoda Point", "Killiyur Falls", "Lady's Seat Viewpoint"],
    description: "The 'Jewel of the South' is a quiet, peaceful hill station in the Shevaroy Hills, famous for orange orchards, pear trees, and a tranquil lake.",
    featured: false,
    folderName: "Yercaud",
    categoryType: "south-india" as const,
    itinerary: [
      { day: 1, title: "Salem Arrival & Yercaud Lake", details: "Arrive in Salem and drive up 20 hairpin bends to Yercaud. Check in. In the evening, enjoy boating on the calm Yercaud Lake." },
      { day: 2, title: "Killiyur Falls & Pagoda Point Sunset", details: "Explore the 300ft Killiyur Waterfalls (accessible via stone steps). Later, drive to Pagoda Point for spectacular views of Salem city below." },
      { day: 3, title: "Lady's Seat & Departure via Salem", details: "Visit Lady's Seat, Gentleman's Seat, and the historic Shevaroy Temple. Check out and drive down to Salem Station for departure." }
    ],
    includes: ["2 Nights stay in premium double rooms", "Daily breakfast at hotel", "Private AC sedan transfers"],
    excludes: ["Boating fees", "Lunch & dinner"],
    terms: ["Killiyur falls hike involves moderately steep stone stairs.", "100% refund for cancellation 15 days prior."]
  },

  // ─── International Tour Packages ───────────────────────────────────────────
  {
    id: "singapore-futuristic-garden",
    title: "Singapore Modern Wonders Tour",
    category: "international-tours",
    startingPrice: 48999,
    duration: "6 Days / 5 Nights",
    placesCovered: ["Gardens by the Bay", "Sentosa Island", "Universal Studios", "Night Safari", "Marina Bay"],
    description: "Discover a breathtaking metropolis where cutting-edge technology matches handsomely with tropical gardens. Features a full day at Universal Studios!",
    featured: true,
    folderName: "Singapore",
    categoryType: "international" as const,
    itinerary: [
      { day: 1, title: "Arrival & Wild Night Safari", details: "Arrive in Singapore. Check in to your stylish hotel. In the evening, visit the world's first Night Safari, witnessing nocturnal animals in their natural habitats via an open-air tram." },
      { day: 2, title: "City Highlights & Gardens by the Bay", details: "Take a half-day city tour covering the Merlion Park, Chinatown, and Little India. Spend the afternoon marveling at the colossal Supertree Grove and the futuristic Cloud Forest dome." },
      { day: 3, title: "Thrills at Universal Studios Singapore", details: "Enjoy a full day of cinematic thrills at Universal Studios on Sentosa Island. Experience world-class rollercoasters, 3D rides, and meet your favorite movie characters." },
      { day: 4, title: "Sentosa Island Fun & Cable Car", details: "Embark on an afternoon Sentosa tour. Ride the scenic Singapore Cable Car, visit Madame Tussauds, and watch the spectacular Wings of Time multi-sensory water and light show." },
      { day: 5, title: "Shopping Extravaganza at Orchard Road & Marina Bay", details: "Spend a relaxing day exploring Orchard Road mall arcades or taking snapshots on the SkyPark observation deck at Marina Bay Sands. Relax at Clarke Quay in the evening." },
      { day: 6, title: "Departure via Changi Jewel", details: "Check out from the hotel. Spend your final hours viewing the world's tallest indoor waterfall (Rain Vortex) inside Jewel Changi Airport before taking your flight home." }
    ],
    includes: ["5 Nights accommodation in 3-star hotel (Twin sharing)", "Daily international buffet breakfast", "All entry tickets (Gardens by the Bay, Night Safari, Sentosa, Universal Studios)", "Airport transfers & tourist attraction shuttle transport", "English-speaking local guide support"],
    excludes: ["International flights and Singapore Tourist Visa", "TCS & GST (mandatory govt taxes)", "Lunch & Dinner", "Personal shopping and items not in inclusions"],
    terms: ["Passport must have a minimum validity of 6 months from the travel date.", "Visa fees are non-refundable once processed.", "Surcharges may apply during peak holidays or convention seasons."]
  },
  {
    id: "bali-tropical-paradise",
    title: "Bali Tropical Beaches & Ubud Tour",
    category: "international-tours",
    startingPrice: 42999,
    duration: "6 Days / 5 Nights",
    placesCovered: ["Ubud Sacred Monkey Forest", "Nusa Penida Island", "Kuta Beach", "Tanah Lot Temple"],
    description: "Relax in the Island of the Gods. Meditate in spiritual temples, take photos on the dramatic cliffs of Nusa Penida, and enjoy romantic seafood dinners in Jimbaran.",
    featured: true,
    folderName: "Bali",
    categoryType: "international" as const,
    itinerary: [
      { day: 1, title: "Denpasar Arrival & Kuta Check-in", details: "Arrive in Bali, transfer to your boutique resort in Kuta. Spend your evening relaxing on Kuta Beach watching the famous sunset." },
      { day: 2, title: "Ubud Monkey Forest & Tegenungan Waterfall", details: "Explore Ubud! Visit the Sacred Monkey Forest Sanctuary, walk through the green Tegalalang Rice Terraces, and swim under Tegenungan Waterfall." },
      { day: 3, title: "Nusa Penida Island Speedboat Day Tour", details: "Take a speedboat to Nusa Penida. Visit the famous T-Rex shaped cliff at Kelingking Beach, Broken Beach, and snorkel in Crystal Bay." },
      { day: 4, title: "Kintamani Volcano & Holy Water Temple", details: "Drive to Kintamani to view the active volcano Mount Batur. Stop by Tirta Empul Temple to participate in a traditional Hindu purification ritual." },
      { day: 5, title: "Tanah Lot Sea Temple Sunset & Jimbaran dinner", details: "Visit the iconic Tanah Lot Temple perched on a sea rock. Enjoy a fresh candlelight grilled seafood dinner on Jimbaran Beach." },
      { day: 6, title: "Bali Departure", details: "Enjoy your morning massage, pick up some Balinese coffee, and transfer to Ngurah Rai Airport for your departure flight." }
    ],
    includes: ["5 Nights in boutique beach resorts", "Daily breakfast at resorts", "Nusa Penida speedboat transfers and private tour guide", "Traditional Balinese couples massage voucher"],
    excludes: ["International flights and Indonesia visa-on-arrival (VOA) fee", "Lunch & dinner"],
    terms: ["VOA costs approximately USD 35 payable upon landing.", "Nusa Penida tour involves rocky walking paths; maintain proper grip footwear."]
  },
  {
    id: "dubai-modern-skylines",
    title: "Dubai Burj Khalifa & Desert Safari Special",
    category: "international-tours",
    startingPrice: 49999,
    duration: "5 Days / 4 Nights",
    placesCovered: ["Burj Khalifa 124th Floor", "Desert Safari & BBQ", "Palm Jumeirah Yacht", "Dubai Mall Fountains"],
    description: "Experience the glittering oasis. Stand on the highest observation deck of Burj Khalifa, dune-bash in the golden desert, and explore massive shopping malls.",
    featured: true,
    folderName: "Dubai",
    categoryType: "international" as const,
    itinerary: [
      { day: 1, title: "Dubai Arrival & Dhow Cruise dinner", details: "Land in Dubai, transfer to your hotel. In the evening, enjoy a romantic 2-hour Marina Dhow Cruise dinner with Tanoura dance shows." },
      { day: 2, title: "City Tour & Burj Khalifa 124th Floor", details: "Take a city tour of Jumeirah Mosque and Palm Jumeirah. In the afternoon, ascend the high-speed elevator to the 124th floor of Burj Khalifa." },
      { day: 3, title: "Thrilling Desert Safari & Belly Dance BBQ", details: "Set off in a 4x4 Land Cruiser for dune bashing across the red desert dunes. Later, arrive at a desert camp for camel rides, henna painting, belly dance, and BBQ." },
      { day: 4, title: "Future Museum & Dubai Mall Shopping", details: "Visit the stunning ring-shaped Museum of the Future. Spend the afternoon shopping at Dubai Mall, watching the spectacular dancing water fountains." },
      { day: 5, title: "Departure from Dubai", details: "Enjoy tax-free shopping at gold souks, and transfer to Dubai International Airport (DXB) for departure." }
    ],
    includes: ["4 Nights in premium 4-star hotel", "Daily international buffet breakfast", "Burj Khalifa 124th floor ticket, Desert Safari tour, Dhow Cruise dinner", "Airport transfers"],
    excludes: ["International flights and UAE Tourist Visa", "Tourism Dirham tax (mandatory fee paid directly to hotel)"],
    terms: ["Passport must be valid for at least 6 months.", "Desert safari is not recommended for pregnant women or guests with back issues."]
  },
  {
    id: "malaysia-exotic-tour",
    title: "Malaysia Petronas & Langkawi Explorer",
    category: "international-tours",
    startingPrice: 38999,
    duration: "5 Days / 4 Nights",
    placesCovered: ["Petronas Towers", "Batu Caves", "Langkawi Cable Car", "Bentinck Beach"],
    description: "Marvel at the architectural heights of Kuala Lumpur's Petronas Towers, hike up the colored steps of Batu Caves, and relax on Langkawi's duty-free beaches.",
    featured: false,
    folderName: "Malaysia",
    categoryType: "international" as const,
    itinerary: [
      { day: 1, title: "Kuala Lumpur Arrival & City Tour", details: "Arrive in Kuala Lumpur. Transfer to hotel. In the afternoon, take a city tour covering the Petronas Twin Towers, King's Palace, and Independence Square." },
      { day: 2, title: "Batu Caves & Genting Highlands Excursion", details: "Climb the 272 colorful stairs of Batu Caves to visit the holy shrine inside. Continue up to Genting Highlands via the Awana Skyway cable car." },
      { day: 3, title: "Fly to Island Paradise of Langkawi", details: "Fly to Langkawi. Check in to your beachside resort. Spend your evening viewing duty-free shops and taking sunset beach strolls." },
      { day: 4, title: "Langkawi Cable Car & SkyBridge", details: "Ride the Langkawi SkyCab to the top of Mount Mat Cincang and walk across the dramatic suspended curved SkyBridge." },
      { day: 5, title: "Langkawi Departure", details: "Check out from the resort and transfer to Langkawi Airport for your return flight home." }
    ],
    includes: ["2 Nights Kuala Lumpur, 2 Nights Langkawi hotels", "Daily breakfast at hotels", "All land sightseeing transfers", "Awana Skyway and SkyBridge tickets"],
    excludes: ["International flights and Malaysia e-visa", "Domestic flight KL to Langkawi"],
    terms: ["SkyBridge visits depend entirely on wind and cloud weather conditions.", "Duty-free alcohol purchases are subject to customs limits."]
  },
  {
    id: "maldives-luxury-escape",
    title: "Maldives Luxury Overwater Villa Dream",
    category: "international-tours",
    startingPrice: 65999,
    duration: "4 Days / 3 Nights",
    placesCovered: ["Male Atolls", "Pristine Water Villas", "Coral Snorkeling Reef"],
    description: "The ultimate tropical luxury. Wake up to direct steps into the warm ocean from your private overwater villa, and snorkel with colorful coral fish.",
    featured: false,
    folderName: "Maldives",
    categoryType: "international" as const,
    itinerary: [
      { day: 1, title: "Male Arrival & Speedboat Transfer to Resort", details: "Land at Velana International Airport. Board your private speedboat directly to your premium island resort. Check in to your overwater villa." },
      { day: 2, title: "Snorkeling & Coral Reef Excursion", details: "Embark on a guided snorkeling safari to view green sea turtles, stingrays, and vibrant coral fish reefs." },
      { day: 3, title: "Water Sports & Romantic Beach Dinner", details: "Enjoy optional water sports (kayaking, windsurfing). In the evening, relish a private candle-lit sunset seafood BBQ dinner on the beach." },
      { day: 4, title: "Maldives Departure", details: "Enjoy your morning plunge pool swim, check out, and take a speedboat transfer back to Male Airport for departure." }
    ],
    includes: ["3 Nights in Luxury Overwater Villa", "All Inclusive Meals (Breakfast, Lunch, Dinner & Drinks)", "Roundtrip speedboat transfers Male Airport-Resort-Male Airport", "Complimentary snorkeling gear rental"],
    excludes: ["International flights", "Personal expenses and premium diving activities"],
    terms: ["Green Tax of USD 6 per person per night is included.", "Speedboat transfer operates strictly during daylight hours."]
  },
  {
    id: "paris-europe-dream",
    title: "Paris Romantic Eiffel Tower & Disneyland",
    category: "international-tours",
    startingPrice: 79999,
    duration: "5 Days / 4 Nights",
    placesCovered: ["Eiffel Tower 2nd Floor", "Louvre Museum", "Disneyland Paris", "Seine River Cruise"],
    description: "Explore the global center of art, fashion, and gastonomy. Cruising down the Seine, standing under the Eiffel Tower, and spending a magical day at Disneyland.",
    featured: false,
    folderName: "Paris",
    categoryType: "international" as const,
    itinerary: [
      { day: 1, title: "Paris Arrival & Seine River Cruise", details: "Arrive in Paris, transfer to your hotel. In the evening, enjoy a relaxing Seine River Cruise watching the city's historic bridges light up." },
      { day: 2, title: "Eiffel Tower & Louvre Museum Heritage", details: "Visit the 2nd floor of the iconic Eiffel Tower for scenic city views. Continue to the Louvre Museum to view the Mona Lisa and Venus de Milo." },
      { day: 3, title: "Magical Day at Disneyland Paris", details: "Spend a full magical day inside Disneyland Paris (1-Park ticket). Ride rollercoasters, watch the Disney parade, and enjoy fireworks over the castle." },
      { day: 4, title: "Versailles Palace Royal Tour", details: "Take an excursion to the grand Palace of Versailles, exploring the royal Hall of Mirrors and manicured gardens." },
      { day: 5, title: "Paris Departure", details: "Enjoy tax-free shopping at Galeries Lafayette, and transfer to Charles de Gaulle Airport for your flight home." }
    ],
    includes: ["4 Nights stay in comfortable city hotels", "Daily continental breakfast", "Seine River Cruise, Eiffel Tower, Louvre, and Disneyland entry passes"],
    excludes: ["International flights and Schengen Visa", "Lunch & dinner", "Paris local tourist tax"],
    terms: ["Eiffel Tower slots depend strictly on availability at booking.", "Disneyland tickets are date-specific and non-refundable."]
  },
  {
    id: "switzerland-scenic-alps",
    title: "Scenic Switzerland Alps & Zurich Tour",
    category: "international-tours",
    startingPrice: 89999,
    duration: "6 Days / 5 Nights",
    placesCovered: ["Interlaken", "Zurich Lakes", "Mount Titlis Rotair", "Lucerne Lion Monument"],
    description: "Marvel at the snow-capped Swiss Alps. Ride the world's first revolving cable car up Mount Titlis and walk across the historic Kapellbrücke in Lucerne.",
    featured: false,
    folderName: "Switzerland",
    categoryType: "international" as const,
    itinerary: [
      { day: 1, title: "Zurich Arrival & Lucerne Transfer", details: "Arrive at Zurich Airport. Board the Swiss Rail directly to Lucerne. Check in and visit the Chapel Bridge (Kapellbrücke) and Lion Monument." },
      { day: 2, title: "Mount Titlis Revolving Cable Car", details: "Travel to Engelberg. Ride the Titlis Rotair revolving cable car up to 10,000 feet. Walk through the Ice Cave and try the high Cliff Walk suspension bridge." },
      { day: 3, title: "Transfer to Alpine Interlaken", details: "Take a scenic train to Interlaken, nestled between Lake Thun and Lake Brienz. Spend the evening exploring Swiss watch galleries on Höheweg." },
      { day: 4, title: "Jungfraujoch - Top of Europe Excursion", details: "Board the mountain cogwheel train to Jungfraujoch (11,332 feet)—the highest railway station in Europe, and step onto the snow Sphinx Terrace." },
      { day: 5, title: "Zurich City Sightseeing", details: "Travel back to Zurich. Take a walking tour of the Altstadt (Old Town) and enjoy chocolates at Lindt Home of Chocolate." },
      { day: 6, title: "Departure from Zurich", details: "Check out and proceed to Zurich Airport for your departure flight home." }
    ],
    includes: ["5 Nights in Swiss hotels", "Daily breakfast at hotels", "8-Day Consecutive 2nd Class Swiss Travel Pass", "Mount Titlis cable car tickets"],
    excludes: ["International flights and Schengen Visa", "Jungfraujoch Swiss pass top-up fee (approximately CHF 120)", "Lunch & dinner"],
    terms: ["Swiss Travel Pass allows unlimited free travel on Swiss trains, buses, and boats.", "Mount Titlis and Jungfraujoch visits depend on high-altitude wind clearance."]
  },
  {
    id: "thailand-tropical-escape",
    title: "Thailand Bangkok, Phuket & Pattaya Gateway",
    category: "international-tours",
    startingPrice: 32999,
    duration: "6 Days / 5 Nights",
    placesCovered: ["Bangkok Temple of Dawn", "Phuket Beaches", "Pattaya Coral Island", "Wat Phra Kaew"],
    description: "Savor vibrant street life and tropical beaches. Ride speedboats to Pattaya's Coral Island, relax on Phuket's sandy bays, and visit golden Buddhist temples in Bangkok.",
    featured: false,
    folderName: "Thailand",
    categoryType: "international" as const,
    itinerary: [
      { day: 1, title: "Bangkok Arrival & Transfer to Pattaya", details: "Arrive at Bangkok Airport, transfer directly to Pattaya. Check in. Visit the Sanctuary of Truth and relax in the evening." },
      { day: 2, title: "Pattaya Coral Island Speedboat Day Tour", details: "Take a speedboat to Coral Island (Koh Larn). Enjoy water sports (parasailing, undersea walk) and a delicious fresh seafood lunch." },
      { day: 3, title: "Phuket Flight & Patong Beach Nightlife", details: "Fly to Phuket. Check in to Patong Beach resort. Stroll down Bangla Road to experience Phuket's lively evening nightlife." },
      { day: 4, title: "Phi Phi Islands Big Boat Cruise", details: "Cruise to the world-famous Phi Phi Islands. Swim in Maya Bay (where 'The Beach' was filmed) and snorkel in Loh Samah Bay." },
      { day: 5, title: "Bangkok Temple of Dawn & Reclining Buddha", details: "Fly back to Bangkok. Take a temple tour covering Wat Arun (Temple of Dawn) and Wat Pho (Temple of the Reclining Buddha)." },
      { day: 6, title: "Bangkok Departure", details: "Spend your morning shopping for Thai silk and local goods, then transfer to Suvarnabhumi Airport for departure." }
    ],
    includes: ["5 Nights accommodation (Kuta, Patong, Bangkok hotels)", "Daily buffet breakfast", "Phi Phi Islands tour, Coral Island speedboat tour", "Airport transfers"],
    excludes: ["International flights and Thailand Visa-on-Arrival fee", "Domestic flights (BKK-HKT-BKK)"],
    terms: ["VOA is free or THB 2,000 based on active government notifications.", "Maya Bay is closed for reef restoration for a brief duration annually."]
  },
  {
    id: "turkey-cappadocia-wonder",
    title: "Turkey Istanbul & Cappadocia Balloons",
    category: "international-tours",
    startingPrice: 54999,
    duration: "6 Days / 5 Nights",
    placesCovered: ["Blue Mosque Istanbul", "Cappadocia Hot Air Balloon", "Hagia Sophia", "Grand Bazaar"],
    description: "Explore where East meets West. Walk through the giant dome of Hagia Sophia, explore fairy chimneys in Cappadocia, and bargain for lamps in the historic Grand Bazaar.",
    featured: false,
    folderName: "Turkey",
    categoryType: "international" as const,
    itinerary: [
      { day: 1, title: "Istanbul Arrival & Bosphorus Dinner Cruise", details: "Land in Istanbul, transfer to hotel. In the evening, enjoy a luxury Bosphorus Dinner Cruise watching Europe and Asia shorelines light up." },
      { day: 2, title: "Hagia Sophia, Blue Mosque & Grand Bazaar", details: "Tour the breathtaking Hagia Sophia mosque, the beautiful tiles of the Blue Mosque, and bargain for souvenirs in the massive Grand Bazaar." },
      { day: 3, title: "Fly to Cappadocia & Fairy Chimneys", details: "Fly to Cappadocia. Check in to your unique Cave Hotel. Explore Devrent Valley's natural animal-shaped rock structures." },
      { day: 4, title: "Cappadocia Hot Air Balloon & Goreme", details: "Wake up at 5:00 AM for a legendary Hot Air Balloon flight over Cappadocia's valleys. Visit Goreme Open Air Museum in the afternoon." },
      { day: 5, title: "Kaymakli Underground City & Istanbul Return", details: "Explore the deep tunnels of Kaymakli Underground City. Fly back to Istanbul in the evening." },
      { day: 6, title: "Istanbul Departure", details: "Enjoy Turkish tea by the Galata Tower, check out, and transfer to Istanbul International Airport (IST) for departure." }
    ],
    includes: ["5 Nights in Cave & Boutique Hotels", "Daily breakfast at hotels", "Bosphorus Cruise Dinner, local tours and entry passes", "Airport transfers"],
    excludes: ["International flights and Turkey Tourist Visa", "Hot Air Balloon ticket fee (approximately EUR 150-250 paid locally)"],
    terms: ["Hot air balloon flights are entirely weather dependent and can cancel last minute.", "Wear modest clothing covering shoulders and knees for active mosques."]
  },
  {
    id: "vietnam-scenic-heritage",
    title: "Vietnam Golden Bridge & Halong Bay",
    category: "international-tours",
    startingPrice: 39999,
    duration: "6 Days / 5 Nights",
    placesCovered: ["Golden Bridge Da Nang", "Halong Bay Cruise", "Hanoi Old Quarter", "Ba Na Hills Cable Car"],
    description: "Marvel at the colossal stone hands of Da Nang's Golden Bridge, cruise through thousands of limestone islets in Halong Bay, and explore Hanoi's busy Old Quarter.",
    featured: true,
    folderName: "Vietnam",
    categoryType: "international" as const,
    itinerary: [
      { day: 1, title: "Hanoi Arrival & Cyclo Tour", details: "Arrive in Hanoi, check in. Spend your afternoon on a traditional Cyclo (rickshaw) ride through the 36 streets of the historic Old Quarter." },
      { day: 2, title: "Halong Bay Overnight Luxury Cruise", details: "Drive to Halong Bay. Board a premium wooden cruise ship. Sail through emerald waters, explore Sung Sot Cave, and kayak under limestone arches." },
      { day: 3, title: "Tai Chi on Deck & Fly to Da Nang", details: "Enjoy sunrise Tai Chi on the cruise deck. Disembark and transfer to Hanoi Airport for your flight to the coastal city of Da Nang." },
      { day: 4, title: "Ba Na Hills Cable Car & Golden Bridge", details: "Ride the record-breaking Ba Na Hills Cable Car. Stand on the world-famous Golden Bridge held up by two colossal stone hands." },
      { day: 5, title: "Hoi An Ancient Lantern Town", details: "Excursion to the charming UNESCO heritage town of Hoi An. Walk past yellow merchant houses, and float paper lanterns down the Thu Bon River." },
      { day: 6, title: "Da Nang Departure", details: "Enjoy early morning coconut coffee on the beach, check out, and transfer to Da Nang Airport for departure." }
    ],
    includes: ["4 Nights in premium hotels, 1 Night Luxury Halong Bay Cruise", "Daily breakfast, Halong Bay full board meals", "Cable car tickets and local entry passes", "Airport transfers"],
    excludes: ["International flights and Vietnam e-visa fee", "Lunch & dinner in Da Nang/Hanoi"],
    terms: ["Passport must be valid for at least 6 months.", "E-visa processing takes 3-5 working days online."]
  },
  {
    id: "sri-lanka-paradise",
    title: "Sri Lanka Sigiriya & Ella Hills Scenic",
    category: "international-tours",
    startingPrice: 29999,
    duration: "5 Days / 4 Nights",
    placesCovered: ["Sigiriya Rock Fortress", "Temple of the Tooth Kandy", "Ella Nine Arch Bridge", "Nuwara Eliya Tea Gardens"],
    description: "Climb the massive lion-shaped fortress of Sigiriya, tour historic tea gardens in Nuwara Eliya, and watch trains cross the legendary Nine Arch Bridge in Ella.",
    featured: false,
    folderName: "Sri Lanka",
    categoryType: "international" as const,
    itinerary: [
      { day: 1, title: "Colombo Arrival & Transfer to Dambulla", details: "Land at Colombo Airport. Drive to Dambulla. Check in and visit the ancient Cave Temple complex housing historic Buddhist murals." },
      { day: 2, title: "Climb Sigiriya Rock Fortress & Kandy Tooth Temple", details: "Hike up the UNESCO Sigiriya Lion Rock Fortress for panoramic forest views. Drive to the hill capital Kandy and visit the sacred Temple of the Tooth Relic." },
      { day: 3, title: "Scenic Nuwara Eliya Tea Gardens", details: "Drive through rolling green tea hills to Nuwara Eliya (Little England). Tour a working tea factory, drink fresh Ceylon tea, and boat on Gregory Lake." },
      { day: 4, title: "Ella Scenic Nine Arch Bridge", details: "Travel to Ella. Walk along the historic railway tracks to the massive Nine Arch Bridge, watching the colonial train cross." },
      { day: 5, title: "Colombo City Drive & Departure", details: "Drive back to Colombo for a brief shopping tour, then transfer to Bandaranaike Airport for departure." }
    ],
    includes: ["4 Nights stay in comfortable resorts", "Daily breakfast & dinner", "Private AC car for transfers", "All Sigiriya and Kandy entry passes"],
    excludes: ["International flights and Sri Lanka ETA (visa) fee", "Lunch and personal tips"],
    terms: ["Sigiriya climb involves 1,200 metal steps; maintain physical caution.", "Temple of the tooth requires covering shoulders and knees."]
  },

  // ─── College & School Tour Packages ───────────────────────────────────────
  {
    id: "goa-college-adventure",
    title: "Goa College Fun & Adventure Tour",
    category: "college-school-tours",
    startingPrice: 9999,
    duration: "5 Days / 4 Nights",
    placesCovered: ["Calangute Beach", "Dudhsagar Waterfalls", "Baga Beach Cafes", "Old Goa Churches", "Cruise"],
    description: "The ultimate college getaway! Relish sunset cruise parties, high-energy beach sports, water sports packages, campfire music, and delicious local food.",
    featured: true,
    folderName: "Goa",
    categoryType: "groups" as const,
    itinerary: [
      { day: 1, title: "Arrive in Goa & Evening Cruise Party", details: "Arrive in Goa via train/bus. Check in to your youth resort. In the evening, head out for a 1-hour sunset cruise party on the Mandovi River with DJs and dance shows." },
      { day: 2, title: "North Goa Beach Hopping & Water Sports", details: "Spend a full day visiting Calangute, Baga, and Anjuna beaches. Participate in action-packed water sports (parasailing, jet-skiing, banana ride) at subsidized group rates." },
      { day: 3, title: "Dudhsagar Waterfall Trek & Campfire Night", details: "Travel to Dudhsagar Waterfalls. Take an exciting open-jeep safari through jungle streams, swim under the mighty waterfall, and gather for a private group campfire in the evening." },
      { day: 4, title: "South Goa Culture & Old Goa", details: "Visit historic sites like Basilica of Bom Jesus, Se Cathedral, Mangueshi Temple, and Miramar Beach. Watch the beautiful sunset at Dona Paula jetty." },
      { day: 5, title: "Beach Souvenir Shopping & Departure", details: "Explore Panaji market for local spices, garments, and cashew nuts. Depart back to college with strong bonds and massive memories." }
    ],
    includes: ["4 Nights accommodation in 3-star group resort (Quad/Triple sharing)", "Daily breakfast & dinner (Buffet setup)", "Mandovi River Cruise entry tickets", "Full group transport in private semi-sleeper coach", "Subsidized group water sports package voucher"],
    excludes: ["Personal drinks, snacks, and shopping", "Individual ride charges not included in the standard water sports package"],
    terms: ["Exclusively designed for bonafide college students with valid college ID cards.", "1 college staff/faculty stays free for every 20 paying students.", "Strict safety guidelines are followed under professional tour guide guidance."]
  },
  {
    id: "bangalore-school-science",
    title: "Bangalore Science & Wonders Trip",
    category: "college-school-tours",
    startingPrice: 6999,
    duration: "3 Days / 2 Nights",
    placesCovered: ["Visvesvaraya Museum", "HAL Aerospace Museum", "Bannerghatta Zoo", "Wonderla Theme Park"],
    description: "An exceptional, highly informative educational tour for school students. Features interactive science experiments, aerospace design showcases, and safe theme park fun.",
    featured: true,
    folderName: "Munnar", // Wait, using Munnar school/tea garden photos as beautiful local safe scenery fallback
    categoryType: "south-india" as const,
    itinerary: [
      { day: 1, title: "Science & Space Exploration", details: "Arrive in Bangalore. Visit the Visvesvaraya Industrial & Technological Museum (VITM) for interactive experiments, and watch a 3D show at Jawaharlal Nehru Planetarium." },
      { day: 2, title: "Aviation History & Bannerghatta Jungle Safari", details: "Visit the HAL Aerospace Museum to view historical engines and jet fighters. In the afternoon, head to Bannerghatta National Park for a thrilling bus safari to spot lions and tigers." },
      { day: 3, title: "Wonderla Theme Park & Safe Return", details: "Spend a full, highly supervised day at Wonderla Amusement Park enjoying safe water slides and thrill rides. Depart in the evening with smiling faces." }
    ],
    includes: ["2 Nights stay in secure kid-friendly resort (Quad sharing)", "All meals: Breakfast, Lunch, and Dinner (Nutritious buffet)", "All entry tickets (Museums, Safari, Wonderla)", "Dedicated medical first-aid support on board", "Professional student group tour facilitators"],
    excludes: ["Any video camera permits inside attractions", "Personal pocket money for souvenirs"],
    terms: ["For schools only; minimum group size of 40 students.", "Full consent letters signed by parents are mandatory before departure.", "Teacher-student ratio is kept at 1:12 for absolute supervision and safety."]
  }
];

// Dynamically resolve and bind all local asset images to the package list
export const tourPackages: TourPackage[] = packageBlueprints.map((p) => {
  const resolvedMedia = resolvePackageImages(p.folderName, p.categoryType);
  return {
    ...p,
    image: resolvedMedia.image,
    images: resolvedMedia.images,
    bannerImage: resolvedMedia.bannerImage,
  };
});
