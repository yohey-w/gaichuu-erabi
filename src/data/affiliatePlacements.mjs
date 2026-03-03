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
  yamatoShiroari: {
    name: 'ヤマト産業シロアリ無料床下診断',
    network: 'moshimo',
    rewardYen: 0,
    status: 'active',
    affiliateUrl: 'https://af.moshimo.com/af/c/click?a_id=5379439&p_id=6840&pc_id=19579&pl_id=87049',
  },
  zehitomo: {
    name: 'ゼヒトモ',
    network: 'A8',
    status: 'active',
    affiliateUrl: 'https://px.a8.net/svt/ejp?a8mat=4AXA8I+53DP9U+5LK4+5YJRM',
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
    title: '害虫駆除・リフォームの見積もりを比較',
    description:
      'ゼヒトモは国内最大級の見積もりサイト。害虫駆除からリフォームまで、複数業者の条件をまとめて比較できます。',
    buttonText: 'ゼヒトモで無料見積もりを比較する →',
    affiliateUrl: affiliatePrograms.zehitomo.affiliateUrl,
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

/**
 * 地域限定広告（Regional Placements）
 *
 * frontmatter の area フィールドで地域を判定し、該当記事に自動挿入。
 * 新しい地域限定アフィリエイトはここに追加するだけ。
 */
export const regionalPlacements = [
  {
    id: 'yamato_shiroari_kansai',
    areas: [
      '京都市', '宇治市',
      '大阪市', '堺市', '東大阪市', '枚方市', '豊中市', '吹田市', '高槻市',
      '茨木市', '八尾市', '寝屋川市', '岸和田市',
      '奈良市', '生駒市', '橿原市',
    ],
    title: '【関西限定】シロアリ無料床下診断',
    description:
      '京都・大阪・奈良エリア限定で、ヤマト産業によるシロアリ無料床下診断を実施中。築10年以上の住宅は一度チェックしておくと安心です。',
    buttonText: '無料床下診断を申し込む →',
    affiliateUrl: affiliatePrograms.yamatoShiroari.affiliateUrl,
    note: '※PR: ヤマト産業提供の無料診断です',
    position: 'after_bottom',  // CTA:bottom の直後に挿入
  },
];
