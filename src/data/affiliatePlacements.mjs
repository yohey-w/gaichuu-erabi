/**
 * Affiliate placement configuration (ESM)
 *
 * Single source of truth for CTA content across all articles.
 * Used by rehype-affiliate-cta plugin in astro.config.mjs.
 * Update URLs and copy here when affiliate programs change.
 */

const PR_NOTE = '※PR: 本記事にはアフィリエイト広告が含まれます';

export const affiliatePrograms = {
  gaichuuKujoya: {
    name: '害虫駆除屋',
    network: 'A8',
    rewardYen: 0,
    status: 'active',
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4AXA8I+402XY2+36X8+HV7V6',
  },
};

export const affiliatePlacements = {
  top: {
    title: '害虫トラブルの無料相談で対応可否を確認',
    description:
      '害虫駆除屋は害虫駆除に関することなら何でも相談可能。まずは被害状況を伝えて、対応条件と費用目安を確認しましょう。',
    buttonText: '害虫駆除屋に無料相談する →',
    affiliateUrl: affiliatePrograms.gaichuuKujoya.affiliateUrl,
    note: PR_NOTE,
  },
  middle: {
    title: '再発防止まで見据えて業者を比較したい方へ',
    description:
      '見積もり時に施工範囲と再発防止の内容を確認すると、後の追加費用を抑えやすくなります。比較前に条件を整理しましょう。',
    buttonText: '害虫駆除屋の対応条件を見る →',
    affiliateUrl: affiliatePrograms.gaichuuKujoya.affiliateUrl,
    note: PR_NOTE,
  },
  bottom: {
    title: '依頼前に料金・対応スピードを最終確認',
    description:
      '夜間や休日対応の可否、保証の有無、追加料金条件を確認してから申し込むと安心です。最後に見積もりを比較して決めましょう。',
    buttonText: '害虫駆除屋の最新情報を確認する →',
    affiliateUrl: affiliatePrograms.gaichuuKujoya.affiliateUrl,
    note: PR_NOTE,
  },
};
