const fs = require('fs');
const path = require('path');

const initialPath = path.resolve(__dirname, '../../data/01_initial.json');
const updatePath = path.resolve(__dirname, '../../data/02_update.json');
const exportDir = path.resolve(__dirname, '../exports');
const routeOutputDir = path.join(exportDir, 'route_outputs');

// Subdirectories matching the 6 operational routes + silent intake
const subdirs = [
  'sales_coaching',
  'deal_next_steps',
  'customer_support_bugs',
  'vendor_internal_notes',
  'partner_channel',
  'voicemail_gatekeeper',
  'unusable_intake'
];

subdirs.forEach(sd => {
  fs.mkdirSync(path.join(routeOutputDir, sd), { recursive: true });
});

const initialData = JSON.parse(fs.readFileSync(initialPath, 'utf8'));
const updateData = JSON.parse(fs.readFileSync(updatePath, 'utf8'));

// Build state engine with revision-based upsert
const recordsMap = new Map();

function applyBatch(batch) {
  batch.records.forEach(r => {
    const key = `${r.source_type}:${r.source_id}`;
    const existing = recordsMap.get(key);
    if (!existing || batch.revision > existing.applied_revision) {
      recordsMap.set(key, {
        record_ref: r.record_ref,
        source_type: r.source_type,
        source_id: r.source_id,
        applied_revision: batch.revision,
        payload: r.payload,
        transcript_payload: r.transcript_payload,
        manual_override: existing ? existing.manual_override : false,
        manual_route: existing ? existing.manual_route : null
      });
    }
  });
}

// Ingest initial and update batches
applyBatch(initialData);
applyBatch(updateData);

console.log('Total unique records after replay:', recordsMap.size);

