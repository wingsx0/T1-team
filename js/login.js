const btnWapper = document.querySelector(".wapper-link");
const delWapper = document.querySelector(".wapper-icon.del");
const wapper = document.querySelector(".wapper");
const login = document.querySelector(".wapper-form.login");
const register = document.querySelector(".wapper-form.register");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const body = document.body;

btnWapper.addEventListener("click", function () {
  wapper.classList.add("active");
});

// del
delWapper.addEventListener("click", function () {
  wapper.classList.remove("active");
  login.classList.add("active");
  register.classList.remove("active");
});
body.addEventListener("click", function () {});

loginLink.addEventListener("click", function () {
  login.classList.remove("active");
  register.classList.add("active");
});
registerLink.addEventListener("click", function () {
  register.classList.remove("active");
  login.classList.add("active");
});

const endpointUser = "http://localhost:3000/user";
async function fetchApi() {
  const data = await (await fetch(endpointUser)).json();
  return data;
}

const username = document.querySelector(".input-username").value;
const password = document.querySelector(".input-pass").value;
const buttonLogin = document.querySelector(".form-login");

async function handleLogin() {
  const data = await fetchApi();
  // data.foreach((data) => {
  //   if (data.username === username && data.password === password) {
  //     console.log("welcome");
  //     window.location.href = "./shop.html";
  //   }
  // });
  data.forEach((element) => {
    if (element.username === username && element.password === password) {
      console.log("welcome");
      window.location.href = "./shop.html";
    }
  });
}

buttonLogin.addEventListener("submit", async function (event) {
  handleLogin();
});
