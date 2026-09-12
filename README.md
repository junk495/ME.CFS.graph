# ME.CFS.graph

**🌐 Zur Live-App:** <a href="https://junk495.github.io/ME.CFS.graph/" target="_blank" rel="noopener noreferrer">https://junk495.github.io/ME.CFS.graph/</a>

Eine eigenständige, rein lokale Web-Anwendung zur grafischen Auswertung der vom <a href="https://github.com/junk495/ME.CFS" target="_blank" rel="noopener noreferrer">ME/CFS-Symptom-Tracker</a> exportierten Daten (CSV oder JSON). Sie macht den Krankheitsverlauf sichtbar und bietet eine transparente, regelbasierte Orientierung zum Crash-Risiko (PEM).

## Datenquelle

Diese App erfasst selbst keine Daten. Die anzuzeigenden Werte stammen aus dem Projekt <a href="https://github.com/junk495/ME.CFS" target="_blank" rel="noopener noreferrer">https://github.com/junk495/ME.CFS</a> (ME/CFS-Symptom-Tracker) und werden aus dessen CSV-/JSON-Export importiert.

## Kernfunktionen

* **Trend:** Beliebige Messwerte als Zeitreihe über die Tage – inklusive persönlicher Baseline (gleitender Median).
* **Heatmap:** Alle Tage × Symptombereiche auf einen Blick (Farbcodierung 0–4).
* **Crash-Risiko:** Nachvollziehbare, regelbasierte Ampel (stabil / beobachten / hohes Crash-Risiko) mit Begründung.
* **Direkt aus dem Tracker:** Vorhandene Tracker-Daten werden beim Öffnen automatisch übernommen (gleicher Browser); zusätzlich gibt es den „Tracker"-Button.
* **100 % lokal:** Die Importdatei wird ausschließlich im Browser gelesen und verarbeitet. Es gibt kein Backend und keine Datenübertragung.
* **Keine Abhängigkeiten:** Diagramme werden mit nativem Canvas gezeichnet – keine externen Bibliotheken.
* **Offline-fähig:** Nach dem ersten Aufruf funktioniert die App ohne Internetverbindung (PWA).

## Installation

Da es sich um eine statische Web-Anwendung handelt, ist keine Installation über einen App-Store nötig:

1. Den Link <a href="https://junk495.github.io/ME.CFS.graph/" target="_blank" rel="noopener noreferrer">https://junk495.github.io/ME.CFS.graph/</a> im Browser öffnen.
2. Die exportierte CSV-Datei (oder JSON) über „CSV/JSON" auswählen.
3. Optional als App installieren:
   - **Android (Chrome):** Im Menü **„App installieren"** wählen.
   - **iOS (Safari):** Im Teilen-Menü **„Zum Home-Bildschirm"** wählen.
   - **Desktop (Chrome/Edge):** Auf das Install-Symbol in der Adressleiste klicken.

## Dokumentation

* **Bedienungsanleitung:** <a href="./BEDIENUNGSANLEITUNG.md" target="_blank" rel="noopener noreferrer">BEDIENUNGSANLEITUNG.md</a>
* **Häufige Fragen (FAQ):** <a href="./FAQ.md" target="_blank" rel="noopener noreferrer">FAQ.md</a>
* **Fachliche Grundlagen & Regelwerk:** <a href="./ERLAEUTERUNGEN.md" target="_blank" rel="noopener noreferrer">ERLAEUTERUNGEN.md</a>
* **Datenmodell:** <a href="./DATENMODELL.md" target="_blank" rel="noopener noreferrer">DATENMODELL.md</a>
* **Changelog:** <a href="./CHANGELOG.md" target="_blank" rel="noopener noreferrer">CHANGELOG.md</a>
* **Entwickler-Handbuch:** <a href="./DEV_GUIDE.md" target="_blank" rel="noopener noreferrer">DEV_GUIDE.md</a>
* **Lizenz & Haftungsausschluss:** <a href="./LICENSE.md" target="_blank" rel="noopener noreferrer">LICENSE.md</a>

## Wichtiger medizinischer Hinweis

Diese Anwendung ersetzt **keine ärztliche Diagnose oder Behandlung** und ist **kein Medizinprodukt**. Sie dient ausschließlich der Übersicht und Orientierung auf Basis selbst erfasster Daten. Weitere Details: siehe <a href="./LICENSE.md" target="_blank" rel="noopener noreferrer">LICENSE.md</a>.