// backend/prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const articles = [
  {
    title: "Global Climate Summit Reaches Historic Agreement",
    slug: "global-climate-summit-historic-agreement",
    category: "World",
    author: "Sarah Mitchell",
    excerpt: "World leaders convene to establish groundbreaking environmental policies affecting over 150 nations.",
    content: `In a momentous gathering at the International Climate Conference, representatives from 150 nations have reached a historic consensus on environmental policy. The agreement, dubbed the 'Green Horizon Pact,' establishes stringent carbon reduction targets and commits billions in funding for renewable energy infrastructure.\n\nThe pact represents years of diplomatic negotiations and marks a turning point in global environmental cooperation. Key provisions include a 50% reduction in carbon emissions by 2035, mandatory transition to renewable energy sources, and substantial financial support for developing nations to implement green technologies.\n\nEnvironmental advocates have praised the agreement as a critical step forward, though some critics argue the targets should be even more ambitious. The implementation phase begins immediately, with quarterly reviews to ensure compliance across all signatory nations.`,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&q=80",
    trending: true, views: 15420,
  },
  {
    title: "US Believes Its Power Matters More Than International Law, UN Chief Says",
    slug: "us-power-international-law-un-chief",
    category: "World",
    author: "Anna Foster",
    excerpt: "The US is acting with impunity and believes its power matters more than international law, the head of the UN has told The Watchtower.",
    content: `The United Nations Secretary-General has issued an unusually pointed rebuke of the United States, telling The Watchtower in an exclusive interview that Washington increasingly operates outside the norms of international law.\n\nThe Secretary-General cited recent unilateral actions in trade policy, military posture, and multilateral treaty withdrawal as evidence of a deepening disregard for international governance frameworks. Senior diplomats from European and Asian nations expressed private agreement with the assessment.\n\nWhite House officials declined to respond directly, instead reiterating their position that American sovereignty supersedes any external jurisdiction. Legal scholars noted the remarks reflect a broader fracturing of the post-1945 international order.`,
    imageUrl: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=900&q=80",
    trending: true, views: 12800,
  },
  {
    title: "China's Birth Rate Hits Record Low as Population Continues to Shrink",
    slug: "china-birth-rate-record-low-population",
    category: "World",
    author: "Kelly Ng",
    excerpt: "China's birth rates sunk to a record low in 2025, despite the government rolling out a spate of incentives to boost it.",
    content: `China's National Bureau of Statistics released figures Tuesday confirming that births fell to 7.2 per thousand people in 2025, the lowest since modern records began. The country's population shrank for the fourth consecutive year, accelerating a demographic crisis that economists warn will weigh on growth for decades.\n\nBeijing has responded with a battery of pro-natalist measures, including extended parental leave, childcare subsidies, and tax breaks for families with two or more children. Yet surveys suggest young urban professionals remain unconvinced, citing the high cost of housing, education, and child-rearing.\n\nDemographers project China's working-age population will decline by roughly 100 million by 2050, posing significant challenges for pension systems, healthcare financing, and the country's ambitions to reach high-income status.`,
    imageUrl: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=900&q=80",
    trending: true, views: 9400,
  },
  {
    title: "Tech Giant Unveils Revolutionary AI Assistant",
    slug: "tech-giant-ai-assistant-launch",
    category: "Technology",
    author: "David Chen",
    excerpt: "New artificial intelligence platform promises to transform workplace productivity and personal computing.",
    content: `Silicon Valley's leading technology company has launched an unprecedented AI assistant that integrates seamlessly across all digital platforms. The system, developed over five years by a team of 200 engineers, utilizes advanced machine learning algorithms to predict user needs and automate routine tasks.\n\nEarly adopters report productivity gains of up to 40% in office environments. The technology has sparked both excitement about future possibilities and debates about the role of AI in society. Industry analysts predict this could reshape how we interact with technology in fundamental ways.\n\nThe platform includes enhanced security features and privacy controls, addressing concerns raised by digital rights advocates. The company has committed to transparent development practices and regular third-party audits to ensure ethical AI deployment.`,
    imageUrl: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
    trending: true, views: 12350,
  },
  {
    title: "Space Agency Announces Ambitious Mars Colony Plan",
    slug: "space-agency-mars-colony-plan-2035",
    category: "Technology",
    author: "Dr. Robert Chang",
    excerpt: "Detailed roadmap unveiled for establishing first permanent human settlement on Mars by 2035.",
    content: `The International Space Agency has revealed comprehensive plans for establishing a self-sustaining colony on Mars within the next decade. The ambitious project involves multiple phases, beginning with unmanned cargo missions to deliver essential infrastructure and supplies.\n\nThe colony will initially house fifty astronauts and scientists who will work to establish agricultural systems, extract water from Martian ice, and construct habitation modules. Advanced 3D printing technology will be used to build structures using Martian soil.\n\nSpace exploration advocates view this as humanity's next great frontier, while scientists emphasize the project's potential to advance our understanding of planetary science and develop technologies applicable to addressing Earth's environmental challenges.`,
    imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=900&q=80",
    trending: true, views: 16780,
  },
  {
    title: "The Race to Build the DeepSeek of Europe Is On",
    slug: "race-to-build-deepseek-europe",
    category: "Technology",
    author: "Joel Khalili",
    excerpt: "As Europe's longstanding alliance with the US falters, its push to become a self-sufficient AI superpower has become more urgent.",
    content: `European governments and private investors are pouring billions into a new generation of AI laboratories, racing to develop a frontier model that can compete with American and Chinese systems without relying on US cloud infrastructure.\n\nThe effort has coalesced around a handful of well-funded startups in France, Germany, and the Nordic countries, each backed by a mix of sovereign wealth, pension funds, and venture capital. Regulators have signalled they will fast-track approvals for compute infrastructure.\n\nCritics argue Europe's fragmented talent market and risk-averse culture remain structural impediments. Supporters counter that regulatory clarity, public trust, and multilingual training data give European models a distinctive edge in enterprise and government markets.`,
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80",
    trending: true, views: 10200,
  },
  {
    title: "Markets Rally on Strong Economic Indicators",
    slug: "markets-rally-strong-economic-indicators",
    category: "Business",
    author: "Jennifer Wallace",
    excerpt: "Stock exchanges worldwide experience significant gains following positive employment data and consumer confidence reports.",
    content: `Financial markets across the globe celebrated robust economic data released this morning, with major indices posting their strongest single-day gains in months. The surge followed the publication of employment figures showing job creation exceeded expectations by 40%.\n\nEconomists attribute the positive trends to stabilizing inflation rates and strategic monetary policies. The technology and manufacturing sectors led the rally, with several blue-chip stocks reaching record highs.\n\nMarket analysts caution that volatility may persist as central banks continue to adjust interest rates. However, the underlying economic fundamentals suggest a strong foundation for continued expansion throughout the year.`,
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
    trending: true, views: 9870,
  },
  {
    title: "International Trade Agreement Reshapes Global Commerce",
    slug: "international-trade-agreement-global-commerce",
    category: "Business",
    author: "Patricia Anderson",
    excerpt: "New multilateral trade pact eliminates tariffs and streamlines customs procedures across participating nations.",
    content: `Economic ministers from thirty nations have signed a comprehensive trade agreement designed to boost international commerce and reduce barriers to trade. The pact eliminates tariffs on over 10,000 product categories and establishes standardized customs procedures.\n\nBusiness leaders anticipate the agreement will create new opportunities for small and medium-sized enterprises to access international markets. The streamlined regulations are expected to reduce shipping times and costs significantly.\n\nEconomists project the agreement could increase global trade volume by 15% over the next five years and create millions of new jobs across participating countries.`,
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80",
    trending: false, views: 7540,
  },
  {
    title: "Education Reform Initiative Transforms Learning Methods",
    slug: "education-reform-initiative-learning-methods",
    category: "Business",
    author: "Linda Martinez",
    excerpt: "Innovative teaching approaches and technology integration show dramatic improvements in student outcomes.",
    content: `A groundbreaking education reform program has produced remarkable results after three years of implementation across two hundred schools. The initiative combines personalized learning technologies with project-based curricula and increased teacher training.\n\nStudent performance metrics have improved by an average of 35%, with particularly strong gains in mathematics and science. The program emphasizes critical thinking, creativity, and collaborative problem-solving skills.\n\nEducators report increased student engagement and motivation. The success has prompted policymakers to consider expanding the program nationwide.`,
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    trending: false, views: 11230,
  },
  {
    title: "Medical Breakthrough in Cancer Treatment Shows Promise",
    slug: "medical-breakthrough-cancer-treatment",
    category: "Health",
    author: "Emily Rodriguez",
    excerpt: "Researchers announce successful trials of new immunotherapy treatment with remarkable recovery rates.",
    content: `A team of international researchers has announced a significant breakthrough in cancer treatment following successful Phase III clinical trials. The new immunotherapy approach has demonstrated recovery rates exceeding 70% in previously treatment-resistant cases.\n\nThe treatment works by enhancing the body's natural immune response to identify and eliminate cancer cells more effectively. Unlike traditional chemotherapy, the new method shows minimal side effects and can be administered on an outpatient basis.\n\nMedical professionals worldwide are hailing the discovery as a potential game-changer in oncology. The therapy is expected to receive regulatory approval within the next six months.`,
    imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80",
    trending: false, views: 18920,
  },
  {
    title: "Alzheimer's Finger-Prick Test Could Help Diagnosis",
    slug: "alzheimers-finger-prick-blood-test-diagnosis",
    category: "Health",
    author: "Fergus Walsh",
    excerpt: "An international trial is examining whether a finger-prick blood test could be used to help diagnose Alzheimer's disease.",
    content: `Scientists at twelve research centres across Europe and North America have begun a large-scale clinical trial of a rapid blood test that could detect early biomarkers of Alzheimer's disease from a single drop of blood.\n\nThe test measures concentrations of phosphorylated tau protein, elevated levels of which are strongly associated with the neurodegeneration seen in Alzheimer's. If validated, it could offer an affordable alternative to expensive PET scans.\n\nPrincipal investigators say results from the trial's first phase are expected within eighteen months. Patient advocacy groups have welcomed the development, noting that early diagnosis opens the door to emerging treatments.`,
    imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80",
    trending: false, views: 14600,
  },
  {
    title: "Nestlé Issues Global Recall of Baby Formula Products Over Toxin Fears",
    slug: "nestle-global-recall-baby-formula-toxin",
    category: "Health",
    author: "Archie Mitchell",
    excerpt: "The food giant has recalled multiple product lines after routine testing detected traces of a potentially harmful contaminant.",
    content: `Nestlé announced a precautionary global recall of three baby formula product lines after internal quality testing identified trace quantities of a mycotoxin in samples from a single production facility. No illnesses have been reported.\n\nRegulators in the European Union, United States, and several Asian markets confirmed they had been notified and were conducting parallel investigations. Affected batch numbers have been published on the company's website.\n\nNutritionists and paediatricians urged parents not to panic, noting that the detected levels were below thresholds considered acutely harmful. However, they recommended switching to alternative products until the recall is resolved.`,
    imageUrl: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=900&q=80",
    trending: false, views: 21300,
  },
  {
    title: "Championship Finals Draw Record-Breaking Attendance",
    slug: "championship-finals-record-breaking-attendance",
    category: "Sports",
    author: "Marcus Thompson",
    excerpt: "Historic sporting event attracts the largest crowd in stadium history as teams compete for the prestigious title.",
    content: `Last night's championship finals shattered attendance records with over 95,000 spectators filling the stadium to witness an unforgettable match. The electric atmosphere reached fever pitch as both teams delivered exceptional performances.\n\nThe match remained tied until the final moments when a spectacular play secured victory for the home team. Fans erupted in celebration as their team claimed the championship title for the first time in twenty years.\n\nSports analysts praised both teams for their sportsmanship and skill, noting that the quality of play reflected months of intensive preparation and dedication.`,
    imageUrl: "https://picsum.photos/seed/sports1/900/600",
    trending: true, views: 22100,
  },
  {
    title: "Ronaldo Transfer Saga: Al Nassr Forward Seeks Resolution Over Funding Dispute",
    slug: "ronaldo-transfer-al-nassr-funding-dispute",
    category: "Sports",
    author: "Marcus Thompson",
    excerpt: "Cristiano Ronaldo's transfer situation continues to evolve as the Al Nassr forward seeks resolution over funding issues.",
    content: `Cristiano Ronaldo's relationship with Al Nassr has reached a critical juncture after the Portuguese forward reportedly requested a meeting with the club's Saudi ownership to discuss outstanding contractual obligations.\n\nSaudi football federation officials released a brief statement acknowledging the discussions while emphasising their commitment to the Saudi Pro League's continued growth. Several European clubs are understood to be monitoring the situation.\n\nAnalysts note that Ronaldo's presence has dramatically elevated the league's global profile, and both sides have strong commercial incentives to reach an agreement. A resolution is expected within the coming weeks.`,
    imageUrl: "https://picsum.photos/seed/sports2/900/600",
    trending: true, views: 19500,
  },
  {
    title: "France 36–14 Ireland: Defending Champions Clinch Bonus-Point Six Nations Victory",
    slug: "france-ireland-six-nations-bonus-point-win",
    category: "Sports",
    author: "Marcus Thompson",
    excerpt: "France's dominant second-half performance secured a commanding bonus-point win as Ireland paid for a dismal 50-minute stretch.",
    content: `France delivered a masterclass in clinical rugby at the Stade de France, overwhelming Ireland with four tries in the second half to run out convincing 36–14 winners and send a clear message to their Six Nations rivals.\n\nIreland had shown promise in a competitive opening quarter, but a series of uncharacteristic handling errors and indiscipline gave France the foothold they needed. Antoine Dupont orchestrated the attack with his customary precision.\n\nIreland head coach Andy Farrell acknowledged his side were second-best in all departments after the break, vowing to review the performance ahead of next week's fixture against England. France sit top of the table and are now odds-on favourites to retain the championship.`,
    imageUrl: "https://picsum.photos/seed/sports3/900/600",
    trending: true, views: 17800,
  },
];

async function main() {
  console.log("🌱 Seeding articles...");
  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: { imageUrl: article.imageUrl }, // patch image on re-seed
      create: {
        ...article,
        publishedAt: new Date("2026-01-02"),
      },
    });
  }
  console.log(`✅ Seeded ${articles.length} articles.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
