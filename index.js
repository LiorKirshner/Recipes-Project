const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Import and use recipe routes under /api/recipes
const recipeRoutes = require("./routes/recipeRoutes");
app.use("/api/recipes", recipeRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
