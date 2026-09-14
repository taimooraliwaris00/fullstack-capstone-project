const express = require("express");
const cors = require("cors");

const giftRoutes = require("./giftRoutes");
const searchRoutes = require("./searchRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Gift routes
app.use(giftRoutes);

// Search routes - serves /api/search
app.use("/api/search", searchRoutes);

app.get("/", (req, res) => {
res.json({
message: "Welcome to GiftLink API"
});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
console.log(`GiftLink server running on port ${PORT}`);
});

module.exports = app;
