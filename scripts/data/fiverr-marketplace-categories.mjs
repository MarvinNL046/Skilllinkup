const names = (en, nl = en) => ({ en, nl });

function category(slug, en, options = {}) {
  return {
    slug,
    names: names(en, options.nl),
    sortOrder: options.sortOrder,
    serviceType: options.serviceType,
    icon: options.icon,
    description: options.description
      ? names(options.description, options.descriptionNl || options.description)
      : undefined,
    children: options.children ?? [],
  };
}

const categoryDefinitions = [
  category("development-it", "Development & IT", {
    nl: "Development & IT",
    serviceType: "digital",
    sortOrder: 1,
    children: [
      category("web-development", "Web Development", { nl: "Webdevelopment", sortOrder: 1 }),
      category("mobile-app-development", "Mobile App Development", { nl: "Mobiele app-ontwikkeling", sortOrder: 2 }),
      category("e-commerce-development", "E-Commerce Development", { nl: "E-commerceontwikkeling", sortOrder: 3 }),
      category("wordpress", "WordPress", { nl: "WordPress", sortOrder: 4 }),
      category("software-development", "Software Development", { nl: "Softwareontwikkeling", sortOrder: 5 }),
      category("qa-testing", "QA & Testing", { nl: "QA & testing", sortOrder: 6 }),
      category("devops-cloud", "DevOps & Cloud", { nl: "DevOps & cloud", sortOrder: 7 }),
      category("ai-machine-learning", "AI & Machine Learning", { nl: "AI & machine learning", sortOrder: 8 }),
      category("cybersecurity", "Cybersecurity", { nl: "Cybersecurity", sortOrder: 9 }),
      category("game-development", "Game Development", { nl: "Gameontwikkeling", sortOrder: 10 }),
      category("database-administration", "Database Administration", { nl: "Databasebeheer", sortOrder: 11 }),
      category("blockchain-cryptocurrency", "Blockchain & Cryptocurrency", { nl: "Blockchain & cryptocurrency", sortOrder: 12 }),
    ],
  }),
  category("design-creative", "Graphics & Design", {
    nl: "Design & creatie",
    serviceType: "digital",
    sortOrder: 2,
    children: [
      category("logo-design", "Logo Design", { sortOrder: 1 }),
      category("brand-identity", "Brand Style Guides", { nl: "Merkidentiteit", sortOrder: 2 }),
      category("game-art", "Game Art", {
        sortOrder: 3,
        children: [
          category("character-design", "Character Design", { sortOrder: 1 }),
          category("props-objects", "Props & Objects", { sortOrder: 2 }),
          category("backgrounds-environments", "Backgrounds & Environments", { sortOrder: 3 }),
          category("game-ui-ux", "UI & UX", { sortOrder: 4 }),
        ],
      }),
      category("graphics-for-streamers", "Graphics for Streamers", { sortOrder: 4 }),
      category("business-cards-stationery", "Business Cards & Stationery", { sortOrder: 5 }),
      category("website-design", "Website Design", {
        nl: "Websiteontwerp",
        sortOrder: 6,
        children: [
          category("website-ui-ux-design", "Website UI/UX Design", { sortOrder: 1 }),
          category("website-builders-design", "Website Builders Design", { sortOrder: 2 }),
        ],
      }),
      category("app-design", "App Design", { nl: "App-ontwerp", sortOrder: 7 }),
      category("ux-design", "UX Design", { nl: "UX-design", sortOrder: 8 }),
      category("landing-page-design", "Landing Page Design", { sortOrder: 9 }),
      category("resume-design", "Resume Design", { sortOrder: 10 }),
      category("illustration", "Illustration", {
        nl: "Illustratie",
        sortOrder: 11,
        children: [
          category("childrens-book-illustration", "Children's Book Illustration", { sortOrder: 1 }),
          category("ai-avatar-design", "AI Avatar Design", { sortOrder: 2 }),
        ],
      }),
      category("ai-artists", "AI Artists", {
        sortOrder: 12,
        children: [
          category("image-generation", "Image Generation", { sortOrder: 1 }),
          category("custom-image-prompts", "Custom Image Prompts", { sortOrder: 2 }),
          category("comfyui-workflow-creation", "ComfyUI Workflow Creation", { sortOrder: 3 }),
        ],
      }),
      category("nft-art", "NFT Art", { sortOrder: 13 }),
      category("pattern-design", "Pattern Design", { sortOrder: 14 }),
      category("fonts-typography", "Fonts & Typography", {
        sortOrder: 15,
        children: [
          category("font-design", "Font Design", { sortOrder: 1 }),
          category("typography", "Typography", { sortOrder: 2 }),
          category("hand-lettering", "Hand Lettering", { sortOrder: 3 }),
          category("calligraphy", "Calligraphy", { sortOrder: 4 }),
        ],
      }),
      category("poster-design", "Poster Design", { sortOrder: 16 }),
      category("brochure-design", "Brochure Design", { sortOrder: 17 }),
      category("flyer-design", "Flyer Design", { sortOrder: 18 }),
      category("book-design", "Book Design", {
        sortOrder: 19,
        children: [
          category("book-layout-design-typesetting", "Book Layout Design & Typesetting", { sortOrder: 1 }),
          category("book-cover-design", "Book Cover Design", { sortOrder: 2 }),
        ],
      }),
      category("album-cover-design", "Album Cover Design", { sortOrder: 20 }),
      category("podcast-cover-art", "Podcast Cover Art", { sortOrder: 21 }),
      category("packaging-design", "Packaging & Label Design", {
        nl: "Verpakkingsontwerp",
        sortOrder: 22,
        children: [
          category("packaging-only-design", "Packaging Design", { sortOrder: 1 }),
          category("label-design", "Label Design", { sortOrder: 2 }),
          category("dieline-design", "Dieline Design", { sortOrder: 3 }),
        ],
      }),
      category("comic-illustration", "Comic Illustration", {
        sortOrder: 23,
        children: [
          category("comic-book-illustration", "Comic Book Illustration", { sortOrder: 1 }),
          category("comic-panel-strip", "Comic Panel & Strip", { sortOrder: 2 }),
        ],
      }),
      category("storyboards", "Storyboards", { sortOrder: 24 }),
      category("art-direction", "Art Direction", { sortOrder: 25 }),
      category("social-media-design", "Social Media Design", {
        nl: "Social media-design",
        sortOrder: 26,
        children: [
          category("headers-covers", "Headers & Covers", { sortOrder: 1 }),
          category("social-posts-banners", "Social Posts & Banners", { sortOrder: 2 }),
          category("thumbnails-design", "Thumbnails Design", { sortOrder: 3 }),
          category("ar-filters-lenses", "AR Filters & Lenses", { sortOrder: 4 }),
        ],
      }),
      category("catalog-design", "Catalog Design", { sortOrder: 27 }),
      category("menu-design", "Menu Design", { sortOrder: 28 }),
      category("invitation-design", "Invitation Design", { sortOrder: 29 }),
      category("portraits-caricatures", "Portraits & Caricatures", { sortOrder: 30 }),
      category("cartoon-illustration", "Cartoon Illustration", { sortOrder: 31 }),
      category("tattoo-design", "Tattoo Design", { sortOrder: 32 }),
      category("signage-design", "Signage Design", { sortOrder: 33 }),
      category("web-banners", "Web Banners", { sortOrder: 34 }),
      category("image-editing", "Image Editing", {
        sortOrder: 35,
        children: [
          category("product-image-editing", "Product Image Editing", { sortOrder: 1 }),
          category("photo-manipulation", "Photo Manipulation", { sortOrder: 2 }),
          category("portraits-retouching", "Portraits Retouching", { sortOrder: 3 }),
          category("photo-restoration", "Photo Restoration", { sortOrder: 4 }),
          category("mockups", "Mockups", { sortOrder: 5 }),
        ],
      }),
      category("ai-image-editing", "AI Image Editing", { sortOrder: 36 }),
      category("architecture-interior-design", "Architecture & Interior Design", {
        sortOrder: 37,
        children: [
          category("mood-boards", "Mood Boards", { sortOrder: 1 }),
          category("architectural-graphics", "Architectural Graphics", { sortOrder: 2 }),
          category("virtual-staging", "Virtual Staging", { sortOrder: 3 }),
          category("architectural-planning", "Architectural Planning", { sortOrder: 4 }),
          category("interior-design-services", "Interior Design", { sortOrder: 5 }),
          category("architectural-3d-modeling-rendering", "3D Modeling & Rendering", { sortOrder: 6 }),
          category("2d-drawings-floor-plans", "2D Drawings & Floor Plans", { sortOrder: 7 }),
        ],
      }),
      category("landscape-design", "Landscape Design", {
        nl: "Landschapsontwerp",
        sortOrder: 38,
        children: [
          category("landscape-planning-design", "Planning & Design", { sortOrder: 1 }),
          category("landscape-3d-modeling-rendering", "3D Modeling & Rendering", { sortOrder: 2 }),
          category("2d-drawings-site-plans", "2D Drawings & Site Plans", { sortOrder: 3 }),
        ],
      }),
      category("building-engineering", "Building Engineering", {
        sortOrder: 39,
        children: [
          category("hvac", "HVAC", { sortOrder: 1 }),
          category("electrical-engineering", "Electrical Engineering", { sortOrder: 2 }),
          category("plumbing-drainage", "Plumbing & Drainage", { sortOrder: 3 }),
          category("civil-structural", "Civil & Structural", { sortOrder: 4 }),
          category("material-takeoff-cost-estimation", "Material Takeoff & Cost Estimation", { sortOrder: 5 }),
          category("solar-pv-system-design", "Solar PV System Design", { sortOrder: 6 }),
          category("fire-protection-system-design", "Fire Protection System Design", { sortOrder: 7 }),
        ],
      }),
      category("building-information-modeling", "Building Information Modeling", {
        sortOrder: 40,
        children: [
          category("bim-4d-construction-simulation", "BIM 4D Construction Simulation", { sortOrder: 1 }),
          category("bim-online-training-implementation", "BIM Online Training & Implementation", { sortOrder: 2 }),
          category("bim-family-creation", "BIM Family Creation", { sortOrder: 3 }),
          category("bim-coordination-clash-detection", "BIM Coordination & Clash Detection", { sortOrder: 4 }),
          category("bim-3d-modeling", "BIM 3D Modeling", { sortOrder: 5 }),
        ],
      }),
      category("lighting-design", "Lighting Design", { sortOrder: 41 }),
      category("character-modeling", "Character Modeling", { sortOrder: 42 }),
      category("industrial-product-design", "Industrial & Product Design", {
        sortOrder: 43,
        children: [
          category("concept-development", "Concept Development", { sortOrder: 1 }),
          category("product-3d-modeling-rendering", "3D Modeling & Rendering", { sortOrder: 2 }),
          category("rapid-prototyping", "Rapid Prototyping", { sortOrder: 3 }),
          category("design-for-manufacturing", "Design for Manufacturing", { sortOrder: 4 }),
          category("technical-drawing", "Technical Drawing", { sortOrder: 5 }),
          category("full-design-process", "Full Design Process", { sortOrder: 6 }),
        ],
      }),
      category("trade-booth-design", "Trade Booth Design", { sortOrder: 44 }),
      category("t-shirts-merchandise", "T-Shirts & Merchandise", { sortOrder: 45 }),
      category("fashion-design", "Fashion Design", {
        sortOrder: 46,
        children: [
          category("technical-drawing-tech-pack", "Technical Drawing & Tech Pack", { sortOrder: 1 }),
          category("pattern-making", "Pattern Making", { sortOrder: 2 }),
          category("fashion-illustration", "Fashion Illustration", { sortOrder: 3 }),
          category("3d-garment-design", "3D Garment Design", { sortOrder: 4 }),
          category("fashion-full-design-process", "Full Design Process", { sortOrder: 5 }),
        ],
      }),
      category("jewelry-design", "Jewelry Design", {
        sortOrder: 47,
        children: [
          category("jewelry-3d-modeling-rendering", "3D Modeling & Rendering", { sortOrder: 1 }),
          category("jewelry-concept-design-sketching", "Concept Design & Sketching", { sortOrder: 2 }),
        ],
      }),
      category("presentation-design", "Presentation Design", { nl: "Presentatieontwerp", sortOrder: 48 }),
      category("email-design", "Email Design", { sortOrder: 49 }),
      category("icon-design", "Icon Design", { sortOrder: 50 }),
      category("infographic-design", "Infographic Design", { nl: "Infographic-ontwerp", sortOrder: 51 }),
      category("car-wraps", "Car Wraps", { sortOrder: 52 }),
      category("vector-tracing", "Vector Tracing", { sortOrder: 53 }),
      category("nsfw-art", "NSFW Art", { sortOrder: 54 }),
      category("design-consultation", "Design Consultation", {
        sortOrder: 55,
        children: [
          category("design-review-consultation", "Design Review & Consultation", { sortOrder: 1 }),
          category("design-mentorship", "Design Mentorship", { sortOrder: 2 }),
          category("design-lessons", "Design Lessons", { sortOrder: 3 }),
        ],
      }),
      category("other-design", "Other", { sortOrder: 56 }),
    ],
  }),
  category("digital-marketing", "Digital Marketing", {
    nl: "Digitale marketing",
    serviceType: "digital",
    sortOrder: 3,
    children: [
      category("seo", "SEO", { nl: "SEO", sortOrder: 1 }),
      category("social-media-marketing", "Social Media Marketing", { nl: "Social media-marketing", sortOrder: 2 }),
      category("content-marketing", "Content Marketing", { nl: "Contentmarketing", sortOrder: 3 }),
      category("email-marketing", "Email Marketing", { nl: "E-mailmarketing", sortOrder: 4 }),
      category("ppc-advertising", "PPC Advertising", { nl: "PPC-advertising", sortOrder: 5 }),
      category("influencer-marketing", "Influencer Marketing", { nl: "Influencer-marketing", sortOrder: 6 }),
      category("marketing-strategy", "Marketing Strategy", { nl: "Marketingstrategie", sortOrder: 7 }),
      category("analytics-tracking", "Analytics & Tracking", { nl: "Analytics & tracking", sortOrder: 8 }),
      category("community-management", "Community Management", { nl: "Community management", sortOrder: 9 }),
    ],
  }),
  category("writing-translation", "Writing & Translation", {
    nl: "Schrijven & vertalen",
    serviceType: "digital",
    sortOrder: 4,
    children: [
      category("content-writing", "Articles & Blog Posts", {
        sortOrder: 1,
        children: [
          category("seo-writing", "SEO Writing", { sortOrder: 1 }),
          category("promotional-articles", "Promotional Articles", { sortOrder: 2 }),
          category("lifestyle-blogs", "Lifestyle Blogs", { sortOrder: 3 }),
          category("professional-industry-articles", "Professional Industry Articles", { sortOrder: 4 }),
          category("informative-educational-articles", "Informative & Educational Articles", { sortOrder: 5 }),
          category("bulk-articles", "Bulk Articles", { sortOrder: 6 }),
        ],
      }),
      category("proofreading-editing", "Proofreading & Editing", {
        nl: "Proeflezen & redigeren",
        sortOrder: 2,
        children: [
          category("ai-content-editing-writing", "AI Content Editing", { sortOrder: 1 }),
          category("citation", "Citation", { sortOrder: 2 }),
          category("proofreading", "Proofreading", { sortOrder: 3 }),
          category("copy-editing", "Copy Editing", { sortOrder: 4 }),
          category("review-rewrite", "Review & Rewrite", { sortOrder: 5 }),
          category("formatting", "Formatting", { sortOrder: 6 }),
        ],
      }),
      category("translation", "Translation", { nl: "Vertaling", sortOrder: 3 }),
      category("website-content", "Website Content", { sortOrder: 4 }),
      category("product-descriptions", "Product Descriptions", { sortOrder: 5 }),
      category("book-ebook-writing", "Book & eBook Writing", {
        sortOrder: 6,
        children: [
          category("kindle-niche-research", "Kindle Niche Research", { sortOrder: 1 }),
          category("book-indexing", "Book Indexing", { sortOrder: 2 }),
          category("short-stories", "Short Stories", { sortOrder: 3 }),
          category("book-proposals", "Book Proposals", { sortOrder: 4 }),
          category("book-blurbs", "Book Blurbs", { sortOrder: 5 }),
          category("book-ghostwriting", "Ghostwriting", { sortOrder: 6 }),
        ],
      }),
      category("book-editing", "Book Editing", {
        sortOrder: 7,
        children: [
          category("developmental-editing", "Developmental Editing", { sortOrder: 1 }),
          category("line-editing", "Line Editing", { sortOrder: 2 }),
          category("book-copy-editing", "Copy Editing", { sortOrder: 3 }),
        ],
      }),
      category("resume-cover-letter", "Resume Writing", { nl: "Cv & motivatiebrief", sortOrder: 8 }),
      category("brand-voice-tone", "Brand Voice & Tone", { sortOrder: 9 }),
      category("ux-writing", "UX Writing", { sortOrder: 10 }),
      category("email-copy", "Email Copy", { sortOrder: 11 }),
      category("technical-writing", "Technical Writing", { nl: "Technisch schrijven", sortOrder: 12 }),
      category("custom-writing-prompts", "Custom Writing Prompts", {
        sortOrder: 13,
        children: [
          category("technical-writing-prompts", "Technical Writing Prompts", { sortOrder: 1 }),
          category("copywriting-prompts", "Copywriting Prompts", { sortOrder: 2 }),
          category("creative-writing-prompts", "Creative Writing Prompts", { sortOrder: 3 }),
          category("blogging-content-prompts", "Blogging & Content Prompts", { sortOrder: 4 }),
        ],
      }),
      category("content-strategy", "Content Strategy", { sortOrder: 14 }),
      category("localization", "Localization", { sortOrder: 15 }),
      category("white-papers", "White Papers", { sortOrder: 16 }),
      category("sales-copy", "Sales Copy", { sortOrder: 17 }),
      category("social-media-copywriting", "Social Media Copywriting", {
        sortOrder: 18,
        children: [
          category("social-media-posts-captions", "Social Media Posts & Captions", { sortOrder: 1 }),
          category("social-media-video-scripts", "Social Media Video Scripts", { sortOrder: 2 }),
          category("social-media-long-posts-articles", "Social Media Long Posts & Articles", { sortOrder: 3 }),
          category("social-media-bios", "Social Media Bios", { sortOrder: 4 }),
        ],
      }),
      category("podcast-writing", "Podcast Writing", {
        sortOrder: 19,
        children: [
          category("podcast-content", "Podcast Content", { sortOrder: 1 }),
          category("podcast-show-notes", "Podcast Show Notes", { sortOrder: 2 }),
        ],
      }),
      category("ad-copy", "Ad Copy", { sortOrder: 20 }),
      category("cover-letters", "Cover Letters", { sortOrder: 21 }),
      category("press-releases", "Press Releases", { sortOrder: 22 }),
      category("case-studies", "Case Studies", { sortOrder: 23 }),
      category("linkedin-profiles", "LinkedIn Profiles", { sortOrder: 24 }),
      category("job-descriptions", "Job Descriptions", { sortOrder: 25 }),
      category("creative-writing", "Creative Writing", {
        sortOrder: 26,
        children: [
          category("game-writing", "Game Writing", { sortOrder: 1 }),
          category("poetry", "Poetry", { sortOrder: 2 }),
          category("song-lyrics", "Song Lyrics", { sortOrder: 3 }),
          category("letters", "Letters", { sortOrder: 4 }),
        ],
      }),
      category("beta-reading", "Beta Reading", { sortOrder: 27 }),
      category("scriptwriting", "Scriptwriting", {
        nl: "Scriptschrijven",
        sortOrder: 28,
        children: [
          category("other-scriptwriting", "Other Scriptwriting", { sortOrder: 1 }),
          category("script-consultation", "Consultation", { sortOrder: 2 }),
          category("webinars", "Webinars", { sortOrder: 3 }),
          category("cold-calls", "Cold Calls", { sortOrder: 4 }),
          category("audio-ads", "Audio Ads", { sortOrder: 5 }),
          category("script-coverage", "Script Coverage", { sortOrder: 6 }),
          category("film-tv-screenplays", "Film & TV Screenplays", { sortOrder: 7 }),
          category("chatbot-conversation-scripts", "Chatbot Conversation Scripts", { sortOrder: 8 }),
          category("video-scripts", "Video Scripts", { sortOrder: 9 }),
        ],
      }),
      category("business-names-slogans", "Business Names & Slogans", { sortOrder: 29 }),
      category("elearning-content-development", "eLearning Content Development", { sortOrder: 30 }),
      category("speechwriting", "Speechwriting", {
        sortOrder: 31,
        children: [
          category("motivational-speeches", "Motivational Speeches", { sortOrder: 1 }),
          category("academic-speeches", "Academic Speeches", { sortOrder: 2 }),
          category("political-speeches", "Political Speeches", { sortOrder: 3 }),
          category("business-speeches", "Business Speeches", { sortOrder: 4 }),
          category("event-speeches", "Event Speeches", { sortOrder: 5 }),
        ],
      }),
      category("grant-writing", "Grant Writing", {
        nl: "Subsidieaanvragen schrijven",
        sortOrder: 32,
        children: [
          category("grant-research", "Grant Research", { sortOrder: 1 }),
          category("grant-proposals", "Grant Proposals", { sortOrder: 2 }),
        ],
      }),
      category("transcription", "Transcription", { sortOrder: 33 }),
      category("research-summaries", "Research & Summaries", { sortOrder: 34 }),
      category("other-writing", "Other", { sortOrder: 35 }),
      category("writing-advice", "Writing Advice", {
        sortOrder: 36,
        children: [
          category("writing-mentorship", "Writing Mentorship", { sortOrder: 1 }),
          category("writing-lessons", "Writing Lessons", { sortOrder: 2 }),
        ],
      }),
      category("interpretation", "Interpretation", { sortOrder: 37 }),
      category("handwriting", "Handwriting", {
        sortOrder: 38,
        children: [
          category("letters-notes", "Letters & Notes", { sortOrder: 1 }),
          category("invitations-cards", "Invitations & Cards", { sortOrder: 2 }),
          category("personalized-handwriting", "Personalized Handwriting", { sortOrder: 3 }),
          category("academic-handwriting", "Academic Handwriting", { sortOrder: 4 }),
        ],
      }),
      category("academic-support", "Academic Support", {
        sortOrder: 39,
        children: [
          category("academic-writing-revision", "Academic Writing Revision", { sortOrder: 1 }),
          category("essay-structuring-formatting", "Essay Structuring & Formatting", { sortOrder: 2 }),
          category("research-source-structuring", "Research Source Structuring", { sortOrder: 3 }),
          category("academic-writing-guidance", "Academic Writing Guidance", { sortOrder: 4 }),
        ],
      }),
    ],
  }),
  category("music-audio", "Music & Audio", {
    nl: "Muziek & audio",
    serviceType: "digital",
    sortOrder: 5,
    children: [
      category("voice-over", "Voice Over", { nl: "Voice-over", sortOrder: 1 }),
      category("music-production", "Music Production", { nl: "Muziekproductie", sortOrder: 2 }),
      category("mixing-mastering", "Mixing & Mastering", { nl: "Mixing & mastering", sortOrder: 3 }),
      category("podcast-production", "Podcast Production", { nl: "Podcastproductie", sortOrder: 4 }),
      category("sound-effects", "Sound Effects", { nl: "Geluidseffecten", sortOrder: 5 }),
      category("jingles-intros", "Jingles & Intros", { nl: "Jingles & intro's", sortOrder: 6 }),
      category("audio-editing", "Audio Editing", { nl: "Audiobewerking", sortOrder: 7 }),
      category("songwriting", "Songwriting", { nl: "Songwriting", sortOrder: 8 }),
    ],
  }),
  category("video-animation", "Video & Animation", {
    nl: "Video & animatie",
    serviceType: "digital",
    sortOrder: 6,
    children: [
      category("animated-explainers", "Animated Explainers", {
        sortOrder: 1,
        children: [
          category("2d-animated-explainers", "2D Animated Explainers", { sortOrder: 1 }),
          category("3d-animated-explainers", "3D Animated Explainers", { sortOrder: 2 }),
          category("isometric-explainers", "Isometric Explainers", { sortOrder: 3 }),
          category("whiteboard-animation", "Whiteboard Animation", { sortOrder: 4 }),
        ],
      }),
      category("video-editing", "Video Editing", { nl: "Videobewerking", sortOrder: 2 }),
      category("video-ads-commercials", "Video Ads & Commercials", { sortOrder: 3 }),
      category("animated-gifs", "Animated GIFs", { sortOrder: 4 }),
      category("logo-animation", "Logo Animation", { sortOrder: 5 }),
      category("ugc-videos", "UGC Videos", {
        sortOrder: 6,
        children: [
          category("human-ugc", "Human UGC", { sortOrder: 1 }),
          category("ai-ugc", "AI UGC", { sortOrder: 2 }),
        ],
      }),
      category("intro-outro-videos", "Intro & Outro Videos", { sortOrder: 7 }),
      category("character-animation", "Character Animation", { sortOrder: 8 }),
      category("3d-product-animation", "3D Product Animation", { sortOrder: 9 }),
      category("social-media-videos", "Social Media Videos", { sortOrder: 10 }),
      category("music-videos", "Music Videos", {
        sortOrder: 11,
        children: [
          category("lyric-videos", "Lyric Videos", { sortOrder: 1 }),
          category("music-visualization", "Music Visualization", { sortOrder: 2 }),
          category("dance-videos", "Dance Videos", { sortOrder: 3 }),
          category("narrative-based-videos", "Narrative-Based Videos", { sortOrder: 4 }),
          category("performance-videos", "Performance Videos", { sortOrder: 5 }),
          category("conceptual-videos", "Conceptual Videos", { sortOrder: 6 }),
          category("anime-music-videos", "Anime Music Videos", { sortOrder: 7 }),
          category("spotify-canvas", "Spotify Canvas", { sortOrder: 8 }),
        ],
      }),
      category("animation-for-kids", "Animation for Kids", { sortOrder: 12 }),
      category("video-art-creation", "Video Art Creation", {
        sortOrder: 13,
        children: [
          category("experimental-video-art", "Experimental Video Art", { sortOrder: 1 }),
          category("ai-video", "AI Video", { sortOrder: 2 }),
          category("image-animation", "Image Animation", { sortOrder: 3 }),
          category("video-installations", "Video Installations", { sortOrder: 4 }),
        ],
      }),
      category("ai-videography", "AI Videography", { sortOrder: 14 }),
      category("text-animation", "Text Animation", { sortOrder: 15 }),
      category("animation-for-streamers", "Animation for Streamers", { sortOrder: 16 }),
      category("filmed-video-production", "Filmed Video Production", { sortOrder: 17 }),
      category("live-action-explainers", "Live Action Explainers", { sortOrder: 18 }),
      category("videographers", "Videographers", { sortOrder: 19 }),
      category("drone-videography", "Drone Videography", { sortOrder: 20 }),
      category("e-commerce-product-videos", "E-Commerce Product Videos", { sortOrder: 21 }),
      category("spokespersons-videos", "Spokespersons Videos", { sortOrder: 22 }),
      category("subtitles-captions", "Subtitles & Captions", {
        nl: "Ondertitels & captions",
        sortOrder: 23,
        children: [
          category("subtitles-only", "Subtitles", { sortOrder: 1 }),
          category("social-media-captions", "Social Media Captions", { sortOrder: 2 }),
        ],
      }),
      category("nft-animation", "NFT Animation", { sortOrder: 24 }),
      category("visual-effects", "Visual Effects", {
        nl: "Visuele effecten",
        sortOrder: 25,
        children: [
          category("rotoscoping-chroma-keying", "Rotoscoping & Chroma Keying", { sortOrder: 1 }),
          category("color-grading", "Color Grading", { sortOrder: 2 }),
          category("match-moving", "Match Moving", { sortOrder: 3 }),
          category("compositing", "Compositing", { sortOrder: 4 }),
          category("video-cleanups", "Cleanups", { sortOrder: 5 }),
          category("beauty-retouching", "Beauty Retouching", { sortOrder: 6 }),
        ],
      }),
      category("lottie-web-animation", "Lottie & Web Animation", { sortOrder: 26 }),
      category("elearning-video-production", "eLearning Video Production", { sortOrder: 27 }),
      category("article-to-video", "Article to Video", { sortOrder: 28 }),
      category("screencasting-videos", "Screencasting Videos", { sortOrder: 29 }),
      category("rigging", "Rigging", {
        sortOrder: 30,
        children: [
          category("3d-rigging", "3D Rigging", { sortOrder: 1 }),
          category("2d-rigging", "2D Rigging", { sortOrder: 2 }),
        ],
      }),
      category("corporate-videos", "Corporate Videos", { sortOrder: 31 }),
      category("crowdfunding-videos", "Crowdfunding Videos", { sortOrder: 32 }),
      category("video-repurposing", "Video Repurposing", { sortOrder: 33 }),
      category("slideshow-videos", "Slideshow Videos", { sortOrder: 34 }),
      category("video-templates-editing", "Video Templates Editing", { sortOrder: 35 }),
      category("app-website-previews", "App & Website Previews", { sortOrder: 36 }),
      category("book-trailers", "Book Trailers", { sortOrder: 37 }),
      category("meditation-videos", "Meditation Videos", { sortOrder: 38 }),
      category("real-estate-promos", "Real Estate Promos", { sortOrder: 39 }),
      category("virtual-streaming-avatars", "Virtual & Streaming Avatars", {
        sortOrder: 40,
        children: [
          category("vtuber-avatars", "Vtuber Avatars", { sortOrder: 1 }),
          category("ai-avatars-video", "AI Avatars", { sortOrder: 2 }),
          category("vr-metaverse-avatars", "VR & Metaverse Avatars", { sortOrder: 3 }),
        ],
      }),
      category("game-trailers", "Game Trailers", { sortOrder: 41 }),
      category("video-consultation", "Video Consultation", {
        sortOrder: 42,
        children: [
          category("video-review-consultation", "Video Review & Consultation", { sortOrder: 1 }),
          category("video-mentorship", "Video Mentorship", { sortOrder: 2 }),
          category("video-lessons", "Video Lessons", { sortOrder: 3 }),
        ],
      }),
      category("other-video", "Other", { sortOrder: 43 }),
    ],
  }),
  category("engineering-architecture", "Engineering & Architecture", {
    nl: "Engineering & architectuur",
    serviceType: "hybrid",
    sortOrder: 7,
    children: [
      category("cad-design", "CAD Design", { nl: "CAD-ontwerp", sortOrder: 1 }),
      category("3d-modeling", "3D Modeling", { nl: "3D-modellering", sortOrder: 2 }),
      category("architectural-design", "Architectural Design", { nl: "Architectonisch ontwerp", sortOrder: 3 }),
      category("interior-design", "Interior Design", { nl: "Interieurontwerp", sortOrder: 4 }),
      category("structural-engineering", "Structural Engineering", { nl: "Constructieve engineering", sortOrder: 5 }),
      category("product-design", "Product Design", { nl: "Productontwerp", sortOrder: 6 }),
      category("landscape-design-core", "Landscape Design", { nl: "Landschapsontwerp", sortOrder: 7 }),
      category("civil-engineering", "Civil Engineering", { nl: "Civiele techniek", sortOrder: 8 }),
    ],
  }),
  category("finance-accounting", "Finance & Accounting", {
    nl: "Financiën & boekhouding",
    serviceType: "digital",
    sortOrder: 8,
    children: [
      category("bookkeeping", "Bookkeeping", { nl: "Boekhouding", sortOrder: 1 }),
      category("tax-preparation", "Tax Preparation", { nl: "Belastingvoorbereiding", sortOrder: 2 }),
      category("financial-analysis", "Financial Analysis", { nl: "Financiële analyse", sortOrder: 3 }),
      category("financial-planning", "Financial Planning", { nl: "Financiële planning", sortOrder: 4 }),
      category("business-plans", "Business Plans", { nl: "Businessplannen", sortOrder: 5 }),
      category("accounting-software-setup", "Accounting Software Setup", { nl: "Boekhoudsoftware opzetten", sortOrder: 6 }),
      category("payroll-management", "Payroll Management", { nl: "Salarisadministratie", sortOrder: 7 }),
      category("auditing", "Auditing", { nl: "Audit", sortOrder: 8 }),
      category("corporate-finance", "Corporate Finance", { nl: "Corporate finance", sortOrder: 9 }),
      category("fundraising", "Fundraising", { nl: "Fondsenwerving", sortOrder: 10 }),
      category("personal-finance-wealth-management", "Personal Finance & Wealth Management", { nl: "Persoonlijke financiën & vermogensbeheer", sortOrder: 11 }),
      category("banking-consulting", "Banking Consulting", { nl: "Bankadvies", sortOrder: 12 }),
      category("financial-modeling", "Financial Modeling", { nl: "Financiële modellering", sortOrder: 13 }),
      category("cfo-services", "CFO Services", { nl: "CFO-diensten", sortOrder: 14 }),
    ],
  }),
  category("ai-services", "AI Services", {
    nl: "AI-diensten",
    serviceType: "digital",
    sortOrder: 9,
    children: [
      category("ai-chatbots", "AI Chatbots", { nl: "AI-chatbots", sortOrder: 1 }),
      category("ai-agents", "AI Agents", { nl: "AI-agents", sortOrder: 2 }),
      category("ai-applications", "AI Applications", { nl: "AI-applicaties", sortOrder: 3 }),
      category("ai-integrations", "AI Integrations", { nl: "AI-integraties", sortOrder: 4 }),
      category("ai-fine-tuning", "AI Fine-Tuning", { nl: "AI fine-tuning", sortOrder: 5 }),
      category("ai-content-editing", "AI Content Editing", { nl: "AI-contentbewerking", sortOrder: 6 }),
      category("ai-voice-generation", "AI Voice Generation", { nl: "AI-stemgeneratie", sortOrder: 7 }),
      category("ai-strategy", "AI Strategy", { nl: "AI-strategie", sortOrder: 8 }),
    ],
  }),
  category("data", "Data", {
    nl: "Data",
    serviceType: "digital",
    sortOrder: 10,
    children: [
      category("data-entry", "Data Entry", { nl: "Data-invoer", sortOrder: 1 }),
      category("data-scraping", "Data Scraping", { nl: "Data scraping", sortOrder: 2 }),
      category("data-analytics", "Data Analytics", { nl: "Data-analyse", sortOrder: 3 }),
      category("data-visualization", "Data Visualization", { nl: "Datavisualisatie", sortOrder: 4 }),
      category("data-science", "Data Science", { nl: "Data science", sortOrder: 5 }),
      category("databases", "Databases", { nl: "Databases", sortOrder: 6 }),
      category("data-engineering", "Data Engineering", { nl: "Data-engineering", sortOrder: 7 }),
      category("dashboard-creation", "Dashboard Creation", { nl: "Dashboardontwikkeling", sortOrder: 8 }),
    ],
  }),
  category("business", "Business", {
    nl: "Zakelijk",
    serviceType: "digital",
    sortOrder: 11,
    children: [
      category("virtual-assistant", "Virtual Assistant", { nl: "Virtuele assistent", sortOrder: 1 }),
      category("market-research", "Market Research", { nl: "Marktonderzoek", sortOrder: 2 }),
      category("e-commerce-management", "E-Commerce Management", { nl: "E-commercebeheer", sortOrder: 3 }),
      category("project-management", "Project Management", { nl: "Projectmanagement", sortOrder: 4 }),
      category("customer-support", "Customer Support", { nl: "Klantenservice", sortOrder: 5 }),
      category("sales", "Sales", { nl: "Sales", sortOrder: 6 }),
      category("legal-consulting", "Legal Consulting", { nl: "Juridisch advies", sortOrder: 7 }),
      category("hr-consulting", "HR Consulting", { nl: "HR-advies", sortOrder: 8 }),
    ],
  }),
  category("consulting", "Consulting", {
    nl: "Consultancy",
    serviceType: "hybrid",
    sortOrder: 12,
    children: [
      category("business-consulting", "Business Consulting", { nl: "Bedrijfsadvies", sortOrder: 1 }),
      category("go-to-market-strategy", "Go-To-Market Strategy", { nl: "Go-to-marketstrategie", sortOrder: 2 }),
      category("website-consulting", "Website Consulting", { nl: "Website-advies", sortOrder: 3 }),
      category("software-consulting", "Software Consulting", { nl: "Software-advies", sortOrder: 4 }),
      category("cybersecurity-consulting", "Cybersecurity Consulting", { nl: "Cybersecurity-advies", sortOrder: 5 }),
      category("data-consulting", "Data Consulting", { nl: "Data-advies", sortOrder: 6 }),
      category("career-counseling", "Career Counseling", { nl: "Loopbaanadvies", sortOrder: 7 }),
      category("product-strategy", "Product Strategy", { nl: "Productstrategie", sortOrder: 8 }),
    ],
  }),
  category("photography", "Photography", {
    nl: "Fotografie",
    serviceType: "hybrid",
    sortOrder: 13,
    children: [
      category("product-photography", "Product Photography", { nl: "Productfotografie", sortOrder: 1 }),
      category("real-estate-photography", "Real Estate Photography", { nl: "Vastgoedfotografie", sortOrder: 2 }),
      category("event-photography", "Event Photography", { nl: "Evenementenfotografie", sortOrder: 3 }),
      category("food-photography", "Food Photography", { nl: "Foodfotografie", sortOrder: 4 }),
      category("portrait-photography", "Portrait Photography", { nl: "Portretfotografie", sortOrder: 5 }),
      category("drone-photography", "Drone Photography", { nl: "Dronefotografie", sortOrder: 6 }),
      category("photo-editing", "Photo Editing", { nl: "Fotobewerking", sortOrder: 7 }),
      category("photo-retouching", "Photo Retouching", { nl: "Fotoretouche", sortOrder: 8 }),
    ],
  }),
];

function localizeNode(node, locale) {
  const localized = {
    name: node.names[locale] || node.names.en,
    slug: node.slug,
    sortOrder: node.sortOrder,
  };

  if (node.serviceType) localized.serviceType = node.serviceType;
  if (node.icon) localized.icon = node.icon;
  if (node.description) {
    localized.description = node.description[locale] || node.description.en;
  }
  if (node.children?.length) {
    localized.children = node.children.map((child) => localizeNode(child, locale));
  }

  return localized;
}

export function getFiverrMarketplaceCategories(locale = "en") {
  return categoryDefinitions.map((categoryNode) => localizeNode(categoryNode, locale));
}

export const fiverrMarketplaceCategories = getFiverrMarketplaceCategories("en");
export const fiverrMarketplaceCategoriesNl = getFiverrMarketplaceCategories("nl");

export default fiverrMarketplaceCategories;
