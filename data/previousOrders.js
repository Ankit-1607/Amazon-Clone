import { previousOrders } from "../data/previous-products.js";
import { products, getProduct } from "../data/products.js";
import { getPrevOrdersFromStorage } from "../data/previous-products.js";
import { getDeliveryDate } from "../scripts/utils/deliveryDate.js";
export function renderOrdersList() {
  getPrevOrdersFromStorage();
  if(!previousOrders) return; // doesn't throw error if there is nothing in previous orders

  console.log("Loading Started...")
  let orderListHTML = '';

  previousOrders.forEach((previousOrder) => {
    // get products from product list
    let currentProducts = []; // contains all info about order being processed
    let itemNumber = 1; // helper - generate computed properties
    previousOrder.productIds.forEach((currentProduct) => {
      let computedProperty = `product_${itemNumber}_id`;
      const productInfo = getProduct(currentProduct[computedProperty]);
      // console.log(products); // products array isn't getting created in DOM since main amazon.js doesn't run for this
      console.log("here");
      currentProducts.push(productInfo);
      itemNumber++;
    })

    let currentProductsQuantities = [];
    itemNumber = 1;
    previousOrder.quantity.forEach((currentProduct) => {
      let computedProperty = `product_${itemNumber}_quantity`;
      currentProductsQuantities.push(currentProduct[computedProperty]);
      itemNumber++;
    })

    let currentOrderHTML = '';
    itemNumber = 0; // iterates thru currentProductsQuantities array
    currentProducts.forEach((currentProduct) => {
      currentOrderHTML += `
        <div class="product-image-container">
            <img src="${currentProduct.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${currentProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${getDeliveryDate(7)}
          </div>
          <div class="product-quantity">
            Quantity: ${currentProductsQuantities[itemNumber]}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `
      itemNumber++;
    })

    orderListHTML += `
      <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${previousOrder.orderDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>₹ ${previousOrder.orderTotal}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${previousOrder.orderID}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${currentOrderHTML}
          </div>
        </div>
    `
  })
  document.querySelector(".js-orders-grid").innerHTML = orderListHTML;
  console.log(previousOrders);
}