const dataGizi = [
  { nama: "nasi putih", kalori: 175, protein: 3.5, lemak: 0.3, karbo: 40 },
  { nama: "nasi goreng", kalori: 250, protein: 8, lemak: 12, karbo: 30 },
  { nama: "nasi uduk", kalori: 300, protein: 6, lemak: 10, karbo: 45 },
  { nama: "nasi kuning", kalori: 320, protein: 6, lemak: 11, karbo: 48 },
  { nama: "bubur ayam", kalori: 180, protein: 8, lemak: 6, karbo: 22 },
  { nama: "mie instan", kalori: 350, protein: 7, lemak: 14, karbo: 50 },
  { nama: "mie ayam", kalori: 420, protein: 15, lemak: 12, karbo: 60 },
  { nama: "bakso", kalori: 250, protein: 20, lemak: 8, karbo: 20 },
  { nama: "soto ayam", kalori: 150, protein: 12, lemak: 5, karbo: 8 },
  { nama: "rawon", kalori: 200, protein: 18, lemak: 10, karbo: 5 },
  { nama: "opor ayam", kalori: 310, protein: 22, lemak: 20, karbo: 6 },
  { nama: "ayam goreng", kalori: 300, protein: 25, lemak: 20, karbo: 0 },
  { nama: "ayam bakar", kalori: 220, protein: 27, lemak: 10, karbo: 2 },
  { nama: "ayam geprek", kalori: 330, protein: 26, lemak: 18, karbo: 8 },
  { nama: "rendang", kalori: 380, protein: 28, lemak: 25, karbo: 4 },
  { nama: "ikan bakar", kalori: 220, protein: 26, lemak: 10, karbo: 0 },
  { nama: "ikan goreng", kalori: 240, protein: 24, lemak: 14, karbo: 0 },
  { nama: "lele goreng", kalori: 280, protein: 26, lemak: 17, karbo: 0 },
  { nama: "tempe goreng", kalori: 150, protein: 10, lemak: 8, karbo: 6 },
  { nama: "tahu goreng", kalori: 120, protein: 8, lemak: 6, karbo: 4 },
  { nama: "tempe orek", kalori: 180, protein: 9, lemak: 7, karbo: 15 },
  { nama: "tahu bacem", kalori: 140, protein: 7, lemak: 6, karbo: 12 },
  { nama: "telur rebus", kalori: 68, protein: 6, lemak: 4.5, karbo: 0.6 },
  { nama: "telur dadar", kalori: 93, protein: 7, lemak: 7, karbo: 1 },
  { nama: "sayur bayam", kalori: 23, protein: 2.9, lemak: 0.4, karbo: 3.6 },
  { nama: "sayur asem", kalori: 45, protein: 2, lemak: 1, karbo: 7 },
  { nama: "sayur lodeh", kalori: 120, protein: 4, lemak: 9, karbo: 6 },
  { nama: "tumis kangkung", kalori: 80, protein: 3, lemak: 5, karbo: 5 },
  { nama: "capcay", kalori: 90, protein: 4, lemak: 3, karbo: 10 },
  { nama: "gado gado", kalori: 250, protein: 9, lemak: 15, karbo: 20 },
  { nama: "pecel", kalori: 230, protein: 8, lemak: 13, karbo: 22 },
  { nama: "ketoprak", kalori: 300, protein: 10, lemak: 12, karbo: 40 },
  { nama: "lontong sayur", kalori: 280, protein: 9, lemak: 12, karbo: 34 },
  { nama: "sate ayam", kalori: 250, protein: 22, lemak: 12, karbo: 6 },
  { nama: "sate kambing", kalori: 300, protein: 25, lemak: 18, karbo: 5 },
  { nama: "sambal goreng kentang", kalori: 200, protein: 4, lemak: 10, karbo: 25 },
  { nama: "kentang balado", kalori: 180, protein: 3, lemak: 8, karbo: 28 },
  { nama: "perkedel", kalori: 150, protein: 4, lemak: 8, karbo: 15 },
  { nama: "bakwan sayur", kalori: 100, protein: 3, lemak: 5, karbo: 12 },
  { nama: "pisang goreng", kalori: 140, protein: 1, lemak: 7, karbo: 20 },
  { nama: "ubi rebus", kalori: 120, protein: 1, lemak: 0.3, karbo: 28 },
  { nama: "singkong goreng", kalori: 180, protein: 1, lemak: 6, karbo: 30 },
  { nama: "roti bakar", kalori: 220, protein: 6, lemak: 10, karbo: 25 },
  { nama: "jus jeruk", kalori: 100, protein: 1, lemak: 0, karbo: 25 },
  { nama: "teh manis", kalori: 80, protein: 0, lemak: 0, karbo: 20 },
  { nama: "kopi hitam", kalori: 5, protein: 0.3, lemak: 0, karbo: 0.5 },
  { nama: "susu sapi", kalori: 110, protein: 6, lemak: 4, karbo: 12 },
  { nama: "air putih", kalori: 0, protein: 0, lemak: 0, karbo: 0 },
  { nama: "es teh tawar", kalori: 2, protein: 0, lemak: 0, karbo: 0.3 },
  { nama: "es jeruk", kalori: 95, protein: 0.8, lemak: 0.1, karbo: 23 },
  { nama: "tempe mendoan", kalori: 160, protein: 8, lemak: 10, karbo: 8 },
  { nama: "bakmi goreng", kalori: 420, protein: 14, lemak: 14, karbo: 58 },
  { nama: "seblak", kalori: 310, protein: 10, lemak: 15, karbo: 35 },
  { nama: "nasi padang", kalori: 550, protein: 20, lemak: 25, karbo: 60 },
  { nama: "pecel lele", kalori: 350, protein: 30, lemak: 22, karbo: 8 }
];

