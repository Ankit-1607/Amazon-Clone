import { getDeliveryDate } from "../scripts/utils/deliveryDate.js"
import { getDeliveryOption } from "./deliveryOptions.js";

export let myCurrentOrderDetails = {};

export function myCurrentOrder(currentCart, orderPriceTotal) {
  let uniqueOrderID = crypto.randomUUID(); // generates random but unique order id
  myCurrentOrderDetails.orderID = uniqueOrderID;
  let itemNumber = 1;

  myCurrentOrderDetails.productIds = []; 
  myCurrentOrderDetails.quantity = []; 
  myCurrentOrderDetails.deliveryDates = []; 

  currentCart.forEach((itemDetail) => {
  // using computed property feature of JS to generate property ID's according to item number

    const customPropertyId = `product_${itemNumber}_id`;
    const customQuantity = `product_${itemNumber}_quantity`; 
    const customDeliveryDate = `product_${itemNumber}_deliveryDate`

    myCurrentOrderDetails.productIds.push({ [customPropertyId] : itemDetail.productId});
    myCurrentOrderDetails.quantity.push({ [customQuantity]: itemDetail.quantity });
    myCurrentOrderDetails.deliveryDates.push({ 
      [customDeliveryDate]: getDeliveryDate(getDeliveryOption(itemDetail.deliveryOptionId).deliveryDays)
    });
    itemNumber++; 
  });
  myCurrentOrderDetails.orderDate = getDeliveryDate(0); // returns the day order is placed
  myCurrentOrderDetails.orderTotal = orderPriceTotal; 
}

export function emptyMyCurrentOrderDetails() { // since variables are imported as constant
  myCurrentOrderDetails = {};
}