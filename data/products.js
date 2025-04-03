export function getProduct(productId){
  let matchingProduct;
  products.forEach((product) => { 
    if(product.id === productId){
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl(){
    return`images/ratings/rating-${this.rating.stars*10}.png`;
  }

  getPrice() {
    return `₹${this.priceCents}`;
  }

  extraInfoHTML(){
    return '';
  }
}

const product1 = new Product({
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  image: "images/products/athletic-cotton-socks-6-pairs.jpg",
  name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090,
  keywords: [
    "socks",
    "sports",
    "apparel"
  ]
});

class Clothing extends Product{
  sizeChartLink;

  // if we don't create a constructor by default sub-class runs the parent's constructor
  constructor(productDetails) {
    super(productDetails); // calls constructor of parent class and sets other properties
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    super.extraInfoHTML();
    return `
      <a href="${this.sizeChartLink}" target="_blank">
      Size chart
      </a>
    `;
  }
} 

export let products = [];

// for cart page
export function loadProductsFetch() {
  const promise = fetch(
    '../backend/products.json' // using our own file as backend
  ).then((response) => {
    // console.log(response);
    return response.json(); // gives data attached to response,is asynchronous-is a promise
  }).then((productsData) => {
    // console.log(productsData) // gives array no need for JSON.parse()
    products = productsData.map((productDetails) => {
      if(productDetails.type === 'clothing'){
        return new Clothing(productDetails);
      } else {
        return new Product(productDetails);
      }
    });

  })/* .catch((error) => { // catches error
    console.log('unexpected error. Please try again later')
  });*/

  return promise;
}


// for home screen
export function loadProducts(fun) {
  fetch('../backend/products.json')
    .then((response) => response.json()) // fetch returns raw data in form of Readable stream as in byte sequence - for simple transmission 
    .then((data) => {
      products = data.map((productDetails) => {
        if(productDetails.type === 'clothing'){
          return new Clothing(productDetails);
        } else {
          return new Product(productDetails);
        }});
      console.log('loaded products');
      fun();
    })
    .catch((error) => {
      console.log('unexpected error. Please try again later');
    });
}