const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'server', 'naani_data.json');

const raw = fs.readFileSync(DATA_FILE, 'utf8');
const db = JSON.parse(raw);

const seedCategories = [
  {
    id: "cat-1",
    name: "Pickle Recipes",
    slug: "pickle-recipes",
    description: "Authentic, step-by-step heirloom pickle and chutney formulations handed down from 1964."
  },
  {
    id: "cat-2",
    name: "Grandma's Kitchen",
    slug: "grandmas-kitchen",
    description: "Ancestral wisdom, earthen haveli rituals, and timeless Indian culinary patience."
  },
  {
    id: "cat-3",
    name: "Indian Food Heritage",
    slug: "indian-food-heritage",
    description: "Deep dives into Varanasi ghats, sun curing courtyards, and forgotten traditional preservation."
  },
  {
    id: "cat-4",
    name: "Ingredients & Health",
    slug: "ingredients-and-health",
    description: "Ayurvedic gut benefits, cold-pressed wood-churned oils, rock salts, and digestive spices."
  },
  {
    id: "cat-5",
    name: "Cooking Tips",
    slug: "cooking-tips",
    description: "Crucial preservation rules, oil blanket secrets, and avoiding humidity contamination."
  },
  {
    id: "cat-6",
    name: "Naani Stories",
    slug: "naani-stories",
    description: "Heartwarming courtyard nostalgia, Badi Amma's laughter, and childhood monsoon memories."
  }
];

const seedMedia = [
  {
    id: "media-1",
    title: "Terrace Sun Curing Barnis",
    url: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85",
    alt: "Traditional ceramic barnis covered in white muslin cloth on rooftop",
    category: "Heritage & Courtyard",
    uploadedAt: "Oct 24, 2026"
  },
  {
    id: "media-2",
    title: "Hand-Pounded Red Chilies & Spices",
    url: "https://images.unsplash.com/photo-1590755694764-f52c17100b12?auto=format&fit=crop&w=1200&q=85",
    alt: "Whole dried red chilies, mustard seeds and spices on rustic wooden board",
    category: "Spices & Ingredients",
    uploadedAt: "Oct 24, 2026"
  },
  {
    id: "media-3",
    title: "Banarasi Bharwa Red Chili Pickles",
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85",
    alt: "Stuffed plump Banarasi red chili achar steeped in golden mustard oil",
    category: "Pickles & Jars",
    uploadedAt: "Oct 24, 2026"
  },
  {
    id: "media-4",
    title: "Kachi Ghani Mustard Oil Pour",
    url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=85",
    alt: "Cold-pressed golden yellow mustard oil being poured",
    category: "Spices & Ingredients",
    uploadedAt: "Oct 24, 2026"
  },
  {
    id: "media-5",
    title: "Ramkela Mango Slices Marinating",
    url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85",
    alt: "Raw green mango cubes seasoned with turmeric and sendha namak",
    category: "Pickles & Jars",
    uploadedAt: "Oct 24, 2026"
  },
  {
    id: "media-6",
    title: "Traditional Indian Thali with Achar",
    url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=85",
    alt: "Authentic Indian lunch thali with paratha, dal, and homemade mango pickle",
    category: "Serving & Thalis",
    uploadedAt: "Oct 24, 2026"
  },
  {
    id: "media-7",
    title: "Sun-Cured Sweet Lemon Kagzi Nimbu",
    url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85",
    alt: "Aged zero-oil sweet and sour lemon pickle in glass jar",
    category: "Pickles & Jars",
    uploadedAt: "Oct 24, 2026"
  },
  {
    id: "media-8",
    title: "Varanasi Ganges Morning Sun",
    url: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85",
    alt: "Dawn sunlight reflecting over the ghats of Varanasi",
    category: "Heritage & Courtyard",
    uploadedAt: "Oct 24, 2026"
  }
];

