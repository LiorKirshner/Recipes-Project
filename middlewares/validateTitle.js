const Ajv = require("ajv");
const S = require("fluent-json-schema");

// סכמת title בלבד
const titleSchema = S.object()
  .prop("title", S.string().minLength(3).maxLength(100).required())
  .valueOf(); // הופך ל-JSON Schema רגיל

const ajv = new Ajv();
const validate = ajv.compile(titleSchema);

// Middleware לולידציה של title בלבד
function validateTitle(req, res, next) {
  const valid = validate(req.body);
  if (!valid) {
    return res
      .status(400)
      .json({ error: "Invalid title", details: validate.errors });
  }
  next();
}

module.exports = { validateTitle };
