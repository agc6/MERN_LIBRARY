import React, {useEffect, useState} from 'react';

const BookList = ({filter}) => {
  const [books, setBooks] = useState([]); //State to store the list of books retrieved from backend 

  //useEffect to fetch data from the backend when the filter changes
  useEffect(() => {
    fetch ('/api/books?status=${filter}')
    .then ((response) => {
      if (!response.ok) {
        throw new Error('HTTP error! status: ${response.status}');
      }
      return response.json();
    })
    .then((data) => setBooks(data)) //Update the state with the retrieved books
    .catch((error) => console.error('Error fetching books:', error));
  }, [filter]);

  return(
    <div>
      {/*Display the title based on the filter type*/ }
      <h2>
        {filter === 'available' ? 'Available Books': 'Checked Out Books'}
      </h2>
      {/*Render list of books*/}
      <ul>
        {/*Iterate through book array and display details*/}
        {books.map((book) => (
      <li key={book.isbn}>
        <strong>{book.title}</strong> by {book.author}
        {filter === 'checked out' && (
        <span> (Checked out by {book.checkedOutBy}, Due:{' '} {new Date(book.dueDate).toLocaleDateString()})</span>
        )}
      </li>
      ))}
      </ul>
    </div>
  );
};

export default BookList;
