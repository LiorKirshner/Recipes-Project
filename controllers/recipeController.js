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
  res.status(201).json(newRecipe);
}

// Placeholder handlers for missing endpoints
function updateRecipe(req, res) {
  res.status(501).json({ error: "Not implemented" });
}

function deleteRecipe(req, res) {
  res.status(501).json({ error: "Not implemented" });
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
