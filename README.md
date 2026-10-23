# SpendNest — Revenue Intelligence Inbox
**Candidate Submission Package** | Volopay Revenue Intelligence & Growth Associate Assignment  
**App Entrypoint**: Open `app.html` (or `deliverables/app/index.html`) directly in any web browser.  
**Tested Environments**: Google Chrome, Microsoft Edge, Mozilla Firefox (No build step, zero dependencies, runs offline).  
**Automated Replay Test**: `node deliverables/tests/replay_test.js`

---

## 1. Quick Start & Execution Instructions

### Running the Web Application
No Node server, build tools, or API keys are required. The application is completely self-contained:
1. Double-click or open `d:\candidate\app.html` (or `d:\candidate\deliverables\app\index.html`) in your web browser.
2. The application opens directly in the final **post-update state** (44 unique records, 18 usable transcripts, 0 duplicates).
3. Use the top navigation tabs to switch between:
   - **Inbox & Evidence**: Inspect raw envelope JSON, turn-by-turn transcripts, and candidate-derived analysis.
   - **Dashboard & Team**: High-level metrics, rep breakdowns (Arun, Meera, Leela, Kiran, Dev), and meeting hosts (`team08`, `team09`, etc.).
   - **Manager Briefing**: Pre-generated executive briefing for 21 August 2026 (Asia/Kolkata).
   - **Exports & Manifest**: Machine-readable manifest with 1-click JSON/CSV download.

### Reproducing the Replay Verification Sequence
You can execute and verify the complete data contract replay protocol in two ways:

#### Option A: 1-Click Interactive Replay Bar (In the Web App)
At the top of the application, click the buttons in sequential order:
1. **Step 1: Import Initial Batch (Rev 1)**: Ingests `01_initial.json`. Total: 44 records, 17 usable transcripts.
2. **Step 2: Re-import Initial (Test Duplicates)**: Re-imports with shuffled order. Confirms idempotency: stays 44 records, 0 duplicates.
3. **Step 3: Override M07 Route**: Simulates manual manager correction on M07 to `Customer Support / Critical Bug Escalation`.
4. **Step 4: Import Update Batch (Rev 2)**: Ingests `02_update.json`. M07 receives 27 turns of late transcript; usable transcripts increase to 18; manual route remains active.
5. **Step 5: Re-import Initial (Test Regress)**: Tests revision precedence. Revision 1 does not overwrite Revision 2; M07 retains 27 turns and manual route.

#### Option B: Automated Headless Test Suite (Node.js)
Open PowerShell / Terminal in the project root and run:
```bash
node deliverables/tests/replay_test.js
```
*Expected Output*: All 6/6 contract tests pass with 100% assertions satisfied.

---

## 2. Directory Structure & Deliverables Map

```
d:\candidate\
├── app.html                                # Standalone web app (root shortcut)
├── README.md                               # This master documentation
├── deliverables\
│   ├── app\
│   │   └── index.html                      # Revenue Intelligence Inbox SPA
│   ├── exports\
│   │   ├── manifest.json                   # Machine-readable JSON manifest (44 records)
│   │   ├── manifest.csv                    # Machine-readable CSV manifest (44 records)
│   │   └── route_outputs\                  # 44 Individual markdown analytical files
│   │       ├── sales_coaching\             # C01, C05, C06, C09, C10, M06
│   │       ├── deal_next_steps\            # C03, C04, C08, M03
│   │       ├── customer_support_bugs\      # M04, M07 (Rev 2), M09
│   │       ├── partner_channel\            # C07, M01
│   │       ├── vendor_internal_notes\      # M02, M10
│   │       ├── voicemail_gatekeeper\       # C02
│   │       ├── unusable_intake\            # B01–B20, M05, M08, M11–M14 (26 silent records)
│   │       └── manager_brief_2026-08-21.md # Executive manager briefing (Asia/Kolkata)
│   ├── slides\
│   │   ├── slides.pptx                     # Professional 5-slide PowerPoint deck
│   │   └── SLIDES.md                       # Formatted markdown slides
│   ├── scripts\
│   │   ├── generate_exports.js             # Generator for exports & manifest
│   │   ├── build_app.js                    # Inliner & compiler for web app
│   │   ├── generate_slides.py              # python-pptx generator for presentation
│   │   └── VIDEO_RECORDING_SCRIPT.md       # Word-for-word 3-minute video narration guide
│   ├── tests\
│   │   └── replay_test.js                  # Automated 6-step contract verification test
│   └── event_plan\                         # Part 2: College Event Assignment
│       ├── COLLEGE_EVENT_PLAN.md           # Flagship Summit Event Plan (Timeline, Budget, Run of Show)
│       └── EVENT_WALKTHROUGH_SCRIPT.md     # 5–8 Minute Video Walkthrough Script
```

---

## 3. Metric Definitions & Interpretations

