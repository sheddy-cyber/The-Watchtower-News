export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    
    // 1. Fetch base index.html from the current deployment
    const htmlRes = await fetch(`${protocol}://${host}/index.html`);
    let html = await htmlRes.text();

    // 2. Fetch article data from backend
    // IMPORTANT: VITE_API_URL must be set in your Vercel Project Environment Variables
    const apiUrl = process.env.VITE_API_URL;
    if (apiUrl) {
      const articleRes = await fetch(`${apiUrl}/articles/${id}`);
      if (articleRes.ok) {
        const article = await articleRes.json();
        
        // Escape quotes to prevent HTML injection in meta tags
        const sanitize = (str) => (str || "").replace(/"/g, "&quot;");

        const title = sanitize(`${article.title} | Watchtower News`);
        const description = sanitize(article.excerpt || article.title);
        const url = `${protocol}://${host}/article/${id}`;
        const image = sanitize(article.imageUrl || "");

        const metaTags = `
          <title>${title}</title>
          <meta name="description" content="${description}" />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${image}" />
          <meta property="og:url" content="${url}" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="${title}" />
          <meta name="twitter:description" content="${description}" />
          <meta name="twitter:image" content="${image}" />
        `;

        // Strip any existing title and inject the rich meta tags
        html = html.replace(/<title>.*?<\/title>/i, "");
        html = html.replace("</head>", `${metaTags}\n</head>`);
      }
    }

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=86400"); // Cache at edge for 60s
    res.status(200).send(html);
  } catch (err) {
    console.error("OG injection error:", err);
    // If it fails, fallback to standard Vercel 404/500 or just return whatever we can
    res.status(500).send("Server Error");
  }
}
