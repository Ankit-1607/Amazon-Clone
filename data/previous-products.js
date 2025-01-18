import { emptyMyCurrentOrderDetails, myCurrentOrderDetails } from "./myOrder.js";

export let previousOrders = JSON.parse(localStorage.getItem('previousOrders'));

// add 2 previous order to setup the page
if(!previousOrders){
  previousOrders = [
    {
      "orderID": "47b90494-7fb9-4632-ab58-a0a0bac78105",
      "productIds": [
        {"product_1_id": "54e0eccd-8f36-462b-b68a-8182611d9add"},
        {"product_2_id": "36c64692-677f-4f58-b5ec-0dc2cf109e27"},
        {"product_3_id": "77a845b1-16ed-4eac-bdf9-5b591882113d"},
        {"product_4_id": "02e3a47e-dd68-467e-9f71-8bf6f723fdae"}
      ],
      "quantity": [
        {"product_1_quantity": 1},
        {"product_2_quantity": 1},
        {"product_3_quantity": 1},
        {"product_4_quantity": 5}
      ],
      "deliveryDates": [
        {"product_1_deliveryDate": "Saturday - January 25, 2025"},
        {"product_2_deliveryDate": "Tuesday - January 21, 2025"},
        {"product_3_deliveryDate": "Saturday - January 25, 2025"},
        {"product_4_deliveryDate": "Sunday - January 19, 2025"}
      ],
      "orderDate": "Saturday - January 18, 2025",
      "orderTotal": 35409
    },
    {
      "orderID": "3861230c-ecc3-45ac-bcd7-175e16e86226",
      "productIds": [
        {"product_1_id": "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7"},
        {"product_2_id": "d339adf3-e004-4c20-a120-40e8874c66cb"},
        {"product_3_id": "82bb68d7-ebc9-476a-989c-c78a40ee5cd9"}
      ],
      "quantity": [
        {"product_1_quantity": 2},
        {"product_2_quantity": 1},
        {"product_3_quantity": 1}
      ],
      "deliveryDates": [
        {"product_1_deliveryDate":"Tuesday - January 21, 2025"},
        {"product_2_deliveryDate":"Sunday - January 19, 2025"},
        {"product_3_deliveryDate":"Saturday - January 25, 2025"}
      ],
      "orderDate": "Saturday - January 18, 2025",
      "orderTotal":9953.9
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