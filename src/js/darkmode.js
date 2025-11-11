function initDarkMode() {
  const toggleBtn = document.getElementById('modeToggle');
  const html = document.documentElement;

  if (!toggleBtn) return; 

  // 1. Ambil tema tersimpan, default ke 'light' jika belum ada
  const savedTheme = localStorage.theme;
  
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
        localStorage.theme = 'light';
    }
  }

  // 🌗 Saat tombol diklik (Logic ini sudah BENAR)
  toggleBtn.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.theme = 'light';
      toggleBtn.textContent = '🌙';
    } else {
      html.classList.add('dark');
      localStorage.theme = 'dark';
      toggleBtn.textContent = '☀️';
    }
  });
}

// Perhatian: Penggunaan setTimeout untuk DOMContentLoaded tidak ideal
// Lebih baik pastikan navbar dimuat sebelum initDarkMode dipanggil.
document.addEventListener("DOMContentLoaded", () => {
    // Jika Anda TIDAK menggunakan include.js, Anda bisa langsung memanggil:
    // initDarkMode();
    
    // Jika Anda menggunakan include.js dan TIDAK bisa memodifikasinya
    // agar ada callback, penggunaan setTimeout terpaksa dilakukan:
    setTimeout(initDarkMode, 500); 
});