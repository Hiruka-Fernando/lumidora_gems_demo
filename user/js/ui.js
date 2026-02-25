// Render gem cards
function renderGemCards() {
  if (!gemsGrid) return;

  gemsGrid.innerHTML = "";

  gems.forEach((gem) => {
    const isInWishlist = wishlist.includes(gem.id);

    const gemCard = document.createElement("div");
    gemCard.className = "gem-card";
    gemCard.innerHTML = `
      <img src="${gem.image}" alt="${gem.name}" class="gem-img">
      <div class="gem-info">
          <h3 class="gem-name">${gem.name}</h3>
          <p class="gem-description">${gem.description}</p>
          <div class="gem-price">$${gem.price.toLocaleString()}</div>
          <div class="gem-actions">
              <button class="btn add-to-cart" data-id="${gem.id}">Add to Cart</button>
              <button class="btn btn-outline add-to-wishlist ${isInWishlist ? "in-wishlist" : ""}" data-id="${gem.id}">
                  <i class="${isInWishlist ? "fas" : "far"} fa-heart"></i>
              </button>
          </div>
      </div>
    `;

    gemsGrid.appendChild(gemCard);
  });

  // Attach listeners to buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const gemId = parseInt(e.target.getAttribute("data-id"));
      addToCart(gemId);
    });
  });

  document.querySelectorAll(".add-to-wishlist").forEach((button) => {
    button.addEventListener("click", (e) => {
      const gemId = parseInt(
        e.target.closest("button").getAttribute("data-id"),
      );
      toggleWishlist(gemId);
    });
  });
}

// Update cart count
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll(".cart-count").forEach((element) => {
    element.textContent = totalItems;
  });
}

// Update wishlist count
function updateWishlistCount() {
  const totalItems = wishlist.length;

  document.querySelectorAll(".wishlist-count").forEach((element) => {
    element.textContent = totalItems;
  });
}

// Show notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}
