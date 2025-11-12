// Data contoh artikel
const artikelData = [
  { judul: "Pentingnya Sarapan Sehat", gambar: "./assets/artikel/pentingnyaSS.png", deskripsi: "Sarapan membantu menjaga energi sepanjang hari." },
  { judul: "Manfaat Buah dan Sayur", gambar: "./assets/artikel/buahDS.png", deskripsi: "Buah dan sayur kaya akan vitamin dan serat penting." },
  { judul: "Air Putih untuk Kesehatan", gambar: "./assets/artikel/air.png", deskripsi: "Minum air cukup membantu fungsi tubuh optimal." },
  { judul: "Gizi Seimbang Itu Mudah", gambar: "./assets/artikel/gizi.png", deskripsi: "Pahami porsi karbohidrat, protein, dan lemak sehat." },
  { judul: "Bahaya Makanan Cepat Saji", gambar: "assets/artikel5.jpg", deskripsi: "Terlalu sering makan fast food bisa picu obesitas." },
  { judul: "Tips Diet Sehat", gambar: "assets/artikel6.jpg", deskripsi: "Diet sehat bukan berarti tidak makan, tapi seimbang." },
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
const ARTIKEL_PER_HALAMAN = 4;

// Fungsi render artikel
function renderArtikel() {
  const sisa = artikelData.length - artikelTampil;
  const tampilSekarang = artikelData.slice(artikelTampil, artikelTampil + ARTIKEL_PER_HALAMAN);

  tampilSekarang.forEach((item) => {
    const card = document.createElement("div");
    card.className =
          "article-card bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden w-full sm:max-w-sm animate-fadeInUp flex flex-col";


    card.innerHTML = `
      <img src="${item.gambar}" alt="${item.judul}" class="w-full h-48 object-cover ">
      <div class="p-4">
        <h3 class="font-bold text-green-700 dark:text-green-400 mb-2">${item.judul}</h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm">${item.deskripsi}</p>
      </div>
    `;




    card.addEventListener("click", () => {
      Swal.fire({
        title: item.judul,
        text: "Fitur detail artikel akan segera hadir 🚀",
        icon: "info",
        confirmButtonColor: "#16a34a", // hijau
        confirmButtonText: "Oke!",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937" // dark background
          : "#ffffff", // light background
        color: document.documentElement.classList.contains("dark")
          ? "#d1fae5" // teks warna hijau muda di dark mode
          : "#166534", // teks hijau tua di light mode
      });
    });
    container.appendChild(card);
  });

  artikelTampil += tampilSekarang.length;
  if (artikelTampil >= artikelData.length) {
    loadMoreBtn.classList.add("hidden");
  } else {
    loadMoreBtn.classList.remove("hidden");
  }
}

// Tombol “Lihat Lainnya”
loadMoreBtn.addEventListener("click",()=>{
  Swal.fire({
        title: "Coming Soon 🚀",
        text: "Fitur detail artikel akan segera hadir!",
        icon: "info",
        confirmButtonColor: "#16a34a", // hijau
        confirmButtonText: "Oke!",
        background: document.documentElement.classList.contains("dark")
          ? "#1f2937" // dark background
          : "#ffffff", // light background
        color: document.documentElement.classList.contains("dark")
          ? "#d1fae5" // teks warna hijau muda di dark mode
          : "#166534", // teks hijau tua di light mode
      });
    });


// Jalankan pertama kali
renderArtikel();
