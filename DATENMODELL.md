# Datenmodell

Technische Referenz für die Import-Formate, alle Feld-Keys, Labels, Skalen und die Berechnungsweise des Crash-Risiko-Scores.

## Import-Formate

### CSV

* **Trennzeichen:** Semikolon (`;`)
* **Kodierung:** UTF-8 (BOM wird automatisch entfernt)
* **Kopfzeile:** wird anhand der Spaltennamen zugeordnet (nicht an der Position)

### JSON

* Entweder ein Array von Tages-Objekten, oder ein Objekt mit `{ "records": [...] }` bzw. `{ "data": [...] }`.
* Jedes Tages-Objekt verwendet die Feld-Keys aus der Tabelle unten.
* `datum` ist Pflicht (Format `YYYY-MM-DD`), sonst wird der Eintrag ignoriert.

### Null-Konvention

Leere Felder werden als `null` (Lücke) interpretiert – **niemals als 0**. Dadurch erscheinen Lücken im Graphen korrekt und Mittelwerte werden nicht verfälscht.

### Dezimalzahlen

Dezimalkomma (`7,5`) wird korrekt nach `7.5` geparst.

## Feld-Referenz

`Typ` = Datentyp. `Richtung` gibt an, ob ein höherer Wert schlechter (`worse`) oder besser (`better`) ist. `neutral` hat keine Bewertungs-Richtung.

