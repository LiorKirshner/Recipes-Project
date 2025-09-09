const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Logger middleware to log all incoming requests with timestamp
const logger = require("./middlewares/logger");
app.use(logger);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API!");
});

// Import and use recipe routes under /api/recipes
const recipeRoutes = require("./routes/recipeRoutes");
app.use("/api/recipes", recipeRoutes);

// Error handling middleware (should be after all routes)
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
