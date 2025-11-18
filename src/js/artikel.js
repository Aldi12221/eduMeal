
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

    card.innerHTML = `
      <div class="overflow-hidden">
        <img 
          src="${item.gambar}" 
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
  loadMoreBtn.classList.toggle("hidden", artikelTampil >= artikelData.length);
}


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
    modalIsi.innerHTML = `<p>${data.deskripsi}</p>`;
  }

  
  scrollY = window.scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";

  
  artikelModal.classList.remove("hidden");
  artikelModal.classList.add("flex");
}



function closeModalFunc() {
  artikelModal.classList.add("hidden");
  artikelModal.classList.remove("flex");

  
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  window.scrollTo(0, scrollY);
}

closeModal.addEventListener("click", closeModalFunc);

artikelModal.addEventListener("click", (e) => {
  if (e.target === artikelModal) {
    closeModalFunc();
  }
});

renderArtikel();
  