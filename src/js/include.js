
async function includeHTML() {


  const elements = document.querySelectorAll('[data-include]');
  for (const el of elements) {
    const file = el.getAttribute('data-include');
    try {
      const response = await fetch(file);
      if (response.ok) {
        el.innerHTML = await response.text();
      } else {
        el.innerHTML = "Komponen gagal dimuat.";
      }
    } catch (err) {
      console.error("Error memuat file:", file, err);
    }
  }
  
  
  const navbarElement = document.querySelector('[data-include*="navbar"]');
  if (navbarElement && navbarElement.innerHTML.includes('modeToggle')) {
    initNavbarToggle();
    
    if (typeof initDarkMode === 'function') {
     
      setTimeout(initDarkMode, 50);
    }
  }
}
document.addEventListener("DOMContentLoaded", includeHTML);

function initNavbarToggle() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!menuBtn || !mobileMenu) return; 

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuBtn.innerHTML = mobileMenu.classList.contains('hidden')
      ? `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             d="M4 6h16M4 12h16M4 18h16"></path>
         </svg>`
      : `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             d="M6 18L18 6M6 6l12 12"></path>
         </svg>`;
  });

  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}
