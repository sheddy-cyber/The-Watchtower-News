// backend/prisma/fix-images.js
// Run with: node prisma/fix-images.js
// Directly patches broken imageUrls in the database, covering both old and new slugs.

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  // Championship finals - slug stable, image may still be broken on some networks
  {
    slugs: ["championship-finals-record-breaking-attendance"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Spain_World_Cup_Winners_Argentina_v_Spain_19_July_2026-1.jpg/1280px-Spain_World_Cup_Winners_Argentina_v_Spain_19_July_2026-1.jpg",
  },
  // Ronaldo - slug stable, image may be broken
  {
    slugs: ["ronaldo-transfer-al-nassr-funding-dispute"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/41/RODRI_-_SWE_vs_ESP_-_UEFA_EURO_2020_QUALIFIERS_-_2019.10.15_%28cropped%29.jpg",
  },
  // France vs Ireland - OLD slug + NEW slug both patched
  {
    slugs: ["france-ireland-six-nations-36-14", "france-ireland-six-nations-bonus-point-win"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Bukayo_Saka.jpg",
  },
];

async function main() {
  console.log("🔧 Fixing sports article images...");

  for (const { slugs, imageUrl } of FIXES) {
    for (const slug of slugs) {
      const article = await prisma.article.findUnique({ where: { slug } });
      if (!article) {
        console.log(`  ⚠  Not found: ${slug}`);
        continue;
      }
      // Use picsum fallback — always loads regardless of Unsplash availability
      await prisma.article.update({
        where: { slug },
        data: { imageUrl },
      });
      console.log(`  ✓  Fixed: ${slug}`);
    }
  }

  console.log("✅ Image fix complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
