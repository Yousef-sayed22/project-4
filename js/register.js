let userName = document.querySelector("#username");
let password = document.querySelector("#password");
let email = document.querySelector("#email");
let registerBtn = document.querySelector(".btn");

function regest(e) {
    if (e) e.preventDefault();
    if (userName.value === "" || password.value === "" || email.value === "") {
        alert("Please fill all fields");
    } else {
        localStorage.setItem("userName", userName.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);

        userName.value = "";
        password.value = "";
        email.value = "";

        setTimeout(() => {
            window.location.href = "../htm/login.html";
        }, 1500);
    }
}

registerBtn.addEventListener("click", regest);

email.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        regest(); 
    }
});
