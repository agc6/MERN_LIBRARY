const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://cavila14:cavila14@cluster0.nx7zj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

const connectDB = async () => {
  if (!db) {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
      db = client.db("libraryDB"); // Replace "libraryDB" with your actual database name
    } catch (err) {
      console.error("Failed to connect to MongoDB:", err);
      throw err;
    }
  }
  return db;
};

module.exports = { connectDB };