const seedPosts = [
  {
    id: "post-1",
    title: "The Lost Art of 21-Day Sun Curing in Ceramic Barnis",
    hindiTitle: "मिट्टी की बरनी और 21 दिनों की धूप की प्राचीन परंपरा",
    slug: "lost-art-of-21-day-sun-curing-ceramic-barnis",
    category: "Grandma's Kitchen",
    tags: ["Sun Curing", "Ceramic Barnis", "Ancient Wisdom", "Slow Food"],
    author: "Grandmother Shanti Devi",
    authorRole: "Head Recipe Curator • Estd. 1964",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    excerpt: "Why modern quick-pickling destroys the soul of achar, and how 21 days of rooftop sun-basking in clay barnis creates unmatched probiotic richness and longevity.",
    content: `## Why Real Pickling Can Never Be Rushed

In our ancestral haveli overlooking the holy river Ganges, early morning between October and March was always marked by a singular sacred ritual: the rooftop migration of our ceramic *barnis* (मिट्टी की बरनी).

While modern commercial brands produce vinegar-steeped "pickles" in stainless steel vats within 48 hours using artificial heating and chemical stabilizers, true Indian *achar* is a living, solar-powered alchemy.

---

### The Secret of Glazed Clay (Micro-Aeration Without Light)

Have you ever wondered why our grandmothers insisted on heavy white-and-brown ceramic jars instead of convenient glass or plastic?

- **Zero Light Degradation**: Direct sunlight breaks down delicate essential oils in yellow mustard (*rai*) and fenugreek (*methi*). The dense clay wall blocks 100% of UV rays.
- **Natural Micro-Aeration**: Glazed pottery breathes infinitesimally through microscopic pores, maintaining a steady osmotic pressure without allowing airborne mold spores in.
- **Temperature Buffering**: Clay cools down gently at night and warms up slowly during the day, preventing sudden thermal shock that separates oil from fruit fibers.

> "Achar is not cooked over fire; it is gently ripened by Lord Surya. Every sunrise brings a new layer of aroma."
> — *Badi Amma, Varanasi, 1964*

---

### The 21-Day Solar Journey: Step-by-Step

1. **Days 1 to 5 (Salt Water Drawdown & Osmosis)**: Raw mango chunks or slit chilies are seasoned with Sendha salt and turmeric. Salt draws out moisture, turning the vegetable cell walls tender yet crisp.
2. **Days 6 to 12 (The Spiced Oil Infusion)**: Hand-pounded spices—coarse *saunf*, roasted *kalonji*, yellow mustard, and asafoetida—are folded into pure cold-pressed Kachi Ghani mustard oil.
3. **Days 13 to 21 (Enzymatic Mellowing)**: Covered in breathable bleached cotton muslin (*malmal ka dhaga*), the jars absorb exactly 6 to 7 hours of direct afternoon sun daily. Volatile mustard compounds (*allyl isothiocyanate*) mellow from sharp bite into rich, warm pungency.

---

### Modern Preservation vs. Heritage Patience

| Quality | Factory Vinegar Pickle | Naani's 21-Day Sun Cured |
| :--- | :--- | :--- |
| **Preservative** | Sodium Benzoate / Acetic Acid | Cold-Pressed Mustard Oil & Rock Salt |
| **Aging Vessel** | Plastic or Industrial Metal | Traditional Glazed Ceramic Barni |
| **Texture** | Soft, soggy, artificial bite | Firm crunch that lasts 3+ years |
| **Gut Health** | High synthetic acid | Natural Ayurvedic probiotic flora |

---

### Bringing The Courtyard to Your Dining Table

When you unscrew a jar of Naani Pickles today, inhale deeply. That sharp, appetizing aroma isn't artificial flavoring—it is the captured warmth of 21 sunny afternoons along the banks of the Ganges.`,
    featuredImage: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85",
    readTime: "6 min read",
    status: "published",
    isFeatured: true,
    views: 2480,
    likes: 412,
    createdAt: "2026-10-24T08:00:00Z",
    publishedAt: "October 24, 2026"
  },
  {
    id: "post-2",
    title: "Why Wood-Pressed Kachi Ghani Mustard Oil Is The Soul of Indian Pickles",
    hindiTitle: "कच्ची घानी सरसों का तेल: भारतीय आचार की आत्मा",
    slug: "wood-pressed-kachi-ghani-mustard-oil-benefits",
    category: "Ingredients & Health",
    tags: ["Kachi Ghani", "Mustard Oil", "Ayurveda", "Cold Pressed"],
    author: "Kitchen Herbalist Devika",
    authorRole: "Ayurvedic Food Researcher",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    excerpt: "Discover why refined oils fail in traditional preservation and how wooden Kohlu-pressed mustard oil creates an impermeable antibacterial shield for your pickles.",
    content: `## The Liquid Gold of Ancient Kitchens

Walk into any grandmother's kitchen across northern or eastern India during pickle season, and the pungent, nasal-clearing fragrance of mustard oil is unmistakable. But why has yellow mustard oil been India's quintessential preservation medium for over 2,000 years?

---

### The Disaster of Refined Palm Oil

Industrial food corporations use ultra-refined palm and cottonseed oil because it is cheap and neutral in scent. However, refined oil:
- Is extracted using petroleum solvents like hexane at 200°C temperatures.
- Destroys all natural tocopherols (Vitamin E) and antioxidants.
- Fails to inhibit anaerobic bacteria, forcing companies to inject chemical preservatives like potassium metabisulfite.

---

### The Miracle of Wood-Churned (Kohlu) Extraction

At Naani Pickles, we insist on single-origin black and yellow mustard seeds cold-pressed in traditional wooden rotators (लकड़ी का कोहलू) running at less than 18 RPM:

1. **Natural Antimicrobial Power**: Mustard oil contains *allyl isothiocyanate*, a compound so naturally antibacterial that zero pathogens can survive beneath its surface.
2. **The "Oil Blanket" Mechanism**: Mustard oil has a lower specific gravity and high viscosity. It settles atop fruits, forming a suffocating oxygen barrier that prevents fungal spores from taking root.
3. **Ayurvedic Digestive Ignition**: In Charaka Samhita, mustard oil is described as *Deepana* (kindler of digestive fire) and *Kapha-Vata Shamaka*.

> "If the oil doesn't make your eyes tear slightly when warmed in the sun, it isn't real Kachi Ghani."
> — *Grandmother Shanti Devi*

---

### How to Check Pure Mustard Oil at Home

- **The Chilling Test**: Place a small glass of oil in the refrigerator for 2 hours. Pure mustard oil will remain completely fluid; adulterated palm oil will turn white and solidify.
- **The Color Profile**: Genuine cold-pressed oil carries a deep amber-gold hue with reddish undertones, never pale straw yellow.`,
    featuredImage: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=85",
    readTime: "5 min read",
    status: "published",
    isFeatured: false,
    views: 1840,
    likes: 295,
    createdAt: "2026-10-22T10:00:00Z",
    publishedAt: "October 22, 2026"
  },
  {
    id: "post-3",
    title: "Heirloom Bharwa Banarasi Lal Mirch: The 1964 Rooftop Secret",
    hindiTitle: "भरवा बनारसी लाल मिर्च का आचार: 1964 की गुप्त रेसिपी",
    slug: "heirloom-bharwa-banarasi-lal-mirch-recipe",
    category: "Pickle Recipes",
    tags: ["Banarasi Lal Mirch", "Stuffed Chili", "Varanasi Heritage"],
    author: "Grandmother Shanti Devi",
    authorRole: "Head Recipe Curator • Estd. 1964",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    excerpt: "A look into the labor of love behind stuffing plump Banarasi winter red chilies with stone-ground fennel, amchur, and spiced mustard stuffing.",
    content: `## The Crown Jewel of Uttar Pradesh

No culinary creation evokes winter nostalgia quite like the fat, glistening, ruby-red Banarasi Lal Mirch (बनारसी लाल मिर्च). With its thick fleshy skin and hollow seed core, this heritage winter variety from the fertile silt soils of Mirzapur and Varanasi was practically born to be stuffed.

---

### Ingredients of The 1964 Masala Blend

- **Fennel Seeds (सौंफ)**: Roasted dry on iron skillets until nutty and sweet.
- **Yellow Mustard Kuria (राई दाल)**: Coarsely cracked, releasing pungent sulfur oils.
- **Wild Mango Powder (देसी अमचूर)**: Sun-dried raw green Ramkela mangoes crushed on basalt stone.
- **Kalonji (Nigella)** & **Ajwain**: For digestion and earthy bitterness.
- **Black Salt (काला नमक)** & **Sendha Namak**: Pure mineral balance.
- **Heerasaad Asafoetida (कड़क हींग)**: Sourced from royal Hathras traders.

---

### The Art of Hand-Stuffing

1. **Sun-Wilted Skin**: Freshly picked chilies are wiped clean with a dry cotton cloth and left in the mild morning sun for 4 hours. This makes the skin pliable so it never tears during stuffing.
2. **De-Coring**: Using a small brass spatula, the crown is sliced and interior seeds gently tapped out.
3. **The Tight Stuffing**: The masala paste is blended with lukewarm mustard oil until it resembles damp sand. It is packed into the chili using fingertips—neither too loose, nor too packed to burst.
4. **The Sun Bath**: Packed tightly into ceramic barnis, they are topped with cold-pressed oil and sun-basked for 24 uninterrupted days.

> "A single piece of Bharwa Mirch can turn a humble bowl of Arhar dal and hot rice into a king's banquet."`,
    featuredImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85",
    readTime: "8 min read",
    status: "published",
    isFeatured: false,
    views: 3120,
    likes: 540,
    createdAt: "2026-10-20T14:30:00Z",
    publishedAt: "October 20, 2026"
  },
  {
    id: "post-4",
    title: "The Science Behind Zero-Oil Nimbu Achar: How Sunlight and Salt Preserve for 10+ Years",
    hindiTitle: "बिना तेल का खट्टा-मीठा नींबू का आचार: विज्ञान और औषधीय लाभ",
    slug: "science-behind-zero-oil-lemon-achar",
    category: "Indian Food Heritage",
    tags: ["Zero Oil", "Kagzi Lemon", "Natural Fermentation"],
    author: "Kitchen Herbalist Devika",
    authorRole: "Ayurvedic Food Researcher",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    excerpt: "How a pickle made with 0% oil and 0% synthetic vinegar stays preserved for decades, turning into a treasured black Ayurvedic digestive medicine.",
    content: `## The Miracle of Ancient Digestive Alchemy

Most people believe oil is mandatory for pickle preservation. Yet one of India's most celebrated heirloom preparations—*Khatta Meetha Kagzi Nimbu Achar*—contains absolutely zero drops of oil.

Even more astonishing: this pickle doesn't just last for 12 months; grandmothers across India proudly serve jars aged for 10, 15, and even 25 years!

---

### How Does It Survive Without Oil?

1. **Citric Acid Antiseptic Power**: Paper-thin Kagzi lemons have a natural pH between 2.0 and 2.4. At this acidity level, spoilage bacteria cannot multiply.
2. **Rock Salt Water Activity Reduction**: Sendha salt draws lemon juices into a hypertonic brine, dehydrating any microbe that enters.
3. **Enzymatic Caramelization**: Over years of terrace sun-basking, natural sugars in organic jaggery and lemon peel slowly oxidize, turning the pickle from sunny yellow into a deep molasses-black tincture with the complexity of aged balsamic vinegar.

---

### Ayurvedic Medicine in Every Spoon

- **Instant Relief from Indigestion & Bloating**: Carom seeds (*ajwain*) and black salt stimulate gastric enzyme secretion (*Pachaka Pitta*).
- **Zero Cholesterol & Heart Healthy**: 100% fat-free, making it the perfect dietary accompaniment for seniors and health-conscious eaters.
- **Natural Detoxification**: Helps balance bodily electrolytes after illness or fasting.`,
    featuredImage: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85",
    readTime: "6 min read",
    status: "published",
    isFeatured: false,
    views: 1960,
    likes: 310,
    createdAt: "2026-10-18T11:15:00Z",
    publishedAt: "October 18, 2026"
  },
  {
    id: "post-5",
    title: "Why You Must Never Dip a Wet Spoon: Grandma's 5 Commandments of Achar Preservation",
    hindiTitle: "सूखा चम्मच और तेल का पहरा: आचार को सालों साल सुरक्षित रखने के 5 नियम",
    slug: "grandmas-5-commandments-of-achar-preservation",
    category: "Cooking Tips",
    tags: ["Preservation", "Kitchen Hacks", "Shelf Life"],
    author: "Grandmother Shanti Devi",
    authorRole: "Head Recipe Curator • Estd. 1964",
    authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    excerpt: "Everything you need to know about preserving traditional small-batch pickles at home without refrigeration or chemical stabilizers.",
    content: `## A Treasured Jar Deserves Sacred Respect

You received your artisanal jar of Naani Pickles, packed with 60-year-old grandmother love. But because our products contain zero artificial preservatives or synthetic vinegars, their shelf life in your kitchen depends on following 5 timeless courtyard rules.

---

### 1. The Bone-Dry Spoon Rule (सूखा चम्मच नियम)
Water is the eternal enemy of sun-cured pickles. Even a single droplet of moisture from a washed spoon introduces mold spores (*Aspergillus*).
*Always use a bone-dry wooden, ceramic, or stainless steel spoon.*

### 2. Keep The Oil Blanket Intact (तेल का पहरा)
Whenever you scoop out pickle chunks, use the back of your spoon to gently press remaining pieces beneath the surface of the oil. The fruit should always be submerged under at least a 1/4-inch golden oil blanket.

### 3. Shady Pantry, Never The Refrigerator! (फ्रिज से दूर)
Refrigeration solidifies healthy mustard oils, dulls the fragrance of whole spices, and triggers internal condensation inside the jar lid. Keep your barni in a cool, ventilated pantry corner.

### 4. The Gentle Weekly Swirl (साप्ताहिक घुमाव)
Once a week, gently swirl or tilt your jar so that the spice-infused oil recirculates over the topmost pieces, re-coating every morsel in natural antimicrobial tannins.

### 5. The Monsoon Sun Bath (बरसात में धूप)
If you reside in humid coastal cities like Mumbai, Chennai, or Kolkata, give your sealed jar 2 to 3 hours of bright morning sun once a month during the rainy season.`,
    featuredImage: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85",
    readTime: "4 min read",
    status: "published",
    isFeatured: false,
    views: 1420,
    likes: 245,
    createdAt: "2026-10-15T09:00:00Z",
    publishedAt: "October 15, 2026"
  },
  {
    id: "post-6",
    title: "Tales from a 1964 Varanasi Haveli: How Badi Amma Started with Three Clay Barnis",
    hindiTitle: "1964 की एक बनारसी हवेली की दास्तान: तीन बरनियों से शुरू हुआ सफर",
    slug: "tales-from-1964-varanasi-haveli-badi-amma",
    category: "Naani Stories",
    tags: ["Badi Amma", "Varanasi Haveli", "Nostalgia", "Origin Story"],
    author: "Rohan & Priyanshi Sharma",
    authorRole: "3rd Generation Founders",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    excerpt: "The heartwarming founding story of Naani Pickles: from rooftop clay jars gifted to departing train travelers at Varanasi junction to homes across India.",
    content: `## A Haveli Along The Ganges

In the winter of 1964, in an ancestral haveli nestled within the winding stone alleys of Varanasi, grandmother Shanti Devi (whom we all called *Badi Amma*) was preparing her seasonal batch of Bharwa Lal Mirch and Ramkela Aam Achar.

Whenever cousins or neighbors traveled back to Delhi, Kolkata, or London by train from Varanasi Junction, Badi Amma would wrap a small clay barni in a clean cotton cloth, knot it with jute twine, and place it in their luggage.

> "Take this with you. In unfamiliar cities where you miss home, a spoonful of this will remind you of where you came from."

---

### The Lost Flavor of Real Homes

Over decades, as supermarket shelves filled with mass-manufactured jars loaded with preservatives and vinegar, family members kept asking: *Why can't we buy achar like Badi Amma made?*

That single question sparked Naani Pickles. We made a pledge:
- We will never substitute cold-pressed mustard oil with palm oil.
- We will never speed up the 21-day sun curing process with electric ovens.
- We will never use plastic packaging.

Today, every jar that leaves our kitchen carries that exact same blessing from 1964.`,
    featuredImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=85",
    readTime: "7 min read",
    status: "published",
    isFeatured: false,
    views: 2890,
    likes: 475,
    createdAt: "2026-10-12T16:00:00Z",
    publishedAt: "October 12, 2026"
  }
];

// Seed db if not present
db.blogCategories = seedCategories;
db.blogMedia = seedMedia;
db.blogPosts = seedPosts;

fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
console.log('Seeded blog categories, media, and 6 published articles into naani_data.json!');
