(function initHeroRain() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const stage = document.getElementById('hero-rain-stage');
  const heroSection = document.getElementById('hero');
  if (!stage) return;
  if (!heroSection) return;

  const sources = [
    'assets/img/rain/controller-front.jpg',
    'assets/img/rain/controller-back.jpg',
    'assets/img/rain/controller-gears.jpg',
    'assets/img/rain/keyboard-main.jpg',
    'assets/img/rain/macro-main.jpg',
    'assets/img/rain/macro-croma.jpg',
    'assets/img/rain/macro-gears.jpg',
    'assets/img/rain/synth-main.jpg',
    'assets/img/rain/software-controller.jpg',
    'assets/img/rain/software-macro.jpg',
  ];

  const links = {
    'assets/img/rain/controller-front.jpg': 'controller.html',
    'assets/img/rain/controller-back.jpg': 'controller.html',
    'assets/img/rain/controller-gears.jpg': 'controller.html',
    'assets/img/rain/keyboard-main.jpg': 'coming.html',
    'assets/img/rain/macro-main.jpg': 'macro.html',
    'assets/img/rain/macro-croma.jpg': 'macro.html',
    'assets/img/rain/macro-gears.jpg': 'macro.html',
    'assets/img/rain/synth-main.jpg': '#waitlist',
  };

  let stageW = 0;
  let stageH = 0;
  let rafId = null;
  let lastTs = 0;
  const drops = [];
  const lanes = [];
  let laneCount = 0;
  let maxDrops = 0;
  let pool = [];
  let poolIndex = 0;
  let nowSec = 0;
  let isRunning = false;
  let isHeroVisible = false;
  const fpsInterval = 1000 / 45;
  let lastPaintTs = 0;

  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function nextImage() {
    if (!pool.length || poolIndex >= pool.length) {
      pool = shuffle(sources);
      poolIndex = 0;
    }
    const src = pool[poolIndex];
    poolIndex += 1;
    return src;
  }

  function warmupImages() {
    for (const src of sources) {
      const img = new Image();
      img.decoding = 'async';
      img.loading = 'eager';
      img.src = src;
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {});
      }
    }
  }

  function setStageSize() {
    const rect = stage.getBoundingClientRect();
    stageW = rect.width;
    stageH = rect.height;
  }

  function createDrop(lane, initialOffsetY = null) {
    const link = document.createElement('a');
    link.className = 'hero-rain-drop';
    link.setAttribute('tabindex', '-1');
    link.setAttribute('aria-hidden', 'true');

    const img = document.createElement('img');
    img.loading = 'eager';
    img.decoding = 'async';
    link.appendChild(img);
    stage.appendChild(link);

    const width = Math.round(90 + Math.random() * 112);
    const laneJitter = (Math.random() - 0.5) * lane.width * 0.45;
    const x = Math.max(0, Math.min(stageW - width, lane.x + laneJitter - width / 2));
    const y = initialOffsetY === null ? -(width + Math.random() * 180) : initialOffsetY;
    const rotate = -18 + Math.random() * 36;
    const speed = 56 + Math.random() * 52;
    const swayAmp = 2 + Math.random() * 9;
    const swayFreq = 0.3 + Math.random() * 0.65;
    const src = nextImage();

    link.style.setProperty('--drop-w', `${width}px`);
    link.href = links[src] || '#';
    img.src = src;
    img.alt = 'SYNQ Product';

    const drop = { el: link, x, y, baseX: x, rotate, speed, swayAmp, swayFreq, phase: Math.random() * Math.PI * 2 };
    drops.push(drop);
  }

  function spawnForLane(lane, firstFill = false) {
    if (firstFill) {
      const initialY = Math.random() * (stageH + 260) - 220;
      createDrop(lane, initialY);
    } else {
      createDrop(lane, null);
    }
  }

  function configureLanes() {
    laneCount = window.innerWidth < 640 ? 3 : window.innerWidth < 1024 ? 4 : 5;
    maxDrops = laneCount * 4;
    const laneWidth = stageW / laneCount;
    lanes.length = 0;

    for (let i = 0; i < laneCount; i += 1) {
      lanes.push({
        x: laneWidth * (i + 0.5),
        width: laneWidth,
        nextSpawnAt: nowSec + Math.random() * 1.8,
      });
    }
  }

  function frame(ts) {
    if (!lastTs) lastTs = ts;
    if (lastPaintTs && ts - lastPaintTs < fpsInterval) {
      rafId = window.requestAnimationFrame(frame);
      return;
    }

    const dt = Math.min(0.033, (ts - lastTs) / 1000);
    lastTs = ts;
    lastPaintTs = ts;
    nowSec = ts / 1000;

    for (const lane of lanes) {
      if (nowSec >= lane.nextSpawnAt && drops.length < maxDrops) {
        spawnForLane(lane, false);
        lane.nextSpawnAt = nowSec + 1.35 + Math.random() * 1.15;
      }
    }

    for (let i = drops.length - 1; i >= 0; i -= 1) {
      const d = drops[i];
      d.y += d.speed * dt;
      const sway = Math.sin(nowSec * d.swayFreq + d.phase) * d.swayAmp;
      d.x = d.baseX + sway;

      d.el.style.transform = `translate3d(${d.x}px, ${d.y}px, 0) rotate(${d.rotate}deg)`;

      if (d.y > stageH + 180) {
        d.el.remove();
        drops.splice(i, 1);
      }
    }

    rafId = window.requestAnimationFrame(frame);
  }

  function startAnimation() {
    if (isRunning) return;
    isRunning = true;
    lastTs = 0;
    lastPaintTs = 0;
    rafId = window.requestAnimationFrame(frame);
  }

  function stopAnimation() {
    if (!isRunning) return;
    isRunning = false;
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function resetDrops() {
    setStageSize();
    nowSec = performance.now() / 1000;
    configureLanes();
    for (const d of drops) d.el.remove();
    drops.length = 0;
    for (const lane of lanes) {
      spawnForLane(lane, true);
    }
  }

  warmupImages();
  resetDrops();
  startAnimation();

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resetDrops();
      if (isHeroVisible && !document.hidden) startAnimation();
    }, 140);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAnimation();
    } else if (isHeroVisible) {
      startAnimation();
    }
  });

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target !== heroSection) continue;
        isHeroVisible = entry.isIntersecting && entry.intersectionRatio > 0.15;
        if (isHeroVisible && !document.hidden) {
          startAnimation();
        } else {
          stopAnimation();
        }
      }
    },
    { threshold: [0, 0.15, 0.35] }
  );
  io.observe(heroSection);

  window.addEventListener('beforeunload', () => {
    io.disconnect();
    stopAnimation();
  });
})();
