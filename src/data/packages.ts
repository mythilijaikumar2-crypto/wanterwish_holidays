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
  bannerImage: string;
  description: string;
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  terms: string[];
  featured: boolean;
}

export const tourPackages: TourPackage[] = [
  {
    id: "manali-escapade",
    title: "Scenic Manali Escape Tour",
    category: "indian-tours",
    startingPrice: 14999,
    duration: "5 Days / 4 Nights",
    placesCovered: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Jogini Waterfall", "Mall Road"],
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80",
    description: "Immerse yourself in the gorgeous snow-drenched mountains of Manali. Wander through apple orchards, hike to majestic waterfalls, and engage in thrilling snow activities.",
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Manali & Local Sightseeing",
        details: "Arrive in Manali, check in to your premium hotel. Relax, then proceed to visit the iconic Hadimba Devi Temple, Vashisht Hot Springs, and take a peaceful evening walk on the famous Mall Road."
      },
      {
        day: 2,
        title: "Adventure at Solang Valley",
        details: "Drive to Solang Valley, a heaven for adventure sports. Enjoy optional activities like paragliding, zorbing, and cable car rides amidst stunning Himalayan backdrops."
      },
      {
        day: 3,
        title: "Excursion to Snowy Rohtang Pass",
        details: "Embark on an early morning excursion to Rohtang Pass (subject to permit). Witness breathtaking panoramic views of snow-covered peaks and enjoy playing in the pristine snow."
      },
      {
        day: 4,
        title: "Jogini Waterfall Trek & Old Manali Cafes",
        details: "Go on a beautiful light trek to the holy Jogini Waterfalls starting from Vashisht. Spend the evening exploring the hippie culture and outstanding cafes in Old Manali."
      },
      {
        day: 5,
        title: "Departure with Beautiful Memories",
        details: "Enjoy a hearty breakfast, pack your bags, and check out from the hotel. Head to the bus stand/airport for your onward journey, filled with spectacular memories."
      }
    ],
    includes: [
      "4 Nights accommodation in 3-star hotel",
      "Daily breakfast & dinner (MAP plan)",
      "All sightseeing transfers in private AC vehicle",
      "Toll taxes, fuel charges, and driver allowances",
      "Guided short trek to Jogini Waterfalls"
    ],
    excludes: [
      "Rohtang Pass permit and local cab charges",
      "Adventure sports activities fees",
      "Lunch, snacks, and any personal expenses",
      "Travel insurance"
    ],
    terms: [
      "50% advance payment required to confirm the booking.",
      "Cancellations made 15 days before the trip are eligible for a 100% refund.",
      "Rohtang Pass visits depend entirely on government permits and weather conditions."
    ]
  },
  {
    id: "delhi-royal-heritage",
    title: "Golden Triangle Delhi Heritage",
    category: "indian-tours",
    startingPrice: 11999,
    duration: "4 Days / 3 Nights",
    placesCovered: ["Qutub Minar", "India Gate", "Red Fort", "Lotus Temple", "Chandni Chowk"],
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1667822935277-295b9241f879?auto=format&fit=crop&w=1600&q=80",
    description: "Explore the historic monuments, busy bazaars, and beautiful government plazas of India's capital city. Perfect for families, historians, and foodie couples.",
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Welcome to Delhi & Evening India Gate Walk",
        details: "Arrive in Delhi. Get picked up by our driver and check in. In the evening, visit India Gate, drive past the majestic Rashtrapati Bhavan, and enjoy the fountain light show."
      },
      {
        day: 2,
        title: "Historic Old Delhi Extravaganza",
        details: "Step back in time as you visit the historical Red Fort and Jama Masjid. Enjoy a rickshaw ride through the bustling alleys of Chandni Chowk and savor famous local delicacies."
      },
      {
        day: 3,
        title: "Architectural Marvels of New Delhi",
        details: "Explore the soaring tower of Qutub Minar, the beautiful gardens of Humayun's Tomb, and the serene flower-shaped Lotus Temple. End the evening with luxury shopping at Connaught Place."
      },
      {
        day: 4,
        title: "Akshardham Temple & Departure",
        details: "Visit the massive Swaminarayan Akshardham Temple complex to experience India's rich spiritual art. Proceed to Delhi Airport/Railway Station in the afternoon for departure."
      }
    ],
    includes: [
      "3 Nights stay in premium city hotels",
      "Breakfast at the hotel",
      "Full private AC cab for sightseeing and transfers",
      "Local tour coordinator support",
      "Rickshaw ride fee in Chandni Chowk"
    ],
    excludes: [
      "Monument entry fees & camera permits",
      "Lunch & Dinner",
      "Flight/Train ticket charges",
      "Any guide tips"
    ],
    terms: [
      "Enquiry quotes are valid for 7 days only.",
      "Standard check-in time is 12:00 PM and check-out is 11:00 AM.",
      "Akshardham Temple remains closed on Mondays."
    ]
  },
  {
    id: "singapore-futuristic-garden",
    title: "Singapore Modern Wonders Tour",
    category: "international-tours",
    startingPrice: 48999,
    duration: "6 Days / 5 Nights",
    placesCovered: ["Gardens by the Bay", "Sentosa Island", "Universal Studios", "Night Safari", "Marina Bay"],
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80",
    description: "Discover a breathtaking metropolis where cutting-edge technology matches handsomely with tropical gardens. Features a full day at Universal Studios!",
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Arrival & Wild Night Safari",
        details: "Arrive in Singapore. Check in to your stylish hotel. In the evening, visit the world's first Night Safari, witnessing nocturnal animals in their natural habitats via an open-air tram."
      },
      {
        day: 2,
        title: "City Highlights & Gardens by the Bay",
        details: "Take a half-day city tour covering the Merlion Park, Chinatown, and Little India. Spend the afternoon marveling at the colossal Supertree Grove and the futuristic Cloud Forest dome."
      },
      {
        day: 3,
        title: "Thrills at Universal Studios Singapore",
        details: "Enjoy a full day of cinematic thrills at Universal Studios on Sentosa Island. Experience world-class rollercoasters, 3D rides, and meet your favorite movie characters."
      },
      {
        day: 4,
        title: "Sentosa Island Fun & Cable Car",
        details: "Embark on an afternoon Sentosa tour. Ride the scenic Singapore Cable Car, visit Madame Tussauds, and watch the spectacular Wings of Time multi-sensory water and light show."
      },
      {
        day: 5,
        title: "Shopping Extravaganza at Orchard Road & Marina Bay",
        details: "Spend a relaxing day exploring Orchard Road mall arcades or taking snapshots on the SkyPark observation deck at Marina Bay Sands. Relax at Clarke Quay in the evening."
      },
      {
        day: 6,
        title: "Departure via Changi Jewel",
        details: "Check out from the hotel. Spend your final hours viewing the world's tallest indoor waterfall (Rain Vortex) inside Jewel Changi Airport before taking your flight home."
      }
    ],
    includes: [
      "5 Nights accommodation in 3-star hotel (Twin sharing)",
      "Daily international buffet breakfast",
      "All entry tickets (Gardens by the Bay, Night Safari, Sentosa, Universal Studios)",
      "Airport transfers & tourist attraction shuttle transport",
      "English-speaking local guide support"
    ],
    excludes: [
      "International flights and Singapore Tourist Visa",
      "TCS & GST (mandatory govt taxes)",
      "Lunch & Dinner",
      "Personal shopping and items not in inclusions"
    ],
    terms: [
      "Passport must have a minimum validity of 6 months from the travel date.",
      "Visa fees are non-refundable once processed.",
      "Surcharges may apply during peak holidays or convention seasons."
    ]
  },
  {
    id: "kerala-backwaters-paradise",
    title: "Kerala Backwaters & Hill Stations",
    category: "south-india",
    startingPrice: 16499,
    duration: "6 Days / 5 Nights",
    placesCovered: ["Munnar Tea Gardens", "Thekkady Wildlife", "Alleppey Houseboat", "Kochi Fort"],
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80",
    description: "Unwind in God's Own Country. Explore the emerald green carpet of Munnar's tea estates, sail on traditional backwater houseboats, and relish delicious South Indian flavors.",
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Kochi Arrival & Transfer to Munnar",
        details: "Arrive at Kochi Airport. Drive through winding roads with gushing waterfalls to Munnar. Check in to your serene resort and relax surrounded by mist-covered hills."
      },
      {
        day: 2,
        title: "Munnar Tea Estates & Mattupetty Dam",
        details: "Explore Munnar! Visit Eravikulam National Park to spot the rare Nilgiri Tahr, walk through green tea plantations, visit the Tea Museum, and enjoy a boat ride at Mattupetty Dam."
      },
      {
        day: 3,
        title: "Munnar to Thekkady Spice Plantation",
        details: "Drive to Thekkady, the spice capital. Take a guided tour of organic spice gardens growing cardamom, pepper, and vanilla. Attend a traditional Kalaripayattu martial arts show."
      },
      {
        day: 4,
        title: "Alleppey Houseboat Overnight Experience",
        details: "Travel to Alleppey. Board your private luxury wooden houseboat. Gliding along beautiful canals, witness village life, and enjoy traditional Keralite meals cooked fresh onboard."
      },
      {
        day: 5,
        title: "Alleppey to Kochi Fort Exploration",
        details: "Disembark and drive back to historic Kochi. Explore the Chinese Fishing Nets, St. Francis Church, Jewish Synagogue, and the vibrant colonial streets of Fort Kochi."
      },
      {
        day: 6,
        title: "Departure from Kochi",
        details: "After breakfast, pick up some spices and banana chips for your friends, and transfer to Kochi Airport for your flight back home."
      }
    ],
    includes: [
      "2 Nights Munnar, 1 Night Thekkady in premium resorts",
      "1 Night luxury AC private Houseboat in Alleppey",
      "All meals onboard the Houseboat",
      "Daily breakfast at Munnar and Thekkady hotels",
      "Private AC Sedan car for the entire tour"
    ],
    excludes: [
      "Boating charges in Mattupetty and Periyar lake",
      "Entry fees to spice gardens, national parks, and cultural shows",
      "Flight/Train ticket charges",
      "Tips and gratuities"
    ],
    terms: [
      "Alleppey houseboat AC operates from 9:00 PM to 6:00 AM (unless full-time AC is requested and paid).",
      "Prices are subject to change during Diwali and Christmas peak seasons."
    ]
  },
  {
    id: "ooty-coonoor-hills",
    title: "Charming Ooty & Coonoor Gateway",
    category: "south-india",
    startingPrice: 12500,
    duration: "4 Days / 3 Nights",
    placesCovered: ["Ooty Lake", "Botanical Garden", "Doddabetta Peak", "Coonoor Tea Estates", "Toy Train"],
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80",
    description: "The 'Queen of Hill Stations' welcomes you with cool mountain breezes, rich botanical history, and a ride on the iconic Nilgiri Mountain Toy Train.",
    featured: false,
    itinerary: [
      {
        day: 1,
        title: "Arrival in Coimbatore & Drive to Ooty",
        details: "Arrive in Coimbatore and drive up the beautiful Nilgiri hills to Ooty. Check in to your heritage hotel and spend the evening enjoying pedal boats on Ooty Lake."
      },
      {
        day: 2,
        title: "Ooty Local Sightseeing & Doddabetta Peak",
        details: "Visit the stunning Government Botanical Gardens, Rose Garden housing 20,000+ varieties of roses, and drive up to Doddabetta Peak—the highest point in South India for spectacular views."
      },
      {
        day: 3,
        title: "Nilgiri Toy Train & Coonoor Excursion",
        details: "Embark on the heritage Nilgiri Toy Train ride to Coonoor. Explore the scenic Sim's Park, take photos at Dolphin's Nose viewpoint, and walk through tea estates."
      },
      {
        day: 4,
        title: "Pine Forest, Pykara Lake & Departure",
        details: "Visit the mystical Pine Forest, Film Nest, and the spectacular Pykara Waterfalls. Head back to Coimbatore Airport/Station by late evening for departure."
      }
    ],
    includes: [
      "3 Nights stay in premium double rooms",
      "Daily breakfast & dinner",
      "All transfers in private vehicle",
      "Toy Train tickets (First-class booked in advance)"
    ],
    excludes: [
      "Boat ride fees on Ooty & Pykara lakes",
      "Personal items, lunch, and camera entry fees"
    ],
    terms: [
      "Toy train tickets are subject to availability on official IRCTC portals.",
      "100% refund if cancelled 20 days prior."
    ]
  },
  {
    id: "goa-college-adventure",
    title: "Goa College Fun & Adventure Tour",
    category: "college-school-tours",
    startingPrice: 9999,
    duration: "5 Days / 4 Nights",
    placesCovered: ["Calangute Beach", "Dudhsagar Waterfalls", "Baga Beach Cafes", "Old Goa Churches", "Cruise"],
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=1600&q=80",
    description: "The ultimate college getaway! Relish sunset cruise parties, high-energy beach sports, water sports packages, campfire music, and delicious local food.",
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Arrive in Goa & Evening Cruise Party",
        details: "Arrive in Goa via train/bus. Check in to your youth resort. In the evening, head out for a 1-hour sunset cruise party on the Mandovi River with DJs and dance shows."
      },
      {
        day: 2,
        title: "North Goa Beach Hopping & Water Sports",
        details: "Spend a full day visiting Calangute, Baga, and Anjuna beaches. Participate in action-packed water sports (parasailing, jet-skiing, banana ride) at subsidized group rates."
      },
      {
        day: 3,
        title: "Dudhsagar Waterfall Trek & Campfire Night",
        details: "Travel to Dudhsagar Waterfalls. Take an exciting open-jeep safari through jungle streams, swim under the mighty waterfall, and gather for a private group campfire in the evening."
      },
      {
        day: 4,
        title: "South Goa Culture & Old Goa",
        details: "Visit historic sites like Basilica of Bom Jesus, Se Cathedral, Mangueshi Temple, and Miramar Beach. Watch the beautiful sunset at Dona Paula jetty."
      },
      {
        day: 5,
        title: "Beach Souvenir Shopping & Departure",
        details: "Explore Panaji market for local spices, garments, and cashew nuts. Depart back to college with strong bonds and massive memories."
      }
    ],
    includes: [
      "4 Nights accommodation in 3-star group resort (Quad/Triple sharing)",
      "Daily breakfast & dinner (Buffet setup)",
      "Mandovi River Cruise entry tickets",
      "Full group transport in private semi-sleeper coach",
      "Subsidized group water sports package voucher"
    ],
    excludes: [
      "Personal drinks, snacks, and shopping",
      "Individual ride charges not included in the standard water sports package"
    ],
    terms: [
      "Exclusively designed for bonafide college students with valid college ID cards.",
      "1 college staff/faculty stays free for every 20 paying students.",
      "Strict safety guidelines are followed under professional tour guide guidance."
    ]
  },
  {
    id: "bangalore-school-science",
    title: "Bangalore Science & Wonders Trip",
    category: "college-school-tours",
    startingPrice: 6999,
    duration: "3 Days / 2 Nights",
    placesCovered: ["Visvesvaraya Museum", "HAL Aerospace Museum", "Bannerghatta Zoo", "Wonderla Theme Park"],
    image: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=800&q=80",
    bannerImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1600&q=80",
    description: "An exceptional, highly informative educational tour for school students. Features interactive science experiments, aerospace design showcases, and safe theme park fun.",
    featured: true,
    itinerary: [
      {
        day: 1,
        title: "Science & Space Exploration",
        details: "Arrive in Bangalore. Visit the Visvesvaraya Industrial & Technological Museum (VITM) for interactive experiments, and watch a 3D show at Jawaharlal Nehru Planetarium."
      },
      {
        day: 2,
        title: "Aviation History & Bannerghatta Jungle Safari",
        details: "Visit the HAL Aerospace Museum to view historical engines and jet fighters. In the afternoon, head to Bannerghatta National Park for a thrilling bus safari to spot lions and tigers."
      },
      {
        day: 3,
        title: "Wonderla Theme Park & Safe Return",
        details: "Spend a full, highly supervised day at Wonderla Amusement Park enjoying safe water slides and thrill rides. Depart in the evening with smiling faces."
      }
    ],
    includes: [
      "2 Nights stay in secure kid-friendly resort (Quad sharing)",
      "All meals: Breakfast, Lunch, and Dinner (Nutritious buffet)",
      "All entry tickets (Museums, Safari, Wonderla)",
      "Dedicated medical first-aid support on board",
      "Professional student group tour facilitators"
    ],
    excludes: [
      "Any video camera permits inside attractions",
      "Personal pocket money for souvenirs"
    ],
    terms: [
      "For schools only; minimum group size of 40 students.",
      "Full consent letters signed by parents are mandatory before departure.",
      "Teacher-student ratio is kept at 1:12 for absolute supervision and safety."
    ]
  }
];
