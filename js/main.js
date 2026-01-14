// Main JavaScript - Cleaned (Authentication Removed)
document.addEventListener("DOMContentLoaded", function () {
  displayCurrentDate();
  loadFeaturedArticle();
  loadSidebarArticles();
  loadCategorySections();
  loadTrendingTopics();
  setupMobileMenu();
  setupNewsletter();
  setupSearch();
  updateBookmarkButtons();
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

function loadFeaturedArticle() {
  const featured = newsData.getFeaturedArticle();
  const container = document.getElementById("featured-article");
  const isBookmarked = isArticleBookmarked(featured.id);

  container.innerHTML = `
    <img src="${featured.image}" alt="${featured.title}">
    <div class="featured-content">
      <span class="category-tag">${featured.category}</span>
      <h2>${featured.title}</h2>
      <div class="article-meta">
        <span class="meta-item"><i data-lucide="user"></i> ${
          featured.author
        }</span>
        <span class="meta-item"><i data-lucide="clock"></i> ${formatDate(
          featured.date
        )}</span>
        <span class="meta-item"><i data-lucide="eye"></i> ${formatViews(
          featured.views
        )}</span>
      </div>
      <p>${featured.excerpt}</p>
      <div class="article-actions">
        <button class="action-btn bookmark-btn ${
          isBookmarked ? "bookmarked" : ""
        }" data-article-id="${featured.id}">
          <i data-lucide="bookmark"></i> ${
            isBookmarked ? "Bookmarked" : "Bookmark"
          }
        </button>
        <button class="action-btn share-btn" data-article-id="${featured.id}">
          <i data-lucide="share-2"></i> Share
        </button>
      </div>
      <a href="article.html?id=${
        featured.id
      }" class="read-more">Read Full Story</a>
    </div>
  `;

  initializeIcons();
  setupArticleActions();
}

function loadSidebarArticles() {
  const articles = newsData.getRecentArticles(3);
  const container = document.getElementById("sidebar-articles");

  container.innerHTML = articles
    .map(
      (article) => `
    <div class="sidebar-article">
      <img src="${article.image}" alt="${article.title}">
      <span class="category-tag">${article.category}</span>
      <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
      <div class="article-meta">
        <span class="meta-item"><i data-lucide="user"></i> ${article.author}</span>
      </div>
    </div>
  `
    )
    .join("");

  initializeIcons();
}

function loadCategorySections() {
  const categories = newsData.getAllCategories();
  const container = document.getElementById("category-sections");

  container.innerHTML = categories
    .map((category) => {
      const articles = newsData.getArticlesByCategory(category).slice(0, 3);

      if (articles.length === 0) return "";

      return `
      <div class="category-section">
        <h2 class="category-header">
          <i data-lucide="${getCategoryIcon(category)}"></i> ${category}
        </h2>
        <div class="articles-grid">
          ${articles.map((article) => createArticleCard(article)).join("")}
        </div>
      </div>
    `;
    })
    .join("");

  initializeIcons();
  setupArticleActions();
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
          <span class="meta-item"><i data-lucide="user"></i> ${
            article.author
          }</span>
          <span class="meta-item"><i data-lucide="clock"></i> ${formatDate(
            article.date
          )}</span>
        </div>
        <p>${article.excerpt}</p>
        <div class="article-actions">
          <button class="action-btn bookmark-btn ${
            isBookmarked ? "bookmarked" : ""
          }" data-article-id="${article.id}">
            <i data-lucide="bookmark"></i> ${isBookmarked ? "Saved" : "Save"}
          </button>
        </div>
        <a href="article.html?id=${article.id}" class="read-more">Read More</a>
      </div>
    </div>
  `;
}

function loadTrendingTopics() {
  const trending = newsData.getTrendingArticles(10);
  const container = document.getElementById("trending-topics");

  const trendingHTML = trending
    .map(
      (article) => `
    <a href="article.html?id=${article.id}" class="trending-item">${article.title}</a>
  `
    )
    .join("");

  // Duplicate content for infinite scroll effect
  container.innerHTML = `
    <div class="trending-topics-inner">
      ${trendingHTML}
      ${trendingHTML}
    </div>
  `;
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

function setupSearch() {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("clear-search");
  const resultsSection = document.getElementById("search-results");
  const homepageContent = document.getElementById("homepage-content");
  const resultsGrid = document.getElementById("search-results-grid");
  const resultsTitle = document.getElementById("search-results-title");

  if (!searchBtn || !searchInput) return;

  const performSearch = () => {
    const query = searchInput.value.trim();

    if (!query) {
      showToast("Please enter a search term", "error");
      return;
    }

    const results = newsData.searchArticles(query);

    resultsTitle.textContent = `Search Results for "${query}"`;
    homepageContent.style.display = "none";
    resultsSection.style.display = "block";

    if (results.length === 0) {
      resultsGrid.innerHTML = `
        <div class="no-results">
          <i data-lucide="search-x"></i>
          <h3>No results found</h3>
          <p>Try different keywords</p>
        </div>
      `;
    } else {
      resultsGrid.innerHTML = results
        .map((article) => createArticleCard(article))
        .join("");
      setupArticleActions();
    }

    initializeIcons();
  };

  searchBtn.addEventListener("click", performSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") performSearch();
  });

  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    homepageContent.style.display = "block";
    resultsSection.style.display = "none";
  });
}

function setupArticleActions() {
  document.querySelectorAll(".bookmark-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const articleId = parseInt(this.getAttribute("data-article-id"));
      toggleBookmark(articleId);
      updateBookmarkButtons();
      initializeIcons();
    });
  });

  document.querySelectorAll(".share-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const articleId = this.getAttribute("data-article-id");
      shareArticle(articleId);
    });
  });
}

function updateBookmarkButtons() {
  document.querySelectorAll(".bookmark-btn").forEach((btn) => {
    const articleId = parseInt(btn.getAttribute("data-article-id"));
    const isBookmarked = isArticleBookmarked(articleId);

    btn.classList.toggle("bookmarked", isBookmarked);
    btn.innerHTML = `<i data-lucide="bookmark"></i> ${
      isBookmarked ? "Bookmarked" : "Bookmark"
    }`;
  });

  initializeIcons();
}

function shareArticle(articleId) {
  const article = newsData.getArticleById(articleId);
  const url = `${window.location.origin}/article.html?id=${articleId}`;

  if (navigator.share) {
    navigator.share({
      title: article.title,
      text: article.excerpt,
      url: url,
    });
  } else {
    navigator.clipboard.writeText(url).then(() => {
      showToast("Link copied to clipboard!", "success");
    });
  }
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

function showToast(message, type = "success") {
  const existingToast = document.querySelector(".toast");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = `toast ${type} show`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 3000);
}
