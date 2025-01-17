import { renderOrdersList } from "../data/previousOrders.js";
import { loadProductsFetch } from "../data/products.js";
import { cart, updateCartQuantity } from "../data/cart.js";


// runs on page reload
document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

// loads the products
async function loadPage() {
  try {
    await loadProductsFetch();
  } catch(error) {
    console.log('unexpected error. Please try again later');
    console.log(error);
  }  
  return 'value2';
}
loadPage().then((value) => {
  
  renderOrdersList();
});