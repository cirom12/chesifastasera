// Entry point: holds the application state and connects data, filters and rendering.

import { fetchEvents } from './api.js';
import { CATEGORIES } from './config.js';
import { formatLongDate, todayIso } from './dates.js';
import { loadFavorites, saveFavorites } from './favorites.js';
import { filterEvents, groupByDay, listCities, sortEvents } from './filters.js';
import { TEXT } from './messages.js';
import {
  renderCityOptions,
  renderChips,
  renderEventList,
  renderMessage,
  setPressed,
} from './ui.js';

const DEFAULT_FILTERS = {
  search: '',
  category: 'ALL',
  price: 'ALL',
  city: 'ALL',
  day: 'ALL',
  onlyFavorites: false,
};

const state = {
  events: [],
  status: 'loading', // 'loading' | 'ready' | 'error'
  favorites: loadFavorites(),
  ...DEFAULT_FILTERS,
};

const refs = {
  todayLabel: document.getElementById('today-label'),
  search: document.getElementById('search-input'),
  city: document.getElementById('city-select'),
  categoryFilters: document.getElementById('category-filters'),
  priceFilters: document.getElementById('price-filters'),
  day: document.getElementById('day-input'),
  clearDay: document.getElementById('clear-day'),
  onlyFavorites: document.getElementById('only-favorites'),
  favoritesLabel: document.getElementById('favorites-label'),
  reset: document.getElementById('reset-filters'),
  count: document.getElementById('results-count'),
  list: document.getElementById('event-list'),
};

function currentFilters(overrides = {}) {
  return {
    search: state.search,
    category: state.category,
    price: state.price,
    city: state.city,
    day: state.day,
    onlyFavorites: state.onlyFavorites,
    favorites: state.favorites,
  };
}

function render() {
  if (state.status === 'loading') {
    refs.count.textContent = TEXT.loading;
    return;
  }
  if (state.status === 'error') {
    refs.count.textContent = '';
    renderMessage(refs.list, {
      title: TEXT.loadErrorTitle,
      text: TEXT.loadErrorText,
      actionLabel: TEXT.retry,
      onAction: loadEvents,
      isError: true,
    });
    return;
  }

  const today = todayIso();

  const visible = sortEvents(filterEvents(state.events, currentFilters(), today));

  renderChips(
    refs.categoryFilters,
    [
      { value: 'ALL', label: TEXT.allCategories },
      ...CATEGORIES.map((category) => ({ value: category.value, label: category.pluralLabel })),
    ],
    state.category,
    (value) => updateFilters({ category: value }),
  );
  
  renderCityOptions(refs.city, listCities(state.events), state.city);
  setPressed(refs.priceFilters, state.price);

  const favoritesCount = state.events.filter((event) => state.favorites.has(event.id)).length;
  refs.favoritesLabel.textContent = TEXT.favoritesOnly(favoritesCount);

  refs.count.textContent = TEXT.resultsCount(visible.length);

  if (visible.length === 0) {
    const isEmptyDatabase = state.events.length === 0;
    renderMessage(refs.list, {
      title: isEmptyDatabase ? TEXT.emptyDatabaseTitle : TEXT.noEventsTitle,
      text: isEmptyDatabase ? TEXT.emptyDatabaseText : TEXT.noEventsText,
    });
    return;
  }

  renderEventList(refs.list, groupByDay(visible, { today, day: state.day }), {
    today,
    favorites: state.favorites,
    onToggleFavorite: toggleFavorite,
  });
}

function updateFilters(changes) {
  Object.assign(state, changes);
  render();
}

function toggleFavorite(id) {
  if (state.favorites.has(id)) state.favorites.delete(id);
  else state.favorites.add(id);
  saveFavorites(state.favorites);
  render();
}

function bindControls() {
  refs.search.addEventListener('input', (event) => updateFilters({ search: event.target.value }));
  refs.city.addEventListener('change', (event) => updateFilters({ city: event.target.value }));
  refs.priceFilters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-value]');
    if (button) updateFilters({ price: button.dataset.value });
  });
  // "change" fires only when a complete, valid date is chosen or the field is cleared.
  refs.day.addEventListener('change', (event) => updateFilters({ day: event.target.value || 'ALL' }));
  refs.clearDay.addEventListener('click', () => {
    refs.day.value = '';
    updateFilters({ day: 'ALL' });
  });
  refs.onlyFavorites.addEventListener('change', (event) => updateFilters({ onlyFavorites: event.target.checked }));
  refs.reset.addEventListener('click', () => {
    refs.search.value = '';
		refs.day.value = '';
    refs.onlyFavorites.checked = false;
    updateFilters({ ...DEFAULT_FILTERS });
  });
}

async function loadEvents() {
  state.status = 'loading';
  render();
  try {
    state.events = await fetchEvents();
    state.status = 'ready';
  } catch (error) {
    console.error(error);
    state.status = 'error';
  }
  render();
}

refs.todayLabel.textContent = TEXT.todayLabel(formatLongDate(todayIso()).toLowerCase());
bindControls();
loadEvents();
