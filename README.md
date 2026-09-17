# ME.CFS.graph

**🌐 Zur Live-App:** <a href="https://junk495.github.io/ME.CFS.graph/" target="_blank" rel="noopener noreferrer">https://junk495.github.io/ME.CFS.graph/</a>

Eine eigenständige, rein lokale Web-Anwendung zur grafischen Auswertung der vom <a href="https://github.com/junk495/ME.CFS" target="_blank" rel="noopener noreferrer">ME/CFS-Symptom-Tracker</a> exportierten Daten (CSV oder JSON). Sie macht den Krankheitsverlauf sichtbar und bietet eine transparente, regelbasierte Orientierung zum Crash-Risiko (PEM).

## Datenquelle

Diese App erfasst selbst keine Daten. Die anzuzeigenden Werte stammen aus dem Projekt <a href="https://github.com/junk495/ME.CFS" target="_blank" rel="noopener noreferrer">https://github.com/junk495/ME.CFS</a> (ME/CFS-Symptom-Tracker) und werden aus dessen CSV-/JSON-Export importiert.

## Kernfunktionen

* **Trend:** Beliebige Messwerte als Zeitreihe über die Tage – inklusive persönlicher Baseline (gleitender Median).
* **Heatmap:** Alle Tage × Symptombereiche auf einen Blick (Farbcodierung 0–4).
* **Crash-Risiko:** Nachvollziehbare, regelbasierte Ampel (stabil / beobachten / hohes Crash-Risiko) mit Begründung.
* **Direkt aus dem Tracker:** Über „Aus Tracker laden" werden die Daten des ME/CFS-Symptom-Trackers per Tipp übernommen (gleicher Browser).
* **100 % lokal:** Die Importdatei wird ausschließlich im Browser gelesen und verarbeitet. Es gibt kein Backend und keine Datenübertragung.
* **Keine Abhängigkeiten:** Diagramme werden mit nativem Canvas gezeichnet – keine externen Bibliotheken.
* **Offline-fähig:** Nach dem ersten Aufruf funktioniert die App ohne Internetverbindung (PWA).

## Installation

Da es sich um eine statische Web-Anwendung handelt, ist keine Installation über einen App-Store nötig:

1. Den Link <a href="https://junk495.github.io/ME.CFS.graph/" target="_blank" rel="noopener noreferrer">https://junk495.github.io/ME.CFS.graph/</a> im Browser öffnen.
2. Die exportierte CSV-Datei (oder JSON) über „CSV / JSON laden" auswählen.
3. Optional im Browser-Menü **„Zum Startbildschirm hinzufügen"** wählen.

## Dokumentation

* **Bedienungsanleitung:** <a href="./BEDIENUNGSANLEITUNG.md" target="_blank" rel="noopener noreferrer">BEDIENUNGSANLEITUNG.md</a>
* **Häufige Fragen (FAQ):** <a href="./FAQ.md" target="_blank" rel="noopener noreferrer">FAQ.md</a>
* **Fachliche Grundlagen & Regelwerk:** <a href="./ERLAEUTERUNGEN.md" target="_blank" rel="noopener noreferrer">ERLAEUTERUNGEN.md</a>
* **Datenmodell:** <a href="./DATENMODELL.md" target="_blank" rel="noopener noreferrer">DATENMODELL.md</a>
* **Changelog:** <a href="./CHANGELOG.md" target="_blank" rel="noopener noreferrer">CHANGELOG.md</a>
* **Entwickler-Handbuch:** <a href="./DEV_GUIDE.md" target="_blank" rel="noopener noreferrer">DEV_GUIDE.md</a>
* **Lizenz & Haftungsausschluss:** <a href="./LICENSE.md" target="_blank" rel="noopener noreferrer">LICENSE.md</a>

## 🚧 Roadmap / Geplante Funktionen

Die Roadmap des Schwester-Projekts **ME/CFS-Symptom-Tracker** findest du <a href="https://github.com/junk495/ME.CFS#-roadmap--geplante-funktionen" target="_blank" rel="noopener noreferrer">hier</a>.

### Idee 1: Scrollbare Zeitachse (Trend & Heatmap)

**Idee:** Rückmeldung eines Users: „Ich kann die Zeitleiste nicht scrollen." Bei vielen Tagen (Wochen/Monate) werden Trend-Linie und Heatmap-Spalten heute in die feste Bildschirmbreite gequetscht und sind kaum noch lesbar oder antippbar. Die Zeitachse soll horizontal wischbar (scrollbar) werden – mit Auto-Scroll zum neuesten Tag.

**Warum sinnvoll?**
- Langzeitverläufe werden überhaupt erst lesbar (heute laufen viele Tage zu haardünnen Strichen/Spalten zusammen).
- Tage lassen sich präzise antippen (Tagesauswahl), statt auf wenige Pixel zu zielen.
- Mobile-first: horizontales Wischen ist die natürliche Geste auf dem Smartphone.

**Unterschiede in der Umsetzung (Trend vs. Heatmap):**
- **Trend:** Mindestbreite pro Tag (~30 px). Reicht die Zeitreihe über die Breite hinaus, wird das Diagramm breiter gerendert und horizontal wischbar. Die Y-Achsen-Beschriftung links muss dabei sichtbar bleiben (sticky/Overlay). Bedienänderung: Das bisherige „Drüberwischen = Tageswert anzeigen" (Scrub) wird durch das Wisch-Scrollen ersetzt – Antippen bleibt erhalten.
- **Heatmap:** Mindest-Spaltenbreite pro Tag (~14 px). Die Domänen-Labels links (Schmerz, Kognition, …) müssen beim Scrollen sichtbar bleiben (sticky HTML-Spalte). Die Tagesauswahl per Antippen bleibt erhalten und wird durch breitere Spalten sogar einfacher. Nachteil: Der „alles auf einen Blick"-Charakter geht verloren (nur noch ein Fenster sichtbar).

**Offene Punkte (zur Bewertung):**
- Tagesauswahl im Trend: reicht Antippen, oder soll das „Drüberwischen" erhalten bleiben (dann braucht es eine Alternative zum Wisch-Scrollen)?
- Mindestbreiten pro Tag und Fensterverhalten (immer die neuesten Tage sichtbar?).
- Auto-Scroll zum neuesten Tag darf die manuelle Scroll-Position nicht bei jedem Re-Render überschreiben.
- Barrierefreiheit: Fallback für Nutzer:innen, die nicht horizontal scrollen können?

## Wichtiger medizinischer Hinweis

Diese Anwendung ersetzt **keine ärztliche Diagnose oder Behandlung** und ist **kein Medizinprodukt**. Sie dient ausschließlich der Übersicht und Orientierung auf Basis selbst erfasster Daten. Weitere Details: siehe <a href="./LICENSE.md" target="_blank" rel="noopener noreferrer">LICENSE.md</a>.