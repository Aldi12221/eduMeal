
    const listMakanan = document.getElementById("listMakanan");
    const input = document.getElementById("search");

    function renderData(filter = "") {
      listMakanan.innerHTML = "";
      makananBergizi
        .filter(m => m.nama.toLowerCase().includes(filter.toLowerCase()))
        .forEach(m => {
          listMakanan.innerHTML += `
            <div class="bg-white border rounded-xl shadow-md hover:shadow-lg transition p-4">
              <img src="${m.gambar}" alt="${m.nama}" 
                   class="w-full h-40 object-cover rounded-lg mb-3">
              <h3 class="text-xl font-semibold text-green-700">${m.nama}</h3>
              <div class="mt-2 text-sm text-gray-700">
                <p><strong>Kalori:</strong> ${m.kalori} kcal</p>
                <p><strong>Protein:</strong> ${m.protein} g</p>
                <p><strong>Lemak:</strong> ${m.lemak} g</p>
                <p><strong>Karbo:</strong> ${m.karbo} g</p>
              </div>
            </div>
          `;
        });
    }

    input.addEventListener("input", (e) => renderData(e.target.value));
    renderData();
  