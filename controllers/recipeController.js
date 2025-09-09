// ייבוא נתוני מתכונים מדומים
const recipes = require("../data/recipes");

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

// Placeholder handlers for missing endpoints
function getRecipeById(req, res) {
  res.status(501).json({ error: "Not implemented" });
}

function createRecipe(req, res) {
  res.status(501).json({ error: "Not implemented" });
}

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
