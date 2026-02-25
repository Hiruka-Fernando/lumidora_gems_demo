const placeOrderBtn = document.getElementById("place-order");

placeOrderBtn.addEventListener("click", () => {

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const newOrder = {
    id: Date.now(),
    customer: "Guest", // later you can replace with logged in user
    total: total,
    date: new Date(),
    status: "Pending",
    items: cart
  };

  orders.push(newOrder);

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");

  alert("Order placed successfully!");

  window.location.href = "success.html";
});