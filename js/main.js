let userInfo = document.querySelector(".user_info");
let userdata = document.querySelector("#user");
let links = document.querySelector(".links");
let logout = document.querySelector(".logout");
let shoppingCart = document.querySelector(".cart");
let cartsprod = document.querySelector(".cartsprod");
let Addtoocart = document.querySelector(".addto");
let fav = document.querySelector(".fav");
let cartProducts = document.querySelector(".cartsprod div");
let badge = document.querySelector(".badge");
let view = document.querySelector(".view");
let cart_items = document.querySelector(".cart_item");
let searchbar = document.querySelector(".searchBar");
let brandFilter = document.querySelector(".drop");
let searchBtn = document.querySelector(".searchbtn");




if (localStorage.getItem("userName")) {
    links.remove();
    userInfo.style.display = "flex";
    userdata.innerHTML = localStorage.getItem("userName");
}
logout.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear()
    window.location.href = "main.html";
});
    shoppingCart.addEventListener("click", function() {
        if (cartProducts.innerHTML !="") {
        if (cartsprod.style.display === "block") {
            cartsprod.style.display = "none";
        } else {
            cartsprod.style.display = "block";
        }
    }else {
        alert("Your cart is empty please add products to your cart");
    }
    });

let allProducts = document.querySelector(".products");
let products = [
    { id: 1, name: "Product 1", imageUrl: "../pic/sofa.jpeg" , color : "grey" , caption : "sofa" ,  quantity: 1 , price : 180 , brand : "zara"},
    { id: 2, name: "Product 2", imageUrl: "../pic/sofa2.jpeg" , color : "grey" , caption : "sofa" ,  quantity: 1 , price : 180 , brand : "dior"},
    { id: 3, name: "Product 3", imageUrl: "../pic/sofa3.jpeg", color : "white" , caption : "sofa" ,  quantity: 1 , price : 180 , brand : "zara"},
    {id: 4, name: "Product 4", imageUrl: "../pic/table.jpeg", color : "brown" , caption : "table" ,  quantity: 1 , price : 180 , brand : "zara"},
    {id: 5, name: "Product 5", imageUrl: "../pic/table2.jpeg", color : "black" , caption : "table" ,  quantity: 1 , price : 180 , brand : "luis viton"} ,
    {id: 6, name: "Product 6", imageUrl: "../pic/table2.jpeg", color : "red" , caption : "table" ,  quantity: 1 , price : 180 , brand : "dior"} ,
    {id: 7, name: "Product 7", imageUrl: "../pic/table2.jpeg", color : "blue" , caption : "chair" ,  quantity: 1 , price : 180 , brand : "zara"} ,
    {id: 8, name: "Product 8", imageUrl: "../pic/table2.jpeg", color : "red" , caption : "table" ,  quantity: 1 , price : 180 , brand : "versachi"} ,
    {id: 9, name: "Product 9", imageUrl: "../pic/table2.jpeg", color : "black" , caption : "table" ,  quantity: 1 , price : 180 , brand : "versachi"} ,
    {id: 10, name: "Product 10", imageUrl: "../pic/table2.jpeg", color : "black" , caption : "table" ,  quantity: 1 , price : 180 , brand : "zara"} ,
]
function draw() {
    let y= products.map((item)=> {
        return  `
        <div class="product_item">
                <img class="products_item_img" src="${item.imageUrl}" alt="">
                <div class="desc">
                    <h2>${item.name}</h2>
                    <p class="caption">${item.caption}</p>
                    <span class = "brand">${item.brand}</span>
                    <p>${item.price} EGP</p>
                </div>
                <div class="product_item_action">
                    <button class="addto" onClick ="adddtocart(${item.id})" >Add to cart</button>
                    <i class="fas fa-heart fav" data-id="${item.id}"></i>

                </div>
            </div> `
    })
    allProducts.innerHTML =y; 
}
draw()

