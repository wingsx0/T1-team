const banner = document.querySelector(".shop-banner");
const bannerList = document.querySelector(".shop-banner_list");
const bannerItems = document.querySelectorAll(".shop-banner_list img");
const bannerLength = bannerItems.length;
const bannerItemWidth = bannerItems[0].offsetWidth;
const prev = document.querySelector(".shop-banner_icon.icon-left");
const next = document.querySelector(".shop-banner_icon.icon-right");
let positionX = 0;
let index = 0;

next.addEventListener("click", function () {
  handleChangeSlide(1);
});
prev.addEventListener("click", function () {
  handleChangeSlide(-1);
});

function handleChangeSlide(direction) {
  if (direction === 1) {
    if (index == bannerLength - 1) {
      index = bannerLength - 1;
      return;
    }
    positionX -= bannerItemWidth;
    bannerList.style.transform = `translateX(${positionX}px)`;
    index++;
  } else if (direction === -1) {
    if (index == 0) {
      index = 0;
      return;
    }
    positionX += bannerItemWidth;
    bannerList.style.transform = `translateX(${positionX}px)`;
    index--;
  }
}
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },
  breakpoints: {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "@0.75": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    "@1.50": {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});
