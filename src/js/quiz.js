const pertanyaanEl = document.getElementById("pertanyaan");
const pilihanContainer = document.getElementById("pilihanContainer");
const nextBtn = document.getElementById("nextBtn");
const feedbackEl = document.getElementById("jawaban");
const progressBar = document.getElementById("progressBar");

// === VARIABEL STATUS ===
let currentIndex = 0;
let shuffledQuiz = [];
let score = 0;
const poinPerSoal = 10; // setiap jawaban benar dapat 10 poin

// === FUNGSI UTAMA ===
function acakSoal(data) {
  return data.sort(() => Math.random() - 0.5);
}

function mulaiQuiz() {
  shuffledQuiz = acakSoal([...quizData]);
  currentIndex = 0;
  score = 0;
  nextBtn.textContent = "Soal Berikutnya →";
  tampilkanSoal();
}

function tampilkanSoal() {
  const soal = shuffledQuiz[currentIndex];
  pertanyaanEl.textContent = soal.pertanyaan;
  pilihanContainer.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");

  // update progress bar
  progressBar.style.width = `${(currentIndex / quizData.length) * 100}%`;

  soal.pilihan.forEach((pilihan) => {
    const btn = document.createElement("button");
    btn.textContent = pilihan;
    btn.className =
      "w-full py-2 border rounded-lg text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900 transition";
    btn.onclick = () => cekJawaban(pilihan, soal.jawaban, btn);
    pilihanContainer.appendChild(btn);
  });
}

function cekJawaban(pilihan, benar, tombol) {
  const semuaBtn = pilihanContainer.querySelectorAll("button");
  semuaBtn.forEach((b) => (b.disabled = true));

  if (pilihan === benar) {
    tombol.classList.add("bg-green-500", "text-white", "animate-bounce");
    feedbackEl.textContent = "✅ Benar! Hebat, pilihanmu sehat!";
    feedbackEl.className =
      "mt-4 text-lg font-semibold text-green-600 dark:text-green-400 animate-pulse";
    score += poinPerSoal; // 🟢 tambah poin jika benar
  } else {
    tombol.classList.add("bg-red-500", "text-white", "animate-shake");
    feedbackEl.textContent = `❌ Salah! Jawaban yang benar: ${benar}`;
    feedbackEl.className =
      "mt-4 text-lg font-semibold text-red-600 dark:text-red-400 animate-shake";
  }

  // update progress bar
  progressBar.style.width = `${((currentIndex + 1) / quizData.length) * 100}%`;

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < quizData.length) {
    tampilkanSoal();
  } else {
    tampilkanHasil();
  }
});

function tampilkanHasil() {
  const totalPoin = quizData.length * poinPerSoal;
  const persentase = Math.round((score / totalPoin) * 100);

  let pesan = "";
  if (persentase >= 80) {
    pesan = "🌟 Luar biasa! Kamu paham banget soal gizi!";
  } else if (persentase >= 50) {
    pesan = "👍 Cukup baik! Masih bisa ditingkatkan!";
  } else {
    pesan = "💪 Ayo belajar lagi supaya makin sehat!";
  }

  pertanyaanEl.innerHTML = `
    🎉 Quiz Selesai! <br>
    <span class="text-green-600 dark:text-green-400">Skor: ${score} / ${totalPoin}</span>
  `;
  pilihanContainer.innerHTML = `
    <p class="text-lg mt-2">${pesan}</p>
    <p class="text-gray-600 mt-2">Persentase benar: ${persentase}%</p>
  `;
  feedbackEl.textContent = "";
  nextBtn.textContent = "🔁 Ulangi Quiz";
  nextBtn.onclick = mulaiQuiz;
  nextBtn.classList.remove("hidden");

  // penuhkan progress bar
  progressBar.style.width = "100%";
}

// === MULAI ===
mulaiQuiz();
