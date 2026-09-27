import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Mail, Phone, X } from 'lucide-react';

import Logo from '../ui/Logo';
import Button from '../ui/Button';
import GearOutline from '../ui/GearOutline';
import { contact, navigation } from '../../data/satpudaData';
import useLockBodyScroll from '../../hooks/useLockBodyScroll';
import { telHref } from '../../utils/format';
import cn from '../../utils/cn';

/**
 * Full-height mobile navigation.
 *
 * Designed for the phone rather than shrunk from the desktop bar: items are
 * large index-numbered rows, groups expand in place instead of opening nested
 * overlays, and the published enquiry details sit at the bottom within thumb
 * reach. Focus is trapped while open and returned to the trigger on close.
 */
export function MobileDrawer({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const restoreRef = useRef(null);

  useLockBodyScroll(open);

  useEffect(() => {
    if (open) {
      restoreRef.current = document.activeElement;
      // Focus the panel's close control once the entrance has committed.
      const t = window.setTimeout(() => closeRef.current?.focus(), 80);
      return () => window.clearTimeout(t);
    }
    setExpanded(null);
    restoreRef.current?.focus?.();
    return undefined;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <div
      className={cn('fixed inset-0 z-[60] xl:hidden', !open && 'pointer-events-none')}
      aria-hidden={!open}
    >
      {/* Scrim */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close menu"
        onClick={onClose}
        className={cn(
          'absolute inset-0 h-full w-full cursor-default bg-navy-950/60 backdrop-blur-[3px] transition-opacity duration-400 ease-out',
          open ? 'opacity-100' : 'opacity-0'
        )}
      />

      <div
        id="mobile-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={cn(
          'scroll-dark absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col overflow-y-auto overscroll-contain bg-navy-800 transition-transform duration-[450ms] ease-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Technical backdrop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 blueprint opacity-50" />
        <GearOutline
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-24 h-72 w-72 text-tech/[0.07]"
          spin
        />

        <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
          <Logo tone="dark" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-edge border border-white/20 text-white transition-colors duration-200 hover:border-signal hover:text-signal"
          >
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="relative flex-1 px-5 py-4">
          <ul className="flex flex-col">
            {navigation.map((item, i) => {
              const hasChildren = Boolean(item.children);
              const isOpen = expanded === item.label;

              return (
                <li key={item.label} className="border-b border-white/[0.07] last:border-0">
                  <div className="flex items-center">
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      onClick={onClose}
                      tabIndex={open ? 0 : -1}
                      className={({ isActive }) =>
                        cn(
                          'flex flex-1 items-baseline gap-4 py-4 font-display text-[1.375rem] font-medium tracking-tight transition-colors duration-200',
                          isActive ? 'text-signal' : 'text-white hover:text-tech'
                        )
                      }
                    >
                      <span className="font-mono text-[0.625rem] tabular text-tech/60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </NavLink>

                    {hasChildren && (
                      <button
                        type="button"
                        tabIndex={open ? 0 : -1}
                        aria-expanded={isOpen}
                        aria-label={`${item.label} submenu`}
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        className="flex h-11 w-11 items-center justify-center rounded-edge text-navy-200 transition-colors duration-200 hover:text-white"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          strokeWidth={2}
                          className={cn(
                            'h-4 w-4 transition-transform duration-300 ease-out',
                            isOpen && 'rotate-180'
                          )}
                        />
                      </button>
                    )}
                  </div>

                  {hasChildren && (
                    <div
                      className={cn(
                        'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      )}
                    >
                      <ul className="overflow-hidden">
                        {item.children.map((child) => (
                          <li key={`${child.label}-${child.to}`}>
                            <Link
                              to={child.to}
                              onClick={onClose}
                              tabIndex={open && isOpen ? 0 : -1}
                              className="flex items-center gap-3 py-2.5 pl-9 text-[0.9375rem] text-navy-100/80 transition-colors duration-150 hover:text-white"
                            >
                              <span aria-hidden="true" className="h-0.5 w-4 bg-tech/60" />
                              {child.label}
                            </Link>
                          </li>
                        ))}
                        <li aria-hidden="true" className="h-2" />
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative border-t border-white/10 px-5 py-5">
          <Button to="/admission" variant="primary" size="lg" className="w-full" tabIndex={open ? 0 : -1}>
            Apply Now
          </Button>

          <div className="mt-5 flex flex-col gap-3">
            <a
              href={telHref(contact.enquiry.phone)}
              tabIndex={open ? 0 : -1}
              className="flex items-center gap-3 text-[0.875rem] text-navy-100/80 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 shrink-0 text-tech" strokeWidth={1.75} aria-hidden="true" />
              <span className="font-mono tabular">{contact.enquiry.phone}</span>
            </a>
            <a
              href={`mailto:${contact.enquiry.email}`}
              tabIndex={open ? 0 : -1}
              className="flex items-center gap-3 break-all text-[0.875rem] text-navy-100/80 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0 text-tech" strokeWidth={1.75} aria-hidden="true" />
              {contact.enquiry.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileDrawer;
