function initDarkMode() {
  const toggleBtn = document.getElementById('modeToggle');
  const html = document.documentElement;

  if (!toggleBtn) {
    console.warn('Dark mode toggle button not found. Make sure the navbar is loaded first.');
    return;
  }

  // 1. Ambil tema tersimpan, default ke 'light' jika belum ada
  const savedTheme = localStorage.getItem('theme');

  // 2. Terapkan mode hanya berdasarkan Local Storage
  if (savedTheme === 'dark') {
    html.classList.add('dark');
    toggleBtn.textContent = '☀️'; // Icon mode gelap
  } else {
    // Jika 'light' atau tidak ada (undefined), gunakan mode terang
    html.classList.remove('dark');
    toggleBtn.textContent = '🌙'; // Icon mode terang

    // Opsional: Pastikan Local Storage diinisialisasi ke 'light'
    // agar pengecekan berikutnya lebih mudah, tetapi tidak wajib.
    if (!savedTheme) {
        localStorage.setItem('theme', 'light');
    }
  }

  // 🌗 Saat tombol diklik (Logic ini sudah BENAR)
  toggleBtn.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      toggleBtn.textContent = '🌙';
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      toggleBtn.textContent = '☀️';
    }
  });
}

// Only run if DOM is already loaded, otherwise wait for it
if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", initDarkMode);
} else {
  // DOM is already loaded, try to initialize directly
  // Delay slightly to ensure elements are available after inclusion
  setTimeout(initDarkMode, 100);
}