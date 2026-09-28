import { useEffect } from 'react';

/**
 * Mounts one schema.org JSON-LD block in <head> for as long as the route that
 * owns it is on screen. `id` keeps two routes' blocks from colliding.
 */
export function useJsonLd(id, data) {
  const json = JSON.stringify(data);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.id = id;
    tag.textContent = json;
    document.head.appendChild(tag);
    return () => tag.remove();
  }, [id, json]);
}

export default useJsonLd;
