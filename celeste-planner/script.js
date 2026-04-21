import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js"
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js"
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js"

const allVendors = {
  venue: {
    title: "Venue",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10"/><path d="m2 10 10-7 10 7"/></svg>`,
    items: [
      {
        id: "v12",
        name: "Local Park Gazebo",
        specialty: "Simple, public space for small gatherings.",
        price: "₹1,500",
        cost: 1500,
        eventType: ["gathering"],
        contact: "contact@localpark.com",
      },
      {
        id: "v13",
        name: "University Auditorium",
        specialty: "Basic, functional space for talks or small events.",
        price: "₹4,000",
        cost: 4000,
        eventType: ["corporate", "gathering"],
        contact: "events@university.edu",
      },
      {
        id: "v9",
        name: "Park Pavilion",
        specialty: "Budget-friendly, open-air space for casual events.",
        price: "₹6,000",
        cost: 6000,
        eventType: ["party", "gathering"],
        contact: "contact@parkpavilion.com",
      },
      {
        id: "v5",
        name: "Community Hall",
        specialty: "Affordable and spacious for local gatherings.",
        price: "₹8,000",
        cost: 8000,
        eventType: ["party", "gathering"],
        contact: "contact@communityhall.com",
      },
      {
        id: "v14",
        name: "Celebration Hall",
        specialty: "A step-up from a basic hall, with better amenities.",
        price: "₹28,000",
        cost: 28000,
        eventType: ["party", "gathering", "wedding"],
        contact: "contact@celebrationhall.com",
      },
      {
        id: "v15",
        name: "The Cozy Nook Hall",
        specialty: "Perfect for intimate parties and small weddings.",
        price: "₹40,000",
        cost: 40000,
        eventType: ["party", "wedding", "gathering"],
        contact: "contact@cozynook.com",
      },
      {
        id: "v6",
        name: "SkyLounge Rooftop",
        specialty: "Chic city views for modern parties.",
        price: "₹22,000",
        cost: 22000,
        eventType: ["corporate", "party"],
        contact: "events@skylounge.com",
      },
      {
        id: "v2",
        name: "Sunset Beach Club",
        specialty: "Casual beachside parties and gatherings.",
        price: "₹24,000",
        cost: 24000,
        eventType: ["wedding", "party", "gathering"],
        contact: "events@sunsetbeach.com",
      },
      {
        id: "v3",
        name: "Urban Loft Gallery",
        specialty: "Modern, artistic, and chic receptions.",
        price: "₹45,000",
        cost: 45000,
        eventType: ["corporate", "party"],
        contact: "bookings@urbanloft.com",
      },
      {
        id: "v10",
        name: "The Vineyard Estate",
        specialty: "Romantic vineyard setting for elegant weddings.",
        price: "₹75,000",
        cost: 75000,
        eventType: ["wedding"],
        contact: "events@vineyardestate.com",
      },
      {
        id: "v7",
        name: "Heritage Palace",
        specialty: "Royal and historic setting for grand weddings.",
        price: "₹85,000",
        cost: 85000,
        eventType: ["wedding"],
        contact: "palace@heritage.com",
      },
      {
        id: "v1",
        name: "The Grand Ballroom",
        specialty: "Luxury weddings and corporate events.",
        price: "₹120,000",
        cost: 120000,
        eventType: ["wedding", "corporate"],
        contact: "contact@grandballroom.com",
      },
      {
        id: "v8",
        name: "5-Star Convention Center",
        specialty: "All-inclusive packages for large corporate events.",
        price: "₹250,000",
        cost: 250000,
        eventType: ["corporate"],
        contact: "mice@5star.com",
      },
      {
        id: "v16",
        name: "The Emerald Gardens",
        specialty: "Expansive gardens for large, upscale events.",
        price: "₹450,000",
        cost: 450000,
        eventType: ["wedding", "corporate"],
        contact: "contact@emeraldgardens.com",
      },
      {
        id: "v17",
        name: "Serene Shores Retreat",
        specialty: "Exclusive lakeside property for private events.",
        price: "₹525,000",
        cost: 525000,
        eventType: ["wedding", "corporate"],
        contact: "contact@sereneshores.com",
      },
      {
        id: "v18",
        name: "Skyline Terrace",
        specialty: "Premium rooftop venue with panoramic city views.",
        price: "₹600,000",
        cost: 600000,
        eventType: ["wedding", "corporate"],
        contact: "contact@skylineterrace.com",
      },
      {
        id: "v11",
        name: "Private Island Resort",
        specialty: "Exclusive, ultimate luxury for once-in-a-lifetime events.",
        price: "₹800,000",
        cost: 800000,
        eventType: ["wedding"],
        contact: "bookings@privateisland.com",
      },
      {
        id: "v19",
        name: "The Zenith Palace",
        specialty: "The pinnacle of luxury venues for royalty-style events.",
        price: "₹1,000,000",
        cost: 1000000,
        eventType: ["wedding"],
        contact: "contact@zenithpalace.com",
      },
    ],
  },
  catering: {
    title: "Catering",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7H5a7 7 0 0 0 7 7Z"/><path d="M12 2a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"/><path d="M4 9h16v6H4Z"/></svg>`,
    items: [
      {
        id: "c12",
        name: "Potluck Coordination",
        specialty: "We help organize and supplement your potluck.",
        price: "₹1,000",
        cost: 1000,
        eventType: ["gathering"],
        contact: "help@potluckpros.com",
      },
      {
        id: "c11",
        name: "Pizza Party Pack",
        specialty: "Bulk order of assorted pizzas and soft drinks.",
        price: "₹2,500",
        cost: 2500,
        eventType: ["party", "gathering"],
        contact: "orders@pizzaparty.com",
      },
      {
        id: "c9",
        name: "Taco Truck Fiesta",
        specialty: "Fun and casual, serving fresh tacos and nachos.",
        price: "₹4,000",
        cost: 4000,
        eventType: ["party", "gathering"],
        contact: "fiesta@tacotruck.com",
      },
      {
        id: "c5",
        name: "Local Delights",
        specialty: "Authentic regional street food style.",
        price: "₹5,000",
        cost: 5000,
        eventType: ["party", "gathering"],
        contact: "orders@localdelights.com",
      },
      {
        id: "c2",
        name: "Feast & Flame BBQ",
        specialty: "Authentic smokehouse BBQ catering.",
        price: "₹8,500",
        cost: 8500,
        eventType: ["party", "gathering"],
        contact: "catering@feastflame.com",
      },
      {
        id: "c13",
        name: "Mumbai Masala Carts",
        specialty: "Live stations for authentic Mumbai street food.",
        price: "₹25,000",
        cost: 25000,
        eventType: ["party", "wedding", "gathering"],
        contact: "contact@mumbaimasalacarts.com",
      },
      {
        id: "c3",
        name: "The Green Leaf",
        specialty: "Vegetarian and vegan gourmet meals.",
        price: "₹15,000",
        cost: 15000,
        eventType: ["wedding", "corporate", "gathering"],
        contact: "hello@thegreenleaf.com",
      },
      {
        id: "c6",
        name: "World Cuisine Buffet",
        specialty: "A lavish spread from around the globe.",
        price: "₹21,000",
        cost: 21000,
        eventType: ["wedding", "corporate"],
        contact: "info@worldcuisine.com",
      },
      {
        id: "c1",
        name: "Gourmet Bites",
        specialty: "Fusion cuisine with artistic presentation.",
        price: "₹30,000",
        cost: 30000,
        eventType: ["wedding", "corporate", "party"],
        contact: "orders@gourmetbites.com",
      },
      {
        id: "c14",
        name: "Homestyle Feasts",
        specialty: "Comforting and delicious home-style buffet.",
        price: "₹58,000",
        cost: 58000,
        eventType: ["wedding", "party", "gathering"],
        contact: "contact@homestylefeasts.com",
      },
      {
        id: "c4",
        name: "Continental Catering",
        specialty: "Classic dishes for large-scale events.",
        price: "₹50,000",
        cost: 50000,
        eventType: ["corporate"],
        contact: "info@continentalcatering.com",
      },
      {
        id: "c10",
        name: "Sushi & Sashimi Bar",
        specialty: "Live sushi station with a master chef.",
        price: "₹70,000",
        cost: 70000,
        eventType: ["corporate", "wedding"],
        contact: "sushi@bar.com",
      },
      {
        id: "c7",
        name: "Michelin Star Experience",
        specialty: "Curated menu by a renowned chef.",
        price: "₹95,000",
        cost: 95000,
        eventType: ["wedding", "corporate"],
        contact: "chef@michelin.com",
      },
      {
        id: "c15",
        name: "Green Plate Gourmet",
        specialty: "High-end, exclusively vegan culinary experiences.",
        price: "₹150,000",
        cost: 150000,
        eventType: ["wedding", "corporate"],
        contact: "contact@greenplategourmet.com",
      },
      {
        id: "c8",
        name: "Elaborate Food Stations",
        specialty: "Interactive live counters and bars.",
        price: "₹150,000",
        cost: 150000,
        eventType: ["wedding", "corporate"],
        contact: "events@foodstations.com",
      },
      {
        id: "c16",
        name: "Gourmet Artistry",
        specialty: "The finest ingredients, exquisitely presented.",
        price: "₹700,000",
        cost: 700000,
        eventType: ["wedding", "corporate"],
        contact: "contact@gourmetartistry.com",
      },
    ],
  },
  cakes_drinks: {
    title: "Cakes & Beverages",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/><path d="M9 12a3 3 0 0 1 0 6h6a3 3 0 0 1 0-6H9z"/><path d="M12 4v8"/></svg>`,
    items: [
      {
        id: "cd1",
        name: "The Daily Grind Express",
        specialty: "Mobile coffee bar with professional baristas.",
        price: "₹14,000",
        cost: 14000,
        eventType: ["corporate", "wedding", "gathering"],
        contact: "contact@dailygrindexpress.com",
      },
      {
        id: "cd2",
        name: "Sweet Creations Patisserie",
        specialty: "Custom cakes, pastries, and dessert tables.",
        price: "₹15,000",
        cost: 15000,
        eventType: ["wedding", "party"],
        contact: "contact@sweetcreations.com",
      },
      {
        id: "cd3",
        name: "The Alchemist's Bar",
        specialty: "Expert mixologists and a stylish mobile bar setup.",
        price: "₹45,000",
        cost: 45000,
        eventType: ["wedding", "corporate", "party"],
        contact: "contact@alchemistsbar.com",
      },
    ],
  },
  decor: {
    title: "Decor & Styling",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l.34.28a1.36 1.36 0 0 0 1.62 0l.34-.28a1.36 1.36 0 0 1 1.9 0l.34.28a1.36 1.36 0 0 0 1.62 0l.34-.28a1.36 1.36 0 0 1 1.9 0L22 4.4V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4.4l1.58-1.71a1.36 1.36 0 0 1 1.9 0l.34.28a1.36 1.36 0 0 0 1.62 0l.34-.28a1.36 1.36 0 0 1 1.9 0l.34.28a1.36 1.36 0 0 0 1.62 0Z"/><path d="M22 14v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6"/><path d="M12 14v8"/></svg>`,
    items: [
      {
        id: "d9",
        name: "Streamers & Balloons",
        specialty: "Basic party decoration package.",
        price: "₹1,200",
        cost: 1200,
        eventType: ["party", "gathering"],
        contact: "contact@simpledecor.com",
      },
      {
        id: "d10",
        name: "Rental Centerpieces",
        specialty: "Affordable, elegant centerpieces for rent.",
        price: "₹3,000",
        cost: 3000,
        eventType: ["wedding", "corporate", "party"],
        contact: "rent@centerpieces.com",
      },
      {
        id: "d11",
        name: "Blossom & Twine",
        specialty: "Elegant and affordable decor solutions.",
        price: "₹8,000",
        cost: 8000,
        eventType: ["party", "gathering", "wedding"],
        contact: "contact@blossomtwine.com",
      },
      {
        id: "d4",
        name: "DIY Decor Kits",
        specialty: "Pre-packaged themes for you to set up.",
        price: "₹4,000",
        cost: 4000,
        eventType: ["party", "gathering"],
        contact: "kits@diydecor.com",
      },
      {
        id: "d12",
        name: "Inflated Imaginations",
        specialty: "Custom, large-scale balloon installations.",
        price: "₹9,000",
        cost: 9000,
        eventType: ["party", "corporate"],
        contact: "contact@inflatedimaginations.com",
      },
      {
        id: "d8",
        name: "Balloon Artistry",
        specialty: "Creative and grand balloon arrangements.",
        price: "₹9,000",
        cost: 9000,
        eventType: ["party"],
        contact: "art@balloons.com",
      },
      {
        id: "d2",
        name: "Boho Dreams",
        specialty: "Rustic, bohemian, and natural styling.",
        price: "₹12,000",
        cost: 12000,
        eventType: ["wedding", "party", "gathering"],
        contact: "style@bohodreams.com",
      },
      {
        id: "d13",
        name: "Fabric Fantasy",
        specialty: "Elegant drapery, linens, and fabric installations.",
        price: "₹20,000",
        cost: 20000,
        eventType: ["wedding", "corporate"],
        contact: "contact@fabricfantasy.com",
      },
      {
        id: "d5",
        name: "Thematic Creations",
        specialty: "Custom themes like Hollywood, Retro, etc.",
        price: "₹20,000",
        cost: 20000,
        eventType: ["corporate", "party"],
        contact: "themes@creations.com",
      },
      {
        id: "d1",
        name: "Elegant Designs",
        specialty: "Classic and sophisticated event decor.",
        price: "₹35,000",
        cost: 35000,
        eventType: ["wedding", "corporate"],
        contact: "design@elegant.com",
      },
      {
        id: "d14",
        name: "Crystal Carvings",
        specialty: "Stunning custom ice sculptures and bars.",
        price: "₹48,000",
        cost: 48000,
        eventType: ["wedding", "corporate"],
        contact: "contact@crystalcarvings.com",
      },
      {
        id: "d3",
        name: "Modern Visions",
        specialty: "Minimalist and contemporary aesthetics.",
        price: "₹55,000",
        cost: 55000,
        eventType: ["corporate", "party"],
        contact: "contact@modernvisions.com",
      },
      {
        id: "d15",
        name: "Petal & Stem Florists",
        specialty: "Bespoke floral design for any occasion.",
        price: "₹55,000",
        cost: 55000,
        eventType: ["wedding", "corporate"],
        contact: "contact@petalandstem.com",
      },
      {
        id: "d6",
        name: "Luxe Floral Arrangements",
        specialty: "Exotic flowers and grand floral structures.",
        price: "₹90,000",
        cost: 90000,
        eventType: ["wedding"],
        contact: "flowers@luxe.com",
      },
      {
        id: "d16",
        name: "Rustic Charm Designs",
        specialty: "High-end boutique decor with a rustic feel.",
        price: "₹110,000",
        cost: 110000,
        eventType: ["wedding"],
        contact: "contact@rusticcharm.com",
      },
      {
        id: "d7",
        name: "Grand Scale Productions",
        specialty: "Custom sets, lighting, and AV design.",
        price: "₹180,000",
        cost: 180000,
        eventType: ["wedding", "corporate"],
        contact: "productions@grandscale.com",
      },
      {
        id: "d17",
        name: "Luminous Projections",
        specialty: "Jaw-dropping 3D projection mapping on buildings or cakes.",
        price: "₹220,000",
        cost: 220000,
        eventType: ["wedding", "corporate"],
        contact: "contact@luminousprojections.com",
      },
      {
        id: "d18",
        name: "Opulent Occasions",
        specialty: "Ultimate luxury decor for the most lavish events.",
        price: "₹850,000",
        cost: 850000,
        eventType: ["wedding"],
        contact: "contact@opulentoccasions.com",
      },
    ],
  },
  photo_video: {
    title: "Photography & Video",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M12 2v2"/><path d="M6 2v2"/><path d="M18 2v2"/><path d="M2 12h20"/></svg>`,
    items: [
      {
        id: "pv1",
        name: "Snap Happy Booths",
        specialty: "Modern, interactive photo booths with fun props.",
        price: "₹18,000",
        cost: 18000,
        eventType: ["wedding", "party", "corporate"],
        contact: "contact@snaphappy.com",
      },
      {
        id: "pv2",
        name: "Pixel Perfect Moments",
        specialty: "Candid and traditional event photography.",
        price: "₹60,000",
        cost: 60000,
        eventType: ["wedding", "corporate", "party"],
        contact: "contact@pixelperfect.com",
      },
      {
        id: "pv3",
        name: "Aerial Perspectives",
        specialty: "Breathtaking drone photography and videography.",
        price: "₹70,000",
        cost: 70000,
        eventType: ["wedding", "corporate"],
        contact: "contact@aerialperspectives.com",
      },
      {
        id: "pv4",
        name: "Cinematic Tales",
        specialty: "High-quality, story-driven event videography.",
        price: "₹85,000",
        cost: 85000,
        eventType: ["wedding", "corporate"],
        contact: "contact@cinematictales.com",
      },
    ],
  },
  entertainment: {
    title: "Entertainment",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 8 4 4-4 4"/><path d="M8 12h8"/><circle cx="12" cy="12" r="10"/></svg>`,
    items: [
      {
        id: "e10",
        name: "Karaoke Machine Setup",
        specialty: "Karaoke machine rental with mics and screen.",
        price: "₹3,500",
        cost: 3500,
        eventType: ["party"],
        contact: "sing@karaoke.com",
      },
      {
        id: "e7",
        name: "Caricature Artist",
        specialty: "Live drawings of guests for a fun keepsake.",
        price: "₹6,000",
        cost: 6000,
        eventType: ["party", "gathering"],
        contact: "draw@caricature.com",
      },
      {
        id: "e3",
        name: "Acoustic Harmonies",
        specialty: "Solo or duo acoustic performers.",
        price: "₹7,000",
        cost: 7000,
        eventType: ["wedding", "corporate", "gathering"],
        contact: "contact@acousticharmonies.com",
      },
      {
        id: "e4",
        name: "Mystic Magic",
        specialty: "Close-up and stage magic shows.",
        price: "₹9,000",
        cost: 9000,
        eventType: ["party", "gathering"],
        contact: "magic@mystic.com",
      },
      {
        id: "e11",
        name: "The Engaging Orator",
        specialty: "Professional Master of Ceremonies (MC) or host.",
        price: "₹19,000",
        cost: 19000,
        eventType: ["wedding", "corporate"],
        contact: "contact@engagingorator.com",
      },
      {
        id: "e12",
        name: "Mystic Marvels Entertainment",
        specialty: "High-energy magician and illusionist show.",
        price: "₹21,000",
        cost: 21000,
        eventType: ["party", "corporate"],
        contact: "contact@mysticmarvels.com",
      },
      {
        id: "e2",
        name: "DJ Pulse",
        specialty: "High-energy DJ for modern dance parties.",
        price: "₹22,000",
        cost: 22000,
        eventType: ["wedding", "party"],
        contact: "info@djpulse.com",
      },
      {
        id: "e13",
        name: "DJ Rhythmic Beats",
        specialty: "Versatile DJ for weddings and corporate events.",
        price: "₹30,000",
        cost: 30000,
        eventType: ["wedding", "party", "corporate"],
        contact: "contact@rhythmicbeats.com",
      },
      {
        id: "e14",
        name: "Dance Dynamics",
        specialty: "Choreography for sangeet, first dances, and flash mobs.",
        price: "₹26,000",
        cost: 26000,
        eventType: ["wedding", "party"],
        contact: "contact@dancedynamics.com",
      },
      {
        id: "e8",
        name: "String Quartet",
        specialty: "Classical and contemporary music for an elegant touch.",
        price: "₹40,000",
        cost: 40000,
        eventType: ["wedding", "corporate"],
        contact: "booking@stringquartet.com",
      },
      {
        id: "e1",
        name: "Groove Masters Band",
        specialty: "Live band playing pop, rock, and soul.",
        price: "₹60,000",
        cost: 60000,
        eventType: ["wedding", "corporate", "party"],
        contact: "booking@groovemasters.com",
      },
      {
        id: "e15",
        name: "The Harmony Collective",
        specialty: "A premium, multi-piece band for a concert-like experience.",
        price: "₹175,000",
        cost: 175000,
        eventType: ["wedding", "corporate"],
        contact: "contact@harmonycollective.com",
      },
      {
        id: "e6",
        name: "Celebrity Appearance",
        specialty: "Guest appearance by a local celebrity or artist.",
        price: "₹200,000",
        cost: 200000,
        eventType: ["wedding", "corporate"],
        contact: "talent@celebrity.com",
      },
      {
        id: "e16",
        name: "Celestial Sparks Pyrotechnics",
        specialty: "Professional, synchronized firework displays.",
        price: "₹300,000",
        cost: 300000,
        eventType: ["wedding", "corporate"],
        contact: "contact@celestialsparks.com",
      },
    ],
  },
  planning: {
    title: "Planning & Coordination",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    items: [
      {
        id: "p1",
        name: "Sacred Vows Ceremonies",
        specialty: "Professional wedding officiant services.",
        price: "₹16,000",
        cost: 16000,
        eventType: ["wedding"],
        contact: "contact@sacredvows.com",
      },
      {
        id: "p2",
        name: "Seamless Day Events",
        specialty: "On-the-day coordination to ensure everything runs smoothly.",
        price: "₹42,000",
        cost: 42000,
        eventType: ["wedding", "corporate"],
        contact: "contact@seamlessday.com",
      },
      {
        id: "p3",
        name: "Grandeur Events & Co.",
        specialty: "Comprehensive, full-service event planning from start to finish.",
        price: "₹250,000",
        cost: 250000,
        eventType: ["wedding", "corporate"],
        contact: "contact@grandeurevents.com",
      },
    ],
  },
  beauty_style: {
    title: "Beauty & Style",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 0-2 2v1a2 2 0 0 1-2 2H7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-1a2 2 0 0 1-2-2V4a2 2 0 0 0-2-2z"/><path d="M7 2v11"/><path d="M17 2v11"/></svg>`,
    items: [
      {
        id: "bs1",
        name: "Intricate Henna by Aarti",
        specialty: "Traditional and modern henna/mehndi artistry.",
        price: "₹6,000",
        cost: 6000,
        eventType: ["wedding", "party"],
        contact: "contact@hennabyarti.com",
      },
      {
        id: "bs2",
        name: "Glamour by Priya",
        specialty: "Bridal and event makeup artist services.",
        price: "₹22,000",
        cost: 22000,
        eventType: ["wedding", "party"],
        contact: "contact@glamourbypriya.com",
      },
    ],
  },
  stationery: {
    title: "Stationery & Favors",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><path d="M16 16.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/><path d="M8 16.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>`,
    items: [
      {
        id: "s1",
        name: "Ink & Grace Calligraphy",
        specialty: "Handwritten calligraphy for invitations and place cards.",
        price: "₹7,500",
        cost: 7500,
        eventType: ["wedding", "corporate"],
        contact: "contact@inkandgrace.com",
      },
      {
        id: "s2",
        name: "Memorable Tokens",
        specialty: "Custom party favors and gifts for guests.",
        price: "₹11,000",
        cost: 11000,
        eventType: ["wedding", "party", "corporate"],
        contact: "contact@memorabletokens.com",
      },
      {
        id: "s3",
        name: "The Gilded Quill",
        specialty: "Bespoke, luxury invitation design and printing.",
        price: "₹12,000",
        cost: 12000,
        eventType: ["wedding", "corporate"],
        contact: "contact@gildedquill.com",
      },
      {
        id: "s4",
        name: "Digital Invites & More",
        specialty: "Event websites, e-invites, and RSVP management.",
        price: "₹24,000",
        cost: 24000,
        eventType: ["wedding", "corporate", "party"],
        contact: "contact@digitalinvites.com",
      },
    ],
  },
  rentals_services: {
    title: "Rentals & Services",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7H5a7 7 0 0 0 7 7Z"/><path d="M12 2a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7Z"/><path d="M4 9h16v6H4Z"/></svg>`,
    items: [
      {
        id: "rs1",
        name: "Tiny Treasures Rentals",
        specialty: "Rental of small decor items, props, and signage.",
        price: "₹4,000",
        cost: 4000,
        eventType: ["wedding", "party"],
        contact: "contact@tinytreasures.com",
      },
      {
        id: "rs2",
        name: "Helping Hands Hospitality",
        specialty: "Professional waiters, ushers, and event staff.",
        price: "₹32,000",
        cost: 32000,
        eventType: ["wedding", "corporate"],
        contact: "contact@helpinghands.com",
      },
      {
        id: "rs3",
        name: "Swift Valet",
        specialty: "Professional valet parking services for any venue.",
        price: "₹35,000",
        cost: 35000,
        eventType: ["wedding", "corporate"],
        contact: "contact@swiftvalet.com",
      },
      {
        id: "rs4",
        name: "The Gilded Plate",
        specialty: "Rental of premium tableware, cutlery, and glassware.",
        price: "₹38,000",
        cost: 38000,
        eventType: ["wedding", "corporate"],
        contact: "contact@gildedplate.com",
      },
      {
        id: "rs5",
        name: "Sit & Style Rentals",
        specialty: "Stylish furniture rental from chairs to lounge sets.",
        price: "₹50,000",
        cost: 50000,
        eventType: ["wedding", "corporate"],
        contact: "contact@sitandstyle.com",
      },
      {
        id: "rs6",
        name: "Classic Wheels Hire",
        specialty: "Rental of vintage and classic cars for transport.",
        price: "₹52,000",
        cost: 52000,
        eventType: ["wedding"],
        contact: "contact@classicwheels.com",
      },
      {
        id: "rs7",
        name: "Shield Security Solutions",
        specialty: "Professional security personnel for event safety.",
        price: "₹65,000",
        cost: 65000,
        eventType: ["wedding", "corporate"],
        contact: "contact@shieldsecurity.com",
      },
      {
        id: "rs8",
        name: "Royal Carriage Services",
        specialty: "Luxury transportation - limos, coaches, and high-end cars.",
        price: "₹75,000",
        cost: 75000,
        eventType: ["wedding", "corporate"],
        contact: "contact@royalcarriage.com",
      },
      {
        id: "rs9",
        name: "Aura AudioVisuals",
        specialty: "Professional sound systems, lighting, and projectors.",
        price: "₹90,000",
        cost: 90000,
        eventType: ["wedding", "corporate"],
        contact: "contact@auraav.com",
      },
      {
        id: "rs10",
        name: "Canvas Canopy Co.",
        specialty: "High-quality tents, marquees, and canopies for outdoor events.",
        price: "₹125,000",
        cost: 125000,
        eventType: ["wedding", "corporate", "party"],
        contact: "contact@canvascanopy.com",
      },
    ],
  },
}

