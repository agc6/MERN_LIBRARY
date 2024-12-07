import React, { useEffect, useState } from "react";
import CheckoutBook from './CheckoutBook';

const AvailableBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/books/available");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (books.length === 0) {
    return <p>No available books.</p>;
  }

  return (
    <div>
      <h1>Available Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <CheckoutBook bookId={book._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableBooks;
