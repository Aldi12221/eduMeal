const artikelData = [
  {
    judul: "Pentingnya Sarapan Bergizi",
    deskripsi: "Sarapan adalah sumber energi utama untuk memulai hari. Dengan sarapan yang bergizi, tubuh lebih siap untuk beraktivitas.",
    gambar: "assets/artikel/sarapan.jpg"
  },
  {
    judul: "Cara Menjaga Pola Makan Seimbang",
    deskripsi: "Keseimbangan antara karbohidrat, protein, dan lemak penting untuk menjaga kesehatan dan berat badan ideal.",
    gambar: "assets/artikel/pola_makan.jpg"
  },
  {
    judul: "Manfaat Sayur dan Buah Setiap Hari",
    deskripsi: "Sayur dan buah kaya akan serat, vitamin, dan mineral yang membantu sistem imun dan pencernaan.",
    gambar: "assets/artikel/sayur_buah.jpg"
  },
  {
    judul: "Bahaya Konsumsi Gula Berlebih",
    deskripsi: "Konsumsi gula berlebihan dapat menyebabkan obesitas, diabetes, dan penyakit jantung.",
    gambar: "assets/artikel/gula.jpg"
  }
];


  const artikelContainer = document.getElementById("artikelContainer");

  function renderArtikel() {
    artikelContainer.innerHTML = "";
    artikelData.forEach(a => {
      artikelContainer.innerHTML += `
        <article class="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
          <img src="${a.gambar}" alt="${a.judul}" 
               class="w-full h-40 object-cover rounded-md mb-3">
          <h3 class="font-bold text-lg mb-2 text-green-700">${a.judul}</h3>
          <p class="text-gray-600 text-sm">${a.deskripsi}</p>
          <button class="mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
            Baca Selengkapnya
          </button>
        </article>
      `;
    });
  }

  renderArtikel();

