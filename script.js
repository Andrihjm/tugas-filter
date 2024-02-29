let allPackageData;

document.addEventListener("DOMContentLoaded", () => {
  // Mengambil semua data paket saat halaman dimuat
  fetch("https://mock-api-pribadi-malik.vercel.app/api/mosleme-travel/packages")
    .then((response) => response.json())
    .then((data) => {
      allPackageData = data.cards;
      tampilkanPaket();
    })
    .catch((error) => {
      console.log("Fetch data nya erros mas broo", error);
    });
});

function tampilkanPaket() {
  const containerDaftarPaket = document.getElementById("package-list");

  allPackageData.forEach((item) => {
    const elemenPaket = document.createElement("div");
    elemenPaket.classList.add("paket");

    const namaPaket = document.createElement("h2");
    namaPaket.textContent = item.judul_paket;

    const createParagraph = (text, className) => {
      const p = document.createElement("p");
      p.textContent = text;
      if (className) {
        p.classList.add(className);
      }
      return p;
    };

    const category = createParagraph(item.kategori, "category-class");
    const jadwal = createParagraph(item.jadwal_keberangkatan, "jadwal-class");
    const bintang = createParagraph(item.hotel_star, "bintang-class");
    const harga = createParagraph(item.price_quad_basic, "harga-class");

    const imagePaket = document.createElement("img");
    imagePaket.src = item.image_thumbnail;
    imagePaket.alt = item.judul_paket;

    // const deskripsiPaket = document.createElement("p");
    // const hargaRupiah = formatRupiah(); // Konversi harga ke Rupiah
    // deskripsiPaket.innerHTML = `${}, ${

    // }, Rp.${hargaRupiah}-, ${"&#9733;".repeat()}`;

    elemenPaket.appendChild(namaPaket);
    elemenPaket.appendChild(imagePaket);
    elemenPaket.appendChild(category);
    elemenPaket.appendChild(jadwal);
    elemenPaket.appendChild(bintang);
    elemenPaket.appendChild(harga);

    containerDaftarPaket.appendChild(elemenPaket);
  });
}

// Format harga ke Rupiah
function formatRupiah(angka) {
  let reverse = angka.toString().split("").reverse().join("");
  ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan.join(".").split("").reverse().join("");
  return ribuan;
}

// Handle Click Checkbox
function handleClickCheckbox(clickCheckbox) {
  let checkbox = document.getElementsByClassName("checkbox-filter");

  // Uncheck semua checkbox kecuali yang di click
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i] !== clickCheckbox) {
      checkbox[i].checked = false;
    }
  }
}
