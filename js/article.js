// Article Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  displayCurrentDate();
  loadArticle();
  setupNewsletter();
  setupMobileMenu();
  setupAuth();
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

function loadArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = parseInt(urlParams.get("id"));

  if (!articleId) {
    window.location.href = "index.html";
    return;
  }

  const article = newsData.getArticleById(articleId);

  if (!article) {
    window.location.href = "index.html";
    return;
  }

  // Update page title
  document.title = `${article.title} - The Watchtower`;

  // Load breadcrumb
  loadBreadcrumb(article);

  // Load article header
  document.getElementById("article-category").textContent = article.category;
  document.getElementById("article-title").textContent = article.title;

  // Load article meta
  const metaHTML = `
    <span class="meta-item"><i data-lucide="user"></i> By ${article.author}</span>
    <span class="meta-item"><i data-lucide="calendar"></i> ${formatDate(article.date)}</span>
    <span class="meta-item"><i data-lucide="eye"></i> ${formatViews(article.views)} views</span>
  `;
  document.getElementById("article-meta").innerHTML = metaHTML;

  // Load article image
  document.getElementById("article-image").src = article.image;
  document.getElementById("article-image").alt = article.title;

  // Load article body
  const contentParagraphs = article.content.split("\n\n");
  const bodyHTML = contentParagraphs
    .map((para) => `<p>${para}</p>`)
    .join("");
  document.getElementById("article-body").innerHTML = bodyHTML;

  // Load article tags
  loadArticleTags(article);

  // Setup article actions
  setupArticleActions(article);

  // Load related articles
  loadRelatedArticles(article);

  // Update bookmark button state
  updateBookmarkButton(articleId);

  // Reinitialize icons
  initializeIcons();
}

function loadBreadcrumb(article) {
  const breadcrumb = document.getElementById("breadcrumb");
  breadcrumb.innerHTML = `
    <a href="index.html">Home</a>
    <span class="breadcrumb-separator">/</span>
    <a href="category.html?cat=${article.category}">${article.category}</a>
    <span class="breadcrumb-separator">/</span>
    <span>${article.title}</span>
  `;
}

function loadArticleTags(article) {
  const tags = [article.category, article.author.split(" ")[0]];
  const tagsHTML = tags
    .map(
      (tag) =>
        `<span class="article-tag">#${tag.toLowerCase().replace(/\s+/g, "")}</span>`
    )
    .join("");
  document.getElementById("article-tags").innerHTML = tagsHTML;
}

function setupArticleActions(article) {
  const bookmarkBtn = document.getElementById("bookmark-btn");
  const shareBtn = document.getElementById("share-btn");
  const printBtn = document.getElementById("print-btn");

  bookmarkBtn.addEventListener("click", () => {
    toggleBookmark(article.id);
    updateBookmarkButton(article.id);
  });

  shareBtn.addEventListener("click", () => shareArticle(article));

  printBtn.addEventListener("click", () => window.print());

  // Social share buttons
  document.querySelectorAll(".share-social-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const platform = this.getAttribute("data-platform");
      shareOnPlatform(article, platform);
    });
  });
}

function updateBookmarkButton(articleId) {
  const bookmarkBtn = document.getElementById("bookmark-btn");
  const isBookmarked = isArticleBookmarked(articleId);

  if (isBookmarked) {
    bookmarkBtn.classList.add("bookmarked");
    bookmarkBtn.querySelector("span").textContent = "Bookmarked";
  } else {
    bookmarkBtn.classList.remove("bookmarked");
    bookmarkBtn.querySelector("span").textContent = "Bookmark";
  }

  initializeIcons();
}

function shareArticle(article) {
  const url = window.location.href;

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

function shareOnPlatform(article, platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(article.title);
  const text = encodeURIComponent(article.excerpt);

  let shareUrl;

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case "email":
      shareUrl = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
      break;
    default:
      return;
  }

  window.open(shareUrl, "_blank", "width=600,height=400");
}

function loadRelatedArticles(article) {
  const relatedArticles = newsData
    .getArticlesByCategory(article.category)
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  const grid = document.getElementById("related-articles-grid");

  if (relatedArticles.length === 0) {
    grid.innerHTML = `<p style="color: var(--text-gray); text-align: center;">No related articles found.</p>`;
    return;
  }

  grid.innerHTML = relatedArticles.map((article) => createArticleCard(article)).join("");

  // Setup article actions for related articles
  setupRelatedArticleActions();
  initializeIcons();
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
        </div>
        <p>${article.excerpt}</p>
        <div class="article-actions">
          <button class="action-btn bookmark-btn ${isBookmarked ? "bookmarked" : ""}" data-article-id="${article.id}">
            <i data-lucide="bookmark"></i> ${isBookmarked ? "Saved" : "Save"}
          </button>
        </div>
        <a href="article.html?id=${article.id}" class="read-more">Read More</a>
      </div>
    </div>
  `;
}

function setupRelatedArticleActions() {
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