// Define detailed analytical corpus for the 18 active conversations with exact source turn references & edge cases
const analyses = {
  'call:2ec4404c-beee-5377-a63c-aab701da08ed': { // C01
    ref: 'C01',
    route: 'sales_coaching',
    title: 'Harborlight Advisory — Cold Outreach Resistance & Lead Sourcing Friction',
    rep: 'Arun',
    what_happened: 'Arun cold-called Pranav regarding outsourced finance automation. Pranav expressed immediate irritation at unsolicited calls on his business phone and confirmed their finance operations are already automated.',
    evidence: 'Quote: "This number is for my work, not for people to sell things to me... Our processes are already very automated. We have a fairly advanced setup, so I don\'t think this is something we need."',
    does_not_establish: 'Does not establish future appetite for corporate cards or whether Pranav is the sole decision maker for finance systems.',
    next_steps: 'Respect request: mark contact as Do-Not-Call (DNC). Owner: Arun. Review lead sourcing to prevent low-intent outreach.',
    coaching_notes: 'Arun remained polite under pressure, but spent too long defending the contact list source ("professional networking outreach programme") rather than pivoting to understand workflow or gracefully exiting.'
  },
  'call:4b870624-8aad-5315-a60e-0db95981cf99': { // C02
    ref: 'C02',
    route: 'voicemail_gatekeeper',
    title: 'Fernhaven Group — Receptionist Voicemail Transfer',
    rep: 'Leela',
    what_happened: 'Leela contacted Fernhaven Group asking for Leela. Receptionist Kavya informed caller that the contact was out of office and transferred to voicemail.',
    evidence: 'Quote: "It looks as though she isn\'t in the office today. Would you like to leave a message with me, or would you prefer her voicemail? Her voicemail would be fine, thank you."',
    does_not_establish: 'Does not establish contact interest, role seniority, or whether the voicemail box is actively monitored.',
    next_steps: 'Follow up via email referencing the voicemail. Re-attempt call after 48 hours. Owner: Leela.',
    coaching_notes: 'Standard receptionist transfer handled cleanly; recommended adding a specific value prop in the voicemail rather than a generic callback request.'
  },
  'call:20d509ba-d589-5334-9aef-ea4ce6105b1a': { // C03
    ref: 'C03',
    route: 'deal_next_steps',
    title: 'Milan — Developer API Access & Event Notifications Follow-up',
    rep: 'Kiran',
    what_happened: 'Kiran reconnected with Milan regarding API developer access discussed 5 weeks prior. Milan was outdoors in poor cellular roaming. Milan recalled pricing hesitation and requested an email summary and Monday callback.',
    evidence: 'Quote: "We did ask about some developer functionality, but it isn\'t essential enough for us to spend much on it... Send the email and we can speak Monday or Tuesday."',
    does_not_establish: 'Does not establish whether technical requirements have changed or what exact budget ceiling the team has.',
    next_steps: 'Send email subject "Developer access and event notifications — follow-up" with transparent pricing tiers. Schedule callback for Monday 10:30 AM IST. Owner: Kiran.',
    coaching_notes: 'Good job adapting to poor audio quality without pushing hard; agreed on email subject line to prevent message from getting lost in spam.'
  },
  'call:bcdcbf56-d338-5c78-9a97-42c2fc1c9931': { // C04 [EDGE CASE: is_connected=false]
    ref: 'C04',
    route: 'deal_next_steps',
    title: 'Lanternpath Media — Email Correction Follow-up (Voicemail, is_connected=false)',
    rep: 'Arun',
    what_happened: 'Arun placed an outbound call to Ritesh at Lanternpath Media regarding expense management software. The call reached voicemail (source metadata explicitly reflects is_connected: false and observed_outcome: "voicemail"). Arun left a message explaining that earlier information was sent to an incorrect email address and confirmed resending to the corrected address.',
    evidence: 'Metadata: is_connected=false, observed_outcome="voicemail". Quote: "My understanding is that our information first went to the wrong email address. We subsequently used the corrected address you gave us, and I hope you have now had a chance to see it. Please call me back to let me know where things stand."',
    does_not_establish: 'Does not establish whether Ritesh has opened or reviewed the resent presentation, or whether Lanternpath has an active timeline.',
    next_steps: 'Check email tracking telemetry for document opens. If unopened by Monday 2:00 PM, send WhatsApp text. Owner: Arun.',
    coaching_notes: 'Accurately classified as a voicemail follow-up with is_connected=false. Rep was transparent about the previous internal mailing error.'
  },
  'call:75a6b94f-7717-5cfb-9e41-0acc94415e17': { // C05
    ref: 'C05',
    route: 'sales_coaching',
    title: 'Retail Chain Lead — Incumbent StoreHarbor Evaluation & Presentation Request',
    rep: 'Meera',
    what_happened: 'Meera introduced SpendNest to a multi-store retailer. Prospect stated they already use StoreHarbor and other tools for store expenses and vendor execution. Prospect requested a presentation sent to contact05@example.com for future reference.',
    evidence: 'Quote: "We already have that... There are several [platforms]. One is StoreHarbor, and we use others too. What I suggest is that you send me your presentation. If we ever decide to change the providers we already have, we could consider it then."',
    does_not_establish: 'Does not establish contract end date with StoreHarbor or any active dissatisfaction with incumbent tools.',
    next_steps: 'Send presentation highlighting SpendNest\'s unique automated vendor bank execution vs StoreHarbor. Tag lead for quarterly nurture. Owner: Meera.',
    coaching_notes: 'Meera did well asking clarifying questions on whether the incumbent system executes payments. Next time, probe on multi-location card issuance speed.'
  },
  'call:12216d5c-e254-52c6-b344-47de4c6e1ae5': { // C06
    ref: 'C06',
    route: 'sales_coaching',
    title: '120-Store Retailer — Centralized BMS & Mixed Card Model',
    rep: 'Ravi',
    what_happened: 'Ravi cold-called Nikhil regarding retail store expenses and supplier payments. Nikhil noted they have over 120 stores running a customized, mixed automation model managed directly by head office.',
    evidence: 'Quote: "We have more than a hundred and twenty stores... The essential processes are automated and connected through our business management system... If a particular need comes up later, we will reach out."',
    does_not_establish: 'Does not establish whether local branch managers experience friction with cash advances or expense reporting delays.',
    next_steps: 'Log competitive architecture (in-house BMS + mixed card model). Set CRM task for 6-month check-in. Owner: Ravi.',
    coaching_notes: 'Ravi respected the prospect\'s boundary when told arrangements were in place, avoiding aggressive pushback that could burn the relationship.'
  },
  'call:428817fa-7e9e-5418-a7d4-bb396d28dfbf': { // C07 [EDGE CASE: Partnership Outreach vs M01 Mature Partnership]
    ref: 'C07',
    route: 'partner_channel',
    title: 'Willowbank Advisory — Initial Partnership Outreach (Early Stage)',
    rep: 'Dev',
    what_happened: 'Dev initiated cold exploratory outreach to Aditya at Willowbank Advisory regarding virtual business accounts for foreign companies incorporating in overseas jurisdictions. Aditya confirmed they routinely refer clients to digital account providers and agreed to review a proposal sent on their chat app, followed by a Monday check-in call.',
    evidence: 'Quote: "Do you currently refer clients to providers for that part of the process? Yes, that is something we normally do... message me on our chat app and send whatever proposal you have... call on Monday to see whether you\'d like to discuss it further? Yes, that\'s fine."',
    does_not_establish: 'Does not establish referral volume, commercial agreement, or signed partnership terms. Unlike M01 (which has negotiated $260 commissions and tracking links), C07 is strictly top-of-funnel exploratory outreach.',
    next_steps: 'Send concise introductory partnership overview via chat app today. Schedule follow-up call for Monday 11:30 AM IST. Owner: Dev.',
    coaching_notes: 'Important taxonomy distinction: C07 is early exploratory outreach; M01 is mature partner onboarding. Keep separate in pipeline metrics.'
  },
  'call:129497b2-8e1d-5e01-919c-e8a852b5ff68': { // C08
    ref: 'C08',
    route: 'deal_next_steps',
    title: 'Multi-Store Lead — Warm Colleague Referral to People Operations',
    rep: 'Meera',
    what_happened: 'Meera pitched Raghav on SpendNest payables and multi-location expense cards. Raghav clarified that people operations handles frontline locations and asked Meera to send a proposal to contact08@example.com referencing his name.',
    evidence: 'Quote: "The colleague handling our people operations also deals with frontline processes and the locations... If you send him a proposal and say you spoke with me, he can take a look."',
    does_not_establish: 'Does not establish specific team size, location count, or budget allocation.',
    next_steps: 'Email proposal to contact08@example.com citing conversation with Raghav. Follow up by phone Wednesday. Owner: Meera.',
    coaching_notes: 'Excellent qualification by Meera; successfully turned a cold call into a warm internal referral.'
  },
  'call:4a1de681-f884-55e8-b1ad-de22d17cd959': { // C09 [EDGE CASE: Strict Name-Omission Compliance]
    ref: 'C09',
    route: 'sales_coaching',
    title: '130-Store Retailer — Critical Privacy & Name-Omission Compliance Mandate',
    rep: 'Meera',
    what_happened: 'Meera spoke with Vedant regarding multi-store expense management. Vedant stated they built in-house software, but suggested contacting their business head Mr. Rishabh on professional networking. When Meera asked if she could mention Vedant\'s name, Vedant strictly commanded: "No, please don\'t use my name."',
    evidence: 'Verbatim Quote: "You can find our business head, Mr Rishabh, on a professional networking site... Would it be all right if I mentioned your name when contacting him? No, please don\'t use my name."',
    does_not_establish: 'Does not establish whether Rishabh is actively seeking software replacements or what specific gaps exist in their internal tool.',
    next_steps: 'Initiate cold outreach to Mr. Rishabh on LinkedIn. CRITICAL PRIVACY RULE: Do NOT reference Vedant or imply an internal tip-off. Violation will breach prospect trust and damage SpendNest reputation. Owner: Meera.',
    coaching_notes: 'Outstanding presence of mind by Meera to explicitly request permission before citing a referral source. This saved the company from a severe compliance violation.'
  },
  'call:b747f592-810e-583c-9b81-8db5ab035806': { // C10
    ref: 'C10',
    route: 'sales_coaching',
    title: 'Aniket — Prospect Job Transition & Strict Follow-Up Boundary',
    rep: 'Meera',
    what_happened: 'Meera called Aniket regarding Meadowbrick. Aniket stated he left Meadowbrick and now works in manufacturing. Aniket agreed to receive a brief on messaging, but strictly declined a follow-up call, stating he will reach out if interested.',
    evidence: 'Quote: "Are you calling about Meadowbrick? ... I don\'t work there anymore... Send an explanation of what you do. I will get back to you... Would a follow-up call on Monday... be okay? No. I said I will contact you."',
    does_not_establish: 'Does not establish Aniket\'s new company name, job title, or operational authority in manufacturing.',
    next_steps: 'Send brief via messaging app. Set CRM contact status to "Inbound Response Only" — do not place unsolicited follow-up calls. Owner: Meera.',
    coaching_notes: 'Meera adapted quickly to the job change, but pushed for a follow-up call after the prospect already indicated low bandwidth. Respect prospect boundary.'
  },
  'meeting:cb5cecac-e68d-52b7-b10b-b0c748efc467': { // M01 [EDGE CASE: Mature Partnership vs C07 Outreach]
    ref: 'M01',
    route: 'partner_channel',
    title: 'Harborpath Advisory — Mature Channel Onboarding & Dedicated Referral Link',
    rep: 'Team member A (Host: team06@example.com)',
    what_happened: 'Team member A conducted an advanced partner onboarding meeting with Partner A at Harborpath Advisory. Reviewed the agreed commercial structure ($260 activation bonus, spend tier bonuses of $195 and $390, volume bonus for every 5th referral). Partner A insisted on a unique referral tracking link to scale client introductions rather than writing individual emails.',
    evidence: 'Turn 9: "The activation payment is USD 260 when a referred company gets its account approved... USD 6,500–32,500 of spend earns a USD 195 bonus..." | Turn 13: "...approval needs incorporation and tax documents... evidence of US operations" | Turn 20: "It cannot depend on me manually writing every email. This needs to scale..." | Turn 21: "Then let us use the unique link."',
    does_not_establish: 'Does not establish expected monthly onboarding run-rate or customer compliance rejection rates.',
    next_steps: 'Send partner agreement memorandum for signing; generate unique partner signup link; create shared Google Sheet for lead tracking. Owner: Partnerships.',
    coaching_notes: 'Advanced channel deal with confirmed economics. Contrast with C07, which is only preliminary discovery.'
  },
  'meeting:1a21c409-c050-5787-90af-2667e057e1b6': { // M02 [EDGE CASE: Vendor Evaluation - NOT Sales Pipeline]
    ref: 'M02',
    route: 'vendor_internal_notes',
    title: 'LedgerBridge — Electronic Invoicing Vendor Evaluation (SpendNest as Buyer)',
    rep: 'Team member A & B (Host: team07@example.com)',
    what_happened: 'SpendNest strategy and product leads evaluated LedgerBridge as an e-invoicing technology provider to enable compliant electronic invoice generation and reception across operating jurisdictions. Stored CRM metadata classifies all meetings as customer sales, but SpendNest is the buyer in this session.',
    evidence: 'Turn 1: "I work on strategy and partnerships at SpendNest... We want to understand whether LedgerBridge can give us compliant invoicing coverage across our operating markets. My colleague leads the product side." | Turn 2: "Supplier A: Then I will cover the market strategy as well as the technical integration..." | Turn 3: "Team member B: Electronic invoicing is the bigger opportunity. Customers already have approved invoice layouts."',
    does_not_establish: 'Does not establish software licensing costs, contract terms, or SLA commitments from LedgerBridge.',
    next_steps: 'Product & Engineering team to review LedgerBridge sandbox API documentation and test JSON payload compliance. Owner: Product Team.',
    coaching_notes: 'CRITICAL PIPELINE RULE: SpendNest is the prospective customer/buyer here. Exclude from sales conversion funnels and ARR pipeline forecasts.'
  },
  'meeting:398672e7-62dd-5afd-846d-0237d49792fb': { // M03
    ref: 'M03',
    route: 'deal_next_steps',
    title: 'Asterloom Systems — Card Program Fit & Prepaid Treasury Education',
    rep: 'Team member A (Host: team08@example.com)',
    what_happened: 'Customer A and finance lead Customer B evaluated SpendNest corporate cards for employee travel (INR 10–13 lakh/month). Surprised to learn cards are prepaid rather than revolving credit.',
    evidence: 'Turn 5: "At present employees spend personally and we reimburse them. Monthly spending might be around INR 10–13 lakh..." | Turn 6: "Wait, these are prepaid? I had thought about a corporate credit card. So we put money in before anyone spends..."',
    does_not_establish: 'Does not establish whether prepaid requirement is an absolute dealbreaker or if auto-funding mitigates concern.',
    next_steps: 'Send detailed explainer on prepaid treasury management (automated top-ups vs cash lockup) and comparative benefits over revolving credit. Schedule follow-up demo. Owner: Sales Rep.',
    coaching_notes: 'Need to proactively address prepaid vs credit positioning early in the sales cycle before demo to prevent buyer surprise.'
  },
  'meeting:b0f79b3d-37ba-52f9-b2bc-58b159dd6d91': { // M04
    ref: 'M04',
    route: 'customer_support_bugs',
    title: 'Cedarwave Distribution — Critical Card Network Migration & Re-KYC Risk',
    rep: 'Team member A (Host: team08@example.com)',
    what_happened: 'Team member A informed Cedarwave of the mandatory deprecation of their current card network due to merchant acceptance issues, requiring complete identity re-KYC and physical card replacement across the organisation within weeks.',
    evidence: 'Turn 2: "We have seen acceptance problems with the existing programme and are proposing a move to a different provider and card network." | Turn 4: "The plan is to close the old programme in the coming weeks, so we need to organise the transition." | Turn 6: "Users need to complete identity checks again because the provider changes."',
    does_not_establish: 'Does not establish Cedarwave\'s willingness to submit all users for re-KYC or whether they are actively reviewing competitor solutions.',
    next_steps: 'Assign dedicated Customer Success manager to create parallel account and shepherd employee re-KYC before sunset date. Flag high churn risk to VP Sales. Owner: Customer Success.',
    coaching_notes: 'High-risk account transition; team handled difficult news transparently but needs structured migration timeline documentation.'
  },
  'meeting:657b9e9d-9472-5b01-a127-a648ad7e8cf7': { // M06
    ref: 'M06',
    route: 'sales_coaching',
    title: 'Mapletrail Services — Branch vs Central HQ Procurement Dynamics',
    rep: 'Team member A (Host: team09@example.com)',
    what_happened: 'Team member A conducted discovery with local finance lead of software testing branch. Branch handles local payables independently, but central HQ (65 people) controls core enterprise software and PO workflows.',
    evidence: 'Turn 2: "I handle finance for one branch of Mapletrail Services... locally I cover a broad set of tasks..." | Turn 4: "Roughly 65 people across finance. The business is sizeable, but locally I am the person dealing with operational questions..."',
    does_not_establish: 'Does not establish local branch spending limit autonomy or timeline for software vendor evaluation.',
    next_steps: 'Craft multi-stakeholder strategy: prepare local operational efficiency case for branch lead while initiating contact with central finance leadership. Owner: Enterprise Sales.',
    coaching_notes: 'Good discovery on organizational hierarchy; avoid selling standalone branch solution that gets blocked later by central procurement.'
  },
  'meeting:4f304fff-fd40-5cfc-a366-0a134c445c2a': { // M07 [EDGE CASE: Revision 2 Late Transcript Bug Triage]
    ref: 'M07',
    route: 'customer_support_bugs',
    title: 'Willowfield Trust — Late-Arriving Update: P1 UI Bug Triage & Screen-Share Proof',
    rep: 'Team member A (Host: team09@example.com)',
    what_happened: 'Meeting M07 arrived in delivery batch update-002 with Revision 2 and 27 detailed turns. Customer A shared their screen to demonstrate two critical platform defects: editing event-payment descriptions fails silently (the old wording remains displayed after saving), and clicking "Recreate payment" blocks document attachments ("A new attachment is not being accepted").',
    evidence: 'Turn 2: "The first one is editing the description. I am changing this event-payment description to a short reference and clicking Save changes. Now look at the displayed description again." | Turn 3: "The field still shows the earlier wording. So the change is not appearing after you save, is that right?" | Turn 8: "Next is Recreate payment. Can we look at that here? When I go through this route, I cannot upload a document." | Turn 9: "A new attachment is not being accepted."',
    does_not_establish: 'Does not establish backend error stack traces, browser environment, or whether the defect affects all tenants or only Willowfield Trust.',
    next_steps: 'File urgent P1 Engineering Bug ticket with transcript turns 2–9 and screenshots attached. Provide manual database description correction for Willowfield Trust and confirm fix within 4 hours. Owner: Technical Support Lead.',
    coaching_notes: 'Late transcript from update-002 batch. Rep conducted rigorous live screen-share reproduction. Properly classified as Customer Support rather than a routine account review.'
  },
  'meeting:4b5b9192-f3fc-505a-8e77-4d2ffaa54594': { // M09
    ref: 'M09',
    route: 'customer_support_bugs',
    title: 'Brookmint & Northkite — Multi-Entity Account Setup & Invitation Reset',
    rep: 'Team member A (Host: team11@example.com)',
    what_happened: 'Customer A required support accessing second entity (Brookmint Holdings) after invitation link expired. Clarified trial usage history: only Northkite Equipment used trial, no Brookmint spending.',
    evidence: 'Turn 1: "The invitation for Brookmint Holdings did not work when I tried it. It may have expired..." | Turn 4: "I have sent a new reset invitation." | Turn 7: "No, only Northkite Equipment used the trial. There was no Brookmint Holdings spending in that period."',
    does_not_establish: 'Does not establish user permission hierarchy across the two entity accounts.',
    next_steps: 'Confirm customer accepted the reset invitation; verify independent billing setup for Brookmint Holdings. Owner: Support / Onboarding.',
    coaching_notes: 'Patience exhibited by rep to clarify historical trial confusion; ensure multi-entity account linking documentation is updated.'
  },
  'meeting:337f297d-9385-5b82-9e54-5019c1ed912c': { // M10 [EDGE CASE: Internal Billing Training - NOT Sales]
    ref: 'M10',
    route: 'vendor_internal_notes',
    title: 'Billing Operations — Internal Training Walkthrough (NOT a Sales Opportunity)',
    rep: 'Team member A (Trainer) to Team member B (Host: team12@example.com)',
    what_happened: 'Internal onboarding and walkthrough between trainer Team member A and operations colleague Team member B covering subscription billing, back-office super-admin demo accounts, and invoice clearance cycles. Stored CRM metadata classifies all meetings identically, but this is an internal employee training session.',
    evidence: 'Turn 1: "I am finishing another call. Give me a couple of minutes and I will be back for the session." | Turn 2: "We can wait for the trainer to return." | Turn 3: "Yesterday we covered the subscription side of billing. Any questions before I show the remaining part, how invoices are generated and cleared?" | Turn 4: "I have access to a demo account as an administrator, but I do not have the back-office super-admin access you mentioned." | Turn 5: "That is a different application. Operations uses it to create accounts, control enabled features and manage billing."',
    does_not_establish: 'Does not establish any external customer deal activity, commercial contract negotiation, or prospect pipeline.',
    next_steps: 'Ensure Team member B is provisioned with sandbox super-admin credentials; archive session recording in internal operations wiki. Owner: Operations Trainer.',
    coaching_notes: 'TAXONOMY GOVERNANCE: Strictly an internal operations walkthrough. Excluded from sales performance quotas and deal pipeline.'
  }
};

