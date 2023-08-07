// Element
const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li");
const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");
const allContent = document.querySelectorAll(".main-content");
const formPost = document.querySelector(".form-post");
console.log(formPost);
const endponitShop = "http://localhost:3000/faker";
const cardList = document.querySelector(".card-list");
const buttonSubmit = document.querySelector(".form-submit");
const searchBtn = document.querySelector(".search");
// console.log(cardList);
let indexDoc = 0;
let updateId = null;

allSideMenu.forEach((item, index) => {
  index == indexDoc;
  // console.log(index);
  item.addEventListener("click", (e) => {
    allSideMenu.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    allContent.forEach((content) => content.classList.remove("active"));
    allContent[index].classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

// fetch API
async function addNewShirt({ image, title, price, bestSeller }) {
  await fetch(endponitShop, {
    method: "POST",
    body: JSON.stringify({
      image,
      title,
      price,
      bestSeller,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
formPost.addEventListener("submit", async function (e) {
  e.preventDefault();
  const shirt = {
    title: this.elements["title"].value,
    image: this.elements["image"].value,
    price: +this.elements["price"].value,
    bestSeller: this.elements["bestSeller"].checked,
  };

  updateId
    ? await updateShirt({ id: updateId, ...shirt })
    : await addNewShirt(shirt);
  this.reset();
  await getShirt();
  updateId = null;
  // formSubmit.textContent = "Add Shirt";
});

async function randerItem(item) {
  const template = `<tr>
  <td class="product-img"><img src="${item.image}" alt=""></td>
  <td class="product-name">${item.title}</td>
  <td class="product-price">${item.price}원</td>
  ${item.bestSeller ? '<td class="product-best-seller">Best Seller</td>' : ""}
  <td class="product-action">
      <div class="product-actions">
          <div class="product-action_icon">
          <div class="button-edit" data-id="${item.id}">
          <i class="fa-solid fa-pen icon" ></i>
          </div>
          <div class="button-remove" data-id="${item.id}">
          <i class="fa fa-times icon" ></i> 
          </div>
          </div>
      </div>
  </td>
</tr>`;

  cardList.insertAdjacentHTML("beforeend", template);
}

async function getShirt(link = endponitShop) {
  const response = await fetch(link);
  const data = await response.json();
  cardList.innerHTML = "";
  if (data.length > 0 && Array.isArray(data)) {
    data.forEach((item) => randerItem(item));
  }
}

// update
async function updateShirt({ id, image, title, price, bestSeller, buyAmount }) {
  const data = await fetch(`${endponitShop}/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      image,
      title,
      price,
      bestSeller,
      buyAmount,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

// del
async function deleteShirt(id) {
  await fetch(`${endponitShop}/${id}`, {
    method: "DELETE",
  });
}

async function getSigleShirt(id) {
  const data = await (await fetch(`${endponitShop}/${id}`)).json();
  return data;
}

cardList.addEventListener("click", async function (e) {
  if (e.target.matches(".button-remove")) {
    const id = +e.target.dataset.id;
    await deleteShirt(id);
    await getShirt();
  } else if (e.target.matches(".button-edit")) {
    e.stopPropagation();
    const id = +e.target.dataset.id;
    const data = await getSigleShirt(id);
    formPost.elements["image"].value = data.image;
    formPost.elements["title"].value = data.title;
    formPost.elements["price"].value = data.price;
    formPost.elements["bestSeller"].checked = data.bestSeller;
    buttonSubmit.textContent = "Update Course";
    updateId = id;
  }
});

getShirt();

// debounce
function debounceFn(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

searchBtn.addEventListener(
  "keydown",
  debounceFn(function (e) {
    let path = endponitShop;
    if (e.target.value !== "") {
      path = `${endponitShop}?title_like=${this.value}`;
    }
    getShirt(path);
  }, 500)
);
