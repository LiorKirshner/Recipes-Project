// Import mock recipe data
const recipes = require("../data/recipes");
const { v4: uuidv4 } = require("uuid");
const { getRecipeStatsData } = require("../utils/recipeStats");

// GET /api/recipes - Retrieve all recipes with optional filters
function getAllRecipes(req, res, next) {
  try {
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
  } catch (err) {
    next({ statusCode: 500, message: "Failed to get recipes" });
  }
}

// GET /api/recipes/:id - Retrieve a single recipe by ID
function getRecipeById(req, res, next) {
  const { id } = req.params;
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) {
    return next({ statusCode: 404, message: "Recipe not found" });
  }
  res.status(200).json(recipe);
}

// POST /api/recipes - Create a new recipe
function createRecipe(req, res, next) {
  try {
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
  } catch (err) {
    next({ statusCode: 500, message: "Failed to create recipe" });
  }
}

// PUT /api/recipes/:id - Update an existing recipe
function updateRecipe(req, res, next) {
  try {
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
      return next({ statusCode: 404, message: "Recipe not found" });
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
  } catch (err) {
    next({ statusCode: 500, message: "Failed to update recipe" });
  }
}

// DELETE /api/recipes/:id - Delete a recipe by ID
function deleteRecipe(req, res, next) {
  try {
    const { id } = req.params;
    const recipeIndex = recipes.findIndex((r) => r.id === id);
    if (recipeIndex === -1) {
      return next({ statusCode: 404, message: "Recipe not found" });
    }
    const deleted = recipes.splice(recipeIndex, 1)[0];
    console.log(`Recipe deleted: ${id}`);
    res.status(200).json({ message: "Recipe deleted", recipe: deleted });
  } catch (err) {
    next({ statusCode: 500, message: "Failed to delete recipe" });
  }
}

// GET /api/recipes/stats - Return recipe statistics
function getRecipeStats(req, res, next) {
  try {
    const stats = getRecipeStatsData(recipes);
    res.status(200).json(stats);
  } catch (err) {
    next({ statusCode: 500, message: "Failed to get recipe stats" });
  }
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeStats,
};
