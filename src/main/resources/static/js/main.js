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
  day: 'TODAY', // 'TODAY', 'ALL' or an ISO date (yyyy-mm-dd) picked with the date field
};

const state = {
  events: [],
  status: 'loading', // 'loading' | 'ready' | 'error'
  favorites: loadFavorites(),
  onlyFavorites: false, // applied immediately, without pressing "Cerca"
  draft: { ...DEFAULT_FILTERS }, // what the user is choosing in the form
  applied: { ...DEFAULT_FILTERS }, // what is actually used to filter the list
};


const refs = {
  form: document.getElementById('filters-form'),	
  title: document.getElementById('results-title'),
  search: document.getElementById('search-input'),
  city: document.getElementById('city-select'),
  categoryFilters: document.getElementById('category-filters'),
  priceFilters: document.getElementById('price-filters'),
  day: document.getElementById('day-input'),
  dayFilters: document.getElementById('day-filters'),
  onlyFavorites: document.getElementById('only-favorites'),
  favoritesLabel: document.getElementById('favorites-label'),
  reset: document.getElementById('reset-filters'),
  count: document.getElementById('results-count'),
  list: document.getElementById('event-list'),
};

// "TODAY" is resolved every time, so the page stays correct even if it is left open past midnight.
function resolveDay(day, today) {
  return day === 'TODAY' ? today : day;
}

function resultsTitle(day, today) {
  if (day === 'ALL') return TEXT.resultsTitleAll;
  const date = formatLongDate(day).toLowerCase();
  return day === today ? TEXT.resultsTitleTonight(date) : TEXT.resultsTitleDay(date);
}

function currentFilters(day) {
  return {
    ...state.applied,
    day,
    onlyFavorites: state.onlyFavorites,
    favorites: state.favorites,
  };
}


function render() {
  const today = todayIso();
  const appliedDay = resolveDay(state.applied.day, today);
  refs.title.textContent = resultsTitle(appliedDay, today);

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

  const visible = sortEvents(filterEvents(state.events, currentFilters(appliedDay), today));

  // Form controls show the draft; the list below shows the applied filters.
  renderChips(
    refs.categoryFilters,
    [
      { value: 'ALL', label: TEXT.allCategories },
      ...CATEGORIES.map((category) => ({ value: category.value, label: category.pluralLabel })),
    ],
    state.draft.category,
    (value) => {
      state.draft.category = value;
      render();
    },
  );
  renderCityOptions(refs.city, listCities(state.events), state.draft.city);
  setPressed(refs.priceFilters, state.draft.price);
  setPressed(refs.dayFilters, state.draft.day);

  const favoritesCount = state.events.filter((event) => state.favorites.has(event.id)).length;
  refs.favoritesLabel.textContent = TEXT.favoritesOnly(favoritesCount);

  refs.count.textContent = TEXT.resultsCount(visible.length);

  if (visible.length === 0) {
    const isEmptyDatabase = state.events.length === 0;
    renderMessage(refs.list, {
      title: isEmptyDatabase ? TEXT.emptyDatabaseTitle : TEXT.noEventsTitle,
      text: isEmptyDatabase
        ? TEXT.emptyDatabaseText
        : appliedDay === today
          ? TEXT.noEventsTonightText
          : TEXT.noEventsText,
    });
    return;
  }

  renderEventList(refs.list, groupByDay(visible, { today, day: appliedDay }), {
    today,
    favorites: state.favorites,
    onToggleFavorite: toggleFavorite,
  });
}


function toggleFavorite(id) {
  if (state.favorites.has(id)) state.favorites.delete(id);
  else state.favorites.add(id);
  saveFavorites(state.favorites);
  render();
}

function bindControls() {
  // These controls only change the draft: nothing is filtered until "Cerca" is pressed.
  refs.search.addEventListener('input', (event) => {
    state.draft.search = event.target.value;
  });
  refs.city.addEventListener('change', (event) => {
    state.draft.city = event.target.value;
  });
  refs.priceFilters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-value]');
    if (!button) return;
    state.draft.price = button.dataset.value;
    setPressed(refs.priceFilters, state.draft.price);
  });
  
  refs.dayFilters.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-value]');
    if (!button) return;
    refs.day.value = '';
    state.draft.day = button.dataset.value;
    setPressed(refs.dayFilters, state.draft.day);
  });
  // "change" fires only when a complete, valid date is chosen or the field is cleared.
  refs.day.addEventListener('change', (event) => {
    state.draft.day = event.target.value || DEFAULT_FILTERS.day;
    setPressed(refs.dayFilters, state.draft.day);
  });

  // "Cerca" (or Enter inside the form) applies the draft.
  refs.form.addEventListener('submit', (event) => {
    event.preventDefault();
    state.applied = { ...state.draft };
    render();
  });

  // "Solo preferiti" is applied immediately.
  refs.onlyFavorites.addEventListener('change', (event) => {
    state.onlyFavorites = event.target.checked;
    render();
  });

  refs.reset.addEventListener('click', () => {
    refs.search.value = '';
    refs.day.value = '';
    refs.onlyFavorites.checked = false;
    state.onlyFavorites = false;
    state.draft = { ...DEFAULT_FILTERS };
    state.applied = { ...DEFAULT_FILTERS };
    render();
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

bindControls();
loadEvents();