let addedItem = localStorage.getItem("productsInCart") ? JSON.parse(localStorage.getItem("productsInCart")) : [];

if (addedItem){
    addedItem.map(item =>{
    cartProducts.innerHTML += `
<div class="cart_item" data-id="${item.id}" style="margin-bottom: 10px;">
<div class="cartp">
<p style="color: black;">${item.name}</p>
<button href="#" class= "pm" onClick="plus(this)">+</button>
<span class="quant">${item.quantity || 1}</span>
<button href="#" class = "pm" onClick="minus(this)">-</button>
</div>
    <div class="product_item_action">
    <button class="remove" onClick="removeItem(this)">Remove</button>
          </div>
</div>
`;
 })
    badge.style.display="block"
    badge.innerHTML=addedItem.length
    
}
document.addEventListener("DOMContentLoaded", () => {
    addedItem.forEach(item => {
        let button = document.querySelector(`button[onClick="adddtocart(${item.id})"]`);
        if (button) {
            button.style.backgroundColor = "green";
            button.style.color = "white";
            button.textContent = "Added to Cart";
        }
    });

   
    if (addedItem.length > 0) {
        badge.style.display = "block";
        badge.innerHTML = addedItem.length;
    } else {
        badge.style.display = "none";
    }
});
function adddtocart(id) {
    if (localStorage.getItem("userName")) {
       
        let addedItem = JSON.parse(localStorage.getItem("productsInCart")) || [];

        let chosenitem = products.find((item) => item.id === id);

        
        let isInCart = addedItem.some(item => item.id === id);

        if (isInCart) {
           
            addedItem = addedItem.filter(item => item.id !== id);
            localStorage.setItem("productsInCart", JSON.stringify(addedItem));

           
            let itemElement = cartProducts.querySelector(`.cart_item[data-id="${id}"]`);
            if (itemElement) itemElement.remove();

           
            let button = document.querySelector(`button[onClick="adddtocart(${id})"]`);
            if (button) {
                button.style.backgroundColor = "";
                button.style.color = "";
                button.textContent = "Add to Cart";
            }
        } else {

            addedItem.push(chosenitem);
            localStorage.setItem("productsInCart", JSON.stringify(addedItem));

            if (cartProducts) {
                 cartProducts.innerHTML += `
                <div class="cart_item" data-id="${chosenitem.id}" style="margin-bottom: 10px;">
                    <div class="cartp">
                        <p style="color: black;">${chosenitem.name}</p>
                        <button class="pm plus">+</button>
                        <span class="quant">${chosenitem.quantity}</span>
                        <button class="pm minus">-</button>
                    </div>
                    <div class="product_item_action">
                        <button class="remove">Remove</button>
                    </div>
                </div>
            `;
            }

            let button = document.querySelector(`button[onClick="adddtocart(${id})"]`);
            if (button) {
                button.style.backgroundColor = "green";
                button.style.color = "white";
                button.textContent = "Added to Cart";
            }
        }

        updateCartBadge(addedItem);

    } else {
        window.location.href = "htm/login.html";
    }
}

function removeItem(button) {
    let itemElement = button.parentElement;
    let itemId = parseInt(itemElement.getAttribute("data-id"));
    itemElement.remove();

    let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];
    let updatedCart = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem("productsInCart", JSON.stringify(updatedCart));

    updateCartBadge(updatedCart);

  
    let mainButton = document.querySelector(`button[onClick="adddtocart(${itemId})"]`);
    if (mainButton) {
        mainButton.style.backgroundColor = "";
        mainButton.style.color = "";
        mainButton.textContent = "Add to Cart";
    }
}

function updateCartBadge(cartItems) {
    if (cartItems.length > 0) {
        badge.style.display = "block";
        let totalQuantity = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);
        badge.innerHTML = totalQuantity;
    } else {
        badge.style.display = "none";
        if (cartsprod) cartsprod.style.display = "none";
    }
}


