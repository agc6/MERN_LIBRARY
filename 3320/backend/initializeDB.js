const client = require('./connection');

const dbName = "libraryDB";
const collectionName = "books";

async function initializeDB() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const sampleBooks = [
    { title: "1984", author: "George Orwell", publisher: "Secker & Warburg", isbn: "9780451524935", status: "available", checkedOutBy: null, dueDate: null },
    { title: "To Kill a Mockingbird", author: "Harper Lee", publisher: "J.B. Lippincott & Co.", isbn: "9780060935467", status: "available", checkedOutBy: null, dueDate: null },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", publisher: "Charles Scribner's Sons", isbn: "9780743273565", status: "available", checkedOutBy: null, dueDate: null },
    { title: "Moby Dick", author: "Herman Melville", publisher: "Harper & Brothers", isbn: "9780142437247", status: "available", checkedOutBy: null, dueDate: null },
    { title: "Pride and Prejudice", author: "Jane Austen", publisher: "T. Egerton", isbn: "9780141439518", status: "available", checkedOutBy: null, dueDate: null },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", publisher: "Little, Brown and Company", isbn: "9780316769488", status: "available", checkedOutBy: null, dueDate: null },
    { title: "The Hobbit", author: "J.R.R. Tolkien", publisher: "George Allen & Unwin", isbn: "9780345339683", status: "available", checkedOutBy: null, dueDate: null },
    { title: "Fahrenheit 451", author: "Ray Bradbury", publisher: "Ballantine Books", isbn: "9780345342966", status: "available", checkedOutBy: null, dueDate: null },
    { title: "Brave New World", author: "Aldous Huxley", publisher: "Chatto & Windus", isbn: "9780060850524", status: "available", checkedOutBy: null, dueDate: null },
    { title: "Jane Eyre", author: "Charlotte Brontë", publisher: "Smith, Elder & Co.", isbn: "9780142437209", status: "available", checkedOutBy: null, dueDate: null }
  ];

  const existingBooks = await collection.countDocuments();
  if (existingBooks === 0) {
    await collection.insertMany(sampleBooks);
    console.log("Database initialized with sample books.");
  }
}

module.exports = initializeDB;