| Key | Header (CSV) | Label | Typ | Richtung |
|---|---|---|---|---|
| `datum` | Datum | Datum | date | neutral |
| `erfassungs_typ` | Erfassungs-Typ | Erfassungs-Typ | text | neutral |
| `zustand_0_10` | Zustand (0-10) | Zustand | 0_10 | better |
| `bell_0_100` | Bell (0-100) | Bell | 0_100 | better |
| `fatigue_0_4` | Fatigue (0-4) | Fatigue | 0_4 | worse |
| `pem_heute_0_4` | PEM heute (0-4) | PEM heute | 0_4 | worse |
| `liegezeit_h` | Liegezeit (h) | Liegezeit | hours | worse |
| `hilfebedarf_min` | Hilfebedarf (min) | Hilfebedarf | minutes | worse |
| `schlafqualitaet_0_4` | Schlafqualitaet (0-4) | Schlafqualität | 0_4 | worse |
| `belastung_koerperlich_0_4` | Koerperliche Belastung (0-4) | Belastung körperlich | 0_4 | worse |
| `belastung_kognitiv_0_4` | Kognitive Belastung (0-4) | Belastung kognitiv | 0_4 | worse |
| `belastung_reiz_0_4` | Reizbelastung (0-4) | Reizbelastung | 0_4 | worse |
| `pacing_0_4` | Pacing (0-4) | Pacing | 0_4 | worse |
| `arbeitsfaehigkeit_0_4` | Arbeitsfaehigkeit (0-4) | Arbeitsfähigkeit | 0_4 | worse |
| `teilhabe_0_4` | Teilhabe (0-4) | Teilhabe | 0_4 | worse |
| `schlafdauer_h` | Schlafdauer (h) | Schlafdauer | hours | neutral |
| `schritte` | Schritte | Schritte | steps | neutral |
| `kontext` | Kontext | Kontext | text | neutral |
| `notiz` | Notiz | Notiz | text | neutral |
| `pem_belastungsdatum` | Belastungsdatum | Belastungsdatum | date | neutral |
| `pem_ausloeser` | Ausloeser | Auslöser | text | neutral |
| `pem_verzoegerung_h` | Verzoegerung (h) | Verzögerung | hours | neutral |
| `pem_dauer_h` | PEM Dauer (h) | PEM Dauer | hours | neutral |
| `pem_gesamt_0_4` | PEM Gesamtschwere (0-4) | PEM Gesamtschwere | 0_4 | worse |
| `pem_erholung_0_4` | PEM Erholungsdauer (0-4) | PEM Erholungsdauer | 0_4 | worse |
| `pem_fatigue_0_4` | PEM Zunahme Fatigue (0-4) | PEM Zunahme Fatigue | 0_4 | worse |
| `pem_kognition_0_4` | PEM Zunahme Kognition (0-4) | PEM Zunahme Kognition | 0_4 | worse |
| `pem_schmerz_0_4` | PEM Zunahme Schmerzen (0-4) | PEM Zunahme Schmerzen | 0_4 | worse |
| `pem_grippe_0_4` | PEM Zunahme Krankheitsgefuehl (0-4) | PEM Zunahme Krankheitsgefühl | 0_4 | worse |
| `pem_symptome` | PEM Symptome | PEM Symptome | text | neutral |
| `schmerz_muskel` | Schmerz Muskel (0-4) | Schmerz Muskel | 0_4 | worse |
| `schmerz_gelenk` | Schmerz Gelenk (0-4) | Schmerz Gelenk | 0_4 | worse |
| `schmerz_kopf` | Schmerz Kopf (0-4) | Schmerz Kopf | 0_4 | worse |
| `schmerz_neuro` | Schmerz Neuropathisch (0-4) | Schmerz neuropathisch | 0_4 | worse |
| `schmerz_beruehrung` | Schmerz Beruehrung (0-4) | Schmerz Berührung | 0_4 | worse |
| `kognition_konzentration` | Kognition Konzentration (0-4) | Konzentration | 0_4 | worse |
| `kognition_gedaechtnis` | Kognition Gedaechtnis (0-4) | Gedächtnis | 0_4 | worse |
| `kognition_sprache` | Kognition Sprache (0-4) | Wortfindung | 0_4 | worse |
| `kognition_koordination` | Kognition Koordination (0-4) | Koordination | 0_4 | worse |
| `reiz_licht` | Reiz Licht (0-4) | Lichtempfindlichkeit | 0_4 | worse |
| `reiz_geraeusch` | Reiz Geraeusch (0-4) | Geräuschempfindlichkeit | 0_4 | worse |
| `autonom_schwindel` | Autonom Schwindel (0-4) | Schwindel | 0_4 | worse |
| `autonom_herzrasen` | Autonom Herzrasen (0-4) | Herzrasen | 0_4 | worse |
| `autonom_atem` | Autonom Atem (0-4) | Atemprobleme | 0_4 | worse |
| `autonom_verdauung` | Autonom Verdauung (0-4) | Verdauung | 0_4 | worse |
| `autonom_blase` | Autonom Blase (0-4) | Blase | 0_4 | worse |
| `autonom_temperatur` | Autonom Temperatur (0-4) | Temperaturregulation | 0_4 | worse |
| `immun_grippegefuehl` | Immun Grippegefuehl (0-4) | Grippegefühl | 0_4 | worse |
| `immun_hals` | Immun Hals (0-4) | Hals | 0_4 | worse |
| `mcas_flush` | MCAS Flush (0-4) | Flush | 0_4 | worse |
| `schlaf_durchschlaf` | Schlaf Durchschlafen (0-4) | Durchschlafen | 0_4 | worse |
| `schlaf_rhythmus` | Schlaf Rhythmus (0-4) | Schlafrhythmus | 0_4 | worse |
| `schlaf_hypersomnie` | Schlaf Hypersomnie (0-4) | Hypersomnie | 0_4 | worse |
| `kognition_verlangsamt` | Kognition Verlangsamt (0-4) | Verlangsamt | 0_4 | worse |
| `kognition_multitasking` | Kognition Multitasking (0-4) | Multitasking | 0_4 | worse |
| `kognition_desorientierung` | Kognition Desorientierung (0-4) | Desorientierung | 0_4 | worse |
| `reiz_geruch` | Reiz Geruch (0-4) | Geruch | 0_4 | worse |
| `autonom_praesynkope` | Autonom Praesynkope (0-4) | Präsynkope | 0_4 | worse |
| `autonom_synkope` | Autonom Synkope (0-4) | Synkope | 0_4 | worse |
| `autonom_stehintoleranz` | Autonom Stehintoleranz (0-4) | Stehintoleranz | 0_4 | worse |
| `neuroendokrin_hitze` | Neuroendokrin Hitze (0-4) | Hitzeintoleranz | 0_4 | worse |
| `neuroendokrin_kaelte` | Neuroendokrin Kaelte (0-4) | Kälteintoleranz | 0_4 | worse |
| `neuroendokrin_appetit` | Neuroendokrin Appetit (0-4) | Appetit | 0_4 | worse |
| `neuroendokrin_stress` | Neuroendokrin Stress (0-4) | Stressintoleranz | 0_4 | worse |
| `immun_fieber` | Immun Fieber (0-4) | Fiebergefühl | 0_4 | worse |
| `immun_allergie` | Immun Allergie (0-4) | Allergie | 0_4 | worse |
| `mcas_uebelkeit` | MCAS Uebelkeit (0-4) | Übelkeit | 0_4 | worse |
| `mcas_bauchschmerz` | MCAS Bauchschmerz (0-4) | Bauchschmerz | 0_4 | worse |
| `mcas_durchfall` | MCAS Durchfall (0-4) | Durchfall | 0_4 | worse |
| `mcas_nahrung` | MCAS Nahrung (0-4) | Nahrung | 0_4 | worse |
| `mcas_medikament` | MCAS Medikament (0-4) | Medikament | 0_4 | worse |
| `funktion_koerperpflege` | Funktion Koerperpflege (0-4) | Körperpflege | 0_4 | worse |
| `funktion_anziehen` | Funktion Anziehen (0-4) | Anziehen | 0_4 | worse |
| `funktion_essen` | Funktion Essen (0-4) | Essen | 0_4 | worse |
| `funktion_gehen` | Funktion Gehen (0-4) | Gehen | 0_4 | worse |
| `funktion_aufrecht` | Funktion Aufrecht (0-4) | Aufrecht | 0_4 | worse |
| `funktion_haushalt` | Funktion Haushalt (0-4) | Haushalt | 0_4 | worse |
| `funktion_kommunikation` | Funktion Kommunikation (0-4) | Kommunikation | 0_4 | worse |
| `funktion_ausser_haus` | Funktion Ausser Haus (0-4) | Außer Haus | 0_4 | worse |
| `funktion_sonne` | Funktion Sonne (0-4) | Sonne | 0_4 | worse |

