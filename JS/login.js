let username = document.getElementById("userName");
let email = document.getElementById("exampleInputEmail1");
let password = document.getElementById("exampleInputPassword1");
let button = document.querySelector(".btn");

function CheckValidation(e) {
    e.preventDefault()
    if (username.value === "" || email.value === "" || password.value === "") {
        alert("you can't leave any of these fields empty");
        return;
    }
    const user = {
        username: username.value,
        email: email.value,
    }
    window.localStorage.setItem("user", JSON.stringify(user))
    window.location.href = "index.html"
}

button.addEventListener("click", CheckValidation)
