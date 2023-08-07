const endponitShop = "http://localhost:3000/faker";
const cardList = document.querySelector(".swiper-wrapper");

async function fetchData() {
  const response = await fetch(endponitShop);
  const data = await response.json();
  return data;
}

async function arrBestSell() {
  const data = await fetchData();
  const bestSeller = [];
  data.filter((value) => {
    if (value.bestSeller == true) {
      bestSeller.push(value);
    }
  });
  return bestSeller;
}

function renderItem(item) {
  const templae = `<div class="swiper-slide">
  <div class="shop-card">
      <div class="shop-card_img">
          <img src="${item.image}" alt="">
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
          ${item.price}
      </div>
  </div>
</div>`;
  cardList.insertAdjacentHTML("beforeend", templae);
}

async function getItem() {
  const arrBestSeller = await arrBestSell();
  if (arrBestSeller.length > 0 && Array.isArray(arrBestSeller)) {
    arrBestSeller.forEach((item) => renderItem(item));
  }
  console.log();
}
getItem();
