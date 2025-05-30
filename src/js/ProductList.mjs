import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const link = product.WebUrl ?? `/product_pages/?product=${product.Id}`;
  const image = product.Images?.PrimaryMedium ?? product.Image ?? "../images/no-image.png";
  const price = product.FinalPrice ? `$${product.FinalPrice}` : "Price not available";
  const brand = product.Brand?.Name ?? "No Brand";

  return `
    <li class="product-card">
      <a href="${link}" target="_blank">
        <img src="${image}" alt="${product.Name}">
        <h3>${brand}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">${price}</p>
      </a>
    </li>
  `;
}




export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    console.log("Fetched product list:", list); // Log pou verifye si done parèt
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
