function setupEventListeners() {
  // Hamburger
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      hamburger.innerHTML = mobileMenu.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      if (hamburger) {
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // Cart button
  if (cartBtn) {
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      renderCartItems();
      if (cartModal) cartModal.style.display = "flex";
    });
  }

  // Wishlist button
  if (wishlistBtn) {
    wishlistBtn.addEventListener("click", (e) => {
      e.preventDefault();
      renderWishlistItems();
      if (wishlistModal) wishlistModal.style.display = "flex";
    });
  }

  // Login button
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (loginModal) loginModal.style.display = "flex";
    });
  }

  // Close login modal
  if (closeLogin) {
    closeLogin.addEventListener("click", () => {
      if (loginModal) loginModal.style.display = "none";
    });
  }

  // Close login modal when clicking outside
  window.addEventListener("click", (e) => {
    if (loginModal && e.target === loginModal) {
      loginModal.style.display = "none";
    }
  });

  // Login form submission
  const loginForm = document.getElementById("login-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email")?.value;
      const password = document.getElementById("password")?.value;

      if (email && password) {
        alert("Login successful! Welcome back to Ceylon Lumidora Gems.");
        if (loginModal) loginModal.style.display = "none";
        loginForm.reset();
      } else {
        alert("Please fill in all fields");
      }
    });
  }

  // Close modals
  if (closeCart) {
    closeCart.addEventListener("click", () => {
      if (cartModal) cartModal.style.display = "none";
    });
  }

  if (closeWishlist) {
    closeWishlist.addEventListener("click", () => {
      if (wishlistModal) wishlistModal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (cartModal && e.target === cartModal) {
      cartModal.style.display = "none";
    }
    if (wishlistModal && e.target === wishlistModal) {
      wishlistModal.style.display = "none";
    }
  });
}
