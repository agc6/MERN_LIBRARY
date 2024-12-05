import React, {useEffect, useState} from 'react';
import axios from 'axios';

const BookList = ({filter}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/api/books?status=${filter}')
    .then((response) => setBooks(response.data))
    .catch((error) => console.error('Error fetching books:', error));
  }, [filter]);

  return(
    <div>
      <h2>
        {filter === 'available' ? 'Available Books': 'Checked Out Books'}
      </h2>
      <ul>
        {books.map((book) => (
      <li key={book.isbn}>
        <strong>{book.title}</strong> by {book.author}
        {filter === 'checked out' && (
        <span> (Checked out by {book.checkedOutBy}, Due: {new Date(book.dueDate).toLocaleDateString()})</span>
        )}
      </li>
      ))}
      </ul>
    </div>
  );
};

export default BookList;
