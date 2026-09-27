import {
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  ClipboardList,
  Cog,
  Cpu,
  Factory,
  Flag,
  Gauge,
  GraduationCap,
  HardHat,
  Lightbulb,
  Link2,
  MonitorCog,
  Newspaper,
  Timer,
  TrendingUp,
  Trophy,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';

/**
 * Data files name icons by string so they stay plain data; this map resolves
 * them. Listing every icon explicitly keeps the bundle tree-shaken.
 */
export const icons = {
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building2,
  ClipboardList,
  Cog,
  Cpu,
  Factory,
  Flag,
  Gauge,
  GraduationCap,
  HardHat,
  Lightbulb,
  Link2,
  MonitorCog,
  Newspaper,
  Timer,
  TrendingUp,
  Trophy,
  Users,
  Wrench,
  Zap,
};

export const iconFor = (name) => icons[name] ?? Cog;
