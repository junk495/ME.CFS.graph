# Häufige Fragen (FAQ)

## Datensicherheit

**Werden meine Daten hochgeladen?**
Nein. Die CSV-/JSON-Datei wird ausschließlich lokal in deinem Browser gelesen. Es gibt kein Backend und keine Übermittlung an externe Server.

**Wo bleiben meine Daten?**
Sie verbleiben nur in deinem Browser-Speicher (flüchtig im Arbeitsspeicher). Die App speichert deine Gesundheitsdaten nicht dauerhaft ab und überträgt sie nirgendwohin.

**Muss ich online sein?**
Nein. Nach dem ersten Laden funktioniert die App auch offline.

## Import

**Welche Datei muss ich laden?**
Die vom ME/CFS-Symptom-Tracker exportierte **CSV-Datei** (Semikolon-getrennt). Alternativ wird auch eine JSON-Datei akzeptiert.

**Meine CSV wird nicht richtig angezeigt – woran liegt es?**
Häufige Ursachen:
* Die Datei wurde vorher in Excel gespeichert und das Trennzeichen geändert. Nutze möglichst den unveränderten Export des Trackers.
* Die Datei enthält kein gültiges Datum im Format `YYYY-MM-DD`.

**Werden leere Felder als 0 gewertet?**
Nein. Leere Felder gelten als Lücke („keine Angabe") und werden nicht als 0 gezeichnet.

## Crash-Risiko

**Ist die Risiko-Anzeige eine medizinische Diagnose?**
Nein. Sie ist eine transparente, regelbasierte Orientierungshilfe und kein Diagnose- oder Medizinprodukt.

**Wie kommt die Einschätzung zustande?**
Sie vergleicht die letzten 3 Tage mit deinem persönlichen Basisniveau (Median der letzten 14 Tage) und bewertet fünf Faktoren: Symptom-Anstieg, Zustand/Bell-Abfall, hohe Belastung, aktive PEM und Schlaf. Details stehen im <a href="./ERLAEUTERUNGEN.md" target="_blank" rel="noopener noreferrer">Regelwerk</a>.

**Warum wird bei hoher Belastung gewarnt, obwohl es mir gerade gut geht?**
Weil PEM oft **verzögert** (12–72 h) auftritt. Hohe Belastung bei bereits steigenden Symptomen ist ein frühes Warnsignal – bevor der Crash selbst messbar wird.

**Was bedeuten die drei Stufen?**
* **stabil** – keine deutlichen Warnsignale.
* **beobachten** – einzelne Warnsignale, Pacing ist wichtig.
* **hohes Crash-Risiko** – mehrere Warnsignale gleichzeitig.

## Installation & Nutzung

**Muss ich die App installieren?**
Nein. Sie läuft direkt im Browser. Optional kannst du sie über „Zum Startbildschirm hinzufügen" wie eine App installieren (PWA).

**Funktioniert die App auf dem Smartphone?**
Ja. Die Ansichten sind für die Smartphone-Nutzung im Hochformat optimiert.

**Kann ich die App über `file://` öffnen?**
Grundsätzlich ja, Diagramme und Import funktionieren auch über das lokale Dateisystem. Für den vollständigen Offline-Cache (Service Worker) ist jedoch ein Webserver (`localhost` oder GitHub Pages) nötig.