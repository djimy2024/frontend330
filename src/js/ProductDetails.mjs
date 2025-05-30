import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

export default class ProductDetails {
  constructor(productId, dataSource, element) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.element = element;
  }

  async init() {
    const product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(product);
  }

  renderProductDetails(product) {
    this.element.innerHTML = `
      <h2>${product.Name}</h2>
      <img src="${product.Images.PrimaryLarge}" alt="${product.Name}" />
      <p>${product.DescriptionHtmlSimple}</p>
      <p>Price: $${product.FinalPrice}</p>
    `;
  }
}
