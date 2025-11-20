const listMakanan = document.getElementById("listMakanan");
const input = document.getElementById("search");
const loadMoreContainer = document.getElementById("loadMoreContainer"); 
let makananBergizi = []; 

const DEFAULT_ITEMS_PER_PAGE = 8;
let itemsPerPage = DEFAULT_ITEMS_PER_PAGE; 
let currentItemsDisplayed = 0; 
let currentPage = 1;




function isLargeScreen() {
    return window.matchMedia("(min-width: 1024px)").matches;
}


function getItemsPerPage() {
   
    return isLargeScreen() ? DEFAULT_ITEMS_PER_PAGE : 4; 
}



function getHealthRating(m) {
    let score = 0;
    
    if (m.kalori < 350) score++;
    if (m.lemak < 15) score++;
    if (m.protein >= 15) score++;
    if (m.karbo < 45) score++;

    if (score >= 3) {
        return { color: "bg-green-500", label: "Sehat 👍" };
    } else {
        return { color: "bg-red-500", label: "Kurang Sehat ⚠️" };
    }
}


function goToPage(page, filter) {
    
    const totalItems = makananBergizi.filter((m) => m.nama.toLowerCase().includes(filter.toLowerCase())).length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    
    if (page < 1 || page > totalPages) {
        console.warn(`Pindah halaman DIBATALKAN karena ${page} di luar batas [1 - ${totalPages}]`);
        return;
    }

    currentPage = page;
    renderData(filter, false); 
}


function createPaginationControls(totalItems, filter) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    loadMoreContainer.innerHTML = "";
    
    if (totalPages <= 1) return;

  
    let paginationHTML = `
        <div class="flex justify-center items-center space-x-2 mt-6" id="pagination-controls">
    `;

    
    const prevDisabled = currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-100 dark:hover:bg-gray-700';
    paginationHTML += `<button 
        class="px-3 py-1 border rounded-lg dark:border-gray-700 dark:text-gray-300 pagination-btn ${prevDisabled}" 
        data-page="${currentPage - 1}" data-filter="${filter}"
        ${currentPage === 1 ? 'disabled' : ''}
    >
        &larr; Sebelumnya
    </button>`;

   
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage 
            ? 'bg-green-600 text-white dark:bg-green-500' 
            : 'hover:bg-green-100 dark:hover:bg-gray-700 dark:text-gray-300';
            
        paginationHTML += `<button 
            class="px-3 py-1 border rounded-lg dark:border-gray-700 pagination-btn ${activeClass}" 
            data-page="${i}" data-filter="${filter}"
        >
            ${i}
        </button>`;
    }

    
    const nextDisabled = currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-100 dark:hover:bg-gray-700';
    paginationHTML += `<button 
        class="px-3 py-1 border rounded-lg dark:border-gray-700 dark:text-gray-300 pagination-btn ${nextDisabled}" 
        data-page="${currentPage + 1}" data-filter="${filter}"
        ${currentPage === totalPages ? 'disabled' : ''}
    >
        Berikutnya &rarr;
    </button>`;

    paginationHTML += `</div>`;
    loadMoreContainer.innerHTML = paginationHTML;
    
    
    attachPaginationListeners();
}


function attachPaginationListeners() {
    const buttons = document.querySelectorAll('#loadMoreContainer .pagination-btn');

    buttons.forEach(button => {
        
        if (!button.disabled) {
            button.addEventListener('click', (e) => {
                const page = parseInt(e.currentTarget.dataset.page);
                const filter = e.currentTarget.dataset.filter;
                
                
                goToPage(page, filter); 
            });
        }
    });
}



