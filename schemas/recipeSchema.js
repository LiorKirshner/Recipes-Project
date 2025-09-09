const S = require("fluent-json-schema");

const recipeSchema = S.object()
  .prop("title", S.string().minLength(3).maxLength(100).required())
  .prop("description", S.string().minLength(10).maxLength(500).required())
  .prop("ingredients", S.array().items(S.string()).minItems(1).required())
  .prop("instructions", S.array().items(S.string()).minItems(1).required())
  .prop("cookingTime", S.number().exclusiveMinimum(0).required())
  .prop("servings", S.integer().minimum(1).required())
  .prop("difficulty", S.string().enum(["easy", "medium", "hard"]).required());

module.exports = recipeSchema;
