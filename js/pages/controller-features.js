// 滾動到指定區塊的函數
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// 點點點擊顯示功能介紹（開關式，在點擊位置顯示）
function toggleFeatureInfo(event, featureName, description, anchorEl) {
  event.stopPropagation(); // 防止事件冒泡
  const targetEl = anchorEl || event.currentTarget || event.target;

  // 創建或更新提示框
  let tooltip = document.getElementById('feature-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'feature-tooltip';
    tooltip.className = 'fixed z-50 bg-dark2 border border-ice/30 rounded-lg px-4 py-3 max-w-xs shadow-lg transition-opacity duration-200';
    document.body.appendChild(tooltip);
  }

  const targetKey = targetEl.dataset.pointId || targetEl.id || '';

  // 檢查是否已經顯示且是同一個點點
  if (tooltip.style.opacity === '1' && tooltip.dataset.target === targetKey) {
    // 如果已經顯示且是同一個點點，則隱藏
    tooltip.style.opacity = '0';
    return;
  }

  // 設置提示框內容和位置
  tooltip.innerHTML = `
    <div class="text-ice font-semibold mb-1">${featureName}</div>
    <div class="text-gray-300 text-sm">${description}</div>
  `;

  // 設置位置在點擊點附近
  const rect = targetEl.getBoundingClientRect();
  tooltip.style.left = rect.left + 'px';
  tooltip.style.top = (rect.top - 80) + 'px';
  tooltip.style.transform = 'translateX(-50%)';
  tooltip.style.opacity = '1';
  tooltip.dataset.target = targetKey;
}

// 點擊其他地方隱藏提示框
document.addEventListener('click', function(event) {
  const tooltip = document.getElementById('feature-tooltip');
  if (tooltip && !tooltip.contains(event.target)) {
    tooltip.style.opacity = '0';
  }
});

// 為照片上的點點添加點擊事件
document.addEventListener('DOMContentLoaded', function() {
  // 背鍵與爆炸圖共用同一套點位綁定
  const featurePoints = document.querySelectorAll('.feature-point');
  featurePoints.forEach((point, index) => {
    point.id = point.id || `feature-point-${index}`;
    point.dataset.pointId = point.id;
    point.addEventListener('click', function(event) {
      const featureName =
        this.dataset.featureName ||
        this.querySelector('div')?.textContent?.trim() ||
        '組件';
      const description = this.dataset.description || '點擊查看詳細資訊';
      toggleFeatureInfo(event, featureName, description, this);
    });
  });
});
