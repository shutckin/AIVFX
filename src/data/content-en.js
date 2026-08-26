// AIVFX content data — ENGLISH versions (mirror of content.js).
// Non-text fields (ids, thumbs, numbers) kept identical for swapping by locale.

export const PROJECTS_EN = [
  { id: 1, title: "Porsche 911 Turbo S", cat: "Automotive", tech: "AI", desc: "Fully AI-generated commercial for a premium car with photorealistic effects.", thumb: "/thumbnails/porsche.jpg", duration: "0:35", views: "5.8M", time: "8 days", year: "2026" },
  { id: 11, title: "NL Auto Program", cat: "Automotive", tech: "AI+VFX", desc: "Combined AI + VFX project with scene generation and post-production.", thumb: "/thumbnails/NL2.jpg", duration: "0:30", views: "820K", time: "7 days", year: "2026" },
  { id: 2, title: "Rolex — Booth", cat: "Products", tech: "VFX", desc: "VFX clip of premium watches for a trade-show display.", thumb: "/thumbnails/rolex.jpg", duration: "0:25", views: "340K", time: "10 days", year: "2026" },
  { id: 3, title: "Dyson Supersonic", cat: "Products", tech: "VFX", desc: "Innovative appliance showcase with AI visualization.", thumb: "/thumbnails/dyson.jpg", duration: "0:45", views: "1.2M", time: "6 days", year: "2025" },
  { id: 4, title: "House Visualization", cat: "Architecture", tech: "AI", desc: "Modern architectural presentation of a house with AI-generated surroundings.", thumb: "/thumbnails/house.jpg", duration: "0:50", views: "150K", time: "24 hours", year: "2025" },
  { id: 5, title: "YallaMarket", cat: "Products", tech: "VFX", desc: "VFX integration of 3D elements and effects for a marketplace ad.", thumb: "/thumbnails/museum.jpg", duration: "0:20", views: "400K", time: "6 days", year: "2025" },
  { id: 6, title: "Deepfake Demo", cat: "Social", tech: "AI", desc: "A showcase of AI creating realistic digital characters.", thumb: "/thumbnails/deepfake.jpg", duration: "1:30", views: "2.4M", time: "4 days", year: "2026" },
  { id: 7, title: "Runway Short Film", cat: "Social", tech: "AI", desc: "An environmental film about ocean pollution, created with AI.", thumb: "/thumbnails/Runway.jpg", duration: "2:45", views: "120K", time: "72 hours", year: "2025" },
  { id: 8, title: "Danube Properties", cat: "Architecture", tech: "VFX", desc: "VFX integration of architectural elements for a residential complex.", thumb: "/thumbnails/danube.jpg", duration: "0:40", views: "90K", time: "7 days", year: "2025" },
  { id: 9, title: "Air Purifier", cat: "Products", tech: "VFX", desc: "VFX integration of 3D models with realistic compositing.", thumb: "/thumbnails/synr.jpg", duration: "0:20", views: "700K", time: "4 days", year: "2026" },
  { id: 10, title: "Sacr — Fashion Reel", cat: "Products", tech: "AI", desc: "A stylish reel for a fashion brand with AI models and virtual clothing.", thumb: "/thumbnails/sacr.jpg", duration: "0:15", views: "400K", time: "48 hours", year: "2026" },
  { id: 12, title: "Real Estate — render→video", cat: "Architecture", tech: "AI", desc: "AI generation of architectural video from static renders.", thumb: "/thumbnails/недвижка.jpg", duration: "2:30", views: "80K", time: "24 hours", year: "2025" }
];

export const CATEGORIES_EN = ["All", "Automotive", "Products", "Social", "Architecture"];

// Соответствие RU-категории → EN (для фильтра портфолио)
export const CATEGORY_MAP = {
  "Все": "All", "Автомобили": "Automotive", "Продукты": "Products",
  "Социальное": "Social", "Архитектура": "Architecture"
};

export const SERVICES_EN = [
  { num: "S/01", glyph: "∆", title: "AI Video Generation", desc: "Full-cycle ad production from prompts and references. From idea to a 4K final cut." },
  { num: "S/02", glyph: "○", title: "VFX & Compositing", desc: "Hollywood-grade visual effects, 3D integration and post-production." },
  { num: "S/03", glyph: "◇", title: "Hybrid AI + VFX", desc: "A blend of algorithms and hands-on artistry — the best of both worlds." },
  { num: "S/04", glyph: "⌒", title: "Format Adaptation", desc: "One video, ten platforms. Reels, TikTok, YouTube, broadcast runtimes." },
  { num: "S/05", glyph: "∇", title: "Product Demos", desc: "Photorealistic product videos without a film crew or logistics." },
  { num: "S/06", glyph: "✕", title: "Virtual Characters", desc: "Digital actors, deepfake tech and facial animation at studio level." }
];


export const STATS_EN = [
  { v: "50", u: "+", l: "Projects delivered" },
  { v: "72", u: "h", l: "Average turnaround" },
  { v: "70", u: "%", l: "Budget saved" },
  { v: "4K", u: "+", l: "Video quality" }
];


export const TESTIMONIALS_EN = [
  {
    id: 1, name: "Alexey Morozov", role: "Head of Digital Projects, Audi Russia",
    text: "The team genuinely understood our product — in 5 days they delivered the hero video and four adaptations. Every format felt alive: it's clear they didn't just cut footage, they invested an idea and emotion.",
    project: "Hero video + 4 adaptations", featured: false
  },
  {
    id: 2, name: "Ksenia Sheina", role: "Creative Producer, NL International",
    text: "We work with this studio on an ongoing basis. Always comfortable communication, perfectly structured processes and top quality output. The AI videos are a special joy — the format saves incredible time and budget.",
    project: "Ongoing partnership", featured: true
  }
];

export const CLIENTS_EN = ["AUDI", "CINQUE", "PORSCHE", "DYSON", "DEHANCER", "DANUBE", "NL INT.", "WHITEWILL"];

export const COMPARE_OLD_EN = ["Weeks of planning", "Expensive equipment", "A large film crew", "Dependent on weather / location", "Months of post-production"];
export const COMPARE_NEW_EN = ["Hours from idea to result", "A computer and a creative approach", "A team of 2–3 specialists", "Any location and conditions", "Instant revisions"];

export const BUDGETS_EN = ["< $1,000", "$1,000–3,000", "$3,000–10,000", "> $10,000", "Let's discuss"];

