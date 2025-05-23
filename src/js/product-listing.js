import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

// create a new source of data for "tents"
const dataSource = new ProductData('tents');

const listElement = document.querySelector('.product-list');

if (listElement) {
  const myProductList = new ProductList('tents', dataSource, listElement);

  myProductList.init();
} else {
  console.warn("Element '.product-list' not found.");
}

// load the header and footer
loadHeaderFooter();

dataSource.getData().then(data => {
  console.log("Products retrieved:", data);
}).catch(err => {
  console.error("Error loading product data:", err);
});
