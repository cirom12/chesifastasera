// Date helpers. Dates travel as ISO strings (yyyy-mm-dd), exactly as the API sends them.
// They are always parsed as LOCAL dates to avoid off-by-one-day errors caused by UTC.

const LOCALE = 'it-IT';

const longDateFormat = new Intl.DateTimeFormat(LOCALE, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});
const shortMonthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'short' });
export function parseIsoDate(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function todayIso() {
  return toIsoDate(new Date());
}

// The last day of an event: endDate when present, otherwise the start date.
export function lastDay(event) {
  return event.endDate || event.startDate;
}

export function isActiveOn(event, iso) {
  return event.startDate <= iso && iso <= lastDay(event);
}


function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function shortMonth(date) {
  return shortMonthFormat.format(date).replace('.', '');
}

// "Sabato 27 giugno" (the year is added only when it is not the current one)
export function formatLongDate(iso) {
  const date = parseIsoDate(iso);
  const text = capitalize(longDateFormat.format(date));
  return date.getFullYear() === new Date().getFullYear() ? text : `${text} ${date.getFullYear()}`;
}

export function formatMonthShort(iso) {
  return shortMonth(parseIsoDate(iso));
}


// "27 giu", "26–28 giu" or "30 giu – 2 lug"
export function formatDateRange(event) {
  const start = parseIsoDate(event.startDate);
  if (!event.endDate || event.endDate === event.startDate) {
    return `${start.getDate()} ${shortMonth(start)}`;
  }
  const end = parseIsoDate(event.endDate);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  return sameMonth
    ? `${start.getDate()}–${end.getDate()} ${shortMonth(end)}`
    : `${start.getDate()} ${shortMonth(start)} – ${end.getDate()} ${shortMonth(end)}`;
}
