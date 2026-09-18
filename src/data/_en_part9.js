// EN-переводы блога, часть 8 - музыкальный блок (сентябрь 2026):
// Suno, цены и права, скачивание, как собрать песню, вокал не на английском.
// Русские оригиналы - в blog-posts.js.
//
// Это не дословные переводы: русские версии построены вокруг оплаты из
// России, а англоязычному читателю продаёт другой довод - одна подписка
// вместо пяти, и отказ карты как общая проблема, а не российская.
const PART_9 = [
  {
    slug: 'chatgpt-v-rossii',
    category: 'Models & comparisons',
    title: 'ChatGPT Pricing in 2026: Free, Go, Plus, Pro - and the $200 Tier Nobody Can Sign Up For Right Now',
    description:
      'A plan-by-plan breakdown of ChatGPT\'s Free, Go, Plus and Pro tiers in September 2026, what GPT-5.6\'s three model tracks actually mean, and why new sign-ups to the $200 Pro tier have been paused since September 10.',
    keywords:
      'chatgpt pricing 2026, chatgpt plus price, chatgpt pro 200, chatgpt go, gpt-5.6, chatgpt free vs plus, chatgpt subscription tiers, chatgpt pro paused',
    cover: '/blog-images/chatgpt-pro-chrome-doorman.jpg',
    coverPrompt: 'Fashion editorial, hard directional studio strobe light, high contrast, clean white cyclorama background. Three minimalist brushed-chrome doors, flush and seamless, no ornate trim or mouldings. A tall doorman in sharp monochrome tailoring stands with one arm firmly extended flat against the center chrome door, blocking it, expression composed and poised. To either side the other two chrome doors stand open, and equally styled fashion models walk through them confidently, unbothered, captured like a Vogue cover shoot. No readable signage, numbers or lettering anywhere in frame. Shot on Arricam LT with Cooke S4/i primes, 35mm Kodak Vision3 500T, T2.8, shallow depth of field, halation on highlights, fine organic grain, lifted milky blacks, low contrast, no sharpening, no HDR.',
    coverCaption: 'The priciest door is held shut for new arrivals. Everyone who already has access keeps walking through the other two.',
    coverSource: 'AI-generation AIVFX (Seedream 5 Pro)',
    date: '2026-09-18',
    dateModified: '2026-09-18',
    readingTime: '8 min',
    related: ['suno-v-rossii', 'kak-oplatit-neyroset-iz-rossii', 'agregatory-ai-servisov'],
    partner: 'syntx',
    facts: [
      { label: 'New Pro-200 signups', value: 'Paused since Sep 10, 2026', tone: 'no' },
      { label: 'Existing Pro-200 & Pro-100', value: 'Unaffected by the pause', tone: 'yes' },
      { label: 'Current model family', value: 'GPT-5.6: Sol, Terra, Luna' },
      { label: 'Five subscriptions', value: 'One via SYNTX', href: 'partner:syntx' },
    ],
    excerpt:
      'ChatGPT now has five paid doors and one free one, and since September 10, 2026 the most expensive of them has a sign on it most comparison posts have not caught up with yet: new subscriptions and upgrades to the $200 Pro tier are paused. Here is what Free, Go, Plus and both Pro tiers actually give you, what GPT-5.6\'s three model tracks mean for which plan you land on, and what actually stands between people and any of these plans when a card gets declined.',
    content: [
      { type: 'p', text: 'ChatGPT\'s pricing page looks the same as it did a year ago: a row of plans, a row of checkmarks. What changed is underneath it. In July 2026 OpenAI shipped a new model generation, GPT-5.6, split into three separate tracks instead of one flagship, and on September 10, 2026 it quietly closed the door on new sign-ups to its most expensive tier. Neither change shows up clearly on the pricing page itself. Here is what each plan actually gives you as of September 2026, what the model split means in practice, and exactly what the September 10 pause does and does not affect.' },
      { type: 'h2', text: 'The five ChatGPT plans, plan by plan' },
      { type: 'p', text: 'There is one free plan and four paid ones, and the paid four split into two pairs: a cheap pair most people compare against Free, and two Pro tiers that get compared against each other far less often than they should be, because as of this month they are no longer equally available.' },
      { type: 'ul', items: [
        '**Free - $0.** Runs Luna, the fastest and lightest of the three GPT-5.6 tracks. Basic message limits, a small allowance of image generation, no downloads or account requirements beyond signing up.',
        '**Go - around $8/month** (price and currency vary by country). Also runs Luna, but with roughly ten times Free\'s limits, longer memory, and access to Custom GPTs. Go rolled out worldwide on January 15-16, 2026, to around 170 countries, after being available only in India since August 2025.',
        '**Plus - $20/month, billed monthly only.** Runs Sol, the flagship track. This is the standard paid tier, and OpenAI has held it at $20 since launch with no annual discount on offer - there is no way to pay less by committing to a year.',
        '**Pro-100 - $100/month.** Runs Sol at a higher usage tier, giving roughly 5x Plus\'s limits.',
        '**Pro-200 - $200/month.** Runs the same Sol Pro tier at roughly 20x Plus\'s limits, with up to 250 Deep Research tasks a month. This is the tier that stopped taking new sign-ups on September 10, 2026, covered in full below.',
      ] },
      { type: 'p', text: 'OpenAI also sells Business plans, Standard at roughly $20-25 per seat a month and Premium at roughly $100-125 per seat, both with a two-seat minimum. Those are a separate track for teams and not the focus here, but if a team is weighing them against a stack of individual Pro subscriptions, the seat pricing is worth knowing exists.' },
      { type: 'h2', text: 'GPT-5.6 is not one model - it is three tracks of the same generation' },
      { type: 'p', text: 'This is the part most pricing comparisons get wrong by default, because the names read like a ladder: Sol, Terra, Luna. They are not. GPT-5.6 is one generation released in July 2026, and Sol, Terra and Luna are three models built inside it for three different jobs, not three sequential versions where one supersedes the last.' },
      { type: 'ul', items: [
        '**Sol** is the flagship: heavy reasoning, code, and agentic tasks that need the model to plan and act across several steps.',
        '**Terra** is a price-and-quality balance, roughly at the level the old GPT-5.5 sat at, but cheaper and faster to run.',
        '**Luna** is the fastest and cheapest of the three, built for volume rather than depth.',
      ] },
      { type: 'p', text: 'Free and Go run on Luna. Plus and both Pro tiers run on Sol. There is no plan that runs Terra as its primary model in the current lineup - it exists as the middle option in OpenAI\'s stack rather than something a subscriber picks directly. Calling Terra an "upgrade" from Luna or a "downgrade" from Sol misses the point: they are parallel models tuned for different work, not stages of the same climb.' },
      { type: 'p', text: 'One date worth marking on a calendar: GPT-5.5, the model that had been the default in ChatGPT since May 5, 2026, is being retired from the product completely on October 14, 2026, across every tier. After that date there is no fallback to the previous generation - GPT-5.6\'s three tracks are what everyone is on.' },
      { type: 'h2', text: 'What actually changed on September 10: the $200 tier stopped taking new sign-ups' },
      { type: 'p', text: 'On September 10, 2026, OpenAI paused new subscriptions and upgrades to the $200 Pro tier. That is the entire scope of the change, and it is worth being precise about what it does not touch.' },
      { type: 'quote', text: 'Existing Pro-200 subscriptions keep running exactly as before. Any Pro-100 subscription, whether it started before September 10 or is opened today, is unaffected by the pause. The freeze applies to one specific action: a new sign-up or an upgrade into the $200 tier from now on.' },
      { type: 'p', text: 'OpenAI has not announced when new Pro-200 sign-ups will reopen. Practically, that means the ceiling for anyone starting a subscription fresh right now is Pro-100: $100/month, Sol, roughly 5x Plus\'s limits. The extra headroom that comes with Pro-200, the 20x multiplier and up to 250 Deep Research tasks a month, is currently only available to people who already had that subscription active before the pause took effect.' },
      { type: 'p', text: 'If Pro-100 already covers what you need, nothing here changes anything. If the workload genuinely needs Pro-200\'s ceiling and you were not already subscribed before September 10, the honest answer is that the door is closed for the moment, with no reopening date on the record.' },
      { type: 'h2', text: 'Not to be confused with Sora' },
      { type: 'p', text: 'A separate, unrelated thing happened to a different OpenAI product this year and it is worth ruling out explicitly, because the two get mixed up in searches. Sora is OpenAI\'s video-generation product, not a ChatGPT plan or feature, and it has been wound down on its own schedule: the Sora site and app closed on April 26, 2026, and the API goes dark on September 24, 2026. That has nothing to do with ChatGPT\'s health or the Pro-200 pause above - it is a decision about a different product, made months apart from the pricing change covered here. ChatGPT itself shipped a new model generation two months before the pause, which is not the profile of a product being scaled back.' },
      { type: 'h2', text: 'The real reason people get stuck is the card, not the region' },
      { type: 'p', text: 'ChatGPT is not blocked by region anywhere the pricing itself would suggest: the interface loads, sign-up works, generation runs, with no restriction tied to IP address or language. The wall shows up one step later, at checkout, and it is a payments problem rather than an access problem.' },
      { type: 'p', text: 'OpenAI bills subscriptions through Stripe, and Stripe has declined cards issued by banks in a long list of countries since 2022, for routing reasons that sit entirely on the payments side and have nothing to do with whether OpenAI wants the business. This shows up as a subscription that fails at checkout in India, Brazil, Turkey, Nigeria, Argentina, and plenty of other places - anywhere the card was not issued by a bank the gateway was built to expect. There is no official way to pay OpenAI in a currency Stripe does not route, and that has not changed.' },
      { type: 'p', text: 'This works out to a fix that has nothing to do with waiting for OpenAI to add a new payment option: routing the subscription through a biller that already clears locally solves it today, without touching the plan itself.' },
      { type: 'h2', text: 'One subscription instead of five' },
      { type: 'p', text: 'ChatGPT is rarely the only AI subscription anyone is running. Most people paying for it are also paying for an image model, a video model, and often a separate voice or music model on top, each with its own monthly charge and its own place for a card to fail. Four subscriptions becomes five fast, and each one is a fresh roll of the same checkout dice described above.' },
      { type: 'p', text: 'We route generation for client work through [SYNTX](partner:syntx) for exactly this reason: one subscription and one card instead of four or five separate ones, billed once, on a card that actually clears. Check the catalog before you pay, since what is listed there shifts over time, and confirm whichever model you actually need, ChatGPT included, is on it before committing.' },
      { type: 'h2', text: 'Frequently asked questions' },
      { type: 'h3', text: 'What actually changed with ChatGPT on September 10, 2026?' },
      { type: 'p', text: 'OpenAI paused new subscriptions and upgrades to the $200 Pro tier. Existing Pro-200 subscriptions and any Pro-100 subscription, new or old, keep working exactly as they did before. No return date for new Pro-200 sign-ups has been announced.' },
      { type: 'h3', text: 'Can I still get the top ChatGPT tier as a new subscriber?' },
      { type: 'p', text: 'The $100 Pro tier is fully open to new subscribers right now, running the same Sol model with roughly 5x Plus\'s limits - that is the practical ceiling for anyone starting fresh until sign-ups to the $200 tier reopen, and OpenAI has not given a date for that.' },
      { type: 'h3', text: 'Are Sol, Terra and Luna different versions of the same model?' },
      { type: 'p', text: 'They are three tracks of the same generation, GPT-5.6, not sequential versions. Sol is built for heavy reasoning, code and agentic work; Terra balances price and quality; Luna is the fastest and cheapest. Free and Go run Luna, Plus and both Pro tiers run Sol.' },
      { type: 'h3', text: 'Is Sora shutting down part of the same story as ChatGPT?' },
      { type: 'p', text: 'Sora and ChatGPT are unrelated products with unrelated timelines here. Sora is OpenAI\'s separate video-generation product, wound down on its own schedule - the site and app closed April 26, 2026, and the API goes dark September 24, 2026. It has no bearing on ChatGPT, which shipped a new model generation, GPT-5.6, in July 2026.' },
      { type: 'h3', text: 'Why does my card get declined even though ChatGPT loads and works fine?' },
      { type: 'p', text: 'This works out to a checkout problem rather than an access problem. ChatGPT itself is not geo-blocked, but the subscription bills through Stripe, which has declined cards from a long list of countries since 2022 for routing reasons unrelated to the product. India, Brazil, Turkey, Nigeria and Argentina all see the same decline on plenty of other US-billed subscriptions, not only this one.' },
      { type: 'h3', text: 'Is there a way to pay for ChatGPT if my own card will not clear?' },
      { type: 'p', text: 'Routing the subscription through a biller that already clears locally is the straightforward fix. We use [SYNTX](partner:syntx) for exactly this on client work, one subscription and one card instead of several. Check its catalog before paying, since what is listed shifts over time and ChatGPT\'s presence there is not guaranteed.' },
      { type: 'cta' },
    ],
  },
];

export default PART_9;
