# Changelog

## v2.5.0 – 2026-09-12

### Geändert

* **Navigation unten:** Die Ansichten-Auswahl sitzt jetzt als feste Tab-Leiste am unteren Bildschirmrand (wie im Tracker) statt als Buttons oben.
* **Header aufgeräumt:** Die drei Import-Buttons stehen jetzt in einer Zeile; der primäre Button hat keinen dauerhaft leuchtenden Rand mehr.
* **Reihenfolge der Import-Buttons:** „Tracker" ist jetzt die Standard-Auswahl (links, primär), danach „CSV/JSON" und „Beispiel".
* **Auto-Load:** Beim Öffnen werden vorhandene Tracker-Daten automatisch geladen (gleicher Browser).
* **Footer entfernt** (Hinweis „Lokale Auswertung · keine Datenübertragung" entfällt).

## v2.4.1 – 2026-09-12

### Behoben

* **Datum-Prüfung verschärft:** Importierte Datumswerte werden nur noch im Format `YYYY-MM-DD` akzeptiert. Der frühere Fallback (`new Date(str)`) konnte bei nicht eindeutigen Datumsformaten (z. B. `09/11/2026`) zu stillen Fehlinterpretationen oder Zeitzonen-Verschiebungen führen — solche Einträge werden jetzt sauber verworfen.

## v2.4.0 – 2026-09-10

### Behoben

* **Skalen-Richtung korrigiert:** Pacing, Arbeitsfähigkeit und Teilhabe wurden fälschlich als „höher = besser“ interpretiert. Gemäß der Tracker-Dokumentation gelten auch diese 0–4-Skalen als „höher = schlechter“ (mehr Einschränkung). Nur Zustand (0–10) und Bell (0–100) bedeuten „höher = besser“. Betroffen waren die Feld-Definitionen in `app.js`, die Demo-Daten sowie die Dokumentation (`DATENMODELL.md`, `ERLAEUTERUNGEN.md`, `BEDIENUNGSANLEITUNG.md`, Hilfe-Ansicht, `.clinerules`).

## v2.3.0 – 2026-09-10

### Neu

* **„Aus Tracker laden":** Die Daten des ME/CFS-Symptom-Trackers können jetzt direkt per Tipp übernommen werden (gleicher Browser, gleiche GitHub-Pages-Domain). Der CSV-/JSON-Import bleibt als Fallback erhalten.

## v2.2.0 – 2026-09-10

### Geändert

* **Startansicht:** Die App startet jetzt in der **Heatmap**-Ansicht (statt Trend).

## v2.1.0 – 2026-09-10

### Behoben

* **Update-Hinweis:** Die neue Version wird jetzt erkannt und als Hinweis „Neue Version verfügbar“ angezeigt. Nutzer:innen laden über den Button bewusst neu. Zuvor wurde der Service Worker zwar aktualisiert, der Hinweis fehlte aber, sodass der neue Stand ohne manuelles Neuladen nicht sichtbar wurde.

## v2.0.0 – 2026-09-10

### Geändert

* **Navigation neu sortiert:** Die Reiter erscheinen jetzt in der Reihenfolge **Heatmap → Crash-Risiko → Trend → Hilfe**. Der Trend bleibt weiterhin die beim Start sichtbare Ansicht.
* **Service-Worker-Version** von `v1` auf `v2` angehoben, damit Nutzer:innen den neuen Stand automatisch erhalten.

## v1.0.0 – 2026-09-10

Erste Version der eigenständigen Visualisierungs-App **ME.CFS.graph**.

### Funktionen

* **Import:** CSV (Semikolon-getrennt, UTF-8, mit BOM) und JSON per Datei-Auswahl, ausschließlich lokal im Browser.
* **Trend-Ansicht:** Zeitreihe eines wählbaren Messwerts mit persönlicher Baseline (gleitender Median) und ein-/ausblendbarer Baseline-Linie.
* **Heatmap-Ansicht:** Tage × Symptombereiche (0–4 farbcodiert) mit Tipp-Auswertung je Tag.
* **Crash-Risiko-Ansicht:** regelbasierte Ampel (stabil / beobachten / hohes Crash-Risiko) mit transparenten Begründungsfaktoren und Kennzahlen-Tabelle.
* **Hilfe-Ansicht:** Kurzinfos und Dokumentations-Links.
* **Datenverarbeitung:** leere Felder als Lücke (nicht 0), Dezimalkomma-Parsing, korrekte Skalen-Richtung.
* **PWA:** `manifest.json` + `sw.js` (Cache-First, Offline-Betrieb, Versionierung).
* **UI:** Dark Theme, Mobile-First, große Touch-Flächen, kein horizontales Scrollen, keine Animationen.