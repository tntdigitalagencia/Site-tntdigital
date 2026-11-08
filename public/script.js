'use strict';
// Enhancement only: without JavaScript the full navigation and all content remain visible.
document.documentElement.classList.add('js');
const themeToggle = document.querySelector('.theme-toggle');
function applyTheme(theme) {
  const light = theme === 'light';
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  themeToggle.setAttribute('aria-pressed', String(light));
  themeToggle.title = light ? 'Ativar tema escuro' : 'Ativar tema claro';
  document.querySelector('meta[name="theme-color"]').content = light ? '#f7f9fc' : '#060c15';
}
applyTheme(document.documentElement.dataset.theme);
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(next);
  try { localStorage.setItem('tnt-theme', next); } catch (_) { /* Keep working without persistence. */ }
});
// Only expose an operable control. Native button handles Enter and Space.
themeToggle.hidden = false;
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navegacao');
function closeMenu(restoreFocus = false) {
  navigation.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
  if (restoreFocus) toggle.focus();
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.replace('is-pending', 'is-entered');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => {
    // Do not hide initial-viewport content, and never defer off-screen focus targets.
    if (element.getBoundingClientRect().top > window.innerHeight) {
      element.classList.add('is-pending');
      observer.observe(element);
    }
  });
  document.addEventListener('focusin', event => {
    const parent = event.target.closest('.is-pending');
    if (parent) { parent.classList.replace('is-pending', 'is-entered'); observer.unobserve(parent); }
  });
  reduceMotion.addEventListener('change', () => {
    if (reduceMotion.matches) {
      document.querySelectorAll('.is-pending').forEach(element => element.classList.remove('is-pending'));
      observer.disconnect();
    }
  });
}
