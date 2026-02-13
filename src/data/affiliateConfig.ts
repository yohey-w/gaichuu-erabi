/**
 * Affiliate configuration (TypeScript types + re-export)
 *
 * Data is defined in affiliatePlacements.mjs (single source of truth).
 * This file provides TypeScript interfaces and re-exports for Astro components.
 */

export interface AffiliateProgram {
  name: string;
  network: 'A8';
  rewardYen: number;
  status: 'active' | 'pending' | 'url_pending';
  affiliateUrl: string;
}

export interface AffiliatePlacement {
  title: string;
  description: string;
  buttonText: string;
  affiliateUrl: string;
  note: string;
}

export {
  affiliatePrograms,
  affiliatePlacements,
} from './affiliatePlacements.mjs';
