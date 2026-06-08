import { useState, useEffect } from "react";

const MA_2024 = [
  { insurer: "UnitedHealthcare", denialRate: 12.8, approvalRate: 87.2, appealOverturnRate: 80.7, sourceUrl: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" },
  { insurer: "Centene", denialRate: 12.3, approvalRate: 87.7, appealOverturnRate: 93.6, sourceUrl: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" },
  { insurer: "Aetna (CVS Health)", denialRate: 11.9, approvalRate: 88.1, appealOverturnRate: 80.7, sourceUrl: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" },
  { insurer: "CVS Health (all contracts)", denialRate: 10.5, approvalRate: 89.5, appealOverturnRate: 89.7, sourceUrl: "https://www.kiplinger.com/retirement/medicare/medicare-advantage-plans-prior-authorization-denial-rates" },
  { insurer: "Kaiser Permanente", denialRate: 6.0, approvalRate: 94.0, appealOverturnRate: 80.7, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "Humana", denialRate: 5.8, approvalRate: 94.2, appealOverturnRate: 80.7, sourceUrl: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" },
  { insurer: "Anthem / Elevance Health", denialRate: 4.2, approvalRate: 95.8, appealOverturnRate: 80.7, sourceUrl: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" },
];

const ACA_2024 = [
  { insurer: "Oscar Health", denialRate: 25.3, approvalRate: 74.7, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "Anthem / Elevance Health", denialRate: 18.0, approvalRate: 82.0, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "Aetna (CVS Health)", denialRate: 22.0, approvalRate: 78.0, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "Molina Healthcare", denialRate: 22.0, approvalRate: 78.0, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "UnitedHealthcare", denialRate: 20.0, approvalRate: 80.0, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "BCBS (National Avg)", denialRate: 18.0, approvalRate: 82.0, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
  { insurer: "Kaiser Permanente", denialRate: 6.0, approvalRate: 94.0, sourceUrl: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
];

const CY2025_DATA = [
  { insurer: "UnitedHealthcare", approvalRate: 91.7, denialRate: 8.3, avgDecisionTime: "24 hours", note: "98% of claims did not require prior authorization. Nearly half of all PAs approved in real time.", sourceLabel: "UnitedHealthcare CMS Compliance Page", sourceUrl: "https://www.uhc.com/legal/cms-interoperability-prior-authorization", dataStatus: "CMS disclosure" },
  { insurer: "Cigna (Standard Requests)", approvalRate: 73.0, denialRate: 27.0, avgDecisionTime: "3.95 days", note: "ACA Marketplace / Individual plans on the federal exchange. Appeal overturn rate: 16%.", sourceLabel: "Cigna CMS Prior Authorization Disclosure Report (PDF)", sourceUrl: "https://www.cigna.com/static/www-cigna-com/docs/cms-annual-prior-authorization-statistics-2025.pdf", dataStatus: "CMS disclosure" },
  { insurer: "Cigna (Expedited Requests)", approvalRate: 78.0, denialRate: 22.0, avgDecisionTime: "1.53 days", note: "Expedited (urgent) requests for ACA Marketplace / Individual plans on the federal exchange.", sourceLabel: "Cigna CMS Prior Authorization Disclosure Report (PDF)", sourceUrl: "https://www.cigna.com/static/www-cigna-com/docs/cms-annual-prior-authorization-statistics-2025.pdf", dataStatus: "CMS disclosure" },
  { insurer: "Aetna (CVS Health)", approvalRate: 95.0, denialRate: 5.0, avgDecisionTime: "Under 24 hours", note: "Company-reported CVS Health/Aetna statement: more than 95% of eligible prior authorizations approved within 24 hours, with 77% of electronic PAs approved in real time. This is not presented as a standardized CMS disclosure table.", sourceLabel: "CVS Health Press Release, Jan 2026", sourceUrl: "https://www.cvshealth.com/news/company-news/cvs-health-makes-health-insurance-simpler-and-more-affordable-for-americans.html", dataStatus: "Company-reported data" },
  { insurer: "Oscar Health (All Markets - Standard Requests)", approvalRate: 81.69, denialRate: 18.31, avgDecisionTime: "3.7 days", note: "2025 All Markets prior authorization utilization statistics. Standard prior authorizations approved: 81.69%. Standard adverse determinations (including total and partial): 18.31%. Prior authorization appeals approved: 42.69%.", sourceLabel: "Oscar Health 2025 All Markets Prior Authorization Utilization Statistics (PDF)", sourceUrl: "https://www.hioscar.com/prior-authorization-statistics", dataStatus: "CMS disclosure" },
  { insurer: "Oscar Health (All Markets - Expedited Requests)", approvalRate: 82.39, denialRate: 17.61, avgDecisionTime: "1.4 days", note: "2025 All Markets prior authorization utilization statistics. Expedited prior authorizations approved: 82.39%. Expedited adverse determinations (including total and partial): 17.61%. Prior authorization appeals approved: 42.69%.", sourceLabel: "Oscar Health 2025 All Markets Prior Authorization Utilization Statistics (PDF)", sourceUrl: "https://www.hioscar.com/prior-authorization-statistics", dataStatus: "CMS disclosure" },
  { insurer: "Braven Health (Medicare Advantage - Standard Requests)", approvalRate: 99.5, denialRate: 0.5, avgDecisionTime: "3 days", note: "2025 prior authorization metrics. Standard prior authorizations approved: 99.5%. Denied: 0.5%. Appeals approved: 96.2%.", sourceLabel: "Horizon Blue Cross Blue Shield NJ Prior Authorization Reports", sourceUrl: "https://www.horizonblue.com/prior-authorization-reports", dataStatus: "Plan-reported data" },
  { insurer: "Braven Health (Medicare Advantage - Expedited Requests)", approvalRate: 99.8, denialRate: 0.2, avgDecisionTime: "1 day", note: "2025 prior authorization metrics. Expedited prior authorizations approved: 99.8%. Denied: 0.2%. Appeals approved: 96.2%.", sourceLabel: "Horizon Blue Cross Blue Shield NJ Prior Authorization Reports", sourceUrl: "https://www.horizonblue.com/prior-authorization-reports", dataStatus: "Plan-reported data" },
  { insurer: "Horizon NJ FamilyCare (Medicaid - Standard Requests)", approvalRate: 82.3, denialRate: 17.7, avgDecisionTime: "7 days", note: "2025 prior authorization metrics. Standard prior authorizations approved: 82.3%. Denied: 17.7%. Appeals approved: 25.3%.", sourceLabel: "Horizon Blue Cross Blue Shield NJ Prior Authorization Reports", sourceUrl: "https://www.horizonblue.com/prior-authorization-reports", dataStatus: "Plan-reported data" },
  { insurer: "Horizon NJ FamilyCare (Medicaid - Expedited Requests)", approvalRate: 90.7, denialRate: 9.3, avgDecisionTime: "2 days", note: "2025 prior authorization metrics. Expedited prior authorizations approved: 90.7%. Denied: 9.3%. Appeals approved: 25.3%.", sourceLabel: "Horizon Blue Cross Blue Shield NJ Prior Authorization Reports", sourceUrl: "https://www.horizonblue.com/prior-authorization-reports", dataStatus: "Plan-reported data" },
  { insurer: "Horizon NJ TotalCare (HMO D-SNP - Standard Requests)", approvalRate: 97.3, denialRate: 2.7, avgDecisionTime: "6 days", note: "2025 prior authorization metrics. Standard prior authorizations approved: 97.3%. Denied: 2.7%. Appeals approved: 74.4%.", sourceLabel: "Horizon Blue Cross Blue Shield NJ Prior Authorization Reports", sourceUrl: "https://www.horizonblue.com/prior-authorization-reports", dataStatus: "Plan-reported data" },
  { insurer: "Horizon NJ TotalCare (HMO D-SNP - Expedited Requests)", approvalRate: 99.9, denialRate: 0.1, avgDecisionTime: "1 day", note: "2025 prior authorization metrics. Expedited prior authorizations approved: 99.9%. Denied: 0.1%. Appeals approved: 74.4%.", sourceLabel: "Horizon Blue Cross Blue Shield NJ Prior Authorization Reports", sourceUrl: "https://www.horizonblue.com/prior-authorization-reports", dataStatus: "Plan-reported data" },
  { insurer: "Alabama Medicaid (Standard Requests)", approvalRate: 90.0, denialRate: 10.0, avgDecisionTime: "2 days", note: "2025 prior authorization metrics. Standard prior authorizations approved: 90%. Denied: 10%. Appeals data was suppressed or unavailable due to low volume.", sourceLabel: "Alabama Medicaid Prior Authorization Metrics 2025 (PDF)", sourceUrl: "https://medicaid.alabama.gov/content/2.0_Newsroom/2.9_CMS_Required_Reports/2.9.1_Prior_Authorization_Metrics.aspx", dataStatus: "CMS disclosure" },
  { insurer: "Alabama Medicaid (Expedited Requests)", approvalRate: 81.0, denialRate: 19.0, avgDecisionTime: "Same day", note: "2025 prior authorization metrics. Expedited prior authorizations approved: 81%. Denied: 19%. Decision time reported as same day.", sourceLabel: "Alabama Medicaid Prior Authorization Metrics 2025 (PDF)", sourceUrl: "https://medicaid.alabama.gov/content/2.0_Newsroom/2.9_CMS_Required_Reports/2.9.1_Prior_Authorization_Metrics.aspx", dataStatus: "CMS disclosure" },
  { insurer: "Security Health Plan (BadgerCare Medicaid - Standard Requests)", approvalRate: 87.7, denialRate: 12.3, avgDecisionTime: "1 day", note: "2025 prior authorization metrics. Standard prior authorizations approved: 87.7%. Denied: 12.3%. Appeals approved: 690 requests.", sourceLabel: "Security Health Plan Prior Authorization Metrics 2025 (PDF)", sourceUrl: "https://www.securityhealth.org/", dataStatus: "Plan-reported data" },
  { insurer: "Security Health Plan (BadgerCare Medicaid - Expedited Requests)", approvalRate: 92.2, denialRate: 7.8, avgDecisionTime: "0.6 days", note: "2025 prior authorization metrics. Expedited prior authorizations approved: 92.2%. Denied: 7.8%. Appeals approved: 34 requests.", sourceLabel: "Security Health Plan Prior Authorization Metrics 2025 (PDF)", sourceUrl: "https://www.securityhealth.org/", dataStatus: "Plan-reported data" },
  { insurer: "Sendero Health Plans (TX)", approvalRate: null, denialRate: null, avgDecisionTime: "Not published", note: "Sendero's published URL resolves to a Transparency in Coverage page containing machine-readable pricing files, including in-network rates and allowed amounts. Prior authorization metrics required under CMS-0057-F, including approval rates, denial rates, decision timeframes, and appeal outcomes, were not present at the reviewed location.", sourceLabel: "Sendero Health Plans Transparency in Coverage Page", sourceUrl: "https://www.senderohealth.com/transparency", dataStatus: "No CMS-0057-F metrics found" },
  { insurer: "Utah Medicaid FFS (Standard Requests)", approvalRate: 97.0, denialRate: 3.0, avgDecisionTime: "4.81 days", note: "2025 prior authorization metrics. Standard prior authorizations approved: ~97%. Denied: ~3%. Total standard requests: 30,072. Extended requests included: 182 approved with extension (~1%), 11 denied with extension (~0%). Appeals data not separately reported.", sourceLabel: "Utah Medicaid Prior Authorization Annual Metrics Report 2025 (PDF)", sourceUrl: "https://medicaid.utah.gov/interoperability", dataStatus: "CMS disclosure" },
  { insurer: "Utah Medicaid FFS (Expedited Requests)", approvalRate: 98.0, denialRate: 2.0, avgDecisionTime: "4.48 days", note: "2025 prior authorization metrics. Expedited prior authorizations approved: ~98% (92 of 94 requests). Denied: ~2% (2 of 94 requests). Utah Medicaid reported an average expedited decision time of 4.48 days.", sourceLabel: "Utah Medicaid Prior Authorization Annual Metrics Report 2025 (PDF)", sourceUrl: "https://medicaid.utah.gov/interoperability", dataStatus: "CMS disclosure" },
  { insurer: "Wyoming Medicaid CME / Magellan (Standard Requests)", approvalRate: 100.0, denialRate: 0.0, avgDecisionTime: "8 calendar days", note: "2025 prior authorization metrics. Standard prior authorizations approved: 100%. Denied: 0%. No expedited requests were reported.", sourceLabel: "Wyoming Medicaid Prior Authorization Metrics 2025 (PDF)", sourceUrl: "https://health.wyo.gov/healthcarefin/medicaid/cms-interoperability-prior-authorization-rule-compliance/", dataStatus: "CMS disclosure" },
  { insurer: "Wyoming Medicaid Utilization Management (Standard Requests)", approvalRate: 87.0, denialRate: 13.0, avgDecisionTime: "3 days", note: "2025 prior authorization metrics. Standard prior authorizations approved: 87%. Denied: 13%. Appeals approved: 25%. No expedited requests reported.", sourceLabel: "Wyoming Medicaid Prior Authorization Metrics 2025 (PDF)", sourceUrl: "https://health.wyo.gov/healthcarefin/medicaid/cms-interoperability-prior-authorization-rule-compliance/", dataStatus: "CMS disclosure" },
  { insurer: "Wyoming Medicaid HCBS (Standard Requests)", approvalRate: 100.0, denialRate: 0.0, avgDecisionTime: "<24 hours", note: "2025 prior authorization metrics. Standard prior authorizations approved: 100%. Denied: 0%. No expedited process reported.", sourceLabel: "Wyoming Medicaid Prior Authorization Metrics 2025 (PDF)", sourceUrl: "https://health.wyo.gov/healthcarefin/medicaid/cms-interoperability-prior-authorization-rule-compliance/", dataStatus: "CMS disclosure" },
];

// ─── INSIGHTS DATA ────────────────────────────────────────────────────────────

const SECTION_HEADINGS = [
  "The Work That Happens Before the Answer",
  "The Work That Happens After the Denial",
  "What the Published Numbers Are Not Showing",
  "What The Appeal Process Is Really Revealing",
  "The Denial Category Is Hiding Operational Failure",
  "The Cost Is Not Just The Denial",
  "Why Denial Rates Alone Are Incomplete",
  "What CMS Actually Required",
  "What the Data Actually Shows",
  "The Concentration Problem",
  "Why This Matters Beyond the Numbers",
  "What This Actually Means",
  "What UnitedHealthcare Actually Changed",
  "Why the Impact Depends on What Was Removed",
  "What This Announcement Does and Does Not Address",
  "Follow the Data",
  "When the Problem Is Not Clinical",
  "Why the Category Matters",
  "What Aggregate Reporting Hides",
];

const SUB_HEADINGS = [
  "Category 1: No page exists at all.",
  "Category 2: A page exists but contains the wrong data.",
  "Category 3: A page exists but is functionally inaccessible.",
  "Category 4: The data exists but is not machine-readable or comparable.",
];

const INSIGHTS_POSTS = [
    {
    slug: "the-denial-rate-has-a-resolution-problem",
    title: "The Denial Rate Has a Resolution Problem",
    date: "June 7, 2026",
    readTime: "5 min read",
    excerpt: "Prior authorization denial rates are reported as a single outcome category. The operational pathways producing those denials are not reported at all.",
    content: `Prior authorization denial rates are reported as a single outcome category. The operational pathways producing those denials are not reported at all.

Across multiple conversations involving utilization management and hospital operations, several examples surfaced where the denial did not originate from clinical disagreement but from workflow handling, classification structure, eligibility timing, or submission mechanics occurring elsewhere in the process. Those distinctions disappear once the event enters aggregate reporting.

When the Problem Is Not Clinical

One source described a preventative test denied because the service was not recognized as preventative within the claims workflow.

“We had a preventative test done, and the insurance didn’t pay it because the claims person in the claims department didn’t know it was preventative.”

Another described denials originating from submission pathway issues rather than from the underlying clinical request.

“It doesn’t have anything to do with clinical, you just didn’t click the right button.”

In both cases, the denial appeared within reporting data despite the breakdown occurring outside clinical review entirely.

The correction pathway afterward depends on where the workflow failed. A classification issue may require coding correction and resubmission. A submission pathway failure may require identifying where the routing structure broke down in the first place. The reported denial outcome does not preserve those distinctions.

When the Workflow and Eligibility System Disagree

A utilization review executive described a separate category involving eligibility synchronization gaps between systems.

“Some of our payers don’t update us on the eligibility of the patients for up to 15 days after they’ve terminated their coverage.”

A patient could appear active within the provider’s operational environment while payer termination records had already updated elsewhere. The authorization pathway looked valid at the time of submission. The clinical documentation may be correct. The submission pathway may also be correct. The denial still originates from a timing discrepancy between systems that are supposed to reflect the same coverage status but do not update simultaneously.

What the Denial Rate Compresses Together

As public prior authorization reporting expands, denial percentages will likely become among the most visible metrics associated with payer behavior. But the operational structure underneath those denials is considerably more variable than the reporting suggests.

As one source noted, the detail that explains those differences does not travel into the claims data.

“You’re not going to see what we’re talking about here in the claims data.”

The denial rate captures the outcome. The operational pathway that produced the denial is often much harder to see.

---

The Prior Auth Report launches in late July with ongoing analysis of prior authorization operations, payer workflow variation, denial activity, and the evolving transparency landscape surrounding utilization management data. The waitlist is open below.`,
  },
  {
    slug: "before-the-decision-and-after-it",
    title: "Before the Decision and After It: The Hidden Labor Cost of Prior Authorization",
    date: "May 31, 2026",
    readTime: "6 min read",
    excerpt: "Across interviews with utilization management and hospital operations professionals, a recurring pattern emerged: prior authorization metrics capture outcomes, while the operational burden surrounding those outcomes remains completely invisible.",
    content: `The public conversation about prior authorization tends to focus on a single moment: the decision. A request goes in, the payer approves it or denies it, the outcome gets recorded, and the metric gets published. But the people actually operating inside these systems describe something significantly more complicated than that.

Across multiple interviews with people working in utilization management and hospital operations, two patterns kept surfacing independently — one on each side of the decision. Before the decision, administrative work is being generated at a scale the outcome data does not reflect. After the decision, a denial can trigger an entirely new layer of operational burden that remains invisible in the published metrics as well.

Together, those two patterns suggest that prior authorization metrics are describing outcomes while leaving much of the operational structure underneath them unseen.

The Work That Happens Before the Answer

Mark Tate spent years working on utilization management modernization. He described a workflow problem that sits underneath many of the prior authorization metrics being publicly discussed right now.

His team reviewed 100 percent of prior authorization requests. Only about 20 percent were ever denied.

"We are doing utilization review on 100% of all the requests," he said, "but only 20% of them are the ones that end up getting denied."

The operational question his team kept returning to was not simply why denials occur. It was whether anyone could identify the denial-likely cases upfront rather than applying the same level of review across the entire request volume.

"Is there a way we could just identify those 20% instead of having to do 100% audit?"

Nobody had cleanly solved it. They still haven't.

That means for every request moving through the prior authorization process — including the large majority ultimately headed toward approval — provider offices are still gathering documentation, navigating payer-specific portals, tracking authorization status, and managing communication across multiple systems before the outcome is known. The administrative burden does not scale down to reflect the likelihood of approval. It runs at full volume regardless of where the case is headed.

The Work That Happens After the Denial

The administrative burden does not stop when the denial is issued. For hospital-based teams, a denial can become the beginning of an entirely new operational process.

One hospital operations leader described it this way:

"How many extra nurses do they have to pay time to look at it again? Or admin coordinators? How many people in our revenue cycle had to touch that bill again?"

A single denied authorization can trigger repeated chart review, appeals workflow initiation, claim reconstruction, resubmission processes, and revenue cycle intervention. Outside vendors sometimes become involved to manage the appeal, and some take a percentage of whatever they recover.

And if the denial is eventually overturned, all of that additional labor happened to reach the same final outcome that could have been reached earlier in the process.

What the Published Numbers Are Not Showing

The CMS prior authorization transparency mandate created public visibility into prior authorization outcomes for the first time. But the workflows underneath those outcomes are considerably more operationally complex than the reporting structure implies.

The visible metrics describe the decision itself. They do not describe the amount of administrative movement surrounding the request before the outcome was reached, or the repeated operational handling that can continue long after the decision is made.

Prior authorization analysis built entirely around approval rates, denial rates, and overturn rates risks treating the visible decision itself as the complete operational story.

It is not.

The Prior Auth Report launches in late July with ongoing analysis of payer behavior, workflow burden, and the operational patterns emerging underneath prior authorization transparency data.

If you want structured analysis delivered directly to your inbox as this reporting landscape evolves, the newsletter waitlist is below.`,
  },
  {
    slug: "unitedhealthcare-cutting-prior-auth-30-percent",
    title: "UnitedHealthcare Is Cutting Prior Auth for 30% of Services. Here's What That Actually Covers.",
    date: "May 17, 2026",
    readTime: "6 min read",
    excerpt: "UnitedHealthcare's 30% prior authorization reduction sounds broad, but the impact depends on the denominator: prior authorization applies to about 2% of its medical services. This analysis looks at what the announcement changes, what it does not, and why service-level reporting matters.",
    content: `UnitedHealthcare announced it will eliminate prior authorization requirements for 30% of services by the end of 2026. That sounds like a major rollback. But the most important number is not 30%. It is the denominator underneath it. Prior authorization currently applies to about 2% of UnitedHealthcare medical services, which means the announcement affects a subset of an already narrow category.

What UnitedHealthcare Actually Changed

UnitedHealthcare says prior authorization applies to roughly 2% of its medical services. That context changes how the 30% figure should be read. The announcement does not mean prior authorization is being removed from 30% of all care. It means requirements are being removed from 30% of services that currently require prior authorization.

The services being removed also matter. UnitedHealthcare has described prior reductions as focused on services that "already demonstrate consistent adherence to evidence-based guidelines and are almost always approved." That framing suggests the company is targeting categories where prior authorization was unlikely to change the final decision very often.

UnitedHealthcare has also reported that 92% of prior authorization requests are approved, with most decisions made within 24 hours. That aggregate approval rate is useful, but limited. It does not show which services are approved quickly, which are denied more often, or where appeals are concentrated. Without service-level reporting, the overall picture is available but the distribution within it is not.

Why the Impact Depends on What Was Removed

For patients, this change is not meaningless. If a service no longer requires prior authorization, that removes a step between the physician's order and the patient receiving care. For routine services that were already likely to be approved, that can still reduce delays, paperwork, and uncertainty. The patient does not care whether the service was statistically low-risk from the payer's perspective. They care that they no longer have to wait for an approval that was probably coming anyway. In that sense, the announcement does improve access for some people.

For providers, the operational impact is more specific. Prior authorization burden is not evenly distributed across all services. Some requests are simple and move quickly. Others require documentation gathering, follow-up calls, peer-to-peer reviews, resubmissions, and appeals. Removing routine services from review reduces total request volume. But the work associated with the most time-consuming cases is unlikely to change proportionally. A smaller number of complex requests can still consume more staff time than a larger number of routine approvals.

The system-level issue is granularity. Current public reporting provides aggregate approval rates, denial rates, appeal outcomes, and decision timeframes. Those metrics are useful, but they do not show where prior authorization is creating the most strain. A plan can report a high overall approval rate while still having specific service categories that are frequently denied or appealed. Without approval and denial rates broken down by service category, procedure type, or clinical area, it is not possible to determine whether reform is reaching the areas where patients and providers experience the greatest burden.

What This Announcement Does and Does Not Address

Removing prior authorization from services that are almost always approved reduces unnecessary process and may improve access for the patients affected. Those are real outcomes.

What it does not show is whether anything changes for complex, high-cost, or frequently contested services. Those categories, where denials are more common, appeals are more likely, and administrative burden is highest, are not addressed by this announcement. The aggregate data currently available does not identify them by name. That is the limitation this announcement makes visible.

The next phase of prior authorization transparency is not just whether plans publish metrics. It is whether those metrics are specific enough to show where review requirements are still creating meaningful delay or denial. A reduction in low-complexity volume is a measurable step. Whether it corresponds to a reduction in patient or provider burden depends on data that is not yet publicly available.

Follow the Data

The Prior Auth Index tracks prior authorization transparency data across U.S. health plans, including published metrics, compliance status, and source-level reporting at thepriorauth.com.

The Prior Auth Report launches in July 2026 with monthly, data-backed analysis of prior authorization trends across U.S. health plans. The waitlist is open on the site.`,
  },
  {
    slug: "prior-auth-transparency-is-live",
    title: "Prior Auth Transparency Is Live. Most of It Isn't Usable.",
    date: "May 10, 2026",
    readTime: "8 min read",
    excerpt: "Original analysis from 1,300+ health plan entries on what is actually missing from the first year of CMS prior authorization transparency reporting.",
    content: `CMS required health plans to publish prior authorization metrics for the first time ever. Approval rates. Denial rates. Decision timelines. Appeal outcomes. All of it, publicly available, by March 31, 2026.

The reporting deadline has passed. The data now technically exists.

So I built a database to track it across 1,300+ health plan entries. What I found was far messier than the mandate implied.

What CMS Actually Required

Before getting into what plans published, it helps to understand what they were supposed to publish.

Under the 2024 CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F), impacted payers, including Medicare Advantage organizations, Medicaid managed care plans, CHIP managed care entities, and qualified health plan issuers on the federal exchanges, were required to publicly post the following metrics for calendar year 2025 by March 31, 2026:

The percentage of standard prior authorization requests approved. The percentage denied. The percentage approved after appeal. The percentage of expedited requests approved and denied. Average decision timeframes.

That is a specific, defined list. Not vague. Not open to interpretation. A plan either published those numbers or it did not.

Most have not.

What the Data Actually Shows

Over 90% of plans in the dataset have not published usable prior authorization metrics. But that number only tells part of the story, because non-compliance is not one thing. It is several things, and they are worth separating.

Category 1: No page exists at all.

Some plans have nothing. No URL, no page, no attempt. The requirement exists, the deadline passed, and the page does not. This is the most straightforward category, and it is the largest one.

Category 2: A page exists but contains the wrong data.

This is where it gets interesting. Some plans have published something, just not prior authorization metrics. Machine-readable pricing files. Provider directories. General transparency pages that technically exist but contain none of the required fields. When you open the link, there is no approval rate. No denial rate. No decision timeline. No appeal outcome. The requirement gets satisfied on paper. The data does not exist.

Category 3: A page exists but is functionally inaccessible.

Some pages fail to load consistently. Some return errors. A page that cannot be accessed by the public is not a public page, regardless of what the URL says.

Category 4: The data exists but is not machine-readable or comparable.

Even among plans that published the right metrics, the format varies wildly. Some published clean HTML tables. Some published nine-page PDFs with metrics buried in footnotes. Some published numbers without definitions, so you cannot tell whether their denial rate includes partial denials, administrative denials, or only clinical denials. The number exists. What it means is unclear.

This is where the gap between a publication standard and a usability standard becomes real.

The Concentration Problem

Then there is the issue that changes how you read the compliant plans entirely.

Among the plans that have published usable data, a disproportionate share traces back to a single underlying source. UnitedHealthcare, Optum, Peoples Health, and related entities frequently reference the same prior authorization reporting page across dozens of separate contract IDs. Every contract that points to that page gets counted as a separate published plan in a surface level tracker.

On paper: broad coverage across many plans. 

In practice: one dataset, counted many times.

This is not necessarily a violation. A payer can legally centralize reporting across contracts. But it means the number of published plans is not the same as the number of unique usable datasets. Those are very different things, and conflating them produces a distorted picture of how much actual information is available to the public.

The Prior Auth Index does not count it that way. When multiple contracts point back to the same underlying source, that dataset is represented once. Not once per contract ID.

Why This Matters Beyond the Numbers

For patients, the transparency requirement was supposed to make plan comparison possible. Which plan approves more requests? How long do decisions take? What happens when something gets denied? These are not abstract questions. They are the questions people ask when they are choosing coverage or fighting a denial. The data was supposed to start answering them. For the vast majority of plans, it does not.

For providers and healthtech builders, the dataset that exists is mostly empty and partially distorted. The plans that have published usable data are not necessarily the plans creating the most administrative burden. The ones with the heaviest PA volume may be exactly the ones that have not published anything.

The structural problem is this: the mandate set a publication standard, not a usability standard. A placeholder page satisfies the same regulatory requirement as a clean, complete, machine-readable table. Until CMS defines what usable looks like and enforces against it, the incentive is to publish something rather than something meaningful. That distinction is what The Prior Auth Index exists to surface.

What This Actually Means

The current state of prior authorization transparency is not simply a refusal to comply. In many cases, plans are attempting to assemble reporting pipelines from fragmented legacy systems that were never designed to produce this data publicly. For smaller plans especially, the engineering lift is real. The deadline was not realistic for everyone.

But the result is the same regardless of the reason. A mandate that required transparency produced a dataset that is mostly unavailable, partially duplicated, and difficult to interpret without significant cleanup work.

Published does not mean usable. Usable does not mean comparable. And comparable does not mean the whole story.

We are at step one. The data is starting to exist. Making it mean something is the work that comes next. That is what The Prior Auth Index is here to do.

The Prior Auth Index tracks prior authorization transparency data across 1,300+ health plans and is updated as new data becomes available. If you want ongoing analysis of prior authorization transparency data in your inbox, the newsletter launches in July. The waitlist is below.`,
  },
];

// ─── ARTICLE RENDERER ────────────────────────────────────────────────────────

function ArticleBody({ content }) {
  const lines = content.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      {lines.map((line, i) => {
        if (SECTION_HEADINGS.includes(line)) {
          return (
            <h2 key={i} style={{
              fontSize: 19, fontWeight: 700, color: "#1a365d",
              marginTop: 36, marginBottom: 14, lineHeight: 1.3,
              fontFamily: "'IBM Plex Sans', sans-serif",
              borderTop: "2px solid #e2e8f0", paddingTop: 24,
            }}>
              {line}
            </h2>
          );
        }
        if (SUB_HEADINGS.includes(line)) {
          return (
            <h3 key={i} style={{
              fontSize: 14, fontWeight: 700, color: "#1a365d",
              marginTop: 22, marginBottom: 8, lineHeight: 1.4,
              fontFamily: "'IBM Plex Sans', sans-serif",
            }}>
              {line}
            </h3>
          );
        }
        return (
          <p key={i} style={{ fontSize: 15, color: "#2d3748", lineHeight: 1.8, marginBottom: 18, marginTop: 0 }}>
            {line}
          </p>
        );
      })}
    </div>
  );
}

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function Bar({ rate, max = 30 }) {
  const w = Math.min((rate / max) * 100, 100);
  const c = rate > 20 ? "#dc2626" : rate > 10 ? "#ea580c" : rate > 7 ? "#d97706" : "#16a34a";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
      <div style={{ flex: 1, height: 22, background: "#eef0f4", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${w}%`, height: "100%", background: c, borderRadius: 4, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 15, color: c, minWidth: 52, textAlign: "right" }}>{rate}%</span>
    </div>
  );
}

function GreenBar({ rate }) {
  const w = Math.min((rate / 100) * 100, 100);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, width: "100%" }}>
      <div style={{ flex: 1, height: 22, background: "#eef0f4", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${w}%`, height: "100%", background: "#16a34a", borderRadius: 4, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, fontSize: 15, color: "#16a34a", minWidth: 52, textAlign: "right" }}>{rate}%</span>
    </div>
  );
}

function Collapsible({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, marginBottom: 8, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "14px 18px", background: "none", border: "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "#1a365d" }}>{title}</span>
        <span style={{ fontSize: 17, color: "#999", fontWeight: 300, transition: "transform 0.2s", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && <div style={{ padding: "0 18px 16px", fontSize: 13, color: "#555", lineHeight: 1.7 }}>{children}</div>}
    </div>
  );
}

function DataStatusPill({ status }) {
  return (
    <span style={{
      background: "#f0f4f8", border: "1px solid #dbe3ec", color: "#1a365d",
      fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", borderRadius: 999,
      padding: "4px 8px", whiteSpace: "nowrap", flexShrink: 0,
    }}>
      {status}
    </span>
  );
}

// ─── COMPARE SECTION ─────────────────────────────────────────────────────────

function CompareSection() {
  const allPlans = [
    ...MA_2024.map(d => ({ ...d, type: "Medicare Advantage (65+)" })),
    ...ACA_2024.map(d => ({ ...d, type: "ACA Marketplace (under 65)", appealOverturnRate: null })),
  ];
  const [planA, setPlanA] = useState("");
  const [planB, setPlanB] = useState("");
  const a = allPlans.find(p => `${p.insurer}|${p.type}` === planA);
  const b = allPlans.find(p => `${p.insurer}|${p.type}` === planB);

  return (
    <div>
      <div style={{ padding: 14, background: "#f0f4f8", border: "1px solid #e2e8f0", borderRadius: 8, marginBottom: 16, fontSize: 12, color: "#555", lineHeight: 1.6 }}>
        This comparison tool uses <strong>calendar year 2024 data</strong> because it is the most complete dataset currently available, covering all major insurers equally. Once calendar year 2025 data has been reported by enough plans to allow for accurate comparisons, this tool will be updated to reflect the newer data.
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>Plan A</label>
          <select value={planA} onChange={e => setPlanA(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", fontSize: 13, color: "#1a365d" }}>
            <option value="">Select a plan...</option>
            <optgroup label="Medicare Advantage (65+)">
              {MA_2024.map(d => <option key={`ma-${d.insurer}`} value={`${d.insurer}|Medicare Advantage (65+)`}>{d.insurer} - Medicare Advantage</option>)}
            </optgroup>
            <optgroup label="ACA Marketplace (under 65)">
              {ACA_2024.map(d => <option key={`aca-${d.insurer}`} value={`${d.insurer}|ACA Marketplace (under 65)`}>{d.insurer} - ACA Marketplace</option>)}
            </optgroup>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", paddingBottom: 10, color: "#999", fontWeight: 700, fontSize: 14 }}>vs</div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <label style={{ fontSize: 12, color: "#666", display: "block", marginBottom: 6, fontFamily: "'IBM Plex Mono', monospace" }}>Plan B</label>
          <select value={planB} onChange={e => setPlanB(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", fontSize: 13, color: "#1a365d" }}>
            <option value="">Select a plan...</option>
            <optgroup label="Medicare Advantage (65+)">
              {MA_2024.map(d => <option key={`ma2-${d.insurer}`} value={`${d.insurer}|Medicare Advantage (65+)`}>{d.insurer} - Medicare Advantage</option>)}
            </optgroup>
            <optgroup label="ACA Marketplace (under 65)">
              {ACA_2024.map(d => <option key={`aca2-${d.insurer}`} value={`${d.insurer}|ACA Marketplace (under 65)`}>{d.insurer} - ACA Marketplace</option>)}
            </optgroup>
          </select>
        </div>
      </div>
      {a && b ? (
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "2px solid #e2e8f0" }}>
            <div style={{ padding: 16, borderRight: "1px solid #e2e8f0", textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1a365d" }}>{a.insurer}</div>
              <div style={{ fontSize: 10, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginTop: 4, background: "#f0f4f8", display: "inline-block", padding: "2px 8px", borderRadius: 4 }}>{a.type}</div>
            </div>
            <div style={{ padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1a365d" }}>{b.insurer}</div>
              <div style={{ fontSize: 10, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginTop: 4, background: "#f0f4f8", display: "inline-block", padding: "2px 8px", borderRadius: 4 }}>{b.type}</div>
            </div>
          </div>
          {[
            { label: "Denial Rate", key: "denialRate", suffix: "%", explain: "Percentage of requests denied. Lower is better for patients." },
            { label: "Approval Rate", key: "approvalRate", suffix: "%", explain: "Percentage of requests approved. Higher is better for patients." },
            { label: "Appeal Overturn Rate", key: "appealOverturnRate", suffix: "%", explain: "How often denials were reversed on appeal. Medicare Advantage only." },
          ].map((metric, i) => {
            const aVal = a[metric.key];
            const bVal = b[metric.key];
            if (aVal == null && bVal == null) return null;
            return (
              <div key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <div style={{ padding: "10px 16px 2px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#1a365d" }}>{metric.label}</div>
                  <div style={{ fontSize: 11, color: "#999", marginTop: 2 }}>{metric.explain}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <div style={{ padding: "8px 16px 14px", borderRight: "1px solid #e2e8f0", textAlign: "center" }}>
                    <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: aVal != null ? "#1a365d" : "#ccc" }}>{aVal != null ? `${aVal}${metric.suffix}` : "N/A"}</div>
                  </div>
                  <div style={{ padding: "8px 16px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", color: bVal != null ? "#1a365d" : "#ccc" }}>{bVal != null ? `${bVal}${metric.suffix}` : "N/A"}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <div style={{ padding: 12, background: "#f7f8fa", fontSize: 10, color: "#999", textAlign: "center", fontFamily: "'IBM Plex Mono', monospace" }}>Calendar year 2024 data. Sources linked in methodology below.</div>
        </div>
      ) : (
        <div style={{ padding: 28, background: "#f7f8fa", border: "1px solid #e2e8f0", borderRadius: 10, textAlign: "center", color: "#999", fontSize: 13 }}>Select two plans above to see a side-by-side comparison.</div>
      )}
    </div>
  );
}

// ─── COMPLIANCE TRACKER ──────────────────────────────────────────────────────

function ComplianceTracker() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [mrFilter, setMrFilter] = useState("all");
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetch("https://artificerhealth.com/payer_publication_status.json")
      .then(res => { if (!res.ok) throw new Error("Failed to fetch"); return res.json(); })
      .then(json => { setData(json); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#888", fontSize: 14 }}>
        <div style={{ marginBottom: 12, fontSize: 17, color: "#1a365d" }}>Loading compliance data...</div>
        <div style={{ width: 40, height: 40, border: "3px solid #e2e8f0", borderTop: "3px solid #1a365d", borderRadius: "50%", margin: "0 auto", animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }
  if (error) {
    return <div style={{ padding: 40, textAlign: "center", color: "#888", fontSize: 14, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8 }}>Unable to load compliance data right now.</div>;
  }

  const payers = Array.isArray(data) ? data : (data?.payers || data?.data || []);
  const generatedAt = data?.generated_at || data?.generatedAt || data?.timestamp || null;
  const totalCount = data?.count || payers.length;

  const isPublished = (p) => p.published === true || p.published === "true" || p.status === "published";
  const isMachineReadable = (p) => p.machine_readable === true || p.machine_readable === "true";
  const getPayerName = (p) => p.name || p.payer || p.organization || "Unknown";
  const getUrl = (p) => p.url || p.source_url || p.link || null;
  const getLastUpdate = (p) => p.last_update || p.last_updated || p.updated_at || null;

  const totalPayers = payers.length;
  const publishedCount = payers.filter(p => isPublished(p)).length;
  const notPublishedCount = totalPayers - publishedCount;
  const machineReadableCount = payers.filter(p => isMachineReadable(p)).length;

  const filtered = payers.filter(p => {
    const name = getPayerName(p).toLowerCase();
    if (search && !name.includes(search.toLowerCase())) return false;
    const pub = isPublished(p);
    if (statusFilter === "published" && !pub) return false;
    if (statusFilter === "not_published" && pub) return false;
    const mr = isMachineReadable(p);
    if (mrFilter === "yes" && !mr) return false;
    if (mrFilter === "no" && mr) return false;
    return true;
  });

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        let aVal, bVal;
        if (sortKey === "payer") { aVal = getPayerName(a).toLowerCase(); bVal = getPayerName(b).toLowerCase(); }
        else if (sortKey === "status") { aVal = isPublished(a) ? 1 : 0; bVal = isPublished(b) ? 1 : 0; }
        else if (sortKey === "machine_readable") { aVal = isMachineReadable(a) ? 1 : 0; bVal = isMachineReadable(b) ? 1 : 0; }
        else if (sortKey === "last_updated") {
          const da = getLastUpdate(a); const db = getLastUpdate(b);
          aVal = da ? new Date(da).getTime() : 0; bVal = db ? new Date(db).getTime() : 0;
        }
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
      })
    : filtered;

  const handleSort = (key) => {
    if (sortKey === key) setSortDirection(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDirection("asc"); }
  };

  const SortIndicator = ({ col }) => {
    if (sortKey !== col) return <span style={{ color: "rgba(255,255,255,0.3)", marginLeft: 4 }}>↕</span>;
    return <span style={{ marginLeft: 4 }}>{sortDirection === "asc" ? "↑" : "↓"}</span>;
  };

  const thStyle = (col) => ({ padding: "10px 14px", textAlign: col === "payer" ? "left" : "center", fontWeight: 600, fontSize: 12, cursor: "pointer", userSelect: "none", whiteSpace: "nowrap" });
  const selectStyle = { padding: "8px 12px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", fontSize: 12, color: "#1a365d", cursor: "pointer" };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 16 }}>
          CMS rule CMS-0057-F required impacted health plans to begin publicly reporting prior authorization metrics as of March 31, 2026. This tracker monitors publication status, machine-readable availability, source URLs, and remaining publication gaps.
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 12 }}>Compliance Snapshot</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 12 }}>
            {[
              { label: "Total Payers", value: totalPayers.toLocaleString() },
              { label: "Published", value: publishedCount.toLocaleString() },
              { label: "Not Published", value: notPublishedCount.toLocaleString() },
              { label: "Machine-Readable", value: machineReadableCount.toLocaleString() },
              ...(generatedAt ? [{ label: "Dataset Refreshed", value: new Date(generatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }] : []),
            ].map((item, i) => (
              <div key={i} style={{ padding: "10px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #eef0f4" }}>
                <div style={{ fontSize: 10, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4, lineHeight: 1.3 }}>{item.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1a365d", fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.2 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── REPLACED: Weekly Status block removed. New: Data refresh status ── */}
        <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: 8, padding: 14, marginBottom: 16 }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.5, color: "#64748b", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 6 }}>Data Refresh Status</div>
          <div style={{ fontSize: 13, color: "#334155", lineHeight: 1.6, marginBottom: 8 }}>
            The compliance tracker is refreshed from the latest available source file. Publication status may change as payer pages are identified, updated, or corrected.
          </div>
          <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.6 }}>
            Compliance data powered by <a href="https://artificerhealth.com" target="_blank" rel="noopener noreferrer" style={{ color: "#1a365d", textDecoration: "underline" }}>Artificer Health</a>.
          </div>
        </div>

        <div style={{ padding: 14, background: "#f0f4f8", border: "1px solid #e2e8f0", borderRadius: 8, marginBottom: 16, fontSize: 12, color: "#555", lineHeight: 1.6 }}>
          <strong>Regularly updated.</strong>
          {generatedAt && <span> Last dataset refresh: {new Date(generatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.</span>}
          <span> Tracking {totalCount.toLocaleString()} payers.</span>
        </div>

        <input type="text" placeholder="Search payers..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", padding: "10px 14px", borderRadius: 6, border: "1px solid #d1d5db", background: "#fff", fontSize: 13, color: "#1a365d", marginBottom: 12, boxSizing: "border-box" }} />
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={selectStyle}>
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="not_published">Not Published</option>
          </select>
          <select value={mrFilter} onChange={e => setMrFilter(e.target.value)} style={selectStyle}>
            <option value="all">All formats</option>
            <option value="yes">Machine-readable</option>
            <option value="no">Not machine-readable</option>
          </select>
          <div style={{ display: "flex", alignItems: "center", fontSize: 12, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginLeft: "auto" }}>
            {sorted.length.toLocaleString()} of {totalCount.toLocaleString()} payers
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <div style={{ padding: 28, background: "#f7f8fa", border: "1px solid #e2e8f0", borderRadius: 10, textAlign: "center", color: "#999", fontSize: 13 }}>No payers match your current search or filters.</div>
      ) : (
        <div style={{ overflowX: "auto", borderRadius: 8, border: "1px solid #e2e8f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600, fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#1a365d", color: "#fff" }}>
                <th style={thStyle("payer")} onClick={() => handleSort("payer")}>Payer <SortIndicator col="payer" /></th>
                <th style={thStyle("status")} onClick={() => handleSort("status")}>Status <SortIndicator col="status" /></th>
                <th style={thStyle("machine_readable")} onClick={() => handleSort("machine_readable")}>Machine-readable <SortIndicator col="machine_readable" /></th>
                <th style={{ padding: "10px 14px", textAlign: "center", fontWeight: 600, fontSize: 12 }}>Source</th>
                <th style={thStyle("last_updated")} onClick={() => handleSort("last_updated")}>Last Updated <SortIndicator col="last_updated" /></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p, i) => {
                const pub = isPublished(p); const mr = isMachineReadable(p);
                const url = getUrl(p); const lastUp = getLastUpdate(p);
                return (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafbfc", borderBottom: "1px solid #eef0f4" }}>
                    <td style={{ padding: "10px 14px", fontWeight: 500, color: "#1a365d" }}>{getPayerName(p)}</td>
                    <td style={{ padding: "10px 14px", textAlign: "center" }}>
                      <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace", background: pub ? "#dcfce7" : "#fee2e2", color: pub ? "#166534" : "#991b1b" }}>
                        {pub ? "Published" : "Not Published"}
                      </span>
                    </td>
                    <td style={{ padding: "10px 14px", textAlign: "center", fontSize: 12, color: mr ? "#166534" : "#991b1b", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{mr ? "Yes" : "No"}</td>
                    <td style={{ padding: "10px 14px", textAlign: "center" }}>
                      {url ? <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#1a365d", textDecoration: "underline", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace" }}>View source</a> : <span style={{ color: "#ccc" }}>&mdash;</span>}
                    </td>
                    <td style={{ padding: "10px 14px", textAlign: "center", fontSize: 12, color: "#888", fontFamily: "'IBM Plex Mono', monospace" }}>
                      {lastUp ? new Date(lastUp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : <span style={{ color: "#ccc" }}>&mdash;</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── METRICS PAGE ────────────────────────────────────────────────────────────

function MetricsPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("denials");
  const tabs = [
    { id: "denials", label: "Denial Rates" },
    { id: "appeals", label: "Appeal Success" },
    { id: "compare", label: "Compare Plans" },
    { id: "cy2025", label: "2025 Data (New)" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => onNavigate("home")} style={{ background: "none", border: "none", color: "#1a365d", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", cursor: "pointer", textDecoration: "underline", padding: 0, marginBottom: 12, display: "block" }}>&larr; Back to the Index</button>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1a365d", marginBottom: 6 }}>Prior Authorization Metrics</div>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>Published prior authorization metrics across major U.S. health plans, sourced from CMS data, KFF analysis, and individual plan reporting.</div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 18, marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a365d", marginBottom: 12 }}>At a glance: Medicare Advantage, calendar year 2024</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { value: "52.8M", label: "Total prior authorization decisions made" },
            { value: "4.1M", label: "Requests denied fully or partially (7.7% of all requests)" },
            { value: "80.7%", label: "Of appealed denials were overturned, meaning the initial denial did not hold up" },
            { value: "11.5%", label: "Of denied requests were ever actually appealed by patients or providers" },
          ].map((stat, i) => (
            <div key={i} style={{ padding: 14, background: "#f7f8fa", borderRadius: 6, border: "1px solid #eef0f4" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#1a365d", fontFamily: "'IBM Plex Mono', monospace" }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10, color: "#aaa", marginTop: 10, fontFamily: "'IBM Plex Mono', monospace" }}>
          Source: <a href="https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" target="_blank" rel="noopener noreferrer" style={{ color: "#1a365d" }}>KFF analysis of CMS Medicare Advantage data, January 2026</a>
        </div>
      </div>

      <div style={{ display: "flex", gap: 0, marginBottom: 20, borderRadius: 8, overflow: "hidden", border: "1px solid #d1d5db", flexWrap: "wrap" }}>
        {tabs.map((tab, i) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, minWidth: 100, padding: "12px 8px", border: "none", borderRight: i < tabs.length - 1 ? "1px solid #d1d5db" : "none", background: activeTab === tab.id ? "#1a365d" : "#fff", color: activeTab === tab.id ? "#fff" : "#555", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{tab.label}</button>
        ))}
      </div>

      {activeTab === "denials" && (
        <div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 20 }}>The percentage of prior authorization requests denied in calendar year 2024. Plans are listed from highest denial rate to lowest.</div>
          <div style={{ background: "#1a365d", color: "#fff", padding: "10px 16px", borderRadius: "8px 8px 0 0", fontSize: 14, fontWeight: 700 }}>Medicare Advantage Plans</div>
          <div style={{ background: "#eef2f7", padding: "6px 16px", borderBottom: "1px solid #e2e8f0", fontSize: 11, color: "#666", fontFamily: "'IBM Plex Mono', monospace" }}>Medicare Advantage | Calendar year 2024 | Source: KFF / CMS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1, marginBottom: 28 }}>
            {[...MA_2024].sort((a, b) => b.denialRate - a.denialRate).map((plan, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "14px 16px" }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1a365d", marginBottom: 8 }}>{plan.insurer}</div>
                <Bar rate={plan.denialRate} />
              </div>
            ))}
          </div>
          <div style={{ background: "#1a365d", color: "#fff", padding: "10px 16px", borderRadius: "8px 8px 0 0", fontSize: 14, fontWeight: 700 }}>ACA Marketplace Plans</div>
          <div style={{ background: "#eef2f7", padding: "6px 16px", borderBottom: "1px solid #e2e8f0", fontSize: 11, color: "#666", fontFamily: "'IBM Plex Mono', monospace" }}>ACA Marketplace | Plan Year 2024 | Source: CMS Transparency in Coverage</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {[...ACA_2024].sort((a, b) => b.denialRate - a.denialRate).map((plan, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "14px 16px" }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#1a365d", marginBottom: 8 }}>{plan.insurer}</div>
                <Bar rate={plan.denialRate} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "appeals" && (
        <div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 12 }}>When a prior authorization request is denied, patients and providers may file an appeal requesting reconsideration. This section reports the share of appealed denials that were overturned.</div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 20 }}>Appeal data is currently only available for Medicare Advantage plans.</div>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderLeft: "4px solid #1a365d", borderRadius: 4, padding: 14, marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>Across Medicare Advantage plans in 2024, <strong>80.7%</strong> of appealed denials were overturned. <strong>11.5%</strong> of denied requests were appealed.</div>
            <div style={{ fontSize: 10, color: "#999", marginTop: 6, fontFamily: "'IBM Plex Mono', monospace" }}>Source: <a href="https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" target="_blank" rel="noopener noreferrer" style={{ color: "#1a365d" }}>KFF, Jan 2026</a></div>
          </div>
          <div style={{ background: "#1a365d", color: "#fff", padding: "10px 16px", borderRadius: "8px 8px 0 0", fontSize: 14, fontWeight: 700 }}>Medicare Advantage Plans: Appeal Overturn Rates</div>
          <div style={{ background: "#eef2f7", padding: "6px 16px", borderBottom: "1px solid #e2e8f0", fontSize: 11, color: "#666", fontFamily: "'IBM Plex Mono', monospace" }}>Calendar year 2024 | Ranked highest to lowest</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {[...MA_2024].sort((a, b) => b.appealOverturnRate - a.appealOverturnRate).map((plan, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#1a365d" }}>{plan.insurer}</div>
                  <div style={{ fontSize: 11, color: "#888", fontFamily: "'IBM Plex Mono', monospace" }}>Denial rate: {plan.denialRate}%</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "#888", marginBottom: 4, fontFamily: "'IBM Plex Mono', monospace" }}>Percentage of appeals overturned</div>
                  <GreenBar rate={plan.appealOverturnRate} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: 12, background: "#f7f8fa", border: "1px solid #eef0f4", borderRadius: 6, fontSize: 11, color: "#888", lineHeight: 1.6 }}>
            <strong>Note:</strong> Centene (93.6%) and CVS Health (89.7%) reflect plan-specific appeal data reported by KFF and Kiplinger. All other plans display the Medicare Advantage-wide average of 80.7% and are labeled accordingly. As plan-specific appeal data becomes available, it will replace these averages.
          </div>
        </div>
      )}

      {activeTab === "compare" && (
        <div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 8 }}>Select two health plans to compare available metrics. Each plan is labeled by plan type when the same company appears in multiple categories.</div>
          <div style={{ fontSize: 12, color: "#999", lineHeight: 1.6, marginBottom: 20 }}>Plans may be compared within the same category or across plan types where data is available.</div>
          <CompareSection />
        </div>
      )}

      {activeTab === "cy2025" && (
        <div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 12 }}>As of March 31, 2026, impacted health plans were required to publicly report prior authorization metrics for calendar year 2025. The entries below reflect metrics identified from individual plan publications and related disclosure pages.</div>
          <div style={{ padding: 14, background: "#f0f4f8", border: "1px solid #e2e8f0", borderRadius: 8, marginBottom: 20, fontSize: 12, color: "#555", lineHeight: 1.6 }}>
            <strong>Note:</strong> The data below comes from different plan types and reporting formats. These entries should not be treated as directly comparable to each other or to the 2024 data shown in other tabs. Standardized comparison will require broader and more consistent publication across plans.
          </div>
          {[...CY2025_DATA].sort((a, b) => a.insurer.localeCompare(b.insurer)).map((plan, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 18, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 20, color: "#1a365d" }}>{plan.insurer}</div>
                <DataStatusPill status={plan.dataStatus} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
                <div style={{ padding: 10, background: "#f7f8fa", borderRadius: 6, border: "1px solid #eef0f4" }}>
                  <div style={{ fontSize: 10, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2 }}>Approval Rate</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: plan.approvalRate != null ? "#16a34a" : "#ccc", fontFamily: "'IBM Plex Mono', monospace" }}>{plan.approvalRate != null ? `${plan.approvalRate}%` : "N/A"}</div>
                </div>
                <div style={{ padding: 10, background: "#f7f8fa", borderRadius: 6, border: "1px solid #eef0f4" }}>
                  <div style={{ fontSize: 10, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2 }}>Denial Rate</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: plan.denialRate != null ? (plan.denialRate > 15 ? "#dc2626" : plan.denialRate > 8 ? "#ea580c" : "#d97706") : "#ccc", fontFamily: "'IBM Plex Mono', monospace" }}>{plan.denialRate != null ? `${plan.denialRate}%` : "N/A"}</div>
                </div>
                <div style={{ padding: 10, background: "#f7f8fa", borderRadius: 6, border: "1px solid #eef0f4" }}>
                  <div style={{ fontSize: 10, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 2 }}>Avg Decision Time</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1a365d", fontFamily: "'IBM Plex Mono', monospace" }}>{plan.avgDecisionTime}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6, marginBottom: 6 }}>{plan.note}</div>
              <a href={plan.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: "#1a365d", textDecoration: "underline", fontFamily: "'IBM Plex Mono', monospace" }}>{plan.sourceLabel}</a>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 32, padding: 20, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a365d", marginBottom: 10 }}>Data sources and methodology</h3>
        <div style={{ fontSize: 12, color: "#555", lineHeight: 1.8 }}>
          <p>The Denial Rates, Appeal Success, and Compare Plans tabs use <strong>calendar year 2024 data</strong>. Medicare Advantage data comes from the Kaiser Family Foundation's (KFF) analysis of CMS Medicare Advantage Prior Authorization data, published in January 2026. ACA Marketplace data comes from CMS Transparency in Coverage Public Use Files for Plan Year 2024.</p>
          <p style={{ marginTop: 8 }}>The 2025 Data tab contains metrics identified from individual plan publications related to CMS rule CMS-0057-F, which required impacted plans to post calendar year 2025 metrics by March 31, 2026. This section is updated as additional plan reports are identified.</p>
          <p style={{ marginTop: 8 }}>ACA Marketplace data covers in-network claims for plans sold on HealthCare.gov only and does not include employer-sponsored plans, Medicare, Medicaid, or off-marketplace plans.</p>
          <p style={{ marginTop: 8 }}><strong>BCBS note:</strong> The BCBS figure shown is a national average across 36 independent affiliates. Individual state rates vary significantly. For example, Alabama BCBS has been reported at approximately 34%, while some affiliates report below 10%.</p>
        </div>
        <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1a365d", marginTop: 16, marginBottom: 8 }}>Sources</h4>
        <div style={{ fontSize: 12, lineHeight: 2.2 }}>
          {[
            { label: "KFF: Medicare Advantage Prior Authorization Determinations, 2024", url: "https://www.kff.org/medicare/medicare-advantage-insurers-made-nearly-53-million-prior-authorization-determinations-in-2024/" },
            { label: "KFF: First Look at Insurer Prior Auth Reporting (Apr 2026)", url: "https://www.kff.org/quick-take/insurers-prior-authorization-data-offers-little-insight-into-what-gets-approved-or-denied/" },
            { label: "Muni Health: Denial Rate Comparison by Insurer (2026)", url: "https://muni.health/blog/insurance-denial-rate-by-company-2026" },
            { label: "AMA: Physician Prior Authorization Survey (Feb 2025)", url: "https://www.ama-assn.org/press-center/ama-press-releases/physicians-concerned-ai-increases-prior-authorization-denials" },
            { label: "CMS: Interoperability and Prior Authorization Final Rule (CMS-0057-F)", url: "https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-prior-authorization-final-rule-cms-0057-f" },
            { label: "Becker's Hospital Review: Prior Auth Denial Rates Go Public (Mar 2026)", url: "https://www.beckershospitalreview.com/legal-regulatory-issues/payers-prior-authorization-denial-rates-go-public-5-notes/" },
            { label: "Kiplinger: Medicare Advantage Prior Authorization Denial Rates", url: "https://www.kiplinger.com/retirement/medicare/medicare-advantage-plans-prior-authorization-denial-rates" },
            { label: "UnitedHealthcare: CMS Interoperability and Prior Authorization Page", url: "https://www.uhc.com/legal/cms-interoperability-prior-authorization" },
            { label: "Cigna: CMS Annual Prior Authorization Statistics CY2025 (PDF)", url: "https://www.cigna.com/static/www-cigna-com/docs/cms-annual-prior-authorization-statistics-2025.pdf" },
            { label: "CVS Health: Prior Authorization and Affordability Update (Jan 2026)", url: "https://www.cvshealth.com/news/company-news/cvs-health-makes-health-insurance-simpler-and-more-affordable-for-americans.html" },
          ].map((s, i) => (
            <div key={i}>• <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: "#1a365d", textDecoration: "underline" }}>{s.label}</a></div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 14, padding: 14, background: "#fafbfc", border: "1px solid #eef0f4", borderRadius: 6 }}>
        <div style={{ fontSize: 11, color: "#999", lineHeight: 1.7 }}><strong>Disclaimer:</strong> This database is for informational and research purposes only. It does not constitute medical, legal, or financial advice. Denial rates are aggregated national figures that vary by state, plan, and service type. Individual experiences may differ. Always verify current metrics directly with your health plan.</div>
      </div>
    </div>
  );
}

// ─── NEWSLETTER PAGE ─────────────────────────────────────────────────────────

function NewsletterPage({ onNavigate, status, setStatus }) {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1a365d", marginBottom: 4 }}>The Prior Auth Report</div>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#1a365d", marginBottom: 6 }}>Prior authorization reporting and operational patterns.</div>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 14 }}>
          Monthly analysis of prior authorization reporting patterns, payer behavior, workflow variation, and public disclosure trends across U.S. health plans.
          <div style={{ fontSize: 12, color: "#777", marginTop: 6 }}>Launching July 2026. Early subscribers get the first issue.</div>
        </div>
      </div>
      <div className="pai-embed-wrap" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "24px 20px", marginBottom: 20 }}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const email = e.target.email.value;
            setStatus("loading");
            try {
              const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
              const data = await res.json();
              if (!res.ok) { setStatus("error"); return; }
              setStatus("success"); e.target.reset();
            } catch (err) { setStatus("error"); }
          }}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <input name="email" type="email" placeholder="Enter your email" required style={{ padding: "12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14 }} />
          <button type="submit" style={{ padding: "12px", background: "#1a365d", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>
            {status === "loading" ? "Joining..." : "Join the Report Waitlist"}
          </button>
          {status === "success" && <p style={{ color: "#1a7f37", fontSize: 13, fontWeight: 500 }}>Subscription confirmed. First issue scheduled for July 2026.</p>}
          {status === "error" && <p style={{ color: "red", fontSize: 13 }}>Submission failed. Please try again.</p>}
        </form>
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button onClick={() => onNavigate("home")} style={{ background: "none", border: "none", color: "#1a365d", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", cursor: "pointer", textDecoration: "underline" }}>&larr; Back to the Index</button>
      </div>
    </div>
  );
}

// ─── ARTICLE NEWSLETTER FORM (article view only) ─────────────────────────────

function ArticleNewsletterForm() {
  const [articleStatus, setArticleStatus] = useState(null);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        setArticleStatus("loading");
        try {
          const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
          const data = await res.json();
          if (!res.ok) { setArticleStatus("error"); return; }
          setArticleStatus("success"); e.target.reset();
        } catch (err) { setArticleStatus("error"); }
      }}
      style={{ display: "flex", flexDirection: "column", gap: 10 }}
    >
      <input name="email" type="email" placeholder="Enter your email" required style={{ padding: "12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14, textAlign: "center" }} />
      <button type="submit" style={{ padding: "12px", background: "#1a365d", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer", fontSize: 13 }}>
        {articleStatus === "loading" ? "Joining..." : "Join the Report Waitlist"}
      </button>
      {articleStatus === "success" && <p style={{ color: "#1a7f37", fontSize: 13, fontWeight: 500, margin: 0 }}>Subscription confirmed. First issue scheduled for July 2026.</p>}
      {articleStatus === "error" && <p style={{ color: "red", fontSize: 13, margin: 0 }}>Submission failed. Please try again.</p>}
    </form>
  );
}

// ─── INSIGHTS PAGE ───────────────────────────────────────────────────────────

function InsightsPage({ onNavigate, selectedInsight, setSelectedInsight }) {
  if (selectedInsight) {
    return (
      <div>
        <button onClick={() => setSelectedInsight(null)} style={{ background: "none", border: "none", color: "#1a365d", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", cursor: "pointer", textDecoration: "underline", padding: 0, marginBottom: 28, display: "block" }}>
          &larr; Back to Insights
        </button>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ marginBottom: 28 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1a365d", lineHeight: 1.25, marginBottom: 12, fontFamily: "'IBM Plex Sans', sans-serif" }}>
              {selectedInsight.title}
            </h1>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "#888", fontFamily: "'IBM Plex Mono', monospace" }}>{selectedInsight.date}</span>
              <span style={{ fontSize: 12, color: "#ccc" }}>·</span>
              <span style={{ fontSize: 12, color: "#888", fontFamily: "'IBM Plex Mono', monospace" }}>{selectedInsight.readTime}</span>
            </div>
          </div>
          <ArticleBody content={selectedInsight.content} />
        </div>
        <div style={{ marginTop: 52, borderTop: "1px solid #e2e8f0" }} />
        <div style={{ maxWidth: 560, margin: "40px auto 0", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "32px 28px", textAlign: "center" }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 2, color: "#1a365d", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", marginBottom: 12 }}>
            The Prior Auth Report
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1a365d", lineHeight: 1.3, marginBottom: 10 }}>
            Receive future analysis by email.
          </div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 22, maxWidth: 440, margin: "0 auto 22px" }}>
            Monthly analysis of prior authorization reporting patterns, payer behavior, workflow variation, and public disclosure trends across U.S. health plans.
          </div>
          <ArticleNewsletterForm />
        </div>
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <button onClick={() => setSelectedInsight(null)} style={{ background: "none", border: "none", color: "#1a365d", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", cursor: "pointer", textDecoration: "underline" }}>
            &larr; Back to Insights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1a365d", marginBottom: 6 }}>Insights</div>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>Analysis of prior authorization reporting patterns, payer behavior, workflow variation, and public disclosure limitations.</div>
      </div>
      {INSIGHTS_POSTS.map((post) => (
        <div
          key={post.slug}
          style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: 24, marginBottom: 16, transition: "box-shadow 0.15s ease" }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(26,54,93,0.08)"}
          onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
        >
          <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 11, color: "#888", fontFamily: "'IBM Plex Mono', monospace" }}>{post.date}</span>
            <span style={{ fontSize: 11, color: "#ccc" }}>·</span>
            <span style={{ fontSize: 11, color: "#888", fontFamily: "'IBM Plex Mono', monospace" }}>{post.readTime}</span>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1a365d", lineHeight: 1.3, marginBottom: 10 }}>{post.title}</div>
          <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 18 }}>{post.excerpt}</div>
          <button
            onClick={() => { setSelectedInsight(post); window.scrollTo(0, 0); }}
            style={{ background: "#1a365d", color: "#fff", border: "none", borderRadius: 6, padding: "9px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }}
          >
            Read analysis →
          </button>
        </div>
      ))}
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button onClick={() => onNavigate("home")} style={{ background: "none", border: "none", color: "#1a365d", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", cursor: "pointer", textDecoration: "underline" }}>&larr; Back to the Index</button>
      </div>
    </div>
  );
}

// ─── ABOUT PAGE ──────────────────────────────────────────────────────────────

function AboutPage({ onNavigate }) {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1a365d", marginBottom: 12 }}>About The Prior Auth Index</div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 20, marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a365d", marginBottom: 10 }}>About the project</div>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
          <p style={{ margin: 0, marginBottom: 10 }}>The Prior Auth Index is an independent project tracking prior authorization reporting, payer publication patterns, and workflow-related metrics across U.S. health plans.</p>
          <p style={{ margin: 0, marginBottom: 10 }}>Under CMS rule CMS-0057-F, impacted health plans are required to publicly disclose prior authorization metrics including approval rates, denial rates, appeal outcomes, and decision timelines. Published reporting is distributed across individual plan pages, multiple file formats, and varying definitions.</p>
          <p style={{ margin: 0 }}>The Prior Auth Index maps source locations, records publication status, and summarizes available metrics and reporting limitations across plans.</p>
        </div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 20, marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a365d", marginBottom: 10 }}>Purpose</div>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
          <p style={{ margin: 0, marginBottom: 10 }}>Prior authorization affects coverage determinations, decision timelines, and administrative workflows. CMS-0057-F created a public reporting requirement for selected prior authorization metrics. In practice, the published data is distributed across many source locations and requires cleanup before cross-plan interpretation is possible.</p>
          <p style={{ margin: 0, marginBottom: 10 }}>The Prior Auth Index is designed to:</p>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>map where public reporting is located</li>
            <li>summarize which metrics are and are not available</li>
            <li>identify patterns across fragmented public sources</li>
          </ul>
          <p style={{ margin: 0, marginTop: 10 }}>while preserving source links and reported context.</p>
        </div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 20, marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1a365d", marginBottom: 10 }}>Project maintainer</div>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
          <p style={{ margin: 0, marginBottom: 10 }}>The Prior Auth Index was created and is maintained by Ashley Murray.</p>
          <p style={{ margin: 0, marginBottom: 10 }}>The project began as a source-mapping effort for public prior authorization reporting and has expanded into a tracker of publication status, source availability, and reported metrics.</p>
          <p style={{ margin: 0, marginBottom: 10 }}>Ashley is also a co-founder of BridgeChart, an early-stage healthtech project focused on patient-controlled health record access and provider communication.</p>
          <p style={{ margin: 0 }}>This project focuses on fragmented public reporting sources and the operational structure required to make those sources easier to review.</p>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button onClick={() => onNavigate("home")} style={{ background: "none", border: "none", color: "#1a365d", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", cursor: "pointer", textDecoration: "underline" }}>&larr; Back to the Index</button>
      </div>
    </div>
  );
}

// ─── CONTACT PAGE ────────────────────────────────────────────────────────────

function ContactPage({ onNavigate }) {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1a365d", marginBottom: 12 }}>Contact</div>
      </div>
      <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 20, marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 16 }}>For corrections, source updates, data leads, or research inquiries, use the contact information below.</div>
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4 }}>Email</div>
          <a href="mailto:ashley@bridgechart.com" style={{ fontSize: 13, color: "#1a365d", textDecoration: "underline", fontFamily: "'IBM Plex Mono', monospace" }}>ashley@bridgechart.com</a>
        </div>
        <div>
          <div style={{ fontSize: 12, color: "#888", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 4 }}>LinkedIn</div>
          <a href="https://www.linkedin.com/in/ashley-murray-73ab73136/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#1a365d", textDecoration: "underline", fontFamily: "'IBM Plex Mono', monospace" }}>LinkedIn</a>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button onClick={() => onNavigate("home")} style={{ background: "none", border: "none", color: "#1a365d", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", cursor: "pointer", textDecoration: "underline" }}>&larr; Back to the Index</button>
      </div>
    </div>
  );
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const TRUST_BADGES = ["Independent", "Source-linked", "Regularly updated", "No payer sponsorship", "Operational reporting"];

// ─── ROOT COMPONENT ──────────────────────────────────────────────────────────

export default function PriorAuthIndex() {
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState(null);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "metrics", label: "Metrics" },
    { id: "tracker", label: "CMS Compliance Tracker" },
    { id: "newsletter", label: "The Prior Auth Report" },
    { id: "insights", label: "Insights" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavigate = (pageId) => {
    setPage(pageId);
    setMobileMenuOpen(false);
    if (pageId !== "insights") setSelectedInsight(null);
    window.scrollTo(0, 0);
  };

  const openArticle = (post) => {
    setSelectedInsight(post);
    setPage("insights");
    window.scrollTo(0, 0);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fa", color: "#1a1a2e", fontFamily: "'IBM Plex Sans', -apple-system, system-ui, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @media (max-width: 600px) {
          .pai-nav-desktop { display: none !important; }
          .pai-nav-hamburger { display: block !important; }
          .pai-embed-wrap { padding: 14px 10px !important; }
        }
      `}</style>

      <div style={{ background: "#1a365d", padding: "0 20px", position: "relative" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="pai-nav-desktop" style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
            {navItems.map((item) => (
              <button key={item.id} onClick={() => handleNavigate(item.id)} style={{
                padding: "12px 16px",
                background: page === item.id ? "rgba(255,255,255,0.12)" : "transparent",
                border: "none",
                borderBottom: page === item.id ? "2px solid #fff" : "2px solid transparent",
                color: page === item.id ? "#fff" : "rgba(255,255,255,0.65)",
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                fontFamily: "'IBM Plex Sans', sans-serif",
                transition: "all 0.15s ease", whiteSpace: "nowrap",
              }}>
                {item.label}
              </button>
            ))}
          </div>
          <button className="pai-nav-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Open navigation menu" aria-expanded={mobileMenuOpen}
            style={{ display: "none", background: "transparent", border: "none", color: "#fff", fontSize: 24, lineHeight: 1, padding: "12px 0", cursor: "pointer" }}>
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#1a365d", borderTop: "1px solid rgba(255,255,255,0.12)", zIndex: 100, boxShadow: "0 8px 18px rgba(15,23,42,0.18)" }}>
            <div style={{ maxWidth: 720, margin: "0 auto", padding: "4px 20px 10px" }}>
              {navItems.map((item) => (
                <button key={item.id} onClick={() => handleNavigate(item.id)} style={{
                  width: "100%", padding: "13px 0", background: "transparent", border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.10)",
                  color: page === item.id ? "#fff" : "rgba(255,255,255,0.78)",
                  textAlign: "left", fontSize: 13, fontWeight: page === item.id ? 700 : 600,
                  cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif",
                }}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ background: "#fff", borderBottom: "3px solid #1a365d", padding: "28px 20px 22px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 18, height: 3, background: "#1a365d", borderRadius: 2 }} />
            <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 2.5, color: "#1a365d", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>Independent Prior Authorization Data</span>
          </div>
          <h1 style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.15, margin: 0, color: "#1a365d" }}>The Prior Auth Index</h1>
          <p style={{ color: "#333", fontSize: 14, marginTop: 10, lineHeight: 1.5, maxWidth: 580, fontWeight: 500 }}>Structured tracking of prior authorization reporting, payer publication patterns, and workflow-related metrics across U.S. health plans. Built from public data sources.</p>
          <p style={{ color: "#aaa", fontSize: 10, marginTop: 10, fontFamily: "'IBM Plex Mono', monospace" }}>Created by Ashley Murray | Updated monthly | Last updated June 2026</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
            {TRUST_BADGES.map((badge) => (
              <span key={badge} style={{ background: "#fff", border: "1px solid #dbe3ec", color: "#1a365d", fontSize: 11, fontFamily: "'IBM Plex Mono', monospace", borderRadius: 999, padding: "5px 9px", display: "inline-block" }}>{badge}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 20px 48px" }}>

        {page === "home" && (
          <>
            <div style={{
              background: "#fff", border: "1px solid #d1dce8", borderLeft: "4px solid #1a365d",
              borderRadius: 10, padding: "22px 24px", marginBottom: 24,
              boxShadow: "0 2px 10px rgba(26,54,93,0.06)",
            }}>
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1.8, color: "#1a365d", fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>Latest Insight</span>
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#1a365d", lineHeight: 1.3, marginBottom: 10 }}>{INSIGHTS_POSTS[0].title}</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7, marginBottom: 18 }}>{INSIGHTS_POSTS[0].excerpt}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                <button onClick={() => openArticle(INSIGHTS_POSTS[0])}
                  style={{ background: "#1a365d", color: "#fff", border: "none", borderRadius: 6, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }}>
                  Read analysis →
                </button>
                <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'IBM Plex Mono', monospace" }}>{INSIGHTS_POSTS[0].date} · {INSIGHTS_POSTS[0].readTime}</span>
              </div>
            </div>

            <div style={{ fontSize: 20, fontWeight: 700, color: "#1a365d", marginBottom: 4 }}>The Prior Auth Report</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "#1a365d", marginBottom: 6 }}>Prior authorization reporting and operational patterns.</div>
            <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 14 }}>
              Monthly analysis of prior authorization reporting patterns, payer behavior, and workflow variation across U.S. health plans.
              <div style={{ fontSize: 12, color: "#777", marginTop: 6 }}>Launching July 2026. Early subscribers get the first issue.</div>
            </div>
            <div className="pai-embed-wrap" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "22px 20px", marginBottom: 20 }}>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  setStatus("loading");
                  try {
                    const res = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
                    const data = await res.json();
                    if (!res.ok) { setStatus("error"); return; }
                    setStatus("success"); e.target.reset();
                  } catch (err) { setStatus("error"); }
                }}
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                <input name="email" type="email" placeholder="Enter your email" required style={{ padding: "12px", borderRadius: 6, border: "1px solid #d1d5db", fontSize: 14 }} />
                <button type="submit" style={{ padding: "12px", background: "#1a365d", color: "#fff", border: "none", borderRadius: 6, fontWeight: 600, cursor: "pointer" }}>
                  {status === "loading" ? "Joining..." : "Join the Report Waitlist"}
                </button>
                {status === "success" && <p style={{ color: "#1a7f37", fontSize: 13, fontWeight: 500 }}>Subscription confirmed. First issue scheduled for July 2026.</p>}
                {status === "error" && <p style={{ color: "red", fontSize: 13 }}>Submission failed. Please try again.</p>}
              </form>
            </div>

            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 18, marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a365d", marginBottom: 8 }}>What is prior authorization?</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>Prior authorization is a requirement that clinicians obtain approval from an insurer before providing certain treatments, procedures, or medications. The insurer reviews the request against applicable criteria and issues a determination. The Prior Auth Index tracks public reporting related to this process, including approval rates, denial rates, decision timelines, appeal outcomes, and source availability.</div>
            </div>

            <Collapsible title="What is this site?">
              Under CMS rule CMS-0057-F, impacted health plans are required to publicly report prior authorization metrics including approval rates, denial rates, appeal outcomes, and decision timelines. The Prior Auth Index tracks where this reporting is available, how it is formatted, and whether required metrics are present at the reviewed source locations.
            </Collapsible>
            <Collapsible title="Why do some companies appear more than once?">
              Many insurance companies sell more than one type of plan. For example, UnitedHealthcare offers both <strong>Medicare Advantage</strong> plans (for people 65 and older or those with certain disabilities) and <strong>ACA Marketplace</strong> plans (for people under 65 who buy insurance through HealthCare.gov). The same company can have very different denial rates depending on the type of plan. That is why you may see a company listed under both categories with different numbers.
            </Collapsible>
            <Collapsible title="Is this every health plan in the country?">
              No. There are hundreds of health plans in the United States. This database currently includes major national insurers and selected plan-level disclosures for which public data is available. It does not yet include most regional plans, smaller Medicaid managed care plans, employer-sponsored plans that are outside the rule scope, or individual state-level BCBS affiliates. The database is updated as additional public reporting is identified.
            </Collapsible>

            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 20, marginTop: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a365d", marginBottom: 10 }}>Purpose and scope</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                <p style={{ margin: 0, marginBottom: 10 }}>Prior authorization reporting is now subject to public disclosure requirements under CMS-0057-F. Publication status alone does not establish usability, comparability, or completeness. Plans report in different formats, at different URLs, with inconsistent definitions and varying levels of granularity.</p>
                <p style={{ margin: 0, marginBottom: 10 }}>The result is a fragmented public dataset that requires source mapping, normalization, and review before it can be interpreted across plans.</p>
                <p style={{ margin: 0 }}>The Prior Auth Index maps source locations, tracks publication status, summarizes available metrics, and identifies limitations in usability and comparability.</p>
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 20, marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1a365d", marginBottom: 10 }}>Who this is for</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                <p style={{ margin: 0, marginBottom: 10 }}>The Prior Auth Index is designed for users who need to review prior authorization reporting across operational, policy, and market contexts:</p>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li>Revenue cycle and utilization management teams tracking payer reporting patterns</li>
                  <li>Consultants and analysts researching prior authorization reporting across markets</li>
                  <li>Healthtech operators evaluating payer reporting infrastructure</li>
                  <li>Payer strategy and contracting teams reviewing plan-level metrics</li>
                  <li>Journalists and researchers studying prior authorization patterns</li>
                  <li>Users who need to interpret published prior authorization reporting</li>
                </ul>
              </div>
            </div>

            <div style={{ fontSize: 10, color: "#aaa", textAlign: "center", marginBottom: 12, fontFamily: "'IBM Plex Mono', monospace" }}>
              Mapping prior authorization reporting patterns as the public dataset matures.
            </div>

            <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: 20, marginTop: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1a365d", marginBottom: 6 }}>Plan-level prior authorization metrics</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, marginBottom: 14 }}>Denial rates, appeal overturn patterns, and published 2025 metrics across major U.S. health plans, with source links and plan-level context.</div>
              <button onClick={() => handleNavigate("metrics")} style={{ padding: "10px 20px", background: "#1a365d", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'IBM Plex Sans', sans-serif" }}>
                View Metrics →
              </button>
            </div>
          </>
        )}

        {page === "metrics" && <MetricsPage onNavigate={handleNavigate} />}
        {page === "tracker" && <ComplianceTracker />}
        {page === "newsletter" && <NewsletterPage onNavigate={handleNavigate} status={status} setStatus={setStatus} />}
        {page === "insights" && (
          <InsightsPage
            onNavigate={handleNavigate}
            selectedInsight={selectedInsight}
            setSelectedInsight={(post) => { setSelectedInsight(post); if (post) window.scrollTo(0, 0); }}
          />
        )}
        {page === "about" && <AboutPage onNavigate={handleNavigate} />}
        {page === "contact" && <ContactPage onNavigate={handleNavigate} />}

        <div style={{ textAlign: "center", padding: "28px 0 0", color: "#bbb", fontSize: 10, fontFamily: "'IBM Plex Mono', monospace" }}>The Prior Auth Index | 2026</div>
      </div>
    </div>
  );
}
