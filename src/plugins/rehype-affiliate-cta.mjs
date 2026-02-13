/**
 * rehype-affiliate-cta.mjs
 *
 * Rehype plugin that replaces <!-- CTA:top/middle/bottom --> comment markers
 * in markdown articles with full CTA HTML from affiliateConfig placements.
 *
 * Usage in astro.config.mjs:
 *   import { rehypeAffiliateCta } from './src/plugins/rehype-affiliate-cta.mjs';
 *   import { affiliatePlacements } from './src/data/affiliatePlacements.mjs';
 *   markdown: {
 *     rehypePlugins: [[rehypeAffiliateCta, { placements: affiliatePlacements }]],
 *   }
 */

import { visit } from 'unist-util-visit';

function generateCtaHtml(placement) {
  if (!placement) return '';

  // When affiliateUrl is empty, show service name only (no link)
  const linkHtml = placement.affiliateUrl
    ? `<a href="${placement.affiliateUrl}" class="cta-button" rel="nofollow sponsored" target="_blank">${placement.buttonText}</a>`
    : `<span class="cta-button cta-button--disabled">${placement.buttonText.replace(' →', '')}</span>`;

  return `<div class="cta-box">
<span class="cta-badge">PR</span>
<h3>${placement.title}</h3>
<p>${placement.description}</p>
${linkHtml}
<p class="affiliate-note">${placement.note}</p>
</div>`;
}

export function rehypeAffiliateCta(options = {}) {
  const { placements = {} } = options;

  const COMMENT_RE = /^CTA:(top|middle|bottom)$/;
  const RAW_COMMENT_RE = /^<!--\s*CTA:(top|middle|bottom)\s*-->$/;

  return (tree) => {
    visit(tree, (node, index, parent) => {
      if (!parent || index === null) return;

      let position;
      if (node.type === 'comment') {
        const match = node.value.trim().match(COMMENT_RE);
        if (match) position = match[1];
      } else if (node.type === 'raw') {
        const match = node.value.trim().match(RAW_COMMENT_RE);
        if (match) position = match[1];
      }

      if (!position) return;

      const placement = placements[position];
      if (!placement) return;

      const html = generateCtaHtml(placement);

      parent.children[index] = {
        type: 'raw',
        value: html,
      };
    });
  };
}
