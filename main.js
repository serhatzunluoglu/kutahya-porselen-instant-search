// Ürün listeleme ve diğer işlemler için gerekli olan HTML elementlerini seçme
const searchMagnifier = document.getElementById("search_magnifier");
const modalContainer = document.getElementById("modal_container");
const searchInput = document.getElementById("search_input");
const searchContainer = document.getElementById("search_container");
const closeButton = document.getElementById("close_button");
const productList = document.getElementById("product_list");
let productData = [];

// Sayfa yüklendiğinde JSON dosyasından verileri alma
window.addEventListener("load", function () {
  fetch("data/products.json")
    .then((response) => response.json())
    .then((data) => {
      productData = data;
    })
    .catch((error) => console.error("Veri çekme hatası:", error));
});

// Büyüteç ikonuna tıklandığında modal'ı açarak ürün arama fonksiyonunu başlatma. JSON dosyasından alanına bilgileri kullanıcı tarafından girilen kelimeye göre filtreleyip, sonuçları dinamik olarak modal içerisinde gösterme. Arama inputunda yapılan değişikliklere göre ürünleri filtreleyip, uygun başlık ve mesajları görüntülüme
searchMagnifier.addEventListener("click", function () {
  modalContainer.classList.add("show");
  document.body.style.overflowY = "hidden";

  // Filtreleme sonucu gelen ürün listesindeki her bir ürünü gerekli HTML elementlerini oluşturarak kullanıcıya gösterme
  function displayProducts(products) {
    productList.innerHTML = "";
    productList.style.display = "flex";

    if (products.length >= 1) {
      const resultHeader = document.createElement("h3");
      resultHeader.textContent = "Arama Sonuçlarınız";
      productList.appendChild(resultHeader);
    } else {
      const notFound = document.createElement("h3");
      notFound.textContent = "Aramanızla ilgili bir ürün bulunamadı.";
      productList.appendChild(notFound);
    }

    products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product");
      productItem.innerHTML = `
          <img class="product-image" src="${product.image}" alt="${product.name}" width="100">
          <div class="product-details">
          <h2 class="product-title">${product.name}</h2>
          <p>${product.price}</p>
          </div>
      `;
      productList.appendChild(productItem);
    });

    // Aranan kelime 1 harften uzunsa ve sonuçlar varsa özel mesajı ekle
    if (searchInput.value.length > 1) {
      const searchTermInfo = document.createElement("div");
      searchTermInfo.classList.add("search-term-info");
      searchTermInfo.textContent = `${searchInput.value} ile İlgili Sonuçları Göster`;
      productList.appendChild(searchTermInfo);
    }
  }

  // Arama inputunu dinleyip filtreleme yapma
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );

    if (searchTerm === "") {
      productList.innerHTML = "";
      productList.style.display = "none";
    } else {
      displayProducts(filteredProducts);
    }
  });
});

// Büyüteç ikonuna tıkladıktan sonra gelen Modal'ı kapatma işlemi
closeButton.addEventListener("click", () => {
  modalContainer.classList.remove("show");
  document.body.style.overflowY = "auto";
});
