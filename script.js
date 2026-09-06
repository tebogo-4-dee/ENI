/* =============================================
   ENI GROUP — MAIN JAVASCRIPT
   Enterprise Network International Group
   Version: 1.0 | September 2026
============================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavScroll();
  initReducedMotion();
});

/* =============================================
   MOBILE MENU TOGGLE
============================================= */
function initMobileMenu() {
  const navbar     = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks   = document.getElementById('navLinks');
  if (!menuToggle || !navbar) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('open');
    const icon   = menuToggle.querySelector('i');

    if (isOpen) {
      icon.classList.replace('fa-bars', 'fa-xmark');
      menuToggle.setAttribute('aria-expanded', 'true');
    } else {
      icon.classList.replace('fa-xmark', 'fa-bars');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when a nav link is clicked
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.replace('fa-xmark', 'fa-bars');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navbar.classList.contains('open') &&
        !navbar.contains(e.target)) {
      navbar.classList.remove('open');
      const icon = menuToggle.querySelector('i');
      icon.classList.replace('fa-xmark', 'fa-bars');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* =============================================
   NAVBAR SCROLL SHADOW
============================================= */
function initNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 40px rgba(0,0,0,0.5)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* =============================================
   RESPECT REDUCED MOTION
   Stops the partners carousel for users who
   have requested reduced motion in their OS
============================================= */
function initReducedMotion() {
  const track = document.getElementById('partnersTrack');
  if (!track) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    track.style.animation = 'none';
    // Show items as a static flex row when animation is off
    track.style.flexWrap = 'wrap';
    track.style.justifyContent = 'center';
    // Remove the duplicate set so it doesn't double up visually
    const allItems = track.querySelectorAll('.partner-logo-item');
    const half = Math.floor(allItems.length / 2);
    for (let i = half; i < allItems.length; i++) {
      allItems[i].style.display = 'none';
    }
  }
}
