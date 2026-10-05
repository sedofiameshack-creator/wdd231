// Local storage helpers: saved favorites and the visitor's last filter choices.
const FAVORITES_KEY = "adinkra-atlas-favorites";
const FILTERS_KEY = "adinkra-atlas-filters";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`Could not read ${key} from local storage`, error);
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save ${key} to local storage`, error);
  }
}

export const getFavorites = () => read(FAVORITES_KEY, []);

export const isFavorite = (id) => getFavorites().includes(id);

// Adds or removes a favorite and returns true if the symbol is now saved.
export function toggleFavorite(id) {
  const favorites = getFavorites();
  const updated = favorites.includes(id)
    ? favorites.filter((savedId) => savedId !== id)
    : [...favorites, id];
  write(FAVORITES_KEY, updated);
  return updated.includes(id);
}

export const getFilters = () =>
  read(FILTERS_KEY, { search: "", category: "all", favoritesOnly: false });

export const saveFilters = (filters) => write(FILTERS_KEY, filters);