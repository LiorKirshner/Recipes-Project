// Utility functions for recipe statistics
function getRecipeStatsData(recipes) {
  const totalRecipes = recipes.length;
  const avgCookingTime =
    totalRecipes > 0
      ? recipes.reduce((sum, r) => sum + (r.cookingTime || 0), 0) / totalRecipes
      : 0;

  // Count recipes by difficulty
  const byDifficulty = recipes.reduce((acc, r) => {
    acc[r.difficulty] = (acc[r.difficulty] || 0) + 1;
    return acc;
  }, {});

  // Most common ingredients
  const ingredientCount = {};
  recipes.forEach((r) => {
    (r.ingredients || []).forEach((ing) => {
      ingredientCount[ing] = (ingredientCount[ing] || 0) + 1;
    });
  });
  const mostCommonIngredients = Object.entries(ingredientCount)
    .sort((a, b) => b[1] - a[1])
    .map(([ingredient, count]) => ({ ingredient, count }));

  return {
    totalRecipes,
    avgCookingTime,
    recipesByDifficulty: byDifficulty,
    mostCommonIngredients,
  };
}

module.exports = { getRecipeStatsData };
