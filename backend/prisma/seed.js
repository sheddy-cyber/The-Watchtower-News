// backend/prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const articles = [
  {
    title: "Global Climate Summit Reaches Historic Agreement",
    slug: "global-climate-summit-historic-agreement",
    category: "World",
    author: "Chika Okafor",
    excerpt:
      "World leaders convene to establish groundbreaking environmental policies affecting over 150 nations.",
    content: `In a momentous gathering at the International Climate Conference, representatives from 150 nations have reached a historic consensus on environmental policy. The agreement, dubbed the 'Green Horizon Pact,' establishes stringent carbon reduction targets and commits billions in funding for renewable energy infrastructure.\n\nThe pact represents years of diplomatic negotiations and marks a turning point in global environmental cooperation. Key provisions include a 50% reduction in carbon emissions by 2035, mandatory transition to renewable energy sources, and substantial financial support for developing nations to implement green technologies.\n\nEnvironmental advocates have praised the agreement as a critical step forward, though some critics argue the targets should be even more ambitious. The implementation phase begins immediately, with quarterly reviews to ensure compliance across all signatory nations.`,
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&q=80",
    trending: true,
    views: 15420,
  },
  {
    title:
      "US Believes Its Power Matters More Than International Law, UN Chief Says",
    slug: "us-power-international-law-un-chief",
    category: "World",
    author: "Ngozi Eze",
    excerpt:
      "The US is acting with impunity and believes its power matters more than international law, the head of the UN has told The Watchtower.",
    content: `The United Nations Secretary-General has issued an unusually pointed rebuke of the United States, telling The Watchtower in an exclusive interview that Washington increasingly operates outside the norms of international law.\n\nThe Secretary-General cited recent unilateral actions in trade policy, military posture, and multilateral treaty withdrawal as evidence of a deepening disregard for international governance frameworks. Senior diplomats from European and Asian nations expressed private agreement with the assessment.\n\nWhite House officials declined to respond directly, instead reiterating their position that American sovereignty supersedes any external jurisdiction. Legal scholars noted the remarks reflect a broader fracturing of the post-1945 international order.`,
    imageUrl:
      "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=900&q=80",
    trending: true,
    views: 12800,
  },
  {
    title:
      "China's Birth Rate Hits Record Low as Population Continues to Shrink",
    slug: "china-birth-rate-record-low-population",
    category: "World",
    author: "Tunde Bakare",
    excerpt:
      "China's birth rates sunk to a record low in 2025, despite the government rolling out a spate of incentives to boost it.",
    content: `China's National Bureau of Statistics released figures Tuesday confirming that births fell to 7.2 per thousand people in 2025, the lowest since modern records began. The country's population shrank for the fourth consecutive year, accelerating a demographic crisis that economists warn will weigh on growth for decades.\n\nBeijing has responded with a battery of pro-natalist measures, including extended parental leave, childcare subsidies, and tax breaks for families with two or more children. Yet surveys suggest young urban professionals remain unconvinced, citing the high cost of housing, education, and child-rearing.\n\nDemographers project China's working-age population will decline by roughly 100 million by 2050, posing significant challenges for pension systems, healthcare financing, and the country's ambitions to reach high-income status.`,
    imageUrl:
      "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=900&q=80",
    trending: true,
    views: 9400,
  },
  {
    title: "Tech Giant Unveils Revolutionary AI Assistant",
    slug: "tech-giant-ai-assistant-launch",
    category: "Technology",
    author: "Femi Adebayo",
    excerpt:
      "New artificial intelligence platform promises to transform workplace productivity and personal computing.",
    content: `Silicon Valley's leading technology company has launched an unprecedented AI assistant that integrates seamlessly across all digital platforms. The system, developed over five years by a team of 200 engineers, utilizes advanced machine learning algorithms to predict user needs and automate routine tasks.\n\nEarly adopters report productivity gains of up to 40% in office environments. The technology has sparked both excitement about future possibilities and debates about the role of AI in society. Industry analysts predict this could reshape how we interact with technology in fundamental ways.\n\nThe platform includes enhanced security features and privacy controls, addressing concerns raised by digital rights advocates. The company has committed to transparent development practices and regular third-party audits to ensure ethical AI deployment.`,
    imageUrl:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
    trending: true,
    views: 12350,
  },
  {
    title: "Space Agency Announces Ambitious Mars Colony Plan",
    slug: "space-agency-mars-colony-plan-2035",
    category: "Technology",
    author: "Dr. Emeka Obi",
    excerpt:
      "Detailed roadmap unveiled for establishing first permanent human settlement on Mars by 2035.",
    content: `The International Space Agency has revealed comprehensive plans for establishing a self-sustaining colony on Mars within the next decade. The ambitious project involves multiple phases, beginning with unmanned cargo missions to deliver essential infrastructure and supplies.\n\nThe colony will initially house fifty astronauts and scientists who will work to establish agricultural systems, extract water from Martian ice, and construct habitation modules. Advanced 3D printing technology will be used to build structures using Martian soil.\n\nSpace exploration advocates view this as humanity's next great frontier, while scientists emphasize the project's potential to advance our understanding of planetary science and develop technologies applicable to addressing Earth's environmental challenges.`,
    imageUrl:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=900&q=80",
    trending: true,
    views: 16780,
  },
  {
    title: "The Race to Build the DeepSeek of Europe Is On",
    slug: "race-to-build-deepseek-europe",
    category: "Technology",
    author: "Yewande Akinola",
    excerpt:
      "As Europe's longstanding alliance with the US falters, its push to become a self-sufficient AI superpower has become more urgent.",
    content: `European governments and private investors are pouring billions into a new generation of AI laboratories, racing to develop a frontier model that can compete with American and Chinese systems without relying on US cloud infrastructure.\n\nThe effort has coalesced around a handful of well-funded startups in France, Germany, and the Nordic countries, each backed by a mix of sovereign wealth, pension funds, and venture capital. Regulators have signalled they will fast-track approvals for compute infrastructure.\n\nCritics argue Europe's fragmented talent market and risk-averse culture remain structural impediments. Supporters counter that regulatory clarity, public trust, and multilingual training data give European models a distinctive edge in enterprise and government markets.`,
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80",
    trending: true,
    views: 10200,
  },
  {
    title: "Markets Rally on Strong Economic Indicators",
    slug: "markets-rally-strong-economic-indicators",
    category: "Business",
    author: "Amina Yusuf",
    excerpt:
      "Stock exchanges worldwide experience significant gains following positive employment data and consumer confidence reports.",
    content: `Financial markets across the globe celebrated robust economic data released this morning, with major indices posting their strongest single-day gains in months. The surge followed the publication of employment figures showing job creation exceeded expectations by 40%.\n\nEconomists attribute the positive trends to stabilizing inflation rates and strategic monetary policies. The technology and manufacturing sectors led the rally, with several blue-chip stocks reaching record highs.\n\nMarket analysts caution that volatility may persist as central banks continue to adjust interest rates. However, the underlying economic fundamentals suggest a strong foundation for continued expansion throughout the year.`,
    imageUrl:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80",
    trending: true,
    views: 9870,
  },
  {
    title: "International Trade Agreement Reshapes Global Commerce",
    slug: "international-trade-agreement-global-commerce",
    category: "Business",
    author: "Blessing Okoro",
    excerpt:
      "New multilateral trade pact eliminates tariffs and streamlines customs procedures across participating nations.",
    content: `Economic ministers from thirty nations have signed a comprehensive trade agreement designed to boost international commerce and reduce barriers to trade. The pact eliminates tariffs on over 10,000 product categories and establishes standardized customs procedures.\n\nBusiness leaders anticipate the agreement will create new opportunities for small and medium-sized enterprises to access international markets. The streamlined regulations are expected to reduce shipping times and costs significantly.\n\nEconomists project the agreement could increase global trade volume by 15% over the next five years and create millions of new jobs across participating countries.`,
    imageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&q=80",
    trending: false,
    views: 7540,
  },
  {
    title: "Education Reform Initiative Transforms Learning Methods",
    slug: "education-reform-initiative-learning-methods",
    category: "Business",
    author: "Kelechi Nwachukwu",
    excerpt:
      "Innovative teaching approaches and technology integration show dramatic improvements in student outcomes.",
    content: `A groundbreaking education reform program has produced remarkable results after three years of implementation across two hundred schools. The initiative combines personalized learning technologies with project-based curricula and increased teacher training.\n\nStudent performance metrics have improved by an average of 35%, with particularly strong gains in mathematics and science. The program emphasizes critical thinking, creativity, and collaborative problem-solving skills.\n\nEducators report increased student engagement and motivation. The success has prompted policymakers to consider expanding the program nationwide.`,
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    trending: false,
    views: 11230,
  },
  {
    title: "Medical Breakthrough in Cancer Treatment Shows Promise",
    slug: "medical-breakthrough-cancer-treatment",
    category: "Health",
    author: "Chidinma Kalu",
    excerpt:
      "Researchers announce successful trials of new immunotherapy treatment with remarkable recovery rates.",
    content: `A team of international researchers has announced a significant breakthrough in cancer treatment following successful Phase III clinical trials. The new immunotherapy approach has demonstrated recovery rates exceeding 70% in previously treatment-resistant cases.\n\nThe treatment works by enhancing the body's natural immune response to identify and eliminate cancer cells more effectively. Unlike traditional chemotherapy, the new method shows minimal side effects and can be administered on an outpatient basis.\n\nMedical professionals worldwide are hailing the discovery as a potential game-changer in oncology. The therapy is expected to receive regulatory approval within the next six months.`,
    imageUrl:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80",
    trending: false,
    views: 18920,
  },
  {
    title: "Alzheimer's Finger-Prick Test Could Help Diagnosis",
    slug: "alzheimers-finger-prick-blood-test-diagnosis",
    category: "Health",
    author: "Ibrahim Musa",
    excerpt:
      "An international trial is examining whether a finger-prick blood test could be used to help diagnose Alzheimer's disease.",
    content: `Scientists at twelve research centres across Europe and North America have begun a large-scale clinical trial of a rapid blood test that could detect early biomarkers of Alzheimer's disease from a single drop of blood.\n\nThe test measures concentrations of phosphorylated tau protein, elevated levels of which are strongly associated with the neurodegeneration seen in Alzheimer's. If validated, it could offer an affordable alternative to expensive PET scans.\n\nPrincipal investigators say results from the trial's first phase are expected within eighteen months. Patient advocacy groups have welcomed the development, noting that early diagnosis opens the door to emerging treatments.`,
    imageUrl:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=900&q=80",
    trending: false,
    views: 14600,
  },
  {
    title:
      "Nestlé Issues Global Recall of Baby Formula Products Over Toxin Fears",
    slug: "nestle-global-recall-baby-formula-toxin",
    category: "Health",
    author: "Uche Ogar",
    excerpt:
      "The food giant has recalled multiple product lines after routine testing detected traces of a potentially harmful contaminant.",
    content: `Nestlé announced a precautionary global recall of three baby formula product lines after internal quality testing identified trace quantities of a mycotoxin in samples from a single production facility. No illnesses have been reported.\n\nRegulators in the European Union, United States, and several Asian markets confirmed they had been notified and were conducting parallel investigations. Affected batch numbers have been published on the company's website.\n\nNutritionists and paediatricians urged parents not to panic, noting that the detected levels were below thresholds considered acutely harmful. However, they recommended switching to alternative products until the recall is resolved.`,
    imageUrl:
      "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=900&q=80",
    trending: false,
    views: 21300,
  },
  {
    title: "Spain Beat Argentina 1-0 to Win the 2026 World Cup",
    slug: "championship-finals-record-breaking-attendance",
    category: "Sports",
    author: "Segun Alabi",
    excerpt:
      "Ferran Torres struck in extra time as Spain overcame Argentina in New York New Jersey to lift a second World Cup.",
    content: `Spain are world champions again after Ferran Torres scored in extra time to secure a 1-0 victory over Argentina in the 2026 FIFA World Cup final at New York New Jersey Stadium. It is La Roja's second World Cup triumph, following their 2010 success.\n\nSpain controlled long stretches of a tense final and repeatedly tested Argentina's resistance. Goalkeeper Emiliano Martinez delivered a remarkable performance to keep the holders in contention, but Torres eventually supplied the decisive moment after 90 scoreless minutes.\n\nThe final brought the expanded 48-team tournament to a close after five weeks across Canada, Mexico and the United States. Spain's players celebrated a campaign defined by composure in possession, defensive control and timely moments of quality.`,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Spain_World_Cup_Winners_Argentina_v_Spain_19_July_2026-1.jpg/1280px-Spain_World_Cup_Winners_Argentina_v_Spain_19_July_2026-1.jpg",
    trending: true,
    views: 98200,
    publishedAt: "2026-07-20T08:30:00.000Z",
  },
  {
    title: "Rodri Takes Golden Ball as Spain Sweep World Cup Awards",
    slug: "ronaldo-transfer-al-nassr-funding-dispute",
    category: "Sports",
    author: "Segun Alabi",
    excerpt:
      "Spain's midfield leader was named the tournament's best player, while Unai Simon and Pau Cubarsi joined him among FIFA's award winners.",
    content: `Rodri has been named the adidas Golden Ball winner after anchoring Spain's run to the 2026 FIFA World Cup title. The midfielder's control, positioning and calm under pressure were central to a campaign that ended with victory over Argentina in the final.\n\nSpain's success was reflected across the individual awards. Unai Simon received the Golden Glove after seven clean sheets in eight matches, while Pau Cubarsi was named the tournament's best young player.\n\nFrance forward Kylian Mbappe claimed the Golden Boot after scoring ten goals in eight games. The awards underscored the depth of quality on display across the first 48-team World Cup, even as Spain's collective control set the standard at the tournament's finish.`,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/41/RODRI_-_SWE_vs_ESP_-_UEFA_EURO_2020_QUALIFIERS_-_2019.10.15_%28cropped%29.jpg",
    trending: true,
    views: 74500,
    publishedAt: "2026-07-20T11:15:00.000Z",
  },
  {
    title: "England Beat France 6-4 in World Cup Bronze-Final Thriller",
    slug: "france-ireland-six-nations-bonus-point-win",
    category: "Sports",
    author: "Segun Alabi",
    excerpt:
      "Bukayo Saka's hat-trick powered England past France in a remarkable ten-goal contest to secure third place at the World Cup.",
    content: `England finished third at the 2026 FIFA World Cup after defeating France 6-4 in a wild bronze-final contest in Miami. Bukayo Saka scored a hat-trick as England rebuilt after their semi-final disappointment to end the tournament with a statement victory.\n\nFrance mounted a fierce second-half response and Kylian Mbappe added to an extraordinary tournament, but England kept finding an answer in a match that became the World Cup's most open and frenetic finale.\n\nThe result gave England a podium finish and a memorable send-off from a tournament that travelled across 16 host cities. For France, it was a painful final chapter despite Mbappe's Golden Boot-winning campaign.`,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2e/Bukayo_Saka.jpg",
    trending: true,
    views: 63200,
    publishedAt: "2026-07-19T19:10:00.000Z",
  },
  {
    title: "\"Aunty, He Touched His Mouth!\" — FIFA's Trophy Child, Faced with Certain Defeat, Shamelessly Cries Out to Get Cucurella Sent Off at the World Cup Final.",
    slug: "opinion-lionel-messi-class-captain",
    category: "Sports",
    author: "Kris Shedrach",
    excerpt: "A parody dispatch from the 2026 World Cup final",
    content: `There comes a moment in every man's life where he must decide: do I handle this myself like a man, or do I go crying to mummy like a child? On Sunday night at MetLife Stadium, with the World Cup on the line, Lionel Messi looked deep into his soul and shamelessly chose the second option.

The scene: Argentina down to ten men after Enzo Fernández's second yellow, tempers boiling, and Spain's Marc Cucurella strolls over for a "quiet word" with Messi — briefly putting his hand near his mouth. Under this World Cup's new mouth-covering rule, that's technically an offence. Messi didn't shrug it off. He responded like SS2 Class Captain Chukwuemeka sprinting to the staff room because a boy in the back row was chewing gum.

Spain lifted the trophy 1–0, and yet the moment everyone kept replaying wasn't Ferran Torres' winner — it was Messi cupping his hands at referee Slavko Vinčić like a man shouting "Aunty, aunty, come and see o!"

The Verdict, According to Spectators

Former England captain Wayne Rooney told BBC Sport it was "desperation," adding that while Argentina "play like that," it was "sad to see Lionel Messi doing that." ITV's Lee Dixon was blunter: "You shouldn't be such a baby to try and get someone sent off for that, it's ridiculous."

Social media agreed. One fan on X compared it to snitch culture, writing that it was "like a child running to tell teacher," and called it a "pathetic behaviour." Another summed it up: he's now, and forever will also be, "the guy who asked for an opponent to be sent off for covering his mouth in a World Cup final." Although one Instagram commenter noted Cucurella "only touched his lips for half a second," calling the reaction wildly exaggerated.

Meanwhile, On Nigerian Twitter, The Jokes Kept Writing Themselves

Anybody who went to a Nigerian school knew somebody like this:

The oversabi classmate who doesn't miss a chance to tell the teacher, "sir, when you left, this boy was speaking vernacular." 

The classmate who copies your assignment, gets caught, and points at you: "he's the one that showed me." 

The boy who starts a fight, loses it, then cries to the teacher that "he pushed me first." 

The busy-body girl who threatens you with "I will tell for you" as they expect you to crumble and beg for mercy.

Messi chose the actual World Cup final to summon this exact energy, and Nigerians online can't stop laughing about it: "Messi don turn JSS2 boy wey no fit fight, na so im dey run go report to teacher."

The Real Tragedy

Argentina lost 1–0 with a record 0 shots on target. Spain won their second World Cup. And Messi with his goons left the pitch with the reputation of being part-time area boys who can't gracefully take a humbling loss.

Class of 2026 dismissed. Messi, please see the front office.`,
    imageUrl:
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA28hMFN.img?w=768&h=432&m=4&q=70",
    trending: true,
    views: 45200,
    publishedAt: "2026-07-21T09:00:00.000Z",
  },
];

async function main() {
  console.log("🌱 Seeding articles...");
  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        category: article.category,
        author: article.author,
        excerpt: article.excerpt,
        content: article.content,
        imageUrl: article.imageUrl,
        trending: article.trending,
        views: article.views,
        publishedAt: new Date(article.publishedAt || "2026-01-02"),
      },
      create: {
        ...article,
        publishedAt: new Date(article.publishedAt || "2026-01-02"),
      },
    });
  }
  console.log(`✅ Seeded ${articles.length} articles.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
