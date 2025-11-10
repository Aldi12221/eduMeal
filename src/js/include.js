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
}
document.addEventListener("DOMContentLoaded", includeHTML);
// js/include.js
document.addEventListener("DOMContentLoaded", function () {
  const includeElements = document.querySelectorAll("[data-include]");
  
  includeElements.forEach(async el => {
    const file = el.getAttribute("data-include");
    const response = await fetch(file);
    const html = await response.text();
    el.innerHTML = html;

    // 🧠 Tambahkan inisialisasi setelah navbar selesai dimuat
    if (file.includes("navbar.html")) {
      initNavbarToggle();
    }
  });
});

// 🧩 Fungsi toggle menu dipisahkan
function initNavbarToggle() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!menuBtn || !mobileMenu) return; // pastikan elemen ditemukan

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
