import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderpaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-oops.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";

async function loadPage() {
  console.log('load page');

  await loadProductsFetch();

  renderOrderSummary();
  renderpaymentSummary();
  
  return 'value2';
}
loadPage().then((value) => {
  console.log('next step - 2');
  console.log(value);
});

// new Promise((resolve) => {
//   loadProducts(() => { // asynchronous code
//     resolve('value1'); // we wait for a-sync code to finish and then go to next step using resolve()
//   });
// })

/*
loadProductsFetch().then((value) => {
  // console.log(value);
  renderOrderSummary();
  renderpaymentSummary();
});
*/

/*
loadProducts(() => {
  renderOrderSummary();
  renderpaymentSummary();
})
  */