import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Mail, MapPin, Menu, Phone } from 'lucide-react';

import Logo from '../ui/Logo';
import Button from '../ui/Button';
import MobileDrawer from './MobileDrawer';
import { contact, navigation } from '../../data/satpudaData';
import useScrollState from '../../hooks/useScrollState';
import { telHref } from '../../utils/format';
import cn from '../../utils/cn';

/**
 * Sticky header.
 *
 * Two decks: a navy enquiry rail carrying the published contact details and
 * standing, and a white bar holding the lock-up, the primary navigation and
 * the single red action. Every surface on the site is light, so the bar is
 * always solid — scrolling only tightens it (the rail collapses, the bar
 * shortens) and commits the shadow.
 */

/** Standing claims shown on the navy rail. */
const STANDING = ['NCVT Affiliated', 'Govt. Recognized', 'Skill for Better Tomorrow'];

/** The head-office locality, short enough for the rail. */
const LOCALITY = 'Manjhapur, Balaghat (M.P.)';

export function Navbar() {
  const scrolled = useScrollState(32);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();
  const closeTimer = useRef(0);

  // A navigation always dismisses transient surfaces.
  useEffect(() => {
    setDrawerOpen(false);
    setOpenMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const openWithDelay = (label) => {
    window.clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const closeWithDelay = () => {
    window.clearTimeout(closeTimer.current);
    // A short grace period keeps the menu usable while the pointer crosses the gap.
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-edge focus:bg-signal focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-400 ease-out',
          scrolled
            ? 'border-navy-100 bg-white/92 backdrop-blur-md shadow-[0_1px_2px_rgba(7,27,51,0.04),0_10px_30px_-24px_rgba(7,27,51,0.5)]'
            : 'border-transparent bg-white'
        )}
      >
        {/* Enquiry rail — real published contact details, desktop only. */}
        <div
          className={cn(
            'relative hidden overflow-hidden bg-navy-800 transition-all duration-400 ease-out lg:block',
            scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
          )}
        >
          {/* A lighter shear on the right keeps the rail from reading flat. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-navy-600"
            style={{ clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 0 100%)' }}
          />

          <div className="shell relative flex h-[var(--utility-h)] items-center justify-between gap-6 text-[0.75rem] text-navy-100/85">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <MapPin aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5 text-tech" />
                {LOCALITY}
              </span>
              <a
                href={telHref(contact.enquiry.phone)}
                className="flex items-center gap-2 font-mono tabular tracking-tight transition-colors hover:text-white"
              >
                <Phone aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5 text-tech" />
                {contact.enquiry.phone}
              </a>
              <a
                href={`mailto:${contact.enquiry.email}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5 text-tech" />
                {contact.enquiry.email}
              </a>
            </div>

            <ul className="flex items-center gap-4">
              {STANDING.map((item, i) => (
                <li key={item} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-white/25" />}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav
          aria-label="Primary"
          className={cn(
            'shell flex items-center justify-between gap-6 transition-[height] duration-300 ease-out',
            scrolled ? 'h-[var(--navbar-h-scrolled)]' : 'h-[var(--navbar-h)]'
          )}
        >
          <Logo tone="light" />

          {/* Desktop navigation */}
          <ul className="hidden flex-1 items-center justify-center gap-0.5 xl:flex">
            {navigation.map((item) => {
              const hasChildren = Boolean(item.children);
              const isOpen = openMenu === item.label;

              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && openWithDelay(item.label)}
                  onMouseLeave={() => hasChildren && closeWithDelay()}
                >
                  <div className="flex items-center">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        cn(
                          'group relative rounded-edge px-3 py-2 text-[0.9375rem] font-medium tracking-tight transition-colors duration-200',
                          isActive ? 'text-navy-800' : 'text-navy-700/80 hover:text-navy-800'
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.label}
                          {/* Active state is marked in red — the only accent at this scale. */}
                          <span
                            aria-hidden="true"
                            className={cn(
                              'absolute inset-x-3 -bottom-1 h-[2px] origin-left rounded-full bg-signal transition-transform duration-300 ease-out',
                              isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            )}
                          />
                        </>
                      )}
                    </NavLink>

                    {hasChildren && (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`${item.label} submenu`}
                        onClick={() => setOpenMenu(isOpen ? null : item.label)}
                        className="-ml-2 flex h-9 w-6 items-center justify-center rounded-edge text-navy-700/70 transition-colors duration-200 hover:text-navy-800"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          strokeWidth={2}
                          className={cn(
                            'h-3.5 w-3.5 transition-transform duration-300 ease-out',
                            isOpen && 'rotate-180'
                          )}
                        />
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <div
                      className={cn(
                        'absolute left-0 top-full z-10 pt-3 transition-all duration-200 ease-out',
                        isOpen
                          ? 'pointer-events-auto translate-y-0 opacity-100'
                          : 'pointer-events-none -translate-y-1 opacity-0'
                      )}
                    >
                      <ul className="min-w-[15rem] overflow-hidden rounded-panel border border-navy-100 bg-white p-1.5 shadow-lift">
                        {item.children.map((child) => (
                          <li key={`${child.label}-${child.to}`}>
                            <Link
                              to={child.to}
                              tabIndex={isOpen ? 0 : -1}
                              className="group flex items-center justify-between gap-3 rounded-edge px-3 py-2.5 text-[0.8125rem] font-medium text-navy-700 transition-colors duration-150 hover:bg-navy-50 hover:text-navy-800"
                            >
                              {child.label}
                              <span
                                aria-hidden="true"
                                className="h-px w-3 bg-signal opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                              />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={telHref(contact.enquiry.phone)}
              aria-label={`Call Satpuda ITI on ${contact.enquiry.phone}`}
              className="hidden h-11 w-11 items-center justify-center rounded-edge border border-navy-200 text-navy transition-colors duration-200 hover:border-navy-400 md:flex xl:hidden"
            >
              <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </a>

            <Button
              to="/admission"
              variant="primary"
              className="hidden px-6 sm:inline-flex"
            >
              Apply Now
              <ArrowIcon />
            </Button>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className="flex h-11 w-11 items-center justify-center rounded-edge border border-navy-200 text-navy-800 transition-colors duration-200 hover:border-navy-400 xl:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

/**
 * The action arrow. Drawn inline rather than pulled from lucide because it is
 * a single stroke and this keeps the header off a second icon import path.
 */
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
    >
      <path
        d="M2 8h11m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Navbar;
