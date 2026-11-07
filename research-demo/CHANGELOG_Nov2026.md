# ALARAD — Change Log and GitHub Check

Prepared: 2026-11-07. Sources: files and timestamps in this workspace, the project memory, and a public view of the GitHub repo.
Everything below is SIMULATION work. No clinical, regulatory, real-device or validated-ML claim is made anywhere.

## A. What was built, in order

| Date (2026) | Item | File / folder | What changed |
|---|---|---|---|
| Oct 14 | Clean Architecture refactor | `alarad-clean/` (css, src, index.html, README) + `alarad-clean.zip` | Monolithic HTML replaced by layered structure; wearable sources, device binding, rotation, security page, API JSON schema, AI-scope disclaimers, Policy Mapping page. Pushed to GitHub. |
| Oct 15 | Single-file prototype + QA | `ALARAD_Prototype.html`, `ALARAD_QA_Report.md` | One-file prototype and its QA report. |
| Nov 3 | Validation package | `ALARAD_Validation_Package.zip` | First validation round. |
| Nov 4 00:14 | Phase 3 | `ALARAD_Prototype_Phase3.html`, `ALARAD_Phase3_Package.zip` | Phase 3 build and tests. |
| Nov 4 09:26 | Verification package | `ALARAD_Final_Verification_Package.zip` | Final verification round. |
| Nov 4 09:52 | Correction package | `ALARAD_Prototype_Final_Candidate.html`, `ALARAD_Final_Correction_Package.zip` | Corrections after verification. |
| Nov 4 10:39 | Release candidate | `ALARAD_Prototype_Final_Release_Candidate.html`, `ALARAD_Final_Reproducible_Package.zip` | Reproducible package. |
| Nov 4 10:53 | v1.0 FROZEN | `ALARAD_Research_Demo_Release_v1.0_FROZEN.zip` | Frozen reference. Never modified afterwards. |
| Nov 4 11:37 | v1.1 | `ALARAD_Prototype_Research_Demo_v1.1_UI.html` | UI revision. |
| Nov 4 12:17 | v1.2 | `ALARAD_Prototype_Research_Demo_v1.2.html` | Clarity release. |
| Nov 4 12:34 | v1.2.1 | `ALARAD_Prototype_Research_Demo_v1.2.1.html` | Label correction. |
| Nov 4 13:07 | v1.2.2 | `ALARAD_Prototype_Research_Demo_v1.2.2.html` | Smartwatch manual report. |
| Nov 4 13:29 | v1.2.3 | `ALARAD_Prototype_Research_Demo_v1.2.3.html` | RSO response workflow: Report Received / Acknowledged by RSO / Response Initiated. 85 new workflow tests. |
| Nov 4 14:12 | Filter 2 slides (EN) | `ALARAD_Filter2_Prototype_Slides.pptx/.pdf`, evidence note, screenshots folder | Slides 6, 8, 9, 10 (How It Works, Prototype, Data and Tools, Testing). |
| Nov 4 14:16 | Filter 2 slides (AR) | `ALARAD_Filter2_Prototype_Slides_AR.pptx/.pdf` | Arabic version. |
| Nov 4 14:29 | Demo video | `ALARAD_v1.2.3_Demo_Video.mp4` | 197 s, English captions, no audio. |
| Nov 4 15:04 | Merge into team template | `Filter2_Team_with_ALARAD_Prototype_Slides.pptx` | Slides 6/8/9/10 (EN) and 22/24/25/26 (AR) filled. 24 other slides unchanged. |
| Nov 5 | Business model + team | `Filter2_Team_with_ALARAD_Prototype_Slides_v2.pptx` | Business model canvas (EN slide 13, AR slide 29), team members and roles (EN 15, AR 31). |
| Nov 5 | Arabic-only deck | `MED-FRWYRC_ALARAD_Filter2_AR.pptx` | Cover slide filled (ALARAD, MED-FRWYRC, track). English slides and the guidelines slide removed. 15 slides. |

## B. Test results used on the Filter 2 testing slide (all executed)

- v1.2.3 workflow tests 85/85; reference scenarios 32/32; policy 0 mismatches of 30; sweep 31/31 (8,640 runs); UI audit 92/92.
- Earlier suites: 92, 87, 114, 143, 64; science check 65 pass + 1 info.
- Wording suites 37 and 21; manual-report suite 74/74.
- Known and documented: `t_validation` 113/114 (legacy NaN-input check); `t_final_fixes` against the old baseline 20/64 (expected negative control).
- Chromium only. Firefox and WebKit were NOT tested.
- Test assertions changed for v1.2.3 (disclosed): the "Acknowledge" locator was narrowed to the button, and label expectations were updated.

## C. File fingerprints (SHA-256) — compare these with any file in GitHub

```
24fed44d84daf652ade0dc8e29748701e9578d56534a3c3a946d390165d2b9dc  ALARAD_Prototype.html
736b8ab657665ef04178b311acb318495228f6d96891c3c08b4b7dcbb980b2e0  ALARAD_Prototype_Phase3.html
50ea28a728023e7a13d2d7611437b783f7ab950db268a6f3d81381d05d136bab  ALARAD_Prototype_Final_Candidate.html
3ff465583697e5896a32591a8516bffd003d22fb3dd50a48984ad694021b5c53  ALARAD_Prototype_Final_Release_Candidate.html
35866ebc9389c44d90fa3f0dda33f1700980d855a9950d91f933af0fc71025a4  ALARAD_Prototype_Research_Demo_v1.1_UI.html
32b2af0e04dce8b058e16f87fa0077b8b1412c73509b258d8c6ef2c47d427cf2  ALARAD_Prototype_Research_Demo_v1.2.html
ad974e05a0308a2cae650efa2f4f6924b30ca086ba794623de27f3b269dc03fc  ALARAD_Prototype_Research_Demo_v1.2.1.html
54645b15240ed0fc82664a0f86051f316a9e68ede9f4e8eb2200d5530af3cbc2  ALARAD_Prototype_Research_Demo_v1.2.2.html
92e897dd0ff1738f083df829b53f7f46377e042b7019bb9776232792261182ee  ALARAD_Prototype_Research_Demo_v1.2.3.html
```

## D. GitHub check (https://github.com/rawanalosaimi-glitch/ALARAD-radiation-safety, public view, 2026-11-07)

- Branch `main`, 15 commits. No releases, no tags.
- Root files seen: `css/`, `src/`, `index.html`, `README.md`, `ALARAD_Knowledge_Base.csv`, `ALARAD_Prototype.html1.html`.
- This matches the Oct 14 Clean Architecture version (`alarad-clean/`), not the November work.
- Not seen anywhere in the repo page: v1.0 FROZEN, v1.1, v1.2.x, the test packages, the Filter 2 slides, the demo video, or the word "Filter 2". The README does not mention any version number.
- Still open from the earlier list: the misnamed file `ALARAD_Prototype.html1.html` is still in the root, and the README describes an `alarad-clean/` tree that does not match the repo root.

## E. What this check could NOT confirm

- Commit dates and messages (the commits page is blocked for automated reading).
- Files beyond the root listing (subfolders were not opened).
- Other branches or other repositories (the BEE-GUARD repo `bee-guard-simulation` was not reachable from this session).
- This session has no working GitHub login, so it did not push anything. The November work exists only in the files above.
- BEE-GUARD / BEE-CARE changes from earlier separate chats are not in this session's files, so they are not listed here.
