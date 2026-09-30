// EN-переводы блога, часть 14 (сентябрь 2026): Syntx или Freepik (Magnific).
// Русский оригинал - в blog-posts.js, слаг syntx-ili-freepik.
//
// Угол сохранён русский: читатели английских страниц у нас в основном из России,
// поэтому оплата картой и QR остаётся главным доводом.
const PART_14 = [
  {
    slug: 'syntx-ili-freepik',
    category: 'Roundups & comparisons',
    title: 'Syntx or Freepik (Now Magnific): Which AI Aggregator to Pick in 2026',
    description:
      'Freepik is now called Magnific. We compare it with Syntx: September 2026 plans, credits per clip, unlimited models, built-in stock and paying from Russia.',
    keywords:
      'syntx or freepik, freepik vs syntx, freepik ai, magnific ai, freepik ai video, magnific pricing 2026, freepik pricing, freepik from russia, magnific from russia, ai aggregator comparison',
    cover: '/blog-images/syntx-vs-magnific.jpg',
    coverPrompt: 'A boxing ring before the first round, a stare-down under the referee; the robes carry real Syntx and Magnific logos (references from the official sites, generated in one pass with Nano Banana Pro, no overlay).',
    coverCaption: 'Freepik changed its name to Magnific, but the question is the same: one subscription for everything, or stock plus AI models in one window.',
    coverSource: 'AIVFX AI generation (Seedream 5 Pro)',
    date: '2026-09-25',
    dateModified: '2026-09-30',
    readingTime: '10 min',
    related: ['syntx-ili-higgsfield', 'agregatory-ai-servisov', 'magnific-freepik-v-rossii'],
    partner: 'syntx',
    facts: [
      { label: 'Verdict', value: 'Magnific for stock and unlimited images, Syntx for unlimited video and everything at one price' },
      { label: 'Magnific', value: 'Premium 15 €, Premium+ 34 €, Pro Starter 83 € a month, credits expire' },
      { label: 'Syntx', value: 'From 9 $ to 125 $, the working Elite is about 65 $, tokens do not expire' },
      { label: 'Paying from Russia', value: 'Syntx takes Russian cards, Magnific does not', href: 'partner:syntx' },
    ],
    excerpt:
      'On 28 April 2026 Freepik renamed itself Magnific and put stock, AI models and upscalers under one subscription. Its model list overlaps with Syntx almost completely, but on what is unlimited inside the plan and how you pay for it, the two are opposites.',
    content: [
      { type: 'p', text: 'First, the naming mess, because the comparison does not read without it. Freepik is a stock library from Malaga that spent the last two years adding AI: the Mystic image generator, video through other companies\' models, and the Magnific upscaler it bought in 2024. On 28 April 2026 the company put all of this under one name, so the platform is now called **Magnific**, and freepik.com redirects to magnific.com. Subscriptions, projects and accounts carried over, and you do not need to create new ones. People still search for "freepik ai", so this article uses both names.' },
      { type: 'p', text: 'It gets compared with Syntx for an obvious reason: the video model list is almost identical - Kling 3.0, Seedance 2.5, Veo 3.1, MiniMax, Nano Banana. But they are built differently, and the difference shows up in two places: what is actually unlimited, and how you pay. We have a [separate breakdown](/blog/syntx-ili-higgsfield/) of Syntx against Higgsfield; this one covers only Syntx and Magnific.' },

      { type: 'h2', text: 'What the difference actually is' },
      { type: 'p', text: '**Magnific** is a stock library with AI bolted on. 250 million photos, vectors and PSD files, and on top of them image and video generation, Magnific and Topaz upscalers, music and voiceover, the Spaces canvas for team work, an API, MCP and a ComfyUI plugin. The strong side is images: its own Mystic model, about fifteen other companies\' models without a limit, editing, character training. The company claims more than a million paying subscribers and says it runs without outside investors.' },
      { type: 'p', text: '**Syntx** is a storefront of more than a hundred tools under one subscription, working through a website and a Telegram bot. There is no stock, there are upscalers (Topaz and Clarity), but text models are included, along with Suno for music and unlimited video models on the upper plans. For why aggregators exist at all, see our [overview](/blog/agregatory-ai-servisov/).' },
      { type: 'p', text: 'In one sentence: Magnific is for people who need stock and a lot of images, Syntx is for people who need a lot of video and one bill for everything.' },

      { type: 'h2', text: 'Magnific plans, September 2026' },
      { type: 'p', text: 'Prices are in euros, before VAT. Below is monthly billing; on annual billing Premium comes to 10.50 euros a month, Premium+ to 25.50 and Pro Starter to 62.25. Discounts on the site change, so check the final price on the payment screen. The difference between annual and monthly is not only the price: on an annual plan credits are issued for the whole year at once and do not expire month by month, on a monthly plan they reset every cycle.' },
      { type: 'ul', items: [
        '**Premium** - 15 euros a month. 20,000 credits a month, stock and all models for credits, nothing unlimited. For stock and occasional generations.',
        '**Premium+** - 34 euros a month. 45,000 credits plus unlimited use of selected models, Topaz upscalers, music rights. The platform\'s main plan.',
        '**Pro Starter** - 83 euros a month. 112,500 credits, everything from Premium+, a wider list of unlimited models including Nano Banana 2 in 2K. There is a plan above it with 300,000 credits, the price shows only after you log in.',
      ] },
      { type: 'p', text: 'Credits expire at the end of the billing period and do not roll over, and the help center says so directly. You can buy an extra pack only on Premium+ and above, and bought credits last three years. Stock is counted separately: 100 downloads per period on any paid plan. A free account exists, but its limits are not shown on the pricing page, and we did not test them.' },

      { type: 'h2', text: 'What a clip costs in Magnific credits' },
      { type: 'p', text: 'The most useful thing on the pricing page is the table of charges, and it shows where the Premium+ credits (45,000 a month) go:' },
      { type: 'ul', items: [
        '**Seedance 2.5 in 720p:** 1,760 credits for 4 seconds. That is 25 clips a month. In 1080p it is 4,400 credits, 10 clips.',
        '**Kling 3.0 Pro in 1080p:** 450 credits for 5 seconds, about 100 clips.',
        '**Veo 3.1 in 4K with sound:** 2,080 credits for 4 seconds, about 21 clips.',
        '**Nano Banana Pro:** 75 credits per image in 1K and 2K, 600 images; in 4K it costs twice as much.',
        '**Seedream 5 Pro:** 75 credits per image.',
      ] },
      { type: 'p', text: 'The main takeaway on video: fresh models are expensive at Magnific, and the unlimited video covers only Kling 2.5 in 720p, MiniMax Hailuo 2.3 in 768p and the draft mode of Seedance 1.5. Kling 3.0, Seedance 2.5 and Veo 3.1 always cost credits. For images it is the opposite. On Premium+ these run without a limit: Nano Banana 2 in 1K, Flux.2 Pro, Imagen 4, Seedream 5 Lite, Recraft, Ideogram, Grok and its own Mystic. Nano Banana Pro without a limit exists only on the top Pro plan.' },
      { type: 'p', text: 'Two more caveats from the help center. Unlimited use falls under a fair-use policy: with heavy volume generations do not stop, but they slow down and run one at a time. And unlimited does not apply through MCP and the API, where everything costs credits. A small but telling point: unlimited is "for personal use by a person", and the platform may switch it off for automation and shared accounts.' },

      { type: 'h2', text: 'Syntx plans, September 2026' },
      { type: 'p', text: 'These are monthly prices in dollars, which is how the site shows them from a foreign address; from Russia, and in the bot, prices are in rubles. Annual billing is roughly 15-20% cheaper. The full breakdown with text models by plan is in our [comparison with Higgsfield](/blog/syntx-ili-higgsfield/), so here it is short.' },
      { type: 'ul', items: [
        '**Basic** - 9 dollars a month. 260 tokens, in practice images only.',
        '**Pro** - 18 dollars a month. 680 tokens, the full set of models, Topaz and Clarity upscaling.',
        '**VIP** - 44 dollars a month. 1,700 tokens, unlimited text models.',
        '**Elite** - 65 dollars a month. 2,600 tokens and unlimited video and images in Veo 3.1 Lite, Runway, GPT Image and Topaz.',
        '**Ultra Elite** - 125 dollars a month. 3,000 tokens, and Nano Banana and MiniMax join the unlimited list.',
      ] },
      { type: 'p', text: 'The key difference from Magnific: Syntx tokens do not expire. They stay on the account, add up when you renew, and can be spent under any active subscription. The text models included in the plan do not use tokens. For a trial you get 5 tokens and 5 requests to text models.' },

      { type: 'h2', text: 'Which models are where' },
      { type: 'ul', items: [
        '**Both have:** Kling, Seedance 2.5, Veo 3.1, MiniMax Hailuo, Nano Banana Pro and Nano Banana 2, Seedream 5, Flux, Ideogram, Runway, Topaz upscaling, ElevenLabs.',
        '**Only Magnific:** stock of 250 million files, its own Mystic model, the Magnific upscaler, Imagen 4, Recraft, Google Lyria 3 for music, character training, the Spaces canvas, MCP, API, ComfyUI, a desktop app.',
        '**Only Syntx:** the text models ChatGPT, Claude, Gemini, Grok, DeepSeek, Perplexity, Qwen; every version of Suno; Luma; HeyGen for avatars; the Telegram bot; Higgsfield Soul.',
        '**Neither:** Sora, because OpenAI [shut it down](/blog/sora-2-v-rossii/) on 26 April. Midjourney is in neither place either.',
      ] },

      { type: 'h2', text: 'How to pay from Russia' },
      { type: 'p', text: 'Syntx is bought directly: Russian cards, payment by QR, no intermediaries. We pay for it ourselves and hold a partner link: [open Syntx](partner:syntx). We earn a commission on a Syntx subscription, the price does not change, and it did not affect the list of downsides below. If what you need from Magnific is the models and not the stock, the same Kling, Seedance, Veo and Nano Banana are in Syntx.' },
      { type: 'partner', id: 'syntx' },
      { type: 'p', text: 'Magnific belongs to the Spanish company Freepik Company S.L.U., bills in euros through European card processing, and Russian cards do not go through. From Russia you can pay for it only with a foreign card or through an intermediary such as GGSel and Plati.market, and both routes are [covered separately](/blog/magnific-freepik-v-rossii/). You cannot pay for Magnific through Syntx: it is not a payment service, it is another aggregator.' },

      { type: 'h2', text: 'The honest downsides of each' },
      { type: 'h3', text: 'What is wrong with Magnific' },
      { type: 'ul', items: [
        'Credits expire every month on a monthly plan. If you did not spend 45,000, they are gone.',
        'Unlimited video means old models in low resolution. Kling 3.0, Seedance 2.5 and Veo 3.1 cost credits, and they are expensive: 10-25 Seedance clips a month on Premium+.',
        'Nano Banana Pro without a limit only on the top plan at 83 euros.',
        'Unlimited slows down at high volume and does not work through the API and MCP. In reviews users complain about slowdowns arriving sooner than expected; the platform replies that generations do not stop.',
        'The rebrand is still fresh: part of the help center and the links live under the old names, and people search for the service under three names at once.',
        'Russian cards are not accepted.',
      ] },
      { type: 'h3', text: 'What is wrong with Syntx' },
      { type: 'ul', items: [
        'No stock at all. If you need ready-made photos and vectors, this is not the place.',
        'The landing page lags behind the bot: Sora in the unlimited list after it was shut down, Midjourney gone without explanation. Check models in the bot.',
        'The web version is incomplete, the full set of features is in the Telegram bot, and the platform says so itself.',
        'Top text models, for example Claude Sonnet 5, are unlimited only on Ultra Elite at 125 dollars.',
        'No API and no ComfyUI, so it does not suit automation.',
      ] },

      { type: 'h2', text: 'How to choose in five minutes' },
      { type: 'ol', items: [
        '**You need stock and images in volume** - Magnific Premium+. About fifteen models without a limit and 250 million files next to them, that is its territory.',
        '**You need video at volume** - Syntx Elite. Unlimited Veo 3.1 Lite and Runway, the other models for tokens that do not expire.',
        '**You have no foreign card** - Syntx, the choice is made for you. Magnific through an intermediary costs more and you lose control over renewal.',
        '**You need an API or ComfyUI** - Magnific, but remember that unlimited does not work there, only credits.',
        '**You are unsure** - Syntx gives 5 trial tokens, Magnific has a free account. Do one real task in both.',
      ] },

      { type: 'h2', text: 'Frequently asked questions' },
      { type: 'h3', text: 'Are Freepik and Magnific the same thing?' },
      { type: 'p', text: 'Yes. Since 28 April 2026 the Freepik platform is called Magnific, and freepik.com redirects to magnific.com. The old Magnific upscaler remains as a separate "legacy" service. Subscriptions and projects were moved over automatically.' },
      { type: 'h3', text: 'Which is cheaper, Syntx or Magnific?' },
      { type: 'p', text: 'At the entry level, Syntx: 9 dollars against 15 euros. On the working plans, Magnific Premium+ at 34 euros and Syntx Elite at 65 dollars are comparable in money but give different things: Magnific is unlimited on images and old video, Syntx on fresh video models. Count in clips, not in currency.' },
      { type: 'h3', text: 'Do credits and tokens expire?' },
      { type: 'p', text: 'At Magnific on a monthly plan they expire every cycle, on an annual plan they are issued a year ahead. Syntx tokens never expire, but you can spend them only while a subscription is active.' },
      { type: 'h3', text: 'Can I pay for Magnific through Syntx?' },
      { type: 'p', text: 'No. Syntx is not a payment intermediary, it is an independent aggregator with the same models. It replaces Magnific if you need AI models, and does not replace it if you need stock.' },
      { type: 'h3', text: 'Is the generation quality the same?' },
      { type: 'p', text: 'Under the hood it is the same model: Kling at both is Kling. What differs is the versions and resolutions opened on your plan, and the settings the platform exposes. You can check it with one prompt in both places.' },
      { type: 'h3', text: 'Is there a free plan?' },
      { type: 'p', text: 'At both. Syntx gives 5 tokens and 5 requests to text models, Magnific gives a free account with limited generations and downloads, and the exact limits are not shown on the pricing page.' },

      { type: 'h2', text: 'In short' },
      { type: 'p', text: 'Magnific is Freepik grown into a full aggregator, and it works best where you need stock and images with no meter running. Syntx is one bill for everything, with unlimited video and payment by a Russian card. On the model list they are twins, on what you get free inside the subscription they are opposites. Choose by what you make more of: images or clips.' },
      { type: 'p', text: 'To understand the models themselves and not the storefronts, use our [roundup of video models](/blog/top-neyrosetey-video/). And to get a working result out of any aggregator, we teach it in our [AI training](/services/obuchenie-neyrosetyam/): on live tasks, not demos.' },

      { type: 'cta' },
    ],
  },
];

export default PART_14;
