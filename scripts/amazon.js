// to generate HTML for the products
import { cart , addToCart} from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { updateCartQuantity } from "../data/cart.js";

loadProducts(renderProductGrid);

function renderProductGrid() {

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
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
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

        ${product.extraInfoHTML()}

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

  // making Add to cart button responsive
  document.querySelectorAll('.js-add-to-cart')
  // using product-id and not name because more than 1 product can have same name...but can be from different brands
  .forEach((addToCartButton) => {
    addToCartButton.addEventListener('click',() => {
      const productId = addToCartButton.dataset.productId; // dataset defined in Add to Cart button attributes 
      // runs after item added to cart
      addToCart(productId); 
      document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();

      // making 'added' visible and then invisible after 2 seconds
      document.querySelector(`.js-added-to-cart-${productId}`).classList.add('js-added-to-cart-visible');
      
      let timeoutID;
      // timer starts for disappearing of added message
      setTimeout(() => {
          document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('js-added-to-cart-visible');
          clearTimeout(timeoutID);
        },2000);
    })
  })
  document.querySelector('.js-cart-quantity').innerHTML = updateCartQuantity();
}
