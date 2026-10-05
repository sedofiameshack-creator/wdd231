// Accessible modal built on the native <dialog> element.
// showModal() traps focus, closes on Escape and returns focus to the trigger.
import { isFavorite, toggleFavorite } from "./storage.js";

const dialog = document.querySelector("#symbol-dialog");

const favoriteLabel = (saved) => (saved ? "♥ Saved" : "♡ Save to favorites");

export function openModal(symbol, onChange) {
  if (!dialog) return;

  dialog.innerHTML = `
    <div class="dialog-body">
      <button type="button" class="close-btn" aria-label="Close dialog">&times;</button>
      <p class="tag">${symbol.category}</p>
      <h2 id="dialog-title">${symbol.name}</h2>
      <dl>
        <dt>Meaning</dt>
        <dd>${symbol.meaning}</dd>
        <dt>Proverb</dt>
        <dd>${symbol.proverb}</dd>
        <dt>Where it is used</dt>
        <dd>${symbol.usage}</dd>
      </dl>
      <div class="dialog-actions">
        <button type="button" class="btn dialog-fav" aria-pressed="${isFavorite(symbol.id)}">${favoriteLabel(isFavorite(symbol.id))}</button>
        <button type="button" class="btn btn-outline dialog-close">Close</button>
      </div>
    </div>`;

  const favButton = dialog.querySelector(".dialog-fav");
  favButton.addEventListener("click", () => {
    const saved = toggleFavorite(symbol.id);
    favButton.setAttribute("aria-pressed", String(saved));
    favButton.textContent = favoriteLabel(saved);
    if (onChange) onChange();
  });

  dialog.querySelector(".close-btn").addEventListener("click", () => dialog.close());
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());

  dialog.showModal();
}

// Clicking the dark backdrop closes the dialog.
if (dialog) {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}
