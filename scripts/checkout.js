import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderpaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-oops.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';
import { loadProducts } from "../data/products.js";

loadProducts(() => {
  renderOrderSummary();
  renderpaymentSummary();
})