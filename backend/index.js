const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/github/:username", async (req, res) => {//here i will receive the request send from frontend
  const { username } = req.params;//

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (!response.ok) {
      return res.status(404).json({ error: "User not found" });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "GitHub API cannot be connected" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
