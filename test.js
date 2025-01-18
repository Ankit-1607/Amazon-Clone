
// Array to store the statuses of all orders
let statusOfOrders = [];

const previousOrders = [
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
      "orderDate": "Saturday - January 17, 2025",
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


// checks if order is shipped & delivered
// shipped by next day and delivered on the delivery date
function checkOrderStatus(previousOrders) {
  const today = new Date();

  previousOrders.forEach((currentOrder) => {
    // Extract and parse the order date
    const orderDateStr = currentOrder.orderDate.split(" - ")[1]; // Get the part after " - "
    const orderDate = new Date(orderDateStr);
    const shippedDate = new Date(orderDate); // Clone the order date
    shippedDate.setDate(orderDate.getDate() + 1); // Add 1 day to the order date

    // Determine if the order has been shipped
    const isThisShipped = today >= shippedDate;

    // Determine delivery status, quantity, and delivery date for each product
    const deliveryStatusesProds = currentOrder.deliveryDates.map((delivery, index) => {
      const [_key, value] = Object.entries(delivery)[0]; // Extract the dynamic key-value pair
      const deliveryDateStr = value.split(" - ")[1]; // Get the part after " - "
      const deliveryDate = new Date(deliveryDateStr);

      // Get the product ID and quantity dynamically using the index
      const productKey = `product_${index + 1}_id`;
      const productID = currentOrder.productIds[index][productKey];
      const quantityKey = `product_${index + 1}_quantity`;
      const productQuantity = currentOrder.quantity[index][quantityKey];

      return {
        productID,
        productQuantity,
        deliveryDate: value, // Include the original delivery date string
        delivered: today >= deliveryDate,
      };
    });

    // Push the status of the current order to the array
    statusOfOrders.push({
      orderID: currentOrder.orderID,
      isShipped: isThisShipped,
      deliveryStatusesProds, // Contains detailed information about each product
    });
  });
}

checkOrderStatus(previousOrders);
console.log(statusOfOrders);