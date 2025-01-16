import { getDeliveryDate } from "../scripts/utils/deliveryDate.js"

export let myCurrentOrderDetails = {};

export function myCurrentOrder(currentCart, orderPriceTotal) {
  let uniqueOrderID = crypto.randomUUID(); // generates random but unique order id
  myCurrentOrderDetails.orderID = uniqueOrderID;
  let itemNumber = 1;

  myCurrentOrderDetails.productIds = []; 
  myCurrentOrderDetails.shippingDetails = []; 
  myCurrentOrderDetails.quantity = []; 

  currentCart.forEach((itemDetail) => {
  // using computed property feature of JS to generate property ID's according to item number

    const customPropertyId = `product_${itemNumber}_id`; 
    const customShippingId = `product_${itemNumber}_shippingId`; 
    const customQuantity = `product_${itemNumber}_quantity`; 

    myCurrentOrderDetails.productIds.push({ [customPropertyId] : itemDetail.productId});
    myCurrentOrderDetails.shippingDetails.push({ [customShippingId]: itemDetail.deliveryOptionId });
    myCurrentOrderDetails.quantity.push({ [customQuantity]: itemDetail.quantity });
    itemNumber++; 
  });
  myCurrentOrderDetails.orderDate = getDeliveryDate(0); // returns the day order is placed
  myCurrentOrderDetails.orderTotal = orderPriceTotal; 
}

export function emptyMyCurrentOrderDetails() { // since variables are imported as constant
  myCurrentOrderDetails = {};
}