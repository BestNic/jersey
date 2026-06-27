const catalogGrid = document.getElementById("catalog-grid");
const suppliersContainer = document.getElementById("suppliers-container");
const filterButtons = document.querySelectorAll(".filter-btn");

const WHATSAPP_ICON = `
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 0 1-4.075-1.12l-.293-.174-2.867.853.853-2.867-.174-.293A7.96 7.96 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
  </svg>
`;

function supplierCard(supplier) {
  const waLink = createSupplierWhatsAppLink(supplier);
  const badgeName = supplier.name.toUpperCase();
  const card = document.createElement("article");
  card.className = "supplier-card reveal";
  card.innerHTML = `
    <div class="supplier-card-top" style="background:${supplier.bg}">
      <h3 class="supplier-card-badge">PRIVATE<br>${badgeName}<br>SUPPLIER</h3>
      <div class="supplier-card-visual">
        <img class="supplier-card-image" src="${supplier.image}" alt="${supplier.name}" loading="lazy" />
      </div>
      <a class="supplier-wa-icon" href="${waLink}" target="_blank" rel="noopener noreferrer" aria-label="Ordina ${supplier.name} su WhatsApp">
        ${WHATSAPP_ICON}
      </a>
      <a class="supplier-vendita-btn" href="${waLink}" target="_blank" rel="noopener noreferrer">Ordina su WhatsApp</a>
    </div>
    <div class="supplier-card-bottom">
      <p class="supplier-title">Fornitore privato di ${supplier.label}</p>
      <p class="supplier-old-price"><s>${formatEuro(supplier.originalPrice)}</s></p>
      <p class="supplier-price">${formatEuro(supplier.price)}</p>
      <a class="btn btn-whatsapp btn-supplier-order" href="${waLink}" target="_blank" rel="noopener noreferrer">Ordina su WhatsApp</a>
    </div>
  `;
  return card;
}

function renderSuppliers() {
  if (!suppliersContainer) return;
  suppliersContainer.innerHTML = "";

  SUPPLIER_TIERS.forEach((tier) => {
    const section = document.createElement("section");
    section.className = "supplier-tier reveal";
    section.innerHTML = `<h3 class="supplier-tier-title">${tier.title}</h3>`;

    const grid = document.createElement("div");
    grid.className = "suppliers-grid";
    tier.suppliers.forEach((supplier) => grid.appendChild(supplierCard(supplier)));
    section.appendChild(grid);
    suppliersContainer.appendChild(section);
  });

  initSupplierImageBackgroundRemoval(suppliersContainer);
  watchSupplierImages();
}

function setupPackageCard() {
  const packageLink = createPackageWhatsAppLink();
  const buyLink = document.getElementById("package-buy-link");
  const waLink = document.getElementById("package-wa-link");
  const orderBtn = document.getElementById("package-order-btn");
  const oldPrice = document.getElementById("package-old-price");
  const price = document.getElementById("package-price");
  const packageImage = document.getElementById("package-image");

  if (buyLink) buyLink.href = packageLink;
  if (waLink) waLink.href = packageLink;
  if (orderBtn) orderBtn.href = packageLink;
  if (oldPrice) oldPrice.innerHTML = `<s>${formatEuro(PACKAGE_ORIGINAL_PRICE)}</s>`;
  if (price) price.textContent = formatEuro(PACKAGE_PRICE);
  if (packageImage) packageImage.src = PACKAGE_IMAGE;

  const packageCount = document.getElementById("package-count");
  if (packageCount) packageCount.textContent = String(BRAINSHOP_SUPPLIERS.length);

  initSupplierImageBackgroundRemoval(document.querySelector(".package-card"));
  watchSupplierImages();
}

function productCard(product) {
  const card = document.createElement("article");
  card.className = "product-card reveal";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" loading="lazy" />
    <div class="product-content">
      <p class="product-type">${product.type === "club" ? "Club" : "National Team"}</p>
      <h3>${product.name}</h3>
      <p class="product-price">${formatEuro(product.price)}</p>
      <div class="product-actions">
        <a class="btn btn-whatsapp" href="${createWhatsAppLink(product)}" target="_blank" rel="noopener noreferrer">Ordina su WhatsApp</a>
        <a class="btn btn-ghost" href="product.html?id=${product.id}">View Details</a>
      </div>
    </div>
  `;
  return card;
}

function renderCatalog(filter = "all") {
  catalogGrid.innerHTML = "";
  const list = filter === "all"
    ? BRAINSHOP_PRODUCTS
    : BRAINSHOP_PRODUCTS.filter((product) => product.type === filter);

  list.forEach((product) => catalogGrid.appendChild(productCard(product)));
}

function setupFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      renderCatalog(button.dataset.filter);
      applyRevealAnimation();
    });
  });
}

function applyRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    if (!el.classList.contains("visible")) {
      observer.observe(el);
    }
  });
}

function setYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

renderCatalog();
renderSuppliers();
setupPackageCard();
setupFilters();
applyRevealAnimation();
setYear();
watchSupplierImages();
