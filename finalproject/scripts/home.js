import { initNav } from "./nav.js";
import { getSymbols } from "./data.js";
import { cardTemplate, bindCardEvents } from "./cards.js";

initNav();

const FEATURED_IDS = ["gye-nyame", "sankofa", "dwennimmen"];
const container = document.querySelector("#featured-grid");

async function showFeatured() {
  const symbols = await getSymbols();

  if (symbols.length === 0) {
    container.innerHTML = `<p class="error">Sorry, the featured symbols could not be loaded. Please try again later.</p>`;
    return;
  }

  const featured = FEATURED_IDS
    .map((id) => symbols.find((symbol) => symbol.id === id))
    .filter(Boolean);

  container.innerHTML = featured.map(cardTemplate).join("");
  bindCardEvents(container, symbols);
}

showFeatured();
