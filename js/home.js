import { baseUrl } from "./components/baseUrl.js";
import { displayMessage } from "./utils/displayMessage.js";
import { renderFeatured } from "./utils/renderFeatured.js";
import { createLoginLink } from "./utils/dynamicMenu.js";

const homeImgUrl = baseUrl + "home-page?populate=*";

createLoginLink();

(async function () {
  try {
    const response = await fetch(homeImgUrl);
    const json = await response.json();
    const hero = json.data;
    fetchHeroImage(hero);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".hero-img");
  }
})();

(async function () {
  try {
    const response = await fetch(homeImgUrl);
    const json = await response.json();
    const banner = json.data;
    fetchBannerImage(banner);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".tea-tasting__img");
  }
})();

function fetchHeroImage(hero) {
  const heroContainer = document.querySelector(".hero-container__img");
  heroContainer.innerHTML = "";
  heroContainer.style.background = `url(${hero.attributes.cover.data.attributes.url}) no-repeat center`;
}

function fetchBannerImage(banner) {
  const bannerContainer = document.querySelector(".tea-tasting__img");
  bannerContainer.innerHTML = "";
  bannerContainer.style.background = `url(${banner.attributes.banner.data.attributes.url}) no-repeat center center`;
}

const productsUrl = baseUrl + "products?populate=*";

(async function () {
  try {
    const response = await fetch(productsUrl);
    const products = await response.json();

    renderFeatured(products);

  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".products-container");
  }
})();