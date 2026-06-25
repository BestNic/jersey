const featuredGrid = document.getElementById("featured-grid");
const catalogGrid = document.getElementById("catalog-grid");
const filterButtons = document.querySelectorAll(".filter-btn");

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
        <a class="btn btn-whatsapp" href="${createWhatsAppLink(product)}" target="_blank" rel="noopener noreferrer">Order on WhatsApp</a>
        <a class="btn btn-ghost" href="product.html?id=${product.id}">View Details</a>
      </div>
    </div>
  `;
  return card;
}

function renderFeatured() {
  const featured = BRAINSHOP_PRODUCTS.slice(0, 4);
  featuredGrid.innerHTML = "";
  featured.forEach((product) => featuredGrid.appendChild(productCard(product)));
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

renderFeatured();
renderCatalog();
setupFilters();
applyRevealAnimation();
setYear();
