// EN-переводы блога, часть 5 — кластер про автоматизацию заявок.
//
// Порядок статей внутри файла совпадает с русским BLOG_POSTS: витрина
// блога показывает первую статью крупной карточкой, и при расхождении
// порядка две языковые версии выглядели бы разными изданиями.
const PART_5 = [
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'skolko-stoit-ai-assistent',
    category: 'Business & money',
    title: 'How Much an AI Assistant for Handling Inquiries Costs: an Honest 2026 Breakdown',
    description:
      'What makes up the price of an AI assistant: development, the language model, integrations and support. Real ranges from 30 thousand roubles to several million, the hidden costs and a payback formula.',
    keywords:
      'ai assistant cost, price of ai implementation, chatbot cost for business, ai assistant for leads price, cost of automating inquiries, ai payback for business',
    cover: '/blog-images/cover-assistent-cena.jpg',
    date: '2026-08-30',
    dateModified: '2026-08-30',
    readingTime: '18 min',
    related: ['ai-video-dlya-biznesa-start', 'skolko-stoit-ai-video', 'kak-sdelat-reklamnyy-rolik-ai'],
    excerpt:
      'Why the same question gets you quotes of both 30 thousand and three million, and why both are honest. We break the price down by layers, list the hidden costs, and show how to calculate payback before signing anything.',
    content: [
      { type: 'p', text: 'Ask five vendors and you will get five different answers: 30 thousand, 150 thousand, 700 thousand, "from a million" and "we need to discuss it". The uncomfortable part is that all five can be telling the truth. They simply mean different things by "AI assistant": anything from a bot that replies from a list of prepared answers to a system that reads your knowledge base, holds a conversation, creates deals in your CRM and hands the manager an already warmed-up customer.' },
      { type: 'p', text: 'This article is not about naming one number. It is about breaking the price into layers, seeing what exactly you pay for, and working out whether it pays off in your case. After it you will be able to talk to a vendor in the same language and notice when you are being sold something you do not need.' },

      { type: 'h2', text: 'Why the spread is so wide' },
      { type: 'p', text: 'Imagine asking how much a car costs. The answer depends on whether you need to reach a summer house or haul cargo every day. Assistants are the same, except the boundaries are less obvious, because from the outside every solution looks identical: a chat window with someone answering in it.' },
      { type: 'p', text: 'The difference is hidden inside. It lies in where the assistant gets its answers, what it can do besides talking, and what happens when it is wrong. Let us go layer by layer.' },

      { type: 'h2', text: 'Layer one: a scripted bot' },
      { type: 'p', text: 'The simplest option. You write the questions and answers in advance, the bot delivers them. There is no language model inside, so there is no "artificial intelligence" in any strict sense either — though it is very often sold under exactly that word.' },
      { type: 'ul', items: [
        '**What it can do:** answer frequent questions, capture a contact, book an appointment through buttons.',
        '**What it cannot do:** understand a question phrased differently from what you anticipated. The customer writes "are you open on Sunday" while the script has "opening hours" - and the bot does not connect the two.',
        '**Price from published rates of Russian studios:** roughly from 30 thousand roubles one-off for a simple FAQ bot, from 90 thousand for a bot with sales logic.',
        '**Running costs:** almost nothing, from about one and a half thousand roubles a month for hosting.',
      ]},
      { type: 'p', text: 'This is a valid option if you genuinely have a dozen typical questions and accept that the eleventh will get a wrong answer. For booking a barbershop it is enough. For handling inquiries about a complex service it is not.' },

      { type: 'h2', text: 'Layer two: an assistant on a language model' },
      { type: 'p', text: 'Here there is a real language model inside. It understands a question phrased any way at all and answers coherently. The key difference from the previous layer: the assistant does not pick from prepared answers, it composes a new one.' },
      { type: 'p', text: 'This is where the main technical task appears — the one you are actually paying for. The model on its own knows nothing about your business: not your prices, not your delivery terms, not the fact that you do not work with companies. To make it answer about you rather than about the world in general, it needs your knowledge base and a way to search it. That is a separate piece of engineering.' },
      { type: 'ul', items: [
        '**What it can do:** hold a natural conversation, answer from your materials, clarify details, work around the clock.',
        '**Price:** roughly from 120 thousand roubles for a basic deployment, from 200 thousand for a version with integrations.',
        '**Running costs:** here a charge for model calls appears. It is measured by volume of text and, for a few hundred conversations a month, is usually counted in thousands of roubles rather than tens of thousands.',
      ]},
      { type: 'quote', text: 'Do not ask a vendor "do you have AI". Ask "where does the assistant get facts about my company, and what does it answer when the fact is missing". The answer to the second question shows immediately whether anyone thought about it at all.' },

      { type: 'h2', text: 'Layer three: an assistant built into your processes' },
      { type: 'p', text: 'Talking is not enough. Value appears when the assistant does something inside your systems: creates a deal in the CRM, assigns a task to a manager, checks stock, books a calendar slot, sends a reminder the next day.' },
      { type: 'p', text: 'Every such connection is separate work. Not because it is technically hard, but because you have to decide what happens when it fails. If the CRM is unavailable, the inquiry must not vanish - it should queue and go through later. If the customer changes their mind, the deal has to close. Details like these make up most of the budget.' },
      { type: 'ul', items: [
        '**What it can do:** carry an inquiry through to a result without a human, and pass on only what genuinely needs one.',
        '**Price:** from 500 thousand roubles upward, depending on how many systems are involved and what state they are in.',
        '**A separate line item:** if your CRM is a mess, that has to be cleaned up first. This is a normal situation, but it belongs in the budget from the start.',
      ]},

      { type: 'h2', text: 'Layer four: the enterprise perimeter' },
      { type: 'p', text: 'The same thing again, but with the requirements large companies bring: data must not leave the perimeter, every action must be logged, access must be segmented, the system must survive failures and must be protected against the model inventing things.' },
      { type: 'p', text: 'By estimates published by RBC, setting up a language model together with a system to manage it starts at roughly 700 thousand roubles, and full enterprise deployments run into millions. At this level you are paying less for the assistant than for the infrastructure around it.' },

      { type: 'h2', text: 'Your own build or a ready-made service' },
      { type: 'p', text: 'A fork everyone reaches. Both paths have a price you see immediately and a price that shows up six months later.' },
      { type: 'h3', text: 'A subscription service' },
      { type: 'p', text: 'You pay monthly and configure it yourself through an interface. Almost no barrier to entry, live within a week. Good for testing whether people will write to a chat at all.' },
      { type: 'ul', items: [
        '**Upside:** fast, cheap to start, nothing to maintain.',
        '**Downside:** you live inside someone else rules. A non-standard integration is often simply impossible rather than more expensive.',
        '**Main risk:** customer data sits with the provider, and the provider changes the terms. Prices can rise, features can disappear.',
      ]},
      { type: 'h3', text: 'Your own build' },
      { type: 'p', text: 'More expensive upfront, but the system is yours: any integration, your own data, no dependence on someone else roadmap.' },
      { type: 'ul', items: [
        '**Upside:** does exactly what you need and stays yours.',
        '**Downside:** needs maintenance. Without it the system decays within a year.',
        '**When it makes sense:** once the process is settled and it is clear what exactly you are automating.',
      ]},
      { type: 'quote', text: 'A sensible order: a ready-made service for a couple of months to see the real questions customers ask, then your own build for what proved out. Starting with a custom build before you know what people will ask means designing blind.' },

      { type: 'h2', text: 'How long it takes' },
      { type: 'p', text: 'Asked less often than price, and wrongly so: deadlines slip mostly because preparation was not accounted for.' },
      { type: 'ol', items: [
        '**Collecting the knowledge base: from a few days to a couple of weeks.** Entirely on your side, and most often the bottleneck.',
        '**Development: from one week for a simple bot to six or eight weeks for a system with integrations.**',
        '**Testing on real inquiries: two to three weeks.** Not skippable — this is where the questions nobody anticipated show up.',
        '**Reaching a steady state: another month.** The assistant is tuned on real conversations and you correct the wording.',
      ]},
      { type: 'p', text: 'So from "let us do it" to "runs without supervision" usually takes two to three months even on a simple project. Promises of a week apply to the first layer described above.' },

      { type: 'h2', text: 'Costs nobody mentions at the first meeting' },
      { type: 'p', text: 'Development cost is what appears in the proposal. Then come the things that surface later.' },
      { type: 'ol', items: [
        '**Preparing the knowledge base.** Most companies have no document stating what they sell and on what terms. The information lives in people heads and in chat threads. Turning it into coherent text takes days, and somebody has to do it.',
        '**The first month of fixes.** The assistant meets real customers and inevitably runs into questions nobody foresaw. This is not a defect, it is a normal stage. Budget time and money for it.',
        '**Model call charges.** They grow with your customer flow. A pleasant problem, but worth estimating in advance: ten times the conversations means roughly ten times the bill.',
        '**Support.** Models get updated, integrations break when the CRM changes, requirements shift. An unattended assistant decays within six months.',
        '**Training your team.** Managers need to know what to do with an inquiry the assistant hands over, and how to correct it when it gets something wrong.',
      ]},

      { type: 'h2', text: 'How to work out whether it pays off' },
      { type: 'p', text: 'What matters is not "how much does it cost" but "how much does doing nothing cost". The formula is simple and needs three numbers you already know about your business.' },
      { type: 'ul', items: [
        '**How many inquiries arrive outside working hours.** Check a month of statistics: evenings, nights, weekends. For most businesses that is a quarter to a third of everything.',
        '**What share of them is lost.** A customer answered in the morning has often already gone to whoever answered immediately. Use your real conversion from inquiry to conversation.',
        '**What you earn on one deal.** Average order value times margin.',
      ]},
      { type: 'p', text: 'Multiply: night-time inquiries per month, times the share lost, times conversion to a deal, times profit per deal. The result is what you lose every month simply because nobody answers at night. Compare it with the deployment price and the payback period becomes obvious.' },
      { type: 'quote', text: 'If the formula says you lose 20 thousand roubles a month, an assistant for 500 thousand pays back in two years. That is a poor investment, and an honest vendor will tell you so themselves.' },

      { type: 'h2', text: 'How to tell whether it works' },
      { type: 'p', text: 'Counting conversations is pointless: the number grows on its own and says nothing. Look at other things.' },
      { type: 'ul', items: [
        '**Share of conversations completed without a human.** The key figure. If the assistant escalates nine out of ten, it is not working, it is forwarding.',
        '**First response time at night and on weekends.** This is what the whole exercise was for.',
        '**Conversion from conversation to inquiry.** Compare with what managers achieved before.',
        '**Share of conversations where the assistant answered incorrectly.** Only measurable by reading transcripts by hand. Nobody gets this figure automatically, and a vendor promising it out of the box is bluffing.',
      ]},
      { type: 'p', text: 'Agree target values before work starts and put them in the contract. Otherwise, two months in, the argument about whether it works will come down to feelings.' },

      { type: 'h2', text: 'When an AI assistant is not needed' },
      { type: 'p', text: 'There are more such cases than is usually admitted.' },
      { type: 'ul', items: [
        '**Few inquiries.** At five a week a manager copes and there is nothing to automate.',
        '**Every deal is unique.** Project work negotiated from scratch each time maps poorly onto scripts.',
        '**No described process.** If nobody inside the company can explain what happens to an inquiry after it arrives, there is nothing to automate yet. Process first, tool second.',
        '**The problem is not response speed.** If customers leave because of price or product quality, an assistant will not fix that — it will only deliver the bad news faster.',
      ]},

      { type: 'h2', text: 'What to ask a vendor before signing' },
      { type: 'p', text: 'A short list that saves months. The answers separate those who have done this before from those learning at your expense.' },
      { type: 'ol', items: [
        'What does the assistant answer when it does not know? The right answer is that it says so honestly and hands over to a human, rather than inventing something.',
        'Where are customer conversations stored and who has access to them?',
        'What happens to an inquiry if the CRM is unavailable at that moment?',
        'What will running costs be at the current volume, and at twice the volume?',
        'Who owns the knowledge base and the configuration after handover? Can you move to another vendor without starting from scratch?',
        'What is included in support and what counts as billable extra work?',
      ]},

      { type: 'h2', text: 'Frequently asked' },
      { type: 'h3', text: 'Will customers realise they are talking to software?' },
      { type: 'p', text: 'Probably yes, and that is fine. The problem is not that they realised, but whether you were pretending. An assistant that introduces itself honestly and answers quickly annoys people less than a manager who replies a day later. Trying to pass software off as a person becomes obvious by the third message and leaves a bad taste.' },
      { type: 'h3', text: 'Will we have to lay people off?' },
      { type: 'p', text: 'In practice something else happens: routine comes off the managers and they start working the deals that genuinely need a human. If your inquiry flow grows, you will more likely need the same number of people producing more. Headcount reduction as the goal of a deployment usually means the maths was done wrong.' },
      { type: 'h3', text: 'What if the assistant is rude or promises something we cannot deliver?' },
      { type: 'p', text: 'This is the real risk, and it is solved by constraints rather than promises: the assistant must not be able to quote prices that are not in the knowledge base or give guarantees. Ask the vendor how exactly that is prevented. "We asked the model not to" is a bad answer — a request is not a constraint.' },
      { type: 'h3', text: 'Can we start small?' },
      { type: 'p', text: 'You should. Take one channel with the most inquiries and one task: for example, answering price questions and booking a consultation. Within a month you will see what people actually ask, and the next step will rest on data rather than assumptions.' },

      { type: 'h2', text: 'In short' },
      { type: 'p', text: 'The price of an AI assistant is set not by how "smart" it is but by how much has to be built around it: the knowledge base, integrations, failure handling, support. A simple scripted bot costs tens of thousands and solves a narrow task. An assistant that genuinely carries an inquiry to a deal costs hundreds of thousands and requires that you have a described process.' },
      { type: 'p', text: 'Start not by choosing a vendor but with two numbers: how many inquiries you lose outside working hours and what each one is worth. Until you have those, every price will look equally arbitrary.' },

      { type: 'cta' },
    ],
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'pochemu-teryayutsya-zayavki',
    category: 'Business & money',
    title: 'Why Inquiries Get Lost in the Evening and at Weekends, and What It Costs You',
    description:
      'Where inquiries that arrive outside working hours actually go: why customers do not wait until morning, how to put your losses into money, and which fixes genuinely work.',
    keywords:
      'lost leads, handling inquiries at night, why customers go to competitors, response time to a lead, automating inquiry handling, first response time',
    cover: '/blog-images/cover-poteryannye-zayavki.jpg',
    date: '2026-08-30',
    dateModified: '2026-08-30',
    readingTime: '14 min',
    related: ['skolko-stoit-ai-assistent', 'chat-bot-ili-ai-assistent', 'ai-kvalifikaciya-lidov'],
    excerpt:
      'An inquiry that arrives at 21:40 is often no longer yours by morning. We look at why that happens, how to convert it into a monthly figure, and which of the usual fixes actually close the gap.',
    content: [
      { type: 'p', text: 'A customer opened your site on Thursday at 21:40, left an inquiry and went to bed. A manager saw it on Friday at 10:00 and called. The customer did not pick up because they were at work. Called back at lunch, had a chat, agreed to talk on Monday. On Monday the customer said they had already found someone else.' },
      { type: 'p', text: 'This looks like an isolated story, but it is exactly what a noticeable slice of lost revenue is made of in almost any service business. Let us look at why it happens and how to turn it into money you can count.' },

      { type: 'h2', text: 'How many inquiries arrive when nobody is working' },
      { type: 'p', text: 'The first thing to do is look at your own statistics by hour. Not by feel, but from the form or the CRM.' },
      { type: 'p', text: 'The picture is similar for most businesses. The peak is late morning and early evening, but a significant share arrives after the office closes: people deal with personal matters exactly when they are free from their own work. Plus all of Saturday and Sunday.' },
      { type: 'p', text: 'Work out your own share. Take a month of inquiries and split them into working hours and outside them. Even if it comes to a fifth, that is a fifth of your flow that you talk to twelve hours late or worse.' },

      { type: 'h2', text: 'Why the customer does not wait' },
      { type: 'p', text: 'The logic of "they left an inquiry, so they will wait" held when leaving an inquiry was work. Now it takes three seconds, and people rarely write to you alone.' },
      { type: 'ol', items: [
        '**They did not write only to you.** They opened several tabs and left an inquiry in three places. From there a simple rule applies: the conversation goes to whoever answered first, not to whoever would have answered best.',
        '**The decision cooled.** The urge to buy or order has a short shelf life. In the evening the person was ready; by morning they have other concerns.',
        '**Silence reads as an answer.** No reaction is understood not as "they are asleep" but as "they do not care". Especially if your site promises a fast reply.',
      ]},
      { type: 'quote', text: 'Response speed affects the outcome more than the quality of that response. A short "I see your request, I will come back in the morning" at 21:41 works better than a detailed letter at 10:00.' },

      { type: 'h2', text: 'Putting the loss into money' },
      { type: 'p', text: 'As long as this is a feeling it changes nothing. Convert it into a figure. You need four numbers and you have all of them.' },
      { type: 'ul', items: [
        '**A - inquiries outside working hours per month.** From your statistics, not from memory.',
        '**B - what share of them never reaches a conversation.** Compare the "inquiry to conversation" conversion for daytime and night-time inquiries. The gap between them is the loss.',
        '**C - conversion from conversation to deal.** Your usual daytime figure.',
        '**D - profit on one deal.** Average order value minus cost.',
      ]},
      { type: 'p', text: 'Multiply A by B by C by D. That is what the business loses every month simply because nobody answers at certain hours. Multiply by twelve and it becomes clear whether this is worth dealing with at all.' },
      { type: 'p', text: 'One important caveat: count profit, not turnover. Turnover makes a prettier number, but you cannot make decisions on it.' },

      { type: 'h2', text: 'Different channels get lost differently' },
      { type: 'p', text: 'A single loss figure hides something important: channels behave differently and are fixed differently.' },
      { type: 'h3', text: 'A form on the website' },
      { type: 'p', text: 'The most vulnerable channel. The person left a contact and walked away with no feedback at all. They do not know whether the inquiry even arrived, and an hour later they calmly leave one with a competitor. An automatic reply gives the biggest gain here, because right now there is emptiness in its place.' },
      { type: 'h3', text: 'Messengers' },
      { type: 'p', text: 'More forgiving: the person sees the message was delivered and will wait until morning. But there is another trap here - the conversation is often held on a staff member personal phone, so the inquiry lives only with them. They quit, lose the phone or go on holiday, and the trail disappears with them.' },
      { type: 'h3', text: 'Calls' },
      { type: 'p', text: 'A missed evening call usually never gets returned at all, on the assumption that "if it mattered they would call back". For most businesses this is the most underestimated source of loss, precisely because missed calls are never recorded as inquiries anywhere.' },
      { type: 'quote', text: 'Start with the channel that currently has no reaction at all. Improving a reply from two hours to five minutes gains less than replacing complete silence with any sensible answer.' },

      { type: 'h2', text: 'How to test the idea in a week for free' },
      { type: 'p', text: 'Before deploying anything, make sure the problem exists in your case. This is done by hand and costs almost nothing.' },
      { type: 'ol', items: [
        '**For one week, answer every evening inquiry within half an hour.** By hand, taking turns with a colleague, however works. The goal is not to build a process but to collect data.',
        '**For the second week, work as usual.** Morning replies, nothing changed.',
        '**Compare the two weeks on one figure:** the share of inquiries that reached a conversation. Not sales - the sample is too small and randomness will distort it.',
      ]},
      { type: 'p', text: 'If the difference is noticeable, you have just measured the benefit of automation on your own customers rather than on someone else promises. If there is no difference, you have saved hundreds of thousands of roubles and know to look for the cause elsewhere.' },

      { type: 'h2', text: 'A full worked example' },
      { type: 'p', text: 'So the formula does not stay abstract, here it is on an imaginary workshop. The numbers are invented for the example; substitute your own.' },
      { type: 'ul', items: [
        'Inquiries per month: 200, of which 60 arrive outside working hours.',
        'Daytime ones reach a conversation in 80 cases out of 100, night-time ones in 45. The gap: 35 per cent.',
        'So about 21 inquiries a month are lost.',
        'One in four conversations becomes a deal: about 5 deals.',
        'Profit per deal 8 thousand roubles.',
      ]},
      { type: 'p', text: 'That is around 40 thousand roubles a month, nearly half a million a year. At those numbers an assistant for 200 thousand pays back in five months. At a tenth of the volume it never pays back - and that is equally useful to learn before signing.' },

      { type: 'h2', text: 'What people usually try, and what actually works' },
      { type: 'h3', text: 'Managers on evening duty' },
      { type: 'p', text: 'Works while it lasts. The problem is that it is the most expensive option and the most fragile: people fall ill, quit, get tired of answering on their day off. Within two months the rota quietly stops being observed and you find out by accident.' },
      { type: 'h3', text: 'An auto-reply saying "we have received your inquiry"' },
      { type: 'p', text: 'Better than nothing, but not by much. Such a message reads as a receipt rather than an answer: it addresses none of the customer questions and does not stop them going elsewhere. It only helps when paired with a promised deadline that you actually keep.' },
      { type: 'h3', text: 'A form promising "we will call back in 15 minutes"' },
      { type: 'p', text: 'A dangerous option. If the promise is not kept outside working hours it works against you: what the customer remembers is not that you are fast but that you do not keep your word.' },
      { type: 'h3', text: 'An assistant that answers by itself' },
      { type: 'p', text: 'This is where an actual solution appears: the customer gets a substantive answer immediately, and in the morning the manager sees not a bare contact but a conversation with details. What that costs and what makes up the price is covered in [the breakdown of AI assistant pricing](/blog/skolko-stoit-ai-assistent/).' },

      { type: 'h2', text: 'What a night-time reply must do to count as a reply' },
      { type: 'p', text: 'Not every automatic reaction closes the gap. Check against this list.' },
      { type: 'ul', items: [
        '**Answer the question rather than acknowledge receipt.** If someone asked about price, they should get a price range, not "a manager will contact you".',
        '**Admit when it does not know.** An invented answer is worse than an honest "I will check that with colleagues in the morning".',
        '**Ask clarifying questions.** In the morning the manager should receive not "interested in a renovation" but what exactly, where and when.',
        '**Name a deadline and keep it.** "Igor will call you before eleven" beats "we will be in touch".',
        '**Be able to hand over immediately.** If the customer is annoyed or the case is complex, the assistant should step back rather than argue.',
      ]},

      { type: 'h2', text: 'What you can do tomorrow for free' },
      { type: 'p', text: 'Automation is not the only move, and not the one to start with. Half the losses close with organisational fixes in a single evening.' },
      { type: 'ol', items: [
        '**Remove promises from your site that you do not keep at night.** "We reply in 15 minutes" without a night shift works against you.',
        '**Say honestly when you will reply.** "Inquiries after 20:00 are picked up in the morning, answered by 11" is respectful, and people are more likely to wait.',
        '**Check where inquiries actually land.** Surprisingly often it turns out form emails go to spam and the messenger is tied to the phone of someone who left in the spring.',
        '**Put all channels in one place.** While inquiries live in five different places, no automation will help: it will add a sixth.',
        '**Return missed calls.** First thing in the morning, before everything else. This costs nothing and usually has the most visible effect on the list.',
      ]},
      { type: 'p', text: 'If losses remain significant after these steps, then it makes sense to budget for an assistant: you will be buying a solution to a real problem rather than a substitute for putting your house in order.' },

      { type: 'h2', text: 'How to tell the gap is closed' },
      { type: 'p', text: 'A month after launch compare two things with what came before.' },
      { type: 'ol', items: [
        '**Conversion of night-time inquiries into actual conversations.** It should move towards the daytime figure. If the gap stays the same, the problem was not response speed.',
        '**Time to first response.** Use the median, not the average: one inquiry handled after three days will ruin the average and hide the real picture.',
      ]},
      { type: 'p', text: 'And read transcripts by hand, at least ten a week. Metrics will show that an answer happened, not that the answer was any good.' },

      { type: 'h2', text: 'When the problem is not speed' },
      { type: 'p', text: 'Before investing, make sure you are fixing what is broken.' },
      { type: 'ul', items: [
        'If daytime inquiries get lost too, the issue is the handling process, not the hour of day.',
        'If customers reach a conversation but do not buy, the problem is the offer or the price, and a fast reply will only speed up the refusal.',
        'If there are few inquiries at all, start with being found rather than with handling five a week at night.',
      ]},

      { type: 'h2', text: 'In short' },
      { type: 'p', text: 'An inquiry left in the evening does not compete with your morning - it competes with a competitor reply that arrived a minute later. Work out your share of out-of-hours inquiries and the conversion gap against daytime ones: that is the price of silence.' },
      { type: 'p', text: 'If the figure is significant, the next question is what to close the gap with: [a simple bot or a full assistant](/blog/chat-bot-ili-ai-assistent/), and how to make sure the morning brings not a list of contacts but [inquiries already sorted by readiness](/blog/ai-kvalifikaciya-lidov/).' },

      { type: 'cta' },
    ],
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'chat-bot-ili-ai-assistent',
    category: 'Business & money',
    title: 'Chatbot or AI Assistant: What Actually Separates Them',
    description:
      'The difference between a scripted chatbot and an assistant running on a language model: what each can do, where each breaks, what they cost, and how to choose without overpaying or buying an empty shell.',
    keywords:
      'chatbot or ai assistant, difference between chatbot and ai, scripted bot, language model assistant, which bot to choose for business, website chatbot',
    cover: '/blog-images/cover-bot-ili-assistent.jpg',
    date: '2026-08-30',
    dateModified: '2026-08-30',
    readingTime: '13 min',
    related: ['skolko-stoit-ai-assistent', 'pochemu-teryayutsya-zayavki', 'ai-assistent-i-crm'],
    excerpt:
      'From the outside it is the same chat window. Inside it is a tenfold difference in price and a hundredfold difference in what happens when a customer asks something you did not anticipate.',
    content: [
      { type: 'p', text: 'On a website both look identical: a round button in the corner, a window, someone answering. The difference only shows when a customer asks something nobody expected. One of them asks you to rephrase; the other answers. That difference is where both the price gap and the gap in results come from.' },
      { type: 'p', text: 'Let us go through both honestly, including the cases where the expensive option is not needed.' },

      { type: 'h2', text: 'A scripted chatbot: a tree of prepared answers' },
      { type: 'p', text: 'There is no artificial intelligence inside such a bot, although it is often sold as exactly that. There is a tree: question, answer options, next question. Everything the bot says was written by hand in advance.' },
      { type: 'p', text: 'Recognition works on keywords. If the script contains "opening hours" and the customer writes "are you open on Sunday", there is no match, and the bot replies that it did not understand or offers a menu.' },
      { type: 'h3', text: 'Where it genuinely shines' },
      { type: 'ul', items: [
        '**Booking an appointment.** Choose a service, a specialist, a time - an ideal task for buttons. Buttons are even better than free text here: fewer mistakes.',
        '**Guiding along a short path.** Processing a return, checking an order status, picking a collection point.',
        '**Capturing a contact.** Name, phone, convenient time - then hand over to a manager.',
      ]},
      { type: 'h3', text: 'Where it breaks' },
      { type: 'p', text: 'On any question you did not anticipate. And anticipating everything is impossible: real people phrase things in endlessly varied ways. The second problem is sprawl. A script with forty branches becomes unmaintainable: six months later nobody remembers why a branch says what it says, and edits start breaking neighbouring ones.' },
      { type: 'p', text: 'Price from published rates: roughly from 30 thousand roubles for a simple version, from 90 thousand for a bot with sales logic. Running costs are near zero.' },

      { type: 'h2', text: 'An assistant on a language model: understands and composes' },
      { type: 'p', text: 'Here there is a real language model inside. It understands a question asked in any form and composes an answer rather than picking one. The customer asking about Sunday gets a proper reply.' },
      { type: 'p', text: 'But there is a fundamental point that determines everything. The model on its own knows nothing about your business: not your prices, not your terms, not the fact that you do not work with companies. If you do not give it that, it will answer in generalities or, worse, invent things. So the main engineering work in a deployment is not "connecting a model" but assembling your knowledge base and teaching the assistant to search it and answer only from what is there.' },
      { type: 'quote', text: 'The question that separates an experienced vendor from a beginner: "where does the assistant get facts, and what does it answer when a fact is missing". The right answer is that it says so honestly and hands over to a human. "The model will figure it out" means that in a month it will promise a customer a discount you do not offer.' },
      { type: 'h3', text: 'Where it is stronger' },
      { type: 'ul', items: [
        '**Free-form questions.** The customer writes as they think, not as you anticipated.',
        '**Long conversations.** It keeps context: if a two-room flat was mentioned at the start, that is taken into account later.',
        '**Preparing the inquiry.** It clarifies details, so in the morning the manager receives substance rather than a bare contact.',
        '**Change.** Updating terms is an edit in the knowledge base, not a rebuild of a decision tree.',
      ]},
      { type: 'h3', text: 'Where it is weaker' },
      { type: 'ul', items: [
        '**Strict procedures.** Where an exact sequence of steps matters, freedom of phrasing hurts: buttons are more reliable.',
        '**Price.** From 120 thousand for a basic deployment and noticeably more with integrations, plus a monthly charge for model calls.',
        '**The risk of invention.** It does not disappear entirely, it gets constrained. Ask exactly how.',
      ]},

      { type: 'h2', text: 'How to choose: three questions to yourself' },
      { type: 'ol', items: [
        '**Do your customers ask the same things?** Collect the last hundred inquiries. If nine in ten fit a dozen typical questions, a scripted bot is enough. If every second question is its own, you need an assistant.',
        '**What has to happen after the conversation?** If it is booking a slot, both will manage. If it is understanding the task and preparing the manager, only an assistant will.',
        '**Who will maintain it?** A script needs someone to add branches for new questions. A knowledge base needs someone to keep it current. If there is nobody for either, any solution goes stale within six months.',
      ]},

      { type: 'h2', text: 'How to test a solution before buying' },
      { type: 'p', text: 'A demo always looks convincing: the vendor shows scenarios they prepared themselves. What you should test is not those but the behaviour at the edges. Ask for access to a test version and put five questions to it.' },
      { type: 'ol', items: [
        '**Something off-topic.** Ask about what the company does not do. A good answer: "we do not do that, but we do this". A bad one: a cheerful promise to help.',
        '**A question with typos and no punctuation.** That is how half of all real people write. A scripted bot usually gets lost here.',
        '**Two questions in one message.** "How much is it and when can you start" is a typical phrasing that breaks simple solutions.',
        '**A follow-up three messages later.** Ask about price, discuss something else, then say "back to my first question". This tests conversational memory.',
        '**A question with no possible answer.** Ask about a service or condition that does not exist. This is where you find out whether the assistant admits ignorance or invents.',
      ]},
      { type: 'p', text: 'The fifth question matters more than the other four. An assistant that invents confidently is more dangerous than a bot that honestly did not understand: the customer will believe it and arrive with a claim based on a promise you never made.' },

      { type: 'h2', text: 'How long each takes to launch' },
      { type: 'ul', items: [
        '**Scripted bot:** from a few days to two weeks. Most of the time goes not into the technology but into inventing and writing every branch.',
        '**Assistant:** from three to six weeks. The largest part is assembling the knowledge base, and that part sits with you, not the vendor.',
        '**Both need a month of running in** on real inquiries. Not skippable: that is where you learn what people actually ask.',
      ]},

      { type: 'h2', text: 'Five situations and what to take in each' },
      { type: 'h3', text: 'Barbershop, salon, workshop: booking a time' },
      { type: 'p', text: 'Take a scripted bot. The questions are typical, there is one action, and buttons are more reliable than free text. An assistant here costs more without winning anything.' },
      { type: 'h3', text: 'A clinic: booking plus questions about treatment' },
      { type: 'p', text: 'A hybrid. Booking on buttons, questions through an assistant, but with a hard ban on any medical advice and mandatory handover to a human at the first sign of urgency.' },
      { type: 'h3', text: 'Construction, renovation, complex services' },
      { type: 'p', text: 'An assistant. Every inquiry is different, there are many questions, and the real value is that in the morning the manager receives a full picture of the task rather than a line saying "interested in a renovation".' },
      { type: 'h3', text: 'An online shop with a large catalogue' },
      { type: 'p', text: 'An assistant with access to the catalogue and stock levels. The key here is not conversation but the link to availability: a bot cheerfully selling what is out of stock produces losses, not revenue.' },
      { type: 'h3', text: 'Wholesale and B2B' },
      { type: 'p', text: 'Careful with both. There are few inquiries and each is valuable, so automation is justified only on first contact: record who wrote and about what, then hand over to a human immediately. Trying to run such negotiations automatically is a way to lose a large client.' },

      { type: 'h2', text: 'Three costly misconceptions' },
      { type: 'h3', text: '"We will take the cheap one and replace it later"' },
      { type: 'p', text: 'Replacing means not only new development but a knowledge base rebuilt from scratch, new integrations and retraining your team. If your questions clearly exceed what scripts can handle, the cheap option is not a first step but money thrown away.' },
      { type: 'h3', text: '"The assistant will learn from our conversations"' },
      { type: 'p', text: 'In most deployments it will not. It answers from a knowledge base maintained by people. Training on transcripts is separate, expensive work and is usually not done. If you are promised self-learning, ask who checks what exactly the system learned.' },
      { type: 'h3', text: '"Customers dislike bots"' },
      { type: 'p', text: 'Customers dislike useless bots. A fast, substantive answer at eleven at night is noticeably more welcome than silence until morning - the same point is made in [the piece on lost inquiries](/blog/pochemu-teryayutsya-zayavki/).' },

      { type: 'h2', text: 'The hybrid that beats both' },
      { type: 'p', text: 'In practice the strongest setup is a combination: the assistant handles free conversation and, at the moment of action, hands control to a rigid script.' },
      { type: 'p', text: 'The customer writes whatever they like, the assistant understands and replies. When it comes to booking, buttons take over: service, date, time. Freedom of phrasing then does not interfere with precision where mistakes are expensive. Ask a vendor whether they can do this - it is a good indicator of maturity.' },

      { type: 'h2', text: 'What not to expect from either' },
      { type: 'ul', items: [
        '**That it will sell for you.** It removes routine and stops inquiries being lost, but the decision to buy is made by a person, and in complex deals it is made in conversation with a person.',
        '**That it will replace a team.** It replaces the first line: answers to typical questions and gathering details.',
        '**That it will earn for you.** If the offer is weak, a fast answer only speeds up the refusal.',
      ]},

      { type: 'h2', text: 'In short' },
      { type: 'p', text: 'A scripted bot is a tree of prepared answers: cheap, predictable, breaks on the first unanticipated question. An assistant on a language model understands free speech and answers from your knowledge base: more expensive, more flexible, and it requires that such a base exists.' },
      { type: 'p', text: 'The choice is driven not by what is more modern but by how varied your customers questions are. The price ranges and the scope of work are covered in [the pricing breakdown](/blog/skolko-stoit-ai-assistent/), and what happens to an inquiry afterwards in [the piece on connecting to a CRM](/blog/ai-assistent-i-crm/).' },

      { type: 'cta' },
    ],
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-kvalifikaciya-lidov',
    category: 'Business & money',
    title: 'AI Lead Qualification: Separating Warm from Cold Without a Manager',
    description:
      'How automatic qualification works: which questions to ask, how not to turn it into an interrogation, why scoring often misleads, and what to do with the leads marked cold.',
    keywords:
      'lead qualification, ai lead qualification, lead scoring, how to identify hot leads, automatic inquiry handling, sales funnel automation',
    cover: '/blog-images/cover-kvalifikaciya.jpg',
    date: '2026-08-30',
    dateModified: '2026-08-30',
    readingTime: '13 min',
    related: ['pochemu-teryayutsya-zayavki', 'ai-assistent-i-crm', 'skolko-stoit-ai-assistent'],
    excerpt:
      'A manager spends the same time on someone buying tomorrow and someone just browsing. We look at how to sort inquiries automatically and why point-based scoring usually does more harm than good.',
    content: [
      { type: 'p', text: 'In any flow of inquiries there is a person ready to buy this week and a person collecting information for later who will come back in six months, or never. From the outside their inquiries look the same: both came from one form and read identically.' },
      { type: 'p', text: 'A manager spends the same time on both. While they patiently advise the second, the first is waiting for a reply and leaves for whoever answered faster. Qualification solves exactly this: working out who is who before an hour has been spent on the conversation.' },

      { type: 'h2', text: 'What qualifying actually means' },
      { type: 'p', text: 'It is the answer to four questions, all of them simple.' },
      { type: 'ul', items: [
        '**Is this even our kind of job?** The person wants what you do, or arrived by mistake.',
        '**Timing.** Needed this week, next quarter, or "sometime, we will see".',
        '**Budget.** The price range is acceptable to them, or they expected something ten times cheaper.',
        '**Do they decide?** Or will they have to get approval from someone not in the conversation.',
      ]},
      { type: 'p', text: 'The good news: you do not need artificial intelligence to get these answers. You need to ask. The bad news: asking in a way that does not feel like an interrogation is the hard part.' },

      { type: 'h2', text: 'Why a form with extra fields does not work' },
      { type: 'p', text: 'The first instinct is usually to add "budget" and "timing" fields to the form and let it sort itself out. In practice something else happens.' },
      { type: 'p', text: 'A long form filters out not the cold leads but the impatient ones. And the impatient are often exactly those in a hurry, which makes them the most valuable. On top of that, many fill in a budget field at random or skip it: they do not yet know the price range, which is why they came.' },
      { type: 'quote', text: 'Every additional required field reduces the number of inquiries. Qualification belongs in the conversation after the inquiry, not in the form before it.' },

      { type: 'h2', text: 'How an assistant does it' },
      { type: 'p', text: 'The assistant asks the same questions, but in dialogue and one at a time, answering the customer questions in between. To the person it looks like a consultation, not a questionnaire.' },
      { type: 'p', text: 'The key technique: give first, ask second. Not "state your budget" but "in your case it usually starts from this figure - is that the range you had in mind?". The person has received something useful and answers more willingly, and you simultaneously filter out those for whom the number is unacceptable, without an awkward conversation.' },
      { type: 'h3', text: 'What should land on the manager desk in the morning' },
      { type: 'ul', items: [
        'What the person needs, in their own words rather than in your terminology.',
        'When they need it and why exactly then - the timing often explains everything else.',
        'Whether they know the price range and how they reacted.',
        'What remains unclear. This field matters more than the others: it tells the manager where to start.',
      ]},

      { type: 'h2', text: 'Which questions to ask: examples by industry' },
      { type: 'p', text: 'The four general questions have to be translated into the language of your field, otherwise they sound like a textbook questionnaire.' },
      { type: 'h3', text: 'Renovation and construction' },
      { type: 'ul', items: [
        'What kind of property and what size - this settles both budget and timing at once.',
        'Is there a design already, or are we starting from nothing.',
        'When they plan to start: "in the spring" and "next week" are different customers.',
        'Is the property empty or lived in: this strongly affects both cost and whether you take the job at all.',
      ]},
      { type: 'h3', text: 'Clinics and healthcare' },
      { type: 'ul', items: [
        'What is troubling them, in their own words - and no attempt whatsoever to diagnose.',
        'First visit or continuing treatment.',
        'Whether they have test results with them.',
        'How urgent. Here this is not a sales question but a safety one: acute cases must go to a human immediately.',
      ]},
      { type: 'h3', text: 'Business services' },
      { type: 'ul', items: [
        'What problem they are solving and what they have already tried.',
        'Whether there is a deadline and what drives it.',
        'Who else is involved in the decision.',
        'Whether they have worked with contractors in this area before.',
      ]},

      { type: 'h2', text: 'How not to turn it into an interrogation' },
      { type: 'p', text: 'The main risk of qualification is that the person came for an answer and got a form. A few rules that remove this.' },
      { type: 'ol', items: [
        '**One question per message.** Three in a row read as a form and stop being answered.',
        '**Usefulness first, question second.** Answer substantively and you have earned the right to clarify.',
        '**No more than four questions per conversation.** The rest the manager will find out by voice, and that is fine.',
        '**Respect a refusal.** If they will not name a budget, move on rather than asking again in different words.',
        '**Explain why.** "I will ask about timing so I know whether we can make it" removes almost all irritation.',
      ]},

      { type: 'h2', text: 'What it looks like in a real conversation' },
      { type: 'p', text: 'Theory reads neatly, so it helps to see what it turns into. An imagined example for a renovation company, Friday evening.' },
      { type: 'ul', items: [
        '**Customer:** "Hello, how much would it cost to renovate a two-bedroom flat?"',
        '**Assistant:** gives a price range per square metre for two finish levels and asks about the area. Note the order: answer first, question second.',
        '**Customer:** "54 square metres, but people are living there at the moment."',
        '**Assistant:** explains that renovation in an occupied flat takes longer and usually costs more, and asks when they plan to start.',
        '**Customer:** "We would like September, before it gets cold."',
        '**Assistant:** records the deadline, says a foreman will call on Monday before noon, and asks what time suits.',
      ]},
      { type: 'p', text: 'Six exchanges settled everything: property, size, working conditions, deadline and its reason, reaction to the price range. The customer filled in no forms and got an answer to their question in the very first message. On Monday the manager opens the record and already knows what to talk about.' },
      { type: 'p', text: 'Compare with what a standard form would have produced: a name, a phone number and a tick next to "flat renovation".' },

      { type: 'h2', text: 'Why scoring usually misleads' },
      { type: 'p', text: 'The classic approach is to award points: so many for budget, so many for timing, then sum and grade. It looks objective, but has two flaws.' },
      { type: 'ol', items: [
        '**The weights are invented.** Why is timing worth twenty points and budget thirty? Usually because it felt right. Real weights can only come from your own deal statistics, and almost nobody does that work.',
        '**The total hides the meaning.** Two inquiries at eighty points can be completely different: one has a large budget and a distant deadline, the other the reverse. The manager sees one number and loses the picture.',
      ]},
      { type: 'p', text: 'More practical than a number are three or four plain buckets: "ready now", "interested, distant timing", "not our profile", "needs clarifying". The manager immediately knows what to do instead of decoding points.' },

      { type: 'h2', text: 'What to do with the cold ones' },
      { type: 'p', text: 'The most common mistake is treating cold as useless. It means "not now", which is a different thing.' },
      { type: 'ul', items: [
        '**Do not discard them.** Someone returning in six months returns to whoever they remember.',
        '**Do not call every week.** That is precisely how "not now" is turned into "never".',
        '**Give them a reason to come back.** Useful material on their problem works better than "so, have you decided?".',
        '**Record the reason for refusal.** After a quarter you will see which reason comes up most often, and that tells you more about your offer than any analytics.',
      ]},

      { type: 'h2', text: 'What to do with those who did not answer' },
      { type: 'p', text: 'Some people will ask their question, get an answer and disappear without completing qualification. This is not a system failure, it is normal behaviour.' },
      { type: 'ul', items: [
        'Save the inquiry anyway: there is a contact and a topic, which is enough for a manager.',
        'Mark it separately: "not qualified" is not the same as "cold". The first means we do not know, the second means we know it is not now.',
        'Do not fill in the blanks by guessing. An empty field is more honest than an invented value that later appears in a report as fact.',
      ]},

      { type: 'h2', text: 'Where automatic qualification gets it wrong' },
      { type: 'p', text: 'It is not omnipotent, and its weak spots are worth knowing in advance.' },
      { type: 'ul', items: [
        '**People understate their budget.** To avoid looking like an easy sale. This is normal and happens constantly.',
        '**Large clients write briefly.** "Need to discuss a project" with no detail may turn out to be the biggest deal of the quarter. A simple rule: short, dry messages from companies should go to a human immediately.',
        '**Wording throws it off.** Someone describes their task in unusual words and the assistant files them in the wrong bucket.',
      ]},
      { type: 'p', text: 'Hence a mandatory requirement: every bucket except "not our profile" must remain visible to the manager. Automation sorts the queue; it does not decide who you will talk to.' },

      { type: 'h2', text: 'How to check that it works' },
      { type: 'p', text: 'A month or two in, take your closed deals and see which buckets those customers were originally placed in.' },
      { type: 'ul', items: [
        'If a significant share of won deals came from "cold", the qualification is wrong and its rules need changing.',
        'If almost nobody from "hot" bought, you are selecting on the wrong signals.',
        'If managers have stopped looking at the buckets and work through the list in order, they do not trust it - and that is also a result worth investigating.',
      ]},

      { type: 'h2', text: 'In short' },
      { type: 'p', text: 'Qualification is not about technology but about four questions: is this our job, when, for how much, and who decides. An assistant is useful because it asks them in conversation and does not tire of doing so at three in the morning.' },
      { type: 'p', text: 'Replace points with plain buckets, do not discard the cold ones, and always show borderline cases to a human. To stop the results settling in a chat thread instead of reaching your workflow you need [a link to the CRM](/blog/ai-assistent-i-crm/), and the reason for the whole exercise is set out in [the piece on lost inquiries](/blog/pochemu-teryayutsya-zayavki/).' },

      { type: 'cta' },
    ],
  },
  // ───────────────────────────────────────────────────────────────────────
  {
    slug: 'ai-assistent-i-crm',
    category: 'Business & money',
    title: 'AI Assistant and CRM: What Works in the Pairing and What Breaks',
    description:
      'How to connect an assistant to a CRM so inquiries do not vanish: what belongs in the record, what happens when the integration fails, why duplicates are inevitable, and how to avoid turning the system into a dump.',
    keywords:
      'ai assistant and crm, chatbot crm integration, automatic deal creation, inquiries into crm automatically, crm integration with ai',
    cover: '/blog-images/cover-crm-integraciya.jpg',
    date: '2026-08-30',
    dateModified: '2026-08-30',
    readingTime: '14 min',
    related: ['ai-kvalifikaciya-lidov', 'skolko-stoit-ai-assistent', 'pochemu-teryayutsya-zayavki'],
    excerpt:
      'An assistant that answers customers but writes nothing to the CRM simply moves the chaos elsewhere. We cover what belongs in a record, what happens during an outage, and why duplicates will definitely appear.',
    content: [
      { type: 'p', text: 'The assistant talked to a customer overnight, worked everything out and promised a call in the morning. In the morning the manager opens the CRM and finds nothing: the conversation stayed in the chat and nobody knows about it. By lunchtime the customer has stopped replying.' },
      { type: 'p', text: 'This is the most common way to waste a deployment. An assistant with no link to the CRM does not remove chaos, it moves it somewhere new where it is even harder to notice. Let us go through how the pairing works and where it breaks.' },

      { type: 'h2', text: 'What belongs in the record' },
      { type: 'p', text: 'The temptation to log everything is strong, but a record with the entire transcript dumped into it is useless: nobody reads it. What you need is a short set of fields that lets a manager grasp the situation in ten seconds.' },
      { type: 'ul', items: [
        '**Contact and channel.** Where they came from: website, messenger, phone. This also determines where to reply.',
        '**The task in the customer own words.** Not a retelling in your terminology but how they phrased it themselves.',
        '**Urgency and budget, if established.** An empty field beats an invented value.',
        '**What remains unclear.** The most valuable field: it tells the manager where to start.',
        '**A link to the full conversation.** A link, not the text itself. Whoever needs it will open it.',
      ]},
      { type: 'quote', text: 'A sanity check: the manager should understand the record without opening the conversation. If understanding requires reading the whole thread, the fields were chosen wrongly.' },

      { type: 'h2', text: 'Where exactly to write: deal, lead or task' },
      { type: 'p', text: 'Technically you can create anything, and the choice decides what your funnel looks like in six months.' },
      { type: 'ol', items: [
        '**Create a deal for every inquiry.** The funnel fills with noise, conversion drops to an embarrassing figure, and you can no longer read anything from it.',
        '**Create a lead, and a deal only after qualification.** The sensible default: raw is separated from working.',
        '**Create a task for a manager and add the funnel entry by hand.** Suits businesses with few, large deals.',
      ]},
      { type: 'p', text: 'Decide this before work starts, not after. Reworking funnel structure on a live database is a separate painful project.' },

      { type: 'h2', text: 'What happens when the CRM is unavailable' },
      { type: 'p', text: 'It will happen. Maintenance, an expired access token, a provider outage, a change in the interface. The question is not whether, but what then.' },
      { type: 'p', text: 'The bad answer: the inquiry disappears. The assistant tried to write, got an error and forgot. The customer meanwhile is confident everything is fine, because they were answered.' },
      { type: 'p', text: 'Correct behaviour has three parts.' },
      { type: 'ul', items: [
        '**A queue.** If it did not save, put it in a queue and retry rather than discard.',
        '**A fallback channel.** If it still fails an hour later, send an email or a message to whoever is responsible. Inelegant, but the inquiry survives.',
        '**A notification to a human.** The error must be visible to someone. An error known only to a log file is an error that does not exist.',
      ]},
      { type: 'p', text: 'Ask a vendor about this directly. "That will not happen" means nobody thought about it, and the first scheduled maintenance on your CRM will cost you a day of inquiries.' },

      { type: 'h2', text: 'Duplicates will definitely appear' },
      { type: 'p', text: 'The same person will write to the site chat, then to a messenger, then call. To the CRM these are three separate inquiries, and a month later you have three records for one customer being worked by three different managers.' },
      { type: 'p', text: 'This cannot be solved completely, but it can be reduced to a tolerable level.' },
      { type: 'ul', items: [
        '**Search before creating.** By phone and email, normalised to one format: two different notations of the same number are the same number, and the system does not know that by itself.',
        '**Do not merge automatically by name.** Namesakes exist, and merging two different customers is worse than two duplicates.',
        '**Flag the suspicious ones.** Let a person decide: it takes them five seconds, while an automation mistake can cost a deal.',
      ]},

      { type: 'h2', text: 'Who owns the conversation: assistant and manager together' },
      { type: 'p', text: 'A subtlety usually overlooked. The assistant answers at night, a manager joins in the morning. What happens if the customer writes again at lunchtime?' },
      { type: 'p', text: 'If the assistant keeps answering over the manager, the result is a mess: the customer sees two different voices and the manager does not know what happened without them. You need an explicit rule: once a human enters the conversation, the assistant goes silent on that inquiry until the manager hands it back.' },
      { type: 'p', text: 'Agree this at the specification stage. It looks like a detail and turns out to be the thing that makes a deployment feel unfinished.' },

      { type: 'h2', text: 'What to do with history from before the deployment' },
      { type: 'p', text: 'A separate question that surfaces mid-project: you have years of conversations, calls and notes. What happens to them?' },
      { type: 'ul', items: [
        '**Do not migrate everything.** Processing the archive usually costs more than it returns. Migrate open deals and customers from the last year; leave the rest where it is.',
        '**Do not plug the archive in as a knowledge base.** The temptation is strong - it is full of real answers from your managers. The problem is that it is also full of outdated prices, cancelled terms and mistakes. The assistant will repeat all of it confidently.',
        '**Use the archive differently, as a source of questions.** Read the last hundred conversations and write down what people ask. That is the best foundation for a knowledge base - only written anew and verified.',
      ]},

      { type: 'h2', text: 'Access and security' },
      { type: 'p', text: 'An integration means an external system gets a key to your customer database. This deserves more attention than it usually gets.' },
      { type: 'ul', items: [
        '**A separate account for the integration.** Not the director personal login and not a shared admin one. A separate one with a clear name.',
        '**Minimum permissions.** The assistant needs to create deals and read reference data. It does not need to delete deals, export the whole database or change funnel settings.',
        '**Know where the access key lives.** If only the vendor has it, you depend on the vendor completely.',
        '**Be able to revoke access in a minute.** Check that you know how before you need to.',
      ]},
      { type: 'p', text: 'While you are at it, ask where the conversations themselves are stored and for how long. This is your customers personal data, and you will answer for it, not the vendor.' },

      { type: 'h2', text: 'An order of work that saves a month' },
      { type: 'ol', items: [
        '**Tidy the CRM first.** If fields are duplicated and half the deals sit in unclear stages, automation will not fix that - it will cement it.',
        '**Describe the path of an inquiry on paper.** From arrival to closure, with an owner at each step.',
        '**Connect one direction and one channel.** Test on real inquiries for two weeks.',
        '**Add the remaining channels.** One at a time, not all at once.',
        '**A month later, look at what actually lands in the records.** Almost always it turns out one field is redundant and another is missing.',
      ]},

      { type: 'h2', text: 'Frequently asked' },
      { type: 'h3', text: 'We have no CRM, we work in a spreadsheet. Is that acceptable?' },
      { type: 'p', text: 'It is, and at the start it is more honest than buying a CRM for the sake of the assistant. A spreadsheet survives a couple of dozen inquiries a month. But decide in advance who looks at it and when: an inquiry landing in a spreadsheet opened once a week is lost just as reliably as one recorded nowhere.' },
      { type: 'h3', text: 'What if our system is custom-built?' },
      { type: 'p', text: 'The only question is whether it can accept data from outside. If it can, the work is about the same as with an off-the-shelf CRM. If it cannot and there is nobody to add that, the fallback remains: an email or message to whoever is responsible, with manual entry. Worse, but it works.' },
      { type: 'h3', text: 'Who is responsible if the assistant records the wrong data?' },
      { type: 'p', text: 'In front of the customer, you are - not the vendor. So the contract should fix not only development deadlines but the response time for errors after launch. Errors will happen; the question is whether they are fixed in a day or a month.' },
      { type: 'h3', text: 'Can we skip the integration and just forward conversations by email?' },
      { type: 'p', text: 'For the first month, yes, and it is a cheap way to test the idea. After that email stops coping: you cannot tell from it who took the inquiry and how it ended. That is precisely what separates it from a CRM.' },

      { type: 'h2', text: 'Signs the pairing was done badly' },
      { type: 'ul', items: [
        'Managers have started their own file or notebook alongside the CRM. That means they do not trust the system.',
        'Many fields in the records are empty. Either the assistant is not establishing what you planned, or there are too many fields.',
        'You have to open the conversation to understand the record.',
        'Nobody knows how many inquiries failed to save last month. That means nobody is counting errors.',
      ]},

      { type: 'h2', text: 'In short' },
      { type: 'p', text: 'The CRM link is not a technical detail at the end of the project but the reason the project exists. An assistant that converses well but leaves no trace in your system creates the feeling of work instead of the work.' },
      { type: 'p', text: 'Agree three things upfront: what goes into the record, what happens during an outage, and who owns the conversation once a human joins. What is worth establishing with the customer is covered in [the piece on qualification](/blog/ai-kvalifikaciya-lidov/), and what the whole thing costs in [the pricing breakdown](/blog/skolko-stoit-ai-assistent/).' },

      { type: 'cta' },
    ],
  },
];

export default PART_5;
