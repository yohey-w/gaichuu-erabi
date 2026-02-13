/**
 * Affiliate placement configuration (ESM)
 *
 * Single source of truth for CTA content across all articles.
 * Used by rehype-affiliate-cta plugin in astro.config.mjs.
 * Update URLs and copy here when affiliate programs change.
 */

const PR_NOTE = '※PR: 本記事にはアフィリエイト広告が含まれます';

export const affiliatePrograms = {
  rescueHouse: {
    name: '害獣害虫レスキューハウス',
    network: 'A8',
    rewardYen: 19254,
    status: 'pending',
    affiliateUrl: '',
  },
};

export const affiliatePlacements = {
  top: {
    title: '害獣・害虫トラブルを無料見積もりで相談',
    description:
      '害獣害虫レスキューハウスは現地調査から駆除方針まで相談可能。まずは被害状況を入力して対応可否を確認できます。',
    buttonText: '害獣害虫レスキューハウスの無料見積もりを確認する →',
    affiliateUrl: affiliatePrograms.rescueHouse.affiliateUrl,
    note: PR_NOTE,
  },
  middle: {
    title: '再発防止まで見据えて業者を比較したい方へ',
    description:
      '見積もり時に施工範囲と再発防止の内容を確認すると、後の追加費用を抑えやすくなります。比較前に条件を整理しましょう。',
    buttonText: '害獣害虫レスキューハウスの対応条件を見る →',
    affiliateUrl: affiliatePrograms.rescueHouse.affiliateUrl,
    note: PR_NOTE,
  },
  bottom: {
    title: '依頼前に料金・対応スピードを最終確認',
    description:
      '夜間や休日対応の可否、保証の有無、追加料金条件を確認してから申し込むと安心です。最後に見積もりを比較して決めましょう。',
    buttonText: '害獣害虫レスキューハウスの最新情報を確認する →',
    affiliateUrl: affiliatePrograms.rescueHouse.affiliateUrl,
    note: PR_NOTE,
  },
};
