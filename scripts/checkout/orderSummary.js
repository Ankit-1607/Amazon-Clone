import {cart, removeFromCart, updateCartQuantity, updateDeliveryOption} from "../../data/cart.js";
import {products,getProduct} from "../../data/products.js";
import { deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js"; 
import { renderpaymentSummary } from "./paymentSummary.js";
import {getDeliveryDate} from "../utils/deliveryDate.js"
import { loadProducts } from "../../data/products.js";

export function renderOrderSummary(){

  let cartSummaryHTML = '';
  // iterate thru items present in cart
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId); // finding item's object from product array

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = getDeliveryDate(deliveryOption.deliveryDays);

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct,cartItem)}
        </div>
      </div>
    </div>`;
  })

  function deliveryOptionsHTML(matchingProduct,cartItem){ 
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {

      const dateString = getDeliveryDate(deliveryOption.deliveryDays);

      const priceString = (deliveryOption.priceCents === 0) ? 'FREE' : `₹${deliveryOption.priceCents} - `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `;
    })
    return html;
  }


  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click',() => {

      removeFromCart(link.dataset.productId); // using data atribute to delete the item

      const container = document.querySelector(`.js-cart-item-container-${link.dataset.productId}`);

      container.remove(); /* this removes the referenced element from DOM...it's a DOM method
      and DOM automatically adjusts itself for other elements...so need to explicitly call renderOrderSummary() */
      
      console.log("delete link clicked");
      // renderOrderSummary();
      cartQuantitySummaryText();
      renderpaymentSummary();
      cartPageTitle();
    })
  })

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click' , () => {
      const {productId , deliveryOptionId} = element.dataset; // destructuring
      updateDeliveryOption(productId,deliveryOptionId);
      renderOrderSummary(); // regenerates all the html for smoother looking refresh
      renderpaymentSummary();
      cartQuantitySummaryText();
      cartPageTitle();
    })
  })
  cartQuantitySummaryText();
  cartPageTitle();
}

function cartQuantitySummaryText() {
  const numOfItems = updateCartQuantity();
  if(numOfItems == 0) {
    document.querySelector(".js-card-quantity-summary").innerHTML = "No items";
  } else if(numOfItems == 1) {
    document.querySelector(".js-card-quantity-summary").innerHTML = "1 item";
  } else {
    document.querySelector(".js-card-quantity-summary").innerHTML = `${numOfItems} items`;
  }
}

function cartPageTitle() {
  const numOfItems = updateCartQuantity();
  if(numOfItems == 0) {
    document.querySelector(".js-page-title").innerHTML = "Your Amazon Clone Cart is empty";
  } else {
    document.querySelector(".js-page-title").innerHTML = "Review your Cart";
  }
}