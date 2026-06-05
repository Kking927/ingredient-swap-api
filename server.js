const express = require('express');
const cors = require('cors'); // Added to fix potential browser origin blocking
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // CRITICAL: Allows Express to parse JSON sent from the UI
app.use(express.static('public')); // Serves your UI file automatically from a folder named public

// Use let to be able to add new substitutions
let substitutions = {
  egg: {
    ingredient: "Egg",
    substitution: "1 tbsp ground flaxseed + 3 tbsp water",
    amountEquivalent: "1 egg",
    bestFor: ["cookies", "muffins", "quick breads"],
    notes: "Let sit 5 minutes to thicken."
  },

  egg_white: {
    ingredient: "Egg White",
    substitution: "2 tbsp aquafaba (chickpea liquid)",
    amountEquivalent: "1 egg white",
    bestFor: ["meringues", "macarons"],
    notes: "Whip like egg whites."
  },

  egg_yolk: {
    ingredient: "Egg Yolk",
    substitution: "2 tbsp silken tofu",
    amountEquivalent: "1 yolk",
    bestFor: ["custards", "rich baked goods"],
    notes: "Blends smoothly."
  },

  buttermilk: {
    ingredient: "Buttermilk",
    substitution: "1 cup milk + 1 tbsp lemon juice or vinegar",
    amountEquivalent: "1 cup",
    bestFor: ["cakes", "biscuits", "pancakes"],
    notes: "Rest 5–10 minutes."
  },

  heavy_cream: {
    ingredient: "Heavy Cream",
    substitution: "3/4 cup milk + 1/4 cup melted butter",
    amountEquivalent: "1 cup",
    bestFor: ["sauces", "desserts"],
    notes: "Best in cooked applications."
  },

  whole_milk: {
    ingredient: "Whole Milk",
    substitution: "1 cup milk + 1 tbsp melted butter",
    amountEquivalent: "1 cup",
    bestFor: ["baking", "cooking"],
    notes: "Adds fat content."
  },

  sour_cream: {
    ingredient: "Sour Cream",
    substitution: "1 cup Greek yogurt",
    amountEquivalent: "1 cup",
    bestFor: ["cakes", "dips"],
    notes: "Tangy alternative."
  },

  cream_cheese: {
    ingredient: "Cream Cheese",
    substitution: "1 cup blended cottage cheese",
    amountEquivalent: "1 cup",
    bestFor: ["cheesecake", "frosting"],
    notes: "Blend until smooth."
  },

  butter: {
    ingredient: "Butter",
    substitution: "1 cup coconut oil or vegan butter",
    amountEquivalent: "1 cup",
    bestFor: ["cookies", "cakes"],
    notes: "May slightly change flavor."
  },

  vegetable_oil: {
    ingredient: "Vegetable Oil",
    substitution: "1 cup applesauce (for baking)",
    amountEquivalent: "1 cup",
    bestFor: ["muffins", "cakes"],
    notes: "Reduces fat."
  },

  canola_oil: {
    ingredient: "Canola Oil",
    substitution: "1 cup melted coconut oil",
    amountEquivalent: "1 cup",
    bestFor: ["baking"],
    notes: "Adds coconut flavor."
  },

  egg_substitute_packaged: {
    ingredient: "Commercial Egg Substitute",
    substitution: "Follow package flax or starch mix equivalent",
    amountEquivalent: "1 egg",
    bestFor: ["baking"],
    notes: "Varies by brand."
  },

  all_purpose_flour: {
    ingredient: "All-Purpose Flour",
    substitution: "1 cup cake flour + 2 tbsp cornstarch",
    amountEquivalent: "1 cup",
    bestFor: ["cakes", "pastries"],
    notes: "Sift together."
  },

  cake_flour: {
    ingredient: "Cake Flour",
    substitution: "1 cup all-purpose flour - 2 tbsp + 2 tbsp cornstarch",
    amountEquivalent: "1 cup",
    bestFor: ["light cakes"],
    notes: "Lower protein content."
  },

  bread_flour: {
    ingredient: "Bread Flour",
    substitution: "1 cup all-purpose flour",
    amountEquivalent: "1 cup",
    bestFor: ["bread"],
    notes: "Slightly less chew."
  },

  self_rising_flour: {
    ingredient: "Self-Rising Flour",
    substitution: "1 cup flour + 1 1/2 tsp baking powder + 1/4 tsp salt",
    amountEquivalent: "1 cup",
    bestFor: ["biscuits", "quick breads"],
    notes: "Mix well."
  },

  whole_wheat_flour: {
    ingredient: "Whole Wheat Flour",
    substitution: "1 cup all-purpose flour",
    amountEquivalent: "1 cup",
    bestFor: ["baking"],
    notes: "Less dense texture."
  },

  almond_flour: {
    ingredient: "Almond Flour",
    substitution: "1 cup oat flour",
    amountEquivalent: "1 cup",
    bestFor: ["gluten-free baking"],
    notes: "Slight texture difference."
  },

  oat_flour: {
    ingredient: "Oat Flour",
    substitution: "1 cup blended oats",
    amountEquivalent: "1 cup",
    bestFor: ["cookies", "pancakes"],
    notes: "Blend until fine."
  },

  brown_sugar: {
    ingredient: "Brown Sugar",
    substitution: "1 cup white sugar + 1 tbsp molasses",
    amountEquivalent: "1 cup",
    bestFor: ["cookies", "cakes"],
    notes: "Mix thoroughly."
  },

  granulated_sugar: {
    ingredient: "Granulated Sugar",
    substitution: "1 cup coconut sugar",
    amountEquivalent: "1 cup",
    bestFor: ["baking"],
    notes: "Slight caramel flavor."
  },

  powdered_sugar: {
    ingredient: "Powdered Sugar",
    substitution: "1 cup blended granulated sugar + 1 tbsp cornstarch",
    amountEquivalent: "1 cup",
    bestFor: ["frosting"],
    notes: "Blend until fine."
  },

  honey: {
    ingredient: "Honey",
    substitution: "1 cup maple syrup",
    amountEquivalent: "1 cup",
    bestFor: ["baking", "glazes"],
    notes: "Reduce other liquids slightly."
  },

  maple_syrup: {
    ingredient: "Maple Syrup",
    substitution: "1 cup honey",
    amountEquivalent: "1 cup",
    bestFor: ["baking"],
    notes: "Slight flavor change."
  },

  molasses: {
    ingredient: "Molasses",
    substitution: "1 cup brown sugar + water",
    amountEquivalent: "1 cup",
    bestFor: ["gingerbread"],
    notes: "Strong flavor substitute."
  },

  corn_syrup: {
    ingredient: "Corn Syrup",
    substitution: "1 cup honey or golden syrup",
    amountEquivalent: "1 cup",
    bestFor: ["candy", "pies"],
    notes: "Slight flavor change."
  },

  baking_powder: {
    ingredient: "Baking Powder",
    substitution: "1/4 tsp baking soda + 1/2 tsp cream of tartar",
    amountEquivalent: "1 tsp",
    bestFor: ["baking"],
    notes: "Use immediately."
  },

  baking_soda: {
    ingredient: "Baking Soda",
    substitution: "3x baking powder amount",
    amountEquivalent: "1 tsp",
    bestFor: ["baking"],
    notes: "Less powerful rise."
  },

  cream_of_tartar: {
    ingredient: "Cream of Tartar",
    substitution: "1 tsp lemon juice or vinegar",
    amountEquivalent: "1 tsp",
    bestFor: ["meringues"],
    notes: "Acidic replacement."
  },

  yeast: {
    ingredient: "Yeast",
    substitution: "Baking powder (not ideal)",
    amountEquivalent: "1 packet",
    bestFor: ["quick breads"],
    notes: "No fermentation."
  },

  cocoa_powder: {
    ingredient: "Cocoa Powder",
    substitution: "Melted chocolate (reduce fat)",
    amountEquivalent: "3 tbsp",
    bestFor: ["brownies", "cakes"],
    notes: "Adjust sugar."
  },

  chocolate_chips: {
    ingredient: "Chocolate Chips",
    substitution: "Chopped chocolate bar",
    amountEquivalent: "1 cup",
    bestFor: ["cookies"],
    notes: "Melts more unevenly."
  },

  cornstarch: {
    ingredient: "Cornstarch",
    substitution: "Arrowroot powder",
    amountEquivalent: "1 tbsp",
    bestFor: ["thickening"],
    notes: "1:1 swap."
  },

  arrowroot: {
    ingredient: "Arrowroot Powder",
    substitution: "Cornstarch",
    amountEquivalent: "1 tbsp",
    bestFor: ["thickening"],
    notes: "Heat sensitive."
  },

  gelatin: {
    ingredient: "Gelatin",
    substitution: "Agar agar",
    amountEquivalent: "1 tbsp",
    bestFor: ["desserts"],
    notes: "Plant-based."
  },

  vegetable_shortening: {
    ingredient: "Shortening",
    substitution: "Butter or coconut oil",
    amountEquivalent: "1 cup",
    bestFor: ["pie crust"],
    notes: "Texture change."
  },

  vanilla_extract: {
    ingredient: "Vanilla Extract",
    substitution: "Vanilla bean paste",
    amountEquivalent: "1 tsp",
    bestFor: ["baking"],
    notes: "Stronger flavor."
  },

  lemon_juice: {
    ingredient: "Lemon Juice",
    substitution: "Vinegar",
    amountEquivalent: "1 tbsp",
    bestFor: ["baking"],
    notes: "Similar acidity."
  },

  vinegar: {
    ingredient: "Vinegar",
    substitution: "Lemon juice",
    amountEquivalent: "1 tbsp",
    bestFor: ["baking"],
    notes: "Mild flavor swap."
  },

  pumpkin_pie_spice: {
    ingredient: "Pumpkin Pie Spice",
    substitution: "Cinnamon + nutmeg + ginger",
    amountEquivalent: "1 tsp",
    bestFor: ["pies", "cakes"],
    notes: "DIY spice blend."
  },

  cinnamon: {
    ingredient: "Cinnamon",
    substitution: "Nutmeg or allspice",
    amountEquivalent: "1 tsp",
    bestFor: ["baking"],
    notes: "Flavor shift."
  },

  nutmeg: {
    ingredient: "Nutmeg",
    substitution: "Cinnamon",
    amountEquivalent: "1 tsp",
    bestFor: ["baking"],
    notes: "Milder spice."
  }
};

