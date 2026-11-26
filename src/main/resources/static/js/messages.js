// Every text shown to the user lives here (Italian).

export const TEXT = {
  today: 'Oggi',

  loading: 'Caricamento degli eventi…',
  loadErrorTitle: 'Non riusciamo a caricare gli eventi',
  loadErrorText: 'Controlla la connessione e riprova tra qualche istante.',
  retry: 'Riprova',

  noEventsTitle: 'Nessun evento trovato',
  noEventsText: 'Prova a cambiare o ad azzerare i filtri.',
  noEventsTonightText: 'Prova a cambiare i filtri o scegli «Tutti i giorni» per vedere i prossimi eventi.',

  resultsTitleAll: 'Tutti gli eventi',
  resultsTitleTonight: (date) => `Eventi di stasera – ${date}`,
  resultsTitleDay: (date) => `Eventi di ${date}`,
  emptyDatabaseTitle: 'Nessun evento in programma',
  emptyDatabaseText: 'Torna a trovarci presto per scoprire i prossimi eventi.',

  resultsCount: (count) => (count === 1 ? '1 evento trovato' : `${count} eventi trovati`),

  allCategories: 'Tutte',
  favoritesOnly: (count) => `Solo preferiti (${count})`,

  free: 'Gratis',
  paid: 'A pagamento',
  info: 'Info:',
  tickets: 'Biglietti e info',
  addFavorite: (title) => `Aggiungi ai preferiti: ${title}`,
  removeFavorite: (title) => `Rimuovi dai preferiti: ${title}`,
};
