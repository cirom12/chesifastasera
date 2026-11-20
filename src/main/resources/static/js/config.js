// Application constants.

export const API_URL = '/api/events';
export const FAVORITES_STORAGE_KEY = 'chesifastasera.favorites';

// Categories as defined by the backend (enum Category).
// "label" is the singular name shown on a card, "pluralLabel" is shown on the filter chips.
export const CATEGORIES = [
  { value: 'CONCERT', label: 'Concerto', pluralLabel: 'Concerti' },
  { value: 'FESTIVAL', label: 'Sagra', pluralLabel: 'Sagre' },
  { value: 'PARTY', label: 'Festa', pluralLabel: 'Feste' },
  { value: 'CULTURE', label: 'Cultura', pluralLabel: 'Cultura' },
  { value: 'SPORT', label: 'Sport', pluralLabel: 'Sport' },
  { value: 'TRIP', label: 'Gita', pluralLabel: 'Gite' },
];

export const CATEGORY_LABELS = Object.fromEntries(
  CATEGORIES.map((category) => [category.value, category.label]),
);
