// EN-переводы блога, часть 13 (сентябрь 2026): Syntx или Higgsfield.
// Русский оригинал - в blog-posts.js, слаг syntx-ili-higgsfield.
//
// Не дословный перевод: русская версия построена вокруг оплаты из России,
// а англоязычному читателю продаёт другой довод - одна подписка вместо
// пяти отдельных, и отказ карты как общая проблема, а не российская.
const PART_13 = [
  {
    slug: 'syntx-ili-higgsfield',
    category: 'Roundups & comparisons',
    title: 'Syntx or Higgsfield: Which AI Aggregator to Pick in 2026 If You Only Want One',
    description:
      'Syntx vs Higgsfield after paying for both: September 2026 plans, which models live where, what we really pay for, what annoys us in each, and billing friction.',
    keywords:
      'syntx vs higgsfield, higgsfield vs syntx, syntx ai review, higgsfield review 2026, higgsfield pricing 2026, syntx pricing 2026, ai aggregator comparison, best ai aggregator for video, higgsfield alternatives, one subscription for all ai models',
    cover: '/blog-images/syntx-vs-higgsfield.jpg',
    coverPrompt: 'Photo finish on a stadium track: two sprinters hit the tape chest first, real Syntx and Higgsfield logos on their kits (vectors from the official sites, placed with Nano Banana from references). The idea: two aggregators neck and neck, and the winner depends on who is judging.',
    coverCaption: 'Neck and neck: each has its own working tier, its own unlimited models and its own downsides. Who wins depends on what you do most often.',
    coverSource: 'AIVFX AI generation (Seedream 5 Pro)',
    date: '2026-09-25',
    dateModified: '2026-09-25',
    readingTime: '12 min',
    related: ['agregatory-ai-servisov', 'kak-oplatit-neyroset-iz-rossii', 'seedance-gayd'],
    partner: 'syntx',
    facts: [
      { label: 'Verdict', value: 'Higgsfield for video with a cinematic layer on top, Syntx for everything at once under one bill' },
      { label: 'Higgsfield', value: 'From 15 $ (Starter) to 49 $ (Plus) a month, card payment only' },
      { label: 'Syntx', value: 'From 9 $ (Basic) to 125 $ (Ultra Elite), the working plan Elite is about 65 $' },
      { label: 'One subscription', value: 'Syntx takes more payment methods and its tokens roll over', href: 'partner:syntx' },
    ],
    excerpt:
      'We pay for both aggregators at the studio and filmed a review of each at the start of the year. Since then Higgsfield renamed its whole plan lineup, and Syntx lost Sora and gained MiniMax. So we rebuilt the comparison with September 2026 numbers and the honest downsides of each.',
    content: [
      { type: 'p', text: '"Syntx or Higgsfield" sounds like a choice between two identical services where you pick the cheaper one. They differ in character, and picking wrong costs a month of awkward work. We pay for both: Higgsfield for clips with camera control, Syntx for running video models in volume. We reviewed each in January, the videos are below. Since then both changed plans and model lists, so everything here is rebuilt as of September 2026.' },

      { type: 'h2', text: 'What the difference actually is' },
      { type: 'p', text: '**Higgsfield** is a video and image aggregator with its own layer on top of other people\'s models. Inside are Kling 3.0, Seedance 2.5, Veo 3.1, Nano Banana Pro and a dozen more engines, but the point is the layer above: Cinema Studio with camera and lens choice, Soul avatars, lip sync, motion presets, "apps" like changing the angle or swapping a character. It is for people who direct the frame, not just collect a result from a prompt.' },
      { type: 'p', text: '**Syntx** is a storefront: over a hundred tools and about forty models, from text to music, under one subscription. No Higgsfield-grade layer on top, and none promised. Instead it has what Higgsfield lacks: a Telegram bot as a workspace, text models included, a checkout that accepts more payment methods. Why aggregators exist and when you do not need one is in [our review of three platforms](/blog/agregatory-ai-servisov/).' },

      { type: 'h2', text: 'What changed since January, and why old reviews cannot be trusted' },
      { type: 'p', text: 'If you watched reviews from six months ago, ours included, this is what is already wrong in them:' },
      { type: 'ul', items: [
        '**Higgsfield renamed the whole lineup.** Basic, Pro, Ultimate and Creator became Starter, Plus, Ultra, Team and Scale. Credits and limits were recalculated, old figures no longer apply.',
        '**Sora no longer works in Syntx.** OpenAI [shut Sora down](/blog/sora-2-v-rossii/) on 26 April 2026. The Syntx pricing page still lists "Sora" among the Elite unlimited models, so trust the bot, not the landing page.',
        '**Syntx added MiniMax.** In January its absence was a minus. Now Hailuo MiniMax is there, unlimited on Ultra Elite.',
        '**Midjourney is not listed on the Syntx site.** In January it cost one token per generation, as of September it is gone from the models page. If it matters, check the bot before paying.',
        '**Syntx spread its text models across the plans.** Elite used to include unlimited GPT 5.2 and Claude Opus. Now Claude Sonnet 5 and Gemini 3.1 Pro are unlimited only on Ultra Elite, Elite gets GPT 5.6 Luna and Gemini 3.5 Flash.',
        '**Model versions moved on in both.** Kling 2.6 became Kling 3.0, Seedance 2.0 became Seedance 2.5, Nano Banana 2 appeared next to Nano Banana Pro, and Syntx added Seedream 5 Pro and FLUX 3 Video.',
      ] },

      { type: 'h2', text: 'Higgsfield plans as of September 2026' },
      { type: 'p', text: 'Prices in US dollars before tax, card payment only. The site shows only the first two plans openly, the rest appear after sign-in.' },
      { type: 'ul', items: [
        '**Starter** - 15 dollars a month. 200 credits, three unlimited models, 100 Nano Banana Pro generations a month, two videos and four images in parallel.',
        '**Plus** - 49 dollars a month, 39 on the annual plan. 1 000 credits, seven unlimited models, 500 Nano Banana Pro generations, six videos and eight images in parallel. Marked by the service as best value.',
        '**Ultra** - on request: the price shows only after sign-in. 3 000 credits, eight parallel jobs, up to 1 500 Nano Banana Pro images. At 31 credits per dollar that is roughly 97 dollars a month.',
        '**Team and Scale** - on request: team plans. 2 000 and 12 500 credits, 16 and 32 parallel jobs.',
      ] },
      { type: 'p', text: 'Three pieces of fine print worth reading before you pay. Unlimited models work only on the higgsfield.ai site, not through the API, CLI, Canvas or Supercomputer. In peak hours unlimited may slow down. New models roll out in stages. There is also a one-time entry for 3 dollars: 40 credits and two days of unlimited Soul 2.0.' },
      { type: 'p', text: 'For scale: a five-second Seedance 2.0 clip at 720p costs about 22 credits, at 1080p about 45. So the 200 credits on Starter are nine short 720p clips a month, unlimited models aside. In January we said the same about the 150 credits of the old base plan: nothing to do on it, start from the second plan.' },

      { type: 'h2', text: 'Syntx plans as of September 2026' },
      { type: 'p', text: 'Monthly prices in US dollars, as the site shows them. The site promises a 15% annual discount, but the calculator comes out closer to 20%, so check the total on the payment screen. Subscriptions run 1, 3, 6 or 12 months.' },
      { type: 'ul', items: [
        '**Basic** - 9 dollars a month. 260 tokens, a trimmed set of models. In our experience it only covers images: with video the tokens run out before you learn the interface.',
        '**Pro** - 18 dollars a month. 680 tokens, the full set of models, GPT agents, Topaz and Clarity upscaling. Unlimited only on the light text models: GPT 5 Nano, DeepSeek V3, Claude Haiku 4.5, Gemini 3.5 Flash Lite.',
        '**VIP** - 44 dollars a month. 1 700 tokens, Grok 4.3 and Qwen 3.7 Plus join the unlimited text models. Video still costs tokens.',
        '**Elite** - 65 dollars a month. 2 600 tokens and the main thing: unlimited video and images in Veo 3.1 Lite, Runway, GPT Image and Topaz. GPT 5.6 Luna and Gemini 3.5 Flash join the text side. Our working plan.',
        '**Ultra Elite** - 125 dollars a month. 3 000 tokens, Nano Banana and MiniMax join the Elite unlimited set, plus Claude Sonnet 5 and Gemini 3.1 Pro on the text side.',
      ] },
      { type: 'p', text: 'One mechanic Higgsfield does not have: Syntx tokens do not expire at month end. They stay on the account and add up on renewal, but can only be spent while a subscription is active. Language models in the plan do not consume tokens, neither do the unlimited tools. The trial gives 5 tokens and 5 text-model requests for free.' },

      { type: 'h2', text: 'Which models live where' },
      { type: 'p', text: 'On video and images the overlap is large. The difference is in the details and what surrounds the models.' },
      { type: 'ul', items: [
        '**Both have:** Kling 3.0, Seedance 2.5, Veo 3.1, Runway, Nano Banana Pro and Nano Banana 2, HeyGen for talking avatars, ElevenLabs for voice.',
        '**Only Higgsfield:** its own layers, Cinema Studio, Soul 2.0, Speak 2.0 for lip sync, "apps" with ready presets. Its own video model too, but we skip it: HD only, with stronger models next to it.',
        '**Only Syntx:** text models, ChatGPT, Claude, Gemini, Grok, DeepSeek, Perplexity, Qwen; Suno in all versions; Luma for video; Seedream 5 Pro and Ideogram for images; FLUX 3 Video. One funny detail: the Higgsfield Soul model is available inside Syntx too.',
        '**Neither:** Sora, because it no longer exists. Midjourney is not listed on the Syntx site as of September, and Higgsfield never had it.',
      ] },

      { type: 'h2', text: 'What we actually pay for' },
      { type: 'p', text: 'The most honest comparison is not a feature list but the generation history: what piled up where over six months.' },
      { type: 'p', text: 'In **Higgsfield** we keep the top plan for two things: unlimited Nano Banana Pro for references and storyboards, and video with camera control. Cinema Studio lets you pick camera, lens, focal length and aperture. A caveat from a former camera operator: "Arri Alexa" against "Sony Venice" in a prompt is paper-thin, the model barely reads it. Lenses do work: Helios against Zeiss gives two different images, vintage and clean. The library matters too: every generation, upscale and lip sync sits in a project you can reopen a month later with the same sources.' },
      { type: 'quote', text: 'From our January Higgsfield review: paying credits for "apps" like Relight makes no sense when the same Nano Banana Pro is unlimited on your plan in the Image tab. Save the credits for the video models.' },
      { type: 'p', text: 'In **Syntx** we pay for Elite because of the unlimited video models. Full Veo 3.1 cost 119 tokens per clip in January, the Fast version 6, and on Elite it is zero. Slower, but free. Seedance is the favorite: motion physics and detail good enough that viewers do not realise it is AI, see our [guide to the model](/blog/seedance-gayd/). Luma pulled off a fight scene no other model could handle. Runway, after stalling on Gen-3, is usable again. The text tab we use rarely: we have our own text subscriptions and go to Syntx when those hit their limits.' },
      { type: 'quote', text: 'From our January Syntx review: only the top or second-from-top plans are worth considering. Aggregators want you on the upper plans, so that is where the unlimited models live. Basic is images only, Pro is too little for video.' },

      { type: 'h2', text: 'Honest downsides of each' },
      { type: 'h3', text: 'What annoys us in Higgsfield' },
      { type: 'ul', items: [
        'Card payment only, no alternative route. The most common question under our review on YouTube was about payment methods, and the service never answered it.',
        'Unlimited comes with strings: only on the site, not through the API or CLI, slower in peak hours. For automations through n8n or your own pipeline the unlimited models do not count.',
        'The marketing of the "apps" runs ahead of their substance. Relight is pitched as relighting video but only works with images, and the result did not impress us.',
        'The Assist tab only has ChatGPT, not the newest version. No Claude or Gemini, and its "where to click" hints will more likely confuse a newcomer: there are a lot of tabs.',
        'Credits expire, and the starter plan gives nothing meaningful.',
      ] },
      { type: 'h3', text: 'What annoys us in Syntx' },
      { type: 'ul', items: [
        'The landing page lags behind reality: Sora still in the unlimited list after the shutdown, Midjourney gone without explanation. Check the model list in the bot.',
        'The top text models moved to the most expensive plan. If you came for unlimited Claude Sonnet 5, that is 125 dollars, not 65.',
        'The web version is incomplete. The FAQ itself says the full feature set lives in the Telegram bot. We prefer the web, and the gap shows.',
        'Vertical Veo without upscaling: landscape is pushed to Full HD, vertical stays in HD.',
        'We tried video-to-audio and did not like it: it costs next to nothing and the result is raw.',
        'In January we often hit "maintenance" on Midjourney. That may be why it is no longer on the list.',
      ] },

      { type: 'h2', text: 'Payment and billing friction' },
      { type: 'p', text: 'For many readers this decides the question before any feature does. Syntx accepts more payment methods than a typical US SaaS, the subscription is bought directly, and the tokens roll over. If your own card gets declined by an American service, which happens to readers in India, Brazil, Turkey, Nigeria and Argentina all the time, this is a payment that goes through. And it is one subscription instead of five separate ones for text, video, images, music and upscaling. We pay for it ourselves and keep a partner link: [open Syntx](partner:syntx). We earn a commission, your price does not change, and it did not soften the downsides above. A bonus inside: the referral program returns tokens for friends you bring, to spend, gift or withdraw.' },
      { type: 'partner', id: 'syntx' },
      { type: 'p', text: 'Higgsfield takes card payment only. The workarounds are the same as for any US service, and we [covered them separately](/blog/kak-oplatit-neyroset-iz-rossii/): a card from a bank the service accepts, or an intermediary. No third option. If you need Higgsfield for Cinema Studio and Soul, budget time and a fee for the payment.' },

      { type: 'h2', text: 'How to choose in five minutes' },
      { type: 'ol', items: [
        '**If your card keeps getting declined by US services** - the choice is made, it is Syntx. Higgsfield would go through an intermediary with a fee, and the fun evaporates fast.',
        '**If you make film and ads and want to direct the camera** - Higgsfield Plus. Cinema Studio and Soul are worth it, and parallel limits are wider.',
        '**If you want one bill for everything, text and music included** - Syntx Elite. Unlimited video models, Suno and text models in the package.',
        '**If you generate a lot of Nano Banana images** - do the math: Higgsfield Plus gives 500 Pro generations a month, Syntx makes Nano Banana unlimited only on Ultra Elite.',
        '**If you are not sure** - both have a cheap entry: 3 dollars for two days at Higgsfield, 5 free tokens at Syntx. Do one real task in each.',
      ] },

      { type: 'h2', text: 'What about Flowith?' },
      { type: 'p', text: 'The third aggregator people ask about in the same breath. It is a different thing: not a storefront of models and not a layer over video, but an endless canvas for multi-step work with text and images, where every request becomes a node. Not a competitor here, it solves a different problem. We reviewed it too, and its place among aggregators is in [the overview article](/blog/agregatory-ai-servisov/).' },

      { type: 'h2', text: 'Frequently asked questions' },
      { type: 'h3', text: 'Which is cheaper, Syntx or Higgsfield?' },
      { type: 'p', text: 'At the entry level, Syntx: 9 dollars against 15. On the working plans they are comparable: Higgsfield Plus is 49 dollars, Syntx Elite is 65, but Elite has unlimited video, while Plus gives credits plus seven unlimited models. Count in clips, not dollars.' },
      { type: 'h3', text: 'Is the generation quality different?' },
      { type: 'p', text: 'The model is the same, under the hood both run Kling, Seedance or Veo. What differs is the settings: Syntx exposes the model\'s interface almost in full, Higgsfield adds presets and sometimes hides which model runs inside, as in Cinema Studio. In both, a new version may arrive later than at the source.' },
      { type: 'h3', text: 'Is Sora available anywhere?' },
      { type: 'p', text: 'No. OpenAI shut Sora down on 26 April 2026, and no aggregator can offer it. If you see "Sora" in a model list, that is an outdated landing page. Replacements are [covered separately](/blog/sora-2-v-rossii/).' },
      { type: 'h3', text: 'Can I plug an aggregator into n8n or my own service?' },
      { type: 'p', text: 'Higgsfield has an API, a CLI and MCP, but unlimited models do not work through them, only credits do. We have not tested programmatic access in Syntx, and the Telegram bot is not built for automation. For pipelines, use the models\' own APIs.' },
      { type: 'h3', text: 'Do tokens and credits expire?' },
      { type: 'p', text: 'Syntx tokens do not expire: they stay on the account, add up on renewal, and can be spent while a subscription is active. Higgsfield credits are issued per month, one of the most frequent questions under our review: before buying an annual plan, ask support about rollover, it is not described publicly.' },
      { type: 'h3', text: 'Do I need both?' },
      { type: 'p', text: 'Not at the start. We have two because we do both film with camera control and a stream of short clips, two different jobs. With one job, the second aggregator is a second bill for the same thing.' },

      { type: 'h2', text: 'In short' },
      { type: 'p', text: 'Higgsfield is a video aggregator with a cinematic layer worth paying for if you direct the frame and your card is accepted. Syntx is one bill for everything: unlimited video models on Elite, text and music included, a checkout that takes more payment methods. Both changed more since January than it seems: plans, models, the unlimited list. Check the numbers on the payment screen, not in reviews, including this one if you read it six months from now.' },
      { type: 'p', text: 'To understand the models without going through aggregators, see our [roundup of video models](/blog/top-neyrosetey-video/). And our [AI training](/services/obuchenie-neyrosetyam/) helps you get a working result out of any of them: live tasks, not demos.' },

      { type: 'cta' },
    ],
  },
];

export default PART_13;
