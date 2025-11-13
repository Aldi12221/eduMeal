const makananBergizi = [
  { nama: "Nasi Putih", gambar: "assets/makanan/nasi-putih.jpg", kalori: 175, protein: 3.5, lemak: 0.3, karbo: 40 },
  { nama: "Telur Rebus", gambar: "assets/makanan/telur-rebus.jpg", kalori: 68, protein: 6, lemak: 4.5, karbo: 0.6 },
  { nama: "Ayam Panggang", gambar: "assets/makanan/ayam-panggang.jpg", kalori: 165, protein: 31, lemak: 3.6, karbo: 0 },
  { nama: "Tahu Goreng", gambar: "assets/makanan/tahu-goreng.jpg", kalori: 76, protein: 8, lemak: 4.6, karbo: 1.9 },
  { nama: "Sayur Bayam", gambar: "assets/makanan/sayur-bayam.jpg", kalori: 23, protein: 2.9, lemak: 0.4, karbo: 3.6 },
  { nama: "Sayur Bayam", gambar: "assets/makanan/sayur-bayam.jpg", kalori: 23, protein: 2.9, lemak: 0.4, karbo: 3.6 },
  { nama: "Sayur Bayam", gambar: "assets/makanan/sayur-bayam.jpg", kalori: 23, protein: 2.9, lemak: 0.4, karbo: 3.6 },
  { nama: "Sayur Bayam", gambar: "assets/makanan/sayur-bayam.jpg", kalori: 23, protein: 2.9, lemak: 0.4, karbo: 3.6 },
];

const listMakanan = document.getElementById("listMakanan");
const input = document.getElementById("search");

// 🔹 Fungsi menentukan rating kesehatan (warna & label)
function getHealthRating(m) {
  let score = 0;
  if (m.kalori < 150) score++;
  if (m.lemak < 5) score++;
  if (m.protein > 5) score++;
  if (m.karbo < 30) score++;

  if (score >= 3) {
    return { color: "bg-green-500", label: "Sehat 👍" };
  } else {
    return { color: "bg-red-500", label: "Kurang Sehat ⚠️" };
  }
}

// 🔹 Render data makanan
function renderData(filter = "") {
  listMakanan.innerHTML = "";

  makananBergizi
    .filter((m) => m.nama.toLowerCase().includes(filter.toLowerCase()))
    .forEach((m) => {
      const rating = getHealthRating(m);

      const card = document.createElement("div");
      card.className = `
        group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
        rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 duration-500
        overflow-hidden
      `;

      card.innerHTML = `
        <!-- Gambar -->
        <div class="relative overflow-hidden">
          <img src="${m.gambar}" alt="${m.nama}"
               class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">
          <span class="${rating.color} text-white text-xs font-semibold px-3 py-1 rounded-full absolute top-3 right-3 shadow-md">
            ${rating.label}
          </span>
        </div>

        <!-- Konten -->
        <div class="p-4 space-y-2">
          <h3 class="text-xl font-bold text-green-700 dark:text-green-400">${m.nama}</h3>
          <div class="text-gray-600 dark:text-gray-300 text-sm space-y-1">
            <p><strong>Kalori:</strong> ${m.kalori} kcal</p>
            <p><strong>Protein:</strong> ${m.protein} g</p>
            <p><strong>Lemak:</strong> ${m.lemak} g</p>
            <p><strong>Karbo:</strong> ${m.karbo} g</p>
          </div>
        </div>

        <!-- Efek Hover -->
        <div class="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/10 transition-all duration-500"></div>
      `;

      // 🟢 Tambahkan interaksi klik SweetAlert
      card.addEventListener("click", () => {
        Swal.fire({
          title: m.nama,
          html: `
            <img src="${m.gambar}" alt="${m.nama}" class="w-40 mx-auto rounded-lg mb-3">
            <p><b>Kalori:</b> ${m.kalori} kcal</p>
            <p><b>Protein:</b> ${m.protein} g</p>
            <p><b>Lemak:</b> ${m.lemak} g</p>
            <p><b>Karbo:</b> ${m.karbo} g</p>
            <hr class="my-2">
            <p class="font-semibold ${rating.color === 'bg-green-500' ? 'text-green-500' : 'text-red-500'}">${rating.label}</p>
            <p class="text-sm text-gray-500 mt-2">Fitur detail makanan akan segera hadir 🚀</p>
          `,
          confirmButtonColor: "#16a34a",
          background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
          color: document.documentElement.classList.contains("dark") ? "#d1fae5" : "#166534",
        });
      });

      listMakanan.appendChild(card);
    });
}

// 🔍 Input pencarian
input.addEventListener("input", (e) => renderData(e.target.value));

// Jalankan awal
renderData();
