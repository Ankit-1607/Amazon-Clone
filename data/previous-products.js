export let previousOrders = JSON.parse(localStorage.getItem('previousProducts'));

// just adding 2 previous order to setup the page
if(!previousOrders){
  previousOrders = [
    {
      productIds: [
        { product_1_id: "1c079479-8586-494f-ab53-219325432536" },
        { product_2_id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64" },
        { product_3_id: "d2785924-743d-49b3-8f03-ec258e640503" }
      ],  
      shippingDetails : [
        { product_1_shippingId: '3'},
        { product_1_shippingId: '1'},
        { product_3_shippingId: '3'}
      ],
      quantity: {
        product_1_quantity: 1,
        product_2_quantity: 1,
        product_3_quantity: 1
      },
      orderDate: "January 23,2025",
      orderTotal: 13350.7
    },
    {
      productIds: [
        { product_1_id: "3ebe75dc-64d2-4137-8860-1f5a963e534b" },
        { product_2_id: "3ebe75dc-64d2-4137-8860-1f5a963e534b" }
      ],  
      shippingDetails : [
        { product_1_shippingId: '1'},
        { product_1_shippingId: '2'}
      ],
      quantity: {
        product_1_quantity: 1,
        product_2_quantity: 1,
      },
      orderDate: "January 15,2025",
      orderTotal: 4417.6
    }
  ]; 
}

function savePrevOrdersToStorage() {
  localStorage.setItem('previousOrders', JSON.stringify(previousOrders));
}

// Items add to previous orders list when user places the order
export function addToPreviousOrders(currentCart) {
  // previousProducts = [newOrder, ...previousProducts];
}