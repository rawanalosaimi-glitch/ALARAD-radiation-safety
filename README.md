# ALARAD — Radiation Safety AI (Prototype)

AI-powered predictive radiation safety ecosystem — AI Readiness Hackathon KSA, Team ALARAD.

This build follows **Clean Architecture**: dependencies only point inward (Presentation →
Application → Domain), and Infrastructure is swappable without touching business rules.

## Folder structure

```
alarad-clean/
├── index.html                     # static shell — no inline JS, no business logic
├── css/
│   └── styles.css                 # all styling
└── src/
    ├── domain/                    # pure business rules — no DOM, no fetch, no framework
    │   ├── riskEngine.js          #   dose/risk math, anomaly detection, forecasting
    │   └── knowledgeEngine.js     #   RAG-style retrieval scoring
    │
    ├── infrastructure/            # stands in for a real DB / API — swap freely
    │   ├── mockRepository.js      #   staff, alerts, devices, knowledge base, policy table
    │   └── store.js               #   in-memory app state + pub/sub
    │
    ├── application/               # use cases — orchestrate domain + infrastructure
    │   ├── dashboardService.js
    │   ├── alertsService.js
    │   ├── staffService.js        #   staff, Employee ID ↔ device binding, RSO reporting
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
            └── policyView.js
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

## Running it

Because this uses native ES modules (`import`/`export`), it must be served over
**http(s)**, not opened directly as a `file://` path (browsers block module imports
from the filesystem). Two options:

```bash
# Option 1 — Python (already on most machines)
cd alarad-clean
python3 -m http.server 8000
# then open http://localhost:8000

# Option 2 — Node
npx serve alarad-clean
```

Or just push the whole `alarad-clean/` folder to GitHub Pages / Netlify — both serve
over https, so it works with no changes.

## Swapping in a real backend

- `infrastructure/mockRepository.js` → replace each `getX()` with a `fetch()` call to
  a real API. No other file changes.
- `domain/riskEngine.js`'s `BASELINE_RATES_USV_H` table and `seededSeries()` → replace
  with a trained time-series model's output (e.g. Prophet/LSTM fitted on real
  dosimeter history).
- `domain/knowledgeEngine.js`'s `scoreEntry()` keyword matching → replace with a
  cosine-similarity lookup against a real embeddings/vector-DB index. The RAG
  pipeline shape (Documents → Chunking → Embeddings → Vector DB → Retrieval →
  LLM → Answer + Source + Page) stays identical.

## Scope of the AI (important)

The AI layer only ever outputs a **risk score, forecast, or alert/recommendation**.
It never outputs a medical diagnosis or treatment decision. High-risk outputs require
review by a Radiation Safety Officer before escalation (human-in-the-loop, see the
Policy Mapping page).

## Data sources collected by the wearable

Radiation dose · Heart rate · Respiratory rate · Location (indoor GPS) · Work shift —
all tagged with the wearer's Employee ID and bound to a specific device
(see the **Wearable & Rotation** page for the Employee ID ↔ device binding table and
the staff-rotation handoff log).
