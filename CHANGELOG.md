# Changelog

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