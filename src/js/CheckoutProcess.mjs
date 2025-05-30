import { getLocalStorage } from "../utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((sum, item) => {
      return sum + item.finalPrice * item.quantity;
    }, 0);

    // Display subtotal
    const subtotalElem = document.querySelector(`${this.outputSelector} #subtotal`);
    subtotalElem.innerText = `$${this.itemTotal.toFixed(2)}`;

    // Display number of items (optional)
    const itemCountElem = document.querySelector(`${this.outputSelector} #itemCount`);
    if (itemCountElem) {
      const totalCount = this.list.reduce((count, item) => count + item.quantity, 0);
      itemCountElem.innerText = totalCount;
    }
  }

  calculateOrderTotal() {
    // Tax = 6% of item total
    this.tax = this.itemTotal * 0.06;

    // Shipping: $10 for first item, $2 for each additional
    const totalItems = this.list.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > 0) {
      this.shipping = 10 + (totalItems - 1) * 2;
    }

    // Final total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const total = document.querySelector(`${this.outputSelector} #total`);

    if (tax) tax.innerText = `$${this.tax.toFixed(2)}`;
    if (shipping) shipping.innerText = `$${this.shipping.toFixed(2)}`;
    if (total) total.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}
