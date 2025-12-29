const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: "Sample Item" }
];

app.post("/api/items", (req, res) => {

  const { name } = req.body;

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
