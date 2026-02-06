// Category Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  displayCurrentDate();
  loadCategoryPage();
  setupNewsletter();
  setupMobileMenu();
  setupAuth();
  setupFilters();
  initializeIcons();
});

function initializeIcons() {
  setTimeout(() => {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }, 100);
}

function displayCurrentDate() {
  const dateElement = document.getElementById("current-date");
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  dateElement.textContent = new Date().toLocaleDateString("en-US", options);
}

function loadCategoryPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("cat");

  if (!category) {
    window.location.href = "index.html";
    return;
  }

  // Update page title
  document.title = `${category} - The Watchtower`;

  // Load breadcrumb
  loadBreadcrumb(category);

  // Load category header
  loadCategoryHeader(category);

  // Load category articles
  loadCategoryArticles(category);

  // Highlight active nav item
  highlightActiveNav(category);
}

function loadBreadcrumb(category) {
  const breadcrumb = document.getElementById("breadcrumb");
  breadcrumb.innerHTML = `
    <a href="index.html">Home</a>
    <span class="breadcrumb-separator">/</span>
    <span>${category}</span>
  `;
}

function loadCategoryHeader(category) {
  const titleElement = document.getElementById("category-title");
  const descriptionElement = document.getElementById("category-description");

  const categoryDescriptions = {
    World:
      "Stay informed with the latest global news, international affairs, and world events from every corner of the planet.",
    Technology:
      "Explore cutting-edge innovations, tech trends, and breakthrough discoveries shaping our digital future.",
    Business:
      "Get insights on markets, finance, entrepreneurship, and the business landscape driving economic growth.",
    Health:
      "Discover the latest in medical research, wellness tips, and health news to help you live your best life.",
    Sports:
      "Catch up on thrilling matches, athlete profiles, and sports news from around the world.",
  };

  titleElement.innerHTML = `
    <i data-lucide="${getCategoryIcon(category)}"></i>
    ${category}
  `;

  descriptionElement.textContent =
    categoryDescriptions[category] ||
    `Browse all articles in the ${category} category.`;

  initializeIcons();
}

function loadCategoryArticles(category, sortBy = "recent") {
  let articles = newsData.getArticlesByCategory(category);

  if (articles.length === 0) {
    showNoArticles();
    return;
  }

  // Sort articles
  articles = sortArticles(articles, sortBy);

  // Display articles
  const grid = document.getElementById("category-articles-grid");
  const noArticles = document.getElementById("no-articles");

  grid.innerHTML = articles.map((article) => createArticleCard(article)).join("");
  grid.style.display = "grid";
  noArticles.style.display = "none";

  // Setup article actions
  setupArticleActions();
  initializeIcons();
}

function sortArticles(articles, sortBy) {
  switch (sortBy) {
    case "popular":
      return [...articles].sort((a, b) => b.views - a.views);
    case "trending":
      return [...articles]
        .filter((a) => a.trending)
        .sort((a, b) => b.views - a.views);
    case "recent":
    default:
      return [...articles].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
  }
}

function createArticleCard(article) {
  const isBookmarked = isArticleBookmarked(article.id);

  return `
    <div class="article-card">
      <img src="${article.image}" alt="${article.title}">
      <div class="article-card-content">
        <span class="category-tag">${article.category}</span>
        <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
        <div class="article-meta">
          <span class="meta-item"><i data-lucide="user"></i> ${article.author}</span>
          <span class="meta-item"><i data-lucide="clock"></i> ${formatDate(article.date)}</span>
          <span class="meta-item"><i data-lucide="eye"></i> ${formatViews(article.views)}</span>
        </div>
        <p>${article.excerpt}</p>
        <div class="article-actions">
          <button class="action-btn bookmark-btn ${isBookmarked ? "bookmarked" : ""}" data-article-id="${article.id}">
            <i data-lucide="bookmark"></i> ${isBookmarked ? "Saved" : "Save"}
          </button>
          <button class="action-btn share-btn" data-article-id="${article.id}">
            <i data-lucide="share-2"></i> Share
          </button>
        </div>
        <a href="article.html?id=${article.id}" class="read-more">Read More</a>
      </div>
    </div>
  `;
}

function showNoArticles() {
  const grid = document.getElementById("category-articles-grid");
  const noArticles = document.getElementById("no-articles");

  grid.style.display = "none";
  noArticles.style.display = "flex";

  initializeIcons();
}

function setupFilters() {
  const sortSelect = document.getElementById("sort-select");

  sortSelect.addEventListener("change", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("cat");
    loadCategoryArticles(category, this.value);
  });
}

function setupArticleActions() {
  document.querySelectorAll(".bookmark-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const articleId = parseInt(this.getAttribute("data-article-id"));
      toggleBookmark(articleId);

      // Update button state
      const isBookmarked = isArticleBookmarked(articleId);
      this.classList.toggle("bookmarked", isBookmarked);
      this.innerHTML = `<i data-lucide="bookmark"></i> ${isBookmarked ? "Saved" : "Save"}`;

      initializeIcons();
    });
  });

  document.querySelectorAll(".share-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const articleId = parseInt(this.getAttribute("data-article-id"));
      shareArticle(articleId);
    });
  });
}

function highlightActiveNav(category) {
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    if (link.href.includes(`cat=${category}`)) {
      link.classList.add("active");
    } else if (!link.href.includes("index.html") && !link.href.includes("#")) {
      link.classList.remove("active");
    }
  });
}

function isArticleBookmarked(articleId) {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
  return bookmarks.includes(articleId);
}

function toggleBookmark(articleId) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");

  if (bookmarks.includes(articleId)) {
    bookmarks = bookmarks.filter((id) => id !== articleId);
    showToast("Removed from bookmarks", "success");
  } else {
    bookmarks.push(articleId);
    showToast("Added to bookmarks", "success");
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function shareArticle(articleId) {
  const article = newsData.getArticleById(articleId);
  const url = `${window.location.origin}/article.html?id=${articleId}`;

  if (navigator.share) {
    navigator
      .share({
        title: article.title,
        text: article.excerpt,
        url: url,
      })
      .catch((error) => console.log("Error sharing:", error));
  } else {
    navigator.clipboard.writeText(url).then(() => {
      showToast("Link copied to clipboard!", "success");
    });
  }
}

function getCategoryIcon(category) {
  const icons = {
    World: "globe",
    Technology: "cpu",
    Business: "briefcase",
    Health: "heart",
    Sports: "trophy",
  };
  return icons[category] || "file-text";
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function formatViews(views) {
  return views >= 1000 ? (views / 1000).toFixed(1) + "K" : views.toString();
}

function setupMobileMenu() {
  const toggle = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => menu.classList.toggle("active"));
  }
}

function setupNewsletter() {
  const btn = document.getElementById("newsletter-btn");
  const modal = document.getElementById("newsletter-modal");
  const closeBtn = document.getElementById("close-newsletter");
  const form = document.getElementById("newsletter-form");

  if (!btn || !modal) return;

  btn.addEventListener("click", () => modal.classList.add("active"));
  closeBtn.addEventListener("click", () => modal.classList.remove("active"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletter-email").value;

    const subscriptions = JSON.parse(
      localStorage.getItem("subscriptions") || "[]"
    );
    if (!subscriptions.includes(email)) {
      subscriptions.push(email);
      localStorage.setItem("subscriptions", JSON.stringify(subscriptions));
    }

    showToast("Successfully subscribed to newsletter!", "success");
    modal.classList.remove("active");
    form.reset();
  });
}

function showToast(message, type = "success") {
  const existingToast = document.querySelector(".toast");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = `toast ${type} show`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
