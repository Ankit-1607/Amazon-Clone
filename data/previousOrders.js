import { previousOrders } from "../data/previous-products.js";
import { products, getProduct } from "../data/products.js";
import { getPrevOrdersFromStorage } from "../data/previous-products.js";
import { getDeliveryDate } from "../scripts/utils/deliveryDate.js";
import { getDeliveryOption } from "./deliveryOptions.js";
import { cart, saveToStorage, updateCartQuantity } from "./cart.js";

export function renderOrdersList() {
  getPrevOrdersFromStorage();
  if(!previousOrders) return; // doesn't throw error if there is nothing in previous orders

  let orderListHTML = '';

  previousOrders.forEach((previousOrder) => {
    // get products from product list
    let currentProducts = []; // contains all info about order being processed
    let itemNumber = 1; // helper - generate computed properties
    previousOrder.productIds.forEach((currentProduct) => {
      let computedProperty = `product_${itemNumber}_id`;
      const productInfo = getProduct(currentProduct[computedProperty]);
      // console.log(products); // products array isn't getting created in DOM since main amazon.js doesn't run for this
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

    let currentProductsShippingID = [];
    itemNumber = 1;
    previousOrder.shippingDetails.forEach((currentProduct) => {
      let computedProperty = `product_${itemNumber}_shippingId`;
      currentProductsShippingID.push(currentProduct[computedProperty]);
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
            Delivery date: ${getDeliveryDate(getDeliveryOption(currentProductsShippingID[itemNumber]).deliveryDays)}
          </div>
          <div class="product-quantity">
            Quantity: ${currentProductsQuantities[itemNumber]}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button"
          data-product-Id="${currentProduct.id}"
          data-product-quantity="${currentProductsQuantities[itemNumber]}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
          <div class="added-to-cart js-added-to-cart-${currentProduct.id}">
            <img src="images/icons/checkmark.png">
              Added to cart
          </div>
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
                <div>₹ ${previousOrder.orderTotal.toFixed(2)}</div>
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

  // makes buy again button responsive
  document.querySelectorAll('.js-buy-again-button').
    forEach((buyAgainButton) => 
    {
      buyAgainButton.addEventListener('click',() => {
        
        console.log("added");
        const productId = buyAgainButton.dataset.productId; // dataset defined in buy again button attributes 
        const productQuantity = buyAgainButton.dataset.productQuantity;
        // runs after item added to cart
        addToCartHere(productId, productQuantity); 
        document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

        // making 'added to cart' visible and then invisible after 2 seconds
        document.querySelector(`.js-added-to-cart-${productId}`).classList.add('js-added-to-cart-visible');
        
        let timeoutID;
        // timer starts for disappearing of added message
        setTimeout(() => {
            document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('js-added-to-cart-visible');
            clearTimeout(timeoutID);
          },2000);
      })
    })
}

function addToCartHere(productId, quantityOfProduct) {
  let matchingItem;
    // searching if product already there in cart
    cart.forEach((cartItem) => { 
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
    // if product already there..increment quantity else add new item
    if(matchingItem){
      matchingItem.quantity += Number(quantityOfProduct);
    }else{
      cart.push({
        productId:productId,
        quantity: Number(quantityOfProduct),
        deliveryOptionId: '1' // free delivery - default delivery option
      });
    }
    saveToStorage();
}