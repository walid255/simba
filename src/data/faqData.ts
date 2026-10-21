export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'pwa' | 'editorial' | 'advertising';
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is Simba Yamoto?",
    answer: "Simba Yamoto is a premier digital entertainment and breaking news platform built as a lightning-fast Single Page Application (SPA) and Progressive Web Application (PWA). We specialize in cutting-edge African and global pop culture, music awards, celebrity news, viral trends, sports spectacles, and technology.",
    category: "general"
  },
  {
    id: "faq-2",
    question: "How do I install Simba Yamoto as an App on my phone or desktop?",
    answer: "Because Simba Yamoto is an installable PWA, you can install it without an app store! On mobile, tap the 'Install App' button in the top navigation or select 'Add to Home Screen' from your browser menu. On desktop Chrome or Edge, click the install icon in the URL address bar.",
    category: "pwa"
  },
  {
    id: "faq-3",
    question: "Can I read news and articles while offline?",
    answer: "Yes! Our Service Worker caches visited articles, stylesheets, and core media assets in background storage. When you lose internet connectivity or switch to airplane mode, you can still seamlessly browse cached stories without seeing broken screens.",
    category: "pwa"
  },
  {
    id: "faq-4",
    question: "How do advertising and sponsored partner placements work?",
    answer: "We offer high-visibility leaderboard banners (728x90), sidebar rectangles, responsive in-article native story placements, and sticky mobile sponsor banners. All campaigns include real-time impression and click tracking with UTM parameter attribution. Contact our commercial team or manage campaigns via the Admin Control Panel.",
    category: "advertising"
  },
  {
    id: "faq-5",
    question: "How does Simba Yamoto manage cookies and user privacy?",
    answer: "We adhere strictly to modern privacy and GDPR standards. Our simple cookie banner allows readers to accept essential operational cookies, or customize analytical and advertising preferences. No personally identifiable tracking occurs without consent.",
    category: "general"
  },
  {
    id: "faq-6",
    question: "How can I pitch a breaking story, exclusive interview, or press release?",
    answer: "Our editorial desk reviews pitches 24/7. Use our floating Contact button or email editorial@simbayamoto.pages.dev. Include verified sources, media assets, and embargo dates where applicable.",
    category: "editorial"
  },
  {
    id: "faq-7",
    question: "How do you ensure strict SEO standards and single H1 page hierarchy?",
    answer: "Every view in Simba Yamoto enforces semantic HTML5 with exactly one H1 headline per page, followed by properly structured H2 section headers and H3 card titles. Dynamic canonical links, OpenGraph metadata, and Schema.org NewsArticle JSON-LD are generated for every post.",
    category: "editorial"
  }
];
