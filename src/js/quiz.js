 const pertanyaanEl = document.getElementById("pertanyaan");
  const pilihanContainer = document.getElementById("pilihanContainer");
  const hasilEl = document.getElementById("jawaban");
  const nextBtn = document.getElementById("nextBtn");

  let index = 0;
  let quiz = quizData;

  function tampilkanSoal() {
    hasilEl.textContent = "";
    nextBtn.classList.add("hidden");
    const data = quiz[index];
    pertanyaanEl.textContent = data.pertanyaan;

    pilihanContainer.innerHTML = "";
    data.pilihan.forEach(p => {
      const btn = document.createElement("button");
      btn.textContent = p;
      btn.className = "block w-full border border-green-500 text-green-700 font-medium rounded-lg p-2 hover:bg-green-100";
      btn.onclick = () => periksaJawaban(p, data.jawaban, btn);
      pilihanContainer.appendChild(btn);
    });
  }

  function periksaJawaban(pilihan, jawaban, tombol) {
    const semuaTombol = pilihanContainer.querySelectorAll("button");
    semuaTombol.forEach(btn => btn.disabled = true);

    if (pilihan === jawaban) {
      tombol.classList.add("bg-green-500", "text-white");
      hasilEl.textContent = "✅ Benar! Jawaban kamu tepat.";
      hasilEl.className = "text-green-700 font-semibold mt-3";
    } else {
      tombol.classList.add("bg-red-500", "text-white");
      hasilEl.textContent = `❌ Salah! Jawaban yang benar: ${jawaban}.`;
      hasilEl.className = "text-red-700 font-semibold mt-3";
    }

    nextBtn.classList.remove("hidden");
  }

  nextBtn.onclick = () => {
    index++;
    if (index < quiz.length) {
      tampilkanSoal();
    } else {
      quizSelesai();
    }
  };

  function quizSelesai() {
    pertanyaanEl.textContent = "🎉 Quiz selesai!";
    pilihanContainer.innerHTML = "";
    hasilEl.textContent = "Kamu sudah menjawab semua pertanyaan.";
    nextBtn.classList.add("hidden");
  }

  tampilkanSoal();