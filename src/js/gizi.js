const dataGizi = [
  { nama: "nasi goreng", kalori: 250, protein: 8, lemak: 12, karbo: 30 },
  { nama: "teh manis", kalori: 80, protein: 0, lemak: 0, karbo: 20 },
  { nama: "mie instan", kalori: 350, protein: 7, lemak: 14, karbo: 50 },
  { nama: "ayam goreng", kalori: 300, protein: 25, lemak: 20, karbo: 0 },
  { nama: "telur rebus", kalori: 68, protein: 6, lemak: 4.5, karbo: 0.6 },
  { nama: "sayur bayam", kalori: 23, protein: 2.9, lemak: 0.4, karbo: 3.6 },
  { nama: "nasi putih", kalori: 175, protein: 3.5, lemak: 0.3, karbo: 40 },
  { nama: "ikan bakar", kalori: 220, protein: 26, lemak: 10, karbo: 0 },
  { nama: "jus jeruk", kalori: 100, protein: 1, lemak: 0, karbo: 25 },
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
    alert("Silakan masukkan menu makananmu dulu 🍴");
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