const checklists = {
  wedding: [
    "Finalize Guest List",
    "Send Invitations",
    "Book Photographer & Videographer",
    "Choose Wedding Attire",
    "Plan Ceremony Details",
    "Finalize Menu with Caterer",
    "Arrange Transportation",
    "Confirm with all Vendors",
  ],
  corporate: [
    "Define Event Goals & Objectives",
    "Set a Budget",
    "Select Venue",
    "Arrange Speakers/Presenters",
    "Plan Agenda/Schedule",
    "Send Invitations & Manage Registration",
    "Coordinate with AV/Technical Team",
    "Organize Catering",
  ],
  party: [
    "Choose a Theme",
    "Create Guest List",
    "Send out Invitations",
    "Plan Menu & Drinks",
    "Organize Music/Entertainment",
    "Buy Decorations",
    "Plan Party Activities/Games",
    "Confirm Venue",
  ],
  gathering: [
    "Decide on a Date & Time",
    "Invite Guests",
    "Plan a Simple Menu",
    "Arrange for Drinks",
    "Create a Music Playlist",
    "Tidy up the Space",
    "Ensure Enough Seating",
  ],
}

let db, auth, userId, eventPlanDocRef, unsubscribe
let selections = {}
let eventCriteria = {}
let filteredVendors = {}
let guestList = []
let timeline = []
let checklist = []

