import ProductData from './ProductData.mjs';
import { getParam } from "./utils.mjs";
import ProductDetails from './ProductDetails.mjs';

//Retrieve product id in the URL.
const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);

const dataSource = new ProductData('tents');

product.init();











/* Layout the product id in the page.
document.querySelector('main').innerHTML = `<p>Product ID: ${productId}</p>`;
console.log(dataSource.findProductById(productId));

/*function addProductToCart(product) {
  setLocalStorage('so-cart', product);
}

function addProductToCart(product) {
  // Get current cart or initialize an empty array
  let cart = JSON.parse(localStorage.getItem('so-cart')) || [];

  // Add the new product
  cart.push(product);

  // Save updated cart using setLocalStorage
  setLocalStorage('so-cart', cart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);*/
