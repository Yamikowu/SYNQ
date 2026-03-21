(function initSoftwarePreview() {
  const actionButtons = Array.from(document.querySelectorAll('.action-btn'));
  const keyCells = Array.from(document.querySelectorAll('.key-cell'));
  const mappingLog = document.getElementById('mapping-log');
  let selectedAction = 'Cut';

  const presetMaps = {
    editing: ['Cut', 'Ripple', 'Marker', 'Render', 'Mute', 'Solo', 'Undo', 'Save', 'Track +', 'Track -', 'Layer A', 'Layer B', 'Scene 1', 'Scene 2', 'Preview', 'Publish'],
    stream: ['Scene A', 'Scene B', 'Ad Break', 'Replay', 'Mute Mic', 'Push Talk', 'BGM -', 'BGM +', 'Chat Pin', 'Clip', 'Overlay 1', 'Overlay 2', 'Cam 1', 'Cam 2', 'Record', 'Go Live'],
    music: ['Kick', 'Snare', 'Hat', 'Bass', 'Mute', 'Solo', 'Undo', 'Redo', 'Oct +', 'Oct -', 'Chord 1', 'Chord 2', 'FX A', 'FX B', 'Loop', 'Export'],
  };

  const presetButtons = Array.from(document.querySelectorAll('.macro-preset-btn'));

  function applyPreset(name) {
    const items = presetMaps[name] || presetMaps.editing;
    keyCells.forEach((cell, index) => {
      const label = cell.querySelector('.key-value');
      if (label) label.textContent = items[index] || 'Action';
    });
    mappingLog.textContent = '已載入 Preset：' + name;
  }

  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      presetButtons.forEach((item) => item.classList.remove('active'));
      btn.classList.add('active');
      applyPreset(btn.dataset.preset || 'editing');
    });
  });

  actionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      actionButtons.forEach((item) => item.classList.remove('active'));
      btn.classList.add('active');
      selectedAction = btn.dataset.action || 'Cut';
      mappingLog.textContent = '目前選擇功能：' + selectedAction;
    });
  });

  keyCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      keyCells.forEach((item) => item.classList.remove('active'));
      cell.classList.add('active');
      const valueEl = cell.querySelector('.key-value');
      if (valueEl) valueEl.textContent = selectedAction;
      mappingLog.textContent = cell.dataset.key + ' 已映射為 ' + selectedAction;
    });
  });

  const knobModeButtons = Array.from(document.querySelectorAll('.knob-mode-btn'));
  const knobSlider = document.getElementById('knob-slider');
  const knobValue = document.getElementById('knob-value');
  const knobMode = document.getElementById('knob-mode');
  const knobRing = document.getElementById('knob-ring');
  const knobLog = document.getElementById('knob-log');
  const knobCwFn = document.getElementById('knob-cw-fn');
  const knobCcwFn = document.getElementById('knob-ccw-fn');
  let currentMode = 'Timeline';

  function renderKnob() {
    const value = Number(knobSlider.value);
    knobValue.textContent = String(value);
    knobMode.textContent = currentMode.toUpperCase();
    knobRing.style.setProperty('--knob-progress', value + '%');
    const cw = knobCwFn ? knobCwFn.value : 'Next Frame';
    const ccw = knobCcwFn ? knobCcwFn.value : 'Prev Frame';
    knobLog.textContent = '模式：' + currentMode + '，輸出值：' + value + '，右旋：' + cw + '，左旋：' + ccw;
  }

  knobModeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      knobModeButtons.forEach((item) => item.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.dataset.mode || 'Timeline';
      renderKnob();
    });
  });

  knobSlider.addEventListener('input', renderKnob);
  if (knobCwFn) knobCwFn.addEventListener('change', renderKnob);
  if (knobCcwFn) knobCcwFn.addEventListener('change', renderKnob);

  renderKnob();

  const macroProfiles = {
    fps: ['Aim Assist On', 'Rapid Fire Mapped', 'Back Key Sprint'],
    moba: ['Skill Combo Chain', 'Ping + Ward Combo', 'Ultimate Safety Delay'],
    creator: ['Scene Switch', 'Record Toggle', 'Export Preset'],
  };

  const profileButtons = Array.from(document.querySelectorAll('.macro-profile-btn'));
  const macroSteps = document.getElementById('macro-steps');
  const macroLog = document.getElementById('macro-log');
  const runMacro = document.getElementById('run-macro');
  let selectedProfile = 'fps';

  function renderProfile(profileKey) {
    macroSteps.innerHTML = '';
    (macroProfiles[profileKey] || []).forEach((step, index) => {
      const el = document.createElement('div');
      el.className = 'step-chip rounded-xl p-4';
      el.innerHTML = '<p class="text-xs font-mono text-gray-400 tracking-widest mb-2">STEP 0' + (index + 1) + '</p><p class="text-sm text-white">' + step + '</p>';
      macroSteps.appendChild(el);
    });

    const labels = {
      fps: 'FPS 競技',
      moba: 'MOBA 連招',
      creator: 'Creator 快捷',
    };

    macroLog.textContent = '目前配置：' + labels[profileKey] + '，按下模擬可查看觸發順序。';
  }

  profileButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      profileButtons.forEach((item) => item.classList.remove('active'));
      btn.classList.add('active');
      selectedProfile = btn.dataset.profile || 'fps';
      renderProfile(selectedProfile);
    });
  });

  runMacro.addEventListener('click', () => {
    const steps = macroProfiles[selectedProfile] || [];
    if (!steps.length) return;
    macroLog.textContent = '模擬執行：' + steps.join(' → ');
  });

  applyPreset('editing');
  renderProfile(selectedProfile);
})();
