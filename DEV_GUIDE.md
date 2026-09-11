# Entwickler-Handbuch (DEV_GUIDE)

Kurze technische Referenz für Wartung und Weiterentwicklung von **ME.CFS.graph**.

## Projektstruktur

| Datei | Zweck |
|---|---|
| `index.html` | SPA mit vier Ansichten (Trend, Heatmap, Crash-Risiko, Hilfe) |
| `style.css` | Reines CSS (Dark Theme, Mobile-First, keine Frameworks) |
| `app.js` | Komplette Logik (Vanilla JS, IIFE) |
| `manifest.json` | PWA-Manifest |
| `sw.js` | Service Worker (Cache-First, Versionierung, Update-Hinweis) |
| `icon.svg` | App-Icon |
| `*.md` | Dokumentation |

## Datenkonventionen

* Import: Semikolon-getrenntes CSV (UTF-8, BOM-tolerant) oder JSON.
* **null-Konvention:** leere Felder werden als `null` behandelt (nie 0), damit Lücken korrekt erscheinen.
* **Skalen-Richtung:** in `FIELD_DEFS` je Feld (`worse` / `better` / `neutral`) hinterlegt.
* Datum: `YYYY-MM-DD` (Pflichtfeld `datum`).

## Wo liegt was in `app.js`?

| Bereich | Funktionen |
|---|---|
| Konstanten | `FIELD_DEFS`, `DOMAINS`, `TREND_GROUPS`, `RECENT_WINDOW`, `BASELINE_WINDOW` |
| Parser | `parseCSVLine`, `recordsFromCSV`, `recordsFromJSON`, `normalizeRecords` |
| Import | `loadRecords`, `handleFile`, `buildDemo` |
| Navigation | `switchView` |
| Trend | `renderTrendChips`, `renderTrend`, `trendPointer`, `yRangeFor`, `makeTicks` |
| Heatmap | `renderHeatmap`, `heatmapPointer`, `colorForScale`, `domainMean` |
| Risiko | `metricStats`, `computeRisk`, `renderRisk` |
| Canvas-Helfer | `setupCanvas`, `relativeX` |

## Neues Feld hinzufügen (Checkliste)

1. In `FIELD_DEFS` einen Eintrag ergänzen: `[key, 'Header (CSV)', 'Label', typ, richtung]`.
   * `typ`: `date`, `text`, `0_4`, `0_10`, `0_100`, `hours`, `minutes`, `steps`.
   * `richtung`: `worse` (höher = schlechter), `better` (höher = besser), `neutral`.
2. Falls es in einen Bereich gehört: in `DOMAINS` bei der passenden Domäne ergänzen.
3. Optional in `TREND_GROUPS` aufnehmen, um es im Trend-Diagramm auswählbar zu machen.
4. Bei Relevanz für die Risiko-Bewertung in `WORSENING_METRICS` / `LOAD_METRICS` aufnehmen.

## Neues Feld im Risiko-Regelwerk ergänzen

1. In `computeRisk` einen neuen Faktor hinzufügen und Warnpunkte vergeben.
2. Schwellenwerte in `DATENMODELL.md` und die Beschreibung in `ERLAEUTERUNGEN.md` aktualisieren.
3. Erinnerung: Gesamtpunktzahl + Ampel-Stufen konsistent halten.

## Release-Prozess

1. Code ändern.
2. `VERSION` in `sw.js` erhöhen (z. B. `'v2'` → `'v3'`).
3. Eintrag in `CHANGELOG.md` ergänzen.
4. Pushen → GitHub Pages deployt automatisch.
5. Nutzer erhalten beim nächsten Öffnen den Hinweis „Neue Version verfügbar“. Der neue Service Worker wartet zunächst und übernimmt erst nach Tippen auf „Jetzt aktualisieren“ (dann wird neu geladen). So gehen keine bereits geladenen Daten verloren.

## Lokale Entwicklung

* Service Worker laufen nur über **HTTPS** oder `localhost` – nicht über `file://`.
* In VS Code: die Erweiterung **Live Server** verwenden.
* Diagramme und CSV-/JSON-Import funktionieren grundsätzlich auch über `file://`.

## Hinweise zur `.clinerules`

* Keine Frameworks, kein Build-Tool, kein Backend.
* Reines Vanilla JS + CSS, Diagramme mit nativem Canvas, 100 % lokal, Offline-first.