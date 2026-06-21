const SECTION_HEADINGS = [
  "When the Problem Is Not Clinical",
  "When the Workflow and Eligibility System Disagree",
  "What the Denial Rate Compresses Together",
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
  "What Happens After a Denial",
  "How Operational Variability Accumulates",
  "The Gap Between Publication and Workflow Clarity",
  "The Outcome Is Not the Story",
  "What Maximus Introduces Into the Equation",
  "What the Data Can and Cannot Tell You",
];

const SUB_HEADINGS = [
  "Category 1: No page exists at all.",
  "Category 2: A page exists but contains the wrong data.",
  "Category 3: A page exists but is functionally inaccessible.",
  "Category 4: The data exists but is not machine-readable or comparable.",
];

export const INSIGHTS_POSTS = [
    {
    slug: "what-an-overturned-denial-is-actually-measuring",
    title: "What an Overturned Denial Is Actually Measuring",
    date: "June 21, 2026",
    readTime: "5 min read",
    excerpt:
      "An overturned prior authorization denial is not a single operational event. It can reflect new documentation, a different interpretation, or external review, but those pathways disappear once the outcome becomes a reported rate.",
    content: `Prior authorization transparency created public visibility into what health plans are deciding. Overturn rates are part of that picture, and as CMS enforcement expands, they are becoming one of the more closely watched numbers in the dataset. But an overturned denial is not a single operational event. It is a category that contains several different ones, and the distinction between them mostly disappears once the outcome enters reporting.

The Outcome Is Not the Story

When a prior authorization denial gets overturned, public reporting records one thing: the denial was reversed. That outcome enters the dataset, gets aggregated with every other overturn, and eventually surfaces as a rate.

What it does not preserve is how the reversal happened, or why.

An overturned denial can mean that additional clinical documentation was submitted after the initial decision. It can mean that a second reviewer interpreted the same clinical picture differently than the first. It can mean that new information surfaced during the appeal that changed the evidentiary basis of the case. From the outside, those situations are indistinguishable. The metric collapses them into a single category and moves on.

What Maximus Introduces Into the Equation

For Medicare Advantage appeals, cases that are not resolved internally can eventually reach Maximus for independent external review. Once a case moves outside the plan’s own review structure, it is no longer being evaluated internally. An external reviewer is examining how the denial was constructed, whether the documentation supports it, and whether it holds up against the applicable coverage criteria.

An overturn at that stage occurs under different conditions than one that happened earlier in the process, and it carries different implications for Star Ratings and CMS audit exposure. Once a case reaches external review, the final decision no longer rests with the health plan.

That distinction surfaced in a conversation about how appeal resolution actually works: “We don’t want this to go to Maximus.” The comment highlights a distinction the overturn rate does not preserve. A denial reversed internally and a denial reversed at external review both enter the same reporting category. The pathway that produced each outcome does not.

What the Data Can and Cannot Tell You

The overturn rate at any single point in time has limited analytical value on its own. The more useful question is whether it has changed, and what was happening at the same time it did. A significant shift in appeal overturn rates, upheld appeals, or total appeal volume is worth examining even without knowing the cause — because the public data can identify that a shift occurred, but determining what produced it often requires information that exists outside the reporting itself.

Overturn rates describe the frequency of reversals. The circumstances that produced those reversals largely do not travel with the metric. As prior authorization reporting becomes more widely used, that distinction may become increasingly important. The data can identify that a denial was overturned. Understanding why it was overturned is often a separate question.

The Prior Auth Report launches in late July with ongoing analysis of payer behavior, workflow burden, and the operational patterns emerging underneath prior authorization transparency data. If you want structured analysis delivered directly to your inbox as this reporting landscape evolves, the newsletter waitlist is below.`,
  },
  {
    slug: "prior-authorization-requirements-and-workflow-clarity",
    title:
      "Prior Authorization Requirements and Workflow Clarity: Two Separate Problems",
    date: "June 14, 2026",
    readTime: "6 min read",
    excerpt:
      "Publishing prior authorization requirements and creating operational clarity around those requirements are separate problems. The denial itself often does not explain what actually needs to change before resubmission.",
    content: `A physician described the current prior authorization process as “trial and error.”

The phrase reflects a pattern that continues surfacing across conversations involving utilization management, provider operations, and prior authorization administration. Payers operate through different submission pathways, documentation requirements, portal structures, and review behaviors. Even when formal criteria are publicly available, the workflow surrounding a request can become highly variable once a denial occurs.

Criteria availability and correction pathway clarity are separate operational conditions.

What Happens After a Denial

The denial itself often does not clearly explain what needs to change before resubmission.

In some cases, additional clinical documentation resolves the issue. In others, the underlying problem involves submission structure, eligibility timing, notification handling, or administrative workflow failures occurring earlier in the process. Situations that initially appear operationally similar can ultimately require correction pathways addressing entirely different parts of the system.

A clinical documentation gap does not route through the same intervention as an administrative submission failure or a portal workflow issue.

That uncertainty creates an environment where internal teams spend significant time attempting to reconstruct what the payer actually needed from the original submission and what adjustment is required before the request can move forward. The operational work generated during that process does not appear anywhere in the published prior authorization metrics.

How Operational Variability Accumulates

Provider-side organizations frequently develop payer-specific institutional knowledge simply to navigate inconsistencies between systems.

Different payers may require different forms of documentation, structure portal workflows differently, respond differently to denials, or interpret submission sufficiency differently. The result is that operational teams are often left interpreting payer workflow behavior after a denial has already occurred instead of following a consistently predictable correction process.

That interpretation work, and the rework generated when the interpretation is wrong, represents a recurring source of administrative burden sitting underneath the visible denial and appeal metrics.

The issue is not usually criteria availability. Criteria are frequently published. The issue is whether the workflow surrounding those criteria is operationally legible enough that a denial produces a clear correction pathway rather than a new round of investigation.

The Gap Between Publication and Workflow Clarity

One of the more persistent patterns across prior authorization conversations is that publishing requirements and creating operational clarity around those requirements address separate problems.

When a denial occurs, the visible outcome is the denial itself. The less visible portion is the interpretation, reassessment, and coordination that follows while teams attempt to determine what actually resolves the issue. Depending on how far the case moves, that work can involve nurses, prior authorization specialists, administrative coordinators, revenue cycle staff, appeals teams, and outside vendors.

It is generated by the gap between what was published and what was operationally needed to navigate the review process successfully.

Aggregate approval rates and denial rates do not capture this dynamic. They describe the outcome of the review process. They do not describe the amount of operational movement required to produce that outcome, or how much of that movement was generated by ambiguity rather than genuine clinical disagreement.

Prior authorization transparency created public visibility into what payers are deciding. The operational question the data has not yet answered is how clear the pathway to a different decision actually is once the first one goes wrong.

The Prior Auth Report launches in late July with ongoing analysis of payer behavior, workflow burden, and the operational patterns emerging underneath prior authorization transparency data.

If you want structured analysis delivered directly to your inbox as this reporting landscape evolves, the newsletter waitlist is below.`,
  },
  {
    slug: "the-denial-rate-has-a-resolution-problem",
    title: "The Denial Rate Has a Resolution Problem",
    date: "June 7, 2026",
    readTime: "5 min read",
    excerpt:
      "Prior authorization denial rates are reported as a single outcome category. The operational pathways producing those denials are not reported at all.",
    content: `Prior authorization denial rates are reported as a single outcome category. The operational pathways producing those denials are not reported at all.

Across multiple conversations involving utilization management and hospital operations, several examples surfaced where the denial did not originate from clinical disagreement but from workflow handling, classification structure, eligibility timing, or submission mechanics occurring elsewhere in the process. Those distinctions disappear once the event enters aggregate reporting.

When the Problem Is Not Clinical

One source described a preventative test denied because the service was not recognized as preventative within the claims workflow.

"We had a preventative test done, and the insurance didn't pay it because the claims person in the claims department didn't know it was preventative."

Another described denials originating from submission pathway issues rather than from the underlying clinical request.

"It doesn't have anything to do with clinical, you just didn't click the right button."

In both cases, the denial appeared within reporting data despite the breakdown occurring outside clinical review entirely.

The correction pathway afterward depends on where the workflow failed. A classification issue may require coding correction and resubmission. A submission pathway failure may require identifying where the routing structure broke down in the first place. The reported denial outcome does not preserve those distinctions.

When the Workflow and Eligibility System Disagree

A utilization review executive described a separate category involving eligibility synchronization gaps between systems.

"Some of our payers don't update us on the eligibility of the patients for up to 15 days after they've terminated their coverage."

A patient could appear active within the provider's operational environment while payer termination records had already updated elsewhere. The authorization pathway looked valid at the time of submission. The clinical documentation may be correct. The submission pathway may also be correct. The denial still originates from a timing discrepancy between systems that are supposed to reflect the same coverage status but do not update simultaneously.

What the Denial Rate Compresses Together

As public prior authorization reporting expands, denial percentages will likely become among the most visible metrics associated with payer behavior. But the operational structure underneath those denials is considerably more variable than the reporting suggests.

As one source noted, the detail that explains those differences does not travel into the claims data.

"You're not going to see what we're talking about here in the claims data."

The denial rate captures the outcome. The operational pathway that produced the denial is often much harder to see.

The Prior Auth Report launches in late July with ongoing analysis of prior authorization operations, payer workflow variation, denial activity, and the evolving transparency landscape surrounding utilization management data. The waitlist is open below.`,
  },
  {
    slug: "before-the-decision-and-after-it",
    title:
      "Before the Decision and After It: The Hidden Labor Cost of Prior Authorization",
    date: "May 31, 2026",
    readTime: "6 min read",
    excerpt:
      "Across interviews with utilization management and hospital operations professionals, a recurring pattern emerged: prior authorization metrics capture outcomes, while the operational burden surrounding those outcomes remains completely invisible.",
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
    title:
      "UnitedHealthcare Is Cutting Prior Auth for 30% of Services. Here's What That Actually Covers.",
    date: "May 17, 2026",
    readTime: "6 min read",
    excerpt:
      "UnitedHealthcare's 30% prior authorization reduction sounds broad, but the impact depends on the denominator: prior authorization applies to about 2% of its medical services. This analysis looks at what the announcement changes, what it does not, and why service-level reporting matters.",
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
    title:
      "Prior Auth Transparency Is Live. Most of It Isn't Usable.",
    date: "May 10, 2026",
    readTime: "8 min read",
    excerpt:
      "Original analysis from 1,300+ health plan entries on what is actually missing from the first year of CMS prior authorization transparency reporting.",
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

export { SECTION_HEADINGS, SUB_HEADINGS };