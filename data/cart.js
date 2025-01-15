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
  // searching if product already there in cart
  cart.forEach((cartItem) => { 
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  // if product already there..increment quantity else add new item
  if(matchingItem){
    matchingItem.quantity += Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  }else{
    cart.push({
      productId:productId,
      quantity: Number(document.querySelector(`.js-quantity-selector-${productId}`).value),
      deliveryOptionId: '1' // free delivery - default delivery option
    });
  }
  saveToStorage();
}

export function removeFromCart(productId){
  const newCart = cart.filter((cartItem) => {
    return cartItem.productId !== productId;
  });

  // cart.forEach((cartItem) => {
  //   if(cartItem.productId !== productId){
  //     newCart.push(cartItem);
  //   }
  // })
  // console.log(cart);
  // console.log(newCart);
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

export function updateCartQuantity(){
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })

  console.log("Cart Updated");
  return cartQuantity;
}