const eventSetupSection = document.getElementById("event-setup")
const plannerMain = document.getElementById("planner-main")
const authContainer = document.getElementById("auth-container")
const tabButtons = document.querySelectorAll(".tab-button")
const tabPanes = document.querySelectorAll(".tab-pane")

eventSetupSection.classList.add("hidden")
plannerMain.classList.add("hidden")

async function handleSignIn() {
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, provider)
  } catch (error) {
    console.error("Sign in error:", error)
  }
}

async function handleSignOut() {
  try {
    await signOut(auth)
    selections = {}
    eventCriteria = {}
    guestList = []
    timeline = []
    checklist = []
  } catch (error) {
    console.error("Sign out error:", error)
  }
}

function showLoginScreen() {
  plannerMain.classList.add("hidden")
  eventSetupSection.classList.add("hidden")
  authContainer.classList.remove("hidden")
  authContainer.innerHTML = `
        <div class="min-h-screen flex flex-col items-center justify-center px-4">
            <div class="absolute inset-0 pointer-events-none overflow-hidden">
                <div class="absolute top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl animate-float"></div>
                <div class="absolute bottom-20 right-10 w-96 h-96 bg-slate-600/5 rounded-full blur-3xl animate-float" style="animation-delay: 2s;"></div>
            </div>
            
            <div class="relative z-10 max-w-md w-full">
                <div class="text-center mb-12">
                    <h1 class="text-6xl font-playfair font-bold text-gradient mb-4 tracking-tight">Celesté</h1>
                    <p class="text-slate-400 text-lg font-light">Bespoke Event Curation</p>
                </div>
                
                <div class="card-3d p-8 text-center">
                    <p class="text-slate-300 mb-8 font-light leading-relaxed">
                        Curate your perfect day with our carefully selected vendors and seamless planning experience.
                    </p>
                    <button id="google-signin-btn" class="btn-primary w-full flex items-center justify-center gap-3 text-base">
                        <svg class="w-5 h-5" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
                        Continue with Google
                    </button>
                </div>
                
                <p class="footer-credit">Made by Aranya</p>
            </div>
        </div>
    `
  document.getElementById("google-signin-btn").addEventListener("click", handleSignIn)
}

