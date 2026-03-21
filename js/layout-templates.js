window.SYNQ_LAYOUT_TEMPLATES = {
  navbar: `
<header class="glass-nav fixed top-0 left-0 right-0 z-50">
  <nav class="max-w-7xl mx-auto px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <a href="index.html" class="flex items-center gap-2 group" aria-label="SYNQ 首頁">
        <div class="w-7 h-7 relative">
          <div class="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
            <div class="bg-ice rounded-sm animate-glow-pulse"></div>
            <div class="bg-white/20 rounded-sm"></div>
            <div class="bg-white/20 rounded-sm"></div>
            <div class="bg-neon rounded-sm animate-neon-pulse"></div>
          </div>
        </div>
        <span class="text-white font-black text-xl tracking-[0.15em] font-mono group-hover:text-ice transition-colors duration-300">SYNQ</span>
      </a>

      <ul class="hidden lg:flex items-center gap-8" role="list">
        <li><a href="controller.html" data-nav="controller" class="text-sm font-medium text-gray-400 hover:text-ice transition-colors duration-200 tracking-wide">Controller</a></li>
        <li><a href="macro.html" data-nav="macro" class="text-sm font-medium text-gray-400 hover:text-ice transition-colors duration-200 tracking-wide">Macro</a></li>
        <li><a href="software.html" data-nav="software" class="text-sm font-medium text-gray-400 hover:text-ice transition-colors duration-200 tracking-wide">Download</a></li>
        <li><a href="coming.html" data-nav="coming" class="text-sm font-medium text-gray-400 hover:text-ice transition-colors duration-200 tracking-wide">Coming Soon</a></li>
        </ul>

      <div class="flex items-center gap-4">
        <a href="#waitlist" class="btn-waitlist hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-semibold">
          Join Waitlist
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
        <button id="ham-btn" class="lg:hidden flex flex-col justify-center gap-[6px] w-8 h-8 focus:outline-none" aria-label="開啟選單" aria-expanded="false">
          <span class="ham-line block h-px bg-white w-6"></span>
          <span class="ham-line block h-px bg-white w-6"></span>
          <span class="ham-line block h-px bg-white w-4"></span>
        </button>
      </div>
    </div>

    <div id="mobile-menu" class="lg:hidden" role="navigation" aria-label="行動版選單">
      <div class="py-4 border-t border-white/05 flex flex-col gap-1">
        <a href="controller.html" data-nav="controller" class="px-3 py-3 text-sm text-gray-300 hover:text-ice hover:bg-white/5 rounded-lg transition-all">Controller</a>
        <a href="macro.html" data-nav="macro" class="px-3 py-3 text-sm text-gray-300 hover:text-ice hover:bg-white/5 rounded-lg transition-all">Macro</a>
        <a href="software.html" data-nav="software" class="px-3 py-3 text-sm text-gray-300 hover:text-ice hover:bg-white/5 rounded-lg transition-all">Software</a>
        <a href="coming.html" data-nav="coming" class="px-3 py-3 text-sm text-gray-300 hover:text-ice hover:bg-white/5 rounded-lg transition-all">Coming Soon</a>
        <div class="pt-3 pb-1">
          <a href="#waitlist" class="btn-waitlist flex items-center justify-center gap-2 w-full py-3 rounded-lg text-white text-sm font-semibold">
            Join Waitlist →
          </a>
        </div>
      </div>
    </div>
  </nav>
</header>`,

  footer: `
<footer class="border-t border-white/06 bg-dark">
  <div class="max-w-7xl mx-auto px-6 py-16">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">
      <div class="col-span-2 lg:col-span-2">
        <div class="flex items-center gap-2 mb-5">
          <div class="w-6 h-6 relative">
            <div class="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-0.5">
              <div class="bg-ice rounded-sm"></div>
              <div class="bg-white/15 rounded-sm"></div>
              <div class="bg-white/15 rounded-sm"></div>
              <div class="bg-neon rounded-sm"></div>
            </div>
          </div>
          <span class="text-white font-black text-lg tracking-[0.15em] font-mono">SYNQ</span>
        </div>
        <p class="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">次世代 AI 硬體生態系。<br/>融合人工智慧與實體觸感，重新定義你與科技的連結。</p>
        <div class="flex items-center gap-2" aria-label="社群媒體連結">
          <a href="#" class="social-btn" aria-label="X (Twitter)"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
          <a href="#" class="social-btn" aria-label="Instagram"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
          <a href="#" class="social-btn" aria-label="YouTube"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          <a href="#" class="social-btn" aria-label="GitHub"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg></a>
        </div>
      </div>
      <div><h4 class="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase mb-5">Products</h4><ul class="space-y-3"><li><a href="controller.html" class="footer-link">AI Controller</a></li><li><a href="macro.html" class="footer-link">Macro Deck</a></li><li><a href="coming.html" class="footer-link">Coming Soon</a></li></ul></div>
      <div><h4 class="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase mb-5">Software</h4><ul class="space-y-3"><li><a href="software.html" class="footer-link">SYNQ Hub</a></li><li><a href="#" class="footer-link">SDK & API</a></li><li><a href="#" class="footer-link">Community</a></li></ul></div>
      <div><h4 class="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase mb-5">Company</h4><ul class="space-y-3"><li><a href="#" class="footer-link">About</a></li><li><a href="index.html" class="footer-link">Press</a></li><li><a href="#" class="footer-link">Contact</a></li></ul></div>
    </div>
    <div class="pt-8 border-t border-white/06 flex flex-col sm:flex-row items-center justify-between gap-4"><p class="text-xs text-gray-600 font-mono">© 2026 SYNQ Technologies Inc. All rights reserved.</p><div class="flex items-center gap-6"><a href="#" class="text-xs text-gray-600 hover:text-gray-400 transition-colors">Privacy Policy</a><a href="#" class="text-xs text-gray-600 hover:text-gray-400 transition-colors">Terms of Service</a><div class="flex items-center gap-1.5"><div class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div><span class="text-xs text-gray-600 font-mono">All Systems Operational</span></div></div></div>
  </div>
</footer>`,
};
