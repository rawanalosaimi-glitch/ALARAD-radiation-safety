# ALARAD — Radiation Safety AI (Prototype)

AI-powered predictive radiation safety ecosystem — AI Readiness Hackathon KSA, Team ALARAD.

This build follows **Clean Architecture**: dependencies only point inward (Presentation →
Application → Domain), and Infrastructure is swappable without touching business rules.
The interface is built so one deployment can serve multiple hospitals — see
**Hospital/Facility selection** below.

## Folder structure

```
.
├── index.html                     # static shell — no inline JS, no business logic
├── ALARAD_Knowledge_Base.csv      # full chunked RAG source dataset (2,800+ rows) —
│                                   #   raw reference material; the live "Ask ALARAD AI"
│                                   #   page runs against the small illustrative subset
│                                   #   hardcoded in src/infrastructure/mockRepository.js
├── css/
│   └── styles.css                 # all styling
└── src/
    ├── domain/                    # pure business rules — no DOM, no fetch, no framework
    │   ├── riskEngine.js          #   dose/risk math, anomaly detection, forecasting,
    │   │                           #   dose-status classification, department averages
    │   └── knowledgeEngine.js     #   RAG-style retrieval scoring
    │
    ├── infrastructure/            # stands in for a real DB / API — swap freely
    │   ├── mockRepository.js      #   per-facility staff/alerts/devices, knowledge base,
    │   │                           #   policy table, AI-inputs/data-sources/security docs
    │   └── store.js               #   in-memory app state (scoped to the active facility)
    │                               #   + pub/sub
    │
    ├── application/               # use cases — orchestrate domain + infrastructure
    │   ├── dashboardService.js
    │   ├── alertsService.js
    │   ├── staffService.js        #   staff, Employee ID ↔ device binding, floor layout,
    │   │                           #   RSO reporting
    │   ├── facilityService.js     #   list/switch the active hospital/facility
    │   ├── recommendationsService.js
    │   ├── anomalyService.js
    │   └── askAiService.js
    │
    └── presentation/              # DOM rendering + event wiring — no business logic
        ├── toast.js
        ├── navigation.js
        ├── main.js                #   composition root: wires every layer together
        └── views/
            ├── dashboardView.js
            ├── staffView.js
            ├── alertsView.js
            ├── recommendationsView.js
            ├── anomalyView.js
            ├── wearableView.js
            ├── emergencyView.js
            ├── askAiView.js
            ├── policyView.js
            ├── securityView.js
            └── facilityView.js
```

## Dependency rule

- `domain/` imports **nothing** from any other layer. Pure functions only.
- `application/` imports `domain/` and `infrastructure/`, never `presentation/`.
- `infrastructure/` imports nothing from `application/` or `presentation/`.
- `presentation/` imports `application/` (and `infrastructure/getX` read helpers for
  static reference data like the floor-plan layout), and is the only layer that
  touches `document`/DOM.

This means the entire radiation-risk model (`domain/riskEngine.js`) and the RAG
retrieval logic (`domain/knowledgeEngine.js`) can be unit-tested with zero DOM, zero
mocking, and zero browser — exactly what a judge would want to see.

## Hospital/Facility selection

The same interface is reused across multiple hospitals: a `🏥 Facility` switcher in the
topbar (Hospital A, Hospital B, Hospital C in this prototype) changes which facility's
staff, radiation doses, departments, alerts, recommendations, exposure log, and
wearable devices are shown, all driven from the facility-scoped state in
`infrastructure/store.js`. Switching does not reload the page.

## Running it

Because this uses native ES modules (`import`/`export`), it must be served over
**http(s)**, not opened directly as a `file://` path (browsers block module imports
from the filesystem). Two options:

```bash
# Option 1 — Python (already on most machines)
python3 -m http.server 8000
# then open http://localhost:8000

# Option 2 — Node
npx serve .
```

Or just push this repository to GitHub Pages / Netlify — both serve over https, so it
works with no changes.

## Swapping in a real backend

- `infrastructure/mockRepository.js` → replace each `getX()` with a `fetch()` call to
  a real API (including `getFacilities()` for the hospital list). No other file changes.
- `domain/riskEngine.js`'s `BASELINE_RATES_USV_H` table and `seededSeries()` → replace
  with a trained time-series model's output (e.g. Prophet/LSTM fitted on real
  dosimeter history).
- `domain/knowledgeEngine.js`'s `scoreEntry()` keyword matching → replace with a
  cosine-similarity lookup against a real embeddings/vector-DB index built from
  `ALARAD_Knowledge_Base.csv`. The RAG pipeline shape (Documents → Chunking →
  Embeddings → Vector DB → Retrieval → LLM → Answer + Source + Page) stays identical.

## Scope of the AI (important)

The AI layer only ever outputs a **risk score, forecast, or alert/recommendation**.
It never outputs a medical diagnosis or treatment decision. High-risk outputs require
review by a Radiation Safety Officer before escalation (human-in-the-loop, see the
Policy Mapping page).

The **AI Inputs** panel on the Anomaly Detection page is explicit about which inputs are
actually used by the computed model today (radiation dose, exposure duration, previous/
cumulative exposure) versus which are collected by the wearable but not yet wired into
the model (heart rate, respiratory rate, work shift) — labeled "proposed input" rather
than implying a live connection.

## Data sources collected by the wearable

Radiation dose · Heart rate · Respiratory rate · Location (indoor GPS) · Work shift —
all tagged with the wearer's Employee ID and bound to a specific device
(see the **Wearable & Rotation** page for the Employee ID ↔ device binding table,
each with its current shift, and the staff-rotation handoff log).

The **Data Security** page's "Data Sources" and "Proposed Security Architecture"
sections map these sources/controls explicitly and are labeled as prototype
documentation, not live integrations.

## Research demo archive (separate from this app)

[`research-demo/`](research-demo/) archives an earlier, independently-developed
single-file research-demo lineage (v1.0 FROZEN → v1.2.3), frozen 2026-11-04 after
independent review, with its full verification packages and a demo video. It is a
different app from the one in this repository root — see
[`research-demo/README.md`](research-demo/README.md) before opening anything in it.
The Filter 2 pitch-deck slides for that lineage were not ready yet when this archive
was assembled and are not included.
