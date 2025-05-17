import {  setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Load product data.
    this.product = await this.dataSource.findProductById(this.productId);
    
    // Layout details in the page.
    this.renderProductDetails();

    // Add an event listener button in "Add to Cart"
    document.getElementById('addToCart')?.addEventListener('click', this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cartContents = getLocalStorage('so-cart') || [];
    cartContents.push(this.product);
    setLocalStorage('so-cart', cartContents);
  }

  renderProductDetails() {
    document.querySelector('main').innerHTML = `
      <section class="product-detail">
        <h3>${this.product.NameWithoutBrand}</h3>
        <h2 class="divider">${this.product.Brand?.Name}</h2>
        <img class="product-image" src="${this.product.Image}" alt="${this.product.NameWithoutBrand}" />
        <p class="product-card__price">$${this.product.ListPrice}</p>
        <p class="product__color">Color: ${this.product.Colors?.[0].ColorName}</p>
        <button id="addToCart">Add to Cart</button>
      </section>
    `;
  }
}