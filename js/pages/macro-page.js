function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  const mainImage = document.getElementById('macro-view-image');
  const viewButtons = document.querySelectorAll('.view-btn');

  viewButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!mainImage) return;
      const src = btn.dataset.src;
      const alt = btn.dataset.alt || 'SYNQ Shift-16 圖片';

      mainImage.src = src;
      mainImage.alt = alt;

      viewButtons.forEach((item) => item.classList.remove('active'));
      btn.classList.add('active');
    });
  });
});
