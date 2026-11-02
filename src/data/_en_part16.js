// EN-переводы блога, часть 16 (ноябрь 2026): как оплатить китайские нейросети.
// Русский оригинал - в blog-posts.js, слаг kak-oplatit-kitayskie-neyroseti.
const PART_16 = [
  {
    slug: 'kak-oplatit-kitayskie-neyroseti',
    category: 'Guides',
    title: 'How to Pay for Chinese AI Tools from Russia: Kling, Tencent HY (Hunyuan), Z.ai and More',
    description:
      'How to pay for Kling, Tencent HY (Hunyuan), Z.ai (GLM) and other Chinese AI tools from Russia in 2026: roubles via an aggregator, your own card, what is free.',
    keywords:
      'pay for kling from russia, kling motion brush russia, kling image to video russia, pay tencent hunyuan from russia, tencent hy payment, pay tencentdb from russia, z.ai payment russia, glm coding plan payment, chinese ai tools russian card',
    cover: '/blog-images/kak-oplatit-kitayskie-neyroseti.jpg',
    coverPrompt: 'daytime food court in Guangzhou, three stalls with lightbox signs, a stylish woman in a long coat taps her card on a payment terminal that glows red, at the next stall a green terminal and a short queue of people, natural light, editorial street photo',
    coverCaption: 'Chinese AI tools open from Russia easily. The trouble starts at the checkout, and it is different for each service.',
    coverSource: 'AIVFX AI generation (Seedream 5 Pro)',
    date: '2026-11-02',
    dateModified: '2026-11-02',
    readingTime: '9 min',
    related: ['kak-oplatit-neyroset-iz-rossii', 'kling-v-rossii-besplatno', 'agregatory-ai-servisov'],
    partner: 'syntx',
    facts: [
      { label: 'Pay in roubles', value: 'Kling, Hailuo, Seedance, Qwen, Zhipu AI in SYNTX, with a Russian card', href: 'partner:syntx' },
      { label: 'Mir card directly', value: 'Kling, Z.ai and Tencent Cloud do not list it as a payment method', tone: 'no' },
      { label: 'Free', value: 'Flash models in the Z.ai API, 200 starter credits in Tencent HY 3D', tone: 'yes' },
      { label: 'TencentDB', value: 'Not an AI model but a cloud database, billed to your Tencent Cloud account' },
    ],
    excerpt:
      'Kling, Tencent HY (formerly Hunyuan) and Z.ai with its GLM models open from Russia without much trouble, but a Russian card is declined at checkout. A service-by-service pass: what you get for free, what you can buy in roubles through an aggregator, and where to go with a foreign card.',
    content: [
      { type: 'p', text: 'Chinese does not mean open to a Russian card. The international versions of Kling, Tencent HY and Z.ai are sold in dollars, and their checkout has the same wall as American services. For each service below the pattern is the same: what is free, whether you can pay in roubles, what to do with your own card. All terms were checked against official pages on 2 November 2026. The general logic of paying for foreign AI is in [three ways to pay for AI from Russia](/blog/kak-oplatit-neyroset-iz-rossii/); this piece covers only the Chinese cluster.' },

      { type: 'h2', text: 'The short version: roubles or your own account' },
      { type: 'p', text: 'If you need the model rather than an account in the service itself, paying in roubles through an aggregator is the simplest route. The one we hold for this is [SYNTX](partner:syntx): its catalogue has Kling, Hailuo (MiniMax), Seedance and Wan, and among language models Qwen, DeepSeek, Zhipu AI and Kimi. You pay with a Russian card, no VPN, no foreign card.' },
      { type: 'p', text: 'Your own account makes sense in two cases: you generate by the hundred and the per-generation price inside a subscription starts to matter, or you need a feature the aggregator does not have. Then the route is a foreign card or an intermediary. What SYNTX does not have as of 2 November: Tencent HY (Hunyuan) and Vidu. Those cannot be paid for in roubles through our partner.' },
      { type: 'partner', id: 'syntx' },
      { type: 'p', text: 'A note on the SYNTX link, since we recommend it: we hold an affiliate link, so we earn a commission on subscriptions. The price for you does not change. SYNTX gives you models inside its own interface; it does not pay for Kling, Z.ai or Tencent Cloud accounts on your behalf.' },

      { type: 'image', src: '/blog-images/kitay-chaynaya-karta.jpg', alt: 'In a tea house with red lanterns one young man looks puzzled at his bank card while his friend calmly pays with a phone', caption: 'The service opens fine, then the card fails at checkout. With Chinese AI tools that is the usual story.' },

      { type: 'h2', text: 'Why Chinese services decline Russian cards' },
      { type: 'p', text: 'The decline comes from the payment gateway, not from the developer\'s country. International versions of Chinese AI tools are sold through foreign payment providers in dollars, and to them a Russian card looks exactly as it does to an American service. Visa and Mastercard cards issued by Russian banks have not worked abroad since March 2022, and Mir is accepted in only a handful of countries. So the fact that a site opens without a VPN says nothing about whether the payment will go through.' },
      { type: 'p', text: 'The practical takeaway: a VPN does not get you past the checkout. It helps you reach the site, but the card is declined by the country of the issuing bank, not by your IP address.' },

      { type: 'h2', text: 'Kling' },
      { type: 'p', text: 'The international version of Kling lives at kling.ai. The old address klingai.com now redirects there; we checked this with a request to the site on 2 November, so old bookmarks and links still work. Access, language and limits are covered in [Kling from Russia](/blog/kling-v-rossii-besplatno/), and prompting in the [Kling guide](/blog/kling-gayd/).' },
      { type: 'p', text: 'What the official credits policy says:' },
      { type: 'ul', items: [
        '**Login credits.** Kling grants credits on your first login of the day, and they reset at midnight. The policy does not fix the amount: the platform announces it and can change it. Check your own account.',
        '**Subscription credits** last one month from the day they are issued; on the 7-day plan, seven days.',
        '**Purchased credit packs** last two years.',
        '**No refunds.** Credits cannot be refunded or exchanged for cash. The one exception: if a generation fails, its credits come back.',
      ] },
      { type: 'p', text: 'Kling does not publish an open page listing its payment methods, and plan prices on the membership page only load after you sign in. That is why this article gives no figures: check them in your account on the day you pay.' },
      { type: 'h3', text: 'Motion Brush and image-to-video' },
      { type: 'p', text: 'Motion Brush (you paint over part of the frame and set where it moves) is officially listed among the Kling video model capabilities, together with text-to-video, image-to-video and lip sync. This is stated on the developer platform page. Which model version and which web app plan include it today, Kling does not specify on its public pages, so check in your account before paying.' },
      { type: 'p', text: 'If you specifically need the brush, keep one thing in mind: an aggregator gives you the model, but it does not have to replicate the whole Kling interface. Image-to-video, animating a still picture, is almost always there, while separate tools like Motion Brush may be missing. Before paying for SYNTX for the brush, open its Kling interface and make sure it is there. If not, the route is your own Kling account with a foreign card or an intermediary.' },

      { type: 'h2', text: 'Tencent HY (formerly Hunyuan)' },
      { type: 'p', text: 'Tencent HY cannot be paid for in roubles through an aggregator: SYNTX does not carry it. What remains is the free trial quota and a foreign card on Tencent Cloud International. Hunyuan has been renamed: Tencent Cloud documentation now calls the model family Tencent HY, while people still search for "hunyuan".' },
      { type: 'p', text: 'On international Tencent Cloud, the Tencent HY section covers APIs for 3D generation (Tencent HY 3D Global) and translation. The 3D terms as of 2 November, from the official billing page:' },
      { type: 'ul', items: [
        '**Free:** 200 credits per user for the Professional 3D tier, valid for a year.',
        '**Packs:** 1,000 credits for 15 dollars, 10,000 for 145, cheaper per credit beyond that. A pack lasts a year, and an unused one can be refunded within 7 days.',
        '**Postpaid:** 0.02 dollars per credit, settled daily for the previous day. You switch it on manually in the console.',
        '**One model:** a standard Professional 3D generation costs 25 credits, and failed calls are not charged.',
      ] },
      { type: 'p', text: 'How to pay. Tencent Cloud accepts credit and debit cards from Visa, Mastercard, JCB, Discover, Amex and UnionPay. PayPal is no longer supported, and neither are prepaid, virtual or gift cards. That matters: the virtual card that works for other services will not work here. UnionPay is on the list, but the page does not say whether a UnionPay card from a Russian bank goes through, and we have not tested it. The official help is also silent on whether sign-up from Russia is restricted.' },

      { type: 'h2', text: 'Z.ai (GLM)' },
      { type: 'p', text: 'Z.ai gives some models away for free; you pay for the API and for the coding subscription. Z.ai is the international brand of Zhipu AI, the developer of the GLM models. The chat lives at chat.z.ai. The site publishes no official terms for the chat, so check the limits inside it.' },
      { type: 'ul', items: [
        '**API.** Prices in dollars per million tokens. GLM-4.7-Flash, GLM-4.5-Flash and GLM-4.6V-Flash are marked free in the price list; the larger models are paid.',
        '**GLM Coding Plan.** A subscription for coding in editors and agents, with Lite, Pro and Max tiers. The documentation gives one price: from 18 dollars a month. Pro and Max prices are not named on the public page.',
        '**Payment.** The documentation does not list payment methods. Plan on a foreign card: Russian cards are not mentioned anywhere in Z.ai payment options.',
      ] },
      { type: 'p', text: 'There is a rouble route: Zhipu AI is in the [SYNTX](partner:syntx) catalogue. Check which GLM versions are there before you pay, since aggregators add new versions with a delay. The Coding Plan, meaning GLM wired into your own code editor, is not something an aggregator gives you; that takes your own account.' },

      { type: 'h2', text: 'Other Chinese models' },
      { type: 'p', text: 'The other Chinese models people ask about are in the aggregator catalogue, so the shortest route to them is the same: roubles through SYNTX. Whether their own sites accept Russian cards directly, we have not checked.' },
      { type: 'ul', items: [
        '**Hailuo (MiniMax)** - video. See the [MiniMax Hailuo guide](/blog/minimax-h3-hailuo-gayd/).',
        '**Seedance (ByteDance)** - video with sound and longer scenes. [What is free](/blog/seedance-besplatno/) and [how to prompt it](/blog/seedance-gayd/).',
        '**Wan** - a video model from Alibaba, available in SYNTX.',
        '**Qwen, DeepSeek, Kimi** - language models, listed in the SYNTX text section.',
      ] },
      { type: 'p', text: 'How to compare aggregators is covered in the [aggregator overview](/blog/agregatory-ai-servisov/), and if you are choosing between two popular ones, see [SYNTX vs Higgsfield](/blog/syntx-ili-higgsfield/).' },

      { type: 'h2', text: 'TencentDB and the rest of Tencent Cloud' },
      { type: 'p', text: 'TencentDB is not an AI model but a Tencent Cloud database. It is paid like the rest of the cloud: from your Tencent Cloud International account with the same cards from the official list. So the same limits apply: PayPal is gone, virtual and prepaid cards are not accepted. AI aggregators will not help here; they do not sell databases.' },

      { type: 'h2', text: 'Intermediaries' },
      { type: 'p', text: 'If you need your own account and have no foreign card, the remaining option is an intermediary. Where people look for them: the digital goods marketplaces [GGSel](https://ggsel.net/) and [Plati.market](https://plati.market/). Whether they have offers for Kling, Z.ai or Tencent Cloud today, we have not checked: search by the service name. For Tencent Cloud an intermediary is especially awkward, because it runs on postpaid billing with a card bound to the account rather than a one-off subscription.' },
      { type: 'p', text: 'How to vet a seller before paying is in the [checklist in our AI payment guide](/blog/kak-oplatit-neyroset-iz-rossii/). In short: a history and reviews outside the seller\'s own site, pay for a month rather than a year, change the password right after.' },

      { type: 'h2', text: 'Frequently asked questions' },
      { type: 'h3', text: 'Can I pay for Kling with a Russian card?' },
      { type: 'p', text: 'Not directly on kling.ai: plans are in dollars, and Russian Visa and Mastercard cards do not work abroad. In roubles, Kling is available through an aggregator such as [SYNTX](partner:syntx), or through an intermediary if you need your own account.' },
      { type: 'h3', text: 'How do I pay for Tencent Hunyuan from Russia?' },
      { type: 'p', text: 'Only with your own foreign card on Tencent Cloud International: Visa, Mastercard, JCB, Discover, Amex or UnionPay. Virtual and prepaid cards and PayPal are not accepted. For trials, the 3D tier has 200 free credits. SYNTX does not carry the model.' },
      { type: 'h3', text: 'Is Z.ai free, or do I need a subscription?' },
      { type: 'p', text: 'Partly free. The Z.ai API has free Flash models. There are no official terms for the chat. The larger API models are paid, and the GLM Coding Plan starts at 18 dollars a month.' },
      { type: 'h3', text: 'How do I pay for Kling Motion Brush if my card is declined?' },
      { type: 'p', text: 'Two routes. An aggregator in roubles, if its Kling interface has the brush: check before paying. Or your own Kling account through a foreign card or an intermediary, which gives you everything your plan includes.' },
      { type: 'h3', text: 'How do I pay for TencentDB from Russia?' },
      { type: 'p', text: 'From your Tencent Cloud International account balance, with a card from the official list: Visa, Mastercard, JCB, Discover, Amex, UnionPay. It has to be a real bank card, not a virtual or prepaid one. AI aggregators do not sell databases.' },
      { type: 'h3', text: 'Will a VPN help me pay for a Chinese AI tool?' },
      { type: 'p', text: 'No. A VPN helps you open the site, but the card is declined by the country of the bank that issued it. You need a foreign card, an intermediary or payment in roubles through an aggregator.' },

      { type: 'h2', text: 'So your credits turn into results' },
      { type: 'p', text: 'However you pay for Kling or Seedance, most of the money goes not on the payment method but on failed generations. That is what [AI video training](/services/obuchenie-ai-video/) is about: on your own task, how to build the prompt and which scene suits which model. The studio\'s finished work is in the [portfolio](/works/).' },
      { type: 'cta' },
    ],
  },
];

export default PART_16;
