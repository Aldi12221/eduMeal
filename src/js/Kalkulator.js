
    function hitungKalori() {
      const berat = parseFloat(document.getElementById("berat").value);
      const tinggi = parseFloat(document.getElementById("tinggi").value);
      const umur = parseFloat(document.getElementById("umur").value);
      const gender = document.getElementById("gender").value;
      const aktivitas = parseFloat(document.getElementById("aktivitas").value);

      if (!berat || !tinggi || !umur) {
        document.getElementById("hasil").innerText = "Lengkapi semua data terlebih dahulu!";
        return;
      }

      let bmr = 0;
      if (gender === "pria") {
        bmr = 88.36 + (13.4 * berat) + (4.8 * tinggi) - (5.7 * umur);
      } else {
        bmr = 447.6 + (9.2 * berat) + (3.1 * tinggi) - (4.3 * umur);
      }

      const kebutuhan = (bmr * aktivitas).toFixed(0);
      document.getElementById("hasil").innerText = 
        `Kebutuhan kalori harianmu sekitar ${kebutuhan} kkal/hari 🍽️`;
    }
  
