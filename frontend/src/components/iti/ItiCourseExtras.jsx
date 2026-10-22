import { ArrowRight, ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

import Button from '../ui/Button';
import GearOutline from '../ui/GearOutline';
import { itiProfiles } from '../../data/itiProfiles';
import { telHref } from '../../utils/format';
import useSpotlight from '../../hooks/useSpotlight';
import { tradeIcon } from './tradeIcons';

/**
 * Companions for the Courses & Trades grid on campuses that run only one or
 * two trades, so the row is not left with a hole:
 *
 *  - More trades nearby: every trade in the Satpuda network that this campus
 *    does not run, each with the nearest campuses that do (ordered by the
 *    records' town-level map points, which are never shown as distances),
 *    linking to those campuses' pages and to the trade's own page.
 *  - Apply here: the next step for a single-trade campus — the admission
 *    form with this trade and campus already chosen, or a call to the campus.
 *
 * Motion follows the trade cards: cards lift, a row's trade icon turns red
 * and answers in its own way, map pins hop and arrows slide; the apply card
 * carries the cyan glow that follows a mouse across navy panels.
 */

const NEAREST = 3;

/** Great-circle distance between two map points, in km — used only to order. */
function km(a, b) {
  const rad = (d) => (d * Math.PI) / 180;
  const h =
    Math.sin(rad(b.lat - a.lat) / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(rad(b.lng - a.lng) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

/** Trades the network runs, in the order they first appear (oldest campus first). */
const NETWORK_TRADES = [
  ...new Map(itiProfiles.flatMap((p) => p.courses).map((c) => [c.id, c])).values(),
];

function nearbyTrades(inst) {
  const here = new Set(inst.courses.map((c) => c.id));
  return NETWORK_TRADES.filter((t) => !here.has(t.id)).map((trade) => ({
    trade,
    campuses: itiProfiles
      .filter((p) => p.slug !== inst.slug && p.courses.some((c) => c.id === trade.id))
      .sort((a, b) => km(inst.mapPoint, a.mapPoint) - km(inst.mapPoint, b.mapPoint))
      .slice(0, NEAREST),
  }));
}

export function ItiNearbyTrades({ inst, className = '', delay = 0 }) {
  const rows = nearbyTrades(inst);
  if (rows.length === 0) return null;

  return (
    <li className={`reveal flex ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>
      <article
        aria-labelledby="iti-nearby-title"
        className="iti-lift relative flex w-full flex-col overflow-hidden rounded-panel border border-navy-100 bg-white p-6 shadow-card hover:border-navy-200 sm:p-7"
      >
        <p className="font-mono text-label uppercase text-ink-soft">Satpuda network</p>
        <h3
          id="iti-nearby-title"
          className="mt-3 font-display text-[1.375rem] font-semibold leading-tight tracking-tight text-navy-800"
        >
          More trades nearby
        </h3>
        <p lang="hi" className="mt-3 text-[0.9375rem] leading-[1.75] text-ink-muted">
          जो ट्रेड इस कैंपस में नहीं चलते, वे Satpuda समूह के पास के इन संस्थानों में पढ़ाए जाते हैं।
        </p>

        <ul className="mt-5 divide-y divide-navy-100 border-y border-navy-100">
          {rows.map(({ trade, campuses }) => {
            const [Icon, iconClass] = tradeIcon(trade.icon);
            return (
              <li key={trade.id} className="iti-trade py-4">
                <div className="flex items-center gap-3">
                  <span className="iti-trade-icon grid h-9 w-9 shrink-0 place-items-center rounded-edge bg-navy-800 text-tech">
                    <Icon aria-hidden="true" className={`${iconClass} h-4 w-4`} strokeWidth={1.75} />
                  </span>
                  <Link
                    to={trade.slug}
                    className="group inline-flex min-h-[2.75rem] items-center gap-1 font-display text-[1.0625rem] font-semibold tracking-tight text-navy-800 transition-colors hover:text-signal"
                  >
                    {trade.name}
                    <span className="sr-only">: trade details</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={2}
                      className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
                <ul aria-label={`Campuses teaching ${trade.name}, nearest first`} className="mt-2 flex flex-wrap gap-2">
                  {campuses.map((p) => (
                    <li key={p.slug}>
                      <Link
                        to={p.path}
                        className="iti-chip inline-flex min-h-[2.5rem] items-center gap-1.5 rounded-full border border-navy-100 bg-canvas-soft px-3 text-[0.8125rem] font-medium text-navy-700 transition-colors duration-200 hover:border-navy-300 hover:bg-white hover:text-navy-800"
                      >
                        <MapPin aria-hidden="true" strokeWidth={2} className="iti-chip-pin h-3.5 w-3.5 text-signal" />
                        {p.namePlace}
                        {p.namePlace !== p.district && (
                          <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-soft">
                            <span className="sr-only">, </span>
                            {p.district}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <p className="mt-auto pt-5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-soft">
          Nearest campuses first
        </p>
      </article>
    </li>
  );
}

export function ItiApplyCard({ inst, className = '', delay = 0 }) {
  const onSpotlight = useSpotlight();
  const course = inst.courses[0];
  if (!course) return null;
  const apply = `/admission?trade=${encodeURIComponent(course.id)}&campus=${encodeURIComponent(inst.slug)}`;
  // The same published figures as the trade card beside it.
  const specs = [
    ['Trade', course.name],
    ['Duration', course.duration ? `${parseInt(course.duration, 10)} वर्ष` : null],
    ['Intake', course.intake ? String(course.intake) : null],
  ].filter(([, value]) => value);

  return (
    <li className={`reveal flex ${className}`} style={{ '--reveal-delay': `${delay}ms` }}>
      <article
        aria-labelledby="iti-apply-title"
        onPointerMove={onSpotlight}
        className="iti-lift spotlight-host relative isolate flex w-full flex-col overflow-hidden rounded-panel border border-navy-700 bg-navy-800 p-6 text-white shadow-deep sm:p-7"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 blueprint opacity-30" />
        <div aria-hidden="true" className="spotlight pointer-events-none absolute inset-0 -z-10" />
        <GearOutline
          strokeWidth={6}
          className="pointer-events-none absolute -bottom-12 -right-12 -z-10 h-44 w-44 text-white/5"
        />

        <p className="font-mono text-label uppercase text-tech">Admission</p>
        <h3 id="iti-apply-title" className="mt-3 font-display text-[1.375rem] font-semibold leading-tight tracking-tight">
          Apply for {course.name} at {inst.namePlace}
        </h3>
        <p lang="hi" className="mt-3 text-[0.9375rem] leading-[1.75] text-navy-100/80">
          ऑनलाइन फ़ॉर्म में अपनी बुनियादी जानकारी भरें — इसमें लगभग दो मिनट लगते हैं। फिर प्रवेश टीम आपको कॉल करके
          काउंसलिंग और दस्तावेज़ों के बारे में मार्गदर्शन देगी।
        </p>

        <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-edge border border-white/12 bg-white/12">
          {specs.map(([label, value]) => (
            <div key={label} className="bg-navy-900/60 px-3 py-3">
              <dt className="font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-navy-200">{label}</dt>
              <dd lang={label === 'Duration' ? 'hi' : undefined} className="mt-1 text-[0.9375rem] font-semibold tabular">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto flex flex-col gap-3 pt-7">
          <Button to={apply} variant="primary" className="w-full">
            Apply online
            <ArrowRight
              aria-hidden="true"
              strokeWidth={2}
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
            />
          </Button>
          {inst.phone && (
            <Button href={telHref(inst.phone)} variant="ghostLight" className="w-full">
              <Phone aria-hidden="true" strokeWidth={2} className="campus-ring h-4 w-4" />
              Call the campus
              <span className="sr-only"> on {inst.phone}</span>
            </Button>
          )}
        </div>
      </article>
    </li>
  );
}