function renderEventSetup() {
  eventSetupSection.innerHTML = `
        <div class="max-w-2xl w-full">
            <div class="text-center mb-12">
                <h2 class="text-5xl font-playfair font-bold text-gradient mb-3">Begin Your Celebration</h2>
                <p class="text-slate-400 font-light">Tell us about your event</p>
            </div>
            
            <div class="card-3d p-8">
                <form id="setup-form" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-3">Event Type</label>
                        <select id="event-type" class="w-full bg-slate-800/50 border border-slate-700 rounded-md px-4 py-3 text-slate-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20">
                            <option value="wedding">Wedding</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="party">Birthday / Party</option>
                            <option value="gathering">Casual Gathering</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-slate-300 mb-4">Budget Range</label>
                        <div id="budget-options" class="grid grid-cols-2 gap-3">
                            <label class="budget-label cursor-pointer">
                                <input type="radio" name="budget" value="1000-10000" class="sr-only">
                                <span class="block text-center p-4 card-3d hover:border-emerald-500/50">₹1k - ₹10k</span>
                            </label>
                            <label class="budget-label cursor-pointer">
                                <input type="radio" name="budget" value="10000-25000" class="sr-only" checked>
                                <span class="block text-center p-4 card-3d hover:border-emerald-500/50">₹10k - ₹25k</span>
                            </label>
                            <label class="budget-label cursor-pointer">
                                <input type="radio" name="budget" value="25000-100000" class="sr-only">
                                <span class="block text-center p-4 card-3d hover:border-emerald-500/50">₹25k - ₹1L</span>
                            </label>
                            <label class="budget-label cursor-pointer">
                                <input type="radio" name="budget" value="100000-1000000" class="sr-only">
                                <span class="block text-center p-4 card-3d hover:border-emerald-500/50">₹1L+</span>
                            </label>
                        </div>
                    </div>
                    
                    <button type="submit" class="btn-primary w-full py-4 mt-8 text-lg font-semibold">Start Planning</button>
                </form>
            </div>
        </div>
    `

  document.getElementById("setup-form").addEventListener("submit", handleStartPlanning)
  setupBudgetRadios()
}