## Symptombereiche (Domänen)

| Bereich | Enthaltene Felder |
|---|---|
| Schmerz | schmerz_muskel, schmerz_gelenk, schmerz_kopf, schmerz_neuro, schmerz_beruehrung |
| Kognition | kognition_konzentration, kognition_gedaechtnis, kognition_sprache, kognition_koordination, kognition_verlangsamt, kognition_multitasking, kognition_desorientierung |
| Reize | reiz_licht, reiz_geraeusch, reiz_geruch |
| Autonom/POTS | autonom_schwindel, autonom_herzrasen, autonom_atem, autonom_verdauung, autonom_blase, autonom_temperatur, autonom_praesynkope, autonom_synkope, autonom_stehintoleranz |
| Neuroendokrin | neuroendokrin_hitze, neuroendokrin_kaelte, neuroendokrin_appetit, neuroendokrin_stress |
| Immun | immun_grippegefuehl, immun_hals, immun_fieber, immun_allergie |
| MCAS | mcas_flush, mcas_uebelkeit, mcas_bauchschmerz, mcas_durchfall, mcas_nahrung, mcas_medikament |
| Schlaf (spez.) | schlaf_durchschlaf, schlaf_rhythmus, schlaf_hypersomnie |
| Funktion | funktion_koerperpflege, funktion_anziehen, funktion_essen, funktion_gehen, funktion_aufrecht, funktion_haushalt, funktion_kommunikation, funktion_ausser_haus, funktion_sonne |

Ein Bereichswert ist der Mittelwert aller vorhandenen Werte des Bereichs an einem Tag (fehlende Werte werden ignoriert). Gibt es keine Werte, ist der Bereich `null`.

## Berechnung des Crash-Risiko-Scores

**Zeitfenster:**
* `RECENT_WINDOW` = 3 Tage (aktuelle Phase)
* `BASELINE_WINDOW` = 14 Tage (persönliches Basisniveau, Median)

**Richtungs-Delta pro Messwert** (`metricStats`):
* Mittelwert der letzten 3 Tage vs. Median der vorangegangenen 14 Tage.
* Bei `better`-Metriken ist die Verschlechterung `baseline − recent`; bei `worse`-Metriken `recent − baseline`. Ein positiver Wert bedeutet also „schlechter".

**Fünf Faktoren, die Warnpunkte ergeben (max. 9):**

| # | Faktor | Schwelle | Punkte |
|---|---|---|---|
| 1 | Symptom-Anstieg (Mittel der Deltas von Fatigue, PEM heute, körperliche/kognitive/Reiz-Belastung, Schlafqualität) | ≥ 0,5 → 1 Punkt; ≥ 1,0 → 2 Punkte | 0–2 |
| 2 | Zustand-/Bell-Abfall | Zustand ≥ 1 oder Bell ≥ 10 → 1 Punkt; Zustand ≥ 2 oder Bell ≥ 15 → 2 Punkte | 0–2 |
| 3 | Hohe aktuelle Belastung (Mittel körperlich/kognitiv/Reize) | ≥ 2,0 → 1 Punkt; ≥ 2,5 → 2 Punkte | 0–2 |
| 4 | Aktive PEM (PEM-Gesamtschwere der letzten Tage ≥ 1 oder PEM heute ≥ 2) | PEM heute ≥ 1 → 1 Punkt; sonst → 2 Punkte | 0–2 |
| 5 | Schlaf (Qualität ≥ 3 oder Dauer < 6 h) | erfüllt → 1 Punkt | 0–1 |

**Ausgabe-Stufen:**

| Punkte | Stufe |
|---|---|
| 0–1 | stabil |
| 2–3 | beobachten |
| ≥ 4 | hohes Crash-Risiko |