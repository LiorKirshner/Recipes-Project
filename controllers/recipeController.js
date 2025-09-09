// Import mock recipe data
const recipes = require("../data/recipes");
const { v4: uuidv4 } = require("uuid");
const { getRecipeStatsData } = require("../utils/recipeStats");

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

// POST /api/recipes - Create a new recipe
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

  // Validation is handled by middleware

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

// PUT /api/recipes/:id - Update an existing recipe
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

  // Update all fields (validation is handled by middleware)
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
    // id and createdAt remain unchanged
  };

  console.log(`Recipe updated: ${id}`);
  res.status(200).json(recipes[recipeIndex]);
}

// DELETE /api/recipes/:id - Delete a recipe by ID
function deleteRecipe(req, res) {
  const { id } = req.params;
  const recipeIndex = recipes.findIndex((r) => r.id === id);
  if (recipeIndex === -1) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  const deleted = recipes.splice(recipeIndex, 1)[0];
  console.log(`Recipe deleted: ${id}`);
  res.status(200).json({ message: "Recipe deleted", recipe: deleted });
}

// GET /api/recipes/stats - Return recipe statistics
function getRecipeStats(req, res) {
  const stats = getRecipeStatsData(recipes);
  res.status(200).json(stats);
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeStats,
};
