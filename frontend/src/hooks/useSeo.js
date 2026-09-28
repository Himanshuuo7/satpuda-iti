import { useEffect } from 'react';

/**
 * Per-route document metadata.
 *
 * Kept as a small hook rather than pulling in a helmet library — the site has
 * one title, one description and the Open Graph basics per route, and this
 * writes them directly.
 */
function setMeta(selector, attr, value) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    const [, name] = selector.match(/\[(?:name|property)="([^"]+)"\]/) ?? [];
    if (!name) return;
    tag.setAttribute(selector.includes('property=') ? 'property' : 'name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute(attr, value);
}

export function useSeo({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = title;
      setMeta('meta[property="og:title"]', 'content', title);
      setMeta('meta[name="twitter:title"]', 'content', title);
    }
    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
      setMeta('meta[name="twitter:description"]', 'content', description);
    }
    setMeta('meta[property="og:url"]', 'content', window.location.href);

    // Canonical is the route's own path, without query or hash.
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${window.location.origin}${window.location.pathname}`);
  }, [title, description]);
}

export default useSeo;
