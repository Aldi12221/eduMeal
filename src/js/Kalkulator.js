// --- Fungsi Baru untuk Menutup Card ---
function closeCard(elementId) {
    const card = document.getElementById(elementId);
    if (card) {
        card.innerHTML = '';
    }
}

// --- Fungsi hitungKalori() yang Dimodifikasi ---
async function hitungKalori() {
    const berat = parseFloat(document.getElementById("berat").value);
    const tinggi = parseFloat(document.getElementById("tinggi").value);
    const umur = parseFloat(document.getElementById("umur").value);
    const gender = document.getElementById("gender").value;
    const aktivitas = parseFloat(document.getElementById("aktivitas").value);

    if (!berat || !tinggi || !umur) {
        document.getElementById("hasil").innerHTML = `
            <div class="relative p-4 bg-yellow-100 text-yellow-800 rounded-lg shadow-md">
                <button 
                    onclick="closeCard('hasil')" 
                    class="absolute top-2 right-2 text-xl font-bold text-yellow-600 hover:text-yellow-900 focus:outline-none"
                >
                    &times;
                </button>
                Lengkapi semua data terlebih dahulu!
            </div>
        `;
        return;
    }

    let bmr = 0;
    if (gender === "pria") {
        bmr = 88.36 + (13.4 * berat) + (4.8 * tinggi) - (5.7 * umur);
    } else {
        bmr = 447.6 + (9.2 * berat) + (3.1 * tinggi) - (4.3 * umur);
    }
    const kebutuhan = parseInt((bmr * aktivitas).toFixed(0));

    // 1. Dapatkan Rekomendasi Menu dari JSON
    const rekomendasiHTML = await getMenuRekomendasi(kebutuhan);

    // 2. Tampilkan Hasil Akhir dengan Tombol Close di Card Utama
    document.getElementById("hasil").innerHTML = `
        <div class="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-green-200 dark:border-green-700">
            <button 
                onclick="closeCard('hasil')" 
                class="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 focus:outline-none"
                aria-label="Tutup Hasil"
            >
                &times;
            </button>

            <p class="text-lg font-bold text-green-600 dark:text-green-400">
                Kebutuhan kalori harianmu sekitar ${kebutuhan} kkal/hari 🍽️
            </p>
            ${rekomendasiHTML}
        </div>
    `;
}

// --- FUNGSI GET MENU REKOMENDASI YANG TELAH DIPERBAIKI ---
async function getMenuRekomendasi(kebutuhanKalori) {
    try {
        const response = await fetch('rekomendasiMenu.json');
        if (!response.ok) {
            throw new Error(`Gagal fetch menu: Status ${response.status}`);
        }
        const menuTemplates = await response.json();

        // 1. LOGIKA PEMILIHAN TEMPLATE
        let menu;
        if (kebutuhanKalori >= 2500) {
            menu = menuTemplates.find(t => t.id === "menu_tinggi_energi");
        } else {
            menu = menuTemplates.find(t => t.id === "menu_rendah_energi");
        }

        if (!menu) {
            return `<p class="text-red-500 mt-4">Gagal menemukan template menu yang cocok.</p>`;
        }

        const distribusi = menu.distribusi_persentase;
        const komponenMenu = menu.komponen_makan; 

        let htmlContent = `
            <h4 class="text-lg font-semibold mt-4 text-green-700 dark:text-green-400">
                🎯 Pembagian Kalori Harian (${kebutuhanKalori} kkal)
            </h4>
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-2 text-sm">
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 text-gray-700 dark:text-gray-300">
        `;

        // 2. ITERASI & MAPPING
        for (const waktuMakanKey in distribusi) {
            const persentase = distribusi[waktuMakanKey];
            const kaloriWaktuMakan = Math.round(kebutuhanKalori * (persentase / 100));

            // Perbaikan Krusial (Mengubah underscore menjadi spasi):
            const kunciMenu = waktuMakanKey.replace('_', ' ');

            // SOLUSI: Pastikan menuItemsToMap SELALU array, jika tidak ditemukan di JSON, gunakan []
            const menuItemsToMap = komponenMenu[kunciMenu] || [];

            // Mapping sekarang aman karena menuItemsToMap pasti array
            const listItems = menuItemsToMap.map(c => `
                <li class="text-xs">
                    ${c.item} (<span class="font-medium">${c.makro}</span>)
                </li>
            `).join('');

            // Pengecekan tambahan jika array ditemukan tetapi kosong
            const finalListItem = listItems === '' 
                ? '<li class="text-xs text-yellow-500 italic">Menu belum disarankan.</li>' 
                : listItems;

            htmlContent += `
                <tr>
                    <td class="px-2 py-2 whitespace-nowrap font-medium">${kunciMenu} (${persentase}%)</td>
                    <td class="px-2 py-2 whitespace-nowrap text-right">${kaloriWaktuMakan} kkal</td>
                    <td class="px-2 py-2">
                        <ul class="list-disc list-inside space-y-0.5">${finalListItem}</ul>
                    </td>
                </tr>
            `;
        }

        htmlContent += `
                </tbody>
            </table>
            <p class="text-xs text-gray-500 mt-3 italic">*Porsi setiap item harus disesuaikan secara individual untuk mencapai total kalori yang ditargetkan.</p>
        `;

        return htmlContent;

    } catch (error) {
        console.error("Error mendapatkan menu rekomendasi:", error);
        return `<p class="text-red-500 mt-4">Gagal memuat rekomendasi menu. (${error.message})</p>`;
    }
}