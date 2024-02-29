let allPackageData;
let selectedCategory = "semua"; // Variabel Filter

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

function tampilkanPaket(filterCategory = "", filterBulan = "") {
  const containerDaftarPaket = document.getElementById("package-list");
  containerDaftarPaket.innerHTML = "";

  // All Filter
  const filterPaket = allPackageData.filter((item) => {
    // Filter Category
    const category =
      !filterCategory ||
      filterCategory === "semua" ||
      item.judul_paket.toLowerCase().includes(filterCategory);

    // Filter Bulan
    const bulan =
      !filterBulan ||
      parseInt(filterBulan) ===
        new Date(item.jadwal_keberangkatan).getMonth() + 1;

    return category & bulan;
  });

  filterPaket.forEach((item) => {
    const elemenPaket = document.createElement("div");
    elemenPaket.classList.add("paket");

    const namaPaket = document.createElement("h2");
    namaPaket.textContent = item.judul_paket;

    // Membuat container div
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("container-paket");

    const category = document.createElement("h3");
    category.textContent = `${item.kategori}`;
    containerDiv.appendChild(category);

    const jadwal = document.createElement("p");
    jadwal.textContent = `${item.jadwal_keberangkatan}`;
    containerDiv.appendChild(jadwal);

    const bintang = document.createElement("span");
    bintang.textContent = "🌟".repeat(item.hotel_star);
    containerDiv.appendChild(bintang);

    const harga = document.createElement("p");
    harga.textContent = `Rp. ${formatRupiah(item.price_quad_basic)}`;
    containerDiv.appendChild(harga);

    const imagePaket = document.createElement("img");
    imagePaket.src = item.image_thumbnail;
    imagePaket.alt = item.judul_paket;

    elemenPaket.appendChild(namaPaket);
    elemenPaket.appendChild(imagePaket);
    elemenPaket.appendChild(containerDiv);

    containerDaftarPaket.appendChild(elemenPaket);
  });
}

// Format Rupiah
function formatRupiah(angka) {
  return angka.toLocaleString("id-ID");
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
  // Filter menampilkan paket category yang di pilih
  selectedCategory = clickCheckbox.value;
  tampilkanPaket(selectedCategory);

  // filter bulan
  document.getElementById("filter-bulan").style.display = selectedCategory === 'semua' ? 'none' : 'block'
  
}

// Handle Click Bulan
function handleClickBulan() {
  const pilihBulan = document.getElementById("select-bulan").value;

  if (pilihBulan === "0") {
    tampilkanPaket(selectedCategory);
  } else {
    tampilkanPaket(selectedCategory, pilihBulan);
  }
}