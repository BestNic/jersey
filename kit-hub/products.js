const BRAINSHOP_PHONE = "393338207631";

const BRAINSHOP_PRODUCTS = [
  {
    id: "barcelona-pink-25-26",
    name: "Maglia rosa Barcellona 25/26",
    price: 29.99,
    type: "club",
    language: "it",
    image: "assets/products/barcelona-pink-25-26.jpeg",
    description: "Kit speciale Barcellona 25/26 con look rosa premium e dettagli moderni."
  },
  {
    id: "brazil-2026",
    name: "Brazil 2026",
    price: 29.99,
    type: "national",
    language: "en",
    image: "assets/products/brazil-2026.jpeg",
    description: "Classic Brazil yellow shirt for 2026 with lightweight, breathable fabric."
  },
  {
    id: "real-madrid-black-25-26",
    name: "Real Madrid Black 25/26",
    price: 29.99,
    type: "club",
    language: "en",
    image: "assets/products/real-madrid-black-25-26.jpeg",
    description: "Black Real Madrid edition 25/26 with sharp contrast details and premium fit."
  },
  {
    id: "argentina-2026",
    name: "Argentina 2026",
    price: 29.99,
    type: "national",
    language: "en",
    image: "assets/products/argentina-2026.jpeg",
    description: "Argentina 2026 jersey inspired by iconic stripes and match-ready comfort."
  },
  {
    id: "real-madrid-white-25-26",
    name: "Maglia Real Madrid bianca 25/26",
    price: 29.99,
    type: "club",
    language: "it",
    image: "assets/products/real-madrid-white-25-26.jpeg",
    description: "Versione home bianca Real Madrid 25/26 con finiture premium."
  },
  {
    id: "milan-ucl-final-2006-07",
    name: "Maglia Milan Finale UEFA Champions League 2006/07",
    price: 34.99,
    type: "club",
    language: "it",
    image: "assets/products/milan-ucl-final-2006-07.jpeg",
    description: "Maglia iconica del Milan legata alla finale UEFA Champions League 2006/07."
  }
];

function createWhatsAppLink(product) {
  const language = product.language === "it" ? "it" : "en";
  const message = language === "it"
    ? `Ciao, vorrei ordinare ${product.name}. È disponibile?`
    : `Hi, I want to order ${product.name}. Is it available?`;
  return `https://wa.me/${BRAINSHOP_PHONE}?text=${encodeURIComponent(message)}`;
}

function formatEuro(price) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR"
  }).format(price);
}
