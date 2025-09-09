const fs = require("fs").promises;
const path = require("path");

const RECIPES_PATH = path.join(__dirname, "../data/recipes.json");

async function readRecipes() {
  try {
    const data = await fs.readFile(RECIPES_PATH, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw {
      statusCode: 500,
      message: "Failed to read recipes file",
      original: err,
    };
  }
}

async function writeRecipes(recipes) {
  try {
    await fs.writeFile(RECIPES_PATH, JSON.stringify(recipes, null, 2), "utf-8");
  } catch (err) {
    throw {
      statusCode: 500,
      message: "Failed to write recipes file",
      original: err,
    };
  }
}

module.exports = { readRecipes, writeRecipes };
