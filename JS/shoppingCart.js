let tbody = document.querySelector("tbody");
let totalSpan = document.querySelector(".totalPrice");
let Total = 0;

window.onload = () => {
    CheckValidation()
    getProducts()
}

function CheckValidation() {
    let user = JSON.parse(localStorage.getItem("user"))
    if (user) return;
    window.location.href = "login.html"
}


function getProducts() {
    let Products = JSON.parse(localStorage.getItem("products"));
    if (!Products) return;
    Products.map((product, i) => addProduct(product, i))
    let Prices = Products.map(product => product.price)
    Total = Prices.reduce((prev, cur) => {
        return prev + cur
    }, 0);
    totalSpan.textContent = `${Total} ${Total === 0 ? "" : "$"}`
}

function addProduct(product, i) {
    const { title, image, price } = product;
    let row = document.createElement("tr");
    row.innerHTML = `
    <th scope="row">${i + 1}</th>
                    <td>
                    <img style="width: 80px;"src=${image} alt="">
                    </td>
                    <td>${title}</td>
                    <td>${price}</td>
    `
    tbody.append(row)
}

function deleteItem(title) {
    let newArray = cartItems.filter((el) => el.title !== title)
    localStorage.setItem("products", JSON.stringify(newArray))
}
