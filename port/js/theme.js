// theme.js — persistent dark/light mode
(function() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  function updateIcon() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const current = document.documentElement.getAttribute('data-theme');
    btn.querySelector('.theme-icon').textContent = current === 'dark' ? '☀' : '☾';
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateIcon();
    const btn = document.getElementById('themeToggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateIcon();
      });
    }

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      }
    });
  });
})();