// Search Functionality
function setupSearch() {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const clearSearchBtn = document.getElementById("clear-search");

  if (!searchInput || !searchBtn) return;

  // Handle search button click
  searchBtn.addEventListener("click", performSearch);

  // Handle Enter key in search input
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  // Handle clear search
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", clearSearch);
  }

  // Check if there's a search query in URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q");

  if (query && window.location.pathname.includes("index.html")) {
    searchInput.value = query;
    performSearch();
  }
}

function performSearch() {
  const searchInput = document.getElementById("search-input");
  const query = searchInput.value.trim();

  if (!query) {
    showToast("Please enter a search term", "error");
    return;
  }

  // Only perform search on homepage
  if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
    displaySearchResults(query);
  } else {
    // Redirect to homepage with search query
    window.location.href = `index.html?q=${encodeURIComponent(query)}`;
  }
}

function displaySearchResults(query) {
  const results = newsData.searchArticles(query);

  const searchResultsSection = document.getElementById("search-results");
  const searchResultsGrid = document.getElementById("search-results-grid");
  const searchResultsTitle = document.getElementById("search-results-title");
  const homepageContent = document.getElementById("homepage-content");

  if (!searchResultsSection) return;

  // Update title
  searchResultsTitle.textContent = `Search Results for "${query}" (${results.length})`;

  // Show search results section
  searchResultsSection.style.display = "block";
  homepageContent.style.display = "none";

  if (results.length === 0) {
    searchResultsGrid.innerHTML = `
      <div class="no-results">
        <i data-lucide="search-x"></i>
        <h3>No Results Found</h3>
        <p>We couldn't find any articles matching "${query}"</p>
        <p>Try different keywords or browse our categories</p>
      </div>
    `;
  } else {
    searchResultsGrid.innerHTML = results
      .map((article) => createSearchResultCard(article, query))
      .join("");

    // Setup actions for search result cards
    setupSearchResultActions();
  }

  // Reinitialize icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }
}

function createSearchResultCard(article, query) {
  const isBookmarked = isArticleBookmarked(article.id);

  // Highlight search terms in title and excerpt
  const highlightedTitle = highlightText(article.title, query);
  const highlightedExcerpt = highlightText(article.excerpt, query);

  return `
    <div class="article-card search-result-card">
      <img src="${article.image}" alt="${article.title}">
      <div class="article-card-content">
        <span class="category-tag">${article.category}</span>
        <h3><a href="article.html?id=${article.id}">${highlightedTitle}</a></h3>
        <div class="article-meta">
          <span class="meta-item"><i data-lucide="user"></i> ${article.author}</span>
          <span class="meta-item"><i data-lucide="clock"></i> ${formatDate(article.date)}</span>
          <span class="meta-item"><i data-lucide="eye"></i> ${formatViews(article.views)}</span>
        </div>
        <p>${highlightedExcerpt}</p>
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

function highlightText(text, query) {
  if (!query) return text;

  const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function clearSearch() {
  const searchInput = document.getElementById("search-input");
  const searchResultsSection = document.getElementById("search-results");
  const homepageContent = document.getElementById("homepage-content");

  searchInput.value = "";

  if (searchResultsSection && homepageContent) {
    searchResultsSection.style.display = "none";
    homepageContent.style.display = "block";
  }

  // Clear URL query parameter
  const url = new URL(window.location);
  url.searchParams.delete("q");
  window.history.replaceState({}, "", url);
}

function setupSearchResultActions() {
  document.querySelectorAll(".search-result-card .bookmark-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const articleId = parseInt(this.getAttribute("data-article-id"));
      toggleBookmark(articleId);

      // Update button state
      const isBookmarked = isArticleBookmarked(articleId);
      this.classList.toggle("bookmarked", isBookmarked);
      this.innerHTML = `<i data-lucide="bookmark"></i> ${isBookmarked ? "Saved" : "Save"}`;

      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    });
  });

  document.querySelectorAll(".search-result-card .share-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const articleId = parseInt(this.getAttribute("data-article-id"));
      shareArticle(articleId);
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

// Auto-initialize search if on homepage
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    // Only setup if not already done
    if (typeof window.searchSetupComplete === "undefined") {
      setupSearch();
      window.searchSetupComplete = true;
    }
  });
}