- **Total Ingested Records (44)**: The exact count of unique `(source_type, source_id)` tuples. Re-importing initial or update deliveries never inflates this count.
- **Usable Transcripts (17 Initial → 18 Post-Update)**: The number of records containing substantive text (`payload.transcript` for calls; `transcript_payload.turns > 0` for meetings).
- **Usable Transcript Coverage Rate**: Calculated as `Usable Transcripts / Total Records` = `18 / 44` = **40.9%**.
- **Silent / Unusable Telephony Intake (26)**: Records where upstream metadata was created, but audio recording was not captured (20 calls, 6 meetings). Preserved without fabricating analysis.
- **Call Rep vs Meeting Host Distinction**:
  - `rep_name` (Calls): Identifies the outbound sales representative (e.g., Arun 15, Leela 8, Meera 5, Kiran 1, Dev 1).
  - `organizer_email` (Meetings): Identifies the calendar host (e.g., `team08`, `team09`). **An organizer is not automatically the salesperson or attendee**.

---

## 4. Static vs Dynamic Analysis Architecture

- **Pre-Generated / Analytical Corpus**: The core analytical assessments (What happened, Evidence quotes, What evidence does NOT establish, Next steps, Sales coaching) were curated using deterministic rules and LLM assistance from the source records and stored in `deliverables/exports/route_outputs/`.
- **Dynamic Operations (Computed at Runtime)**:
  - Identity key deduplication and revision comparison (`revision 2 > revision 1`).
  - Active manual override tracking and persistence in browser `localStorage`.
  - Multi-attribute live filtering (search query, source type, rep/host, route, transcript state, review status).
  - Real-time client-side generation and download of `manifest.json` and `manifest.csv`.

---

## 5. Three Most Important Findings

### 1. Buyer vs Vendor Misclassification (Meeting M02 - LedgerBridge)
- **Source Citation**: Meeting M02, Turn 1 (*"I work on strategy and partnerships at SpendNest... We want to understand whether LedgerBridge can give us compliant invoicing coverage across our operating markets."*) and Turn 3 (*"Supplier A: Electronic invoicing is the bigger opportunity..."*).
- **Finding**: Stored metadata routinely classifies every customer interaction as sales pipeline. Here, SpendNest is the buyer evaluating an e-invoicing API supplier.
- **Product Impact**: Routed explicitly to `Vendor / Internal Operations Note` (Product/Procurement), removing it from the sales conversion funnel and preventing false ARR pipeline inflation.

### 2. P1 Production Bug in Late-Arriving Transcript (Meeting M07 - Willowfield Trust)
- **Source Citation**: Meeting M07, Turn 2 (*"The first one is editing the description. I am changing this event-payment description to a short reference and clicking Save changes. Now look at the displayed description again."*) and Turn 3 (*"The field still shows the earlier wording. So the change is not appearing after you save, is that right?"*); Turn 8 (*"When I go through this route, I cannot upload a document."*).
- **Finding**: M07 had null audio in initial delivery. The late transcript in revision 2 revealed two severe customer-facing bugs: payment description edits fail silently and document uploads are blocked on recreate payment.
- **Product Impact**: Classified as `Customer Support / Critical Bug Escalation`, generating an automated P1 engineering ticket with reproduction steps and turn citations, and triggering a retention risk alert in the Manager Briefing.

### 3. Strict Name-Omission Compliance Mandate (Call C09 - Vedant)
- **Source Citation**: Call C09, exact verbatim quote: *"You can find our business head, Mr Rishabh, on a professional networking site... Would it be all right if I mentioned your name when contacting him? No, please don't use my name."*
- **Finding**: Vedant provided a referral to his business head, but explicitly forbade using his name. Standard CRM auto-enrichment would tag this as a warm referral, prompting reps to reach out mentioning Vedant and destroying trust.
- **Product Impact**: Embedded in the Sales Coaching panel as a strict compliance alert: *"Outreach to Rishabh must be neutral/cold; DO NOT reference Vedant as referral source."*

---

## 6. One Deliberately Rejected Decision

- **Consideration**: Automatically overwriting manual manager routes whenever a newer revision (e.g. revision 2 in `02_update.json`) arrives.
- **Why Rejected**: Sales managers frequently possess human offline context (verbal customer escalation, executive relationship history, compliance constraints) that automated parsers do not have. Erasing human decisions destroys trust in the tool.
- **Accepted Trade-Off**: When revision 2 arrives with new conversation text, the product retains the manager's manual route, but displays a prominent `Revision Updated (Pending Review)` badge and opens a diff inspector so the manager can review the new transcript and update their route transparently.

---

## 7. Approximate Hours Spent & Known Limitations

- **Approximate Hours Spent**: ~7.5 hours (Data contract inspection & schema analysis: 1.5h; Engine logic & test suite: 1.5h; Frontend application & interactive replay UI: 2.5h; Analytical generation & documentation/slides/scripts: 2.0h).
- **Known Limitations**:
  - The extract covers activity on a single calendar day (2026-08-21); multi-day trend forecasting was omitted per guidelines.
  - Browser persistence relies on `localStorage`; a production system would back this with an authenticated PostgreSQL/Supabase database.
  - Telephony webhook diagnostics for the 20 silent calls (B01–B20) cannot determine upstream carrier drop cause without access to live telephony CDR logs.
