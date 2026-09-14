const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
if (!db) {
await client.connect();
db = client.db("giftlink");
console.log("Connected to MongoDB");
}

return db;
}

module.exports = { connectToDatabase };
