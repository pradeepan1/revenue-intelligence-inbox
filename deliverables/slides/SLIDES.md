# Five Submission Slides — Revenue Intelligence Inbox
**Candidate**: SpendNest Revenue Intelligence Team  
**Deliverable**: 5 Presentation Slides (available as `slides.pptx` and formatted below in Markdown)

---

## Slide 1: Manager Problem Solved & Three Critical Findings
*Taming noisy multi-channel signals into actionable pipeline intelligence with traceable citations*

### The Manager Problem
- A sales manager receives fragmented calls, meetings, and AI notes with silent audio and delayed revisions.
- Blindly relying on stored metadata leads to false pipeline numbers and misdirected coaching.
- **Our Solution**: Connects metadata directly to turn-level transcript evidence, separates call reps from calendar hosts, and preserves manual routing corrections across updates.

### Three Crucial Source Findings
1. **Finding 1 (M02 - LedgerBridge, Turn 1–3)**: Stored meeting classified as sales opportunity, but SpendNest is actually evaluating LedgerBridge as an e-invoicing supplier. Product choice: Routed to `Vendor / Internal Ops Note`, preventing false ARR inflation.
2. **Finding 2 (M07 - Willowfield Trust, Turn 2–8)**: Late transcript in revision 2 revealed severe production UI bug (silent failure of payment description save + recreate attachment block). Product choice: Routed immediately to P1 Engineering Bug ticket with turn citations.
3. **Finding 3 (C09 - Vedant, Exact Quote)**: Prospect Vedant referred rep to business head Rishabh with strict mandate: *"No, please don't use my name."* Product choice: Enforced explicit compliance coaching alert preventing rep outreach violation.

---

## Slide 2: Interface Choices & Deliberate Omissions
*Designed for rapid executive decision-making: high signal density, clear boundaries, zero vanity fluff*

### What We Intentionally Built
- **Interactive Replay Control Bar**: 1-click execution of the entire replay contract (initial import, shuffle test, override, update upsert, regression test).
- **Role Distinction**: Strictly isolates Call Outbound Reps (Arun, Meera, Leela, Kiran, Dev) from Meeting Calendar Hosts (`team08`, `team09`, etc.).
- **Three-Pane Evidence Workspace**: Raw envelope JSON, verbatim transcript turns with timestamps, and candidate-derived analysis side-by-side.
- **Live Manifest & Export Engine**: One-click export of machine-readable JSON/CSV manifests and organized markdown route files.

### What We Deliberately Left Out
- **No Fictitious Pipeline ARR Totals**: The data lacks verified contract values and win probabilities. We refused to invent arbitrary deal sizes.
- **No Automated Overwrite of Human Decisions**: When revision 2 arrived for M07, the app preserved the manager's manual route rather than wiping it.
- **No Substantive AI Analysis for Silent Intake**: 26 records had null transcripts (B01–B20, M05, etc.). We logged them as intake, refusing to fabricate summaries.
- **No Multi-Date Filters**: All 44 records occurred on 2026-08-21. A date picker adds clutter; we prioritized source-type, rep, and route filters.

---

## Slide 3: Routing Taxonomy & Difficult Routing Case
*Differentiated destinations matching operational reality, highlighted by M07's late arrival*

### Six-Pillar Routing Taxonomy
1. **Sales Coaching & Guidance (6)**: Evaluates objection handling (C01), competitive intel (C05, C06), and compliance (C09).
2. **Deal Next Steps (4)**: Actionable commercial follow-ups with stated owners (C03 Milan, C04 Lanternpath, C08 Raghav, M03 Asterloom).
3. **Customer Support & Escalations (3)**: Critical operational issues (M04 Card Migration Sunset, M07 P1 Bug, M09 Onboarding).
4. **Partner & Channel Onboarding (2)**: Referral agreements and commissions (C07 Willowbank, M01 Harborpath).
5. **Vendor / Internal Ops Notes (2)**: Procurement & training (M02 LedgerBridge supplier, M10 billing training).
6. **Voicemail / Gatekeeper & Unusable (27)**: Clean separation of non-conversational dials and administrative transfers (C02, B01–B20).

### The Difficult Case: M07 (Willowfield Trust)
- **Initial Delivery**: M07 arrived with `summary: null` and `transcript_payload: null` (Rev 1). Appeared as silent intake.
- **Manager Action**: Manager proactively overrides route based on customer communication to `Customer Support / Critical Bug Escalation`.
- **Update Delivery**: Batch `02_update` arrives with Revision 2 and 27 turns of screen-share troubleshooting.
- **The Resolution**: The system preserves the manager's manual route, flags the analysis as `Revision Updated (Pending Review)`, highlights turns 2–8 evidence, and avoids creating a duplicate conversation record.

---

## Slide 4: Verification of Numbers & Analytical Evidence
*Mathematical rigor and verifiable citations: testing denominators, revisions, and claims*

### Verifying Headline Numbers
- **Total Ingested Records (44)**: Verified 30 calls + 14 meetings. Ingesting `02_update` (1 record) does NOT increase count to 45 because `(source_type, source_id)` matches M07.
- **Transcript Coverage (17 -> 18)**: Initially 10 calls + 7 meetings = 17 (38.6%). Post-update: M07 adds 1 meeting = 18 (40.9%). Denominator is strictly 44 logical records.
- **Idempotency Test**: Shuffling initial batch and re-importing yields 0 duplicate records and 0 inflated transcripts.
- **Revision Precedence**: Re-importing `01_initial` after `02_update` safely ignores Revision 1 for M07; Revision 2 and 27 turns remain intact.

### Verifying Analytical Conclusions
- **Claim**: Asterloom Systems (M03) has prepaid vs credit objection.  
  *Evidence Check*: Turn 6 verbatim: *"Wait, these are prepaid? I had thought about a corporate credit card."* Verified in source turns.
- **Claim**: Willowbank (C07) agreed to review proposal.  
  *Evidence Check*: Quote: *"send whatever proposal you have... call on Monday."* Verified in call text.
- **Honest Uncertainty**: For C05 (StoreHarbor), the text does NOT establish contract expiration or switching intent. Marked explicitly as *"Does Not Establish"*.

---

## Slide 5: Trade-Offs, AI Usage, Limitations & Next Steps
*Transparent engineering accounting: rejected alternatives, pragmatic boundaries, and future vision*

### Trade-Offs & One Rejected Decision
- **Deliberately Rejected Decision**: Auto-overwriting manual manager routes upon receiving late revisions (e.g., M07).
- **Why Rejected**: Managers have offline context (verbal escalations, executive decisions). Erasing human input destroys user trust.
- **Accepted Trade-Off**: Route stays locked to manager's choice, but UI presents a prominent `Revision Updated` badge and diff inspector.
- **Pre-Generated vs Dynamic Analysis**: Analytical corpus pre-generated with deterministic rules; dynamic browser client executes live filtering, search, routing overrides, and export generation.

### Limitations & Production Roadmap
- **Current Scope**: 44 records on 2026-08-21; single-user browser localStorage persistence without cloud auth.
- **Hours Spent**: ~7 hours across data audit, engine design, UI development, test automation, and documentation.
- **Roadmap Step 1: Real-time Webhook Streaming**: Integrate live Zoom/Meet bot webhooks with automatic transcription pipelines.
- **Roadmap Step 2: Automated Telephony Diagnostics**: Integrate Twilio/telephony status callbacks to distinguish failed carrier handshakes from silent dials.
