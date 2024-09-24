// to generate HTML for the products
import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars*10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${(product.priceCents / 100).toFixed(2)} 
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-Id="${product.id}">
              Add to Cart
            </button>
          </div>
  `
})
document.querySelector('.js-products-grid').innerHTML = productsHTML;

let timeoutID; // a global scope variable to store setTimeout() id which is used to restore the timer for disappearing of the message

// making Add to cart button responsive
document.querySelectorAll('.js-add-to-cart')
// using product-id and not name because more than 1 product can have same name ...but can be from different brands
.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click',() => {
    const productId = addToCartButton.dataset.productId;

    let matchingItem;

    cart.forEach((item) => {
      if(productId === item.productId){
        matchingItem = item;
      }
    });

    if(matchingItem){
      matchingItem.quantity += Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    }else{
      cart.push({
        productId:productId,
        quantity: Number(document.querySelector(`.js-quantity-selector-${productId}`).value)
      });
    }    
    console.log(cart);
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    })
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    // making 'added' visible and then invisible after 2 seconds
    document.querySelector(`.js-added-to-cart-${productId}`).classList.add('js-added-to-cart-visible');

    // timer reloads for disappearing of added message
    clearTimeout(timeoutID);

    timeoutID = setTimeout(() => {
      document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('js-added-to-cart-visible')
    },2000);
  })
})