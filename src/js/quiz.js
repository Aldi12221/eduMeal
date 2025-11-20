const pertanyaanEl = document.getElementById("pertanyaan");
const pilihanContainer = document.getElementById("pilihanContainer");
const nextBtn = document.getElementById("nextBtn");
const feedbackEl = document.getElementById("jawaban");
const progressBar = document.getElementById("progressBar");
const quizContainer = document.getElementById("quizContainer"); 

let currentIndex = 0;
let shuffledQuiz = [];
let score = 0;
let quizData = []; 
const poinPerSoal = 10; 


async function fetchQuizData() {
    
    pertanyaanEl.innerHTML = `<span class="text-xl text-center text-green-600 dark:text-green-400 animate-pulse">Memuat soal quiz...</span>`;
    pilihanContainer.innerHTML = ''; 
    feedbackEl.textContent = '';

    try {
        const response = await fetch('quizData.json'); 
        
        
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        quizData = await response.json(); 
        
        if (quizData.length === 0) {
            throw new Error("Data quiz kosong.");
        }
        
        
        mulaiQuiz(); 
        
    } catch (error) {
        console.error("Gagal mengambil data quiz:", error);
        
        pertanyaanEl.innerHTML = `<span class="text-xl text-center text-red-500">Gagal memuat quiz. Cek koneksi atau file JSON Anda. (${error.message})</span>`;
    }
}




function acakSoal(data) {
  return data.sort(() => Math.random() - 0.5);
}

function mulaiQuiz() {
  shuffledQuiz = acakSoal([...quizData]);
  currentIndex = 0;
  score = 0;
  
  
  nextBtn.onclick = handleNextButton; 
  nextBtn.textContent = "Soal Berikutnya →";
  nextBtn.classList.add("hidden");

  tampilkanSoal();
}

function tampilkanSoal() {
  if (shuffledQuiz.length === 0) return;

  const soal = shuffledQuiz[currentIndex];
  
  
  pertanyaanEl.textContent = soal.pertanyaan;
  pilihanContainer.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.classList.add("hidden");

  
  progressBar.style.width = `${(currentIndex / 20) * 100}%`;

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
    score += poinPerSoal; 
  } else {
    tombol.classList.add("bg-red-500", "text-white", "animate-shake");
    
   
    semuaBtn.forEach((b) => {
        if (b.textContent === benar) {
            b.classList.add("bg-green-300", "dark:bg-green-700", "text-white");
        }
    });

    feedbackEl.textContent = `❌ Salah! Jawaban yang benar: ${benar}`;
    feedbackEl.className =
      "mt-4 text-lg font-semibold text-red-600 dark:text-red-400 animate-shake";
  }

 
  progressBar.style.width = `${((currentIndex + 1) / 20) * 100}%`;

  nextBtn.classList.remove("hidden");
}

function handleNextButton() {
  currentIndex++;
  if (currentIndex < 20) {
    tampilkanSoal();
  } else {
    tampilkanHasil();
  }
}

nextBtn.addEventListener("click", handleNextButton);

function tampilkanHasil() {
  const totalPoin = 10 * poinPerSoal;
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

 
  progressBar.style.width = "100%";
}


fetchQuizData();