// ייבוא נתוני מתכונים מדומים
const recipes = require("../data/recipes");
const { v4: uuidv4 } = require("uuid");

// GET /api/recipes - Retrieve all recipes with optional filters
function getAllRecipes(req, res) {
  let result = recipes;
  const { difficulty, maxCookingTime, search } = req.query;

  if (difficulty) {
    result = result.filter((r) => r.difficulty === difficulty);
  }
  if (maxCookingTime) {
    const maxTime = Number(maxCookingTime);
    if (!isNaN(maxTime)) {
      result = result.filter((r) => r.cookingTime <= maxTime);
    }
  }
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(
      (r) =>
        (r.title && r.title.toLowerCase().includes(s)) ||
        (r.description && r.description.toLowerCase().includes(s))
    );
  }
  res.status(200).json(result);
}

// GET /api/recipes/:id - Retrieve a single recipe by ID
function getRecipeById(req, res) {
  const { id } = req.params;
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  res.status(200).json(recipe);
}

// Create a new recipe
function createRecipe(req, res) {
  const {
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    difficulty,
    rating,
  } = req.body;

  // כאן הוולידציה כבר נעשית במידלוור

  const newRecipe = {
    id: uuidv4(),
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    difficulty,
    rating: typeof rating === "number" ? rating : null,
    createdAt: new Date().toISOString(),
  };
  recipes.push(newRecipe);
  console.log(`New recipe created: ${newRecipe.title} (ID: ${newRecipe.id})`);
  res.status(201).json(newRecipe);
}

// Update all fields of a recipe by id
function updateRecipe(req, res) {
  const { id } = req.params;
  const {
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    difficulty,
    rating,
  } = req.body;

  const recipeIndex = recipes.findIndex((r) => r.id === id);
  if (recipeIndex === -1) {
    return res.status(404).json({ error: "Recipe not found" });
  }

  // עדכון כל השדות (בהנחה שוולידציה כבר בוצעה במידלוור)
  recipes[recipeIndex] = {
    ...recipes[recipeIndex],
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    difficulty,
    rating: typeof rating === "number" ? rating : null,
    // לא נוגעים ב-id וב-createdAt
  };

  console.log(`Recipe updated: ${id}`);
  res.status(200).json(recipes[recipeIndex]);
}

// Delete a recipe by ID
function deleteRecipe(req, res) {
  const { id } = req.params;
  const recipeIndex = recipes.findIndex((r) => r.id === id);
  if (recipeIndex === -1) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  const deleted = recipes.splice(recipeIndex, 1)[0];
  console.log(`Recipe deleted: ${id}`);
  res.status(204).json({ message: "Recipe deleted", recipe: deleted });
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
