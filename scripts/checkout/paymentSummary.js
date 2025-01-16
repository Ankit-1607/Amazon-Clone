import {cart, emptyTheCart, isCartEmpty, saveToStorage, updateCartQuantity } from "../../data/cart.js";
import {products,getProduct} from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addToPreviousOrders } from "../../data/previous-products.js";
import { myCurrentOrder } from "../../data/myOrder.js";


export function renderpaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    // to find the product details by matching the product in cart to product list in product.js
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;    

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId)
    
    shippingPriceCents += deliveryOption.priceCents;
  })
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

  const taxCents = totalBeforeTaxCents * 0.1;

  const totalCents = totalBeforeTaxCents + taxCents;
  // dynamic html generation for 
  const paymentSummary = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${updateCartQuantity()}):</div>
      <div class="payment-summary-money">₹${productPriceCents}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">₹${shippingPriceCents}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">₹${totalBeforeTaxCents}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">₹${taxCents}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">₹${totalCents}</div>
    </div>

    <button class="place-order-button button-primary
      js-place-order">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummary;

  document.querySelector('.js-place-order').
    addEventListener('click',() => {
      if (isCartEmpty()) {
        // if user tries to place an order without adding items to cart
        if (!document.querySelector('.js-text-message-container')) {  // Checks if message is already displayed

          const textMessageContainer = document.createElement('div'); // container for text message
          textMessageContainer.classList.add('js-text-message-container');

          const textMessage = document.createElement('span'); // text message holder
          textMessage.innerHTML = "Kindly add items to cart to place an order";
          
          textMessageContainer.appendChild(textMessage); // add text holder to container
          
          document.querySelector('.message-to-user').appendChild(textMessageContainer); // add container to page
          
          setTimeout(() => { // Remove the container and message after 4 seconds
            textMessageContainer.remove();
          }, 4000);
        }
        return;
      }
      
      myCurrentOrder(cart, totalCents);
      addToPreviousOrders();
      // when order is placed cart becomes empty and all the items move to orders
      emptyTheCart();
      saveToStorage();
      window.location.href = 'orders.html';
    })
}