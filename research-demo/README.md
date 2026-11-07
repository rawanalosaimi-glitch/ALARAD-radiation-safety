# ALARAD — Research Demo Archive (v1.0 FROZEN → v1.2.3)

**SIMULATION / RESEARCH DEMO ONLY — NOT CLINICALLY VALIDATED.** All data in every
file below is simulated. No clinical, regulatory (NRRC/SDAIA), hospital-deployment,
hardware, or validated-ML claim is made or implied anywhere in this archive.

This folder is a separate, self-contained lineage from the live app at the repository
root (`index.html` + `src/`, the Clean Architecture multi-facility prototype). It
archives an earlier, independently-developed single-file research-demo track — its own
simulation lab, fault-injection "Live Demo", smartwatch face, and RSO
acknowledge/response workflow — built and verified through Nov 4–5, 2026, and frozen at
v1.0 on 2026-11-04 after independent review. **Do not confuse the two**: this archive is
historical reference material, not the app this repository actively serves.

## What's here

```
research-demo/
├── README.md                      # this file
├── RELEASE_FREEZE.md              # v1.0 freeze decision, basis, and known limitations
├── FROZEN_SHA256SUMS.txt          # hashes for the frozen v1.0 artifact + its evidence
├── Remaining_Findings_Register.csv # full findings register (H/M/L), fix + retest status
├── CHANGELOG_Nov2026.md           # chronological build log, Oct 14 → Nov 5
├── releases/
│   ├── html/                      # single-file HTML snapshot of each version
│   │   ├── ALARAD_Prototype_Research_Demo_v1.0_FROZEN.html
│   │   ├── ALARAD_Prototype_Research_Demo_v1.1_UI.html
│   │   ├── ALARAD_Prototype_Research_Demo_v1.2.html
│   │   ├── ALARAD_Prototype_Research_Demo_v1.2.1.html
│   │   ├── ALARAD_Prototype_Research_Demo_v1.2.2.html
│   │   └── ALARAD_Prototype_Research_Demo_v1.2.3.html
│   └── packages/                  # each version's full package: tests, logs, evidence
│       ├── ALARAD_Final_Reproducible_Package.zip   # v1.0 FROZEN verification evidence
│       ├── ALARAD_Research_Demo_v1.1_UI_Revision.zip
│       ├── ALARAD_Research_Demo_v1.2_Clarity_Release.zip
│       ├── ALARAD_Research_Demo_v1.2.1_Label_Correction.zip
│       ├── ALARAD_Research_Demo_v1.2.2_Watch_Report.zip
│       └── ALARAD_Research_Demo_v1.2.3_RSO_Response.zip
└── demo/
    └── ALARAD_v1.2.3_Demo_Video.mp4   # 197 s, English captions, no audio
```

Every file above was verified against the SHA-256 hashes supplied with it before being
added to this repository (`FROZEN_SHA256SUMS.txt` for the v1.0 artifact; the original
upload manifest for everything else).

**Not yet included:** the Filter 2 pitch-deck slides (EN/AR, evidence note,
screenshots) — not ready at the time this archive was assembled. Add them under a new
`research-demo/filter2/` folder when available.

## Version lineage

| Version | File(s) | What changed |
|---|---|---|
| v1.0 FROZEN | `releases/html/..._v1.0_FROZEN.html` | Independently reviewed and **frozen** 2026-11-04. Byte-identical to the reviewed candidate; must not be edited — any further change is a new, separately versioned artifact. |
| v1.1 | `..._v1.1_UI.html` | UI revision. |
| v1.2 | `..._v1.2.html` | Clarity release. |
| v1.2.1 | `..._v1.2.1.html` | Label correction. |
| v1.2.2 | `..._v1.2.2.html` | Smartwatch manual report. |
| v1.2.3 | `..._v1.2.3.html` | RSO response workflow (Report Received / Acknowledged by RSO / Response Initiated); 85 new workflow tests. |

Full build order and dates: `CHANGELOG_Nov2026.md`. Full test/finding detail for the
v1.0 freeze: `RELEASE_FREEZE.md` and `Remaining_Findings_Register.csv`.

## Verification basis (v1.0 FROZEN)

436 existing checks + 64 targeted checks = 500 executed, 0 failed, 0 skipped;
independent science 65/0 (+1 info); 13 scenarios 32/32; sweep 0/8,640 and 0/432
mismatches; policy 30/30; 4,000 valid inputs identical to Phase 2; Chromium UI audit
92/92 at 1440×900, 768×1024, 390×844. **Only Chromium 141 was tested — Firefox and
WebKit/Safari were NOT tested**, here and across every version in this archive.

## Known limitations (apply across this whole archive)

- Synthetic/simulated data only. Passing tests show the software computes what it
  claims, not detection accuracy on real exposure.
- The immediate-alert threshold (0.35 mSv projected / 700 µSv/h at 30 min) is a
  configurable simulation assumption, not a regulatory limit.
- `linearForecast([])` returns `NaN` (unreachable from the UI); the smartwatch face
  shows "—" for a valid 0 reading (code inspection only, unreachable with current
  script data); Google Fonts is an external dependency (fallback fonts render offline).
  See `Remaining_Findings_Register.csv` (IDs L-02, L-03, L-05, L-06) for the complete,
  disclosed list — nothing here was fixed quietly.

## Running a snapshot

Each `releases/html/*.html` file is self-contained — open it directly in a browser
(Chromium recommended; Firefox/WebKit untested). Each `releases/packages/*.zip`
contains that version's own tests, logs, and evidence; see the package's own
manifest/README inside it for how to reproduce its verification run.
