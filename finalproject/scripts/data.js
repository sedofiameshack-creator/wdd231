// Fetches the symbol data from the local JSON file.
const DATA_URL = "data/symbols.json";

export async function getSymbols() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.symbols;
  } catch (error) {
    console.error("Could not load the symbols:", error);
    return [];
  }
}