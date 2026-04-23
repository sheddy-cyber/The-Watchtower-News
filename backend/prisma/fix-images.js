// backend/prisma/fix-images.js
// Run with: node prisma/fix-images.js
// Directly patches broken imageUrls in the database, covering both old and new slugs.

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const FIXES = [
  // Championship finals - slug stable, image may still be broken on some networks
  {
    slugs: ["championship-finals-record-breaking-attendance"],
    imageUrl: "https://images.unsplash.com/photo-1540747913346-19212a4cf528?w=900&q=80",
    fallback: "https://picsum.photos/seed/sports1/900/600",
  },
  // Ronaldo - slug stable, image may be broken
  {
    slugs: ["ronaldo-transfer-al-nassr-funding-dispute"],
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=900&q=80",
    fallback: "https://picsum.photos/seed/sports2/900/600",
  },
  // France vs Ireland - OLD slug + NEW slug both patched
  {
    slugs: ["france-ireland-six-nations-36-14", "france-ireland-six-nations-bonus-point-win"],
    imageUrl: "https://images.unsplash.com/photo-1551958219-acbc685cbf35?w=900&q=80",
    fallback: "https://picsum.photos/seed/sports3/900/600",
  },
];

async function main() {
  console.log("🔧 Fixing sports article images...");

  for (const { slugs, imageUrl, fallback } of FIXES) {
    for (const slug of slugs) {
      const article = await prisma.article.findUnique({ where: { slug } });
      if (!article) {
        console.log(`  ⚠  Not found: ${slug}`);
        continue;
      }
      // Use picsum fallback — always loads regardless of Unsplash availability
      await prisma.article.update({
        where: { slug },
        data: { imageUrl: fallback },
      });
      console.log(`  ✓  Fixed: ${slug}`);
    }
  }

  console.log("✅ Image fix complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
