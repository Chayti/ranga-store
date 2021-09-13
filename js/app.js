const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();

// show all product in UI 
const showProducts = (products) => {

  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const productImage = product.image;

    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
    <div class="single-product">
      
    <div>
        <img class="product-image" src=${productImage}></img>
      </div>
      
      <div class="title-box">
        <h3 class="product-title">${product.title}</h3>
      </div>
      
      <p>Category: ${product.category}</p>
      
      <h2>Price: $ ${product.price}</h2>
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn" style="background-color:teal; color:azure;">Add to Cart</button>
      <button id="details-btn" class="btn btn-warning">Details</button>

    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

//add to cart
let numOfProductsAddedToCart = 0;
const addToCart = (id, price) => {

  numOfProductsAddedToCart++;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = numOfProductsAddedToCart;

  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element).toFixed(2);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = value;
  const total = +convertedOldPrice + convertPrice;
  // console.log(convertedOldPrice, convertPrice);
  document.getElementById(id).innerText = total;
};

// set innerText function
const setInnerText = (id, value) => {
  console.log(id, value);
  document.getElementById(id).innerText = parseFloat(value).toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    +getInputValue("price") + +getInputValue("delivery-charge") +
    +getInputValue("total-tax");
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2);
};