function setupBudgetRadios() {
  document.querySelectorAll(".budget-label input").forEach((radio) => {
    radio.addEventListener("change", (e) => {
      document
        .querySelectorAll(".budget-label span")
        .forEach((s) => s.classList.remove("!border-emerald-500", "!bg-emerald-500/10"))
      e.target.closest(".budget-label").querySelector("span").classList.add("!border-emerald-500", "!bg-emerald-500/10")
    })
  })
  document
    .querySelector(".budget-label input[checked]")
    ?.closest(".budget-label")
    .querySelector("span")
    .classList.add("!border-emerald-500", "!bg-emerald-500/10")
}

async function handleStartPlanning(e) {
  e.preventDefault()
  const eventType = document.getElementById("event-type").value
  const budgetRangeEl = document.querySelector('input[name="budget"]:checked')

  if (!budgetRangeEl) {
    alert("Please select a budget.")
    return
  }

  const budgetRange = budgetRangeEl.value
  const newEventPlan = {
    eventCriteria: { type: eventType, budgetRange: budgetRange },
    selections: {},
    guestList: [],
    timeline: [],
    checklist: checklists[eventType].map((task) => ({ task: task, done: false })),
  }

  await setDoc(eventPlanDocRef, newEventPlan)
}

async function initializeFirebase() {
  try {
    const firebaseConfig = {
      apiKey: "AIzaSyC_N0VlG7aDen2PrvqWsmfSV9_z6qkNL14",
      authDomain: "event-management-23529.firebaseapp.com",
      projectId: "event-management-23529",
      storageBucket: "event-management-23529.appspot.com",
      messagingSenderId: "649478128943",
      appId: "1:649478128943:web:2ad8e5cb3352c14d50cdda",
      measurementId: "G-6TJM6KHJMP",
    }
    const app = initializeApp(firebaseConfig)
    db = getFirestore(app)
    auth = getAuth(app)

    onAuthStateChanged(auth, (user) => {
      if (user) {
        userId = user.uid
        authContainer.classList.add("hidden")
        eventPlanDocRef = doc(db, "artifacts", "default-app-id", "users", userId, "eventPlan", "main")

        if (unsubscribe) unsubscribe()

        unsubscribe = onSnapshot(eventPlanDocRef, (doc) => {
          if (doc.exists() && doc.data().eventCriteria && doc.data().eventCriteria.type) {
            const data = doc.data()
            eventCriteria = data.eventCriteria || {}
            selections = data.selections || {}
            guestList = data.guestList || []
            timeline = data.timeline || []
            checklist = data.checklist || []
            loadPlannerState()
          } else {
            showSetupScreen()
          }
        })
      } else {
        if (unsubscribe) unsubscribe()
        userId = null
        showLoginScreen()
      }
    })
  } catch (error) {
    console.error("Firebase initialization failed:", error)
  }
}

