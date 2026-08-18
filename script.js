// ---------- mobile menu ----------
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? 'Close' : 'Menu';
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.textContent = 'Menu';
    }
  });
}

// ---------- project filter ----------
const chips = document.querySelectorAll('.chip');
const rows = document.querySelectorAll('.row');
const countEl = document.getElementById('count');
const emptyEl = document.getElementById('empty');

function applyFilter(type) {
  let shown = 0;

  rows.forEach((row) => {
    const match = type === 'all' || row.dataset.type === type;
    row.classList.toggle('is-out', !match);
    if (match) shown++;
  });

  if (countEl) {
    countEl.textContent = `${shown} of ${rows.length} shown`;
  }
  if (emptyEl) {
    emptyEl.hidden = shown !== 0;
  }
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('is-on'));
    chip.classList.add('is-on');
    applyFilter(chip.dataset.filter);
  });
});

if (rows.length) {
  applyFilter('all');
}

// ---------- side rail highlight ----------
const railItems = document.querySelectorAll('.rail-item');

if (railItems.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        railItems.forEach((item) => {
          item.classList.toggle('is-live', item.dataset.rail === entry.target.id);
        });
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );

  ['intro', 'work', 'toolkit'].forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
}