// Builds symbol cards and wires up their buttons.
import { isFavorite, toggleFavorite } from "./storage.js";
import { openModal } from "./modal.js";

const favoriteLabel = (saved) => (saved ? "♥ Saved" : "♡ Save");

export function cardTemplate(symbol) {
  const saved = isFavorite(symbol.id);
  return `
    <article class="card">
      <div class="badge" aria-hidden="true">${symbol.name.charAt(0)}</div>
      <p class="tag">${symbol.category}</p>
      <h3>${symbol.name}</h3>
      <p>${symbol.meaning}</p>
      <p class="proverb">&ldquo;${symbol.proverb}&rdquo;</p>
      <div class="card-actions">
        <button type="button" class="btn details-btn" data-id="${symbol.id}">View details<span class="visually-hidden"> for ${symbol.name}</span></button>
        <button type="button" class="btn btn-outline fav-btn" data-id="${symbol.id}" aria-pressed="${saved}" aria-label="Save ${symbol.name} to favorites">${favoriteLabel(saved)}</button>
      </div>
    </article>`;
}

// One click listener on the container handles every card (event delegation).
export function bindCardEvents(container, symbols, onChange) {
  container.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-id]");
    if (!button) return;

    const symbol = symbols.find((item) => item.id === button.dataset.id);
    if (!symbol) return;

    if (button.classList.contains("details-btn")) {
      openModal(symbol, onChange);
    }

    if (button.classList.contains("fav-btn")) {
      const saved = toggleFavorite(symbol.id);
      button.setAttribute("aria-pressed", String(saved));
      button.textContent = favoriteLabel(saved);
      if (onChange) onChange();
    }
  });
}
