# ME.CFS.graph

**🌐 Zur Live-App:** [https://junk495.github.io/ME.CFS.graph/](https://junk495.github.io/ME.CFS.graph/)

Eine eigenständige, rein lokale Web-Anwendung zur grafischen Auswertung der vom [ME/CFS-Symptom-Tracker](https://github.com/junk495/ME.CFS) exportierten Daten (CSV oder JSON). Sie macht den Krankheitsverlauf sichtbar und bietet eine transparente, regelbasierte Orientierung zum Crash-Risiko (PEM).

## 📚 Dokumentation

Die vollständige Dokumentation liegt im **[Projekt-Wiki](https://github.com/junk495/ME.CFS/wiki)** (für Tracker und Auswertungs-App): Bedienungsanleitung, FAQ, fachliche Grundlagen, Datenmodell und Entwickler-Handbuch.

## 📄 Weitere Dateien in diesem Repository

- **[CHANGELOG.md](./CHANGELOG.md)** — Versionshistorie.
- **[LICENSE.md](./LICENSE.md)** — Lizenz (CC BY-NC-SA 4.0) und medizinischer Haftungsausschluss.

## Technische Basis

Statische Single Page Application (SPA) auf GitHub Pages: HTML5, reines CSS, Vanilla JavaScript (ES6+), PWA (`manifest.json`, `sw.js`). Diagramme mit nativem Canvas, keine Frameworks, keine externen Abhängigkeiten, 100 % lokal.

## 🚧 Roadmap / Geplante Funktionen

Die Roadmap des Schwester-Projekts **ME/CFS-Symptom-Tracker** findest du [hier](https://github.com/junk495/ME.CFS#-roadmap--geplante-funktionen).

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

Diese Anwendung ersetzt **keine ärztliche Diagnose oder Behandlung** und ist **kein Medizinprodukt**. Sie dient ausschließlich der Übersicht und Orientierung auf Basis selbst erfasster Daten. Weitere Details: siehe [LICENSE.md](./LICENSE.md).