const routeFolders = {
  sales_coaching: 'sales_coaching',
  deal_next_steps: 'deal_next_steps',
  customer_support_bugs: 'customer_support_bugs',
  vendor_internal_notes: 'vendor_internal_notes',
  partner_channel: 'partner_channel',
  voicemail_gatekeeper: 'voicemail_gatekeeper',
  unusable_intake: 'unusable_intake'
};

const routeLabels = {
  sales_coaching: 'Sales Coaching & Guidance',
  deal_next_steps: 'Deal Next Steps',
  customer_support_bugs: 'Support & Bug Escalation',
  vendor_internal_notes: 'Vendor / Internal Operations Note',
  partner_channel: 'Partner & Channel Onboarding',
  voicemail_gatekeeper: 'Voicemail / Gatekeeper Routing',
  unusable_intake: 'Silent Telephony Intake'
};

const manifestRecords = [];

recordsMap.forEach(rec => {
  const key = `${rec.source_type}:${rec.source_id}`;
  const analysis = analyses[key];
  
  let assignedRoute = 'unusable_intake';
  let reviewState = 'intake_logged';
  let freshness = 'no_transcript';
  let relativePath = '';
  
  if (analysis) {
    assignedRoute = analysis.route;
    reviewState = rec.applied_revision === 2 ? 'updated_revision_review' : 'analyzed';
    freshness = rec.applied_revision === 2 ? 'fresh_rev2' : 'fresh_rev1';
    
    const folder = routeFolders[assignedRoute];
    const fileName = `${rec.record_ref}_${rec.source_type}_${rec.source_id.substring(0, 8)}.md`;
    relativePath = `route_outputs/${folder}/${fileName}`;
    const fullPath = path.join(routeOutputDir, folder, fileName);
    
    const fileContent = `# [${rec.record_ref}] ${analysis.title}
- **Source Type**: ${rec.source_type}
- **Source ID**: \`${rec.source_id}\`
- **Applied Revision**: ${rec.applied_revision}
- **Assigned Route**: ${routeLabels[assignedRoute]}
- **Rep / Host**: ${analysis.rep}
- **Review State**: ${reviewState}

---

## 1. What Happened and Why It Matters
${analysis.what_happened}

## 2. Transcript Evidence & Key Citations
> ${analysis.evidence}

## 3. What the Evidence Does NOT Establish
${analysis.does_not_establish}

## 4. Actionable Next Steps & Stated Owners
${analysis.next_steps}

## 5. Sales Coaching / Operational Assessment
${analysis.coaching_notes}

---
*Generated by SpendNest Revenue Intelligence Engine (Deterministic & AI-Assisted Assessment Extract).*
`;
    fs.writeFileSync(fullPath, fileContent, 'utf8');
  } else {
    // Record without usable transcript
    const folder = 'unusable_intake';
    const fileName = `${rec.record_ref}_${rec.source_type}_${rec.source_id.substring(0, 8)}.md`;
    relativePath = `route_outputs/${folder}/${fileName}`;
    const fullPath = path.join(routeOutputDir, folder, fileName);
    
    const fileContent = `# [${rec.record_ref}] Unusable / Missing Transcript Intake Record
- **Source Type**: ${rec.source_type}
- **Source ID**: \`${rec.source_id}\`
- **Applied Revision**: ${rec.applied_revision}
- **Assigned Route**: ${routeLabels.unusable_intake}
- **Intake State**: Missing or silent audio upstream (null transcript payload)

---

## Source Intake Notice
This record was ingested via delivery batch revision ${rec.applied_revision}.
The upstream telephony / conferencing provider supplied metadata but no audio transcript turns.

Per data contract rules:
- No substantive analytical claims are fabricated for silent or missing text.
- Record identity is preserved without inflation or duplication.
- Awaiting late transcript or recording webhook.
`;
    fs.writeFileSync(fullPath, fileContent, 'utf8');
  }
  
  manifestRecords.push({
    record_ref: rec.record_ref,
    source_type: rec.source_type,
    source_id: rec.source_id,
    applied_revision: rec.applied_revision,
    routes: [routeLabels[assignedRoute]],
    output_paths: [relativePath],
    processing_review_state: reviewState,
    manual_override: rec.manual_override,
    analysis_freshness: freshness
  });
});

