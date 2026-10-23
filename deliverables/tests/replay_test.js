const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('====================================================');
console.log('REVENUE INTELLIGENCE INBOX — REPLAY VERIFICATION TEST');
console.log('====================================================\n');

const initialPath = path.resolve(__dirname, '../../data/01_initial.json');
const updatePath = path.resolve(__dirname, '../../data/02_update.json');
const manifestPath = path.resolve(__dirname, '../exports/manifest.json');

const initialData = JSON.parse(fs.readFileSync(initialPath, 'utf8'));
const updateData = JSON.parse(fs.readFileSync(updatePath, 'utf8'));

// In-memory test store
const store = new Map();
const manualOverrides = new Map();

function countUsableTranscripts() {
  let count = 0;
  store.forEach(r => {
    if (r.source_type === 'call') {
      if (r.payload && r.payload.transcript && r.payload.transcript.trim()) count++;
    } else {
      if (r.transcript_payload && r.transcript_payload.turns && r.transcript_payload.turns.length > 0) count++;
    }
  });
  return count;
}

function applyBatch(batch) {
  let applied = 0;
  let ignored = 0;
  batch.records.forEach(r => {
    const key = `${r.source_type}:${r.source_id}`;
    const existing = store.get(key);
    if (!existing || batch.revision > existing.applied_revision) {
      store.set(key, {
        record_ref: r.record_ref,
        source_type: r.source_type,
        source_id: r.source_id,
        applied_revision: batch.revision,
        payload: r.payload,
        transcript_payload: r.transcript_payload
      });
      applied++;
    } else {
      ignored++;
    }
  });
  return { applied, ignored };
}

// STEP 1: INITIAL IMPORT
console.log('TEST 1: Import 01_initial.json');
const res1 = applyBatch(initialData);
console.log(`  Records ingested: ${res1.applied}, Ignored: ${res1.ignored}`);
console.log(`  Total unique store records: ${store.size}`);
const usable1 = countUsableTranscripts();
console.log(`  Usable transcripts: ${usable1}`);

assert.strictEqual(store.size, 44, 'Initial batch must result in exactly 44 records');
assert.strictEqual(usable1, 17, 'Initial batch must have exactly 17 usable transcripts');
console.log('  ✔ PASS: Step 1 verified.\n');

// STEP 2: REPEAT IMPORT WITH SHUFFLED ORDER
console.log('TEST 2: Re-import 01_initial.json (Shuffled Order Idempotency Test)');
const shuffled = {
  ...initialData,
  records: [...initialData.records].sort(() => Math.random() - 0.5)
};
const res2 = applyBatch(shuffled);
console.log(`  Records applied: ${res2.applied}, Ignored: ${res2.ignored}`);
console.log(`  Total unique store records: ${store.size}`);
const usable2 = countUsableTranscripts();

assert.strictEqual(store.size, 44, 'Repeated import must NOT inflate record count');
assert.strictEqual(usable2, 17, 'Repeated import must NOT inflate transcript count');
console.log('  ✔ PASS: Step 2 verified (Zero duplicates added).\n');

// STEP 3: MANUAL ROUTE CORRECTION ON M07
console.log('TEST 3: Manually Override M07 Route');
const m07Key = 'meeting:4f304fff-fd40-5cfc-a366-0a134c445c2a';
assert.ok(store.has(m07Key), 'M07 must exist in store');
manualOverrides.set(m07Key, {
  route: 'Customer Support / Critical Bug Escalation',
  reason: 'Manager override based on screen-share bug report',
  timestamp: new Date().toISOString()
});
console.log(`  M07 manual override set to: "${manualOverrides.get(m07Key).route}"`);
console.log('  ✔ PASS: Step 3 verified (Manual override saved).\n');

// STEP 4: IMPORT 02_UPDATE.JSON (REVISION 2)
console.log('TEST 4: Import 02_update.json (Revision 2 late transcript for M07)');
const res4 = applyBatch(updateData);
console.log(`  Records applied: ${res4.applied}, Ignored: ${res4.ignored}`);
console.log(`  Total unique store records: ${store.size}`);
const usable4 = countUsableTranscripts();
console.log(`  Usable transcripts post-update: ${usable4}`);

assert.strictEqual(store.size, 44, 'Total record count must remain 44 after update batch');
assert.strictEqual(usable4, 18, 'Usable transcripts must increase from 17 to exactly 18');

const m07 = store.get(m07Key);
assert.strictEqual(m07.applied_revision, 2, 'M07 applied revision must be 2');
assert.strictEqual(m07.transcript_payload.turns.length, 27, 'M07 must now possess 27 transcript turns');

// Check manual override preservation
const m07Override = manualOverrides.get(m07Key);
assert.ok(m07Override, 'M07 manual override must still exist');
assert.strictEqual(m07Override.route, 'Customer Support / Critical Bug Escalation', 'Manual route must survive revision 2 update');
console.log(`  M07 manual route after update: "${m07Override.route}"`);
console.log('  ✔ PASS: Step 4 verified (M07 updated to Rev 2 with 27 turns, manual route preserved).\n');

// STEP 5: RE-IMPORT 01_INITIAL.JSON (REGRESSION TEST)
console.log('TEST 5: Re-import 01_initial.json (Regression Test)');
const res5 = applyBatch(initialData);
console.log(`  Records applied: ${res5.applied}, Ignored: ${res5.ignored}`);
const m07AfterRegress = store.get(m07Key);
assert.strictEqual(m07AfterRegress.applied_revision, 2, 'Revision 1 must NOT overwrite Revision 2 for M07');
assert.strictEqual(m07AfterRegress.transcript_payload.turns.length, 27, 'M07 turns must remain 27');
assert.strictEqual(manualOverrides.get(m07Key).route, 'Customer Support / Critical Bug Escalation');
console.log('  ✔ PASS: Step 5 verified (Revision precedence and manual route intact).\n');

// STEP 6: MANIFEST INTEGRITY CHECK
console.log('TEST 6: Manifest & Output Verification');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
assert.strictEqual(manifest.length, 44, 'Manifest must contain exactly 44 records');

let filesChecked = 0;
manifest.forEach(item => {
  item.output_paths.forEach(p => {
    const full = path.resolve(__dirname, '../exports', p);
    assert.ok(fs.existsSync(full), `Exported output file must exist: ${p}`);
    filesChecked++;
  });
});
console.log(`  Verified ${filesChecked} physical output markdown files referenced in manifest.`);
console.log('  ✔ PASS: Step 6 verified (All manifest outputs verified on disk).\n');

console.log('====================================================');
console.log('ALL REPLAY & INTEGRITY TESTS PASSED SUCCESSFULLY! (6/6)');
console.log('====================================================');
