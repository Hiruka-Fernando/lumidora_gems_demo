document.addEventListener("DOMContentLoaded", () => {

  // Only render gem cards if grid exists
  if (document.getElementById("gems-grid")) {
    renderGemCards();
  }

  updateCartCount();
  updateWishlistCount();
  setupEventListeners();
});
