// =========================================================
        // ⚠️ PERINGATAN KERAS: JANGAN GUNAKAN KEY ASLI PADA PRODUKSI!
        // =========================================================
        const GEMINI_API_KEY = "AIzaSyDoc7gtnyIcTRGqx-V_62jyxNYN3vKolOE"; // Ganti dengan Key Anda
        const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + GEMINI_API_KEY;

        // Data Gizi Lokal Anda
        const dataGizi = [
            { nama: "nasi putih", kalori: 175, protein: 3.5, lemak: 0.3, karbo: 40 },
            { nama: "nasi goreng", kalori: 250, protein: 8, lemak: 12, karbo: 30 },
            { nama: "nasi uduk", kalori: 300, protein: 6, lemak: 10, karbo: 45 },
            { nama: "ayam goreng", kalori: 300, protein: 25, lemak: 20, karbo: 0 },
            { nama: "tempe goreng", kalori: 150, protein: 10, lemak: 8, karbo: 6 },
            { nama: "tahu goreng", kalori: 120, protein: 8, lemak: 6, karbo: 4 },
            { nama: "sayur bayam", kalori: 23, protein: 2.9, lemak: 0.4, karbo: 3.6 },
            { nama: "tumis kangkung", kalori: 80, protein: 3, lemak: 5, karbo: 5 },
            { nama: "gado gado", kalori: 250, protein: 9, lemak: 15, karbo: 20 },
            { nama: "pecel lele", kalori: 350, protein: 30, lemak: 22, karbo: 8 },
            // Tambahkan semua data gizi lokal Anda di sini
        ];

        // Deklarasi Variabel Elemen HTML
        const inputMenu = document.getElementById("menuInput");
        const cekBtn = document.getElementById("cekBtn");
        const hasilBox = document.getElementById("hasilGizi");
        const detailGizi = document.getElementById("detailGizi");
        const penilaian = document.getElementById("penilaian");
        const cekGiziSection = document.getElementById("cekGizi");
        const closeHasil = document.getElementById("closeHasil");
        
        // --- FUNGSI FALLBACK UNTUK MEMANGGIL API GEMINI SECARA LANGSUNG ---
       // --- FUNGSI FALLBACK UNTUK MEMANGGIL API GEMINI SECARA LANGSUNG ---
