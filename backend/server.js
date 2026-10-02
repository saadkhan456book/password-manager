const cors = require("cors");
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const app = express();
app.use(cors());
app.use(express.json());
let collection;

async function connectDB() {
  await client.connect();

  const db = client.db("passwordmanager");
  collection = db.collection("passwords");

  console.log("Mongodb connected");
}
connectDB();
app.post("/api/passwords", async (req, res) => {
  const PasswordData = req.body;
  await collection.insertOne(PasswordData);

  res.send("password saved successfully");
});

app.get("/api/passwords", async (req, res) => {
  const passwords = await
  collection.find({}).toArray();
  res.json(passwords);
});

app.delete("/api/passwords/:id", async (req, res) => {
  const id = req.params.id;
 await collection.deleteOne({_id: new ObjectId(id)
 });
  res.send("password deleted successfully ");
});

app.put("/api/passwords/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

 await 
 collection.updateOne({_id: new ObjectId(id) },
 { $set : updatedData}
);
  res.send("password updated  successfully ");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
