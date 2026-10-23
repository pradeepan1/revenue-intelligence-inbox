# 3-Minute Video Walkthrough Script & Narration Guide
**Recording Requirements**: Single continuous 3-minute screen recording with your own spoken voice narration.  
**Total Target Time**: 03:00 (180 seconds).  
**App to Open**: `d:\candidate\deliverables\app\index.html` (or `d:\candidate\app.html` in your browser).

---

## Timestamped Narration Guide

### Part 1: Introduction & Manager Workflow (0:00 – 0:55)
- **Screen Action**: Open the application in your browser. Show the top navigation bar, the KPI metric cards, and the split-screen conversation inbox. Hover over the metric cards (Total Records: 44, Usable Transcripts: 18).
- **Spoken Narration (Your Voice)**:
  > *"Hello, today I’m walking through our Revenue Intelligence Inbox built for SpendNest sales managers. A sales manager receives calls, meetings, and transcripts across multiple disconnected tools. Our goal is to transform this noisy intake into trustworthy pipeline decisions.*
  >
  > *On our main dashboard, you can see all 44 logical source records from August 21st, 2026. Notice our headline metric: 18 usable transcripts out of 44 total records—a 40.9% coverage rate. The remaining 26 records are silent telephony dials and empty meetings, which we preserve without inventing fake summaries.*
  >
  > *A key manager workflow is our team breakdown: we strictly separate call sales representatives—like Arun with 15 calls and Meera with 5—from meeting organizers, who are calendar hosts rather than closing salespeople. Clicking on any rep filters the entire inbox instantly."*

---

### Part 2: Difficult Routing Decision & Evidence Inspection (0:55 – 1:45)
- **Screen Action**: In the search bar or list, click on **M07 (Willowfield Trust)**. Show the detail workspace on the right. Point out the title, metadata, the verbatim transcript turns, and the candidate-derived analysis.
- **Spoken Narration (Your Voice)**:
  > *"Now let’s look at a difficult routing case: Meeting M07 with Willowfield Trust. In the initial delivery, M07 arrived with no transcript. But in the update batch, it arrived with 27 detailed turns from a screen-sharing session.*
  >
  > *If a manager only glanced at the title, they might treat this as a standard check-in. But inspecting Turn 2 and 3 reveals a severe production bug: the customer changes the payment description, clicks save, but the field fails silently and keeps the old text. In Turn 8, clicking 'Recreate payment' completely blocks document uploads.*
  >
  > *Rather than letting this sit as a sales deal, our engine immediately routes this to 'Customer Support / Critical Bug Escalation' with an actionable P1 bug report citing turns 2 through 8. It also links to our daily Manager Briefing to alert engineering leadership."*

---

### Part 3: Live Replay Contract & Override Preservation (1:45 – 2:45)
- **Screen Action**: Focus camera on the top **Replay Control Bar**. Perform the actions in order:
  1. Click **"1. Import Initial Batch (Rev 1)"** -> Toast shows: 44 records, 17 usable transcripts.
  2. Click **"2. Re-import Initial (Test Duplicates)"** -> Toast shows: 44 records (0 duplicates).
  3. Click **"3. Override M07 Route"** (or use the dropdown in M07 to change route to Customer Support) -> "✎ Manual Override" badge appears.
  4. Click **"4. Import Update Batch (Rev 2)"** -> Toast shows: M07 updated with 27 turns, transcripts increase to 18, manual override badge remains intact!
  5. Click **"5. Re-import Initial (Test Regress)"** -> Toast shows: Revision 1 safely ignored.
- **Spoken Narration (Your Voice)**:
  > *"Now let’s demonstrate the core replay contract that guarantees data integrity.*
  >
  > *First, I click Step 1: Initial Import. We ingest 44 unique records with 17 usable transcripts.*
  >
  > *Second, I click Step 2: Re-import Initial. Even with records shuffled, our identity key (source_type plus source_id) prevents duplicates. The record count stays exactly 44.*
  >
  > *Third, I manually correct M07’s route using our manager override dropdown, categorizing it as Customer Support. Notice the manual override badge and audit stamp.*
  >
  > *Fourth, I apply Step 4: Import Update Batch. Revision 2 arrives for M07 with its 27-turn transcript. Notice two critical behaviors: our usable transcript count increases from 17 to 18 without adding a duplicate 45th record, AND my manual route override is preserved! The system respects human judgment.*
  >
  > *Finally, Step 5: re-importing the old batch does not regress revision 2 back to revision 1."*

---

### Part 4: Export Generation & Conclusion (2:45 – 3:00)
- **Screen Action**: Switch to the **Exports & Manifest** tab. Show the 44-row manifest table. Click **"Download manifest.json"** or **"Download manifest.csv"**. Show the downloaded file.
- **Spoken Narration (Your Voice)**:
  > *"Finally, on our Exports tab, we provide a complete machine-readable manifest in JSON and CSV, mapping every conversation to its designated output file on disk. All 44 output markdown files are generated and ready for downstream systems.*
  >
  > *Thank you for reviewing SpendNest Revenue Intelligence!"*

---

## Recording Tips for the Candidate
1. **Tool to Use**: Use OBS Studio, Windows Game Bar (`Win + G`), Loom, or Zoom (record to computer).
2. **Audio**: Test your microphone before recording. Speak clearly and naturally.
3. **Format**: Record as MP4 or WebM, save as `deliverables/recording.mp4` or upload to private Google Drive/YouTube unlisted.
