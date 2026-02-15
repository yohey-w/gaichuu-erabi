/**
 * rehype-affiliate-cta.mjs
 *
 * Rehype plugin that:
 * 1. Replaces <!-- CTA:top/middle/bottom --> comment markers with CTA HTML
 * 2. Auto-injects regional affiliate ads based on frontmatter `area` field
 *
 * Usage in astro.config.mjs:
 *   import { rehypeAffiliateCta } from './src/plugins/rehype-affiliate-cta.mjs';
 *   import { affiliatePlacements, regionalPlacements } from './src/data/affiliatePlacements.mjs';
 *   markdown: {
 *     rehypePlugins: [[rehypeAffiliateCta, { placements: affiliatePlacements, regionalPlacements }]],
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

function generateRegionalCtaHtml(placement) {
  if (!placement) return '';
  return `<!-- af:${placement.id} -->\n${generateCtaHtml(placement)}`;
}

export function rehypeAffiliateCta(options = {}) {
  const { placements = {}, regionalPlacements = [] } = options;

  const COMMENT_RE = /^CTA:(top|middle|bottom)$/;
  const RAW_COMMENT_RE = /^<!--\s*CTA:(top|middle|bottom)\s*-->$/;

  return (tree, file) => {
    // Get frontmatter area for regional matching
    const area = file?.data?.astro?.frontmatter?.area || '';

    // Find matching regional placements for this article's area
    const matchedRegional = regionalPlacements.filter(
      (rp) => rp.areas.includes(area)
    );

    // Track the last CTA:bottom node position for after_bottom insertion
    let lastBottomParent = null;
    let lastBottomIndex = null;

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

      // Remember position of CTA:bottom for regional ad insertion
      if (position === 'bottom') {
        lastBottomParent = parent;
        lastBottomIndex = index;
      }
    });

    // Insert regional ads after CTA:bottom (or at end of tree)
    if (matchedRegional.length > 0) {
      const regionalNodes = matchedRegional.map((rp) => ({
        type: 'raw',
        value: generateRegionalCtaHtml(rp),
      }));

      if (lastBottomParent && lastBottomIndex !== null) {
        // Insert after CTA:bottom
        lastBottomParent.children.splice(lastBottomIndex + 1, 0, ...regionalNodes);
      } else {
        // Fallback: append to end of tree
        tree.children.push(...regionalNodes);
      }
    }
  };
}