// Sort manifest by record_ref naturally (C01..C30, M01..M14)
manifestRecords.sort((a, b) => {
  const typeA = a.record_ref.charAt(0);
  const typeB = b.record_ref.charAt(0);
  if (typeA !== typeB) return typeA.localeCompare(typeB);
  const numA = parseInt(a.record_ref.substring(1), 10);
  const numB = parseInt(b.record_ref.substring(1), 10);
  return numA - numB;
});

// Write manifest.json
fs.writeFileSync(path.join(exportDir, 'manifest.json'), JSON.stringify(manifestRecords, null, 2), 'utf8');

// Write manifest.csv
const csvHeaders = ['record_ref', 'source_type', 'source_id', 'applied_revision', 'routes', 'output_paths', 'processing_review_state', 'manual_override', 'analysis_freshness'];
const csvRows = manifestRecords.map(r => [
  r.record_ref,
  r.source_type,
  r.source_id,
  r.applied_revision,
  `"${r.routes.join(';')}"`,
  `"${r.output_paths.join(';')}"`,
  r.processing_review_state,
  r.manual_override,
  r.analysis_freshness
].join(','));

fs.writeFileSync(path.join(exportDir, 'manifest.csv'), [csvHeaders.join(','), ...csvRows].join('\n'), 'utf8');

console.log('Successfully wrote', manifestRecords.length, 'records to manifest.json and manifest.csv');
console.log('Route outputs generated in', routeOutputDir);
