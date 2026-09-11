# Erläuterungen und fachliche Grundlagen

Dieses Dokument erklärt den fachlichen Hintergrund der Auswertung: ME/CFS, PEM, die verwendeten Skalen und das Regelwerk des Crash-Risiko-Scores. Es richtet sich an interessierte Anwender:innen und Fachpersonal.

## 1. ME/CFS

Myalgische Enzephalomyelitis / Chronisches Fatigue-Syndrom (ME/CFS) ist eine komplexe, chronische Multisystemerkrankung. Leitsymptom ist die **Post-Exertional Malaise (PEM)**: eine unverhältnismäßige und oft verzögerte Verschlechterung nach Belastung.

## 2. Post-Exertional Malaise (PEM)

* **Verzögerung:** Die Verschlechterung tritt typischerweise **12–72 Stunden** nach der Belastung auf.
* **Dauer:** Sie hält häufig Tage bis Wochen an.
* **Auslöser:** körperliche, kognitive, emotionale oder sensorische (Reiz-)Belastung – oft schon bei vergleichsweise geringer Intensität.

Für die Auswertung bedeutet das: Ein „guter" Tag mit hoher Belastung kann der Auslöser des nächsten Crashs sein. Deshalb betrachtet die Crash-Risiko-Einschätzung nicht nur die aktuellen Symptome, sondern auch die aktuelle Belastung und den Verlauf.

## 3. Symptombereiche

Die Daten gliedern sich in mehrere Bereiche, die in der Heatmap sichtbar werden:

* **Schmerz** (Muskel, Gelenk, Kopf, neuropathisch, Berührung)
* **Kognition** (Konzentration, Gedächtnis, Wortfindung, Koordination, Verlangsamung, Multitasking, Desorientierung)
* **Reize** (Licht, Geräusch, Geruch)
* **Autonom/POTS** (Schwindel, Präsynkope, Herzrasen, Atmung, Verdauung, Blase, Temperatur, Stehintoleranz)
* **Neuroendokrin** (Hitze-/Kälteintoleranz, Appetit, Stressintoleranz)
* **Immun** (Grippegefühl, Hals, Fieber, Allergie)
* **MCAS** (Flush, Übelkeit, Bauchschmerz, Durchfall, Nahrungs-/Medikamentenunverträglichkeit)
* **Schlaf** (Durchschlafen, Rhythmus, Hypersomnie)
* **Funktion** (Körperpflege bis Außer-Haus-Aktivität)

## 4. Skalen-Richtung

* **Alle Skalen 0–4** (Symptome, Belastung, Pacing, Arbeitsfähigkeit, Teilhabe): höher = schlechter/stärker.
* **Zustand (0–10) und Bell (0–100):** höher = besser.

Diese Richtung wird bei der Trend-Anzeige und der Risiko-Berechnung berücksichtigt, damit ein sinkender Zustand korrekt als Verschlechterung erkannt wird.

## 5. Regelwerk des Crash-Risiko-Scores

Die Einschätzung ist **transparent und regelbasiert** – kein maschinelles „Black Box"-Lernen. Sie vergleicht die **letzten 3 Tage** mit dem **persönlichen Basisniveau** (Median der vorangegangenen 14 Tage).

### Fünf Faktoren (Warnpunkte)

1. **Symptom-Anstieg:** Steigen Fatigue, PEM, Belastung oder Schlafqualität deutlich über das Basisniveau?
2. **Zustand-/Bell-Abfall:** Sinken Gesamtzustand oder Bell-Score?
3. **Hohe aktuelle Belastung:** Sind körperliche, kognitive oder Reiz-Belastung aktuell hoch?
4. **Aktive PEM:** Liegt PEM heute oder in den letzten Tagen vor?
5. **Schlaf:** Ist die Schlafqualität schlecht oder die Dauer sehr kurz?

Die Summe der Warnpunkte ergibt eine von drei Stufen:

| Punkte | Stufe | Bedeutung |
|---|---|---|
| 0–1 | stabil | keine deutlichen Warnsignale |
| 2–3 | beobachten | einzelne Warnsignale – Pacing besonders wichtig |
| ≥ 4 | hohes Crash-Risiko | mehrere Warnsignale gleichzeitig |

Die genauen Schwellenwerte stehen im <a href="./DATENMODELL.md" target="_blank" rel="noopener noreferrer">Datenmodell</a>.

### Warum „Belastung" ein Warnsignal ist

Da PEM verzögert auftritt, ist eine **hohe Belastung bei bereits steigenden Symptomen** ein besonders wichtiger Hinweis – oft bevor der Crash selbst messbar ist. Die Einschätzung ist deshalb bewusst vorsichtig.

## 6. Grenzen

* Die Risiko-Einschätzung ist eine **Orientierungshilfe**, keine verlässliche Vorhersage.
* Sie basiert ausschließlich auf den selbst erfassten Daten; fehlende Einträge verringern die Aussagekraft.
* Sie ist **kein Diagnose- oder Medizinprodukt** und ersetzt keine ärztliche Beratung.

## Quellen und fachliche Grundlagen

* **ÖG ME/CFS (Für Ärzt:innen und Fachpersonal):** <a href="https://mecfs.at/aerztinnen/" target="_blank" rel="noopener noreferrer">https://mecfs.at/aerztinnen/</a>
* **MedUni Wien (Diagnostik- und Ersttherapie-Algorithmus 2025):** <a href="https://public-health.meduniwien.ac.at/fileadmin/content/OE/public-health/Primary_Care_Medicine/PDFs/2025.06.13_Empfehlung__Diagnostik-_und_Ersttherapie-Algorithmus_fuer_MECFS_auf_der_Basisversorgungsebene.pdf" target="_blank" rel="noopener noreferrer">Zum PDF</a>