// Handles GET /api/search?query=egg
app.get('/api/search', (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  const lowercaseQuery = query.toLowerCase();
  
  // Filter database entries that match the search term
  const results = Object.keys(substitutions)
    .filter(key => 
      key.includes(lowercaseQuery) || 
      substitutions[key].ingredient.toLowerCase().includes(lowercaseQuery)
    )
    .map(key => substitutions[key]);

  res.json(results);
});

// --- NEW ROUTE: PUSH / ADD DATA ---
// Handles POST /api/ingredients
app.post('/api/ingredients', (req, res) => {
  const { ingredient, substitution, amountEquivalent, bestFor, notes } = req.body;

  // Basic validation
  if (!ingredient || !substitution) {
    return res.status(400).json({ error: "Ingredient and substitution fields are required." });
  }

  // Create a database key (e.g., "Heavy Cream" -> "heavy_cream")
  const databaseKey = ingredient.toLowerCase().trim().replace(/\s+/g, '_');

  // Format array if it comes in as a string split by commas
  let bestForArray = bestFor;
  if (typeof bestFor === 'string') {
    bestForArray = bestFor.split(',').map(item => item.trim()).filter(Boolean);
  }

  // Save into in-memory storage object
  substitutions[databaseKey] = {
    ingredient: ingredient.trim(),
    substitution: substitution.trim(),
    amountEquivalent: amountEquivalent ? amountEquivalent.trim() : "1 unit",
    bestFor: bestForArray || [],
    notes: notes ? notes.trim() : ""
  };

  res.status(201).json({ message: "Successfully added!", data: substitutions[databaseKey] });
});

// Existing routes
app.get('/api', (req, res) => {
  res.json(substitutions);
});

app.get('/api/:ingredient', (req, res) => {
  const ingredient = req.params.ingredient.toLowerCase();
  if (substitutions[ingredient]) {
    res.json(substitutions[ingredient]);
  } else {
    res.status(404).json({
      error: "Ingredient not found",
      availableIngredients: Object.keys(substitutions)
    });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