// --- FUNGSI FALLBACK UNTUK MEMANGGIL API GEMINI SECARA LANGSUNG ---
async function fetchGiziFromGemini(menu) {
    
    // 🚨 Gabungkan instruksi sistem dan prompt menjadi satu pesan pengguna
    const combinedPrompt = `Anda adalah ahli gizi virtual. 
        Berikan perkiraan kandungan gizi untuk satu porsi standar/umum makanan yang diminta. 
        Pastikan Anda hanya memberikan output dalam format JSON yang spesifik. 
        Format JSON yang HARUS Anda kembalikan: 
        { "nama": "Nama Makanan", "kalori": NNN, "protein": N, "lemak": N, "karbo": N }.
        
        Sekarang, berikan perkiraan data gizi untuk: "${menu}"`; 

    const requestBody = {
        contents: [
            // Hanya menggunakan role 'user'
            { role: "user", parts: [{ text: combinedPrompt }] }
        ],
        
        generationConfig: { 
            responseMimeType: "application/json" 
        }
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(`Gemini API Error (${response.status}):`, errorData);
            return null;
        }

        const data = await response.json();
        
        // Logika penguraian data
        if (data.candidates && data.candidates.length > 0) {
            const jsonText = data.candidates[0].content.parts[0].text.trim();
            const giziData = JSON.parse(jsonText);

            return {
                nama: menu, 
                kalori: giziData.kalori || 0,
                protein: giziData.protein || 0,
                lemak: giziData.lemak || 0,
                karbo: giziData.karbo || 0
            };
        } else {
            console.error("Gemini tidak mengembalikan kandidat respons yang valid.");
            return null;
        }

    } catch (error) {
        console.error(`Gagal memanggil Gemini API untuk ${menu}:`, error);
        return null;
    }
}
        // ----------------------------------------------------------------------


        cekBtn.addEventListener("click", async () => {
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

            // Atur tampilan loading
            hasilBox.classList.remove("opacity-100", "scale-100");
            hasilBox.classList.add("hidden", "opacity-0", "scale-95");
            
            // Tampilkan loading state
            detailGizi.innerHTML = '<p class="text-center text-xl font-semibold text-gray-600">🔍 Sedang mencari data gizi...</p>';
            hasilBox.classList.remove("hidden"); 
            setTimeout(() => {
                hasilBox.classList.add("opacity-100", "scale-100");
            }, 50);

            const daftarMenu = input.split("+").map((m) => m.trim());
            
            let total = { kalori: 0, protein: 0, lemak: 0, karbo: 0 };
            let tidakDitemukan = [];
            let menuDetailList = []; 

            let promises = daftarMenu.map(async (menu) => {
                const dataLokal = dataGizi.find((d) => d.nama === menu);

                if (dataLokal) {
                    return dataLokal;
                } else {
                    const dataGemini = await fetchGiziFromGemini(menu); 
                    if (dataGemini) {
                        return dataGemini;
                    } else {
                        return { nama: menu, notFound: true };
                    }
                }
            });

            // Tunggu semua proses pencarian selesai
            const hasilPencarian = await Promise.all(promises);

            // Hitung Total dan Kumpulkan yang Tidak Ditemukan
            hasilPencarian.forEach(item => {
                if (item.notFound) {
                    tidakDitemukan.push(item.nama);
                } else {
                    total.kalori += item.kalori;
                    total.protein += item.protein;
                    total.lemak += item.lemak;
                    total.karbo += item.karbo;
                    
                    // Cek sumber: Lokal atau AI
                    let sumber = dataGizi.find((d) => d.nama === item.nama) ? "Lokal" : "AI";
                    menuDetailList.push(`<li>${item.nama} (${item.kalori.toFixed(1)} kcal) - Sumber: ${sumber}</li>`);
                }
            });

            // 4. Tampilkan hasil
            let menuDetailHTML = menuDetailList.length > 0 ? 
                `<h4 class="font-semibold mt-4">Rincian Menu Ditemukan:</h4><ul class="list-disc list-inside text-sm">${menuDetailList.join('')}</ul>` : 
                '<p class="text-center text-red-600 font-semibold">Tidak ada menu yang berhasil ditemukan.</p>';

            detailGizi.innerHTML = `
                <h3 class="text-lg font-bold">Total Gizi Makananmu</h3>
                <p>🍛 <strong>Total Kalori:</strong> ${total.kalori.toFixed(1)} kcal</p>
                <p>💪 <strong>Protein:</strong> ${total.protein.toFixed(1)} g</p>
                <p>🧈 <strong>Lemak:</strong> ${total.lemak.toFixed(1)} g</p>
                <p>🍞 <strong>Karbohidrat:</strong> ${total.karbo.toFixed(1)} g</p>
                ${
                  tidakDitemukan.length > 0
                    ? `<p class="text-red-600 text-sm mt-2">⚠️ Data tidak ditemukan (di lokal & AI) untuk: ${tidakDitemukan.join(
                          ", "
                        )}</p>`
                    : ""
                }
                ${menuDetailHTML}
            `;

            // Analisis keseimbangan sederhana
            let pesan = "";
            if (total.kalori === 0 && tidakDitemukan.length > 0) {
                 pesan = "Tidak ada data yang ditemukan. Coba masukkan nama makanan yang lebih umum.";
            } else if (total.protein < 15)
                pesan = "Kandungan protein rendah, tambahkan lauk seperti ayam atau telur 🥚";
            else if (total.lemak > 30)
                pesan = "Lemak cukup tinggi, kurangi gorengan atau santan 🥘";
            else if (total.karbo > 100)
                pesan = "Karbohidrat tinggi, coba kurangi nasi atau mie 🍚";
            else pesan = "Menu kamu cukup seimbang! Pertahankan pola makan sehat 🥦";

            penilaian.textContent = pesan;

            // Penyesuaian padding (asumsi Anda ingin hasilBox tidak menutupi tombol)
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