# Che si fa stasera?
## Un progetto di Maggio Ciro

API REST per gli eventi estivi del Gargano e dintorni (sagre, concerti, sport, cultura, feste e gite).
Progetto backend realizzato con Spring Boot, PostgreSQL e Docker.

## Tecnologie
Java 25 · Spring Boot 4.1.2 · Spring Data JPA · PostgreSQL · Maven · Docker / Docker Compose · JUnit 5 e Mockito

## Avvio con Docker
Servono Docker Desktop e Git.

```
git clone https://github.com/cirom12/chesifastasera.git
cd chesifastasera
copy .env.example .env
docker compose up --build
```
Prima di avviare, apri `.env` e scegli una password per il database.
L'API risponde su `http://localhost:8080/api/events`.

## Avvio in locale (senza Docker)
1. Installa PostgreSQL e crea il database `chesifastasera`.
2. Imposta la variabile d'ambiente `DB_PASSWORD` con la password dell'utente `postgres`.
3. Avvia l'app: `.\mvnw spring-boot:run`

## Frontend
Il sito è servito dall'applicazione stessa su `http://localhost:8080` e usa l'API. È scritto in HTML, CSS e JavaScript (moduli ES), senza librerie né build, e si trova in `src/main/resources/static`.

## Endpoint
| Metodo | URL | Descrizione |
|---|---|---|
| GET | `/api/events` | Elenco eventi (con filtri), ordinati per data di inizio |
| GET | `/api/events/{id}` | Dettaglio di un evento |
| POST | `/api/events` | Crea un evento |
| PUT | `/api/events/{id}` | Sostituisce un evento |
| DELETE | `/api/events/{id}` | Elimina un evento |

## Collezione postman
Nel file `docs/postman/che-si-fa-stasera.postman_collection.json` trovi richieste pronte per tutti gli endpoint.
In Postman: **Import** -> seleziona il file. L'indirizzo base è nella variabile `baseUrl`.
L'utente è nella variabile `adminUser`
La password va definita in un *Environment* di Postman con una variabile `adminPassword` (non è inclusa nel file esportato).

### Filtri (opzionali e combinabili)
| Parametro | Esempio | Significato |
|---|---|---|
| `category` | `FESTIVAL` | Categoria: `CONCERT`, `FESTIVAL`, `PARTY`, `CULTURE`, `SPORT`, `TRIP` |
| `city` | `Termoli` | Città (senza distinzione tra maiuscole e minuscole) |
| `free` | `true` | Solo eventi gratuiti (`false` = a pagamento) |
| `date` | `2026-06-27` | Eventi attivi in quel giorno |

Esempio: `GET /api/events?category=FESTIVAL&city=Termoli`

## Esempio di evento
```json
{
 "title": "Borgo diVino in Tour 2026",
 "startDate": "2026-06-26",
 "endDate": "2026-06-28",
 "city": "Termoli",
 "category": "FESTIVAL",
 "free": false,
 "ticketPrice": "A pagamento",
 "time": "Dalle ore 18:00",
 "description": "Tre giorni dedicati al vino di qualità.",
 "contacts": null,
 "ticketUrl": "https://www.borgodivino.it"
}
```
Obbligatori: `title`, `startDate`, `city`, `category`. `endDate` è facoltativa (vuota = evento di un solo giorno).

## Formato degli errori
```json
{
 "status": 400,
 "message": "Dati non validi",
 "details": ["Il titolo è obbligatorio"],
 "timestamp": "2026-11-17T10:30:00"
}
```

## Schema del database
Tabella `events`:
| Colonna | Tipo | Note |
|---|---|---|
| id | bigint | chiave primaria, autogenerata |
| title | varchar(255) | obbligatorio |
| start_date | date | obbligatoria |
| end_date | date | facoltativa |
| city | varchar(255) | obbligatoria |
| category | varchar(255) | obbligatoria, testo dell'enum |
| free | boolean | obbligatorio |
| ticket_price, time, ticket_url | varchar(255) | facoltativi |
| description | varchar(2000) | facoltativa |
| contacts | varchar(1000) | facoltativi |

## Test
`.\mvnw test -Dtest=EventServiceTest`
