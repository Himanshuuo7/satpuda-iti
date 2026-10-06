import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import RegionalFilter from '../about/RegionalFilter';
import { campuses, campusDistricts } from '../../data/satpudaData';
import {
  headOffice,
  itiInstitutes,
  mapsDirectionsFor,
  mapsEmbedFor,
  mapsHrefFor,
} from '../../data/itiInstitutes';
import { tradeById } from '../../data/trades';
import { telHref } from '../../utils/format';
import { scrollToTarget } from '../../utils/smoothScroll';
import useReveal from '../../hooks/useReveal';
import useSpotlight from '../../hooks/useSpotlight';
import cn from '../../utils/cn';

/**
 * Campus network.
 *
 * A selectable register rather than fifteen identical cards: the list on the
 * left is scannable at a glance and can be narrowed by district, and choosing
 * an entry resolves its full published record — address, trades, phone,
 * email, and where available the year of establishment and DGET reference —
 * in the detail panel.
 *
 * The panel's map is a live Google Maps embed pinned on the selected campus.
 * The whole map is one link: clicking it opens that place in Google Maps.
 */

const recordById = Object.fromEntries(itiInstitutes.map((i) => [i.id, i]));

/**
 * Each contact record joined to its verified institute record for what the
 * contact page does not carry: trades, the remaining years and references,
 * and the Google Maps links.
 */
const network = campuses.map((c) => {
  const r = recordById[c.id];
  return {
    ...c,
    region: c.district.toLowerCase(),
    established: c.established ?? r.established,
    ref: c.ref ?? r.dgetRef,
    affiliated: Boolean(r.affiliation),
    trades: r.trades.map((t) => tradeById[t.id]?.name).filter(Boolean),
    mapsHref: mapsHrefFor(r),
    directionsHref: mapsDirectionsFor(r),
    embedSrc: mapsEmbedFor(r),
    isHQ: c.id === headOffice.id,
  };
});

const canCopy = typeof navigator !== 'undefined' && Boolean(navigator.clipboard?.writeText);
const matches = (query) => window.matchMedia(query).matches;
const pad = (n) => String(n).padStart(2, '0');

const ACTION =
  'group flex min-h-[3.75rem] items-center gap-3.5 rounded-edge border border-white/12 bg-white/[0.03] px-4 py-3 ' +
  'transition-[border-color,background-color,transform] duration-300 ease-out ' +
  'hover:-translate-y-0.5 hover:border-tech/50 hover:bg-white/[0.06] active:translate-y-px';
const ACTION_ICON =
  'grid h-9 w-9 shrink-0 place-items-center rounded-sharp bg-white/5 text-tech ' +
  'transition-colors duration-300 group-hover:bg-tech group-hover:text-navy-900';
const CHIP =
  'group inline-flex min-h-[2.5rem] items-center gap-2 rounded-full border border-white/15 px-4 ' +
  'text-[0.8125rem] font-medium text-navy-100 transition-[border-color,color,transform] duration-200 ' +
  'hover:border-tech hover:text-white active:scale-[0.97]';
const DATA_LABEL = 'font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-navy-100/50';

