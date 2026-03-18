/**
 * js/script.js — NEXUS 品牌官網互動邏輯
 * 作者：NEXUS Frontend Team
 * 架構原則：關注點分離 (Separation of Concerns)
 *
 * 模組說明：
 *  1. AOS.js 捲動動畫初始化
 *  2. 漢堡選單 — 點擊展開 / 收合
 *  3. Navbar — 捲動後邊框變色
 *  4. 捲動進度指示條
 *  5. Waitlist 表單模擬提交
 */

/* =======================================================
   1. AOS (Animate On Scroll) 初始化
   文件：https://michalsnik.github.io/aos/
======================================================= */
AOS.init({
  duration: 800,                         // 每次動畫持續時間 (ms)
  easing:   'cubic-bezier(0.4, 0, 0.2, 1)', // Material Design 標準曲線
  once:     true,                        // 每個元素只觸發一次
  offset:   60,                          // 距視窗底部 60px 時觸發
});


/* =======================================================
   2. 漢堡選單 — 展開 / 收合
   控制行動版 (#mobile-menu) 的 .open class 切換
======================================================= */
const hamBtn     = document.getElementById('ham-btn');
const mobileMenu = document.getElementById('mobile-menu');

/**
 * 切換漢堡選單狀態
 * - mobileMenu：加上/移除 .open（CSS transition 控制高度與透明度）
 * - hamBtn：加上/移除 .ham-open（CSS 控制三條線 → X 動畫）
 * - aria-expanded：更新無障礙屬性
 */
function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.contains('open');
  mobileMenu.classList.toggle('open');
  hamBtn.classList.toggle('ham-open');
  hamBtn.setAttribute('aria-expanded', String(!isOpen));
}

hamBtn.addEventListener('click', toggleMobileMenu);

// 點擊選單「外部區域」時自動收合
document.addEventListener('click', (event) => {
  const clickedOutside =
    !hamBtn.contains(event.target) &&
    !mobileMenu.contains(event.target);

  if (clickedOutside && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    hamBtn.classList.remove('ham-open');
    hamBtn.setAttribute('aria-expanded', 'false');
  }
});


/* =======================================================
   3. Navbar 捲動變色
   捲動超過 50px 後，讓底部邊框微微發亮，強化層次感
======================================================= */
const header = document.querySelector('header');

function handleNavbarScroll() {
  if (window.scrollY > 50) {
    header.style.borderBottomColor = 'rgba(125, 211, 252, 0.08)'; // 冰藍微光
  } else {
    header.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)'; // 預設白色
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });


/* =======================================================
   4. 捲動進度指示條
   計算目前捲動百分比，即時更新 #scroll-bar 的寬度
======================================================= */
const scrollBar = document.getElementById('scroll-bar');

function updateScrollBar() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
  scrollBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollBar, { passive: true });


/* =======================================================
   5. Waitlist 表單模擬提交
   實際部署時，可將此函式替換為 fetch() 呼叫後端 API
======================================================= */

/**
 * 處理 Waitlist 表單送出事件
 * @param {SubmitEvent} event - 表單提交事件
 */
function handleWaitlist(event) {
  event.preventDefault(); // 阻止預設頁面跳轉

  const emailInput = document.getElementById('waitlist-email');
  const msgEl      = document.getElementById('waitlist-msg');
  const email      = emailInput.value.trim();

  if (!email) return;

  // 顯示成功訊息
  msgEl.textContent  = `✓ ${email} 已加入候補名單！我們會盡快聯絡你。`;
  msgEl.style.opacity = '1';

  // 清空輸入欄
  emailInput.value = '';

  // 5 秒後淡出訊息
  setTimeout(() => {
    msgEl.style.opacity = '0';
  }, 5000);
}

// 將 handleWaitlist 掛載到全域（供 HTML onsubmit 呼叫）
window.handleWaitlist = handleWaitlist;