function showSetupScreen() {
  plannerMain.classList.add("hidden")
  eventSetupSection.classList.remove("hidden")
  renderEventSetup()
}

function loadPlannerState() {
  filterVendors()
  renderPlannerMain()
  eventSetupSection.classList.add("hidden")
  plannerMain.classList.remove("hidden")
}

function renderPlannerMain() {
  const mainContainer = plannerMain.querySelector(".max-w-7xl")
  mainContainer.innerHTML = `
        <div class="flex justify-between items-center mb-8">
            <h1 class="text-4xl font-playfair font-bold text-gradient">Your Event Plan</h1>
            <div class="flex gap-4 items-center">
                <button id="reset-btn" class="btn-secondary">Start Over</button>
                <div id="user-profile" class="text-sm text-slate-400"></div>
            </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Main Content -->
            <div class="lg:col-span-3 space-y-6">
                <!-- Tab Navigation -->
                <div class="flex gap-2 card-3d p-2">
                    <button class="tab-button active" data-tab="vendors">Vendors</button>
                    <button class="tab-button" data-tab="guests">Guests</button>
                    <button class="tab-button" data-tab="timeline">Timeline</button>
                    <button class="tab-button" data-tab="checklist">Checklist</button>
                </div>
                
                <!-- Tab Content -->
                <div id="tab-content">
                    <div id="vendors-tab" class="tab-pane active space-y-8"></div>
                    <div id="guests-tab" class="tab-pane hidden card-3d p-6"></div>
                    <div id="timeline-tab" class="tab-pane hidden card-3d p-6"></div>
                    <div id="checklist-tab" class="tab-pane hidden card-3d p-6"></div>
                </div>
            </div>
            
            <!-- Sidebar -->
            <div class="lg:col-span-1">
                <div class="card-3d p-6 sticky top-8">
                    <h3 class="text-xl font-playfair font-bold text-gradient mb-6">Summary</h3>
                    <div id="event-details-summary" class="text-sm text-slate-300 space-y-2 mb-6 pb-6 border-b border-slate-700"></div>
                    <div id="summary-section" class="space-y-4"></div>
                </div>
            </div>
        </div>
        
        <div class="footer-credit">Made by Aranya</div>
    `

  renderEventDetailsSummary()
  renderVendors()
  renderGuestList()
  renderTimeline()
  renderChecklist()
  updateSummary()
  attachEventListeners()
}

