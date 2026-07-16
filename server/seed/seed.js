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
      handle: '@theelephantproduction',
      handleUrl: 'https://www.instagram.com/theelephantproduction/',
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
      label: 'About The Elephant Production',
      title: 'We create magic\nfor brands',
    },
    mission: {
      label: 'Who We Are',
      paragraphs: [
        'The Elephant Production is an action-first creative communications agency. We increase brand visibility and awareness to attract new customers through thoughtful storytelling and distinct and adaptable communications strategies.',
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
      quote: 'The Elephant Production has been a transformative partner for our brand. Their strategic vision combined with flawless execution has elevated our presence in ways we never thought possible.',
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
      email: 'info@theelephantproduction.com',
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

  // ─── WORK DETAIL: Lacoste ─────────────────────────────
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
      { title: 'Outdoor Voices', imageUrl: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=400&auto=format&fit=crop' },
      { title: 'Paravel', imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=400&auto=format&fit=crop' },
      { title: 'Sweetgreen', imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop' },
    ],
    ctaTitle: "Interested in our work?\nLet's talk.",
  });
  console.log('Seeded WorkDetail: lacoste');

  console.log('\n✅ Seed complete!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
