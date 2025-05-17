import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

// Create an instance of ProductData
const dataSource = new ProductData('tents');

// Target the DOM element where to display the products
const listElement = document.querySelector('.product-list');

// Create an instance of ProductList with data source and DOM element
const myProductList = new ProductList('tents', dataSource, listElement);

// Initialize product display
myProductList.init();

// Display data in the console for verification
dataSource.getData().then((data) => {
  console.log("Products retrieved:", data);
});
