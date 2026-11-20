// Favorites are saved in the browser (localStorage) as a list of event ids.

import { FAVORITES_STORAGE_KEY } from './config.js';

export function loadFavorites() {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(ids) ? ids.filter(Number.isInteger) : []);
  } catch {
    // Storage unavailable (private mode) or corrupted data: start with no favorites.
    return new Set();
  }
}

export function saveFavorites(favorites) {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favorites]));
  } catch {
    // Not critical: favorites simply will not survive a page reload.
  }
}
