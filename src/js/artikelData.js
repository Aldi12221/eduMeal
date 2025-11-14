// Data contoh artikel
const artikelData = [
  { judul: "Pentingnya Sarapan Sehat", gambar: "./assets/artikel/pentingnyaSS.png", deskripsi: "Sarapan membantu menjaga energi sepanjang hari." },
  { judul: "Manfaat Buah dan Sayur", gambar: "./assets/artikel/buahDS.png", deskripsi: "Buah dan sayur kaya akan vitamin dan serat penting." },
  { judul: "Air Putih untuk Kesehatan", gambar: "./assets/artikel/air.png", deskripsi: "Minum air cukup membantu fungsi tubuh optimal." },
  { judul: "Gizi Seimbang Itu Mudah", gambar: "./assets/artikel/gizi.png", deskripsi: "Pahami porsi karbohidrat, protein, dan lemak sehat." },
  { judul: "Bahaya Makanan Cepat Saji", gambar: "assets/artikel/bahaya-makanan-cepat-saji.jpg", deskripsi: "Terlalu sering makan fast food bisa picu obesitas." },
  { judul: "Tips Diet Sehat", gambar: "assets/artikel/tips-diet-sehat.jpg", deskripsi: "Diet sehat bukan berarti tidak makan, tapi seimbang." },
  { judul: "Olahraga Ringan di Rumah", gambar: "assets/artikel7.jpg", deskripsi: "Rutin bergerak bantu bakar kalori dan jaga mood." },
  { judul: "Pahami Label Gizi", gambar: "assets/artikel8.jpg", deskripsi: "Label gizi bantu kamu memilih makanan dengan bijak." },
  { judul: "Protein Nabati vs Hewani", gambar: "assets/artikel9.jpg", deskripsi: "Keduanya penting untuk tubuh, tapi punya kelebihan berbeda." },
  { judul: "Kebutuhan Kalori Harian", gambar: "assets/artikel10.jpg", deskripsi: "Ketahui kebutuhan kalori agar pola makan tetap sehat." },
  { judul: "Vitamin D dari Matahari", gambar: "assets/artikel11.jpg", deskripsi: "Sinar matahari membantu tubuh memproduksi vitamin D." },
  { judul: "Kendalikan Gula dalam Makanan", gambar: "assets/artikel12.jpg", deskripsi: "Konsumsi gula berlebihan dapat meningkatkan risiko diabetes." }
];

// Elemen target
const container = document.getElementById("artikelContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let artikelTampil = 0;
const ARTIKEL_PER_HALAMAN = 6;

// Fungsi render artikel
function renderArtikel() {
  const tampilSekarang = artikelData.slice(artikelTampil, artikelTampil + ARTIKEL_PER_HALAMAN);

  tampilSekarang.forEach((item) => {
    const card = document.createElement("div");
    card.className = `
      article-card bg-white dark:bg-gray-800 rounded-xl shadow-md 
      overflow-hidden w-full sm:max-w-sm transform transition-all duration-500
      hover:-translate-y-2 hover:shadow-xl hover:shadow-green-300/30 
      dark:hover:shadow-green-500/20 cursor-pointer group
    `;

    card.innerHTML = `
      <div class="overflow-hidden">
        <img 
          src="${item.gambar}" 
          alt="${item.judul}" 
          class="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div class="p-4 transition-all duration-500 group-hover:-translate-y-1">
        <h3 class="font-bold text-green-700 dark:text-green-400 mb-2 text-lg">${item.judul}</h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">${item.deskripsi}</p>
      </div>
    `;

    // Efek klik: SweetAlert
    card.addEventListener("click", () => {
      Swal.fire({
        title: item.judul,
        text: "Fitur detail artikel akan segera hadir 🚀",
        icon: "info",
        confirmButtonColor: "#16a34a",
        confirmButtonText: "Oke!",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#d1fae5"
          : "#166534",
      });
    });

    container.appendChild(card);
  });

  artikelTampil += tampilSekarang.length;
  loadMoreBtn.classList.toggle("hidden", artikelTampil >= artikelData.length);
}

// Tombol “Lihat Lainnya”
loadMoreBtn.addEventListener("click", () => {
  Swal.fire({
    title: "Coming Soon 🚀",
    text: "Fitur detail artikel akan segera hadir!",
    icon: "info",
    confirmButtonColor: "#16a34a",
    confirmButtonText: "Oke!",
    background: document.documentElement.classList.contains("dark")
      ? "#1f2937"
      : "#ffffff",
    color: document.documentElement.classList.contains("dark")
      ? "#d1fae5"
      : "#166534",
  });
});

// Jalankan pertama kali
renderArtikel();
