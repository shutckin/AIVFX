// EN-переводы блога, часть 8 - музыкальный блок (сентябрь 2026):
// Suno, цены и права, скачивание, как собрать песню, вокал не на английском.
// Русские оригиналы - в blog-posts.js.
//
// Это не дословные переводы: русские версии построены вокруг оплаты из
// России, а англоязычному читателю продаёт другой довод - одна подписка
// вместо пяти, и отказ карты как общая проблема, а не российская.
const PART_11 = [
  {
    slug: 'claude-v-2026',
    category: 'Models & comparisons',
    title: 'Claude in 2026: Pricing, Opus 5 and Fable 5.1, and What Happened to Claude Code\'s Limits on September 14',
    description:
      'A plan-by-plan breakdown of Claude\'s Free, Pro, Max 5x and Max 20x tiers in September 2026, what Fable 5.1 / Opus 5 / Sonnet 5 / Haiku 4.5 actually mean, and why Claude Code users are getting less capacity than they had all summer.',
    keywords:
      'claude pricing 2026, claude max 200, claude pro price, claude code limits, fable 5.1, opus 5, sonnet 5, haiku 4.5, claude subscription tiers',
    cover: '/blog-images/claude-hourglass-asterisk.jpg',
    coverPrompt: 'Editorial photograph, hard directional studio strobe, high contrast, dark background. A model sits at a minimalist chrome-and-glass desk, one hand resting beside an large hourglass-shaped sculptural object built from frosted glass, where the falling sand inside has been replaced by dozens of small glowing orange asterisk shapes (Anthropic\'s own six-pointed asterisk mark) trickling from the wider upper chamber into a narrower lower chamber, visually showing more room above and less room below. The model looks at the object with calm, appraising attention, not alarm. One single crisp large orange asterisk mark glows on a monitor screen in the background for scale and clarity. Shot on Arricam LT with Cooke S4/i primes, 35mm Kodak Vision3 500T, T2.8, shallow depth of field, halation on highlights, fine organic grain, lifted milky blacks, low contrast, no sharpening, no HDR.',
    coverCaption: 'The upper chamber used to feed a wider one below. On September 14, the lower chamber got narrower for good.',
    coverSource: 'AI-generation AIVFX (Seedream 5 Pro)',
    date: '2026-09-18',
    dateModified: '2026-09-18',
    readingTime: '8 min',
    related: ['chatgpt-v-rossii', 'kak-oplatit-neyroset-iz-rossii', 'agregatory-ai-servisov'],
    partner: 'syntx',
    facts: [
      { label: 'Claude Code weekly limits', value: '+25% permanent, replacing a +50% temporary boost', tone: 'no' },
      { label: 'Net change from the May boost', value: 'Roughly 17% less capacity than recent months', tone: 'no' },
      { label: 'Top tier', value: 'Max 20x at $200/month, only plan with Fable 5.1' },
      { label: 'One subscription instead of five', value: 'Check the catalog before you pay', href: 'partner:syntx' },
    ],
    excerpt:
      'Claude\'s pricing page still shows the same four familiar tiers, but two things moved underneath it this month. Anthropic\'s current lineup splits into four separate models built for different jobs, not one flagship with version numbers, and on September 14, 2026, a permanent 25% increase to Claude Code\'s weekly usage limits replaced the temporary 50% boost that had been running since May - which means anyone who got used to that boost is now working with noticeably less room than they had all summer. Here is what each plan actually gives you, what the four models are actually for, and what changed for Claude Code users this week.',
    content: [
      { type: 'p', text: 'Claude\'s pricing page has not been redesigned in a while: four tiers, a list of what each one unlocks. What is worth catching up on is what sits underneath that page right now - a four-model lineup that does not work like a version ladder, and a change to Claude Code\'s usage limits that took effect on September 14, 2026, and quietly made the most expensive tier feel smaller than it did all summer. Here is a plan-by-plan breakdown, what the model names actually mean, and what the September 14 change does and does not affect.' },
      { type: 'h2', text: 'The Claude plans, tier by tier' },
      { type: 'p', text: 'There is one free plan and four paid tiers, plus team and enterprise pricing on top. The jump between tiers is mostly about how much you can use in a session and which models you can reach, not a completely different product at each step.' },
      { type: 'ul', items: [
        '**Free - $0.** Runs Sonnet 5 as the default model, with a 200K-token context window. Includes chat on web, phone and desktop, web search, memory, file creation, code execution and voice mode.',
        '**Pro - $20/month, or $17/month billed annually.** Adds access to Opus 5, a larger session allowance than Free, Claude Code, and Google Workspace integration.',
        '**Max 5x - $100/month.** Five times Pro\'s session limit, same model access as Pro.',
        '**Max 20x - $200/month.** Twenty times Pro\'s session limit, and the only tier where Fable 5.1 is available at all.',
        '**Team Standard - $25/seat/month** ($20/seat billed annually) **and Team Premium - $125/seat/month** ($100/seat billed annually), both for teams of 2 to 150.',
        '**Enterprise - from $20/seat/year**, plus usage billed at API rates on top.',
      ] },
      { type: 'p', text: 'One detail that trips people up: Free and Pro give you the same base model, Sonnet 5, by default. The difference between those two tiers is mostly about how much you can use in a session and which extra tools you get, not which model answers you - Opus 5 only becomes reachable once you are on Pro or above, and Fable 5.1 only on Max. Claude Code itself is a separate agentic coding tool available from Pro upward, and it runs on its own weekly usage limits, entirely separate from the limits on regular chat.' },
      { type: 'h2', text: 'Fable 5.1, Opus 5, Sonnet 5, Haiku 4.5: four models, not four versions' },
      { type: 'p', text: 'The names read like a ladder, and that reading is wrong. These are four different models built for different jobs within the same generation, not sequential releases where each one replaces the last - the same pattern you will find with most other frontier labs right now, just under different names.' },
      { type: 'ul', items: [
        '**Fable 5.1** is the most capable model Anthropic has released to the general public, built for the heaviest reasoning, the longest agentic runs, complex code, research, and work across documents, spreadsheets and presentations. It is only reachable on Max.',
        '**Opus 5** is the flagship for agentic coding and enterprise work, with a 1M-token context window and up to 128K tokens of output. It becomes available starting on Pro.',
        '**Sonnet 5** is built for agentic code, tool use and reasoning at a lower cost than Opus 5 - it is the default model on Free and Pro.',
        '**Haiku 4.5** is the fastest and cheapest of the four, meant for quick, high-volume tasks rather than the hardest reasoning problems.',
      ] },
      { type: 'p', text: 'Picking a plan, in practice, is picking which of these four you actually need reachable. Someone doing everyday chat and writing rarely needs to leave Sonnet 5 on Free or Pro. Someone running Claude Code against a real codebase usually wants Opus 5 at minimum, which means Pro or above. Fable 5.1\'s long-horizon reasoning is the one capability that is genuinely gated behind the $200 tier, and it is also the model most directly involved in the limits story below.' },
      { type: 'h2', text: 'What happened to Claude Code\'s limits on September 14' },
      { type: 'p', text: 'This is the part of the pricing story that a plain feature comparison will not show you, because it is not about what a tier unlocks - it is about how far the same tier now stretches.' },
      { type: 'quote', text: 'Since May 2026, Claude Code had been running a temporary 50% increase on top of its base weekly usage limits. That temporary boost ended on September 13, 2026, and a new, permanent increase took effect the next day, on September 14 - but the permanent bump is only 25% over the original base limit, not 50%.' },
      { type: 'p', text: 'Do the arithmetic on that and the practical effect is a step down, not up, for anyone who had gotten used to the May boost: roughly 17% less weekly capacity than they had access to for the past several months. Anthropic\'s own framing is that it made the extra headroom permanent while it works on giving users better visibility and control over their usage - a real improvement in stability, just a smaller number than the one people had adapted their workflows around.' },
      { type: 'p', text: 'The tier that absorbed the most complaints is Max at $200/month. Subscribers reported burning through their entire weekly Claude Code allowance in a single task or a short session, a problem that gets worse fast when the work is running on Fable 5.1, which is both the most capable and the most token-hungry model in the lineup. Some of those subscribers cancelled outright; others moved parts of their workload to competing coding tools rather than wait out the tighter ceiling.' },
      { type: 'p', text: 'If your Claude Code usage sits comfortably under the new permanent limit, none of this changes anything for you day to day. If you were running close to the May-era ceiling, the honest read is that the room you had gotten used to is gone, and Anthropic has not signaled a return to the temporary 50% level.' },
      { type: 'h2', text: 'Where a card actually gets declined, and where it does not' },
      { type: 'p', text: 'It is worth being precise here, because Claude is not a case where a card simply fails to clear locally the way it does with some other AI subscriptions. In places where a bank-issued card is declined at checkout for routing reasons that have nothing to do with the product itself - a pattern that shows up on plenty of unrelated US-billed subscriptions in India, Brazil, Turkey, Nigeria and Argentina - the fix is usually just a different way to pay the same service. That is the specific, narrow problem a local billing route solves: a card that will not clear, for a service that is officially available where you are.' },
      { type: 'p', text: 'We route AI subscriptions for client work through [SYNTX](partner:syntx) for exactly that reason: one subscription and one card instead of four or five separate ones, billed through a route that actually clears. Check the catalog before you pay, since what is listed there shifts over time, and confirm whichever model you need is actually on it before committing.' },
      { type: 'h2', text: 'Frequently asked questions' },
      { type: 'h3', text: 'What exactly changed with Claude Code on September 14, 2026?' },
      { type: 'p', text: 'A temporary 50% increase to Claude Code\'s weekly usage limits, running since May 2026, ended on September 13. The next day, a permanent increase of 25% over the original base limit took effect instead. For anyone used to the size of the May boost, the net change works out to roughly 17% less weekly capacity than they had for the past several months.' },
      { type: 'h3', text: 'Which Claude plan actually gives me Fable 5.1?' },
      { type: 'p', text: 'Only Max, at either the $100 (Max 5x) or $200 (Max 20x) tier. Free and Pro give you Sonnet 5 by default, with Opus 5 reachable from Pro upward - Fable 5.1 is gated to Max specifically.' },
      { type: 'h3', text: 'Are Fable 5.1, Opus 5, Sonnet 5 and Haiku 4.5 just newer and older versions of each other?' },
      { type: 'p', text: 'They are four separate models built for different jobs within the same generation, not a sequence where each replaces the last. Fable 5.1 targets the hardest reasoning and longest agentic work, Opus 5 is the agentic-coding and enterprise flagship, Sonnet 5 is the everyday agentic-reasoning default, and Haiku 4.5 is built for speed and volume over depth.' },
      { type: 'h3', text: 'Do Free and Pro run different models?' },
      { type: 'p', text: 'Both default to the same model, Sonnet 5. The difference between the two tiers is mainly session volume and extra tools - Claude Code, Google Workspace integration, a larger allowance - rather than which model answers you. Opus 5 only opens up once you upgrade to Pro or above.' },
      { type: 'h3', text: 'Which Max tier absorbed the September 14 change the hardest?' },
      { type: 'p', text: 'The $200 Max 20x tier saw the most complaints, since it is the tier most likely to be running Fable 5.1 on demanding agentic tasks, and that combination burns through a weekly allowance fastest. Some subscribers cancelled or moved parts of their workload elsewhere after the temporary boost ended.' },
      { type: 'h3', text: 'Why would my card get declined for a Claude subscription if the site loads fine?' },
      { type: 'p', text: 'Where Claude is officially available, a declined card is usually a payments-routing problem rather than an access problem - the same pattern that hits plenty of unrelated US-billed subscriptions in India, Brazil, Turkey, Nigeria and Argentina. Routing the subscription through a biller that already clears locally, like [SYNTX](partner:syntx), is the straightforward fix for that specific problem. Check its catalog before paying, since availability there shifts over time.' },
      { type: 'cta' },
    ],
  },
];

export default PART_11;
