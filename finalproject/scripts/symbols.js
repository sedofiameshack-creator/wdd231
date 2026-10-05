import { initNav } from "./nav.js";
import { getSymbols } from "./data.js";
import { cardTemplate, bindCardEvents } from "./cards.js";
import { getFavorites, getFilters, saveFilters } from "./storage.js";

initNav();

const grid = document.querySelector("#symbol-grid");
const count = document.querySelector("#result-count");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const favoritesCheckbox = document.querySelector("#favorites-only");

const state = getFilters();
let symbols = [];

function matchingSymbols() {
  const term = state.search.trim().toLowerCase();
  const favorites = getFavorites();

  return symbols.filter((symbol) => {
    const text = `${symbol.name} ${symbol.meaning} ${symbol.proverb}`.toLowerCase();
    const matchesText = text.includes(term);
    const matchesCategory = state.category === "all" || symbol.category === state.category;
    const matchesFavorite = !state.favoritesOnly || favorites.includes(symbol.id);
    return matchesText && matchesCategory && matchesFavorite;
  });
}

function render() {
  const results = matchingSymbols();
  count.textContent = `Showing ${results.length} of ${symbols.length} symbols`;

  if (results.length === 0) {
    grid.innerHTML = state.favoritesOnly
      ? `<p class="error">You have no saved favorites that match. Use the Save button on a symbol to add one.</p>`
      : `<p class="error">No symbols match your search. Try a different word or category.</p>`;
    return;
  }

  grid.innerHTML = results.map(cardTemplate).join("");
}

function update() {
  saveFilters(state);
  render();
}

function fillCategories() {
  const categories = [...new Set(symbols.map((symbol) => symbol.category))].sort();
  categorySelect.innerHTML =
    `<option value="all">All categories</option>` +
    categories.map((category) => `<option value="${category}">${category}</option>`).join("");
}

function syncControls() {
  searchInput.value = state.search;
  categorySelect.value = state.category;
  favoritesCheckbox.checked = state.favoritesOnly;
}

async function init() {
  symbols = await getSymbols();

  if (symbols.length === 0) {
    count.textContent = "";
    grid.innerHTML = `<p class="error">Sorry, the symbols could not be loaded. Please try again later.</p>`;
    return;
  }

  // The footer "Favorites" link points to symbols.html#favorites.
  if (location.hash === "#favorites") state.favoritesOnly = true;

  fillCategories();
  if (![...categorySelect.options].some((option) => option.value === state.category)) {
    state.category = "all";
  }
  syncControls();
  render();

  searchInput.addEventListener("input", () => {
    state.search = searchInput.value;
    update();
  });

  categorySelect.addEventListener("change", () => {
    state.category = categorySelect.value;
    update();
  });

  favoritesCheckbox.addEventListener("change", () => {
    state.favoritesOnly = favoritesCheckbox.checked;
    update();
  });

  window.addEventListener("hashchange", () => {
    state.favoritesOnly = location.hash === "#favorites";
    syncControls();
    update();
  });

  bindCardEvents(grid, symbols, render);
}

init();