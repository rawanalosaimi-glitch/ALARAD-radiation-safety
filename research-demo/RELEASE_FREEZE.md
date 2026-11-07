# ALARAD Research Demo v1.0 — RELEASE FREEZE RECORD
## SIMULATION / RESEARCH DEMO ONLY — NOT CLINICALLY VALIDATED
All data are simulated. No clinical, regulatory (NRRC/SDAIA), hospital-deployment, hardware or validated-ML claim is made or implied.

**Decision (independent review, 2026-11-04): APPROVED FOR RESEARCH DEMO RELEASE FREEZE.** Closure of N-01, N-02, N-03 and M-03 accepted on the supplied verification records.

## Frozen artifact (byte-identical to the reviewed candidate; do not modify)
| File | SHA-256 |
|---|---|
| `ALARAD_Prototype_Research_Demo_v1.0_FROZEN.html` (= `ALARAD_Prototype_Final_Release_Candidate.html`) | `3ff465583697e5896a32591a8516bffd003d22fb3dd50a48984ad694021b5c53` |
| `ALARAD_Final_Reproducible_Package.zip` (verification evidence, unchanged) | `aa339bbc671d97e7aa79130c2377aa82f411b6c07114a70f046331c36d493213` |
Lineage: untouched Phase-3 `736b8ab657665ef04178b311acb318495228f6d96891c3c08b4b7dcbb980b2e0` (original Phase-3 zip `7cac1155f239446507608f7e2e27e76fbbc685100f89e2288b1f2be6fc1ff59a`) → correction candidate `50ea28a7…d136bab` (superseded) → frozen release. The per-file manifest of every input/test/data file is `SHA256SUMS.txt` inside the package; evidence hashes in `hashes_evidence_sha256.txt`; the complete verification run is in `logs/` and `evidence/` (all gates pass, `logs/SUMMARY.md`).

## Verification basis (from the package)
436 existing checks + 64 targeted checks = 500 executed, 0 failed, 0 skipped; independent science 65/0 (+1 INFO); 13 scenarios 32/32; sweep 0/8,640 and 0/432 mismatches; policy 30/30; 4,000 valid inputs identical to Phase 2; Chromium UI audit 92/92 at 1440×900, 768×1024, 390×844.

## Remaining findings (documented, accepted for the research demo)
0 BLOCKER · 0 HIGH · 0 MEDIUM open. LOW: **L-02** `linearForecast([])` returns NaN (unreachable from the UI); **L-03** watch face shows "—" for a valid 0 reading (code inspection only); **L-05** Google Fonts are an external dependency (fallback fonts are used offline); **L-06** the app's "before" column wording for null/text input (the real Phase-2 engine threw an error). Mitigated: **L-04** the embedded Lab test card is static typed text, now labelled "STATIC RECORD — NOT LIVE VERIFICATION EVIDENCE". Full register: `Remaining_Findings_Register.csv`.

## Known limitations
- **Browsers: only Chromium 141 was tested. Firefox and WebKit/Safari: NOT TESTED.**
- Synthetic data only; passing tests show the software computes what it claims, not detection accuracy on real exposure. S10 (frozen sensor) remains a documented missed-event limitation; S3H is a purpose-built comparison scenario and must not be generalised.
- The immediate-alert threshold (0.35 mSv projected / 700 µSv/h at 30 min) is a configurable simulation assumption, not a regulatory limit.

## Change control
The frozen HTML and package must not be edited. Any future change must be a new, separately versioned artifact (e.g. v1.1) with its own hashes and verification run; verify this freeze with `sha256sum -c FROZEN_SHA256SUMS.txt`.
