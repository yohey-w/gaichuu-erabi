// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { rehypeAffiliateCta } from './src/plugins/rehype-affiliate-cta.mjs';
import { affiliatePlacements, regionalPlacements } from './src/data/affiliatePlacements.mjs';

export default defineConfig({
  site: 'https://gaichuu-erabi.com',
  integrations: [sitemap({ lastmod: new Date() })],
  output: 'static',
  build: {
    format: 'directory',
  },
  markdown: {
    rehypePlugins: [
      [rehypeAffiliateCta, { placements: affiliatePlacements, regionalPlacements }],
    ],
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
