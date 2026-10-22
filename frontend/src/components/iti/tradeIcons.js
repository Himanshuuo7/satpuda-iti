import { Cog, MonitorCog, Wrench, Zap } from 'lucide-react';

/**
 * A trade's icon (named in `data/trades.js`) and the class that animates it
 * when its `.iti-trade` card is hovered or focused: the bolt flickers, the
 * wrench twists, the cog turns, the monitor blips.
 */
export const TRADE_ICONS = {
  Zap: [Zap, 'iti-icon-zap'],
  Wrench: [Wrench, 'iti-icon-wrench'],
  Cog: [Cog, 'iti-icon-cog'],
  MonitorCog: [MonitorCog, 'iti-icon-monitor'],
};

export const tradeIcon = (name) => TRADE_ICONS[name] ?? TRADE_ICONS.Cog;
