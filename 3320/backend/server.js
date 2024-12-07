
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./connection');
const initializeDB = require('./initializeDB');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/books/available', async (req, res) => {
  try {
    const db = await connectDB();
    const books = await db.collection("books").find({ status: "available" }).toArray();
    res.json(books);
  } catch (err) {
    console.error("Error fetching available books:", err);
    res.status(500).send("Internal Server Error");
  }
});
app.get('/books/checked-out', async (req, res) => {
  try {
    const db = await connectDB();
    const checkedOutBooks = await db.collection("books").find({ status: "checked out" }).toArray();

    res.status(200).json(checkedOutBooks);
  } catch (err) {
    console.error("Error fetching checked-out books:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/books/checkout', async (req, res) => {
  try {
    const db = await connectDB();
    const { bookId, checkedOutBy, dueDate } = req.body;

    // Update the book status to 'checked out' and set checkedOutBy and dueDate
    const result = await db.collection("books").updateOne(
      { _id: new ObjectId(bookId) },
      {
        $set: {
          status: "checked out",
          checkedOutBy,
          dueDate,
        }
      }
    );

    if (result.modifiedCount === 1) {
      // Fetch updated list of checked-out books after the checkout operation
      const updatedBooks = await db.collection("books").find({ status: "checked out" }).toArray();
      res.status(200).json({ success: true, books: updatedBooks });
    } else {
      res.status(404).json({ success: false, message: "Book not found or already checked out" });
    }
  } catch (err) {
    console.error("Error checking out book:", err);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(PORT, async () => {
  try {
    await initializeDB(); // Initialize the database with sample data
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("Failed to start server:", err);
  }
});
