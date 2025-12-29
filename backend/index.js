const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (NO DATABASE)
let items = [
  { id: 1, name: "Sample Item" }
];

// DEMO POST API (NOT USED BY FRONTEND)
app.post("/api/items", (req, res) => {

  const { name } = req.body;

  // Validation
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newItem = {
    id: Date.now(),
    name
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
