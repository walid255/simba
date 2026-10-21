export interface AdSlotConfig {
  id: string;
  placement: 'leaderboard' | 'sidebar' | 'inarticle' | 'sticky-footer';
  title: string;
  sponsor: string;
  imageUrl: string;
  targetUrl: string;
  enabled: boolean;
  impressions: number;
  clicks: number;
  badgeText?: string;
  description?: string;
}

export const INITIAL_ADS: AdSlotConfig[] = [
  {
    id: "ad-leaderboard-top",
    placement: "leaderboard",
    title: "Stream Without Limits - 50% Off Simba Premium",
    sponsor: "PulsePlay Global",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=728&h=90&q=80",
    targetUrl: "https://simbayamoto.pages.dev/?utm_source=ad_banner&utm_medium=cpc&utm_campaign=simba_premium_launch",
    enabled: true,
    impressions: 142850,
    clicks: 4320,
    badgeText: "Sponsored Partner",
    description: "Get 4K HDR live concerts, festival backstage passes, and ad-free news on any screen."
  },
  {
    id: "ad-sidebar-promo",
    placement: "sidebar",
    title: "Upgrade Your Audio Gear: Studio Beats Pro Wireless",
    sponsor: "SoundWave Audio",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=400&q=80",
    targetUrl: "https://simbayamoto.pages.dev/?utm_source=sidebar_ad&utm_medium=display&utm_campaign=audiophile_gear_2026",
    enabled: true,
    impressions: 98400,
    clicks: 2150,
    badgeText: "Featured Sponsor",
    description: "Experience music the way artists intended with active noise cancellation and 40-hour battery life."
  },
  {
    id: "ad-inarticle-native",
    placement: "inarticle",
    title: "Create Cinematic Videos in Seconds with AI Studio",
    sponsor: "NovaVFX Studios",
    imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&h=300&q=80",
    targetUrl: "https://simbayamoto.pages.dev/?utm_source=in_article&utm_medium=native&utm_campaign=novavfx_indie",
    enabled: true,
    impressions: 67300,
    clicks: 1890,
    badgeText: "Sponsored Content",
    description: "Award-winning creative suite used by top directors and indie filmmakers worldwide. Try 14 days free."
  },
  {
    id: "ad-sticky-bottom",
    placement: "sticky-footer",
    title: "Download the Official Simba Yamoto App for Instant Breaking Alerts",
    sponsor: "Simba Yamoto Official",
    imageUrl: "/favicon.svg",
    targetUrl: "https://simbayamoto.pages.dev/?utm_source=sticky_banner&utm_medium=pwa&utm_campaign=app_install",
    enabled: true,
    impressions: 210400,
    clicks: 8740,
    badgeText: "Official App",
    description: "Install our Progressive Web App for offline reading and real-time push updates."
  }
];
