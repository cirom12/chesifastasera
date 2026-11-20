// Pure functions: given events and filters they return a result, with no side effects.
// This makes them easy to reason about and to test.

import { isActiveOn, lastDay } from './dates.js';

// Lowercase and remove accents, so "citta" finds "Città".
export function normalize(text) {
  return (text || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

function searchableText(event) {
  return normalize([event.title, event.city, event.description].join(' '));
}

export function filterEvents(events, filters, today) {
  const query = normalize(filters.search.trim());

  return events.filter((event) => {
    
	// Past events are hidden, unless the user picked a specific day or asked to see them.
	if (filters.day === 'ALL' && lastDay(event) < today) return false;
    if (filters.category !== 'ALL' && event.category !== filters.category) return false;
    if (filters.price === 'FREE' && !event.free) return false;
    if (filters.price === 'PAID' && event.free) return false;
    if (filters.city !== 'ALL' && event.city !== filters.city) return false;
    if (filters.day !== 'ALL' && !isActiveOn(event, filters.day)) return false;
    if (filters.onlyFavorites && !filters.favorites.has(event.id)) return false;
    if (query && !searchableText(event).includes(query)) return false;
    return true;
  });
}

export function sortEvents(events) {
  return [...events].sort(
    (a, b) => a.startDate.localeCompare(b.startDate) || a.title.localeCompare(b.title, 'it'),
  );
}

export function listCities(events) {
  return [...new Set(events.map((event) => event.city))].sort((a, b) => a.localeCompare(b, 'it'));
}


// Groups sorted events under a day heading. An event already in progress is listed under today.
export function groupByDay(events, { today, day }) {
  const groups = new Map();
  for (const event of events) {
    let key = event.startDate;
    if (day !== 'ALL') key = day;
    else if (key < today) key = today;

    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(event);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([groupDay, groupEvents]) => ({ day: groupDay, events: groupEvents }));
}
