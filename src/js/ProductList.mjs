
import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {
  const imageFile = product.Image.split('/').pop(); // extrait juste le nom du fichier
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img src="/images/tents/${imageFile}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand?.Name || 'No brand'}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}


export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

 renderList(productList) {
  renderListWithTemplate(productCardTemplate, this.listElement, productList, "afterbegin", true);
}
}