document.querySelectorAll('.fav').forEach(fav => {
    const Id = Number(fav.getAttribute("data-id"));
    const originalColor = fav.style.color;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    
    if (favorites.some(item => item.id === Id)) {
        fav.style.color = "red";
    }

    fav.addEventListener("click", function (e) {
        e.preventDefault();

        if (localStorage.getItem("userName")) {
            favorites = JSON.parse(localStorage.getItem("favorites")) || [];

            let product = products.find(item => item.id === Id);

            if (!product) return; 

            if (favorites.some(item => item.id === Id)) {
                
                favorites = favorites.filter(item => item.id !== Id);
                this.style.color = originalColor;
            } else {
              
                favorites.push(product);
                this.style.color = "red";
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));

            console.log("Updated favorites:", favorites);
        } else {
            window.location.href = "htm/login.html";
        }
    });
});
 




function performSearch() {
    const searchValue = searchbar.value.toLowerCase().trim();
    const productElements = document.querySelectorAll('.product_item');

    productElements.forEach(productEl => {
        const category = productEl.querySelector('.caption').textContent.toLowerCase();
        if (category.includes(searchValue)) {
            productEl.style.display = 'flex';
        } else {
            productEl.style.display = 'none';
        }
    });
}

searchBtn.addEventListener('click', function(e) {
    e.preventDefault(); 
    performSearch();
});


searchbar.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        performSearch();
    }
});


brandFilter.addEventListener("change", function () {
    const selectedBrand = this.value.toLowerCase();
    const productElements = document.querySelectorAll('.product_item');

    productElements.forEach(productEl => {
        const productBrand = productEl.querySelector(".brand").textContent.toLowerCase();

        if (productBrand === selectedBrand || selectedBrand === "") {
            productEl.style.display = 'flex'; 
        } else {
            productEl.style.display = 'none'; 
        }
    });
});
function plus(button) {
    let cartItem = button.closest(".cart_item");
    let quantitySpan = cartItem.querySelector(".quant");
    let currentQuantity = parseInt(quantitySpan.textContent);
    currentQuantity++;
    quantitySpan.textContent = currentQuantity;

    let productId = parseInt(cartItem.getAttribute("data-id"));
    let products = JSON.parse(localStorage.getItem("productsInCart")) || [];

    products = products.map(item => {
        if (item.id === productId) {
            item.quantity = currentQuantity;
        }
        return item;
    });

    localStorage.setItem("productsInCart", JSON.stringify(products));
    updateCartBadge(products);
}

function minus(button) {
    let cartItem = button.closest(".cart_item");
    let quantitySpan = cartItem.querySelector(".quant");
    let currentQuantity = parseInt(quantitySpan.textContent);

    let productId = parseInt(cartItem.getAttribute("data-id"));
    let products = JSON.parse(localStorage.getItem("productsInCart")) || [];

    if (currentQuantity > 1) {
        currentQuantity--;
        quantitySpan.textContent = currentQuantity;

        products = products.map(item => {
            if (item.id === productId) {
                item.quantity = currentQuantity;
            }
            return item;
        });

    } else {
        // لو الكمية هتبقى صفر → إزالة العنصر
        cartItem.remove();
        products = products.filter(item => item.id !== productId);

        // إعادة زرار Add to Cart للونه الأزرق ونصه
        let mainButton = document.querySelector(`button[onClick="adddtocart(${productId})"]`);
        if (mainButton) {
            mainButton.style.backgroundColor = "";
            mainButton.style.color = "";
            mainButton.textContent = "Add to Cart";
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(products));
    updateCartBadge(products);
}


cartProducts.addEventListener("click", function(e) {
    if (e.target.classList.contains("pm")) {
        if (e.target.textContent === "+") plus(e.target);
        else if (e.target.textContent === "-") minus(e.target);
    } else if (e.target.classList.contains("remove")) {
        removeItem(e.target);
    }
});
