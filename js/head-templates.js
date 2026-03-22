/**
 * js/head-templates.js — 共用 head 模板
 * 統一管理 favicon、meta 標籤等 head 內容
 */

(function initHeadTemplates() {
  // 動態注入 favicon
  function injectFavicon() {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/svg+xml';
    link.href = 'assets/favicon.svg';
    document.head.appendChild(link);
  }

  // 頁面載入時執行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFavicon, { once: true });
  } else {
    injectFavicon();
  }
})();
