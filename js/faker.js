const endponitShop = "http://localhost:3000/faker";
const cardList = document.querySelector(".shop-cards_list");

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
async function randerItem(item) {
  const template = `<div class="shop-card">
    <div class="shop-card_img">
        <img src="${item.image}">
        <div class="shop-card_icons">
            <div class="shop-card_icon">
                <a href="#"><i class="fa-solid fa-cart-arrow-down"></i></a>
            </div>
            <div class="shop-card_icon">
                <a href="#"><i class="fa-solid fa-heart heart "></i></a>
            </div>
            <div class="shop-card_icon">
                <a href="#"><i class="fa-regular fa-circle-info"></i></a>
            </div>
        </div>
    </div>
    <h4 class="shop-card_heading">
        ${item.title}
    </h4>
    <div class="p shop-card_price">
        ${item.price}원
    </div>
  </div>`;

  cardList.insertAdjacentHTML("beforeend", template);
}
async function getShirt() {
  const response = await fetch(endponitShop);
  const data = await response.json();
  cardList.innerHTML = "";
  if (data.length > 0 && Array.isArray(data)) {
    data.forEach((item) => randerItem(item));
  }
}
getShirt();
