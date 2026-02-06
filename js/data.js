//News Database
const newsData = {
  articles: [
    {
      id: 1,
      title: "Global Climate Summit Reaches Historic Agreement",
      category: "World",
      author: "Sarah Mitchell",
      date: "2026-01-02",
      excerpt:
        "World leaders convene to establish groundbreaking environmental policies affecting over 150 nations.",
      content:
        "In a momentous gathering at the International Climate Conference, representatives from 150 nations have reached a historic consensus on environmental policy. The agreement, dubbed the 'Green Horizon Pact,' establishes stringent carbon reduction targets and commits billions in funding for renewable energy infrastructure.\n\nThe pact represents years of diplomatic negotiations and marks a turning point in global environmental cooperation. Key provisions include a 50% reduction in carbon emissions by 2035, mandatory transition to renewable energy sources, and substantial financial support for developing nations to implement green technologies.\n\nEnvironmental advocates have praised the agreement as a critical step forward, though some critics argue the targets should be even more ambitious. The implementation phase begins immediately, with quarterly reviews to ensure compliance across all signatory nations.",
      image: "../images/globalsummit.jpg",
      trending: true,
      views: 15420,
    },
    {
      id: 2,
      title: "US believes its power matters more than international law, UN chief tells The Watchtower",
      category: "World",
      author: "Anna Foster",
      date: "2026-01-02",
      excerpt:
        "The US is acting with impunity and believes its power matters more than international law, the head of the UN has told The Watchtower.",
      content:
        "In a momentous gathering at the International Climate Conference, representatives from 150 nations have reached a historic consensus on environmental policy. The agreement, dubbed the 'Green Horizon Pact,' establishes stringent carbon reduction targets and commits billions in funding for renewable energy infrastructure.\n\nThe pact represents years of diplomatic negotiations and marks a turning point in global environmental cooperation. Key provisions include a 50% reduction in carbon emissions by 2035, mandatory transition to renewable energy sources, and substantial financial support for developing nations to implement green technologies.\n\nEnvironmental advocates have praised the agreement as a critical step forward, though some critics argue the targets should be even more ambitious. The implementation phase begins immediately, with quarterly reviews to ensure compliance across all signatory nations.",
      image: "../images/world2.webp",
      trending: true,
      views: 15420,
    },
    {
      id: 3,
      title: "China's birth rate hits record low as population continues to shrink",
      category: "World",
      author: "Kelly Ng",
      date: "2026-01-02",
      excerpt:
        "China's birth rates sunk to a record low in 2025, despite the government rolling out a spate of incentives to boost it, as the country's population fell for the fourth straight year.",
      content:
        "In a momentous gathering at the International Climate Conference, representatives from 150 nations have reached a historic consensus on environmental policy. The agreement, dubbed the 'Green Horizon Pact,' establishes stringent carbon reduction targets and commits billions in funding for renewable energy infrastructure.\n\nThe pact represents years of diplomatic negotiations and marks a turning point in global environmental cooperation. Key provisions include a 50% reduction in carbon emissions by 2035, mandatory transition to renewable energy sources, and substantial financial support for developing nations to implement green technologies.\n\nEnvironmental advocates have praised the agreement as a critical step forward, though some critics argue the targets should be even more ambitious. The implementation phase begins immediately, with quarterly reviews to ensure compliance across all signatory nations.",
      image: "../images/world3.webp",
      trending: true,
      views: 15420,
    },
    {
      id: 4,
      title: "Tech Giant Unveils Revolutionary AI Assistant",
      category: "Technology",
      author: "David Chen",
      date: "2026-01-01",
      excerpt:
        "New artificial intelligence platform promises to transform workplace productivity and personal computing.",
      content:
        "Silicon Valley's leading technology company has launched an unprecedented AI assistant that integrates seamlessly across all digital platforms. The system, developed over five years by a team of 200 engineers, utilizes advanced machine learning algorithms to predict user needs and automate routine tasks.\n\nEarly adopters report productivity gains of up to 40% in office environments. The technology has sparked both excitement about future possibilities and debates about the role of AI in society. Industry analysts predict this could reshape how we interact with technology in fundamental ways.\n\nThe platform includes enhanced security features and privacy controls, addressing concerns raised by digital rights advocates. The company has committed to transparent development practices and regular third-party audits to ensure ethical AI deployment.",
      image: "../images/ai.jpg",
      trending: true,
      views: 12350,
    },
    {
      id: 5,
      title: "Space Agency Announces Ambitious Mars Colony Plan",
      category: "Technology",
      author: "Dr. Robert Chang",
      date: "2026-01-02",
      excerpt:
        "Detailed roadmap unveiled for establishing first permanent human settlement on Mars by 2035.",
      content:
        "The International Space Agency has revealed comprehensive plans for establishing a self-sustaining colony on Mars within the next decade. The ambitious project involves multiple phases, beginning with unmanned cargo missions to deliver essential infrastructure and supplies.\n\nThe colony will initially house fifty astronauts and scientists who will work to establish agricultural systems, extract water from Martian ice, and construct habitation modules. Advanced 3D printing technology will be used to build structures using Martian soil.\n\nSpace exploration advocates view this as humanity's next great frontier, while scientists emphasize the project's potential to advance our understanding of planetary science and develop technologies applicable to addressing Earth's environmental challenges.",
      image: "../images/mars.jpg",
      trending: true,
      views: 16780,
    },
    {
      id: 6,
      title: "The Race to Build the DeepSeek of Europe Is On",
      category: "Technology",
      author: "Joel Khalili",
      date: "2026-01-02",
      excerpt:
        "As Europe’s longstanding alliance with the US falters, its push to become a self-sufficient AI superpower has become more urgent.",
      content:
        "In a momentous gathering at the International Climate Conference, representatives from 150 nations have reached a historic consensus on environmental policy. The agreement, dubbed the 'Green Horizon Pact,' establishes stringent carbon reduction targets and commits billions in funding for renewable energy infrastructure.\n\nThe pact represents years of diplomatic negotiations and marks a turning point in global environmental cooperation. Key provisions include a 50% reduction in carbon emissions by 2035, mandatory transition to renewable energy sources, and substantial financial support for developing nations to implement green technologies.\n\nEnvironmental advocates have praised the agreement as a critical step forward, though some critics argue the targets should be even more ambitious. The implementation phase begins immediately, with quarterly reviews to ensure compliance across all signatory nations.",
      image: "../images/tech3.webp",
      trending: true,
      views: 15420,
    },
    {
      id: 7,
      title: "Markets Rally on Strong Economic Indicators",
      category: "Business",
      author: "Jennifer Wallace",
      date: "2026-01-02",
      excerpt:
        "Stock exchanges worldwide experience significant gains following positive employment data and consumer confidence reports.",
      content:
        "Financial markets across the globe celebrated robust economic data released this morning, with major indices posting their strongest single-day gains in months. The surge followed the publication of employment figures showing job creation exceeded expectations by 40%, while consumer confidence reached a five-year high.\n\nEconomists attribute the positive trends to stabilizing inflation rates and strategic monetary policies. The technology and manufacturing sectors led the rally, with several blue-chip stocks reaching record highs. Investors are increasingly optimistic about sustained economic growth through the coming quarters.\n\nMarket analysts caution that volatility may persist as central banks continue to adjust interest rates. However, the underlying economic fundamentals suggest a strong foundation for continued expansion throughout the year.",
      image: "../images/stock.jpg",
      trending: true,
      views: 9870,
    },
    {
      id: 8,
      title: "International Trade Agreement Reshapes Global Commerce",
      category: "Business",
      author: "Patricia Anderson",
      date: "2026-01-01",
      excerpt:
        "New multilateral trade pact eliminates tariffs and streamlines customs procedures across participating nations.",
      content:
        "Economic ministers from thirty nations have signed a comprehensive trade agreement designed to boost international commerce and reduce barriers to trade. The pact eliminates tariffs on over 10,000 product categories and establishes standardized customs procedures.\n\nBusiness leaders anticipate the agreement will create new opportunities for small and medium-sized enterprises to access international markets. The streamlined regulations are expected to reduce shipping times and costs significantly.\n\nEconomists project the agreement could increase global trade volume by 15% over the next five years and create millions of new jobs across participating countries. Implementation begins in the second quarter of this year.",
      image: "../images/business.jpg",
      trending: false,
      views: 7540,
    },
    {
      id: 9,
      title: "Education Reform Initiative Transforms Learning Methods",
      category: "Business",
      author: "Linda Martinez",
      date: "2026-01-01",
      excerpt:
        "Innovative teaching approaches and technology integration show dramatic improvements in student outcomes.",
      content:
        "A groundbreaking education reform program has produced remarkable results after three years of implementation across two hundred schools. The initiative combines personalized learning technologies with project-based curricula and increased teacher training.\n\nStudent performance metrics have improved by an average of 35%, with particularly strong gains in mathematics and science. The program emphasizes critical thinking, creativity, and collaborative problem-solving skills alongside traditional academic subjects.\n\nEducators report increased student engagement and motivation. The success has prompted policymakers to consider expanding the program nationwide, potentially transforming education systems to better prepare students for the challenges of the modern workforce.",
      image: "../images/education.jpg",
      trending: false,
      views: 11230,
    },
    {
      id: 10,
      title: "Medical Breakthrough in Cancer Treatment Shows Promise",
      category: "Health",
      author: "Emily Rodriguez",
      date: "2026-01-01",
      excerpt:
        "Researchers announce successful trials of new immunotherapy treatment with remarkable recovery rates.",
      content:
        "A team of international researchers has announced a significant breakthrough in cancer treatment following successful Phase III clinical trials. The new immunotherapy approach has demonstrated recovery rates exceeding 70% in previously treatment-resistant cases.\n\nThe treatment works by enhancing the body's natural immune response to identify and eliminate cancer cells more effectively. Unlike traditional chemotherapy, the new method shows minimal side effects and can be administered on an outpatient basis.\n\nMedical professionals worldwide are hailing the discovery as a potential game-changer in oncology. The therapy is expected to receive regulatory approval within the next six months and could benefit millions of patients globally.",
      image: "../images/health.webp",
      trending: false,
      views: 18920,
    },
    {
      id: 11,
      title: "Alzheimer's finger-prick test could help diagnosis",
      category: "Health",
      author: "Fergus Walsh",
      date: "2026-01-01",
      excerpt:
        "An international trial is examining whether a finger-prick blood test could be used to help diagnose Alzheimer's disease.",
      content:
        "A team of international researchers has announced a significant breakthrough in cancer treatment following successful Phase III clinical trials. The new immunotherapy approach has demonstrated recovery rates exceeding 70% in previously treatment-resistant cases.\n\nThe treatment works by enhancing the body's natural immune response to identify and eliminate cancer cells more effectively. Unlike traditional chemotherapy, the new method shows minimal side effects and can be administered on an outpatient basis.\n\nMedical professionals worldwide are hailing the discovery as a potential game-changer in oncology. The therapy is expected to receive regulatory approval within the next six months and could benefit millions of patients globally.",
      image: "../images/health2.webp",
      trending: false,
      views: 18920,
    },
    {
      id: 12,
      title: "Nestle issues global recall of some baby formula products over toxin fears",
      category: "Health",
      author: "Archie Mitchell",
      date: "2026-01-01",
      excerpt:
        "Researchers announce successful trials of new immunotherapy treatment with remarkable recovery rates.",
      content:
        "A team of international researchers has announced a significant breakthrough in cancer treatment following successful Phase III clinical trials. The new immunotherapy approach has demonstrated recovery rates exceeding 70% in previously treatment-resistant cases.\n\nThe treatment works by enhancing the body's natural immune response to identify and eliminate cancer cells more effectively. Unlike traditional chemotherapy, the new method shows minimal side effects and can be administered on an outpatient basis.\n\nMedical professionals worldwide are hailing the discovery as a potential game-changer in oncology. The therapy is expected to receive regulatory approval within the next six months and could benefit millions of patients globally.",
      image: "../images/health3.webp",
      trending: false,
      views: 18920,
    },
    {
      id: 13,
      title: "Championship Finals Draw Record-Breaking Attendance",
      category: "Sports",
      author: "Marcus Thompson",
      date: "2026-01-02",
      excerpt:
        "Historic sporting event attracts largest crowd in stadium history as teams compete for prestigious title.",
      content:
        "Last night's championship finals shattered attendance records with over 95,000 spectators filling the stadium to witness an unforgettable match. The electric atmosphere reached fever pitch as both teams delivered exceptional performances in what many are calling the greatest game of the decade.\n\nThe match remained tied until the final moments when a spectacular play secured victory for the home team. Fans erupted in celebration as their team claimed the championship title for the first time in twenty years.\n\nSports analysts praised both teams for their sportsmanship and skill, noting that the quality of play reflected months of intensive preparation and dedication. The winning team will now advance to international competition next month.",
      image: "../images/sport.jpg",
      trending: true,
      views: 22100,
    },
    {
      id: 14,
      title: "Cristiano Ronaldo transfer news: Al Nassr forward wants to continue strike over funding as Saudi officials release statement",
      category: "Sports",
      author: "Marcus Thompson",
      date: "2026-01-02",
      excerpt:
        "Cristiano Ronaldo's transfer situation continues to evolve as Al Nassr forward seeks resolution over funding issues.",
      content:
        "Last night's championship finals shattered attendance records with over 95,000 spectators filling the stadium to witness an unforgettable match. The electric atmosphere reached fever pitch as both teams delivered exceptional performances in what many are calling the greatest game of the decade.\n\nThe match remained tied until the final moments when a spectacular play secured victory for the home team. Fans erupted in celebration as their team claimed the championship title for the first time in twenty years.\n\nSports analysts praised both teams for their sportsmanship and skill, noting that the quality of play reflected months of intensive preparation and dedication. The winning team will now advance to international competition next month.",
      image: "../images/ronaldo.jpg",
      trending: true,
      views: 22100,
    },
    {
      id: 15,
      title: "France 36-14 Ireland: Defending Six Nations champions clinch bonus-point victory as visitors pay for abject 50 minutes",
      category: "Sports",
      author: "Marcus Thompson",
      date: "2026-01-02",
      excerpt:
        "France's dominant performance in the Six Nations sees them secure a bonus-point win over Ireland.",
      content:
        "Last night's championship finals shattered attendance records with over 95,000 spectators filling the stadium to witness an unforgettable match. The electric atmosphere reached fever pitch as both teams delivered exceptional performances in what many are calling the greatest game of the decade.\n\nThe match remained tied until the final moments when a spectacular play secured victory for the home team. Fans erupted in celebration as their team claimed the championship title for the first time in twenty years.\n\nSports analysts praised both teams for their sportsmanship and skill, noting that the quality of play reflected months of intensive preparation and dedication. The winning team will now advance to international competition next month.",
      image: "../images/france.jpg",
      trending: true,
      views: 22100,
    },
  ],

  getArticleById: function (id) {
    return this.articles.find((article) => article.id === parseInt(id));
  },

  getArticlesByCategory: function (category) {
    return this.articles.filter((article) => article.category === category);
  },

  getFeaturedArticle: function () {
    return this.articles[0];
  },

  getRecentArticles: function (limit = 3) {
    return this.articles.slice(1, limit + 1);
  },

  getAllCategories: function () {
    const categories = [
      ...new Set(this.articles.map((article) => article.category)),
    ];
    return categories;
  },

  getTrendingArticles: function (limit = 5) {
    return this.articles
      .filter((article) => article.trending)
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  },

  searchArticles: function (query) {
    const lowerQuery = query.toLowerCase();
    return this.articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(lowerQuery) ||
        article.excerpt.toLowerCase().includes(lowerQuery) ||
        article.content.toLowerCase().includes(lowerQuery) ||
        article.author.toLowerCase().includes(lowerQuery) ||
        article.category.toLowerCase().includes(lowerQuery)
      );
    });
  },

  getPopularArticles: function (limit = 5) {
    return this.articles.sort((a, b) => b.views - a.views).slice(0, limit);
  },
};
