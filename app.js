(function () {
  'use strict';

  // Reine Hilfsfunktionen (ausgelagert nach core.js, damit sie testbar sind)
  var norm = MECFS_core.norm;
  var parseNumber = MECFS_core.parseNumber;
  var median = MECFS_core.median;
  var mean = MECFS_core.mean;
  var parseDate = MECFS_core.parseDate;
  var parseCSVLine = MECFS_core.parseCSVLine;

  // ---------------------------------------------------------------------------
  // Konstanten & Feld-Definitionen
  // ---------------------------------------------------------------------------

  // [key, CSV-Header, Label, Typ, Skalen-Richtung]
  // Richtung: 'worse' = höher ist schlechter, 'better' = höher ist besser,
  //           'neutral' = keine Bewertungs-Richtung.
  var FIELD_DEFS = [
    ['datum', 'Datum', 'Datum', 'date', 'neutral'],
    ['erfassungs_typ', 'Erfassungs-Typ', 'Erfassungs-Typ', 'text', 'neutral'],
    ['zustand_0_10', 'Zustand (0-10)', 'Zustand', '0_10', 'better'],
    ['bell_0_100', 'Bell (0-100)', 'Bell', '0_100', 'better'],
    ['fatigue_0_4', 'Fatigue (0-4)', 'Fatigue', '0_4', 'worse'],
    ['pem_heute_0_4', 'PEM heute (0-4)', 'PEM heute', '0_4', 'worse'],
    ['liegezeit_h', 'Liegezeit (h)', 'Liegezeit', 'hours', 'worse'],
    ['hilfebedarf_min', 'Hilfebedarf (min)', 'Hilfebedarf', 'minutes', 'worse'],
    ['schlafqualitaet_0_4', 'Schlafqualitaet (0-4)', 'Schlafqualität', '0_4', 'worse'],
    ['belastung_koerperlich_0_4', 'Koerperliche Belastung (0-4)', 'Belastung körperlich', '0_4', 'worse'],
    ['belastung_kognitiv_0_4', 'Kognitive Belastung (0-4)', 'Belastung kognitiv', '0_4', 'worse'],
    ['belastung_reiz_0_4', 'Reizbelastung (0-4)', 'Reizbelastung', '0_4', 'worse'],
    ['pacing_0_4', 'Pacing (0-4)', 'Pacing', '0_4', 'worse'],
    ['arbeitsfaehigkeit_0_4', 'Arbeitsfaehigkeit (0-4)', 'Arbeitsfähigkeit', '0_4', 'worse'],
    ['teilhabe_0_4', 'Teilhabe (0-4)', 'Teilhabe', '0_4', 'worse'],
    ['schlafdauer_h', 'Schlafdauer (h)', 'Schlafdauer', 'hours', 'neutral'],
    ['schritte', 'Schritte', 'Schritte', 'steps', 'neutral'],
    ['kontext', 'Kontext', 'Kontext', 'text', 'neutral'],
    ['notiz', 'Notiz', 'Notiz', 'text', 'neutral'],
    ['pem_belastungsdatum', 'Belastungsdatum', 'Belastungsdatum', 'date', 'neutral'],
    ['pem_ausloeser', 'Ausloeser', 'Auslöser', 'text', 'neutral'],
    ['pem_verzoegerung_h', 'Verzoegerung (h)', 'Verzögerung', 'hours', 'neutral'],
    ['pem_dauer_h', 'PEM Dauer (h)', 'PEM Dauer', 'hours', 'neutral'],
    ['pem_gesamt_0_4', 'PEM Gesamtschwere (0-4)', 'PEM Gesamtschwere', '0_4', 'worse'],
    ['pem_erholung_0_4', 'PEM Erholungsdauer (0-4)', 'PEM Erholungsdauer', '0_4', 'worse'],
    ['pem_fatigue_0_4', 'PEM Zunahme Fatigue (0-4)', 'PEM Zunahme Fatigue', '0_4', 'worse'],
    ['pem_kognition_0_4', 'PEM Zunahme Kognition (0-4)', 'PEM Zunahme Kognition', '0_4', 'worse'],
    ['pem_schmerz_0_4', 'PEM Zunahme Schmerzen (0-4)', 'PEM Zunahme Schmerzen', '0_4', 'worse'],
    ['pem_grippe_0_4', 'PEM Zunahme Krankheitsgefuehl (0-4)', 'PEM Zunahme Krankheitsgefühl', '0_4', 'worse'],
    ['pem_symptome', 'PEM Symptome', 'PEM Symptome', 'text', 'neutral'],
    ['schmerz_muskel', 'Schmerz Muskel (0-4)', 'Schmerz Muskel', '0_4', 'worse'],
    ['schmerz_gelenk', 'Schmerz Gelenk (0-4)', 'Schmerz Gelenk', '0_4', 'worse'],
    ['schmerz_kopf', 'Schmerz Kopf (0-4)', 'Schmerz Kopf', '0_4', 'worse'],
    ['schmerz_neuro', 'Schmerz Neuropathisch (0-4)', 'Schmerz neuropathisch', '0_4', 'worse'],
    ['schmerz_beruehrung', 'Schmerz Beruehrung (0-4)', 'Schmerz Berührung', '0_4', 'worse'],
    ['kognition_konzentration', 'Kognition Konzentration (0-4)', 'Konzentration', '0_4', 'worse'],
    ['kognition_gedaechtnis', 'Kognition Gedaechtnis (0-4)', 'Gedächtnis', '0_4', 'worse'],
    ['kognition_sprache', 'Kognition Sprache (0-4)', 'Wortfindung', '0_4', 'worse'],
    ['kognition_koordination', 'Kognition Koordination (0-4)', 'Koordination', '0_4', 'worse'],
    ['reiz_licht', 'Reiz Licht (0-4)', 'Lichtempfindlichkeit', '0_4', 'worse'],
    ['reiz_geraeusch', 'Reiz Geraeusch (0-4)', 'Geräuschempfindlichkeit', '0_4', 'worse'],
    ['autonom_schwindel', 'Autonom Schwindel (0-4)', 'Schwindel', '0_4', 'worse'],
    ['autonom_herzrasen', 'Autonom Herzrasen (0-4)', 'Herzrasen', '0_4', 'worse'],
    ['autonom_atem', 'Autonom Atem (0-4)', 'Atemprobleme', '0_4', 'worse'],
    ['autonom_verdauung', 'Autonom Verdauung (0-4)', 'Verdauung', '0_4', 'worse'],
    ['autonom_blase', 'Autonom Blase (0-4)', 'Blase', '0_4', 'worse'],
    ['autonom_temperatur', 'Autonom Temperatur (0-4)', 'Temperaturregulation', '0_4', 'worse'],
    ['immun_grippegefuehl', 'Immun Grippegefuehl (0-4)', 'Grippegefühl', '0_4', 'worse'],
    ['immun_hals', 'Immun Hals (0-4)', 'Hals', '0_4', 'worse'],
    ['mcas_flush', 'MCAS Flush (0-4)', 'Flush', '0_4', 'worse'],
    ['schlaf_durchschlaf', 'Schlaf Durchschlafen (0-4)', 'Durchschlafen', '0_4', 'worse'],
    ['schlaf_rhythmus', 'Schlaf Rhythmus (0-4)', 'Schlafrhythmus', '0_4', 'worse'],
    ['schlaf_hypersomnie', 'Schlaf Hypersomnie (0-4)', 'Hypersomnie', '0_4', 'worse'],
    ['kognition_verlangsamt', 'Kognition Verlangsamt (0-4)', 'Verlangsamt', '0_4', 'worse'],
    ['kognition_multitasking', 'Kognition Multitasking (0-4)', 'Multitasking', '0_4', 'worse'],
    ['kognition_desorientierung', 'Kognition Desorientierung (0-4)', 'Desorientierung', '0_4', 'worse'],
    ['reiz_geruch', 'Reiz Geruch (0-4)', 'Geruch', '0_4', 'worse'],
    ['autonom_praesynkope', 'Autonom Praesynkope (0-4)', 'Präsynkope', '0_4', 'worse'],
    ['autonom_synkope', 'Autonom Synkope (0-4)', 'Synkope', '0_4', 'worse'],
    ['autonom_stehintoleranz', 'Autonom Stehintoleranz (0-4)', 'Stehintoleranz', '0_4', 'worse'],
    ['neuroendokrin_hitze', 'Neuroendokrin Hitze (0-4)', 'Hitzeintoleranz', '0_4', 'worse'],
    ['neuroendokrin_kaelte', 'Neuroendokrin Kaelte (0-4)', 'Kälteintoleranz', '0_4', 'worse'],
    ['neuroendokrin_appetit', 'Neuroendokrin Appetit (0-4)', 'Appetit', '0_4', 'worse'],
    ['neuroendokrin_stress', 'Neuroendokrin Stress (0-4)', 'Stressintoleranz', '0_4', 'worse'],
    ['immun_fieber', 'Immun Fieber (0-4)', 'Fiebergefühl', '0_4', 'worse'],
    ['immun_allergie', 'Immun Allergie (0-4)', 'Allergie', '0_4', 'worse'],
    ['mcas_uebelkeit', 'MCAS Uebelkeit (0-4)', 'Übelkeit', '0_4', 'worse'],
    ['mcas_bauchschmerz', 'MCAS Bauchschmerz (0-4)', 'Bauchschmerz', '0_4', 'worse'],
    ['mcas_durchfall', 'MCAS Durchfall (0-4)', 'Durchfall', '0_4', 'worse'],
    ['mcas_nahrung', 'MCAS Nahrung (0-4)', 'Nahrung', '0_4', 'worse'],
    ['mcas_medikament', 'MCAS Medikament (0-4)', 'Medikament', '0_4', 'worse'],
    ['funktion_koerperpflege', 'Funktion Koerperpflege (0-4)', 'Körperpflege', '0_4', 'worse'],
    ['funktion_anziehen', 'Funktion Anziehen (0-4)', 'Anziehen', '0_4', 'worse'],
    ['funktion_essen', 'Funktion Essen (0-4)', 'Essen', '0_4', 'worse'],
    ['funktion_gehen', 'Funktion Gehen (0-4)', 'Gehen', '0_4', 'worse'],
    ['funktion_aufrecht', 'Funktion Aufrecht (0-4)', 'Aufrecht', '0_4', 'worse'],
    ['funktion_haushalt', 'Funktion Haushalt (0-4)', 'Haushalt', '0_4', 'worse'],
    ['funktion_kommunikation', 'Funktion Kommunikation (0-4)', 'Kommunikation', '0_4', 'worse'],
    ['funktion_ausser_haus', 'Funktion Ausser Haus (0-4)', 'Außer Haus', '0_4', 'worse'],
    ['funktion_sonne', 'Funktion Sonne (0-4)', 'Sonne', '0_4', 'worse']
  ];

  var FIELDS_BY_KEY = {};
  var HEADER_MAP = {};
  FIELD_DEFS.forEach(function (f) {
    var key = f[0], header = f[1], label = f[2], type = f[3], dir = f[4];
    FIELDS_BY_KEY[key] = { key: key, header: header, label: label, type: type, dir: dir };
    HEADER_MAP[norm(header)] = key;
  });

  // Symptom-Bereiche (Domänen) für Heatmap und Mittelwerte
  var DOMAINS = [
    { key: 'schmerz', label: 'Schmerz', members: ['schmerz_muskel', 'schmerz_gelenk', 'schmerz_kopf', 'schmerz_neuro', 'schmerz_beruehrung'] },
    { key: 'kognition', label: 'Kognition', members: ['kognition_konzentration', 'kognition_gedaechtnis', 'kognition_sprache', 'kognition_koordination', 'kognition_verlangsamt', 'kognition_multitasking', 'kognition_desorientierung'] },
    { key: 'reiz', label: 'Reize', members: ['reiz_licht', 'reiz_geraeusch', 'reiz_geruch'] },
    { key: 'autonom', label: 'Autonom/POTS', members: ['autonom_schwindel', 'autonom_herzrasen', 'autonom_atem', 'autonom_verdauung', 'autonom_blase', 'autonom_temperatur', 'autonom_praesynkope', 'autonom_synkope', 'autonom_stehintoleranz'] },
    { key: 'neuroendokrin', label: 'Neuroendokrin', members: ['neuroendokrin_hitze', 'neuroendokrin_kaelte', 'neuroendokrin_appetit', 'neuroendokrin_stress'] },
    { key: 'immun', label: 'Immun', members: ['immun_grippegefuehl', 'immun_hals', 'immun_fieber', 'immun_allergie'] },
    { key: 'mcas', label: 'MCAS', members: ['mcas_flush', 'mcas_uebelkeit', 'mcas_bauchschmerz', 'mcas_durchfall', 'mcas_nahrung', 'mcas_medikament'] },
    { key: 'schlaf', label: 'Schlaf (spez.)', members: ['schlaf_durchschlaf', 'schlaf_rhythmus', 'schlaf_hypersomnie'] },
    { key: 'funktion', label: 'Funktion', members: ['funktion_koerperpflege', 'funktion_anziehen', 'funktion_essen', 'funktion_gehen', 'funktion_aufrecht', 'funktion_haushalt', 'funktion_kommunikation', 'funktion_ausser_haus', 'funktion_sonne'] }
  ];

  var DOMAINS_BY_KEY = {};
  DOMAINS.forEach(function (d) { DOMAINS_BY_KEY[d.key] = d; });

  // Gruppen für die Metrik-Auswahl im Trend
  var TREND_GROUPS = [
    {
      name: 'Kernwerte',
      items: [
        { key: 'zustand_0_10' },
        { key: 'bell_0_100' },
        { key: 'fatigue_0_4' }
      ]
    },
    {
      name: 'PEM',
      items: [
        { key: 'pem_heute_0_4' },
        { key: 'pem_gesamt_0_4' }
      ]
    },
    {
      name: 'Belastung & Pacing',
      items: [
        { key: 'belastung_koerperlich_0_4' },
        { key: 'belastung_kognitiv_0_4' },
        { key: 'belastung_reiz_0_4' },
        { key: 'pacing_0_4' },
        { key: 'arbeitsfaehigkeit_0_4' },
        { key: 'teilhabe_0_4' }
      ]
    },
    {
      name: 'Alltag',
      items: [
        { key: 'liegezeit_h' },
        { key: 'hilfebedarf_min' },
        { key: 'schritte' }
      ]
    },
    {
      name: 'Schlaf',
      items: [
        { key: 'schlafqualitaet_0_4' },
        { key: 'schlafdauer_h' },
        { key: 'schlaf_durchschlaf' },
        { key: 'schlaf_rhythmus' },
        { key: 'schlaf_hypersomnie' }
      ]
    },
    {
      name: 'Bereiche (Mittel 0–4)',
      items: DOMAINS.map(function (d) { return { domain: d.key, label: d.label }; })
    }
  ];

  // Metriken für die Risiko-Auswertung
  var WORSENING_METRICS = ['fatigue_0_4', 'pem_heute_0_4', 'belastung_koerperlich_0_4', 'belastung_kognitiv_0_4', 'belastung_reiz_0_4', 'schlafqualitaet_0_4'];
  var LOAD_METRICS = ['belastung_koerperlich_0_4', 'belastung_kognitiv_0_4', 'belastung_reiz_0_4'];

  var RECENT_WINDOW = 3;
  var BASELINE_WINDOW = 14;

  // ---------------------------------------------------------------------------
  // Zustand
  // ---------------------------------------------------------------------------

  var records = [];
  var selectedMetric = 'zustand_0_10';
  var baselineOn = true;

  function fmtShort(ts) {
    return new Date(ts).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
  }

  function fmtFull(ts) {
    return new Date(ts).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function domainMean(record, domain) {
    var vals = [];
    domain.members.forEach(function (k) {
      if (typeof record[k] === 'number') vals.push(record[k]);
    });
    return vals.length ? mean(vals) : null;
  }

  // Liefert den Messwert eines Datensatzes für eine Auswahl (Feld-Key oder 'domain:key')
  function getMetricValue(record, metric) {
    if (metric.indexOf('domain:') === 0) {
      var d = DOMAINS_BY_KEY[metric.slice(7)];
      return d ? domainMean(record, d) : null;
    }
    return typeof record[metric] === 'number' ? record[metric] : null;
  }

  function metricIsGood(metric) {
    if (metric.indexOf('domain:') === 0) return false;
    var f = FIELDS_BY_KEY[metric];
    return f ? f.dir === 'better' : false;
  }

  function metricLabel(metric) {
    if (metric.indexOf('domain:') === 0) {
      var d = DOMAINS_BY_KEY[metric.slice(7)];
      return d ? d.label : metric;
    }
    var f = FIELDS_BY_KEY[metric];
    return f ? f.label : metric;
  }

  // y-Skala für das Trend-Diagramm
  function yRangeFor(metric, values) {
    var type = metric.indexOf('domain:') === 0 ? '0_4' : FIELDS_BY_KEY[metric].type;
    var fixedMax = null, fixedMin = 0;
    if (type === '0_4') fixedMax = 4;
    else if (type === '0_10') fixedMax = 10;
    else if (type === '0_100') fixedMax = 100;

    var nums = values.filter(function (v) { return typeof v === 'number'; });
    var dataMax = nums.length ? Math.max.apply(null, nums) : 1;
    var dataMin = nums.length ? Math.min.apply(null, nums) : 0;

    var min = Math.min(fixedMin, dataMin);
    var max = fixedMax !== null ? Math.max(fixedMax, dataMax) : dataMax * 1.15;
    if (max <= min) max = min + 1;
    return { min: min, max: max };
  }

  function makeTicks(min, max) {
    var span = max - min;
    var step;
    if (span <= 4) step = 1;
    else if (span <= 10) step = 2;
    else if (span <= 20) step = 5;
    else if (span <= 100) step = 20;
    else step = Math.ceil(span / 5);

    var ticks = [];
    var start = Math.ceil(min / step) * step;
    for (var v = start; v <= max + 1e-9; v += step) ticks.push(v);
    return ticks;
  }

  function fmtNumber(v) {
    if (Math.abs(v) >= 1000) return String(Math.round(v));
    return String(Math.round(v * 10) / 10);
  }

  // ---------------------------------------------------------------------------
  // CSV/JSON-Parser
  // ---------------------------------------------------------------------------

  function recordsFromCSV(text) {
    text = text.replace(/\uFEFF/g, '');
    var lines = text.split(/\r?\n/).filter(function (l) { return l.trim() !== ''; });
    if (lines.length < 2) return [];

    var headers = parseCSVLine(lines[0]).map(norm);
    var keyByIndex = headers.map(function (h) { return HEADER_MAP[h] || null; });

    var out = [];
    for (var r = 1; r < lines.length; r++) {
      var cells = parseCSVLine(lines[r]);
      var rec = {};
      for (var c = 0; c < cells.length; c++) {
        var key = keyByIndex[c];
        if (!key) continue;
        var def = FIELDS_BY_KEY[key];
        var val = cells[c];
        if (def.type === 'date' || def.type === 'text') {
          rec[key] = (val === '') ? null : val;
        } else {
          rec[key] = parseNumber(val);
        }
      }
      out.push(rec);
    }
    return out;
  }

  function recordsFromJSON(text) {
    var data = JSON.parse(text);
    var arr = Array.isArray(data) ? data : (Array.isArray(data.records) ? data.records : (Array.isArray(data.data) ? data.data : null));
    if (!arr) return [];

    return arr.map(function (item) {
      var rec = {};
      Object.keys(FIELDS_BY_KEY).forEach(function (key) {
        var def = FIELDS_BY_KEY[key];
        if (key in item) {
          var val = item[key];
          if (def.type === 'date' || def.type === 'text') {
            rec[key] = (val === null || val === undefined || val === '') ? null : val;
          } else {
            rec[key] = parseNumber(val);
          }
        }
      });
      return rec;
    });
  }

  function normalizeRecords(list) {
    return list
      .map(function (rec) {
        var ts = parseDate(rec.datum);
        rec.dateTs = ts;
        return rec;
      })
      .filter(function (rec) { return rec.dateTs !== null; })
      .sort(function (a, b) { return a.dateTs - b.dateTs; });
  }

  // ---------------------------------------------------------------------------
  // Import
  // ---------------------------------------------------------------------------

  function loadRecords(list) {
    records = normalizeRecords(list);
    updateImportStatus();
    renderTrendChips();
    renderTrend();
    renderHeatmap();
    renderRisk();
  }

  function updateImportStatus() {
    var el = document.getElementById('import-status');
    if (!records.length) {
      el.textContent = 'Noch keine Daten geladen.';
      return;
    }
    var first = fmtFull(records[0].dateTs);
    var last = fmtFull(records[records.length - 1].dateTs);
    el.textContent = records.length + ' Tage geladen (' + first + ' bis ' + last + ').';
  }

  function handleFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var text = String(reader.result);
        var list;
        var ext = (file.name || '').toLowerCase();
        var trimmed = text.trim();
        if (ext.endsWith('.json') || trimmed.charAt(0) === '{' || trimmed.charAt(0) === '[') {
          list = recordsFromJSON(text);
        } else {
          list = recordsFromCSV(text);
        }
        if (!list.length) {
          alert('Es konnten keine Datensätze gelesen werden.');
          return;
        }
        loadRecords(list);
      } catch (e) {
        alert('Import fehlgeschlagen: ' + e.message);
      }
    };
    reader.onerror = function () {
      alert('Datei konnte nicht gelesen werden.');
    };
    reader.readAsText(file);
  }

  // Lädt die Daten direkt aus dem localStorage des ME/CFS-Symptom-Trackers.
  // Voraussetzung: beide Apps laufen auf derselben Origin (junk495.github.io).
  function loadFromTracker(silent) {
    var prefix = 'mecfs_tagescheck_';
    var list = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (!key || key.indexOf(prefix) !== 0) continue;
        try {
          var entry = JSON.parse(localStorage.getItem(key));
          if (entry && entry.datum) list.push(entry);
        } catch (e) {
          // beschädigte Einträge überspringen
        }
      }
    } catch (e) {
      // localStorage nicht verfügbar (z. B. Privatmodus)
    }

    if (!list.length) {
      if (!silent) {
        var status = document.getElementById('import-status');
        if (status) status.textContent = 'Keine Tracker-Daten in diesem Browser gefunden.';
      }
      return;
    }

    loadRecords(list);
  }

  // ---------------------------------------------------------------------------
  // Demo-Daten (deterministisch)
  // ---------------------------------------------------------------------------

  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function buildDemo() {
    var rand = mulberry32(42);
    var list = [];
    var today = new Date(2026, 8, 10).getTime();
    var DAY = 86400000;
    // Erzeuge einen leichten "Push-Crash"-Verlauf über 28 Tage
    for (var i = 27; i >= 0; i--) {
      var ts = today - i * DAY;
      var d = new Date(ts);
      var iso = d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());

      // Verlauf: relativ stabil, dann Belastungsspitze ~Tag 6-4, Crash danach
      var crash = (i >= 4 && i <= 8) ? 1 : 0;
      var postCrash = (i >= 0 && i <= 3) ? 1 : 0;

      function v(base, spread) {
        var x = base + (rand() - 0.5) * spread;
        if (crash) x += 1.2;
        if (postCrash) x += 0.8;
        return Math.max(0, Math.min(4, Math.round(x)));
      }

      var fatigue = v(1.6, 1.2);
      var pem = crash ? 2 + Math.round(rand()) : 0;
      var state = crash ? 3 : (postCrash ? 4 : 6);
      var bell = crash ? 20 : (postCrash ? 30 : 50);
      var loadK = crash ? 3 : Math.max(0, Math.min(4, Math.round(1 + rand() * 1.5)));
      var loadC = crash ? 3 : Math.max(0, Math.min(4, Math.round(1 + rand() * 1.5)));
      var loadR = crash ? 2 : Math.max(0, Math.min(4, Math.round(rand() * 1.5)));

      var rec = {
        datum: iso,
        erfassungs_typ: 'standard',
        zustand_0_10: state,
        bell_0_100: bell,
        fatigue_0_4: fatigue,
        pem_heute_0_4: pem,
        liegezeit_h: crash || postCrash ? 16 : 12 + Math.round(rand() * 4),
        hilfebedarf_min: crash ? 120 : 30 + Math.round(rand() * 60),
        schlafqualitaet_0_4: v(2, 1.5),
        belastung_koerperlich_0_4: loadK,
        belastung_kognitiv_0_4: loadC,
        belastung_reiz_0_4: loadR,
        pacing_0_4: crash ? 3 : 1,
        arbeitsfaehigkeit_0_4: crash ? 3 : 2,
        teilhabe_0_4: crash ? 3 : 2,
        schlafdauer_h: crash ? 5 : 7,
        schritte: crash ? 300 : 1500 + Math.round(rand() * 4000),

        pem_belastungsdatum: crash ? iso : null,
        pem_ausloeser: crash ? 'Überanstrengung' : null,
        pem_gesamt_0_4: crash ? 3 : null,
        pem_dauer_h: crash ? 24 + Math.round(rand() * 48) : null,

        schmerz_muskel: v(crash ? 3 : 1.5, 1),
        schmerz_gelenk: v(1, 1),
        schmerz_kopf: v(1.2, 1),
        schmerz_neuro: v(1, 1),
        schmerz_beruehrung: v(1, 1),
        kognition_konzentration: v(2, 1.2),
        kognition_gedaechtnis: v(2, 1.2),
        kognition_sprache: v(1.5, 1),
        kognition_koordination: v(1.2, 1),
        reiz_licht: v(1.5, 1),
        reiz_geraeusch: v(1.8, 1),
        autonom_schwindel: v(1.5, 1),
        autonom_herzrasen: v(1.5, 1),
        autonom_atem: v(1, 1),
        autonom_verdauung: v(1.2, 1),
        autonom_blase: v(0.8, 1),
        autonom_temperatur: v(1, 1),
        immun_grippegefuehl: v(1.5, 1),
        immun_hals: v(0.8, 1),
        mcas_flush: v(0.8, 1),

        schlaf_durchschlaf: v(2, 1.2),
        schlaf_rhythmus: v(1.5, 1),
        schlaf_hypersomnie: v(1.2, 1),
        kognition_verlangsamt: v(2, 1.2),
        kognition_multitasking: v(2, 1.2),
        kognition_desorientierung: v(1, 1),
        reiz_geruch: v(0.8, 1),
        autonom_praesynkope: v(1, 1),
        autonom_synkope: 0,
        autonom_stehintoleranz: v(1.2, 1),
        neuroendokrin_hitze: v(1, 1),
        neuroendokrin_kaelte: v(1, 1),
        neuroendokrin_appetit: v(1, 1),
        neuroendokrin_stress: v(1.5, 1),
        immun_fieber: v(0.5, 1),
        immun_allergie: v(0.5, 1),
        mcas_uebelkeit: v(0.8, 1),
        mcas_bauchschmerz: v(0.8, 1),
        mcas_durchfall: v(0.5, 1),
        mcas_nahrung: v(0.8, 1),
        mcas_medikament: v(0.5, 1),
        funktion_koerperpflege: v(1.5, 1),
        funktion_anziehen: v(1.5, 1),
        funktion_essen: v(1.5, 1),
        funktion_gehen: v(1.8, 1),
        funktion_aufrecht: v(2, 1),
        funktion_haushalt: v(2, 1),
        funktion_kommunikation: v(1.5, 1),
        funktion_ausser_haus: v(2.2, 1),
        funktion_sonne: v(1.5, 1)
      };
      list.push(rec);
    }
    return list;
  }

  function pad2(n) { return n < 10 ? '0' + n : '' + n; }

  // ---------------------------------------------------------------------------
  // Navigation (SPA)
  // ---------------------------------------------------------------------------

  function switchView(name) {
    document.querySelectorAll('.view').forEach(function (sec) {
      sec.hidden = (sec.id !== 'view-' + name);
    });
    document.querySelectorAll('.tab').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.view === name);
    });
    if (name === 'trend') renderTrend();
    else if (name === 'heatmap') renderHeatmap();
    else if (name === 'risk') renderRisk();
  }

  // ---------------------------------------------------------------------------
  // Trend-Chips rendern
  // ---------------------------------------------------------------------------

  function renderTrendChips() {
    var container = document.getElementById('trend-chips');
    container.innerHTML = '';

    TREND_GROUPS.forEach(function (group) {
      var g = document.createElement('div');
      g.className = 'chip-group';
      var h = document.createElement('h3');
      h.textContent = group.name;
      g.appendChild(h);

      var row = document.createElement('div');
      row.className = 'chip-row';

      group.items.forEach(function (item) {
        var metric = item.domain ? 'domain:' + item.domain : item.key;
        var label = item.label || metricLabel(metric);
        var chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip' + (metric === selectedMetric ? ' is-active' : '');
        chip.textContent = label;
        chip.dataset.metric = metric;
        chip.addEventListener('click', function () {
          selectedMetric = metric;
          renderTrendChips();
          renderTrend();
        });
        row.appendChild(chip);
      });

      g.appendChild(row);
      container.appendChild(g);
    });

    // Zusammenfassung (eingeklappte Zeile) auf die aktuelle Auswahl setzen
    var summary = document.getElementById('chip-summary');
    if (summary) summary.textContent = 'Messwert: ' + metricLabel(selectedMetric);
  }

  // ---------------------------------------------------------------------------
  // Canvas-Helfer
  // ---------------------------------------------------------------------------

  function setupCanvas(canvas, cssH) {
    var wrap = canvas.parentElement;
    var cssW = wrap.clientWidth;
    canvas.style.width = cssW + 'px';
    canvas.style.height = cssH + 'px';
    var dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(cssW * dpr);
    canvas.height = Math.round(cssH * dpr);
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, width: cssW, height: cssH };
  }

  function relativeX(e, canvas) {
    var rect = canvas.getBoundingClientRect();
    var clientX = (e.touches && e.touches.length) ? e.touches[0].clientX : e.clientX;
    return (clientX - rect.left) * (canvas.width / (window.devicePixelRatio || 1)) / rect.width;
  }

  // ---------------------------------------------------------------------------
  // Trend-Diagramm
  // ---------------------------------------------------------------------------

  function renderTrend() {
    var canvas = document.getElementById('trend-canvas');
    var readout = document.getElementById('trend-readout');

    if (!records.length) {
      var empty = setupCanvas(canvas, 220);
      empty.ctx.fillStyle = '#a7adba';
      empty.ctx.font = '14px system-ui, sans-serif';
      empty.ctx.textAlign = 'center';
      empty.ctx.fillText('Noch keine Daten geladen', empty.width / 2, empty.height / 2);
      readout.textContent = 'Daten oben über „Tracker", „CSV/JSON" oder „Beispiel" laden.';
      return;
    }

    var d = setupCanvas(canvas, 340);
    var ctx = d.ctx, W = d.width, H = d.height;
    var padL = 42, padR = 12, padT = 16, padB = 40;

    var values = records.map(function (r) { return getMetricValue(r, selectedMetric); });
    var range = yRangeFor(selectedMetric, values);

    var plotW = W - padL - padR;
    var plotH = H - padT - padB;
    var ticks = makeTicks(range.min, range.max);

    function xForDate(ts) {
      var first = records[0].dateTs;
      var last = records[records.length - 1].dateTs;
      var span = last - first || 86400000;
      return padL + ((ts - first) / span) * plotW;
    }

    function yFor(v) {
      var span = range.max - range.min || 1;
      return padT + (1 - (v - range.min) / span) * plotH;
    }

    ctx.clearRect(0, 0, W, H);

    // Raster + Y-Achse
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.fillStyle = '#a7adba';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.lineWidth = 1;

    ticks.forEach(function (t) {
      if (t < range.min || t > range.max) return;
      var y = yFor(t);
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(W - padR, y);
      ctx.stroke();
      ctx.fillText(fmtNumber(t), padL - 6, y + 4);
    });

    // X-Achsen-Beschriftung (Datumsangaben)
    var labelCount = Math.max(2, Math.min(6, Math.floor(plotW / 80)));
    var step = Math.max(1, Math.ceil(records.length / labelCount));
    ctx.textAlign = 'center';
    for (var i = 0; i < records.length; i += step) {
      var x = xForDate(records[i].dateTs);
      ctx.fillText(fmtShort(records[i].dateTs), x, H - padB + 16);
    }
    // letzten Tag immer beschriften, wenn nicht bereits enthalten
    var lastX = xForDate(records[records.length - 1].dateTs);
    ctx.fillText(fmtShort(records[records.length - 1].dateTs), lastX, H - padB + 16);

    // Baseline (Median über alle vorhandenen Werte)
    if (baselineOn) {
      var baseVals = values.filter(function (v) { return typeof v === 'number'; });
      var med = median(baseVals);
      if (med !== null && baseVals.length >= 2) {
        var by = yFor(med);
        ctx.strokeStyle = '#d9b65c';
        ctx.setLineDash([5, 4]);
        ctx.beginPath();
        ctx.moveTo(padL, by);
        ctx.lineTo(W - padR, by);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#d9b65c';
        ctx.textAlign = 'left';
        ctx.fillText('Baseline ' + fmtNumber(med), padL + 4, by - 4);
      }
    }

    // Achsenlinien
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(padL, padT);
    ctx.lineTo(padL, padT + plotH);
    ctx.lineTo(W - padR, padT + plotH);
    ctx.stroke();

    // Daten-Linie mit Lücken
    var good = metricIsGood(selectedMetric);
    var lineColor = '#7fb3d5';

    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.setLineDash([]);

    var started = false;
    ctx.beginPath();
    for (var j = 0; j < records.length; j++) {
      var val = values[j];
      if (typeof val !== 'number') {
        started = false;
        continue;
      }
      var px = xForDate(records[j].dateTs);
      var py = yFor(val);
      if (!started) { ctx.moveTo(px, py); started = true; }
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Punkte
    ctx.fillStyle = lineColor;
    for (var k = 0; k < records.length; k++) {
      if (typeof values[k] !== 'number') continue;
      ctx.beginPath();
      ctx.arc(xForDate(records[k].dateTs), yFor(values[k]), 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Pointer-/Klick-Auswertung speichern
    canvas._trendData = { records: records, values: values, xForDate: xForDate, padL: padL, padR: padR, good: good };

    // Standard-Ausgabe: letzter Wert
    var lastVal = null, lastRec = null;
    for (var m = records.length - 1; m >= 0; m--) {
      if (typeof values[m] === 'number') { lastVal = values[m]; lastRec = records[m]; break; }
    }
    if (lastRec) {
      readout.textContent = 'Zuletzt: ' + fmtFull(lastRec.dateTs) + ' · ' + metricLabel(selectedMetric) + ' ' + fmtNumber(lastVal);
    } else {
      readout.textContent = 'Keine Werte für diese Auswahl vorhanden.';
    }
  }

  function trendPointer(e) {
    var canvas = document.getElementById('trend-canvas');
    var readout = document.getElementById('trend-readout');
    var d = canvas._trendData;
    if (!d) return;

    var x = relativeX(e, canvas);
    // nächsten Tag finden
    var best = -1, bestDist = Infinity;
    for (var i = 0; i < d.records.length; i++) {
      var px = d.xForDate(d.records[i].dateTs);
      var dist = Math.abs(px - x);
      if (dist < bestDist) { bestDist = dist; best = i; }
    }
    if (best < 0) return;
    var val = d.values[best];
    var txt = fmtFull(d.records[best].dateTs) + ' · ' + metricLabel(selectedMetric) + ': ';
    txt += (typeof val === 'number') ? fmtNumber(val) : 'keine Angabe';
    readout.textContent = txt;
  }

  // ---------------------------------------------------------------------------
  // Heatmap
  // ---------------------------------------------------------------------------

  function renderHeatmap() {
    var canvas = document.getElementById('heatmap-canvas');
    var readout = document.getElementById('heatmap-readout');

    if (!records.length || !DOMAINS.length) {
      var empty = setupCanvas(canvas, 220);
      empty.ctx.fillStyle = '#a7adba';
      empty.ctx.font = '14px system-ui, sans-serif';
      empty.ctx.textAlign = 'center';
      empty.ctx.fillText('Noch keine Daten geladen', empty.width / 2, empty.height / 2);
      readout.textContent = 'Daten oben über „Tracker", „CSV/JSON" oder „Beispiel" laden.';
      return;
    }

    var rowH = 30;
    var leftW = 96;
    var padT = 10;
    var padB = 56;
    var cssH = padT + DOMAINS.length * rowH + padB;
    var d = setupCanvas(canvas, cssH);
    var ctx = d.ctx, W = d.width, H = d.height;

    var plotW = W - leftW - 8;

    function xForDate(ts) {
      var first = records[0].dateTs;
      var last = records[records.length - 1].dateTs;
      var span = last - first || 86400000;
      return leftW + ((ts - first) / span) * plotW;
    }

    ctx.clearRect(0, 0, W, H);

    // Zellen
    var cellW = plotW / records.length;
    DOMAINS.forEach(function (domain, r) {
      var y = padT + r * rowH;
      ctx.fillStyle = '#a7adba';
      ctx.font = '12px system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(domain.label, leftW - 6, y + rowH / 2 + 4);

      for (var c = 0; c < records.length; c++) {
        var val = domainMean(records[c], domain);
        var x = xForDate(records[c].dateTs);
        var cellX = x;
        var cellW2 = Math.max(cellW - 1, 3);
        if (val === null) {
          ctx.fillStyle = '#20232a';
        } else {
          ctx.fillStyle = colorForScale(val);
        }
        ctx.fillRect(cellX, y + 2, cellW2, rowH - 4);
      }
    });

    // Datums-Beschriftung unten
    var dateY = padT + DOMAINS.length * rowH + 16;
    ctx.fillStyle = '#a7adba';
    ctx.font = '11px system-ui, sans-serif';
    ctx.textAlign = 'center';
    var labelStep = Math.max(1, Math.ceil(records.length / 8));
    for (var i = 0; i < records.length; i += labelStep) {
      ctx.fillText(fmtShort(records[i].dateTs), xForDate(records[i].dateTs) + cellW / 2, dateY);
    }

    // Legende (unterhalb der Datums-Beschriftung)
    var legendY = dateY + 22;
    ctx.textAlign = 'left';
    ctx.fillText('0 (niedrig)', leftW, legendY);
    for (var g = 0; g <= 4; g++) {
      ctx.fillStyle = colorForScale(g);
      ctx.fillRect(leftW + 64 + g * 22, legendY - 11, 18, 12);
    }
    ctx.fillStyle = '#a7adba';
    ctx.fillText('4 (hoch)', leftW + 64 + 5 * 22 + 6, legendY);

    // Klick-Auswertung
    canvas._heatmapData = { records: records, xForDate: xForDate, cellW: cellW };

    readout.textContent = 'Auf eine Spalte tippen, um den Tag aufzulisten.';
  }

  function colorForScale(v) {
    // reizarme Farbskala: dunkel (0) -> warm/rot (4)
    var stops = [
      [0, 42, 61, 85],
      [1, 74, 106, 90],
      [2, 138, 115, 80],
      [3, 160, 91, 91],
      [4, 217, 124, 124]
    ];
    var t = Math.max(0, Math.min(4, v));
    var lo = Math.floor(t);
    var hi = Math.ceil(t);
    var f = t - lo;
    var a = stops[lo], b = stops[hi];
    var r = Math.round(a[0] + (b[0] - a[0]) * f);
    var g = Math.round(a[1] + (b[1] - a[1]) * f);
    var bl = Math.round(a[2] + (b[2] - a[2]) * f);
    return 'rgb(' + r + ',' + g + ',' + bl + ')';
  }

  function heatmapPointer(e) {
    var canvas = document.getElementById('heatmap-canvas');
    var readout = document.getElementById('heatmap-readout');
    var d = canvas._heatmapData;
    if (!d) return;

    var x = relativeX(e, canvas);
    var idx = -1;
    var bestDist = Infinity;
    for (var i = 0; i < d.records.length; i++) {
      var cx = d.xForDate(d.records[i].dateTs) + d.cellW / 2;
      var dist = Math.abs(cx - x);
      if (dist < bestDist) { bestDist = dist; idx = i; }
    }
    if (idx < 0) return;

    var rec = d.records[idx];
    var parts = [fmtFull(rec.dateTs)];
    DOMAINS.forEach(function (domain) {
      var v = domainMean(rec, domain);
      parts.push(domain.label + ': ' + (v === null ? '–' : fmtNumber(v)));
    });
    readout.textContent = parts.join('  ·  ');
  }

  // ---------------------------------------------------------------------------
  // Crash-Risiko
  // ---------------------------------------------------------------------------

  // Liefert { recentMean, baseMedian } für einen Metric-Key inkl. Richtungs-Delta
  function metricStats(key) {
    var vals = records.map(function (r) { return typeof r[key] === 'number' ? r[key] : null; });
    var numeric = [];
    for (var i = 0; i < vals.length; i++) if (vals[i] !== null) numeric.push(vals[i]);

    var recent = numeric.slice(-RECENT_WINDOW);
    var base = numeric.slice(0, -RECENT_WINDOW).slice(-BASELINE_WINDOW);
    if (!base.length) base = numeric.slice(); // Fallback: Median über alles

    var rm = mean(recent);
    var bm = median(base);
    var dir = FIELDS_BY_KEY[key].dir;
    var delta = null;
    if (rm !== null && bm !== null) {
      delta = (dir === 'better') ? (bm - rm) : (rm - bm); // positiv = Verschlechterung
    }
    return { recentMean: rm, baseMedian: bm, delta: delta, recentN: recent.length, baseN: base.length };
  }

  // Formatiert ein Delta: positiv = upVerb, negativ = downVerb, ~0 = unverändert
  function deltaText(v, upVerb, downVerb) {
    if (v === null || Math.abs(v) < 0.05) return 'unverändert';
    return v > 0 ? ('um ' + fmtNumber(v) + ' ' + upVerb) : ('um ' + fmtNumber(-v) + ' ' + downVerb);
  }

  function computeRisk() {
    if (records.length < 3) return null;

    var factors = [];
    var points = 0;

    // Faktor 1: Symptom-Anstieg (Durchschnitt der Verschlechterungs-Deltas)
    var deltas = [];
    WORSENING_METRICS.forEach(function (key) {
      var s = metricStats(key);
      if (s.delta !== null) deltas.push(s.delta);
    });
    var avgDelta = deltas.length ? mean(deltas) : 0;
    var p1 = 0;
    if (avgDelta >= 1.0) p1 = 2;
    else if (avgDelta >= 0.5) p1 = 1;
    points += p1;
    factors.push({
      text: 'Die Symptome sind im Schnitt ' + deltaText(avgDelta, 'gestiegen', 'gesunken') + ' (0–4-Skala).',
      value: 'Symptom-Anstieg',
      points: p1
    });

    // Faktor 2: Zustand/Bell-Abfall
    var z = metricStats('zustand_0_10');
    var b = metricStats('bell_0_100');
    var p2 = 0;
    var zWorse = z.delta !== null ? z.delta : 0;
    var bWorse = b.delta !== null ? b.delta : 0;
    if (zWorse >= 2 || bWorse >= 15) p2 = 2;
    else if (zWorse >= 1 || bWorse >= 10) p2 = 1;
    points += p2;
    factors.push({
      text: 'Zustand ' + deltaText(zWorse, 'gefallen', 'gestiegen') + ' (von 10), Bell ' + deltaText(bWorse, 'gefallen', 'gestiegen') + ' (von 100).',
      value: 'Zustand/Bell-Abfall',
      points: p2
    });

    // Faktor 3: Hohe aktuelle Belastung
    var loadRecentMean = null;
    var loadVals = [];
    LOAD_METRICS.forEach(function (key) {
      var s = metricStats(key);
      if (s.recentMean !== null) loadVals.push(s.recentMean);
    });
    loadRecentMean = loadVals.length ? mean(loadVals) : 0;
    var p3 = 0;
    if (loadRecentMean >= 2.5) p3 = 2;
    else if (loadRecentMean >= 2.0) p3 = 1;
    points += p3;
    factors.push({
      text: 'Die Belastung liegt aktuell bei ' + fmtNumber(loadRecentMean) + ' von 4.',
      value: 'Hohe Belastung',
      points: p3
    });

    // Faktor 4: Aktive PEM
    var pemStats = metricStats('pem_gesamt_0_4');
    var pemHeuteStats = metricStats('pem_heute_0_4');
    var activePem = (pemStats.recentMean !== null && pemStats.recentMean >= 1);
    var pemHeute = pemHeuteStats.recentMean !== null ? pemHeuteStats.recentMean : 0;
    var p4 = 0;
    if (activePem || pemHeute >= 2) p4 = 2;
    else if (pemHeute >= 1) p4 = 1;
    points += p4;
    factors.push({
      text: 'PEM heute ' + fmtNumber(pemHeute) + ' (von 4), PEM-Gesamtschwere ' + fmtNumber(pemStats.recentMean !== null ? pemStats.recentMean : 0) + ' (von 4).',
      value: 'Aktive PEM',
      points: p4
    });

    // Faktor 5: Schlaf
    var sq = metricStats('schlafqualitaet_0_4');
    var sd = metricStats('schlafdauer_h');
    var p5 = 0;
    if ((sq.recentMean !== null && sq.recentMean >= 3) || (sd.recentMean !== null && sd.recentMean < 6)) p5 = 1;
    points += p5;
    factors.push({
      text: 'Qualität ' + fmtNumber(sq.recentMean !== null ? sq.recentMean : 0) + ' (von 4), Dauer ' + fmtNumber(sd.recentMean !== null ? sd.recentMean : 0) + ' h.',
      value: 'Schlaf',
      points: p5
    });

    var level, label, summary;
    if (points <= 1) {
      level = 'stable';
      label = 'stabil';
      summary = 'Die aktuellen Werte liegen im Bereich deines persönlichen Basisniveaus. Es gibt aktuell keine deutlichen Warnsignale.';
    } else if (points <= 3) {
      level = 'watch';
      label = 'beobachten';
      summary = 'Einzelne Warnsignale sind sichtbar. Pacing ist jetzt besonders wichtig, um einem möglichen Crash vorzubeugen.';
    } else {
      level = 'high';
      label = 'hohes Crash-Risiko';
      summary = 'Mehrere Warnsignale liegen gleichzeitig vor. Ein PEM-Crash ist möglich. Reduziere Belastung wo immer möglich und gönne dir Pausen.';
    }

    return { level: level, label: label, summary: summary, points: points, factors: factors };
  }

  function renderRisk() {
    var empty = document.getElementById('risk-empty');
    var content = document.getElementById('risk-content');
    var gauge = document.getElementById('risk-gauge');
    var summary = document.getElementById('risk-summary');
    var factorList = document.getElementById('risk-factors');
    var tableDiv = document.getElementById('risk-table');

    if (!records.length || records.length < 3) {
      empty.hidden = false;
      content.hidden = true;
      if (records.length && records.length < 3) {
        empty.textContent = 'Zu wenige Datensätze für eine Einschätzung (mind. 3 Tage empfohlen).';
      } else {
        empty.textContent = 'Bitte zuerst Daten laden.';
      }
      return;
    }

    empty.hidden = true;
    content.hidden = false;

    var risk = computeRisk();
    if (!risk) {
      empty.hidden = false;
      content.hidden = true;
      return;
    }

    gauge.className = 'risk-gauge risk-' + risk.level;
    gauge.innerHTML = '<div class="risk-label">Einschätzung</div>' +
      '<div class="risk-level">' + risk.label + '</div>' +
      '<div class="risk-label">' + risk.points + ' Warnpunkte (max. 9)</div>';
    summary.textContent = risk.summary;

    factorList.innerHTML = '';
    risk.factors.forEach(function (f) {
      var li = document.createElement('li');
      li.textContent = f.value + ': ' + f.text + ' (' + f.points + ' Punkt' + (f.points === 1 ? '' : 'e') + ')';
      factorList.appendChild(li);
    });

    // Kennzahlen-Tabelle
    var rows = [];
    ['zustand_0_10', 'bell_0_100', 'fatigue_0_4', 'pem_heute_0_4', 'belastung_koerperlich_0_4', 'belastung_kognitiv_0_4', 'belastung_reiz_0_4', 'schlafqualitaet_0_4', 'liegezeit_h', 'schritte'].forEach(function (key) {
      var s = metricStats(key);
      rows.push({ label: metricLabel(key), recent: s.recentMean, base: s.baseMedian, dir: FIELDS_BY_KEY[key].dir });
    });

    var html = '<table class="risk-table"><thead><tr><th>Messwert</th><th class="num">Baseline</th><th class="num">Ø 3 Tage</th><th class="num">Veränderung</th></tr></thead><tbody>';
    rows.forEach(function (r) {
      var deltaTxt = '–';
      var cls = 'delta-flat';
      if (r.recent !== null && r.base !== null) {
        var numDelta = r.recent - r.base;
        var sign = numDelta > 0.05 ? '↑' : (numDelta < -0.05 ? '↓' : '→');
        deltaTxt = sign + ' ' + fmtNumber(Math.abs(numDelta));
        if (Math.abs(numDelta) < 0.05) {
          cls = 'delta-flat';
        } else if (r.dir === 'better') {
          cls = numDelta < 0 ? 'delta-up' : 'delta-down';
        } else if (r.dir === 'worse') {
          cls = numDelta > 0 ? 'delta-up' : 'delta-down';
        } else {
          cls = 'delta-flat';
        }
      }
      html += '<tr><td>' + r.label + '</td>' +
        '<td class="num">' + (r.base !== null ? fmtNumber(r.base) : '–') + '</td>' +
        '<td class="num">' + (r.recent !== null ? fmtNumber(r.recent) : '–') + '</td>' +
        '<td class="num ' + cls + '">' + deltaTxt + '</td></tr>';
    });
    html += '</tbody></table>';
    tableDiv.innerHTML = html;
  }

  // ---------------------------------------------------------------------------
  // Initialisierung
  // ---------------------------------------------------------------------------

  function init() {
    document.querySelectorAll('.tab').forEach(function (btn) {
      btn.addEventListener('click', function () { switchView(btn.dataset.view); });
    });

    document.getElementById('file-input').addEventListener('change', function (e) {
      if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
      e.target.value = '';
    });

    document.getElementById('demo-button').addEventListener('click', function () {
      loadRecords(buildDemo());
    });

    document.getElementById('tracker-button').addEventListener('click', function () {
      loadFromTracker();
    });

    // Beim Öffnen direkt vorhandene Tracker-Daten laden (gleicher Browser)
    loadFromTracker(true);

    document.getElementById('baseline-toggle').addEventListener('change', function (e) {
      baselineOn = e.target.checked;
      renderTrend();
    });

    window.addEventListener('resize', function () {
      var active = document.querySelector('.view:not([hidden])');
      if (!active) return;
      if (active.id === 'view-trend') renderTrend();
      else if (active.id === 'view-heatmap') renderHeatmap();
    });

    document.getElementById('trend-canvas').addEventListener('click', trendPointer);
    document.getElementById('trend-canvas').addEventListener('pointermove', trendPointer);
    document.getElementById('heatmap-canvas').addEventListener('click', heatmapPointer);

    renderTrendChips();
    renderTrend();
    renderHeatmap();
    renderRisk();

    if ('serviceWorker' in navigator) {
      var updateToast = document.getElementById('update-toast');
      var reloadButton = document.getElementById('btn-reload');
      var dismissButton = document.getElementById('btn-dismiss-update');
      // Nur bei echten Updates anzeigen (nicht beim allerersten Install):
      var hadController = !!navigator.serviceWorker.controller;

      navigator.serviceWorker.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'UPDATE_READY' && hadController) {
          if (updateToast) updateToast.classList.add('is-visible');
        }
      });

      navigator.serviceWorker.register('./sw.js').catch(function () {
        // Offline-Cache ist optional; Fehler sind unkritisch.
      });

      if (reloadButton) {
        reloadButton.addEventListener('click', function () {
          window.location.reload();
        });
      }

      if (dismissButton) {
        dismissButton.addEventListener('click', function () {
          if (updateToast) updateToast.classList.remove('is-visible');
        });
      }
    }
  }

  // Version anzeigen (aus Meta-Tag <meta name="app-version">)
  (function () {
    var meta = document.querySelector('meta[name="app-version"]');
    var el = document.getElementById('app-version');
    if (meta && el) el.textContent = 'Version ' + meta.getAttribute('content');
  })();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();