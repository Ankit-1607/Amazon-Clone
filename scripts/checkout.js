import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderpaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";

function loadPage() {
  return loadProductsFetch().catch((error) => { // loadProductsFetch() returns a promise
    console.log('unexpected error. Please try again later');
    console.log(error);
  });
}

loadPage().then(() => {
  renderOrderSummary();
  renderpaymentSummary();
});