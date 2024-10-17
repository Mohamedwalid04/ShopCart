let boxContainer = document.querySelector(".boxs");
let Cart = document.querySelector(".cart-bar");
let cartIcon = document.querySelector(".cartIcon");
let cartXmark = document.querySelector(".xmark");
let itemsContainer = document.querySelector(".items-Cart");
let checkout = document.querySelector(".checkout");
let total = document.querySelector(".total");

let cartItems = [];

let Total = 0;

let url = window.location.href;


window.onload = () => {
    CheckValidation()
    GetData()
    getItemsFromLocalStorage()
}

// Fetch Data from the API
function GetData() {
    fetch('https://fakestoreapi.com/products?limit=10')
        .then(res => res.json())
        .then((data) => {
            if (!data) return;
            data.map((item) => CardItem(item))
        })

}



// Get the Data into the WebPage
function CardItem(item) {
    const { title,
        price,
        category,
        description,
        image } = item
    let box = document.createElement("div")
    box.classList.add("box")
    box.innerHTML = `<div class="img">
                        <img src="${image}" alt="">
                    </div>
                    `
    let details = document.createElement("div")
    details.classList.add("details")
    details.innerHTML = `
                        <div class="d-flex justify-content-between">
                            <h3>${title.split(" ").slice(0, 2).join(" ")}</h3>
                            <span class="cat">${category}</span>
                        </div>
                        <p>${description.split(" ").slice(0, 10).join(" ")}</p>

                        <span class="price">${price}$</span>
    `
    let button = document.createElement("button")
    button.innerText = "Add To Cart"
    button.onclick = () => {
        itemsContainer.innerHTML = "";
        AddItemtoLocalStorage(item)
        getItemsFromLocalStorage()
    }
    details.append(button)
    box.append(details)
    boxContainer.append(box)
}

// Open the Cart
function openCart() {
    Cart.style.cssText = `
    display: flex;
    `
    document.body.style.overflowY = "hidden"
}
// Close the Cart
function closeCart() {
    Cart.style.cssText = `
    display: none;
    `
    document.body.style.overflowY = "unset"
}

// Add the Product that selected to LocalStorage
function AddItemtoLocalStorage(item) {
    const Product = {
        title: item.title,
        image: item.image,
        price: item.price,
    }
    cartItems = [...cartItems.filter(el => el.title !== Product.title), Product]
    localStorage.setItem("products", JSON.stringify(cartItems))
}
// Add the Products that selected to the Cart
function CartItem(Product) {
    const { title, image, price } = Product;
    let Item = document.createElement("div")
    Item.classList.add("item")
    Item.innerHTML = `
                <div class="img">
                    <img src=${image} alt="">
                </div>
                <div class="details">
                    <h4>${title.split(" ").slice(0, 2).join(" ")}</h4>
                    <p>${price}$</p>
                </div>
    `
    let button = document.createElement("button");
    button.classList.add("delete")
    button.innerHTML = `<span>
    <i class="fa-solid fa-trash"></i>
    </span>`
    button.onclick = () => {
        deleteItem(title)
        itemsContainer.innerHTML = ""
        getItemsFromLocalStorage()

    }
    Item.append(button)
    itemsContainer.append(Item)
}
// Get the Products that selected from the LocalStorage
function getItemsFromLocalStorage() {
    let Products = JSON.parse(localStorage.getItem("products"));
    if (!Products) return;
    let prices = Products.map((el) => el.price)
    Total = prices.reduce((prev, cur,) => prev + cur, 0);
    Products.map((Product) => CartItem(Product))
    cartItems = [...Products]
    total.textContent = `${Total} ${Total === 0 ? "" : "$"}`
}

// Check if there's items in the cart or not
function Checkout() {
    if (cartItems.length === 0) {
        alert("Add some Products")
        return
    }
    window.location.path = `${url}/shoppingcart.html`
}

function deleteItem(title) {
    let newArray = cartItems.filter((el) => el.title !== title)
    localStorage.setItem("products", JSON.stringify(newArray))
}

function CheckValidation() {
    let user = JSON.parse(localStorage.getItem("user"))
    if (user) return;
    window.location.path = `${url}/login.html`
}



cartIcon.addEventListener("click", openCart)
cartXmark.addEventListener("click", closeCart)
checkout.addEventListener("click", Checkout)


