const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipeController");
const { validateRecipe } = require("../middlewares/validation");

// GET all recipes
router.get("/", recipeController.getAllRecipes);

// GET recipe statistics (must come before :id route)
router.get("/stats", recipeController.getRecipeStats);

// GET a single recipe by ID
router.get("/:id", recipeController.getRecipeById);

// POST a new recipe (with validation)
router.post("/", validateRecipe, recipeController.createRecipe);


// PUT (update) a recipe by ID (with validation)
router.put("/:id", validateRecipe, recipeController.updateRecipe);

// PUT /rate/:id - update recipe rating
router.put("/rate/:id", recipeController.rateRecipe);

// DELETE a recipe by ID
router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
