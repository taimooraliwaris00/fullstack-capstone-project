const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { connectToDatabase } = require("./db");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "giftlink-secret-key";

// Register a new user
router.post("/api/auth/register", async (req, res) => {
try {
const db = await connectToDatabase();
const users = db.collection("users");

```
const { name, email, password } = req.body;

if (!name || !email || !password) {
  return res.status(400).json({
    message: "Name, email, and password are required"
  });
}

const existingUser = await users.findOne({ email });

if (existingUser) {
  return res.status(409).json({
    message: "User already exists"
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

const result = await users.insertOne({
  name,
  email,
  password: hashedPassword,
  createdAt: new Date()
});

res.status(201).json({
  message: "User registered successfully",
  userId: result.insertedId
});
```

} catch (error) {
console.error("Registration error:", error);
res.status(500).json({
message: "Registration failed"
});
}
});

// Login
router.post("/api/auth/login", async (req, res) => {
try {
const db = await connectToDatabase();
const users = db.collection("users");

```
const { email, password } = req.body;

// Locate the current user using findOne()
const user = await users.findOne({ email });

if (!user) {
  return res.status(401).json({
    message: "Invalid email or password"
  });
}

const passwordMatch = await bcrypt.compare(password, user.password);

if (!passwordMatch) {
  return res.status(401).json({
    message: "Invalid email or password"
  });
}

const token = jwt.sign(
  {
    userId: user._id.toString(),
    email: user.email
  },
  JWT_SECRET,
  { expiresIn: "24h" }
);

res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
});
```

} catch (error) {
console.error("Login error:", error);
res.status(500).json({
message: "Login failed"
});
}
});

// Update current user information
router.put("/api/auth/user", async (req, res) => {
try {
const db = await connectToDatabase();
const users = db.collection("users");

```
const { email, name, newEmail } = req.body;

// Locate the current user using findOne()
const currentUser = await users.findOne({ email });

if (!currentUser) {
  return res.status(404).json({
    message: "User not found"
  });
}

const updateData = {};

if (name) {
  updateData.name = name;
}

if (newEmail) {
  updateData.email = newEmail;
}

await users.updateOne(
  { _id: currentUser._id },
  { $set: updateData }
);

const updatedUser = await users.findOne({
  _id: currentUser._id
});

res.status(200).json({
  message: "User information updated successfully",
  user: updatedUser
});
```

} catch (error) {
console.error("Update user error:", error);
res.status(500).json({
message: "Failed to update user information"
});
}
});

module.exports = router;
