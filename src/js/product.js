import { getParam, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const productId = getParam("product");
const dataSource = new ExternalServices();
const element = document.querySelector(".product-detail");

const product = new ProductDetails(productId, dataSource, element);
product.init();
