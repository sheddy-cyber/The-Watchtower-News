// Authentication JavaScript
function setupAuth() {
  const authLink = document.getElementById("auth-link");
  const authModal = document.getElementById("auth-modal");
  const closeAuth = document.getElementById("close-auth");
  const authTabs = document.querySelectorAll(".auth-tab");
  const signinForm = document.getElementById("signin-form");
  const signupForm = document.getElementById("signup-form");

  if (!authLink || !authModal) return;

  // Check if user is logged in
  updateAuthUI();

  // Open auth modal
  authLink.addEventListener("click", (e) => {
    e.preventDefault();
    const user = getCurrentUser();

    if (user) {
      // User is logged in, show logout confirmation
      if (confirm(`Sign out as ${user.name}?`)) {
        logout();
      }
    } else {
      // User is not logged in, show auth modal
      authModal.classList.add("active");
    }
  });

  // Close auth modal
  closeAuth.addEventListener("click", () => authModal.classList.remove("active"));
  authModal.addEventListener("click", (e) => {
    if (e.target === authModal) authModal.classList.remove("active");
  });

  // Auth tabs
  authTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const tabName = this.getAttribute("data-tab");

      // Update active tab
      authTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      // Show appropriate form
      if (tabName === "signin") {
        signinForm.style.display = "block";
        signupForm.style.display = "none";
      } else {
        signinForm.style.display = "none";
        signupForm.style.display = "block";
      }
    });
  });

  // Sign in form
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    if (signin(email, password)) {
      authModal.classList.remove("active");
      signinForm.reset();
      updateAuthUI();
      showToast("Successfully signed in!", "success");
    } else {
      showToast("Invalid email or password", "error");
    }
  });

  // Sign up form
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (signup(name, email, password)) {
      authModal.classList.remove("active");
      signupForm.reset();
      updateAuthUI();
      showToast("Account created successfully!", "success");

      // Switch back to signin tab
      authTabs[0].click();
    } else {
      showToast("Email already exists", "error");
    }
  });
}

function signup(name, email, password) {
  // Get existing users
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Check if email already exists
  if (users.some((user) => user.email === email)) {
    return false;
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    name: name,
    email: email,
    password: password, // In production, this should be hashed
    createdAt: new Date().toISOString(),
  };

  // Add user to storage
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Auto sign in
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  return true;
}

function signin(email, password) {
  // Get existing users
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Find user
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    // Set current user
    localStorage.setItem("currentUser", JSON.stringify(user));
    return true;
  }

  return false;
}

function logout() {
  localStorage.removeItem("currentUser");
  updateAuthUI();
  showToast("Successfully signed out", "success");

  // Redirect to home if on a protected page
  if (window.location.pathname.includes("profile")) {
    window.location.href = "index.html";
  }
}

function getCurrentUser() {
  const userJson = localStorage.getItem("currentUser");
  return userJson ? JSON.parse(userJson) : null;
}

function updateAuthUI() {
  const authText = document.getElementById("auth-text");
  const authLink = document.getElementById("auth-link");
  const user = getCurrentUser();

  if (user) {
    authText.textContent = user.name;
    authLink.title = "Click to sign out";
  } else {
    authText.textContent = "Sign In";
    authLink.title = "Click to sign in";
  }
}

function isUserLoggedIn() {
  return getCurrentUser() !== null;
}

function requireAuth() {
  if (!isUserLoggedIn()) {
    window.location.href = "index.html";
    return false;
  }
  return true;
}

// Initialize auth on page load if setupAuth hasn't been called from main script
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    // Only setup if not already done by page-specific script
    if (typeof window.authSetupComplete === "undefined") {
      setupAuth();
      window.authSetupComplete = true;
    }
  });
}
