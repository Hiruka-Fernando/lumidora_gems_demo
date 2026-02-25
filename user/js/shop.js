document.addEventListener("DOMContentLoaded", () => {
  renderShopGems(gems);
  setupShopFilters();
});

//render all products
function renderShopGems(productList) {
  const grid = document.getElementById("shop-gems-grid");
  if (!grid) return;

  grid.innerHTML = "";

  productList.forEach((gem) => {
    const isInWishlist = wishlist.includes(gem.id);

    const card = document.createElement("div");
    card.className = "gem-card";

    card.innerHTML = `
      <img src="${gem.image}" alt="${gem.name}" class="gem-img">
      <div class="gem-info">
          <h3>${gem.name}</h3>
          <p>${gem.description}</p>
          <div class="gem-price">$${gem.price.toLocaleString()}</div>
          <div class="gem-actions">
              <button class="btn add-to-cart" data-id="${gem.id}">
                Add to Cart
              </button>
              <button class="btn btn-outline add-to-wishlist ${isInWishlist ? "in-wishlist" : ""}" data-id="${gem.id}">
                <i class="${isInWishlist ? "fas" : "far"} fa-heart"></i>
              </button>
          </div>
      </div>
    `;

    grid.appendChild(card);
  });

  attachShopListeners();
}

function attachShopListeners() {
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(
  e.target.closest("button").getAttribute("data-id")
);

      addToCart(id);
      updateCartCount();
    });
  });

  document.querySelectorAll(".add-to-wishlist").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(
        e.target.closest("button").getAttribute("data-id")
      );
      toggleWishlist(id);
      updateWishlistCount();
      applyFilters(
  document.getElementById("shop-search").value,
  document.querySelector(".category-btn.active").dataset.category
);

    });
  });
}

function setupShopFilters() {
  const searchInput = document.getElementById("shop-search");
  const categoryButtons = document.querySelectorAll(".category-btn");

  let activeCategory = "all";

  categoryButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      activeCategory = btn.dataset.category;
      applyFilters(searchInput.value, activeCategory);
    });
  });

  searchInput.addEventListener("input", () => {
    applyFilters(searchInput.value, activeCategory);
  });
}

function applyFilters(searchText, category) {
  let filtered = gems;

  if (category !== "all") {
    filtered = filtered.filter(
      (gem) => gem.category === category
    );
  }

  if (searchText.trim() !== "") {
    filtered = filtered.filter((gem) =>
      gem.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  renderShopGems(filtered);
}
