export interface UTMData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  timestamp: string;
}

const STORAGE_KEY = 'simba_utm_tracker';

export function captureUTMParameters(): UTMData | null {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('utm_source');
  const medium = urlParams.get('utm_medium');
  const campaign = urlParams.get('utm_campaign');
  const term = urlParams.get('utm_term');
  const content = urlParams.get('utm_content');

  if (source || medium || campaign) {
    const data: UTMData = {
      source: source || undefined,
      medium: medium || undefined,
      campaign: campaign || undefined,
      term: term || undefined,
      content: content || undefined,
      timestamp: new Date().toISOString()
    };
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Also log recent UTM events in localStorage for admin reporting
      const history = JSON.parse(localStorage.getItem('simba_utm_history') || '[]');
      history.unshift({ ...data, url: window.location.pathname });
      if (history.length > 50) history.pop();
      localStorage.setItem('simba_utm_history', JSON.stringify(history));
    } catch {
      // storage unavailable or blocked
    }
    return data;
  }

  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    return existing ? JSON.parse(existing) : null;
  } catch {
    return null;
  }
}

export function buildUTMLink(
  baseUrl: string,
  source: string,
  medium: string,
  campaign: string,
  term?: string,
  content?: string
): string {
  try {
    const url = new URL(baseUrl.startsWith('http') ? baseUrl : `https://simbayamoto.pages.dev${baseUrl}`);
    if (source) url.searchParams.set('utm_source', source);
    if (medium) url.searchParams.set('utm_medium', medium);
    if (campaign) url.searchParams.set('utm_campaign', campaign);
    if (term) url.searchParams.set('utm_term', term);
    if (content) url.searchParams.set('utm_content', content);
    return url.toString();
  } catch {
    return baseUrl;
  }
}
