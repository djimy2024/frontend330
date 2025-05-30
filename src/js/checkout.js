import { loadHeaderFooter, getLocalStorage, formDataToJSON } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs"; 

loadHeaderFooter();


const checkout = new CheckoutProcess("so-cart", "#orderSummary");
checkout.init();


function packageItems(items) {
  return items.map(item => ({
    id: item.Id || item.id,
    name: item.Name || item.name,
    price: item.FinalPrice || item.price,
    quantity: item.quantity
  }));
}


document.querySelector('#checkout-form')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.target;

  const order = formDataToJSON(form);
  const items = getLocalStorage("so-cart");

  order.orderDate = new Date().toISOString();
  order.items = packageItems(items);
  order.shipping = 12;

  const subtotal = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  order.tax = (subtotal * 0.06).toFixed(2);
  order.orderTotal = (subtotal + parseFloat(order.tax) + order.shipping).toFixed(2);

  try {
    const result = await new ExternalServices().checkout(order);
    console.log("Order response:", result);
    alert("Order submitted successfully!");
   
  } catch (err) {
    console.error("Checkout failed:", err);
    alert("Order submission failed.");
  }
});
