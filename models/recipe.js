// Recipe data model (in-memory, no DB)
class Recipe {
  constructor({
    id,
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    difficulty,
    rating,
    createdAt,
  }) {
    this.id = id; // string (unique)
    this.title = title; // string
    this.description = description; // string
    this.ingredients = ingredients; // array of strings
    this.instructions = instructions; // array of strings
    this.cookingTime = cookingTime; // number (minutes)
    this.servings = servings; // number
    this.difficulty = difficulty; // 'easy' | 'medium' | 'hard'
    this.rating = rating; // number (e.g., 4.5)
    this.createdAt = createdAt; // ISO string
  }
}

module.exports = Recipe;
