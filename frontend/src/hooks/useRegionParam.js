import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { itiRegions } from '../data/itiInstitutes';

/**
 * Region filter state held in the URL (`?region=balaghat`), so a filtered view
 * can be shared and both the network grid and the regional directory stay in
 * step. Updates replace the history entry and never reload or scroll.
 */
export function useRegionParam() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('region') ?? 'all';
  const region = itiRegions.some((r) => r.id === raw) ? raw : 'all';

  const setRegion = useCallback(
    (next) => {
      setParams(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (next === 'all') p.delete('region');
          else p.set('region', next);
          return p;
        },
        { replace: true, preventScrollReset: true }
      );
    },
    [setParams]
  );

  return [region, setRegion];
}

export default useRegionParam;
