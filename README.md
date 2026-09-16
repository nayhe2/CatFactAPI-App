# Cat Fact Generator

Prosta aplikacja pobierająca losowe ciekawostki o kotach z [catfact.ninja](https://catfact.ninja/fact), zapisująca je do pliku i wyświetlająca historię pobranych faktów.

## Stack technologiczny

**Backend**

- ASP.NET Core Web API
- Dependency Injection (`ICatFactService`, `IFactFileWriter`)
- `HttpClient` do komunikacji z zewnętrznym API
- Zapis historii do pliku tekstowego w formacie JSON Lines (`facts.txt`)
- Swagger (dostępny w trybie deweloperskim)

**Frontend**

- React + TypeScript (Vite)
- Axios do komunikacji z API
- Tailwind CSS

**Inne**

- Docker / Docker Compose

## Uruchomienie

Wymagany jest zainstalowany Docker oraz Docker Compose.

```bash
docker compose up --build -d
```

Polecenie zbuduje obrazy i uruchomi kontenery backendu oraz frontendu w tle.

Przy kolejnym uruchomieniu (gdy obrazy są już zbudowane) wystarczy:

```bash
docker compose up -d
```

Flaga `--build` jest potrzebna tylko wtedy, gdy zmienił się kod i obrazy trzeba przebudować.

Po uruchomieniu aplikacja frontendowa dostępna jest pod adresem `http://localhost:5173` (lub innym, w zależności od konfiguracji `docker-compose.yml`).

Aby zatrzymać aplikację:

```bash
docker compose down
```

Dokumentacja API (Swagger) dostępna jest pod adresem `http://localhost:5150/swagger/index.html`.

## Funkcjonalność

- Pobieranie losowego cat facta z zewnętrznego API (`GET /catfact`)
- Zapis każdego pobranego faktu do pliku `./data/facts.txt` (jedna linia = jeden fakt w formacie JSON)
- Podgląd historii wszystkich zapisanych faktów (`GET /catfact/history`)

## Konfiguracja

Adres zewnętrznego API oraz dozwolone originy CORS konfigurowane są w `appsettings.json`:

```json
{
  "CatFactApi": {
    "BaseUrl": "https://catfact.ninja/"
  },
  "Cors": {
    "AllowedOrigins": ["http://localhost:3000", "http://localhost:5173"]
  }
}
```
