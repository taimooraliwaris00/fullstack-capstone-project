const express = require("express");
const { connectToDatabase } = require("./db");

const router = express.Router();

// GET /api/search - Search gifts by keyword and category
router.get("/api/search", async (req, res) => {
try {
const db = await connectToDatabase();

```
const { query, category } = req.query;

const filter = {};

// Filter results based on category
if (category) {
  filter.category = category;
}

// Filter results based on search keyword
if (query) {
  filter.$or = [
    { title: { $regex: query, $options: "i" } },
    { description: { $regex: query, $options: "i" } }
  ];
}

const gifts = await db
  .collection("gifts")
  .find(filter)
  .toArray();

res.status(200).json(gifts);
```

} catch (error) {
console.error("Search error:", error);
res.status(500).json({ error: "Failed to search gifts" });
}
});

module.exports = router;
