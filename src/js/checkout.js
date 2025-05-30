import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();


const checkout = new CheckoutProcess("so-cart", "#orderSummary");
checkout.init();

document.querySelector("#zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});


document.addEventListener("DOMContentLoaded", () => {
  const subtotal = parseFloat(localStorage.getItem("cartSubtotal")) || 0;
  const tax = +(subtotal * 0.05).toFixed(2);
  const shipping = 5.0;
  const total = +(subtotal + tax + shipping).toFixed(2);

  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("shipping").textContent = shipping.toFixed(2);
  document.getElementById("total").textContent = total.toFixed(2);
});

document.getElementById("checkoutForm").addEventListener("submit", function (e) {
  if (!this.checkValidity()) {
    e.preventDefault(); // Block form submission if invalid
    alert("Please fill out all fields.");
  }
});
