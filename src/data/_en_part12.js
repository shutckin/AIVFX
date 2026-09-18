// EN-переводы блога, часть 8 - музыкальный блок (сентябрь 2026):
// Suno, цены и права, скачивание, как собрать песню, вокал не на английском.
// Русские оригиналы - в blog-posts.js.
//
// Это не дословные переводы: русские версии построены вокруг оплаты из
// России, а англоязычному читателю продаёт другой довод - одна подписка
// вместо пяти, и отказ карты как общая проблема, а не российская.
const PART_12 = [
  {
    slug: 'claude-agenty-i-claude-code',
    category: 'Models & comparisons',
    title: 'Claude\'s Agents in 2026: Cowork Just Merged Into Chat, and How That Differs From Claude Code',
    description:
      'On September 16-17, 2026 Anthropic folded its standalone Cowork agent into regular Claude chat and launched Claude Docs and Claude Slides alongside it. Here is what changed, and the honest difference between that kind of "agent" and Claude Code, the separate tool built for developers.',
    keywords:
      'claude cowork, claude agents 2026, claude docs, claude slides, claude code explained, claude subagents, claude mcp, ai agent for business, claude vs claude code',
    cover: '/blog-images/claude-agents-merging-asterisk.jpg',
    coverPrompt: 'Editorial photograph, hard directional studio strobe, high contrast, dark background. A model stands beside a minimalist chrome-and-glass plinth. Two distinct frosted-glass sculptural forms hang suspended in mid-air on either side of the plinth, both visibly drawn toward its center by some unseen force: on the left, a soft rounded shape suggesting a folded stack of paper or a document corner; on the right, an angular bracket-like shape suggesting a blinking terminal cursor. Where the two forms meet at the center, they are mid-fusion, dissolving into a single glowing orange six-pointed asterisk (Anthropic\'s own mark) hovering just above the plinth. The model watches with quiet, focused attention, one hand raised near the point of fusion without touching it. One small crisp orange asterisk glows on a monitor screen in the background for scale. Shot on Arricam LT with Cooke S4/i primes, 35mm Kodak Vision3 500T, T2.8, shallow depth of field, halation on highlights, fine organic grain, lifted milky blacks, low contrast, no sharpening, no HDR.',
    coverCaption: 'Two shapes, one plinth, one center. As of this week, the asterisk stopped waiting for you to pick a side.',
    coverSource: 'AI-generation AIVFX (Seedream 5 Pro)',
    date: '2026-09-18',
    dateModified: '2026-09-18',
    readingTime: '8 min',
    related: ['claude-v-2026', 'agregatory-ai-servisov', 'ai-assistent-i-crm'],
    partner: 'syntx',
    facts: [
      { label: 'What merged, Sept 16-17, 2026', value: 'Cowork folded into the main Claude chat interface' },
      { label: 'Launched the same week', value: 'Claude Docs and Claude Slides' },
      { label: 'Who has it right now', value: 'Pro and Max only - Team and Free are still waiting', tone: 'no' },
      { label: 'One subscription instead of five', value: 'Check the catalog before you pay', href: 'partner:syntx' },
    ],
    excerpt:
      'For most of 2026, Claude Cowork and regular Claude chat were two separate things you had to choose between before you even started typing. On September 16, 2026, Anthropic announced that choice is gone: Cowork\'s abilities are now built into the same chat window everyone already uses, and the system decides on its own how much independence a task needs. Claude Docs and Claude Slides launched the same week. None of this is the same thing as Claude Code, the separate agentic tool built for developers - and the difference between the two is worth being precise about, especially if your team is non-technical.',
    content: [
      { type: 'p', text: 'This is fresh enough that most write-ups have not caught up with it yet: on September 16, 2026, Anthropic announced that Claude Cowork, its standalone "computer agent" product, is being folded into the regular Claude chat interface, and the change went live the next day, September 17. Two new products, Claude Docs and Claude Slides, launched in the same window. If you last looked at Claude a few weeks ago and remember Cowork as a separate thing you had to switch into, that is no longer how it works.' },
      { type: 'h2', text: 'What actually changed on September 16-17' },
      { type: 'p', text: 'Before this week, a Claude user picked one of two experiences up front: the regular chat, for back-and-forth conversation, or Cowork, a separate agentic mode built to work through multi-step tasks with less supervision. That upfront choice is what disappeared. Claude now decides for itself, task by task, how much independent action a given request needs - there is no separate product to open, no toggle to flip before you start.' },
      { type: 'p', text: 'Two new tools arrived alongside the merge. Claude Docs lets people co-write and edit documents with Claude in real time, with export to Google Docs and Microsoft Word. Claude Slides does the same for presentations, built and edited directly inside Claude, with export to PowerPoint and PDF. Claude Design, which used to be its own separate tool, is no longer a thing you open on the side - it is simply available inside any conversation now.' },
      { type: 'ul', items: [
        '**Access right now:** Pro and Max subscribers got the merged interface and the new document and slide tools immediately. Team and Free plans are promised the same eventually, but Anthropic has not given a date.',
        '**You are still in control of how far it goes.** By default, Claude asks for permission before it acts rather than running fully on its own - the merge changed which interface you see, not how much autonomy is granted without asking.',
        '**The Cowork name itself is in a strange spot.** It does not appear as a separate branded product anymore. Whether it survives internally as the name for a mode, or disappears entirely, has not been said publicly either way - so it is worth not repeating either claim as settled fact.',
      ] },
      { type: 'h2', text: 'What Cowork actually was, for anyone who missed it' },
      { type: 'p', text: 'Cowork launched on January 12, 2026 as a research preview - Anthropic\'s own description was a "computer agent" aimed squarely at non-technical people, not developers. The pitch was simple: point it at a folder on your computer, describe the task in plain language, and it works through it on its own - sorting downloads, turning a stack of receipts into a spreadsheet, pulling scattered notes into a finished report. No terminal, no code.' },
      { type: 'ul', items: [
        'It could connect to outside services: Google Drive, Gmail, and more than a dozen other business tools.',
        'It could run several parallel helper tasks at once to speed through multi-step work - the same underlying idea Claude Code uses with subagents, explained further down.',
        'Scheduled Tasks arrived on February 25, 2026, letting a task run again automatically on a set schedule instead of only once.',
        'It was never on the free tier: Max-only at launch, opened to Pro users starting in January.',
      ] },
      { type: 'p', text: 'All of that functionality is what just got absorbed into ordinary Claude chat. If you were already a Cowork user, nothing you could do before has disappeared - it is just not a separate destination anymore.' },
      { type: 'h2', text: 'A quick pointer on pricing and models' },
      { type: 'p', text: 'This piece is not the place to re-run Claude\'s plans or its four-model lineup - we already covered the tiers, what Fable 5.1, Opus 5, Sonnet 5 and Haiku 4.5 are each built for, and the September 14 change to Claude Code\'s usage limits in [our other Claude article](/blog/claude-v-2026/). The short version that matters here: Pro and above is where both the merged chat experience and Claude Code live, and none of the September 16-17 changes touched pricing or the model lineup itself.' },
      { type: 'h2', text: 'The other kind of "agent": Claude Code, in plain terms' },
      { type: 'p', text: 'Here is where it gets genuinely confusing, because Anthropic uses the word "agent" for two different products aimed at two different audiences. Everything above - the merged chat, Docs, Slides, the old Cowork - is built for people who are not programmers: business tasks involving files, spreadsheets, documents, and schedules. Claude Code is a separate tool entirely, built for developers, and it runs in a terminal - a plain text command window, the opposite of the point-and-click interface most business software uses.' },
      { type: 'p', text: 'You do not need to know how to code to understand what Claude Code actually does differently, though. In 2026 it grew into what is best described as a coordination layer for a small team of AI workers, not a single assistant answering one question at a time. A few pieces of that are worth naming plainly, because the terms sound technical but the ideas are not.' },
      { type: 'h3', text: 'Subagents: specialists that report back a summary, not their whole workday' },
      { type: 'p', text: 'A subagent is a separate, specialized AI worker that Claude Code can send off to handle one piece of a job on its own - its own instructions, sometimes its own choice of underlying model, its own access permissions. It works in isolation, and when it is done, it hands back a short result to the main conversation instead of the entire messy process it went through to get there. The practical effect is closer to delegating a task to a specialist colleague and getting a clean report back, rather than watching them work over their shoulder the whole time.' },
      { type: 'h3', text: 'MCP: a standard plug instead of custom wiring for every tool' },
      { type: 'p', text: 'MCP stands for Model Context Protocol, and the plain-language version is: it is a standard way to connect an AI tool to an outside system - a database, an internal company tool, a project tracker - without someone having to hand-write custom connecting code for every single one. For a business, this is the difference between "we would need a developer to build a custom integration" and "we add a few lines of configuration and the connection exists." Claude Code does not cap how many of these connections a single setup can have, and a feature called Tool Search keeps a large number of them from becoming expensive or slow to work with.' },
      { type: 'h3', text: 'Hooks, skills and plugins: the other layers doing quiet work' },
      { type: 'p', text: 'Beyond subagents and MCP, Claude Code also runs on memory, hooks, skills and plugins as separate layers that each shape what the model is allowed to see or do at a given moment - a hook, for instance, can automatically run a check or a formatting step after the model finishes a piece of work, without anyone asking it to each time. None of these layers are things a business owner needs to configure by hand; they are the machinery underneath why Claude Code behaves like a small organized team rather than one assistant doing everything sequentially.' },
      { type: 'p', text: 'The bigger shift is in how the work itself gets described. Agentic programming does not look like a back-and-forth chat where you approve each line. You describe the whole task once, and the agent writes the work, runs it, checks whether it worked, and fixes what did not - closer to briefing a contractor than to typing instructions one step at a time.' },
      { type: 'h2', text: 'So which Claude is "the agent" - and does it matter which one you use' },
      { type: 'p', text: 'Both, honestly, and that is the point worth being precise about. Cowork\'s abilities, now folded into ordinary Claude chat, are built for exactly the kind of work this studio\'s own clients deal with daily: sorting a folder of footage notes, turning a pile of invoices into a spreadsheet, drafting and formatting a document or a deck, running the same weekly task on a schedule. Claude Code is built for an entirely different job: working inside an actual codebase, wiring up subagents and MCP connections to internal systems, running in a terminal a business owner is unlikely to ever open personally.' },
      { type: 'p', text: 'These are not a beginner and an advanced version of the same agent. They are two separate products, aimed at two separate professions, built by the same company - which is exactly why the September merge is worth understanding correctly: it unified the non-technical side into one interface, and left the developer side, Claude Code, as its own distinct tool, unaffected by the merge in any functional way.' },
      { type: 'p', text: 'That distinction is also why this news is directly relevant to a studio built around AI automation for business rather than AI programming for its own sake: the part of Claude that just changed is the part aimed at exactly this kind of client - people who need a document sorted, a schedule automated, or a spreadsheet pulled together, without touching a terminal. The part built for wiring subagents and MCP connections into a real system is a different conversation entirely, and usually a one-time build rather than something a client operates day to day.' },
      { type: 'p', text: 'We route AI subscriptions for client work through [SYNTX](partner:syntx) rather than juggling several separate billing accounts for the different tools a project ends up needing. Check the catalog before you pay, since what is listed there shifts over time and we are not claiming Claude specifically sits in it today.' },
      { type: 'partner', id: 'syntx' },
      { type: 'h2', text: 'Frequently asked questions' },
      { type: 'h3', text: 'What exactly merged on September 16-17, 2026?' },
      { type: 'p', text: 'Claude Cowork, Anthropic\'s standalone agentic product for non-technical, computer-based tasks, was folded into the regular Claude chat interface. Anthropic announced it on September 16, and the change went live the next day. Users no longer choose between "chat" and "Cowork" up front - Claude now decides, task by task, how independently to act.' },
      { type: 'h3', text: 'What are Claude Docs and Claude Slides?' },
      { type: 'p', text: 'Two new products launched the same week as the merge. Claude Docs is real-time collaborative document editing with Claude, exporting to Google Docs or Microsoft Word. Claude Slides builds and edits presentations directly inside Claude, exporting to PowerPoint or PDF. Claude Design, previously a separate tool, is now built into any conversation rather than living on its own.' },
      { type: 'h3', text: 'Do I still need to think about "Cowork" as a separate thing?' },
      { type: 'p', text: 'No, functionally. Its abilities now live inside ordinary Claude chat rather than behind a separate product choice. Whether the name "Cowork" survives as an internal label for a mode, or disappears from use entirely, has not been confirmed publicly either way, so it is worth not assuming either answer.' },
      { type: 'h3', text: 'What is Claude Code, in plain terms, if I am not a developer?' },
      { type: 'p', text: 'It is Anthropic\'s separate tool for programmers, built to work inside an actual codebase from a terminal rather than a chat window. It can send parts of a task to specialized helper workers called subagents, connect to outside systems like databases through a standard called MCP instead of custom-built connections, and carry out a whole task end to end - writing, running and fixing its own work - rather than answering one instruction at a time. None of this is the product this merge changed.' },
      { type: 'h3', text: 'What are subagents and MCP, without the jargon?' },
      { type: 'p', text: 'A subagent is a specialized AI worker Claude Code can hand off one piece of a task to, which works on its own and reports back a short result rather than its whole process. MCP is a standard way to plug an AI tool into an outside system - a database, an internal business tool - without someone writing custom connecting code for each one. Both exist specifically inside Claude Code, not inside the merged chat interface.' },
      { type: 'h3', text: 'Should a non-technical business use the merged Claude chat, or Claude Code?' },
      { type: 'p', text: 'For file sorting, document drafting, spreadsheets, presentations and scheduled recurring tasks, the merged Claude chat (what used to be Cowork plus regular chat) is the right tool, and it needs no terminal or programming knowledge. Claude Code is built for a different job: wiring an AI into an actual codebase or an internal system through subagents and MCP connections, which is usually a one-time technical build rather than something run day to day by non-technical staff.' },
      { type: 'cta' },
    ],
  },
];

export default PART_12;