function renderData(filter = "", append = false) {
    
    itemsPerPage = getItemsPerPage(); 

    const isPaginationMode = isLargeScreen();
    const filteredData = makananBergizi
        .filter((m) => m.nama.toLowerCase().includes(filter.toLowerCase()));

    let startIndex, endIndex;
    
    
    if (!append) {
        listMakanan.innerHTML = "";
        
       
        currentItemsDisplayed = 0; 
        
        
        if (loadMoreContainer) loadMoreContainer.innerHTML = "";
    }
    
    
    if (isPaginationMode) {
        
        startIndex = (currentPage - 1) * itemsPerPage;
        endIndex = Math.min(filteredData.length, startIndex + itemsPerPage);
        
    } else {
        
        startIndex = currentItemsDisplayed;
        endIndex = Math.min(filteredData.length, startIndex + itemsPerPage);
    }
    
    const dataToRender = filteredData.slice(startIndex, endIndex);
    
    
    dataToRender.forEach((m) => {
        const rating = getHealthRating(m);

        const card = document.createElement("div");
        card.className = `
            group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
            rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 duration-500
            overflow-hidden
        `;

        card.innerHTML = `
            <div class="relative overflow-hidden">
                <img src="${m.gambar}" alt="${m.nama}"
                    class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500">
                <span class="${rating.color} text-white text-xs font-semibold px-3 py-1 rounded-full absolute top-3 right-3 shadow-md">
                    ${rating.label}
                </span>
            </div>

            <div class="p-4 space-y-2">
                <h3 class="text-xl font-bold text-green-700 dark:text-green-400">${m.nama}</h3>
                <div class="text-gray-600 dark:text-gray-300 text-sm space-y-1">
                    <p><strong>Kalori:</strong> ${m.kalori} kcal</p>
                    <p><strong>Protein:</strong> ${m.protein} g</p>
                    <p><strong>Lemak:</strong> ${m.lemak} g</p>
                    <p><strong>Karbo:</strong> ${m.karbo} g</p>
                </div>
            </div>

            <div class="absolute inset-0 bg-green-600/0 group-hover:bg-green-600/10 transition-all duration-500"></div>
        `;

        
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
                    <p class="font-semibold ${rating.color === "bg-green-500" ? "text-green-500" : "text-red-500"}">${rating.label}</p>
                    <p class="text-sm text-gray-500 mt-2">Fitur detail makanan akan segera hadir 🚀</p>
                `,
                confirmButtonColor: "#16a34a",
                background: document.documentElement.classList.contains("dark") ? "#1f2937" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#d1fae5" : "#166534",
            });
        });

        listMakanan.appendChild(card);
    });
    
    
    
    if (isPaginationMode) {
        
        createPaginationControls(filteredData.length, filter);

    } else {
        
        currentItemsDisplayed = endIndex; 
        
        if (loadMoreContainer) {
            loadMoreContainer.innerHTML = "";
            if (currentItemsDisplayed < filteredData.length) {
                const remaining = filteredData.length - currentItemsDisplayed;
                loadMoreContainer.innerHTML = `
                    <button id="loadMoreBtn" class="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition font-semibold mt-6 col-span-full">
                        Tampilkan ${Math.min(itemsPerPage, remaining)} Selengkapnya (${remaining} Tersisa)
                    </button>
                `;
                
                
                document.getElementById("loadMoreBtn").addEventListener("click", () => {
                   
                   connsole.log("Tombol 'Tampilkan Selengkapnya' diklik");
                   
                });
            } else if (filteredData.length > 0) {
                loadMoreContainer.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 mt-4 col-span-full">Semua ${filteredData.length} item telah ditampilkan.</p>`;
            }
        }
    }


    
    if (listMakanan.children.length === 0 && filteredData.length === 0) {
        listMakanan.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400 col-span-full">Makanan "${filter}" tidak ditemukan.</p>`;
    } else if (makananBergizi.length === 0) {
        listMakanan.innerHTML = `<p class="text-center text-red-500 col-span-full">Gagal memuat data makanan.</p>`;
    }
}


async function fetchMakananData() {
    listMakanan.innerHTML = `<p class="text-center text-green-600 dark:text-green-400 col-span-full animate-pulse">Memuat data makanan...</p>`;
    try {
        const response = await fetch('makananData.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        makananBergizi = await response.json();
        
        
        itemsPerPage = getItemsPerPage(); 
        
        
        renderData(); 
        
    } catch (error) {
        console.error("Gagal mengambil data makanan:", error);
        listMakanan.innerHTML = `<p class="text-center text-red-500 col-span-full">Gagal memuat daftar makanan. Pastikan file 'makananData.json' tersedia.</p>`;
    }
}



input.addEventListener("input", (e) => {
   
    currentPage = 1; 
    renderData(e.target.value);
});


window.addEventListener('resize', () => {

    renderData(input.value || "", false); 
});


fetchMakananData();