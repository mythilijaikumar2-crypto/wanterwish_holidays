export interface TourCategory {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  gradient: string;
  tagline: string;
}

export const tourCategories: TourCategory[] = [
  {
    id: "south-india",
    name: "South India Tour Packages",
    shortName: "South India",
    description: "Explore serene backwaters, ancient towering temples, lush tea gardens, and misty hill stations.",
    icon: "FaCompass",
    gradient: "from-teal-500 to-emerald-600",
    tagline: "Serene & Spiritual Journey"
  },
  {
    id: "indian-tours",
    name: "Indian Tour Packages",
    shortName: "Indian Tours",
    description: "From snow-capped peaks of Manali to the royal heritage of Rajasthan and historical monuments of Delhi.",
    icon: "FaMapMarkedAlt",
    gradient: "from-blue-600 to-indigo-700",
    tagline: "Incredible India Awaits"
  },
  {
    id: "international-tours",
    name: "International Tour Packages",
    shortName: "International",
    description: "Fly to dream destinations like Singapore, Bali, Dubai, Thailand, and explore global wonders.",
    icon: "FaGlobe",
    gradient: "from-orange-500 to-red-600",
    tagline: "Go Beyond Boundaries"
  },
  {
    id: "college-school-tours",
    name: "College / School Tour Packages",
    shortName: "College / School Tours",
    description: "Safe, interactive, and highly energetic educational group trips combined with industrial visits and fun adventure.",
    icon: "FaGraduationCap",
    gradient: "from-purple-600 to-orange-600",
    tagline: "Safe, Fun & Learn Trips"
  }
];
