import { emptyMyCurrentOrderDetails, myCurrentOrderDetails } from "./myOrder.js";

export let previousOrders = JSON.parse(localStorage.getItem('previousOrders'));

// just adding 2 previous order to setup the page
if(!previousOrders){
  previousOrders = [
    {
      "orderID": "20b8b2f6-2cb6-46a6-9a01-c2f93f847892",
      "productIds": [
        { "product_1_id": "1c079479-8586-494f-ab53-219325432536" },
        { "product_2_id": "4e37dd03-3b23-4bc6-9ff8-44e112a92c64" },
        { "product_3_id": "d2785924-743d-49b3-8f03-ec258e640503" }
      ],  
      "shippingDetails" : [
        { "product_1_shippingId": '3'},
        { "product_2_shippingId": '1'},
        { "product_3_shippingId": '3'}
      ],
      "quantity": [
        { "product_1_quantity": 1 },
        { "product_2_quantity": 3 },
        { "product_3_quantity": 2 }
      ],
      "orderDate": "Thursday - January 23,2025",
      "orderTotal": 13350.7
    },
    {
      "orderID": "319f853c-98ba-4faa-8f61-827be6395504",
      "productIds": [
        { "product_1_id": "3ebe75dc-64d2-4137-8860-1f5a963e534b" },
        { "product_2_id": "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d" }
      ],  
      "shippingDetails" : [
        { "product_1_shippingId": '1'},
        { "product_2_shippingId": '2'}
      ],
      "quantity": [
        { "product_1_quantity": 1 },
        { "product_2_quantity": 1 },
      ],
      "orderDate": "Wednesday - January 15,2025",
      "orderTotal": 4417.6
    }
  ]; 
  savePrevOrdersToStorage();
}

export function savePrevOrdersToStorage() {
  localStorage.setItem('previousOrders', JSON.stringify(previousOrders));
}

export function getPrevOrdersFromStorage() {
  previousOrders = JSON.parse(localStorage.getItem('previousOrders'));
}

// Items add to previous orders list when user places the order
export function addToPreviousOrders() {
  getPrevOrdersFromStorage();
  // in reality user will not have anything as previously ordered
  if(!previousOrders) previousOrders = [myCurrentOrderDetails];
  else previousOrders = [myCurrentOrderDetails, ...previousOrders];
  // clearing the current order object after storing it in previous objects list
  localStorage.setItem('myCurrentOrderDetails', JSON.stringify(myCurrentOrderDetails));
  emptyMyCurrentOrderDetails();
  savePrevOrdersToStorage();
}