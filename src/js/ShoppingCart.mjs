// src/public/js/ShoppingCart.mjs

export default class ShoppingCart {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
    this.items = this.getLocalCart();
  }

  getLocalCart() {
    const cart = localStorage.getItem(this.key);
    return cart ? JSON.parse(cart) : [];
  }

  renderCartList() {
    this.listElement.innerHTML = ''; // clear existing

    const template = document.getElementById('cart-item-template');
    if (!template) return;

    this.items.forEach(item => {
      const clone = template.content.cloneNode(true);

      clone.querySelector('.item-name').textContent = item.name;
      clone.querySelector('.item-quantity').textContent = `Qty: ${item.quantity}`;
      clone.querySelector('.item-price').textContent = `$${(item.price * item.quantity).toFixed(2)}`;

      this.listElement.appendChild(clone);
    });
  }
}
