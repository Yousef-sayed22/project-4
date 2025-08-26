let userName = document.getElementById("username");
let password = document.getElementById("password");
let loginButton = document.querySelector(".Loginbtn");

function Signin(e) {
  if (e) e.preventDefault();

  if (userName.value === "" || password.value === "") {
    alert("Please fill all fields");
  } else {
    let storedUserName = localStorage.getItem("userName");
    let storedPassword = localStorage.getItem("password");

    if (userName.value.trim() === storedUserName.trim() && password.value.trim() === storedPassword.trim()) {
      userName.value = "";
      password.value = "";
      setTimeout(() => {
        window.location.href = "../main.html";
      }, 1500);
    } else {
      alert("Invalid username or password");
    }
  }
}

loginButton.addEventListener("click", Signin);

password.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    Signin(e);
  }
});
