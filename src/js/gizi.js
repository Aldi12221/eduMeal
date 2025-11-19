let dataGizi = []; 


const GIZI_JSON_FILE = 'data-gizi.json'; 


const inputMenu = document.getElementById("menuInput");
const cekBtn = document.getElementById("cekBtn");
const hasilBox = document.getElementById("hasilGizi");
const detailGizi = document.getElementById("detailGizi");
const penilaian = document.getElementById("penilaian");
const cekGiziSection = document.getElementById("cekGizi");
const closeHasil = document.getElementById("closeHasil");


cekBtn.disabled = true;
cekBtn.textContent = 'Memuat Data Gizi ';

// --- FUNGSI PEMUATAN DATA DARI JSON ---
async function fetchGiziData() {
    try {
        const response = await fetch(GIZI_JSON_FILE);
        if (!response.ok) {
            throw new Error(`Gagal memuat file: ${response.status} ${response.statusText}`);
        }
        
        dataGizi = await response.json();
        
        
        // Aktifkan tombol setelah data siap
        cekBtn.disabled = false; 
        cekBtn.textContent = 'Cek Gizi';

    } catch (error) {
        console.error("Error memuat data gizi:", error);
        Swal.fire({
            icon: "error",
            title: "Error Data",
            text: "Gagal memuat database gizi lokal. Fitur cek gizi dinonaktifkan.",
        });
        cekBtn.textContent = 'Data Error';
        cekBtn.disabled = true;
    }
}

// Panggil fungsi pemuatan data
fetchGiziData();

// 🚀 FUNGSI BARU: Pencarian Fleksibel (Case-Insensitive & Substring)
function findGiziData(query) {
    const cleanQuery = query.trim().toLowerCase();

    // Mencari data yang namanya mengandung (includes) query
    return dataGizi.find((d) => d.nama.toLowerCase().includes(cleanQuery));
}

// --- EVENT LISTENER CEK GIZI ---
cekBtn.addEventListener("click", () => {
    const input = inputMenu.value.toLowerCase();
    
    // Pengecekan data sudah dimuat
    if (dataGizi.length === 0) {
        Swal.fire({
            icon: "info",
            title: "Data Belum Siap",
            text: "Database gizi masih dimuat atau gagal dimuat.",
        });
        return;
    }
    
    if (!input) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "Silakan masukkan menu makananmu dulu 🍴",
        });
        return;
    }
    
    hasilBox.classList.add("hidden"); 
    detailGizi.innerHTML = '<p class="text-center text-xl font-semibold">🔍 Sedang mencari data gizi...</p>';
    
    hasilBox.classList.remove("hidden", "opacity-0", "scale-95");
    hasilBox.classList.add("opacity-100", "scale-100");

    const daftarMenu = input.split("+").map((m) => m.trim());
    
    let total = { kalori: 0, protein: 0, lemak: 0, karbo: 0 };
    let tidakDitemukan = [];
    let menuDetailList = []; 

    // Proses semua menu menggunakan fungsi pencarian fleksibel
    daftarMenu.forEach((menu) => {
        // PERUBAHAN UTAMA: Memanggil fungsi findGiziData yang baru
        const data = findGiziData(menu); 

        if (data) {
            total.kalori += data.kalori;
            total.protein += data.protein;
            total.lemak += data.lemak;
            total.karbo += data.karbo;
            
            // Tampilkan nama yang sesuai dari database (data.nama)
            let sumber = "Database "; 
            menuDetailList.push(`<li>${data.nama} (${data.kalori.toFixed(1)} kcal) - Sumber: ${sumber}</li>`);
        } else {
            tidakDitemukan.push(menu);
        }
    });
    
    let menuDetailHTML = menuDetailList.length > 0 ? 
        `<h4 class="font-semibold mt-4">Rincian Menu Ditemukan:</h4><ul class="list-disc list-inside text-sm">${menuDetailList.join('')}</ul>` : 
        '<p class="text-center text-red-600 font-semibold">Tidak ada menu yang berhasil ditemukan dalam database.</p>';

    detailGizi.innerHTML = `
        <h3 class="text-lg font-bold">Total Gizi Makananmu</h3>
        <p>🍛 <strong>Total Kalori:</strong> ${total.kalori.toFixed(1)} kcal</p>
        <p>💪 <strong>Protein:</strong> ${total.protein.toFixed(1)} g</p>
        <p>🧈 <strong>Lemak:</strong> ${total.lemak.toFixed(1)} g</p>
        <p>🍞 <strong>Karbohidrat:</strong> ${total.karbo.toFixed(1)} g</p>
        ${
          tidakDitemukan.length > 0
            ? `<p class="text-red-600 text-sm mt-2">⚠️ Data tidak ditemukan dalam database untuk: ${tidakDitemukan.join(
                  ", "
                )}</p>`
            : ""
        }
        ${menuDetailHTML}
    `;

    let pesan = "";
    if (total.kalori === 0 && tidakDitemukan.length > 0) {
          pesan = "Tidak ada data yang ditemukan. Coba periksa kembali nama makanan.";
    } else if (total.protein < 15)
        pesan = "Kandungan protein rendah, tambahkan lauk seperti ayam atau telur 🥚";
    else if (total.lemak > 30)
        pesan = "Lemak cukup tinggi, kurangi gorengan atau santan 🥘";
    else if (total.karbo > 100)
        pesan = "Karbohidrat tinggi, coba kurangi nasi atau mie 🍚";
    else pesan = "Menu kamu cukup seimbang! Pertahankan pola makan sehat 🥦";

    penilaian.textContent = pesan;

    cekGiziSection.classList.remove("pb-8");
    cekGiziSection.classList.add("pb-24");
});

// Listener tombol tutup hasil tetap sama
closeHasil.addEventListener("click", () => {
    hasilBox.classList.remove("opacity-100", "scale-100");
    hasilBox.classList.add("opacity-0", "scale-95");

    setTimeout(() => {
        hasilBox.classList.add("hidden");
    }, 300);
    cekGiziSection.classList.remove("pb-24");
    cekGiziSection.classList.add("pb-8");
});