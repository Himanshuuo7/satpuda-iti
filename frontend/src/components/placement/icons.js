import {
  BadgeCheck,
  BarChart3,
  Building2,
  Cog,
  Compass,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  HardHat,
  Lightbulb,
  Mic,
  Monitor,
  Network,
  Newspaper,
  Presentation,
  Repeat,
  Rocket,
  Route,
  UserCheck,
  Users,
  Wifi,
  Wrench,
} from 'lucide-react';

/**
 * Placement data names icons by string so it stays plain data; this map
 * resolves them. Listing every icon explicitly keeps the bundle tree-shaken.
 */
export const icons = {
  BadgeCheck,
  BarChart3,
  Building2,
  Compass,
  Factory,
  Globe,
  GraduationCap,
  Handshake,
  HardHat,
  Lightbulb,
  Mic,
  Monitor,
  Network,
  Newspaper,
  Presentation,
  Repeat,
  Rocket,
  Route,
  UserCheck,
  Users,
  Wifi,
  Wrench,
};

export const iconFor = (name) => icons[name] ?? Cog;
