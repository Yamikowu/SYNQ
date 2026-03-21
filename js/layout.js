(function initSharedLayout() {
  function getPageKey() {
    const file = window.location.pathname.split('/').pop() || 'index.html';
    if (file === 'controller.html') return 'controller';
    if (file === 'keyboard.html') return 'keyboard';
    if (file === 'macro.html') return 'macro';
    if (file === 'software.html') return 'software';
    return '';
  }

  function applyActiveNav() {
    const pageKey = getPageKey();
    if (!pageKey) return;

    const links = document.querySelectorAll(`[data-nav="${pageKey}"]`);
    links.forEach((link) => {
      link.classList.remove('text-gray-300', 'text-gray-400');
      link.classList.add('text-ice');
    });
  }

  function renderTemplate(targetId, template) {
    const target = document.getElementById(targetId);
    if (!target || !template) return;
    target.innerHTML = template;
  }

  function boot() {
    const templates = window.SYNQ_LAYOUT_TEMPLATES || {};
    renderTemplate('layout-navbar', templates.navbar);
    renderTemplate('layout-footer', templates.footer);

    applyActiveNav();
    document.dispatchEvent(new CustomEvent('layout:updated'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
