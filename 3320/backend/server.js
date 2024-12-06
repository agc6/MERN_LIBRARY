const express = require('express');
const { db } = require('./connection');
const initializeDB = require('./initializeDB');
const cors = require('cors');

const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(express.json()); //Built-in middleware to parse JSON requests
app.use(cors()); //Allow React app to communicate with Express

// ROUTES

//List available books
app.get('/books/available', async (req, res) => {
  const books = await db.collection("books").find({ status: "available" }).toArray();
  res.json(books);
});

//List checked-out books
app.get('/books/checked-out', async (req, res) => {
  const books = await db.collection("books").find({ status: "checked out" }).toArray();
  res.json(books);
});

//Check out a book
app.post('/books/check-out', async (req, res) => {
  const { isbn, checkedOutBy, dueDate } = req.body;
  if (!isbn || !checkedOutBy || !dueDate) return res.sendStatus(400);

  const result = await db.collection("books").findOneAndUpdate(
    { isbn, status: "available" },
    { $set: { status: "checked out", checkedOutBy, dueDate } },
    { returnDocument: "after" }
  );

  result.value ? res.json(result.value) : res.sendStatus(404);
});

//Check in a book
app.post('/books/check-in', async (req, res) => {
  const { isbn } = req.body;
  if (!isbn) return res.sendStatus(400);

  const result = await db.collection("books").findOneAndUpdate(
    { isbn, status: "checked out" },
    { $set: { status: "available", checkedOutBy: null, dueDate: null } },
    { returnDocument: "after" }
  );

  result.value ? res.json(result.value) : res.sendStatus(404);
});

//Start server and initialize DB
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await initializeDB();
});
