export interface Destination {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  featured: boolean;
  highlights: string[];
}

export const destinations: Destination[] = [
  {
    id: "manali",
    name: "Manali",
    tagline: "The Valley of the Gods",
    description: "Nestled in the snow-capped slopes of the Pir Panjal and the Dhauladhar ranges, Manali is one of the most popular hill stations in India with breathtaking vistas.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    highlights: ["Solang Valley Adventure", "Rohtang Pass Snow", "Hadimba Temple", "Old Manali Cafes"]
  },
  {
    id: "delhi",
    name: "Delhi",
    tagline: "A Symphony of Heritage & Modernity",
    description: "India's capital city is a mesmerizing mix of rich history, architectural marvels, vibrant local bazaars, mouth-watering street food, and modern avenues.",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    highlights: ["Red Fort & Qutub Minar", "India Gate Walkway", "Chandni Chowk Food", "Lotus Temple"]
  },
  {
    id: "singapore",
    name: "Singapore",
    tagline: "The Futuristic Garden City",
    description: "A global hub that blends lush natural reserves with state-of-the-art futuristic structures. Enjoy spectacular light shows, shopping, and family-friendly theme parks.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    highlights: ["Gardens by the Bay", "Sentosa Island & Universal", "Marina Bay Sands", "Night Safari Adventure"]
  }
];
