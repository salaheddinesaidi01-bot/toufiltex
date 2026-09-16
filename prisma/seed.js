const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début de l'initialisation de la base de données Toufiltex...");

  const catAmeublement = await prisma.category.upsert({
    where: { slug: "ameublement" },
    update: {},
    create: {
      name: "Tissus d'Ameublement & Déco",
      slug: "ameublement",
      description: "Jacquards d'exception, velours soyeux et toiles texturées pour rideaux, sièges et hôtellerie.",
    },
  });

  const catFilature = await prisma.category.upsert({
    where: { slug: "filature" },
    update: {},
    create: {
      name: "Filature & Fils Industriels",
      slug: "filature",
      description: "Fils 100% coton peigné, polyester haute ténacité et mélanges techniques.",
    },
  });

  const catMailles = await prisma.category.upsert({
    where: { slug: "mailles" },
    update: {},
    create: {
      name: "Mailles & Tricotage Circulaire",
      slug: "mailles",
      description: "Jersey fin, interlock, molleton gratté et piqué pour confection de mode.",
    },
  });

  console.log("✅ Catégories initialisées.");

  // Product 1
  await prisma.product.upsert({
    where: { reference: "SAT-EGY-400" },
    update: {},
    create: {
      name: "Satin de Coton d'Égypte 120 Fil",
      reference: "SAT-EGY-400",
      slug: "satin-coton-egypte-120",
      description: "Tissu d'une douceur satinée remarquable, tissé avec des fibres extra-longues de coton égyptien. Idéal pour le linge de lit de prestige des palaces.",
      composition: "100% Coton d'Égypte peigné longues fibres",
      grammage: 135,
      width: 280,
      usage: "Linge de lit de luxe, Hôtellerie 5 étoiles, Chemiserie",
      certifications: ["OEKO-TEX Standard 100", "GOTS Certified", "Origine Égypte"],
      colors: ["#FFFFFF", "#F4F1EA", "#D4C7B5"],
      imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop",
      featured: true,
      minOrderMeters: 50,
      inStock: true,
      categoryId: catFilature.id,
    },
  });

  // Product 2
  await prisma.product.upsert({
    where: { reference: "LIN-NOR-280" },
    update: {},
    create: {
      name: "Toile de Lin Normand Pur Lavé",
      reference: "LIN-NOR-280",
      slug: "toile-lin-normand-pur-lave",
      description: "Lin authentique cultivé en Normandie, adouci mécaniquement sans traitement chimique nocif.",
      composition: "100% Lin européen certifié Masters of Linen",
      grammage: 220,
      width: 145,
      usage: "Rideaux, Canapés, Coussins, Linge de table",
      certifications: ["European Flax", "OEKO-TEX Class 1", "Masters of Linen"],
      colors: ["#E3DAC9", "#C2B280", "#4A5859"],
      imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1000&auto=format&fit=crop",
      featured: true,
      minOrderMeters: 25,
      inStock: true,
      categoryId: catAmeublement.id,
    },
  });

  console.log("✅ Produits initiaux créés avec succès !");
}

main()
  .catch((e) => {
    console.error("Erreur de seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
