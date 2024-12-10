import React, { useEffect, useState } from "react";

const CheckedOutBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCheckedOutBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/books/checked-out");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching checked-out books:", err);
        setLoading(false);
      }
    };

    fetchCheckedOutBooks();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (books.length === 0) {
    return <p>No checked-out books.</p>;
  }

  const handleCheckIn = async (bookId) => {
    try {
      const response = await fetch('http://localhost:3000/books/checkin/${bookId}', {
        method: "POST",
      });

      if (!response.ok){
        throw new Error("Failed to check-in the book.");
      }

      //Successful check-in, reload the checked-out book list
      window.location.reload();
    }catch(error) {
      console.error("Error checking in book:", error);
    }
  };

  return (
    <div>
      <h1>Checked-Out Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Checked out by:</strong> {book.checkedOutBy}</p>
            <p><strong>Due date:</strong> {book.dueDate}</p>
            <button onClick={() => handleCheckIn(book._id)}>Check In</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckedOutBooks;
