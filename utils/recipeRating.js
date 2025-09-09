// utils/recipeRating.js
// Feature: Recipe rating system (allow rating updates)

const { readRecipes, writeRecipes } = require("./recipesFile");

/**
 * Updates the rating of a recipe by ID.
 * @param {string} id - The recipe ID
 * @param {number} newRating - The new rating value (e.g., 1-5)
 * @returns {Promise<object>} The updated recipe object
 * @throws {Error} If recipe not found or file operation fails
 */
async function updateRecipeRating(id, newRating) {
  if (typeof newRating !== "number" || newRating < 1 || newRating > 5) {
    throw new Error("Rating must be a number between 1 and 5");
  }
  const recipes = await readRecipes();
  const recipeIndex = recipes.findIndex((r) => r.id === id);
  if (recipeIndex === -1) {
    throw new Error("Recipe not found");
  }
  recipes[recipeIndex].rating = newRating;
  await writeRecipes(recipes);
  return recipes[recipeIndex];
}

module.exports = {
  updateRecipeRating,
};
