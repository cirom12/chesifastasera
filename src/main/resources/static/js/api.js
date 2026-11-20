// Communication with the backend.

import { API_URL } from './config.js';

export async function fetchEvents() {
  const response = await fetch(API_URL, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Richiesta fallita: HTTP ${response.status}`);
  }
  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Formato di risposta inatteso');
  }
  return data;
}
