const container = document.getElementById("artikelContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const artikelModal = document.getElementById("artikelModal");
const modalJudul = document.getElementById("modalJudul");
const modalIsi = document.getElementById("modalIsi");
const modalGambar = document.getElementById("modalGambar");
const closeModal = document.getElementById("closeModal");
const modalPenulis = document.getElementById("modalPenulis");
const modalJam = document.getElementById("modalJam");

let artikelTampil = 0;
const ARTIKEL_PER_HALAMAN = 6;
let scrollY = 0;
let artikelData = []; // Variabel untuk menyimpan data yang di-fetch

/**
 * Fungsi untuk mengambil data artikel dari file JSON.
 */
async function fetchArtikelData() {
    try {
        // Lakukan fetch ke file artikelData.json
        const response = await fetch('artikelData.json'); 
        
        // Cek jika respons tidak OK (misal file tidak ditemukan)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Ubah respons menjadi objek JavaScript (array)
        artikelData = await response.json(); 
        
        // Setelah data berhasil diambil, mulai render artikel
        renderArtikel(); 
        
    } catch (error) {
        console.error("Gagal mengambil data artikel:", error);
        // Tampilkan pesan error kepada pengguna jika perlu
        container.innerHTML = `<p class="text-red-500 text-center col-span-full">Gagal memuat artikel. Silakan coba lagi nanti.</p>`;
    }
}


/**
 * Fungsi untuk merender artikel ke dalam container.
 * Sekarang menggunakan 'artikelData' global yang sudah diisi oleh fetch.
 */
function renderArtikel() {
  const tampilSekarang = artikelData.slice(
    artikelTampil,
    artikelTampil + ARTIKEL_PER_HALAMAN
  );

  tampilSekarang.forEach((item) => {
    const card = document.createElement("div");
    card.className = `
      article-card bg-white dark:bg-gray-800 rounded-xl shadow-md
      overflow-hidden w-full sm:max-w-sm transform transition-all duration-500
      hover:-translate-y-2 hover:shadow-xl hover:shadow-green-300/30
      dark:hover:shadow-green-500/20 cursor-pointer group
    `;

    // Pastikan properti artikel aman (misal: jika gambar kosong)
    const gambarSrc = item.gambar || 'placeholder.png'; 

    card.innerHTML = `
      <div class="overflow-hidden">
        <img 
          src="${gambarSrc}" 
          alt="${item.judul}" 
          class="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div class="p-4 transition-all duration-500 group-hover:-translate-y-1">
        <h3 class="font-bold text-green-700 dark:text-green-400 mb-2 text-lg">
          ${item.judul}
        </h3>

        <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">
          ${item.deskripsi}
        </p>

        <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span class="flex items-center gap-1">
            <i class="fa-regular fa-user"></i> ${item.penulis || "Admin"}
          </span>

          <span class="flex items-center gap-1">
            <i class="fa-regular fa-clock"></i> ${item.jam || "Baru saja"}
          </span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => bukaDetailArtikel(item));
    
    container.appendChild(card);
  });

  artikelTampil += tampilSekarang.length;
  // Pastikan tombol tersembunyi jika tidak ada data atau sudah semua ditampilkan
  loadMoreBtn.classList.toggle("hidden", artikelTampil >= artikelData.length || artikelData.length === 0);
}


loadMoreBtn.addEventListener("click", () => {
    
    Swal.fire({
        title: "Fitur Segera Hadir! 🚀",
        text: "Fitur 'Tampilkan Selengkapnya' untuk artikel sedang dalam pengembangan. Mohon tunggu sebentar ya!",
        icon: "info",
        confirmButtonText: "OK",
        confirmButtonColor: "#10b981", // Warna hijau (emerald-500/600)
    });
});


function bukaDetailArtikel(data) {
  modalJudul.textContent = data.judul;
  modalGambar.src = data.gambar;

  modalPenulis.textContent = data.penulis || "Admin";
  modalJam.textContent = data.jam || "Baru saja";
  
  if (data.full) {
    const paragraphs = data.full
      .trim()
      .split("\n\n")
      .map((p) => `<p class="mb-3 leading-relaxed">${p.trim()}</p>`)
      .join("");

    modalIsi.innerHTML = paragraphs;
  } else {
    modalIsi.innerHTML = `<p class="mb-3 leading-relaxed">${data.deskripsi}</p>`;
  }

  scrollY = window.scrollY;
  document.body.style.overflow = "hidden";
  
  artikelModal.classList.remove("hidden");
  artikelModal.classList.add("flex");
}


function closeModalFunc() {
  artikelModal.classList.add("hidden");
  artikelModal.classList.remove("flex");

  document.body.style.overflow = "";
  window.scrollTo(0, scrollY);
}

closeModal.addEventListener("click", closeModalFunc);

artikelModal.addEventListener("click", (e) => {
  if (e.target === artikelModal) {
    closeModalFunc();
  }
});

// Panggil fungsi fetch saat aplikasi dimulai
fetchArtikelData();