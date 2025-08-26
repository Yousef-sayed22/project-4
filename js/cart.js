let sec2 = document.querySelector(".section_form2");
let plused = document.querySelector(".plused");
let quant = document.querySelector(".quant")
let totalPrice = document.querySelector(".tottalPrice")
let priceDiv = document.querySelector(".price")
let sec3 = document.querySelector(".section_form3");


let productsInCart = localStorage.getItem(("productsInCart"))
if(productsInCart){
        let item = JSON.parse(productsInCart); 
        drawcart(item);
}

function drawcart(products) {
   if (!products || products.length === 0) {
    sec2.style.display = "none"; 
    document.querySelector(".empty-message")?.remove(); 

    let emptyMsg = document.createElement("div");
    emptyMsg.className = "empty-message";
    emptyMsg.innerHTML = "<h3>Your cart is empty</h3>";
    emptyMsg.style.textAlign = "center";
    emptyMsg.style.marginTop = "20px";
    emptyMsg.style.fontSize = "20px";
    document.body.appendChild(emptyMsg); 
    return;
  } else {
    sec2.style.display = "flex";
    document.querySelector(".empty-message")?.remove(); }

  let y = products.map((item,index) => {
    return `
      <div class="product_item2" data-id=${index}>
        <img class="products_item_img" src="../pic/${item.imageUrl}" />
        <div class="desc">
          <h2>${item.name}</h2>
          <p>the best sofa ever</p>
          <span>${item.color}</span>
        </div>
        <div class="product_item_action">
          <button class="addto" onClick="removefromcart(this)">Remove</button>
          <div class="product_item_action2">
            <a href="#" class= "pm" onClick="plus(this)">+</a>
            <span class="quant">${item.quantity || 1}</span>
            <a href="#" class = "pm" onClick="minus(this)">-</a>
          </div>
        </div>
      </div>
    `;
  }).join("");

  let total = products.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  sec2.innerHTML = y + `
    <div class="total_price">
      <h3>Total price = ${total}</h3>
    </div>
        <p class="line"></p>
  `;

}

function removefromcart(button) {
  let products = JSON.parse(localStorage.getItem("productsInCart")) || [];

  const productName = button.parentElement.parentElement.querySelector("h2").textContent;
  button.parentElement.parentElement.remove();
  products = products.filter(item => item.name !== productName);
  localStorage.setItem("productsInCart", JSON.stringify(products));
  
  let cartItems = products.length;
  localStorage.setItem("cartCount", cartItems); 

  drawcart(products);
}

function plus(button) {
    let quantitySpan = button.parentElement.querySelector(".quant");
    let currentQuantity = parseInt(quantitySpan.textContent);
    currentQuantity++;
    quantitySpan.textContent = currentQuantity;

let productName = button.closest(".product_item2").querySelector("h2").textContent;
    let products = JSON.parse(localStorage.getItem("productsInCart")) || [];

    products = products.map(item => {
        if (item.name === productName) {
            item.quantity = currentQuantity;
        }
        return item;
    });

    localStorage.setItem("productsInCart", JSON.stringify(products));
    updateTotalPrice(products);
}

function minus(button) {
    let quantitySpan = button.parentElement.querySelector(".quant");
    let currentQuantity = parseInt(quantitySpan.textContent);

  let productName = button.closest(".product_item2").querySelector("h2").textContent;
    let products = JSON.parse(localStorage.getItem("productsInCart")) || [];

    if (currentQuantity > 1) {
        currentQuantity--;
        quantitySpan.textContent = currentQuantity;

        products = products.map(item => {
            if (item.name === productName) {
                item.quantity = currentQuantity;
            }
            return item;
        });

        localStorage.setItem("productsInCart", JSON.stringify(products));
    } else {
        button.parentElement.parentElement.parentElement.remove();
        products = products.filter(item => item.name !== productName);
        localStorage.setItem("productsInCart", JSON.stringify(products));
        let cartItems = products.length;
        localStorage.setItem("cartCount", cartItems);
    }
    updateTotalPrice(products);
}

function updateTotalPrice(products) {
    let total = products.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    document.querySelector(".total_price h3").textContent = `Total price = ${total}`;
}




let favproducts = localStorage.getItem(("favorites"))
if(favproducts){
        let item = JSON.parse(favproducts); 
        drawfav(item);
}

function drawfav(products) {

   if (!products || products.length === 0) {
    sec3.style.display = "none"; 
    document.querySelector(".empty-message")?.remove(); 

    let emptyMsg = document.createElement("div");
    emptyMsg.className = "empty-message";
    emptyMsg.innerHTML = "<h3>you didn't add anything to your wishlist </h3>";
    emptyMsg.style.textAlign = "center";
    emptyMsg.style.marginTop = "20px";
    emptyMsg.style.fontSize = "20px";
    document.body.appendChild(emptyMsg); 
    return;
  } else {
    sec2.style.display = "flex";
    document.querySelector(".empty-message")?.remove(); 
  }

  let s = products.map((item,index) => {
    return `
      <div class="product_item3" data-id=${index}>
        <img class="products_item_img" src="../pic/${item.imageUrl}" />
        <div class="desc">
          <h2>${item.name}</h2>
          <p>the best sofa ever</p>
          <span>${item.color}</span>
        </div>
        <div class="product_item_action3">
           <i class="fas fa-heart fav" data-id="${item.id}" style = "color : red ; cursor : pointer " onClick="removefromfav(this)"></i>
        </div>
      </div>
    `;
  }).join("");

  sec3.innerHTML = `<h2 class="favh"> favorite Products </h2>` +s
}


function removefromfav(button) {
  let products = JSON.parse(localStorage.getItem("favorites")) || [];

  const productName = button.parentElement.parentElement.querySelector("h2").textContent;
  button.parentElement.parentElement.remove();
  products = products.filter(item => item.name !== productName);
  localStorage.setItem("favorites", JSON.stringify(products));
  drawfav(products);
}