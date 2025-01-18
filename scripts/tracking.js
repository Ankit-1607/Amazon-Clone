import { getProduct, loadProductsFetch } from "../data/products.js";
import { updateCartQuantity } from "../data/cart.js";

const thisProductTracks = JSON.parse(localStorage.getItem('thisProductTracks'));
console.log(thisProductTracks);

// fetches products array
function loadPage() {
  return loadProductsFetch().catch((error) => { // loadProductsFetch() returns a promise
    console.log('unexpected error. Please try again later');
    console.log(error);
  });
}

loadPage().then(() => {
  document.querySelector('.cart-quantity').innerHTML = updateCartQuantity();
  renderTrackingSummary();
});


function renderTrackingSummary() {
  const product = getProduct(thisProductTracks.thisProduct.productID);
  let trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Delivery Date: ${thisProductTracks.thisProduct.deliveryDate}
    </div>

    <div class="product-info">
      ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${thisProductTracks.thisProduct.productQuantity}
    </div>

    <img class="product-image" src=${product.image}>

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar-preparing"></div>
    </div>  
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

  
  document.querySelector('.progress-bar-preparing').classList.add(
    thisProductTracks.shipped ? (
      (thisProductTracks.thisProduct.delivered) ? 'progress-bar-delivered' : 'progress-bar-shipped'
      ) : null
  )
}
