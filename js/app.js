const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

loadProducts();

//search product function
const searchProduct = () => {
  const searchBtn = document.getElementById('search-key');
  const searchValue = searchBtn.value;
  
   const url = `https://fakestoreapi.com/products/category/${searchValue}`;
   fetch(url)
     .then(ref => ref.json())
     .then(data => showProducts(data))
}

// show all product in UI 
const showProducts = (products) => {
  document.getElementById("all-products").textContent = "";
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
      <div class="img-card">
        <img class="product-image" src=${image}></img>
      </div>
      <h6>${product.title.length > 44 ? product.title.slice(0, 44)+"..." : product.title}</h6>
      <p>Category: ${product.category}</p>
      <span>
        <i class="fa fa-star filled"></i>
        <i class="fa fa-star filled"></i>
        <i class="fa fa-star filled"></i>
        <i class="fa fa-star empty"></i>
        <i class="fa fa-star empty"></i>
        <span class="rate">${product.rating.rate}</span>
        <span>(${product.rating.count} reviews)</span>
      </span>
      <h5>Price: $ ${product.price}</h5>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn btn-outline-primary">add to cart</button>
      <button id="details-btn" class="btn btn-outline-dark" onclick="getSingleProduct(${product.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
    </div>`;
    document.getElementById("all-products").appendChild(div);
  }
};

// get single product details
const getSingleProduct = (id) => {
  // remove previous modal result 
  document.getElementById('parent-div').textContent = '';

  fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>showSingleProduct(json));
}

const showSingleProduct = (data) => {
  const parent = document.getElementById('parent-div');
  parent.innerHTML = `
  <div class="row">
    <div class="col-lg-4 ml-2">
      <img src="${data.image}" class="img-fluid image-h" alt="">
      <div class="mt-3">
          <i class="fa fa-star filled"></i>
          <i class="fa fa-star filled"></i>
          <i class="fa fa-star filled"></i>
          <i class="fa fa-star empty"></i>
          <i class="fa fa-star empty"></i>
          <span class="rate">${data.rating.rate}</span>
        </span>
      </div>
      <span>
        <p>${data.rating.count} reviews</p>
        <h5>Price: $${data.price}</h5>
      </span>
    </div>
    <div class="col-lg-8">
      <h5>${data.title}</h5>
      <p class="text-muted"><h6 class="text-dark d-inline-block">Category: </h6> ${data.category}</p>
      <p class="text-muted"><h6 class="text-dark d-inline-block">Description: </h6> ${data.description}</p>
      <button class="btn btn-outline-dark" onclick="addToCart(${data.id},${data.price})"><i class="fa fa-shopping-cart me-1"></i> add to card</button>
    </div>
  </div>
  `;
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  document.getElementById("total-Products").innerText = count;

  updatePrice("price", price);

  updateTaxAndCharge();
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
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
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

