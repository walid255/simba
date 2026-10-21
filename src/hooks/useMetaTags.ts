import { useEffect } from 'react';
import { buildCanonicalUrl } from '../utils/seo';

interface MetaOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  imageUrl?: string;
  type?: 'website' | 'article';
  schema?: object | null;
}

export function useMetaTags({
  title,
  description,
  canonicalPath = '/',
  imageUrl = 'https://simbayamoto.pages.dev/logo.svg',
  type = 'website',
  schema = null
}: MetaOptions) {
  useEffect(() => {
    // 1. Update document title
    document.title = title;

    // 2. Helper to set or create meta tag
    const setMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="title"]', 'name', 'title', title);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type);
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);

    const canonicalUrl = buildCanonicalUrl(canonicalPath);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);

    // 3. Update canonical tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 4. Update dynamic Schema.org JSON-LD
    const schemaId = 'dynamic-page-schema';
    let schemaScript = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = schemaId;
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema, null, 2);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Clean up dynamic page schema if needed
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [title, description, canonicalPath, imageUrl, type, schema]);
}
