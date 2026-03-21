/**
 * js/script.js — NEXUS 品牌官網互動邏輯
 * 支援靜態頁面與 layout partial 動態注入兩種模式
 */

function loadAOSScript() {
  if (window.AOS) return Promise.resolve();
  if (window.__synqAOSLoading) return window.__synqAOSLoading;

  window.__synqAOSLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/aos@2.3.4/dist/aos.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load AOS'));
    document.head.appendChild(script);
  });

  return window.__synqAOSLoading;
}

async function initAOSOnce() {
  if (window.__synqAOSInited) return;

  try {
    await loadAOSScript();
  } catch (error) {
    console.warn(error);
    return;
  }

  if (!window.AOS) return;

  AOS.init({
    duration: 800,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    once: true,
    offset: 60,
  });

  window.__synqAOSInited = true;
}

function bindMobileMenu() {
  const hamBtn = document.getElementById('ham-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamBtn || !mobileMenu) return;

  if (!hamBtn.dataset.boundMenu) {
    hamBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      hamBtn.classList.toggle('ham-open');
      hamBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    hamBtn.dataset.boundMenu = '1';
  }

  if (!document.documentElement.dataset.boundMenuOutside) {
    document.addEventListener('click', (event) => {
      const btn = document.getElementById('ham-btn');
      const menu = document.getElementById('mobile-menu');
      if (!btn || !menu) return;

      const clickedOutside = !btn.contains(event.target) && !menu.contains(event.target);
      if (clickedOutside && menu.classList.contains('open')) {
        menu.classList.remove('open');
        btn.classList.remove('ham-open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    document.documentElement.dataset.boundMenuOutside = '1';
  }
}

function bindScrollEffects() {
  if (!window.__synqScrollBound) {
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (header) {
        header.style.borderBottomColor = window.scrollY > 50
          ? 'rgba(125, 211, 252, 0.08)'
          : 'rgba(255, 255, 255, 0.06)';
      }

      const scrollBar = document.getElementById('scroll-bar');
      if (scrollBar) {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const total = scrollHeight - clientHeight;
        const scrollPercent = total > 0 ? (scrollTop / total) * 100 : 0;
        scrollBar.style.width = `${scrollPercent}%`;
      }
    }, { passive: true });

    window.__synqScrollBound = true;
  }
}

function initHeroControllerTilt() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const heroLinks = document.querySelectorAll('.hero-controller-link');
  heroLinks.forEach((heroControllerLink) => {
    if (heroControllerLink.dataset.boundTilt) return;

    const maxTilt = 8;
    let frameRequested = false;
    let targetX = 0;
    let targetY = 0;

    function renderTilt() {
      frameRequested = false;
      heroControllerLink.style.setProperty('--tilt-x', `${targetX.toFixed(2)}deg`);
      heroControllerLink.style.setProperty('--tilt-y', `${targetY.toFixed(2)}deg`);
    }

    function scheduleRender() {
      if (frameRequested) return;
      frameRequested = true;
      window.requestAnimationFrame(renderTilt);
    }

    heroControllerLink.addEventListener('mousemove', (event) => {
      const rect = heroControllerLink.getBoundingClientRect();
      const xRatio = (event.clientX - rect.left) / rect.width;
      const yRatio = (event.clientY - rect.top) / rect.height;

      targetY = (xRatio - 0.5) * (maxTilt * 2);
      targetX = (0.5 - yRatio) * (maxTilt * 2);
      scheduleRender();
    });

    heroControllerLink.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      scheduleRender();
    });

    heroControllerLink.dataset.boundTilt = '1';
  });
}

function initGalleryCardTilt() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  const galleryCards = document.querySelectorAll('#gallery a.glass-card');
  const maxTilt = 6;

  galleryCards.forEach((card) => {
    if (card.dataset.boundTilt) return;

    let frameRequested = false;
    let targetX = 0;
    let targetY = 0;

    function renderTilt() {
      frameRequested = false;
      card.style.setProperty('--g-tilt-x', `${targetX.toFixed(2)}deg`);
      card.style.setProperty('--g-tilt-y', `${targetY.toFixed(2)}deg`);
    }

    function scheduleRender() {
      if (frameRequested) return;
      frameRequested = true;
      window.requestAnimationFrame(renderTilt);
    }

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const xRatio = (event.clientX - rect.left) / rect.width;
      const yRatio = (event.clientY - rect.top) / rect.height;

      targetY = (xRatio - 0.5) * (maxTilt * 2);
      targetX = (0.5 - yRatio) * (maxTilt * 2);
      scheduleRender();
    });

    card.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      scheduleRender();
    });

    card.dataset.boundTilt = '1';
  });
}

function initSiteInteractions() {
  bindMobileMenu();
  bindScrollEffects();
  initHeroControllerTilt();
  initGalleryCardTilt();

  if (window.AOS && window.__synqAOSInited && typeof AOS.refreshHard === 'function') {
    AOS.refreshHard();
  }
}

function handleWaitlist(event) {
  event.preventDefault();

  const emailInput = document.getElementById('waitlist-email');
  const msgEl = document.getElementById('waitlist-msg');
  if (!emailInput || !msgEl) return;

  const email = emailInput.value.trim();
  if (!email) return;

  msgEl.textContent = `✓ ${email} 已加入候補名單！我們會盡快聯絡你。`;
  msgEl.style.opacity = '1';
  emailInput.value = '';

  setTimeout(() => {
    msgEl.style.opacity = '0';
  }, 5000);
}

window.handleWaitlist = handleWaitlist;
window.initSiteInteractions = initSiteInteractions;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initAOSOnce();
    initSiteInteractions();
  }, { once: true });
} else {
  initAOSOnce();
  initSiteInteractions();
}

document.addEventListener('layout:updated', () => {
  initAOSOnce();
  initSiteInteractions();
});
