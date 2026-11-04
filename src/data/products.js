export const PRODUCTS = [
  {
    id: "banarasi-lal-mirch",
    name: "Heirloom Bharwa Banarasi Lal Mirch",
    hindiName: "भरवा बनारसी लाल मिर्च का आचार",
    category: "Chili & Fiery",
    tagline: "Sun-ripened Banarasi thick red chilies stuffed with hand-ground roasted spices",
    description: "Plump, sun-ripened red chilies stuffed by hand with dry-roasted fennel, fenugreek, yellow mustard, and dry mango powder. Immersed in pure cold-pressed Kachi Ghani mustard oil.",
    fullStory: "Every winter, grandmother would inspect individual baskets of Banarasi Lal Mirch arriving at the courtyards. Each chili is slit open, seeded, and tightly packed with our 9-spice heritage blend pounded on a basalt stone sil-batta. It matures on the haveli rooftop for 24 sunny afternoons.",
    badge: "Most Iconic Heirloom",
    isBestseller: true,
    spiceLevel: 3, // 1: Mild, 2: Medium, 3: Hot, 4: Fiery
    spiceText: "Spicy & Robust",
    oilBase: "Kachi Ghani Mustard Oil",
    sunDays: 24,
    rating: 4.95,
    reviewsCount: 1420,
    origin: "Varanasi, Uttar Pradesh",
    harvestYear: "Winter Harvest 2026",
    batch: "BLM-Batch #91",
    inStock: true,
    ingredients: [
      "Sun-Dried Banarasi Whole Red Chilies",
      "Wood-Pressed Cold Mustard Oil (Kachi Ghani)",
      "Yellow Rai (Mustard Seeds)",
      "Dry Mango Powder (Amchur)",
      "Nagori Roasted Saunf (Fennel)",
      "Hathras Shahi Heeng (Asafoetida)",
      "Rock Salt (Sendha Namak)",
      "Kalonji (Nigella Seeds)",
      "Roasted Fenugreek (Methi Dana)"
    ],
    tasteProfile: {
      tanginess: 8,
      spiciness: 8.5,
      crunch: 9,
      aroma: 9.8
    },
    pairings: [
      "Hot triangle ajwain parathas with fresh white butter",
      "Steaming Arhar dal, rice, and roasted papad",
      "Chole Bhature or Poori Aloo"
    ],
    sizes: [
      { size: "250g Glass Jar", price: 230, originalPrice: 270, label: "Starter" },
      { size: "500g Jar (Most Loved)", price: 395, originalPrice: 470, label: "Best Value", popular: true },
      { size: "1kg Heritage Ceramic Barni", price: 749, originalPrice: 890, label: "Ceramic Barni with Muslin Tie" }
    ],
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "ramkela-mango",
    name: "Grandma's Traditional Ramkela Mango Achar",
    hindiName: "असली रामकेला आम का आचार",
    category: "Mango Specials",
    tagline: "Crunchy unpeeled Ramkela raw mango chunks bathed in golden mustard oil & methi",
    description: "The gold standard of North Indian pickles. Hand-cut raw Ramkela mangoes sun-dried with turmeric and sendha namak, tossed in cracked mustard, methi, kalonji, and unrefined wood-pressed oil.",
    fullStory: "Ramkela mangoes from Uttar Pradesh are renowned for their firm, fibrous flesh that remains crunchy even after two years of curing. No peeling is ever done—the peel preserves the juicy crisp snap that pairs with every childhood memory.",
    badge: "Bestseller",
    isBestseller: true,
    spiceLevel: 2,
    spiceText: "Medium Zing",
    oilBase: "Kachi Ghani Mustard Oil",
    sunDays: 21,
    rating: 4.98,
    reviewsCount: 2840,
    origin: "Sambhal, Uttar Pradesh",
    harvestYear: "Summer 2026",
    batch: "RMA-Batch #88",
    inStock: true,
    ingredients: [
      "Raw Ramkela Mangoes (with peel)",
      "Single-Origin Cold-Pressed Mustard Oil",
      "Turmeric (Haldi) from Salem",
      "Cracked Yellow Mustard (Rai Kuria)",
      "Fenugreek Seeds (Methi Dana)",
      "Red Chili Powder",
      "Rock Salt & Sea Salt",
      "Pure Hathras Asafoetida"
    ],
    tasteProfile: {
      tanginess: 9.5,
      spiciness: 7,
      crunch: 10,
      aroma: 9.5
    },
    pairings: [
      "Dal Khichdi loaded with cow desi ghee",
      "Methi Thepla for train journeys",
      "Stuffed Aloo Paratha with curd"
    ],
    sizes: [
      { size: "250g Glass Jar", price: 210, originalPrice: 250, label: "Starter" },
      { size: "500g Jar (Most Loved)", price: 360, originalPrice: 420, label: "Family Size", popular: true },
      { size: "1kg Heritage Ceramic Barni", price: 680, originalPrice: 820, label: "Ceramic Pot Collector's Jar" }
    ],
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "gujarati-aam-chunda",
    name: "Sun-Baked Gujarati Aam Chunda",
    hindiName: "पारंपरिक गुजराती खट्टा-मीठा छूंदा",
    category: "Mango Specials",
    tagline: "Fine mango shreds slowly caramelized under the summer sun with saffron & roasted cumin",
    description: "Finely grated raw Rajapuri mangoes blended with unrefined desi khand and sun-cured for 18 days on the roof until the sugar forms a glistening one-string amber syrup. Infused with Kashmiri saffron and roasted cumin.",
    fullStory: "True Chunda is NEVER cooked on a gas stove. Heat destroys the delicate floral mango aroma. Naani still ties pure white muslin cloth over broad glass vessels and lets the mid-day May sun do its slow alchemical caramelization.",
    badge: "100% Sun-Cooked",
    isBestseller: true,
    spiceLevel: 1,
    spiceText: "Mild & Sweet-Tangy",
    oilBase: "Zero Oil (तेल मुक्त)",
    sunDays: 18,
    rating: 4.92,
    reviewsCount: 1640,
    origin: "Valsad, Gujarat",
    harvestYear: "Summer 2026",
    batch: "GAC-Batch #74",
    inStock: true,
    ingredients: [
      "Grated Raw Rajapuri Mangoes",
      "Desi Khand (Unrefined Raw Cane Sugar)",
      "Roasted Jeera (Cumin)",
      "Kashmiri Saffron Threads (Kesar)",
      "Black Pepper & Clove",
      "Sendha Namak"
    ],
    tasteProfile: {
      tanginess: 8.5,
      spiciness: 3,
      crunch: 6,
      aroma: 10
    },
    pairings: [
      "Crispy Gujarati Thepla & Masala Chai",
      "Mathri & evening snacks",
      "Cheese boards, toast, or sourdough"
    ],
    sizes: [
      { size: "250g Glass Jar", price: 220, originalPrice: 260, label: "Mini" },
      { size: "500g Jar (Most Loved)", price: 380, originalPrice: 450, label: "Most Popular", popular: true },
      { size: "1kg Heritage Ceramic Barni", price: 720, originalPrice: 850, label: "Year-Round Tub" }
    ],
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "sweet-sour-nimbu",
    name: "45-Day Sun-Cured Sweet & Tangy Lemon (Zero Oil)",
    hindiName: "बिना तेल का खट्टा-मीठा नींबू का आचार",
    category: "Citrus & Tangy",
    tagline: "Thin-skinned Kagzi lemons aged with black salt, ajwain, and pure jaggery",
    description: "Thin-skinned paper lemons hand-quartered and aged in rock salt, carom seeds (ajwain), black peppercorns, and organic dark jaggery. Absolutely 0% oil, naturally preserved by its own nectar and spice tannins.",
    fullStory: "This is the treasured digestive pickle that grandmothers in India have given to family members for generations. As the years pass, this achar turns deeply mahogany-black and only gets more aromatic, sweet, and soothing to the stomach.",
    badge: "Digestive Remedy",
    isBestseller: false,
    spiceLevel: 1,
    spiceText: "Tangy & Sweet Zing",
    oilBase: "0% Zero Oil (तेल मुक्त)",
    sunDays: 45,
    rating: 4.96,
    reviewsCount: 980,
    origin: "Nagpur, Maharashtra",
    harvestYear: "Autumn 2026",
    batch: "SSN-Batch #63",
    inStock: true,
    ingredients: [
      "Thin-Skinned Kagzi Lemons",
      "Organic Desi Jaggery (Gur)",
      "Black Salt (Kala Namak)",
      "Crushed Carom Seeds (Ajwain)",
      "Whole Black Peppercorns",
      "Cinnamon & Clove Infusion"
    ],
    tasteProfile: {
      tanginess: 10,
      spiciness: 4,
      crunch: 5,
      aroma: 9.7
    },
    pairings: [
      "Moong Dal Khichdi during upset stomach or detox days",
      "Plain poori or steamed basmati rice",
      "Digestion tonic after heavy feast meals"
    ],
    sizes: [
      { size: "250g Glass Jar", price: 210, originalPrice: 240, label: "Jar" },
      { size: "500g Jar (Most Loved)", price: 360, originalPrice: 420, label: "Pantry Classic", popular: true },
      { size: "1kg Heritage Ceramic Barni", price: 670, originalPrice: 790, label: "Aged Cellar Crock" }
    ],
    image: "https://images.unsplash.com/photo-1590755694764-f52c17100b12?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "hari-mirch-nimbu",
    name: "Fiery Green Chili & Crushed Yellow Mustard",
    hindiName: "तीखी हरी मिर्च और राई का आचार",
    category: "Chili & Fiery",
    tagline: "Crisp green chilies slit & steeped in freshly crushed pungent yellow mustard seeds",
    description: "Slender, spicy green chilies slit down the middle, marinated with fresh lemon juice and coarsely ground yellow rai that releases that signature nasal-clearing authentic mustard wasabi kick.",
    fullStory: "Whenever winter greens like Sarson ka Saag and Makki ki Roti are served, this achar is the centerpiece on the thali. Made in smaller weekly batches so the chilies remain crunchy with a fresh garden snap.",
    badge: "Pungent Mustard Kick",
    isBestseller: false,
    spiceLevel: 4,
    spiceText: "Extra Fiery & Sharp",
    oilBase: "Kachi Ghani Mustard Oil",
    sunDays: 14,
    rating: 4.88,
    reviewsCount: 820,
    origin: "Alwar, Rajasthan",
    harvestYear: "Fresh Winter 2026",
    batch: "HMN-Batch #104",
    inStock: true,
    ingredients: [
      "Crisp Country Green Chilies",
      "Cold-Pressed Mustard Oil",
      "Coarsely Ground Yellow Rai Kuria",
      "Freshly Squeezed Kagzi Lemon Juice",
      "Turmeric & Sea Salt",
      "A pinch of Hing"
    ],
    tasteProfile: {
      tanginess: 8,
      spiciness: 9.8,
      crunch: 9.5,
      aroma: 9.2
    },
    pairings: [
      "Makki ki Roti and Sarson ka Saag",
      "Poha or Upma for a spicy morning awakening",
      "Dal Tadka and Jeera Rice"
    ],
    sizes: [
      { size: "250g Glass Jar", price: 195, originalPrice: 230, label: "Piquant" },
      { size: "500g Jar (Most Loved)", price: 340, originalPrice: 390, label: "Hot Favorite", popular: true }
    ],
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "rajasthani-ker-sangri",
    name: "Royal Rajasthani Ker Sangri & Gunda Heirloom",
    hindiName: "शाही राजस्थानी केर सांगरी व गुंदा आचार",
    category: "Heritage & Rare",
    tagline: "Wild desert berries & dry desert beans soaked in spiced mustard nectar",
    description: "An authentic Marwari royal culinary treasure. Rare wild Ker caper berries and Sangri desert beans hand-harvested from Thar desert scrub, cured with sticky wild Gunda (Lesua) berries in aromatic spices.",
    fullStory: "Our family hails roots from old Bikaner, where Ker Sangri was served at royal wedding banquets. Ker has a deep earthy tang, while Sangri absorbs the rich amchur and kalonji mustard oil. Sourced only once a year.",
    badge: "Rare Royal Heritage",
    isBestseller: true,
    spiceLevel: 2,
    spiceText: "Savory & Earthy",
    oilBase: "Kachi Ghani Mustard Oil",
    sunDays: 28,
    rating: 4.97,
    reviewsCount: 1110,
    origin: "Thar Desert, Bikaner",
    harvestYear: "Special Harvest 2026",
    batch: "RKS-Batch #49",
    inStock: true,
    ingredients: [
      "Wild Hand-Picked Ker Berries",
      "Desert Sangri Beans",
      "Wild Gunda (Lesua) Fruit",
      "Cold-Pressed Mustard Oil",
      "Amchur (Sun-Dried Mango Powder)",
      "Nagori Methi & Saunf",
      "Red Mathania Chili Powder"
    ],
    tasteProfile: {
      tanginess: 8.5,
      spiciness: 6.5,
      crunch: 8,
      aroma: 9.9
    },
    pairings: [
      "Bajra Roti with desi white makkhan and Jaggery",
      "Daal Baati Churma feast",
      "Puri and dry spiced potatoes"
    ],
    sizes: [
      { size: "250g Glass Jar", price: 295, originalPrice: 350, label: "Exclusive" },
      { size: "500g Jar (Most Loved)", price: 540, originalPrice: 620, label: "Connoisseur", popular: true },
      { size: "1kg Heritage Ceramic Barni", price: 990, originalPrice: 1180, label: "Grand Royal Barni" }
    ],
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "andhra-avakaya",
    name: "Fiery Guntur Andhra Mango Avakaya",
    hindiName: "पारंपरिक आंध्रा स्टाइल आवकाया आम आचार",
    category: "Mango Specials",
    tagline: "Intense raw mango chunks soaked in cold-pressed sesame oil with pungent Guntur chili",
    description: "The pride of Telugu households. Hard, sour raw mangoes cut into perfect cubes with the inner stone shell intact to keep the kernel fragrant, drenched in freshly ground pungent mustard powder and fiery red Guntur chillies in cold-pressed sesame gingelly oil.",
    fullStory: "Avakaya making in our family is a day-long ritual. Grandma learned this recipe from our ancestral neighbors in Rajahmundry. The oil must always form a gentle protective ocean over the mangoes, glowing radiant ruby red.",
    badge: "Fiery Soul of Andhra",
    isBestseller: true,
    spiceLevel: 4,
    spiceText: "Volcanic & Rich",
    oilBase: "Cold-Pressed Sesame (Til) Oil",
    sunDays: 14,
    rating: 4.94,
    reviewsCount: 1730,
    origin: "Guntur & Godavari, Andhra",
    harvestYear: "Summer 2026",
    batch: "AA-Batch #77",
    inStock: true,
    ingredients: [
      "Hard Sour Raw Mango Cubes with Inner Shell",
      "Unrefined Chekku Sesame (Gingelly) Oil",
      "Special Pounded Guntur Red Chili Powder",
      "Coarsely Ground Mustard Seeds (Aava Pindi)",
      "Peeled Whole Garlic Cloves (Vellulli)",
      "Rock Salt & Fenugreek Powder"
    ],
    tasteProfile: {
      tanginess: 9,
      spiciness: 10,
      crunch: 10,
      aroma: 9.7
    },
    pairings: [
      "Hot Steaming Rice with generous Cow Ghee (Neyyi)",
      "Curd Rice on a sweltering afternoon",
      "Upma or Dosa with coconut chutney"
    ],
    sizes: [
      { size: "250g Glass Jar", price: 230, originalPrice: 270, label: "Zesty" },
      { size: "500g Jar (Most Loved)", price: 390, originalPrice: 460, label: "Most Wanted", popular: true },
      { size: "1kg Heritage Ceramic Barni", price: 720, originalPrice: 850, label: "Barni Edition" }
    ],
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "gongura-thokku",
    name: "Sun-Cured Gongura Leaf Thokku",
    hindiName: "पारंपरिक गोंगुरा पत्ता थॊक्कु",
    category: "Gourmet Chutneys & Podis",
    tagline: "Sorrel leaves slow-roasted in cold-pressed sesame oil with roasted garlic and fenugreek",
    description: "The legendary Andhra sour leaf chutney. Tender red-stemmed Gongura leaves sun-dried to eliminate every drop of moisture, gently cooked in wood-pressed til oil with spluttered mustard, dry chilies, and roasted garlic cloves.",
    fullStory: "Gongura is celebrated for its natural electric sourness and deep iron content. Naani's thokku can sit on your dining table for months without fading in flavor or tanginess.",
    badge: "100% Traditional",
    isBestseller: false,
    spiceLevel: 3,
    spiceText: "Sour & Fiery",
    oilBase: "Cold-Pressed Sesame Oil",
    sunDays: 10,
    rating: 4.89,
    reviewsCount: 650,
    origin: "Tenali, Andhra Pradesh",
    harvestYear: "Autumn 2026",
    batch: "GT-Batch #52",
    inStock: true,
    ingredients: [
      "Red-Stem Gongura Leaves (Sorrel)",
      "Cold-Pressed Gingelly Oil",
      "Dry Red Guntur Chilies",
      "Roasted Garlic Pods",
      "Tamarind Pulp",
      "Mustard Seeds & Cumin",
      "Rock Salt"
    ],
    tasteProfile: {
      tanginess: 10,
      spiciness: 8,
      crunch: 4,
      aroma: 9.4
    },
    pairings: [
      "Hot rice, crushed papad, and a spoonful of ghee",
      "Idli and crispy Medu Vada",
      "Uttapam topping"
    ],
    sizes: [
      { size: "250g Glass Jar", price: 240, originalPrice: 280, label: "Classic" },
      { size: "500g Jar (Most Loved)", price: 420, originalPrice: 490, label: "Family Jar", popular: true }
    ],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "kolhapuri-thecha",
    name: "Roasted Garlic & Peanut Kolhapuri Thecha",
    hindiName: "कोल्हापुरी भुना लहसुन और मूंगफली ठेचा",
    category: "Gourmet Chutneys & Podis",
    tagline: "Iron skillet roasted green chilies, garlic cloves, and crunchy roasted groundnuts",
    description: "The raw, rustic flavor of rural Maharashtra. Green chilies and whole garlic cloves charred over an iron griddle (tawa), coarsely hand-pounded in an iron mortar with golden roasted peanuts, sea salt, and cumin seeds.",
    fullStory: "No water is added during the pounding. The slight charring on the cast iron infuses a seductive smokiness that wakes up any tired palate instantly.",
    badge: "Smoky Skillet Char",
    isBestseller: true,
    spiceLevel: 4,
    spiceText: "Extra Fiery & Nutty",
    oilBase: "Cold-Pressed Groundnut Oil",
    sunDays: 0,
    rating: 4.93,
    reviewsCount: 1340,
    origin: "Kolhapur, Maharashtra",
    harvestYear: "Fresh Batch 2026",
    batch: "KT-Batch #115",
    inStock: true,
    ingredients: [
      "Char-Roasted Lavangi Green Chilies",
      "Desi Garlic Pods",
      "Roasted Golden Peanuts",
      "Cold-Pressed Groundnut Oil",
      "Cumin Seeds (Jeera)",
      "Rock Salt"
    ],
    tasteProfile: {
      tanginess: 4,
      spiciness: 9.8,
      crunch: 8.5,
      aroma: 9.6
    },
    pairings: [
      "Hot Jowar or Bajra Bhakri with fresh white butter",
      "Vada Pav or layered sandwich spread",
      "Dal Chawal side kick"
    ],
    sizes: [
      { size: "250g Glass Jar", price: 220, originalPrice: 260, label: "Jar" },
      { size: "500g Jar (Most Loved)", price: 380, originalPrice: 440, label: "Double Jar", popular: true }
    ],
    image: "https://images.unsplash.com/photo-1505253758473-96b3015f21c9?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "shahi-amla-murabba",
    name: "Sun-Matured Shahi Amla Murabba with Saffron",
    hindiName: "शाही आंवला मुरब्बा (केसर और इलायची)",
    category: "Citrus & Tangy",
    tagline: "Whole wild Pratapgarh Indian gooseberries soaked in honeyed saffron syrup",
    description: "Large, blemish-free Pratapgarh wild amlas pricked by hand, steamed and slowly steeped in cardamom, cloves, and Kashmiri saffron-infused raw sugar syrup until the gooseberry turns translucent like a jewel.",
    fullStory: "Naani called Amla 'Amrit Phal'. A single piece eaten every morning with a glass of warm milk is the age-old Ayurvedic secret for eyesight, digestion, hair shine, and long-lasting vitality.",
    badge: "Ayurvedic Rasayana",
    isBestseller: false,
    spiceLevel: 1,
    spiceText: "Sweet & Soothing",
    oilBase: "Zero Oil (तेल मुक्त)",
    sunDays: 30,
    rating: 4.96,
    reviewsCount: 890,
    origin: "Pratapgarh, Uttar Pradesh",
    harvestYear: "Winter Harvest 2026",
    batch: "SAM-Batch #41",
    inStock: true,
    ingredients: [
      "Fresh Pratapgarh Wild Amlas (Gooseberry)",
      "Organic Raw Sugar Syrup",
      "Kashmiri Saffron (Kesar)",
      "Crushed Green Cardamom (Elaichi)",
      "Black Pepper & Cloves"
    ],
    tasteProfile: {
      tanginess: 6,
      spiciness: 1,
      crunch: 5,
      aroma: 9.9
    },
    pairings: [
      "One whole piece in the morning on empty stomach",
      "Post-meal sweet palate cleanser",
      "With warm milk or chai"
    ],
    sizes: [
      { size: "500g Jar", price: 390, originalPrice: 460, label: "Standard Jar" },
      { size: "1kg Heritage Ceramic Barni", price: 740, originalPrice: 880, label: "Grand Glass/Barni Jar", popular: true }
    ],
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "madras-gunpowder-podi",
    name: "Heirloom Madras Ghee Roast Gunpowder Podi",
    hindiName: "मद्रास गनपाउडर पोड़ी (इ़डली-डोसा मसाला)",
    category: "Gourmet Chutneys & Podis",
    tagline: "Slow-roasted lentils, curry leaves, red chilies & hing for the ultimate ghee dunk",
    description: "The definitive South Indian table condiment. Chana dal, urad dal, white sesame seeds, and garden-fresh curry leaves dry-roasted to a nutty golden crisp, stone-ground with Byadgi red chilies and crystal sea salt.",
    fullStory: "Mix two spoonfuls of this fragrant podi with hot melted cow ghee or sesame oil, and dip your steaming hot idlis. It creates an aromatic crust that makes your kitchen smell like an authentic South Indian home.",
    badge: "Table Essential",
    isBestseller: true,
    spiceLevel: 2,
    spiceText: "Nutty & Warm Spice",
    oilBase: "Dry Roasted Blend (Dry Podi)",
    sunDays: 0,
    rating: 4.97,
    reviewsCount: 1580,
    origin: "Thanjavur, Tamil Nadu",
    harvestYear: "Fresh Ground 2026",
    batch: "MGP-Batch #96",
    inStock: true,
    ingredients: [
      "Split Bengal Gram (Chana Dal)",
      "Skinless Black Gram (Urad Dal)",
      "Roasted White Sesame Seeds",
      "Sun-Dried Curry Leaves",
      "Byadgi & Guntur Dry Red Chilies",
      "Pure Compounded Hing",
      "Crystal Rock Salt"
    ],
    tasteProfile: {
      tanginess: 3,
      spiciness: 7,
      crunch: 8,
      aroma: 10
    },
    pairings: [
      "Steaming soft idlis drenched in hot desi ghee",
      "Crispy Ghee Roast Dosa",
      "Sprinkled over hot buttered toast or rice"
    ],
    sizes: [
      { size: "200g Tin Container", price: 190, originalPrice: 220, label: "Tin Jar" },
      { size: "400g Refill Value Pack", price: 340, originalPrice: 399, label: "Value Pack", popular: true }
    ],
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: "heritage-trunk-hamper",
    name: "Naani's Heritage Brass-Finished Grand Tasting Trunk",
    hindiName: "नानी का शाही हेरिटेज गिफ्ट ट्रंक (4 आचार सेट)",
    category: "Gift Hampers",
    tagline: "Royal keepsake gift box with 4 signature handcrafted pickles + neem wood spoon",
    description: "The ultimate connoisseur gift box. Contains 4 curated signature jars: Heirloom Banarasi Lal Mirch (250g), Ramkela Mango Achar (250g), Sun-Baked Aam Chunda (250g), and 45-Day Sweet Lemon (250g). Includes a handcrafted neem wood spoon, muslin napkin, and personal wax-sealed blessing card.",
    fullStory: "Designed for housewarmings, Diwali, NRI homecoming gifts, and festive celebrations. Packed in an ornate reusable brass-latched keepsake trunk inspired by royal Rajasthani trousseau boxes.",
    badge: "Luxury Festive Gift",
    isBestseller: true,
    spiceLevel: 2,
    spiceText: "All Flavors (Sweet to Spicy)",
    oilBase: "Assorted Heritage Bases",
    sunDays: 30,
    rating: 4.99,
    reviewsCount: 880,
    origin: "Courtyards of India",
    harvestYear: "Festive Edition 2026",
    batch: "GIFT-TRUNK-2026",
    inStock: true,
    ingredients: [
      "4 Signature Jars (250g each)",
      "Handcrafted Neem Wood Pickle Spoon",
      "Traditional Muslin Cover Ties",
      "Wax-Sealed Naani Blessing Note",
      "Luxury Keepsake Brass-Latched Trunk"
    ],
    tasteProfile: {
      tanginess: 9,
      spiciness: 8,
      crunch: 9,
      aroma: 10
    },
    pairings: [
      "The perfect gift for parents, NRI relatives, and food lovers",
      "The complete royal Indian dining table centerpiece"
    ],
    sizes: [
      { size: "Grand 4-Jar Trunk Set (1kg Total)", price: 1290, originalPrice: 1550, label: "Gift Box", popular: true }
    ],
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=900&q=80"
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Handcrafted Pickles", hindi: "सभी आचार व चटनी", count: 12 },
  { id: "Mango Specials", name: "Mango Specials", hindi: "आम के आचार", count: 3 },
  { id: "Chili & Fiery", name: "Chili & Fiery", hindi: "मिर्च के तीखे आचार", count: 2 },
  { id: "Citrus & Tangy", name: "Citrus & Tangy", hindi: "खट्टे व पाचक आचार", count: 2 },
  { id: "Heritage & Rare", name: "Heritage & Rare", hindi: "पारंपरिक दुर्लभ आचार", count: 1 },
  { id: "Gourmet Chutneys & Podis", name: "Chutneys & Podis", hindi: "चटनी और पोड़ी", count: 3 },
  { id: "Gift Hampers", name: "Gift Hampers", hindi: "शाही उपहार सेट", count: 1 }
];
