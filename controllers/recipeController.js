const { getRecipeStatsData } = require("../utils/recipeStats");
const { readRecipes, writeRecipes } = require("../utils/recipesFile");
const { v4: uuidv4 } = require("uuid");

// GET /api/recipes - Retrieve all recipes with optional filters
async function getAllRecipes(req, res, next) {
  try {
    let recipes = await readRecipes();
    const { difficulty, maxCookingTime, search } = req.query;

    if (difficulty) {
      recipes = recipes.filter((r) => r.difficulty === difficulty);
    }
    if (maxCookingTime) {
      const maxTime = Number(maxCookingTime);
      if (!isNaN(maxTime)) {
        recipes = recipes.filter((r) => r.cookingTime <= maxTime);
      }
    }
    if (search) {
      const s = search.toLowerCase();
      recipes = recipes.filter(
        (r) =>
          (r.title && r.title.toLowerCase().includes(s)) ||
          (r.description && r.description.toLowerCase().includes(s))
      );
    }
    res.status(200).json(recipes);
  } catch (err) {
    next({ statusCode: 500, message: "Failed to get recipes", original: err });
  }
}

// GET /api/recipes/:id - Retrieve a single recipe by ID
async function getRecipeById(req, res, next) {
  try {
    const { id } = req.params;
    const recipes = await readRecipes();
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe) {
      return next({ statusCode: 404, message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (err) {
    next({ statusCode: 500, message: "Failed to get recipe", original: err });
  }
}

// POST /api/recipes - Create a new recipe
async function createRecipe(req, res, next) {
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

    const recipes = await readRecipes();
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
    await writeRecipes(recipes);
    console.log(`New recipe created: ${newRecipe.title} (ID: ${newRecipe.id})`);
    res.status(201).json(newRecipe);
  } catch (err) {
    next({
      statusCode: 500,
      message: "Failed to create recipe",
      original: err,
    });
  }
}

// PUT /api/recipes/:id - Update an existing recipe
async function updateRecipe(req, res, next) {
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

    const recipes = await readRecipes();
    const recipeIndex = recipes.findIndex((r) => r.id === id);
    if (recipeIndex === -1) {
      return next({ statusCode: 404, message: "Recipe not found" });
    }

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
    await writeRecipes(recipes);
    console.log(`Recipe updated: ${id}`);
    res.status(200).json(recipes[recipeIndex]);
  } catch (err) {
    next({
      statusCode: 500,
      message: "Failed to update recipe",
      original: err,
    });
  }
}

// DELETE /api/recipes/:id - Delete a recipe by ID
async function deleteRecipe(req, res, next) {
  try {
    const { id } = req.params;
    const recipes = await readRecipes();
    const recipeIndex = recipes.findIndex((r) => r.id === id);
    if (recipeIndex === -1) {
      return next({ statusCode: 404, message: "Recipe not found" });
    }
    const deleted = recipes.splice(recipeIndex, 1)[0];
    await writeRecipes(recipes);
    console.log(`Recipe deleted: ${id}`);
    res.status(200).json({ message: "Recipe deleted", recipe: deleted });
  } catch (err) {
    next({
      statusCode: 500,
      message: "Failed to delete recipe",
      original: err,
    });
  }
}

// GET /api/recipes/stats - Return recipe statistics
async function getRecipeStats(req, res, next) {
  try {
    const recipes = await readRecipes();
    const stats = getRecipeStatsData(recipes);
    res.status(200).json(stats);
  } catch (err) {
    next({
      statusCode: 500,
      message: "Failed to get recipe stats",
      original: err,
    });
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
