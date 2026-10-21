export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: 'entertainment' | 'news' | 'music' | 'celebrity' | 'sports' | 'tech';
  excerpt: string;
  content: string[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  imageUrl: string;
  imageAlt: string;
  readTime: string;
  tags: string[];
  isBreaking?: boolean;
  isFeatured?: boolean;
  views: number;
}

export const INITIAL_ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "global-music-awards-2026-african-giants-dominate-nominations",
    title: "Global Music Awards 2026: African Giants Dominate Record-Breaking Nominations",
    category: "music",
    excerpt: "Afrobeats and Amapiano continue their meteoric surge across global charts as African superstars earn record nominations across major international categories.",
    content: [
      "The global music landscape witnessed an unprecedented milestone today as the 2026 Global Music Awards announced their official nominations. African artists secured prime nods across Album of the Year, Record of the Year, and Best Global Collaboration.",
      "Leading the charge with seven nominations is Burna Boy, closely followed by Tems and Tyler ICU, marking the highest representation for African rhythm creators in the history of the ceremony.",
      "Industry analysts attribute this historic recognition to explosive streaming growth and stadium tour sellouts across London, Tokyo, New York, and Paris over the past twelve months.",
      "The 68th annual gala ceremony is scheduled to broadcast live worldwide this November, featuring groundbreaking collaborative performances designed to bridge continents."
    ],
    author: {
      name: "Amina Kwezi",
      role: "Senior Entertainment Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    publishedAt: "2026-10-20T09:30:00+03:00",
    updatedAt: "2026-10-20T10:05:00+03:00",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Vibrant live music stage concert with spectacular red and white laser lighting and cheering crowd",
    readTime: "4 min read",
    tags: ["Music", "Awards", "Afrobeats", "Burna Boy", "Global Hits"],
    isBreaking: true,
    isFeatured: true,
    views: 48290
  },
  {
    id: "art-2",
    slug: "hollywood-blockbuster-sets-new-box-office-milestone",
    title: "Hollywood Epic 'Chronicles of Fire' Smashes Global Opening Weekend Records",
    category: "entertainment",
    excerpt: "Director Christopher Sterling's cinematic sci-fi masterpiece has rewritten box office history with a staggering $240 million opening weekend.",
    content: [
      "Cinema attendance surged to its highest level since 2019 as 'Chronicles of Fire' debuted across 4,500 premium IMAX theaters worldwide.",
      "Featuring breathtaking practical stunts and a tour-de-force performance by lead actress Maya Vance, critics have praised the 3-hour saga as 'the definitive science-fiction film of the decade'.",
      "Audience exit polls showed an astonishing 97% positive score on CinemaScore, with sold-out late-night screenings reported from Los Angeles to Nairobi.",
      "Studios have already greenlit the sequel, with production slated to commence in early 2027 in Iceland and New Zealand."
    ],
    author: {
      name: "Marcus Kane",
      role: "Film & Culture Critic",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    publishedAt: "2026-10-20T08:15:00+03:00",
    updatedAt: "2026-10-20T09:40:00+03:00",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Cinema auditorium theater with red seats and a glowing silver screen",
    readTime: "3 min read",
    tags: ["Movies", "Hollywood", "Box Office", "Sci-Fi", "Entertainment"],
    isBreaking: false,
    isFeatured: true,
    views: 31200
  },
  {
    id: "art-3",
    slug: "exclusive-behind-the-scenes-of-the-viral-stadium-tour",
    title: "Exclusive: Inside the Technology Powering 2026's Biggest 360-Degree Stadium Tours",
    category: "entertainment",
    excerpt: "From holographic projection domes to custom kinetic drone stages, see how music icons are reimagining the stadium experience.",
    content: [
      "Staging a modern arena concert has evolved from basic stage lighting into a multi-sensory tech spectacle.",
      "Simba Yamoto obtained exclusive backstage access to the 'Infinity Horizon' tour, where 400 synchronized drones form dynamic constellations above 80,000 screaming fans.",
      "Lead stage designer Elena Rossi revealed that the audio system uses real-time spatial beamforming, ensuring crystal-clear acoustic fidelity no matter where fans sit in the stadium.",
      "The tour continues its global circuit through 28 countries over the next six months."
    ],
    author: {
      name: "Devon Chen",
      role: "Tech & Entertainment Reporter",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    publishedAt: "2026-10-20T07:45:00+03:00",
    updatedAt: "2026-10-20T08:30:00+03:00",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "DJ and producer performing at an epic stadium concert with dazzling light beams",
    readTime: "5 min read",
    tags: ["Concerts", "Stage Tech", "Exclusive", "Live Events"],
    isBreaking: false,
    isFeatured: false,
    views: 22400
  },
  {
    id: "art-4",
    slug: "tech-giants-unveil-next-gen-ai-entertainment-studio",
    title: "Global Tech Summit 2026: Next-Gen AI Video Tools Shift Power to Independent Creators",
    category: "tech",
    excerpt: "New real-time cinematic renderers enable indie storytellers to generate photorealistic visual effects from home computers.",
    content: [
      "The lines between multi-million dollar Hollywood studio production and bedroom filmmaking just blurred significantly.",
      "During the Silicon Valley Creative Tech Keynote, software innovators showcased real-time neural rendering pipelines capable of generating 8K visual effects at 60 frames per second.",
      "Independent creators can now execute complex physics simulations, digital sets, and lifelike lighting environments using standard desktop workstations.",
      "Industry union representatives have praised emerging watermarking and provenance standards that safeguard human artistic credit."
    ],
    author: {
      name: "Devon Chen",
      role: "Tech & Entertainment Reporter",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
    },
    publishedAt: "2026-10-19T22:00:00+03:00",
    updatedAt: "2026-10-20T06:10:00+03:00",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Futuristic digital glowing circuit board with creative light reflections",
    readTime: "4 min read",
    tags: ["AI", "Filmmaking", "Innovation", "Tech News"],
    isBreaking: false,
    isFeatured: false,
    views: 19800
  },
  {
    id: "art-5",
    slug: "champions-league-showdown-thrilling-stoppage-time-drama",
    title: "Champions League Showdown: 95th-Minute Stunner Sends Red Lions to Quarterfinals",
    category: "sports",
    excerpt: "A breathless European night in Madrid concluded with a sensational bicycle kick goal in the final seconds of extra stoppage time.",
    content: [
      "Football fans were treated to one of the most exhilarating finishes in continental tournament history.",
      "Trailing 2-1 on aggregate with 45 seconds remaining, 19-year-old winger Tariq Hassan met a curving cross with acrobatic perfection into the top right corner.",
      "The victory sparked pandemonium across the stadium, securing an unforgettable comeback after playing 60 minutes with ten men.",
      "Post-match reactions exploded across social media with over 15 million viral clip views in under an hour."
    ],
    author: {
      name: "Samson Omondi",
      role: "Chief Sports Correspondent",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80"
    },
    publishedAt: "2026-10-19T20:10:00+03:00",
    updatedAt: "2026-10-19T21:40:00+03:00",
    imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Excited football soccer stadium under bright stadium floodlights at night",
    readTime: "3 min read",
    tags: ["Football", "Champions League", "Sports", "Breaking Sports"],
    isBreaking: true,
    isFeatured: false,
    views: 38400
  },
  {
    id: "art-6",
    slug: "streaming-wars-how-creator-owned-platforms-are-rewriting-tv",
    title: "The Great Television Shift: Why A-List Stars Are Launching Direct-to-Consumer Channels",
    category: "celebrity",
    excerpt: "Frustrated by licensing cuts and opaque algorithms, major actors and comedians are building their own subscription ecosystems.",
    content: [
      "The traditional streaming bundle is fracturing again as top celebrities bypass intermediaries to communicate directly with superfans.",
      "Several top-tier comedy stars and drama creators have launched independent digital channels that offer uncensored specials, community forums, and live interactives.",
      "Early financial disclosures reveal that direct subscription models deliver up to five times greater revenue per subscriber compared to legacy syndication deals.",
      "Experts believe this transition represents the most democratic restructuring of entertainment distribution in decades."
    ],
    author: {
      name: "Amina Kwezi",
      role: "Senior Entertainment Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    },
    publishedAt: "2026-10-19T18:00:00+03:00",
    updatedAt: "2026-10-20T05:00:00+03:00",
    imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Modern stylish television screen streaming cinematic videos in a cozy contemporary living room",
    readTime: "4 min read",
    tags: ["Celebrity", "Streaming", "Hollywood", "Digital Media"],
    isBreaking: false,
    isFeatured: false,
    views: 16500
  }
];
