const express = require("express");
const router = express.Router();

// Import controller (to be implemented)
const recipeController = require("../controllers/recipeController");

// GET all recipes
router.get("/", recipeController.getAllRecipes);

// GET a single recipe by ID
router.get("/:id", recipeController.getRecipeById);

// POST a new recipe
router.post("/", recipeController.createRecipe);

// PUT (update) a recipe by ID
router.put("/:id", recipeController.updateRecipe);

// DELETE a recipe by ID
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
