export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = []; // if cart is NULL,i.e.,nothing in local storage,since JS cant perform all our actions(updation and stuff) on NULL value
}

// storing cart in local storage
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

// function to add items to cart
export function addToCart(productId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  }else{
    cart.push({
      productId:productId,
      quantity: Number(document.querySelector(`.js-quantity-selector-${productId}`).value),
      deliveryOptionId: '3'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  })

  cart = newCart;

  saveToStorage();
}

// updates delivery option in the cart
export function updateDeliveryOption(productId , deliveryOptionId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}