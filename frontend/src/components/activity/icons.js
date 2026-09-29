import {
  CalendarDays,
  CloudLightning,
  Cog,
  Flag,
  Flame,
  FlaskConical,
  GraduationCap,
  Handshake,
  HardHat,
  HeartPulse,
  Images,
  Leaf,
  ListChecks,
  Megaphone,
  Newspaper,
  PartyPopper,
  Scale,
  ShieldCheck,
  Signpost,
  Siren,
  Stethoscope,
  TrafficCone,
  Trophy,
  Zap,
} from 'lucide-react';

/**
 * Activity data names icons by string so it stays plain data; this map
 * resolves them. Listing every icon explicitly keeps the bundle tree-shaken.
 */
export const icons = {
  CalendarDays,
  CloudLightning,
  Cog,
  Flag,
  Flame,
  FlaskConical,
  GraduationCap,
  Handshake,
  HardHat,
  HeartPulse,
  Images,
  Leaf,
  ListChecks,
  Megaphone,
  Newspaper,
  PartyPopper,
  Scale,
  ShieldCheck,
  Signpost,
  Siren,
  Stethoscope,
  TrafficCone,
  Trophy,
  Zap,
};

export const iconFor = (name) => icons[name] ?? Cog;
