const quizData = [
  {
    pertanyaan: "Makanan manakah yang mengandung protein tinggi?",
    pilihan: ["Nasi Putih", "Telur Rebus", "Bayam", "Apel"],
    jawaban: "Telur Rebus"
  },
  {
    pertanyaan: "Zat gizi utama yang memberikan energi terbesar adalah?",
    pilihan: ["Lemak", "Protein", "Vitamin", "Air"],
    jawaban: "Lemak"
  },
  {
    pertanyaan: "Sayuran yang kaya zat besi adalah?",
    pilihan: ["Bayam", "Kentang", "Tomat", "Ketimun"],
    jawaban: "Bayam"
  },
  {
    pertanyaan: "Buah yang kaya vitamin C adalah?",
    pilihan: ["Jeruk", "Pisang", "Apel", "Pepaya"],
    jawaban: "Jeruk"
  },
  {
    pertanyaan: "Sumber karbohidrat utama di Indonesia adalah?",
    pilihan: ["Nasi", "Ayam", "Telur", "Kacang-kacangan"],
    jawaban: "Nasi"
  },
  {
    pertanyaan: "Zat gizi yang berfungsi membangun jaringan tubuh adalah?",
    pilihan: ["Protein", "Lemak", "Vitamin", "Mineral"],
    jawaban: "Protein"
  },
  {
    pertanyaan: "Contoh makanan sumber serat adalah?",
    pilihan: ["Roti Putih", "Sayur dan Buah", "Daging Sapi", "Susu"],
    jawaban: "Sayur dan Buah"
  },
  {
    pertanyaan: "Kekurangan vitamin A dapat menyebabkan?",
    pilihan: ["Rabun Senja", "Diare", "Sakit Gigi", "Sakit Kepala"],
    jawaban: "Rabun Senja"
  },
  {
    pertanyaan: "Makanan yang mengandung kalsium tinggi adalah?",
    pilihan: ["Susu", "Nasi", "Daging", "Pisang"],
    jawaban: "Susu"
  },
  {
    pertanyaan: "Zat yang diperlukan tubuh untuk mencegah dehidrasi adalah?",
    pilihan: ["Air", "Protein", "Vitamin C", "Serat"],
    jawaban: "Air"
  },
  {
    pertanyaan: "Berapa kali sebaiknya kita makan dalam sehari?",
    pilihan: ["1 kali", "2 kali", "3 kali", "5 kali"],
    jawaban: "3 kali"
  },
  {
    pertanyaan: "Makanan cepat saji sebaiknya dikonsumsi?",
    pilihan: ["Setiap hari", "Kadang-kadang saja", "Tidak pernah", "Sebanyak mungkin"],
    jawaban: "Kadang-kadang saja"
  },
  {
    pertanyaan: "Vitamin D banyak terdapat pada?",
    pilihan: ["Ikan dan Sinar Matahari", "Sayur Hijau", "Kacang Tanah", "Apel"],
    jawaban: "Ikan dan Sinar Matahari"
  },
  {
    pertanyaan: "Zat besi berfungsi untuk?",
    pilihan: ["Membentuk sel darah merah", "Menjaga kulit", "Membentuk tulang", "Menjaga mata"],
    jawaban: "Membentuk sel darah merah"
  },
  {
    pertanyaan: "Sayur berwarna hijau tua banyak mengandung?",
    pilihan: ["Zat Besi dan Klorofil", "Gula", "Lemak", "Kolesterol"],
    jawaban: "Zat Besi dan Klorofil"
  },
  {
    pertanyaan: "Contoh makanan sumber lemak baik adalah?",
    pilihan: ["Alpukat", "Gorengan", "Mie Instan", "Kue Manis"],
    jawaban: "Alpukat"
  },
  {
    pertanyaan: "Buah yang baik untuk pencernaan karena tinggi serat adalah?",
    pilihan: ["Pepaya", "Durian", "Nangka", "Rambutan"],
    jawaban: "Pepaya"
  },
  {
    pertanyaan: "Zat gizi yang membantu memperkuat tulang dan gigi adalah?",
    pilihan: ["Kalsium", "Zat Besi", "Vitamin C", "Protein"],
    jawaban: "Kalsium"
  },
  {
    pertanyaan: "Makanan sumber energi adalah?",
    pilihan: ["Nasi dan Roti", "Air Putih", "Sayur Hijau", "Telur"],
    jawaban: "Nasi dan Roti"
  },
  {
    pertanyaan: "Zat gizi yang membantu penyembuhan luka adalah?",
    pilihan: ["Vitamin C", "Lemak", "Karbohidrat", "Air"],
    jawaban: "Vitamin C"
  },
  {
    pertanyaan: "Minuman terbaik untuk tubuh adalah?",
    pilihan: ["Air Putih", "Kopi", "Teh Manis", "Soda"],
    jawaban: "Air Putih"
  },
  {
    pertanyaan: "Zat gizi yang berfungsi sebagai pelindung tubuh dari penyakit adalah?",
    pilihan: ["Vitamin dan Mineral", "Karbohidrat", "Lemak", "Gula"],
    jawaban: "Vitamin dan Mineral"
  },
  {
    pertanyaan: "Kekurangan zat besi dapat menyebabkan?",
    pilihan: ["Anemia", "Obesitas", "Hipertensi", "Sembelit"],
    jawaban: "Anemia"
  },
  {
    pertanyaan: "Makanan yang tinggi kolesterol adalah?",
    pilihan: ["Kuning Telur", "Sayur Bayam", "Buah Apel", "Tahu"],
    jawaban: "Kuning Telur"
  },
  {
    pertanyaan: "Zat gizi yang dibutuhkan dalam jumlah kecil tetapi penting adalah?",
    pilihan: ["Vitamin dan Mineral", "Air", "Karbohidrat", "Protein"],
    jawaban: "Vitamin dan Mineral"
  },
  {
    pertanyaan: "Fungsi utama karbohidrat adalah?",
    pilihan: ["Sumber energi", "Pembentuk otot", "Pelindung tubuh", "Mencegah dehidrasi"],
    jawaban: "Sumber energi"
  },
  {
    pertanyaan: "Buah yang mengandung banyak air adalah?",
    pilihan: ["Semangka", "Durian", "Nangka", "Pisang"],
    jawaban: "Semangka"
  },
  {
    pertanyaan: "Kebutuhan gizi setiap orang tergantung pada?",
    pilihan: ["Usia, jenis kelamin, dan aktivitas", "Warna kulit", "Tinggi badan saja", "Pekerjaan orang tua"],
    jawaban: "Usia, jenis kelamin, dan aktivitas"
  },
  {
    pertanyaan: "Salah satu tanda tubuh kekurangan cairan adalah?",
    pilihan: ["Mulut kering", "Nafsu makan meningkat", "Tidur nyenyak", "Badan segar"],
    jawaban: "Mulut kering"
  },
  {
    pertanyaan: "Menu gizi seimbang harus mengandung?",
    pilihan: ["Karbohidrat, protein, lemak, vitamin, mineral, air", "Karbohidrat saja", "Protein saja", "Lemak saja"],
    jawaban: "Karbohidrat, protein, lemak, vitamin, mineral, air"
  }
];
