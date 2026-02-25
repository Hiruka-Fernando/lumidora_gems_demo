function toggleWishlist(gemId) {
  const index = wishlist.indexOf(gemId);
  const button = document.querySelector(`.add-to-wishlist[data-id="${gemId}"]`);
  if (!button) return;

  const icon = button.querySelector("i");

  if (index === -1) {
    wishlist.push(gemId);
    button.classList.add("in-wishlist");
    icon.classList.remove("far");
    icon.classList.add("fas");
    showNotification("Added to wishlist!");
  } else {
    wishlist.splice(index, 1);
    button.classList.remove("in-wishlist");
    icon.classList.remove("fas");
    icon.classList.add("far");
    showNotification("Removed from wishlist!");
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistCount();
}

function renderWishlistItems() {
  const wishlistItems = document.getElementById("wishlist-items");
  if (!wishlistItems) return;

  wishlistItems.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistItems.innerHTML =
      '<p class="empty-wishlist">Your wishlist is empty</p>';
    return;
  }

  wishlist.forEach((gemId) => {
    const gem = gems.find((g) => g.id === gemId);
    if (!gem) return;

    const item = document.createElement("div");
    item.className = "wishlist-item";

    item.innerHTML = `
      <img src="${gem.image}" alt="${gem.name}"
        style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius); margin-right: 15px;">
      <div style="flex: 1;">
          <h4>${gem.name}</h4>
          <p style="color: var(--accent); font-weight: 600;">
            $${gem.price.toLocaleString()}
          </p>
          <div style="margin-top: 10px;">
              <button class="btn" data-id="${gem.id}">Add to Cart</button>
              <button class="btn btn-outline" data-id="${gem.id}">Remove</button>
          </div>
      </div>
    `;

    wishlistItems.appendChild(item);
  });

  wishlistItems.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const gemId = parseInt(e.target.getAttribute("data-id"));

      if (e.target.textContent.includes("Add to Cart")) {
        addToCart(gemId);
      } else {
        wishlist = wishlist.filter((id) => id !== gemId);
        updateWishlistCount();
        renderWishlistItems();
        renderGemCards();
        showNotification("Removed from wishlist!");
      }
    });
  });
}