function attachEventListeners() {
  document.getElementById("reset-btn").addEventListener("click", async () => {
    await setDoc(eventPlanDocRef, {})
  })

  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".tab-button").forEach((b) => b.classList.remove("active"))
      button.classList.add("active")

      document.querySelectorAll(".tab-pane").forEach((pane) => {
        if (pane.id === button.dataset.tab + "-tab") {
          pane.classList.remove("hidden")
        } else {
          pane.classList.add("hidden")
        }
      })
    })
  })
}

function renderEventDetailsSummary() {
  const summary = document.getElementById("event-details-summary")
  const budgetLabel = getBudgetLabel(eventCriteria.budgetRange)
  summary.innerHTML = `
        <div><span class="text-slate-500">Event Type:</span> <span class="text-emerald-400">${eventCriteria.type?.charAt(0).toUpperCase() + eventCriteria.type?.slice(1)}</span></div>
        <div><span class="text-slate-500">Budget:</span> <span class="text-emerald-400">${budgetLabel}</span></div>
    `
}

function getBudgetLabel(range) {
  if (!range) return "N/A"
  const [min, max] = range.split("-").map(Number)
  if (min === 0) return `Under ${formatCurrency(max)}`
  if (max === 1000001) return `Over ${formatCurrency(min)}`
  return `${formatCurrency(min)} - ${formatCurrency(max)}`
}

function formatCurrency(num) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(num)
}

function filterVendors() {
  if (!eventCriteria.type || !eventCriteria.budgetRange) return
  const [minBudget, maxBudget] = eventCriteria.budgetRange.split("-").map(Number)

  filteredVendors = JSON.parse(JSON.stringify(allVendors))
  for (const categoryId in filteredVendors) {
    filteredVendors[categoryId].items = filteredVendors[categoryId].items.filter((vendor) => {
      const inBudget =
        minBudget === 1000001 ? vendor.cost >= minBudget : vendor.cost >= minBudget && vendor.cost <= maxBudget
      return vendor.eventType.includes(eventCriteria.type) && inBudget
    })
  }
}

