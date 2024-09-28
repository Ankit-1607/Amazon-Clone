class Cart {
  cartItems = undefined;
  #localStorageKey = undefined; // private property

  constructor(localStorageKey) {
    // setup code
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage(); // this points to object we generate
  }

  #loadFromStorage() { // shorthand for method
    // using shorthand instead of loadFromStorage: function() {}
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if(!this.cartItems){
      this.cartItems = []; // if cart is NULL,i.e.,nothing in local storage,since JS cant perform all our actions(updation and stuff) on NULL value
    }
  };

  // storing cart in local storage
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
  };
  
  // function to add items to cart
  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    if(matchingItem){
      matchingItem.quantity += 1;
    }else{
      this.cartItems.push({
        productId:productId,
        quantity: 3,
        deliveryOptionId: '3'
      });
    }
    this.saveToStorage(); // accessing the function inside the same object as the function
  };

  removeFromCart(productId) {
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    })
  
    this.cartItems = newCart;
  
    this.saveToStorage();
  };

  // updates delivery option in the cart
  updateDeliveryOption(productId , deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  };
}

const cart = new Cart('cart-oops');
const buisnessCart = new Cart('cart-business-oops');


// 
cart.addToCart("3ebe75dc-64d2-4137-8860-1f5a963e534b");

console.log(cart);


// buisness purchases cart
// const buisnessCart = {
//   cartItems: undefined,

//   loadFromStorage() { // shorthand for method
//     // using shorthand instead of loadFromStorage: function() {}
//     this.cartItems = JSON.parse(localStorage.getItem('cart-buisness-oops'));
  
//     if(!this.cartItems){
//       this.cartItems = []; // if cart is NULL,i.e.,nothing in local storage,since JS cant perform all our actions(updation and stuff) on NULL value
//     }
//   },

//   // storing cart in local storage
//   saveToStorage() {
//     localStorage.setItem('cart-buisness-oops',JSON.stringify(this.cartItems));
//   },

//   // function to add items to cart
//   addToCart(productId) {
//     let matchingItem;

//     this.cartItems.forEach((cartItem) => {
//       if(productId === cartItem.productId){
//         matchingItem = cartItem;
//       }
//     });

//     if(matchingItem){
//       matchingItem.quantity += Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
//     }else{
//       this.cartItems.push({
//         productId:productId,
//         quantity: 3,
//         deliveryOptionId: '3'
//       });
//     }
//     this.saveToStorage(); // accessing the function inside the same object as the function
//   },

//   removeFromCart(productId) {
//     const newCart = [];
  
//     this.cartItems.forEach((cartItem) => {
//       if(cartItem.productId !== productId){
//         newCart.push(cartItem);
//       }
//     })
  
//     this.cartItems = newCart;
  
//     this.saveToStorage();
//   },

//   // updates delivery option in the cart
//   updateDeliveryOption(productId , deliveryOptionId) {
//     let matchingItem;

//     this.cartItems.forEach((cartItem) => {
//       if(productId === cartItem.productId){
//         matchingItem = cartItem;
//       }
//     });

//     matchingItem.deliveryOptionId = deliveryOptionId;

//     this.saveToStorage();
//   }
// };


console.log(buisnessCart);

console.log(buisnessCart instanceof Cart); // to check if buisness cart is an instance of an object named Cart