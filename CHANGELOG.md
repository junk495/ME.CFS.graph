# Changelog

## v2.8.0 – 2026-09-13

### Geändert

- **Crash-Risiko-Faktor „Aktive PEM" vereinfacht:** Es fließt nur noch der täglich erfasste Wert „PEM heute" ein. Die rückblickende „PEM-Gesamtschwere" (PEM-Crash-Tab) wird nicht mehr im Risiko-Score berücksichtigt, bleibt aber im Trend darstellbar.

## v2.7.0 – 2026-09-13

### Neu

- **Trend-Zeitraum:** Unter der Grafik lässt sich der angezeigte Zeitraum wählen (7 / 14 / 30 / 90 Tage / Alle). Die Ausgabe-Zeile zeigt den gewählten Zeitraum.
- **Crash-Marker:** Tage, an denen ein akuter Crash eingetragen wurde („Crash-Beginn jetzt eintragen"), werden im Trend mit einem kleinen ▲ markiert.
- **Große Schrift:** In der Hilfe-Ansicht lässt sich eine größere Schrift aktivieren (wird lokal gespeichert).
- **Beispieldaten:** enthalten jetzt alle Messwerte (Ruhepuls, HRV, SpO₂ …) und Crash-Marker.

## v2.6.0 – 2026-09-13

### Neu

- **Messwerte im Trend:** Neue Gruppe „Messwerte" macht alle objektiven Messwerte (Ruhepuls, Puls Ø/Maximum, HRV, SpO₂, Atemfrequenz, Körpertemperatur, Blutdruck, Gewicht, Schritte) als Zeitreihe auswählbar — inkl. passender Y-Achsen.
- **Objektiver Risiko-Faktor:** Der Crash-Risiko-Score berücksichtigt jetzt zusätzlich eine objektive Überlastung (Ruhepuls-Anstieg ≥ 5 bpm oder HRV-Abfall ≥ 25 % gegenüber der Baseline, konservativ max. +1 Warnpunkt).

### Geändert

- **Kennzahlen-Tabelle:** Ruhepuls und HRV werden jetzt mit „Baseline vs. Ø 3 Tage" angezeigt.
- **Warnpunkte:** Maximum von 9 auf 10 erhöht.

## v2.5.8 – 2026-09-13

### Geändert

* **Datenmodell kompatibel gehalten:** Neue Messwert-Felder aus dem Tracker (Ruhepuls, Puls Ø/Maximum, HRV, SpO₂, Atemfrequenz, Körpertemperatur, Blutdruck systolisch/diastolisch, Gewicht) werden jetzt beim CSV-/JSON-Import erkannt und übernommen. Keine neuen oder geänderten Ansichten.

## v2.5.7 – 2026-09-12

### Geändert

* **Crash-Risiko logischer:** Faktor-Texte formulieren Richtungen jetzt korrekt (gestiegen/gesunken/gefallen), „Aktive PEM" zeigt den tatsächlichen Gesamtschwere-Wert, und die Tabellen-Pfeile zeigen die echte Zahlenrichtung (Farbe = besser/schlechter, neutral bleibt grau).

## v2.5.6 – 2026-09-12

### Geändert

* **Trend-Auswahl einklappbar:** Die Metrik-Auswahl ist jetzt hinter „Messwert: [aktuell]" einklappbar — der Graph ist sofort sichtbar, ohne zu scrollen.
* **Gruppierung aufgeräumt:** Neue Gruppen „PEM", „Belastung & Pacing" und „Alltag" statt der alten Misch-Gruppen.

## v2.5.5 – 2026-09-12

### Geändert

* **Update-Hinweis unten:** Der „Neue Version verfügbar"-Hinweis erscheint jetzt als Toast am unteren Bildschirmrand (wie im Tracker) mit „Neu laden" und „✕"-Schließen.

## v2.5.4 – 2026-09-12

### Geändert

* **Crash-Risiko verständlicher:** Erklärtexte und Kennzahlen-Tabelle sind jetzt klarer (Werte mit Einheit, Punktzahl am Ende, korrigierte PEM-Beschriftung, Spalten „Baseline → Ø 3 Tage").

## v2.5.3 – 2026-09-12

### Geändert

* **Version sichtbar:** Die geladene Version wird jetzt unten in der Hilfe-Ansicht angezeigt.

## v2.5.2 – 2026-09-12

### Geändert

* **Code-Struktur:** Reine Hilfsfunktionen (Zahlen-/Datum-/CSV-Parsing, Median/Mittelwert) nach `core.js` ausgelagert — testbar über `tests.html` (nur Entwicklung).
* **Leerer Zustand:** Trend und Heatmap verweisen bei fehlenden Daten jetzt klarer auf die Lade-Buttons („Tracker", „CSV/JSON", „Beispiel").

## v2.5.1 – 2026-09-12

### Behoben

* **Installierbar:** PNG-Icons (192/512) ergänzt — Chrome bietet die App jetzt zur Installation an (vorher nur SVG-Icon).
* **Updates zuverlässiger:** Update-Mechanismus auf das Tracker-Muster umgestellt (`skipWaiting` + `UPDATE_READY`-Hinweis).

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