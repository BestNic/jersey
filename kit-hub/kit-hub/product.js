const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const productView = document.getElementById("product-view");

function setYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function renderProduct(product) {
  productView.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-view-image" />
    <div class="product-view-content">
      <p class="product-type">${product.type === "club" ? "Club" : "National Team"}</p>
      <h1>${product.name}</h1>
      <p class="product-price product-price-lg">${formatEuro(product.price)}</p>
      <p class="product-description">${product.description}</p>
      <a class="btn btn-whatsapp" href="${createWhatsAppLink(product)}" target="_blank" rel="noopener noreferrer">
        Ordina su WhatsApp
      </a>
    </div>
  `;
}

function renderFallback() {
  productView.innerHTML = `
    <div class="panel">
      <h2>Product not found</h2>
      <p>Please go back to the catalog and choose a jersey.</p>
      <a class="btn btn-primary" href="index.html#catalog">Back to Catalog</a>
    </div>
  `;
}

const product = BRAINSHOP_PRODUCTS.find((item) => item.id === productId);
if (product) {
  renderProduct(product);
} else {
  renderFallback();
}

setYear();
