// Add item to cart
function addToCart(gemId) {
  const gem = gems.find((g) => g.id === gemId);
  if (!gem) return;

  const existingItem = cart.find((item) => item.id === gemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: gem.id,
      name: gem.name,
      price: gem.price,
      image: gem.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showNotification(`${gem.name} added to cart!`);
}

// Render cart modal items
function renderCartItems() {
  const cartItems = document.getElementById("cart-items");
  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    document.getElementById("cart-total").style.display = "none";
    return;
  }

  let totalPrice = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" 
        style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius); margin-right: 15px;">
      <div style="flex: 1;">
          <h4>${item.name}</h4>
          <p style="color: var(--accent); font-weight: 600;">
            $${item.price.toLocaleString()}
          </p>
          <div style="display: flex; align-items: center; margin-top: 10px;">
              <button class="btn" data-id="${item.id}" data-action="decrease">-</button>
              <span style="margin: 0 10px;">${item.quantity}</span>
              <button class="btn" data-id="${item.id}" data-action="increase">+</button>
              <button class="btn btn-outline" data-id="${item.id}" data-action="remove">Remove</button>
          </div>
      </div>
    `;

    cartItems.appendChild(cartItem);
    totalPrice += item.price * item.quantity;
  });

  document.getElementById("total-price").textContent =
    `$${totalPrice.toLocaleString()}`;
  document.getElementById("cart-total").style.display = "block";

  cartItems.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const gemId = parseInt(e.target.getAttribute("data-id"));
      const action = e.target.getAttribute("data-action");

      if (action === "increase") {
        const item = cart.find((i) => i.id === gemId);
        if (item) item.quantity += 1;
      } else if (action === "decrease") {
        const item = cart.find((i) => i.id === gemId);
        if (item) {
          item.quantity -= 1;
          if (item.quantity <= 0) {
            cart = cart.filter((i) => i.id !== gemId);
          }
        }
      } else if (action === "remove") {
        cart = cart.filter((i) => i.id !== gemId);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCartItems();
    });
  });
}