const inputMenu = document.getElementById("menuInput");
const cekBtn = document.getElementById("cekBtn");
const hasilBox = document.getElementById("hasilGizi");
const detailGizi = document.getElementById("detailGizi");
const penilaian = document.getElementById("penilaian");
const cekGiziSection = document.getElementById("cekGizi");
const closeHasil = document.getElementById("closeHasil");
const kalkulatorSection = document.getElementById("kalkulator");

cekGiziSection.classList.add("pb-08");

cekBtn.addEventListener("click", () => {
  const input = inputMenu.value.toLowerCase();
  if (!input) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Silakan masukkan menu makananmu dulu 🍴",
      theme: "auto",
    });
    return;
  }

  // Pisahkan makanan berdasarkan tanda '+'
  const daftarMenu = input.split("+").map((m) => m.trim());

  // Cari gizi dari dataGizi
  let total = { kalori: 0, protein: 0, lemak: 0, karbo: 0 };
  let tidakDitemukan = [];

  daftarMenu.forEach((menu) => {
    const data = dataGizi.find((d) => d.nama === menu);
    if (data) {
      total.kalori += data.kalori;
      total.protein += data.protein;
      total.lemak += data.lemak;
      total.karbo += data.karbo;
    } else {
      tidakDitemukan.push(menu);
    }
  });

  // Tampilkan hasil
  hasilBox.classList.remove("hidden");
  setTimeout(() => {
    hasilBox.classList.remove("opacity-0", "scale-95");
    hasilBox.classList.add("opacity-100", "scale-100");
  }, 50);
  detailGizi.innerHTML = `
      <p>🍛 <strong>Total Kalori:</strong> ${total.kalori.toFixed(1)} kcal</p>
      <p>💪 <strong>Protein:</strong> ${total.protein.toFixed(1)} g</p>
      <p>🧈 <strong>Lemak:</strong> ${total.lemak.toFixed(1)} g</p>
      <p>🍞 <strong>Karbohidrat:</strong> ${total.karbo.toFixed(1)} g</p>
      ${
        tidakDitemukan.length > 0
          ? `<p class="text-red-600 text-sm mt-2">⚠️ Data tidak ditemukan untuk: ${tidakDitemukan.join(
              ", "
            )}</p>`
          : ""
      }
    `;

  // Analisis keseimbangan sederhana
  let pesan = "";
  if (total.protein < 15)
    pesan =
      "Kandungan protein rendah, tambahkan lauk seperti ayam atau telur 🥚";
  else if (total.lemak > 30)
    pesan = "Lemak cukup tinggi, kurangi gorengan atau santan 🥘";
  else if (total.karbo > 100)
    pesan = "Karbohidrat tinggi, coba kurangi nasi atau mie 🍚";
  else pesan = "Menu kamu cukup seimbang! Pertahankan pola makan sehat 🥦";

  penilaian.textContent = pesan;

  cekGiziSection.classList.remove("pb-8");
  cekGiziSection.classList.add("pb-24");
});

closeHasil.addEventListener("click", () => {
  hasilBox.classList.remove("opacity-100", "scale-100");
  hasilBox.classList.add("opacity-0", "scale-95");

  setTimeout(() => {
    hasilBox.classList.add("hidden");
  }, 300);
  cekGiziSection.classList.remove("pb-24");
  cekGiziSection.classList.add("pb-8");
});