function renderVendors() {
  const vendorTab = document.getElementById("vendors-tab")
  vendorTab.innerHTML = ""

  for (const categoryId in filteredVendors) {
    const category = filteredVendors[categoryId]
    if (category.items.length === 0) continue

    const categoryElement = document.createElement("div")
    categoryElement.innerHTML = `
            <div class="flex items-center gap-3 mb-6">
                <span class="text-emerald-400">${category.icon}</span>
                <h3 class="text-2xl font-playfair font-bold">${category.title}</h3>
            </div>
            <div id="category-${categoryId}" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        `
    vendorTab.appendChild(categoryElement)

    const categoryContainer = document.getElementById(`category-${categoryId}`)
    category.items.forEach((vendor) => {
      const card = document.createElement("div")
      card.className = "vendor-card"
      card.dataset.categoryId = categoryId
      card.dataset.vendorId = vendor.id
      if (selections[categoryId] === vendor.id) {
        card.classList.add("selected-card")
      }
      card.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h4 class="font-semibold text-white text-lg">${vendor.name}</h4>
                        <p class="text-sm text-slate-400 mt-1">${vendor.specialty}</p>
                    </div>
                    <span class="text-emerald-400 font-semibold">${vendor.price}</span>
                </div>
                <a href="mailto:${vendor.contact}" class="text-xs text-emerald-400 hover:text-emerald-300">Contact</a>
            `
      card.addEventListener("click", () => selectVendor(categoryId, vendor.id))
      categoryContainer.appendChild(card)
    })
  }
}

async function selectVendor(categoryId, vendorId) {
  const newSelections = { ...selections }
  if (newSelections[categoryId] === vendorId) {
    delete newSelections[categoryId]
  } else {
    newSelections[categoryId] = vendorId
  }
  await updateDoc(eventPlanDocRef, { selections: newSelections })
}

function renderGuestList() {
  const guestTab = document.getElementById("guests-tab")
  const attending = guestList.filter((g) => g.status === "Attending").length
  const declined = guestList.filter((g) => g.status === "Declined").length
  const pending = guestList.filter((g) => g.status === "Pending").length

  guestTab.innerHTML = `
        <h3 class="text-xl font-playfair font-bold mb-4">Guest List</h3>
        <div class="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-700/50">
            <div class="text-center">
                <div class="text-2xl font-bold text-emerald-400">${guestList.length}</div>
                <div class="text-xs text-slate-500">Total</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold text-emerald-400">${attending}</div>
                <div class="text-xs text-slate-500">Attending</div>
            </div>
            <div class="text-center">
                <div class="text-2xl font-bold text-slate-500">${pending}</div>
                <div class="text-xs text-slate-500">Pending</div>
            </div>
        </div>
        
        <form id="add-guest-form" class="flex gap-2 mb-6">
            <input type="text" id="guest-name" placeholder="Add guest name" class="flex-grow" required>
            <button type="submit" class="btn-primary px-4 py-2 text-sm">Add</button>
        </form>
        <div id="guest-list-container" class="space-y-2 max-h-96 overflow-y-auto"></div>
    `

  const container = guestTab.querySelector("#guest-list-container")
  guestList.forEach((guest, index) => {
    const guestEl = document.createElement("div")
    guestEl.className = "flex items-center justify-between p-3 card-3d"
    guestEl.innerHTML = `
            <span class="font-medium text-sm">${guest.name}</span>
            <div class="flex items-center gap-2">
                <select data-index="${index}" class="guest-status-select bg-slate-700 border border-slate-600 rounded px-2 py-1 text-xs text-slate-200">
                    <option value="Pending" ${guest.status === "Pending" ? "selected" : ""}>Pending</option>
                    <option value="Attending" ${guest.status === "Attending" ? "selected" : ""}>Attending</option>
                    <option value="Declined" ${guest.status === "Declined" ? "selected" : ""}>Declined</option>
                </select>
                <button data-index="${index}" class="delete-guest-btn text-red-400 hover:text-red-300 font-bold">×</button>
            </div>
        `
    container.appendChild(guestEl)
  })

  document.getElementById("add-guest-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    const input = document.getElementById("guest-name")
    if (input.value.trim()) {
      const newGuestList = [...guestList, { name: input.value.trim(), status: "Pending" }]
      await updateDoc(eventPlanDocRef, { guestList: newGuestList })
      input.value = ""
    }
  })

  document.querySelectorAll(".guest-status-select").forEach((sel) =>
    sel.addEventListener("change", async (e) => {
      const newGuestList = [...guestList]
      newGuestList[e.target.dataset.index].status = e.target.value
      await updateDoc(eventPlanDocRef, { guestList: newGuestList })
    }),
  )

  document.querySelectorAll(".delete-guest-btn").forEach((btn) =>
    btn.addEventListener("click", async (e) => {
      const newGuestList = [...guestList]
      newGuestList.splice(e.target.dataset.index, 1)
      await updateDoc(eventPlanDocRef, { guestList: newGuestList })
    }),
  )
}

function renderTimeline() {
  const timelineTab = document.getElementById("timeline-tab")
  timelineTab.innerHTML = `
        <h3 class="text-xl font-playfair font-bold mb-4">Event Timeline</h3>
        <form id="add-timeline-form" class="flex items-center gap-2 mb-6">
            <input type="time" id="timeline-time" class="flex-1" required>
            <input type="text" id="timeline-activity" placeholder="Activity" class="flex-1" required>
            <button type="submit" class="btn-primary px-4 py-2 text-sm">Add</button>
        </form>
        <div id="timeline-container" class="space-y-2 max-h-96 overflow-y-auto"></div>
    `
  const container = timelineTab.querySelector("#timeline-container")
  const sortedTimeline = [...timeline].sort((a, b) => a.time.localeCompare(b.time))
  sortedTimeline.forEach((item, index) => {
    const itemEl = document.createElement("div")
    itemEl.className = "flex items-center gap-4 p-3 card-3d"
    itemEl.innerHTML = `
            <span class="font-bold text-emerald-400 text-sm">${item.time}</span>
            <span class="text-sm flex-1">${item.activity}</span>
            <button data-original-index="${timeline.indexOf(item)}" class="delete-timeline-btn text-red-400 hover:text-red-300 font-bold">×</button>
        `
    container.appendChild(itemEl)
  })

  document.getElementById("add-timeline-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    const timeInput = document.getElementById("timeline-time")
    const activityInput = document.getElementById("timeline-activity")
    if (timeInput.value && activityInput.value.trim()) {
      const newTimeline = [...timeline, { time: timeInput.value, activity: activityInput.value.trim() }]
      await updateDoc(eventPlanDocRef, { timeline: newTimeline })
      timeInput.value = ""
      activityInput.value = ""
    }
  })

  document.querySelectorAll(".delete-timeline-btn").forEach((btn) =>
    btn.addEventListener("click", async (e) => {
      const newTimeline = [...timeline]
      newTimeline.splice(e.target.dataset.originalIndex, 1)
      await updateDoc(eventPlanDocRef, { timeline: newTimeline })
    }),
  )
}

function renderChecklist() {
  const checklistTab = document.getElementById("checklist-tab")
  checklistTab.innerHTML = `
        <h3 class="text-xl font-playfair font-bold mb-4">Planning Checklist</h3>
        <form id="add-task-form" class="flex gap-2 mb-6">
            <input type="text" id="task-name" placeholder="Add a task" class="flex-grow" required>
            <button type="submit" class="btn-primary px-4 py-2 text-sm">Add</button>
        </form>
        <div id="checklist-container" class="space-y-3 max-h-96 overflow-y-auto"></div>
    `
  const container = checklistTab.querySelector("#checklist-container")
  checklist.forEach((item, index) => {
    const itemEl = document.createElement("label")
    itemEl.className = "flex items-center gap-3 p-3 card-3d cursor-pointer"
    itemEl.innerHTML = `
            <input type="checkbox" data-index="${index}" class="w-5 h-5 rounded cursor-pointer accent-emerald-500" ${item.done ? "checked" : ""}>
            <span class="flex-1 text-sm ${item.done ? "line-through text-slate-500" : ""}">${item.task}</span>
        `
    container.appendChild(itemEl)
  })

  document.getElementById("add-task-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    const input = document.getElementById("task-name")
    if (input.value.trim()) {
      const newChecklist = [...checklist, { task: input.value.trim(), done: false }]
      await updateDoc(eventPlanDocRef, { checklist: newChecklist })
      input.value = ""
    }
  })

  document.querySelectorAll('#checklist-container input[type="checkbox"]').forEach((box) =>
    box.addEventListener("change", async (e) => {
      const newChecklist = [...checklist]
      newChecklist[e.target.dataset.index].done = e.target.checked
      await updateDoc(eventPlanDocRef, { checklist: newChecklist })
    }),
  )
}

function updateSummary() {
  const summarySection = document.getElementById("summary-section")
  summarySection.innerHTML = ""
  let totalCost = 0
  for (const categoryId in selections) {
    const vendorId = selections[categoryId]
    if (allVendors[categoryId] && allVendors[categoryId].items) {
      const vendor = allVendors[categoryId].items.find((v) => v.id === vendorId)
      if (!vendor) continue

      totalCost += vendor.cost
      const summaryItem = document.createElement("div")
      summaryItem.className = "p-4 card-3d border border-emerald-500/30"
      summaryItem.innerHTML = `
                <p class="text-xs text-slate-500 font-medium">${allVendors[categoryId].title}</p>
                <h5 class="font-semibold text-sm text-white mt-2">${vendor.name}</h5>
                <p class="text-emerald-400 font-bold mt-2">${vendor.price}</p>
            `
      summarySection.appendChild(summaryItem)
    }
  }
}

initializeFirebase()
