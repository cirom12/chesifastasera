// Rendering: turns data into DOM. No application state is kept here.

import { CATEGORY_LABELS } from './config.js';
import { el, safeUrl } from './dom.js';
import {
  formatDateRange,
  formatLongDate,
  formatMonthShort,
  parseIsoDate,
} from './dates.js';
import { TEXT } from './messages.js';

export function renderChips(container, options, activeValue, onSelect) {
  container.replaceChildren(
    ...options.map((option) =>
      el('button', {
        class: 'chip',
        type: 'button',
        'aria-pressed': String(option.value === activeValue),
        text: option.label,
        onclick: () => onSelect(option.value),
      }),
    ),
  );
}

export function setPressed(container, activeValue) {
  for (const button of container.querySelectorAll('button[data-value]')) {
    button.setAttribute('aria-pressed', String(button.dataset.value === activeValue));
  }
}

export function renderCityOptions(select, cities, currentCity) {
  const options = [
    el('option', { value: 'ALL', text: 'Tutte le città' }),
    ...cities.map((city) => el('option', { value: city, text: city })),
  ];
  select.replaceChildren(...options);
  select.value = cities.includes(currentCity) ? currentCity : 'ALL';
}

export function renderMessage(container, { title, text, actionLabel, onAction, isError = false }) {
  container.replaceChildren(
    el('div', { class: 'message', role: isError ? 'alert' : null }, [
      el('p', { class: 'message__title', text: title }),
      text && el('p', { class: 'message__text', text }),
      actionLabel &&
        el('button', {
          class: 'button button--primary',
          type: 'button',
          text: actionLabel,
          onclick: onAction,
        }),
    ]),
  );
}

function createEventCard(event, { isFavorite, onToggleFavorite }) {
  const ticketUrl = safeUrl(event.ticketUrl);
  const priceLabel = event.free ? TEXT.free : event.ticketPrice || TEXT.paid;
  const meta = [formatDateRange(event), event.city, event.time].filter(Boolean).join(' · ');

  return el('li', {}, [
    el('article', { class: 'event-card' }, [
      el('div', { class: 'event-card__date', 'aria-hidden': 'true' }, [
        el('span', { class: 'event-card__day', text: String(parseIsoDate(event.startDate).getDate()) }),
        el('span', { class: 'event-card__month', text: formatMonthShort(event.startDate) }),
      ]),
      el('div', { class: 'event-card__body' }, [
        el('h3', { class: 'event-card__title', text: event.title }),
        el('p', { class: 'event-card__meta', text: meta }),
        el('div', { class: 'tags' }, [
          el('span', {
            class: 'tag',
            'data-category': event.category,
            text: CATEGORY_LABELS[event.category] || event.category,
          }),
          el('span', { class: `tag ${event.free ? 'tag--free' : 'tag--paid'}`, text: priceLabel }),
        ]),
        event.description && el('p', { class: 'event-card__description', text: event.description }),
        event.contacts &&
          el('p', { class: 'event-card__contacts' }, [el('strong', { text: `${TEXT.info} ` }), event.contacts]),
        ticketUrl &&
          el('a', {
            class: 'button button--primary',
            href: ticketUrl,
            target: '_blank',
            rel: 'noopener noreferrer',
            text: TEXT.tickets,
          }),
      ]),
      el('button', {
        class: 'favorite-button',
        type: 'button',
        'aria-pressed': String(isFavorite),
        'aria-label': isFavorite ? TEXT.removeFavorite(event.title) : TEXT.addFavorite(event.title),
        onclick: () => onToggleFavorite(event.id),
      }, [el('span', { 'aria-hidden': 'true', text: isFavorite ? '★' : '☆' })]),
    ]),
  ]);
}

export function renderEventList(container, groups, { today, favorites, onToggleFavorite }) {
  container.replaceChildren(
    ...groups.map((group) =>
      el('section', { class: 'day-group' }, [
        el('h3', {
          class: 'day-group__title',
          text: group.day === today ? `${TEXT.today} · ${formatLongDate(group.day)}` : formatLongDate(group.day),
        }),
        el(
          'ul',
          { class: 'event-list' },
          group.events.map((event) =>
            createEventCard(event, { isFavorite: favorites.has(event.id), onToggleFavorite }),
          ),
        ),
      ]),
    ),
  );
}