export function Campuses() {
  const ref = useReveal();
  const trackSpotlight = useSpotlight();
  const [region, setRegion] = useState('all');
  const [activeId, setActiveId] = useState(network[0].id);
  const [copiedId, setCopiedId] = useState(null);
  const listRef = useRef(null);
  const panelRef = useRef(null);
  const rows = useRef(new Map());

  const visible = region === 'all' ? network : network.filter((c) => c.region === region);
  const index = Math.max(0, visible.findIndex((c) => c.id === activeId));
  const active = visible[index];
  const copied = copiedId === active.id;

  const chooseRegion = (id) => {
    setRegion(id);
    const next = id === 'all' ? network : network.filter((c) => c.region === id);
    if (!next.some((c) => c.id === activeId)) setActiveId(next[0].id);
  };

  const pick = (id) => {
    setActiveId(id);
    // Below lg the panel sits under the register — bring it up so the tap
    // visibly lands instead of changing something off-screen.
    if (!matches('(min-width: 1024px)') && panelRef.current) {
      scrollToTarget(panelRef.current);
    }
  };

  const step = (dir) => setActiveId(visible[(index + dir + visible.length) % visible.length].id);

  // Roving focus: arrows, Home and End move through the register.
  const onListKey = (e) => {
    const from = visible.findIndex((c) => c.id === e.target.dataset.id);
    if (from < 0) return;
    const n = visible.length;
    const to = { ArrowDown: from + 1, ArrowUp: from - 1, Home: 0, End: n - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    const next = visible[(to + n) % n];
    setActiveId(next.id);
    rows.current.get(next.id)?.focus();
  };

  // Keep the selected row inside the register's own scroll area when the
  // panel's stepper moves past it — without ever scrolling the page.
  useEffect(() => {
    const list = listRef.current;
    const row = rows.current.get(activeId);
    if (!list || !row || list.scrollHeight <= list.clientHeight) return;
    const top = row.offsetTop - 6;
    const bottom = row.offsetTop + row.offsetHeight + 6;
    const behavior = matches('(prefers-reduced-motion: reduce)') ? 'auto' : 'smooth';
    if (top < list.scrollTop) list.scrollTo({ top, behavior });
    else if (bottom > list.scrollTop + list.clientHeight) {
      list.scrollTo({ top: bottom - list.clientHeight, behavior });
    }
  }, [activeId]);

  useEffect(() => {
    if (!copiedId) return undefined;
    const t = setTimeout(() => setCopiedId(null), 1800);
    return () => clearTimeout(t);
  }, [copiedId]);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(active.phone);
      setCopiedId(active.id);
    } catch {
      // Clipboard refused (permissions or an insecure context) — the tel: link still works.
    }
  };

  return (
    <section
      id="campuses"
      ref={ref}
      aria-labelledby="campuses-title"
      className="relative bg-canvas py-20 sm:py-26 lg:py-30"
    >
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="campuses-title"
            eyebrow="Campus network"
            title={
              <>
                {campuses.length} campuses across
                <br />
                <span className="text-ink-muted">{campusDistricts.length} districts.</span>
              </>
            }
            lede="From the head office at Manjhapur, Balaghat, the network reaches west to Itarsi and north to Rewa and Mauganj. Pick a campus to see its trades, contacts and the way there."
            className="max-w-xl"
          />
          <Button to="/about#network" variant="outline" className="reveal self-start lg:self-auto">
            All campuses
            <ArrowRight
              aria-hidden="true"
              strokeWidth={2}
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          </Button>
        </div>

        <RegionalFilter
          value={region}
          onChange={chooseRegion}
          label="Filter campuses by district"
          className="reveal mt-12"
        />

        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Register. From lg it fills the row the panel sets, so filtering
              never changes the section's height. */}
          <div className="reveal relative lg:col-span-4">
            <div className="lg:absolute lg:inset-0 lg:flex lg:flex-col">
              {/* Full height on phones — a nested scroll area traps touch
                  scrolling. Only constrained once it sits beside the panel. */}
              <ul
                key={region}
                ref={listRef}
                aria-label="Campuses"
                onKeyDown={onListKey}
                className="relative rounded-panel border border-navy-100 bg-canvas-soft p-1.5 lg:min-h-0 lg:flex-1 lg:overflow-y-auto"
              >
                {visible.map((campus, i) => {
                  const selected = campus.id === active.id;
                  return (
                    <li key={campus.id} className="campus-enter" style={{ '--i': i }}>
                      <button
                        ref={(el) => (el ? rows.current.set(campus.id, el) : rows.current.delete(campus.id))}
                        type="button"
                        data-id={campus.id}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => pick(campus.id)}
                        aria-pressed={selected}
                        className={cn(
                          'group relative flex w-full items-center gap-4 rounded-edge px-3.5 py-3 text-left transition-[background-color,box-shadow] duration-200',
                          selected ? 'bg-navy-800 shadow-lift' : 'hover:bg-white hover:shadow-card'
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute inset-y-2.5 left-0 w-[3px] rounded-r-full bg-signal transition-transform duration-300 ease-out',
                            selected ? 'scale-y-100' : 'scale-y-0'
                          )}
                        />
                        <span
                          className={cn(
                            'min-w-0 flex-1 transition-transform duration-300 ease-out',
                            !selected && 'group-hover:translate-x-1'
                          )}
                        >
                          <span className="flex min-w-0 items-center gap-2">
                            <span
                              className={cn(
                                'truncate text-[0.9375rem] font-medium transition-colors duration-200',
                                selected ? 'text-white' : 'text-navy-700'
                              )}
                            >
                              {campus.city}
                            </span>
                            {campus.isHQ && (
                              <>
                                <span
                                  aria-hidden="true"
                                  className={cn(
                                    'shrink-0 rounded-sharp border px-1 py-0.5 font-mono text-[0.5625rem] uppercase leading-none tracking-[0.12em] transition-colors duration-200',
                                    selected ? 'border-tech/40 text-tech' : 'border-royal/25 text-royal'
                                  )}
                                >
                                  HQ
                                </span>
                                <span className="sr-only">, head office</span>
                              </>
                            )}
                          </span>
                          <span
                            className={cn(
                              'mt-0.5 block truncate text-[0.75rem] transition-colors duration-200',
                              selected ? 'text-navy-100/65' : 'text-ink-soft'
                            )}
                          >
                            {campus.name}
                          </span>
                        </span>
                        <span aria-hidden="true" className="relative h-1.5 w-1.5 shrink-0">
                          {selected && <span className="about-pulse absolute inset-0 rounded-full bg-signal" />}
                          <span
                            className={cn(
                              'absolute inset-0 rounded-full transition-[background-color,transform] duration-300 ease-out',
                              selected ? 'bg-signal' : 'bg-navy-200 group-hover:scale-150 group-hover:bg-tech'
                            )}
                          />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-3 hidden font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-soft lg:block">
                <span aria-hidden="true">↑ ↓</span> to browse · {visible.length} listed
              </p>
            </div>
          </div>

          {/* Detail panel */}
          <div className="reveal lg:col-span-8" style={{ '--reveal-delay': '100ms' }}>
            <div
              ref={panelRef}
              onPointerMove={trackSpotlight}
              className="spotlight-host relative h-full scroll-mt-[calc(var(--header-h)+1rem)] overflow-hidden rounded-panel border border-navy-100 bg-navy-800"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-40" />
              <div aria-hidden="true" className="spotlight pointer-events-none absolute inset-0" />

              <div className="relative flex h-full flex-col gap-8 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div key={active.id} className="campus-swap flex flex-wrap items-center gap-3">
                    <span className="font-mono text-label uppercase text-tech">
                      {active.district} district
                    </span>
                    {active.established && (
                      <>
                        <span aria-hidden="true" className="h-3 w-px bg-white/20" />
                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] tabular text-navy-100/60">
                          Est. {active.established}
                        </span>
                      </>
                    )}
                    {active.isHQ && (
                      <>
                        <span aria-hidden="true" className="h-3 w-px bg-white/20" />
                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-white">
                          Head office
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="mr-1 inline-flex items-baseline overflow-hidden font-mono text-[0.6875rem] tabular text-navy-100/60">
                      <span className="sr-only">Campus </span>
                      <span key={active.id} className="campus-tick inline-block text-white">
                        {pad(index + 1)}
                      </span>
                      <span className="whitespace-pre"> / {pad(visible.length)}</span>
                    </span>
                    <StepButton dir={-1} onClick={() => step(-1)} />
                    <StepButton dir={1} onClick={() => step(1)} />
                  </div>
                </div>

                <div className="grid flex-1 gap-8 md:grid-cols-[minmax(0,1fr)_16rem] lg:grid-cols-1 xl:grid-cols-[minmax(0,1fr)_20rem]">
                  <div aria-live="polite">
                    <div key={active.id} className="campus-swap">
                      <h3
                        className="font-display text-[1.75rem] font-semibold leading-tight tracking-tight text-white sm:text-[2rem]"
                        style={{ '--i': 1 }}
                      >
                        {active.name}
                      </h3>

                      <p
                        className="mt-5 flex items-start gap-3 text-[0.9375rem] leading-[1.7] text-navy-100/75"
                        style={{ '--i': 2 }}
                      >
                        <MapPin
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className="mt-1 h-4 w-4 shrink-0 text-tech"
                        />
                        {active.address}
                      </p>

                      <div className="mt-6" style={{ '--i': 3 }}>
                        <p className={DATA_LABEL}>Trades</p>
                        {active.trades.length ? (
                          <ul className="mt-2 flex flex-wrap gap-1.5">
                            {active.trades.map((trade) => (
                              <li
                                key={trade}
                                className="rounded-sharp border border-white/15 bg-white/5 px-2.5 py-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-navy-100/85 transition-colors duration-200 hover:border-tech/60 hover:text-white"
                              >
                                {trade}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-[0.8125rem] text-navy-100/55">
                            Contact the campus for trades.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <CampusMap campus={active} />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    <a href={telHref(active.phone)} className={ACTION}>
                      <span className={ACTION_ICON}>
                        <Phone aria-hidden="true" strokeWidth={1.5} className="campus-ring h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className={cn('block', DATA_LABEL)}>Call</span>
                        <span className="mt-1 block font-mono text-[0.9375rem] tabular text-white">
                          {active.phone}
                        </span>
                      </span>
                    </a>
                    <a href={`mailto:${active.email}`} className={ACTION}>
                      <span className={ACTION_ICON}>
                        <Mail
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className={cn('block', DATA_LABEL)}>Email</span>
                        <span className="mt-1 block break-all text-[0.875rem] text-navy-100/85 transition-colors duration-200 group-hover:text-white">
                          {active.email}
                        </span>
                      </span>
                    </a>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a href={active.directionsHref} target="_blank" rel="noreferrer" className={CHIP}>
                      Directions
                      <ArrowUpRight
                        aria-hidden="true"
                        strokeWidth={2}
                        className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                      <span className="sr-only"> to {active.name} (opens Google Maps in a new tab)</span>
                    </a>
                    {canCopy && (
                      <button
                        type="button"
                        onClick={copyPhone}
                        className={cn(CHIP, copied && 'border-tech/60 text-white')}
                      >
                        <span key={copied ? 'done' : 'idle'} className="campus-pop grid place-items-center">
                          {copied ? (
                            <Check aria-hidden="true" strokeWidth={2.25} className="h-3.5 w-3.5 text-tech" />
                          ) : (
                            <Copy aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5" />
                          )}
                        </span>
                        <span aria-live="polite">{copied ? 'Number copied' : 'Copy number'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {(active.affiliated || active.ref) && (
                  <p className="border-t border-white/12 pt-4 font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.1em] text-navy-100/45">
                    {active.affiliated && 'Affiliated with NCVT, New Delhi · Recommended by Quality Council of India'}
                    {active.affiliated && active.ref && <br />}
                    {active.ref && `Ref. ${active.ref}`}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepButton({ dir, onClick }) {
  const Icon = dir < 0 ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir < 0 ? 'Previous campus' : 'Next campus'}
      className="group grid h-10 w-10 place-items-center rounded-edge border border-white/15 text-navy-100 transition-[border-color,color,transform] duration-200 hover:border-tech hover:text-white active:scale-95"
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.75}
        className={cn(
          'h-4 w-4 transition-transform duration-300 ease-out',
          dir < 0 ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'
        )}
      />
    </button>
  );
}

/**
 * Live Google Maps preview pinned on the selected campus. The iframe is only a
 * picture — the whole block is one link that opens the same place in Google
 * Maps. Each campus gets a fresh iframe (keyed on its URL) so switching
 * campuses never piles entries onto the browser's back history.
 */
function CampusMap({ campus }) {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const loaded = loadedSrc === campus.embedSrc;

  return (
    <a
      href={campus.mapsHref}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-edge border border-white/12 bg-navy-900 transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-tech/60 hover:shadow-deep active:translate-y-px"
    >
      <span className="relative block h-52 overflow-hidden md:h-auto md:min-h-[13rem] md:flex-1 lg:h-56 lg:flex-none xl:h-auto xl:min-h-[14rem] xl:flex-1">
        <iframe
          key={campus.embedSrc}
          src={campus.embedSrc}
          title={`Google Map showing ${campus.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
          aria-hidden="true"
          onLoad={() => setLoadedSrc(campus.embedSrc)}
          className={cn(
            'pointer-events-none absolute inset-0 h-full w-full border-0 grayscale-[30%] transition-[filter,opacity,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0',
            loaded ? 'opacity-100' : 'opacity-0'
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            'blueprint absolute inset-0 grid place-items-center transition-opacity duration-500',
            loaded ? 'opacity-0' : 'opacity-100'
          )}
        >
          <span className="flex flex-col items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-navy-100/60">
            <MapPin strokeWidth={1.75} className="h-6 w-6 animate-pulse-marker text-signal" />
            Loading map
          </span>
        </span>
      </span>

      <span
        aria-hidden="true"
        className="flex items-center justify-between gap-3 border-t border-white/12 px-3.5 py-2.5"
      >
        <span className="flex min-w-0 items-center gap-2">
          <MapPin strokeWidth={2} className="about-pin-hop h-4 w-4 shrink-0 text-signal" />
          <span className="truncate text-[0.8125rem] font-medium text-white">{campus.city}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-navy-100/60 transition-colors duration-200 group-hover:text-tech">
          Open in Google Maps
          <ArrowUpRight
            strokeWidth={2}
            className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </span>
      <span className="sr-only">Open {campus.name} in Google Maps (new tab)</span>
    </a>
  );
}

export default Campuses;
