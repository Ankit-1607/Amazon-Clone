import {cart, updateCartQuantity } from "../../data/cart.js";
import {products,getProduct} from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addToPreviousOrders } from "../../data/previous-products.js";


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
      // cart = [];
      window.location.href = 'orders.html';
    })
}