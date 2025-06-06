import { resolve } from 'path';
import { defineConfig } from 'vite';

//export default defineConfig({
  //root: 'src',

export default defineConfig({
   base: '/frontend330/',
  root: 'src/project',
 build: {
    outDir: '../../dist', 
    emptyOutDir: true,
  },
});

  /*
 build: {
  outDir: "../dist",
  rollupOptions: {
    input: {
      main: resolve(__dirname, "src/index.html"),
      cart: resolve(__dirname, "src/cart/index.html"),
      checkout: resolve(__dirname, "src/checkout/index.html"),
      product: resolve(__dirname, "src/product_pages/index.html"),
      productListing: resolve(__dirname, "src/product_listing/index.html"

      ),

    },
  },
},
});*/
