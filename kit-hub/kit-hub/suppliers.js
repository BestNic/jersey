const SUPPLIER_PRICE = 4.99;
const SUPPLIER_ORIGINAL_PRICE = 9.99;
const PACKAGE_PRICE = 39.99;
const SUPPLIER_IMAGE_DIR = "assets/suppliers";

const SUPPLIER_COLORS = [
  "#FF6B00", "#E63946", "#2563EB", "#16A34A", "#9333EA",
  "#D97706", "#0891B2", "#BE185D", "#CA8A04", "#DC2626",
  "#7C3AED", "#0D9488", "#EA580C", "#4F46E5", "#DB2777",
  "#059669", "#B45309", "#1D4ED8", "#C026D3", "#65A30D",
  "#F97316", "#EF4444", "#3B82F6", "#10B981", "#8B5CF6",
  "#F59E0B", "#06B6D4", "#EC4899", "#84CC16", "#6366F1",
  "#14B8A6", "#F43F5E", "#A855F7", "#22C55E", "#FB923C",
  "#2DD4BF", "#E11D48", "#7E22CE", "#15803D", "#1E40AF",
  "#C2410C", "#0E7490", "#A21CAF", "#4D7C0F", "#4338CA",
  "#0F766E", "#BE123C", "#6D28D9", "#166534", "#1E3A8A",
  "#9A3412", "#155E75", "#86198F", "#3F6212", "#312E81"
];

function supplierImagePath(id) {
  return `${SUPPLIER_IMAGE_DIR}/${id}.jpeg`;
}

