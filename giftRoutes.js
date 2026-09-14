const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("./db");

const router = express.Router();

// GET /api/gifts - Get all gift items
router.get("/api/gifts", async (req, res) => {
try {
const db = await connectToDatabase();

```
const gifts = await db.collection("gifts").find({}).toArray();

res.status(200).json(gifts);
```

} catch (error) {
console.error("Error fetching gifts:", error);
res.status(500).json({ error: "Failed to fetch gifts" });
}
});

// GET /api/gifts/:id - Get a single gift item by ID
router.get("/api/gifts/:id", async (req, res) => {
try {
const db = await connectToDatabase();

```
const { id } = req.params;

if (!ObjectId.isValid(id)) {
  return res.status(400).json({ error: "Invalid gift ID" });
}

const gift = await db.collection("gifts").findOne({
  _id: new ObjectId(id)
});

if (!gift) {
  return res.status(404).json({ error: "Gift item not found" });
}

res.status(200).json(gift);
```

} catch (error) {
console.error("Error fetching gift:", error);
res.status(500).json({ error: "Failed to fetch gift item" });
}
});

module.exports = router;
