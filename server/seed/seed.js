require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Home = require('../models/Home');
const About = require('../models/About');
const Influencer = require('../models/Influencer');
const Service = require('../models/Service');
const Work = require('../models/Work');
const WorkDetail = require('../models/WorkDetail');

const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  // Clear existing data
  await Promise.all([
    Home.deleteMany({}),
    About.deleteMany({}),
    Influencer.deleteMany({}),
    Service.deleteMany({}),
    Work.deleteMany({}),
    WorkDetail.deleteMany({}),
  ]);
  console.log('Cleared existing data');

  // ─── HOME ─────────────────────────────────────────────
  await Home.create({
    hero: {
      videoUrl: `${BASE_URL}/media/videos/hero.mp4`,
      subtitle: 'An action-first creative communications agency',
      btnText: '↗ VIEW WORK',
      btnLink: '/work',
    },
    marqueeBrands: [
      'J.Crew', 'REI', 'Fender', 'Sweetgreen', 'HOKA', 'Away',
    ],
    bentoGrid: [
      {
        label: 'Who we are',
        title: "Infusing creative alchemy into today's brands",
        description:
          'We increase brand visibility and awareness to attract new customers through thoughtful storytelling and distinct, adaptable communications strategies. With an unmatched consumer understanding and a true collaborative spirit, we create magic for brands.',
        imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200',
        btnText: 'OUR SERVICES',
        btnLink: '/services',
        bgColor: '#C8622A',
        mediaType: 'image',
      },
      {
        label: 'Influencer Strategy',
        title: 'Engage with cultural tastemakers',
        description:
          'Our dedicated influencer team manages everything from macro-ambassador programs to hyper-local micro-influencer campaigns, ensuring authentic alignment and measurable impact.',
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200',
        btnText: 'INFLUENCER SERVICES',
        btnLink: '/influencers',
        bgColor: '#2C4A3E',
        mediaType: 'image',
      },
      {
        label: 'Experiential',
        title: 'Experiences that leave a mark',
        description:
          'From intimate press dinners to massive consumer activations, we handle end-to-end event production that amplifies your message and creates lasting impressions.',
        imageUrl: 'https://cdn.dribbble.com/userupload/47649503/file/f9562b477f17db6f6383731afafee870.mp4',
        btnText: 'ALL SERVICES',
        btnLink: '/services',
        bgColor: '#1D3A50',
        mediaType: 'video',
      },
    ],
    instagram: {
      title: 'Follow Us',
      handle: '@theelephantmedia',
      handleUrl: 'https://www.instagram.com/theelephantmedia/',
      images: [
        'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop',
      ],
    },
  });
  console.log('Seeded Home');

  // ─── ABOUT ────────────────────────────────────────────
  await About.create({
    hero: {
      label: 'About The Elephant Media',
      title: 'We create magic\nfor brands',
    },
    mission: {
      label: 'Who We Are',
      paragraphs: [
        'The Elephant Media is an action-first creative communications agency. We increase brand visibility and awareness to attract new customers through thoughtful storytelling and distinct and adaptable communications strategies.',
        'With an unmatched consumer understanding and a true collaborative spirit, we create magic for brands by bringing their authenticity and differentiated perspective to the forefront. Our team brings decades of combined experience across media, fashion, lifestyle, and consumer brands.',
      ],
    },
    values: [
      {
        title: 'Action-First',
        description: 'We don\'t just talk strategy — we execute. Every recommendation comes with a clear path to results.',
        icon: '→',
      },
      {
        title: 'Creative Alchemy',
        description: 'We blend art and strategy, intuition and data, to create communications that truly resonate.',
        icon: '✦',
      },
      {
        title: 'Authentic Storytelling',
        description: 'We bring your brand\'s unique perspective and authenticity to the forefront of every narrative.',
        icon: '◈',
      },
      {
        title: 'Collaborative Spirit',
        description: 'Your brand is our brand. We embed ourselves in your culture to deliver work that feels genuinely yours.',
        icon: '◎',
      },
    ],
    team: [
      { name: 'Founder & CEO', role: 'Leadership', gradient: 'linear-gradient(135deg, #e8ddd0, #c4a882)' },
      { name: 'VP of Communications', role: 'Strategy', gradient: 'linear-gradient(135deg, #d4c5b2, #a8956e)' },
      { name: 'Director of Influencer', role: 'Partnerships', gradient: 'linear-gradient(135deg, #a8c5a0, #6b9e5e)' },
      { name: 'Creative Director', role: 'Creative', gradient: 'linear-gradient(135deg, #c9b99a, #8fb573)' },
      { name: 'Senior Account Manager', role: 'Client Services', gradient: 'linear-gradient(135deg, #c4a882, #8b6d4f)' },
      { name: 'Digital Strategist', role: 'Digital', gradient: 'linear-gradient(135deg, #e0d5c7, #c4a882)' },
    ],
    testimonial: {
      quote: 'The Elephant Media has been a transformative partner for our brand. Their strategic vision combined with flawless execution has elevated our presence in ways we never thought possible.',
      authorName: 'Brand Partner',
      authorRole: 'Fortune 500 Company',
    },
  });
  console.log('Seeded About');

  // ─── INFLUENCERS ──────────────────────────────────────
  await Influencer.create({
    heroTitle: 'Influencer Collaborations',
    heroText:
      'We fuel brand awareness, boost conversion, and create tangible ROI by fostering authentic partnerships between influencers and brands. Because influencers are changing the way we interact with brands, you might trust a post from your favorite creator more than a celebrity commercial.',
    items: [
      { brand: "KIEHL'S", title: "KIEHL'S Acne Liquid Patch Launch", category: 'BEAUTY', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop' },
      { brand: 'SUNDAYS FURNITURE', title: 'Sundays Furniture Ambassador Program', category: 'HOME', imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop' },
      { brand: 'FARMACY', title: 'Farmacy', category: 'BEAUTY', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop' },
      { brand: 'ALDO', title: 'ALDO VIP Dressing', category: 'FASHION', imageUrl: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=1200&auto=format&fit=crop' },
      { brand: "TRAVISMATHEW WOMEN'S", title: "TravisMathew Women's Ojai Content Trip", category: 'LIFESTYLE', imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1200&auto=format&fit=crop' },
      { brand: 'REI', title: 'REI Influencer Programming', category: 'ACTIVEWEAR', imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1200&auto=format&fit=crop' },
    ],
  });
  console.log('Seeded Influencers');

  // ─── SERVICES ─────────────────────────────────────────
  await Service.create({
    hero: {
      label: 'What We Do',
      title: 'Services',
      subtitle: 'From concept to camera, strategy to screen — we handle every dimension of your brand\'s creative output.',
    },
    services: [
      {
        number: '01',
        title: 'Creative Direction & Concept Planning',
        description: 'Your vision, structured into a bold and executable creative strategy. We work closely with your brand to understand your market, your audience, and your goals — then translate that into a creative blueprint every team member can execute against.',
        features: ['Brand & audience discovery sessions', 'Concept mood boards & visual references', 'Campaign brief & content strategy document', 'Shot list and production planning'],
        imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000',
        imageAlt: 'Creative direction planning session',
      },
      {
        number: '02',
        title: 'Professional Photography & Videography',
        description: 'High-end visual storytelling at cinematic standards — every frame intentional. From product photography and portrait sessions to brand campaigns and commercial video, every visual we produce is crafted to command attention.',
        features: ['Full-day or half-day photography & video shoots', 'On-set creative direction throughout', 'Edited, colour-graded final deliverables', 'Platform-ready formats: Instagram, YouTube, web, print'],
        imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000',
        imageAlt: 'Professional photography shoot',
      },
      {
        number: '03',
        title: 'Social Media Content Creation',
        description: "Platform-native content that drives engagement and converts attention into loyal audiences. Each piece is built specifically for its platform, its audience, and its objective — from reels and carousels to story sequences and feed aesthetics.",
        features: ['Monthly content calendars', 'Reel & short-form video creation', 'Carousel and static post design', 'Caption copywriting and hashtag strategy', 'Feed aesthetic planning and brand consistency'],
        imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000',
        imageAlt: 'Social media content creation',
      },
      {
        number: '04',
        title: 'High-End Commercial Ads & Brand Campaigns',
        description: 'Bold, market-dominating campaigns built for recognition, reach, and lasting brand equity. From 15-second product spots to full brand campaign rollouts — content that stands out in a saturated feed and drives measurable results.',
        features: ['Commercial ad video production (15s, 30s, 60s)', 'Brand campaign photography series', 'Ad copy and messaging frameworks', 'Multi-platform campaign assets', 'Performance review and creative optimisation'],
        imageUrl: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1000',
        imageAlt: 'Commercial brand campaign',
      },
      {
        number: '05',
        title: 'Account Growth & Optimisation',
        description: "Data-backed strategy to scale your social presence with real, measurable growth. We analyse your account data, identify what's working, and build a strategic roadmap to accelerate follower growth, increase reach, and improve engagement rates.",
        features: ['Monthly performance reports (reach, engagement, follower growth)', 'Content strategy adjustments based on analytics', 'Competitor benchmarking', 'Growth roadmap and milestone tracking', 'Platform algorithm insights and posting optimisation'],
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000',
        imageAlt: 'Analytics and growth strategy',
      },
      {
        number: '06',
        title: 'Event Coverage',
        description: "Capturing the energy and essence of live moments — from intimate events to large-scale productions. Whether it's a product launch, brand activation, or corporate event, we deliver a full photo and video package that brings the experience to life.",
        features: ['Event photography — full coverage', 'Event highlight reel video', 'Same-day content for live social posting', 'Edited gallery delivered within agreed timeline'],
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000',
        imageAlt: 'Event coverage and photography',
      },
      {
        number: '07',
        title: 'Influencer & Digital Marketing Collaborations',
        description: "Strategic creator partnerships that extend your reach and drive authentic engagement at scale. We identify, brief, and manage creator partnerships aligned with your brand values — from micro-influencers to large-scale campaigns.",
        features: ['Influencer identification and vetting', 'Campaign brief creation and talent briefing', 'Content review and brand alignment', 'Campaign performance tracking', 'Long-term partnership management'],
        imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000',
        imageAlt: 'Influencer marketing collaboration',
      },
      {
        number: '08',
        title: 'Podcast Studio & Recording Services',
        description: 'Professional audio production in a fully equipped studio — crisp sound, cinematic visuals, ready to publish. Soundproofed, professionally lit, and fully equipped for both audio recording and video production.',
        features: ['Studio rental — hourly, half-day, full-day packages', 'Professional audio recording and mixing', 'Video recording with podcast-ready lighting setup', 'Post-production and episode editing (add-on)', 'Thumbnail and cover art creation (add-on)'],
        imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1000',
        imageAlt: 'Podcast studio recording',
      },
      {
        number: '09',
        title: 'Concert & Live Production',
        description: 'The ultimate authority in live experience production — from pre-production to the final curtain call. We handle the full production pipeline for concerts, live shows, and large-scale events.',
        features: ['Pre-production planning and shot list', 'Multi-camera live video coverage', 'Concert and event photography', 'Post-production highlight reel and full edit', 'Social content cut-downs for digital distribution'],
        imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000',
        imageAlt: 'Concert and live production',
      },
    ],
    cta: {
      title: 'Ready to create\nsomething extraordinary?',
      email: 'info@theelephantmedia.com',
      btnText: 'Get In Touch',
    },
  });
  console.log('Seeded Services');

  // ─── WORK ─────────────────────────────────────────────
  await Work.create({
    hero: {
      title: 'Work',
      subtitle: 'We create global awareness for brands\nthrough tailored creative strategies and\nan action-first approach.',
    },
    categories: [
      { category: 'FASHION', mainBrand: 'Lacoste', hasIcon: true, slug: 'lacoste', otherBrands: ['Mansur Gavriel', 'J. Crew', 'Madhappy'], color: '#496A74', imageUrl: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=1000&auto=format&fit=crop' },
      { category: 'BEAUTY', mainBrand: 'Kosas', hasIcon: true, slug: 'kosas', otherBrands: ['Ilia Beauty', 'Living Proof', 'Sol de Janeiro'], color: '#2B4636', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop' },
      { category: 'WELLNESS', mainBrand: 'Sakara Life', hasIcon: true, slug: 'sakara-life', otherBrands: ['HigherDOSE', 'CorePower Yoga', 'Equinox'], color: '#1A4A5D', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000&auto=format&fit=crop' },
      { category: 'LIFESTYLE', mainBrand: 'Away', hasIcon: true, slug: 'away', otherBrands: ['Paravel', 'Rhode', 'Aero'], color: '#D48695', imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1000&auto=format&fit=crop' },
      { category: 'FOOD & BEVERAGE', mainBrand: 'Pressed', hasIcon: true, slug: 'pressed', otherBrands: ['Yasso', 'Sweetgreen', 'TALA'], color: '#2C4A2D', imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1000&auto=format&fit=crop' },
      { category: 'HOME', mainBrand: 'Our Place', hasIcon: true, slug: 'our-place', otherBrands: ['Boy Smells', 'West Elm', 'Beast'], color: '#133D4F', imageUrl: 'https://images.unsplash.com/photo-1584990347449-a6ebbb56e297?q=80&w=1000&auto=format&fit=crop' },
      { category: 'FOOTWEAR', mainBrand: 'HOKA', hasIcon: true, slug: 'hoka', otherBrands: ['New Balance', 'Teva', 'UGG'], color: '#4A3D36', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop' },
      { category: 'ACTIVEWEAR', mainBrand: 'Vuori', hasIcon: true, slug: 'vuori', otherBrands: ['Alo Yoga', 'Lululemon', 'Gymshark'], color: '#2A2D34', imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1000&auto=format&fit=crop' },
    ],
    offerSection: {
      title: 'What we offer',
      btnText: 'See Services',
      btnLink: '/services',
    },
  });
  console.log('Seeded Work');

  // ─── WORK DETAILS ─────────────────────────────
  await WorkDetail.create({
    slug: 'lacoste',
    clientName: 'Lacoste',
    title: "Lacoste's immersive entry into global tennis culture at the Open '23",
    services: ['Event Production', 'VIP & Influencer Seeding', 'Creative Services'],
    visitUrl: '#',
    images: {
      gridFull: [
        'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop',
      ],
      gridHalf: [
        'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1530915534664-4ac6423816b7?q=80&w=600&auto=format&fit=crop',
      ],
    },
    socialImages: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?q=80&w=400&auto=format&fit=crop',
    ],
    eventSeries: {
      title: 'Three part experiential event series',
      paragraphs: [
        'We created a multi-faceted event series that brought the brand to life through an immersive entry into global tennis culture at the Open \'23.',
        'Through bespoke installations, influencer seeding, and high-impact VIP gatherings, we solidified Lacoste\'s position at the intersection of fashion and sport.',
      ],
      images: [
        'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563241527-200ecfbc51af?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
      ],
    },
    moreWork: [
      { title: 'Kosas', slug: 'kosas', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop' },
      { title: 'Sakara Life', slug: 'sakara-life', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop' },
      { title: 'Away', slug: 'away', imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400&auto=format&fit=crop' },
    ],
    ctaTitle: "Interested in our work?\nLet's talk.",
  });
  console.log('Seeded WorkDetail: lacoste');

  await WorkDetail.create({
    slug: 'kosas',
    clientName: 'Kosas',
    title: 'Clean beauty meets cultural relevance — the Kosas brand evolution',
    services: ['Influencer Strategy', 'Content Creation', 'Social Media'],
    visitUrl: '#',
    images: {
      gridFull: [
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
      ],
      gridHalf: [
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop',
      ],
    },
    socialImages: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400&auto=format&fit=crop',
    ],
    eventSeries: {
      title: 'Clean beauty influencer immersion',
      paragraphs: [
        'We orchestrated an immersive influencer retreat that introduced Kosas\' expanded product line to key beauty voices across the country.',
        'The result was 50+ pieces of organic content, a 300% increase in social mentions, and a measurable lift in direct-to-consumer sales during the campaign window.',
      ],
      images: [
        'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=800&auto=format&fit=crop',
      ],
    },
    moreWork: [
      { title: 'Lacoste', slug: 'lacoste', imageUrl: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=400&auto=format&fit=crop' },
      { title: 'Sakara Life', slug: 'sakara-life', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop' },
      { title: 'Away', slug: 'away', imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400&auto=format&fit=crop' },
    ],
    ctaTitle: "Interested in our work?\nLet's talk.",
  });
  console.log('Seeded WorkDetail: kosas');

  await WorkDetail.create({
    slug: 'sakara-life',
    clientName: 'Sakara Life',
    title: 'Wellness redefined — scaling Sakara Life through strategic partnerships',
    services: ['Brand Partnerships', 'Event Production', 'Content Strategy'],
    visitUrl: '#',
    images: {
      gridFull: [
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1200&auto=format&fit=crop',
      ],
      gridHalf: [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop',
      ],
    },
    socialImages: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&auto=format&fit=crop',
    ],
    eventSeries: {
      title: 'Mindful living brand summit',
      paragraphs: [
        'We produced a multi-day wellness summit that brought together Sakara Life\'s top partners, influencers, and customers for an immersive brand experience.',
        'The event generated significant press coverage and deepened Sakara Life\'s position as a leader in the functional wellness space.',
      ],
      images: [
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
      ],
    },
    moreWork: [
      { title: 'Kosas', slug: 'kosas', imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop' },
      { title: 'Lacoste', slug: 'lacoste', imageUrl: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=400&auto=format&fit=crop' },
      { title: 'Pressed', slug: 'pressed', imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400&auto=format&fit=crop' },
    ],
    ctaTitle: "Interested in our work?\nLet's talk.",
  });
  console.log('Seeded WorkDetail: sakara-life');

  await WorkDetail.create({
    slug: 'away',
    clientName: 'Away',
    title: 'Travel reimagined — the Away brand lifestyle campaign',
    services: ['Creative Direction', 'Photography & Video', 'Social Media'],
    visitUrl: '#',
    images: {
      gridFull: [
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop',
      ],
      gridHalf: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop',
      ],
    },
    socialImages: [
      'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop',
    ],
    eventSeries: {
      title: 'The art of modern travel',
      paragraphs: [
        'We partnered with Away to create a lifestyle campaign that captures the spirit of modern travel — effortless, intentional, and beautifully designed.',
        'The campaign featured destination shoots, influencer integrations, and a social-first content strategy that drove record engagement across platforms.',
      ],
      images: [
        'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800&auto=format&fit=crop',
      ],
    },
    moreWork: [
      { title: 'Our Place', slug: 'our-place', imageUrl: 'https://images.unsplash.com/photo-1584990347449-a6ebbb56e297?q=80&w=400&auto=format&fit=crop' },
      { title: 'HOKA', slug: 'hoka', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop' },
      { title: 'Vuori', slug: 'vuori', imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=400&auto=format&fit=crop' },
    ],
    ctaTitle: "Interested in our work?\nLet's talk.",
  });
  console.log('Seeded WorkDetail: away');

  await WorkDetail.create({
    slug: 'pressed',
    clientName: 'Pressed',
    title: 'Pressed — refreshing a beloved brand for a new generation',
    services: ['Brand Strategy', 'Creative Direction', 'Content Production'],
    visitUrl: '#',
    images: {
      gridFull: [
        'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop',
      ],
      gridHalf: [
        'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?q=80&w=600&auto=format&fit=crop',
      ],
    },
    socialImages: [
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?q=80&w=400&auto=format&fit=crop',
    ],
    eventSeries: {
      title: 'Juice bar reimagined launch',
      paragraphs: [
        'Pressed came to us to refresh their brand identity and launch a new product line aimed at health-conscious millennials and Gen Z consumers.',
        'We developed a vibrant campaign that included a pop-up juice bar activation in SoHo, influencer seeding kits, and a social media strategy that drove 2M+ impressions in the first week.',
      ],
      images: [
        'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?q=80&w=800&auto=format&fit=crop',
      ],
    },
    moreWork: [
      { title: 'Sakara Life', slug: 'sakara-life', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&auto=format&fit=crop' },
      { title: 'Our Place', slug: 'our-place', imageUrl: 'https://images.unsplash.com/photo-1584990347449-a6ebbb56e297?q=80&w=400&auto=format&fit=crop' },
      { title: 'HOKA', slug: 'hoka', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop' },
    ],
    ctaTitle: "Interested in our work?\nLet's talk.",
  });
  console.log('Seeded WorkDetail: pressed');

  await WorkDetail.create({
    slug: 'our-place',
    clientName: 'Our Place',
    title: 'Home is where the brand is — Our Place campaign evolution',
    services: ['Creative Direction', 'Photography', 'Influencer Partnerships'],
    visitUrl: '#',
    images: {
      gridFull: [
        'https://images.unsplash.com/photo-1584990347449-a6ebbb56e297?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200&auto=format&fit=crop',
      ],
      gridHalf: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1584990347449-a6ebbb56e297?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop',
      ],
    },
    socialImages: [
      'https://images.unsplash.com/photo-1584990347449-a6ebbb56e297?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=400&auto=format&fit=crop',
    ],
    eventSeries: {
      title: 'Always Home brand platform',
      paragraphs: [
        'We developed the "Always Home" brand platform for Our Place, creating a comprehensive campaign that celebrated the ritual of cooking and gathering.',
        'The campaign included lifestyle photography, video content, influencer collaborations, and a series of intimate dinner events hosted by notable chefs and creators.',
      ],
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460899960812-f6ee1ecaf35b?q=80&w=800&auto=format&fit=crop',
      ],
    },
    moreWork: [
      { title: 'Away', slug: 'away', imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400&auto=format&fit=crop' },
      { title: 'Pressed', slug: 'pressed', imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=400&auto=format&fit=crop' },
      { title: 'Vuori', slug: 'vuori', imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=400&auto=format&fit=crop' },
    ],
    ctaTitle: "Interested in our work?\nLet's talk.",
  });
  console.log('Seeded WorkDetail: our-place');

  await WorkDetail.create({
    slug: 'hoka',
    clientName: 'HOKA',
    title: 'HOKA — running culture amplified through community and content',
    services: ['Content Production', 'Event Production', 'Athlete Partnerships'],
    visitUrl: '#',
    images: {
      gridFull: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop',
      ],
      gridHalf: [
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579126038374-6064e9370f0f?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf8b?q=80&w=600&auto=format&fit=crop',
      ],
    },
    socialImages: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf8b?q=80&w=400&auto=format&fit=crop',
    ],
    eventSeries: {
      title: 'Fly Human Fly event series',
      paragraphs: [
        'We created a community-driven event series for HOKA that brought together runners of all levels for guided runs, product trials, and brand experiences in major markets.',
        'The program built authentic grassroots momentum and positioned HOKA as the brand that truly understands running culture.',
      ],
      images: [
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579126038374-6064e9370f0f?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf8b?q=80&w=800&auto=format&fit=crop',
      ],
    },
    moreWork: [
      { title: 'Vuori', slug: 'vuori', imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=400&auto=format&fit=crop' },
      { title: 'Away', slug: 'away', imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400&auto=format&fit=crop' },
      { title: 'Lacoste', slug: 'lacoste', imageUrl: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=400&auto=format&fit=crop' },
    ],
    ctaTitle: "Interested in our work?\nLet's talk.",
  });
  console.log('Seeded WorkDetail: hoka');

  await WorkDetail.create({
    slug: 'vuori',
    clientName: 'Vuori',
    title: 'Vuori — performance meets lifestyle in the activewear revolution',
    services: ['Creative Direction', 'Photography & Video', 'Influencer Strategy'],
    visitUrl: '#',
    images: {
      gridFull: [
        'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1200&auto=format&fit=crop',
      ],
      gridHalf: [
        'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1562184552-e1a3e1e5a5b7?q=80&w=600&auto=format&fit=crop',
      ],
    },
    socialImages: [
      'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=400&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=400&auto=format&fit=crop',
    ],
    eventSeries: {
      title: 'California activewear lifestyle campaign',
      paragraphs: [
        'We partnered with Vuori to create a lifestyle campaign that captures the intersection of performance and everyday comfort — the essence of the California activewear aesthetic.',
        'The campaign featured coastal lifestyle shoots, fitness influencer integrations, and a social strategy that showcased Vuori as the go-to brand for the modern active lifestyle.',
      ],
      images: [
        'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1562184552-e1a3e1e5a5b7?q=80&w=800&auto=format&fit=crop',
      ],
    },
    moreWork: [
      { title: 'HOKA', slug: 'hoka', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop' },
      { title: 'Away', slug: 'away', imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=400&auto=format&fit=crop' },
      { title: 'Our Place', slug: 'our-place', imageUrl: 'https://images.unsplash.com/photo-1584990347449-a6ebbb56e297?q=80&w=400&auto=format&fit=crop' },
    ],
    ctaTitle: "Interested in our work?\nLet's talk.",
  });
  console.log('Seeded WorkDetail: vuori');

  console.log('\n✅ Seed complete!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