const SUPPLIER_TIERS = [
  {
    id: "fascia-1",
    title: "⭐ Fascia 1 – I più richiesti",
    suppliers: [
      { id: "sneakers", name: "Sneakers", label: "sneakers premium" },
      { id: "nike-trainers", name: "Nike Trainers", label: "Nike trainers" },
      { id: "adidas", name: "Adidas", label: "linea Adidas" },
      { id: "football-jersey-1", name: "Football Jersey Supplier 1", label: "maglie da calcio" },
      { id: "football-jersey-2", name: "Football Jersey Supplier 2", label: "maglie da calcio premium" },
      { id: "football-boots", name: "Football Boots", label: "scarpe da calcio" },
      { id: "stussy", name: "Stüssy", label: "Stüssy streetwear" },
      { id: "corteiz", name: "Corteiz", label: "Corteiz clothing" },
      { id: "essentials", name: "Essentials", label: "Fear of God Essentials" },
      { id: "broken-planet", name: "Broken Planet", label: "Broken Planet" },
      { id: "carhartt", name: "Carhartt", label: "workwear Carhartt" },
      { id: "ralph-lauren", name: "Ralph Lauren", label: "Ralph Lauren" },
      { id: "stone-island", name: "Stone Island", label: "Stone Island" },
      { id: "the-north-face", name: "The North Face", label: "The North Face" }
    ]
  },
  {
    id: "fascia-2",
    title: "⭐ Fascia 2 – Molto richiesti",
    suppliers: [
      { id: "represent", name: "Represent", label: "Represent clothing" },
      { id: "bape", name: "BAPE", label: "streetwear BAPE" },
      { id: "cdg-play", name: "CDG Play", label: "Comme des Garçons Play" },
      { id: "ami", name: "Ami", label: "Ami Paris style" },
      { id: "alo", name: "Alo", label: "Alo Yoga activewear" },
      { id: "lululemon", name: "Lululemon", label: "Lululemon activewear" },
      { id: "activewear", name: "Activewear", label: "activewear sportivo" },
      { id: "gymwear", name: "Gymwear", label: "abbigliamento palestra" },
      { id: "ugg", name: "UGG", label: "UGG boots" },
      { id: "asics-trainers", name: "Asics Trainers", label: "Asics running" },
      { id: "p6000", name: "P-6000", label: "Nike P-6000" }
    ]
  },
  {
    id: "fascia-3",
    title: "👕 Fascia 3 – Utili per completare il catalogo",
    suppliers: [
      { id: "streetwear", name: "Streetwear", label: "streetwear esclusivo" },
      { id: "blank-hoodies", name: "Blank Hoodies", label: "felpe basic" },
      { id: "pants", name: "Pants", label: "pantaloni premium" },
      { id: "socks", name: "Socks", label: "calze e socks" },
      { id: "hats-beanie", name: "Hats & Beanie", label: "cappelli e beanie" },
      { id: "bucket-hat", name: "Bucket Hat", label: "bucket hat" },
      { id: "nike-miler", name: "Nike Miler", label: "Nike Miler running" }
    ]
  },
  {
    id: "fascia-4",
    title: "👜 Fascia 4 – Accessori",
    suppliers: [
      { id: "hand-bags", name: "Hand Bags", label: "borse e handbag" },
      { id: "sunglasses", name: "Sunglasses", label: "occhiali da sole" },
      { id: "belt", name: "Belt", label: "cinture luxury" },
      { id: "necklace", name: "Necklace", label: "collane e gioielli" },
      { id: "bracelet-1", name: "Bracelet", label: "bracciali premium" },
      { id: "bracelet-2", name: "Bracelet Gold", label: "bracciali luxury" },
      { id: "van-cleef", name: "Van Cleef", label: "Van Cleef style" },
      { id: "scarf", name: "Scarf", label: "sciarpe premium" },
      { id: "keychain", name: "Keychain", label: "portachiavi luxury" },
      { id: "phone-case", name: "Phone Case", label: "cover smartphone" }
    ]
  },
  {
    id: "fascia-5",
    title: "👗 Fascia 5 – Donna e moda",
    suppliers: [
      { id: "dresses", name: "Dresses", label: "abiti e dress" },
      { id: "satin-dress", name: "Satin Dress", label: "abiti in raso" },
      { id: "bodysuit-tops", name: "Bodysuit & Tops", label: "body e top" },
      { id: "skirts", name: "Skirts", label: "gonne e skirt" },
      { id: "swimsuit", name: "Swimsuit", label: "costumi da bagno" },
      { id: "heels", name: "Heels", label: "heels & tacchi" }
    ]
  },
  {
    id: "fascia-6",
    title: "🧥 Fascia 6 – Più di nicchia",
    suppliers: [
      { id: "winter-jacket", name: "Winter Jacket", label: "giacche invernali" },
      { id: "birkenstock", name: "Birkenstock", label: "sandali Birkenstock" },
      { id: "coach", name: "Coach", label: "Coach bags" },
      { id: "perfume", name: "Perfume", label: "profumi premium" },
      { id: "gloves", name: "Gloves", label: "guanti moda" }
    ]
  }
];

const BRAINSHOP_SUPPLIERS = SUPPLIER_TIERS.flatMap((tier) => tier.suppliers);
const PACKAGE_ORIGINAL_PRICE = BRAINSHOP_SUPPLIERS.length * SUPPLIER_PRICE;
const PACKAGE_IMAGE = supplierImagePath("package");

BRAINSHOP_SUPPLIERS.forEach((supplier, index) => {
  supplier.image = supplierImagePath(supplier.id);
  supplier.bg = SUPPLIER_COLORS[index % SUPPLIER_COLORS.length];
  supplier.price = SUPPLIER_PRICE;
  supplier.originalPrice = SUPPLIER_ORIGINAL_PRICE;
});

function createSupplierWhatsAppLink(supplier) {
  const message = `Ciao BrainShop, vorrei acquistare il fornitore "${supplier.name}" a 4,99€. È disponibile?`;
  return `https://wa.me/${BRAINSHOP_PHONE}?text=${encodeURIComponent(message)}`;
}

function createPackageWhatsAppLink() {
  const message = `Ciao BrainShop, vorrei acquistare il pacchetto completo con tutti i ${BRAINSHOP_SUPPLIERS.length} fornitori a 39,99€. È disponibile?`;
  return `https://wa.me/${BRAINSHOP_PHONE}?text=${encodeURIComponent(message)}`;
}
