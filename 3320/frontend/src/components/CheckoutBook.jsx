import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutBook = ({ bookId }) => {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:3000/books/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId, checkedOutBy: name, dueDate }),
      });

      if (!response.ok) {
        throw new Error('Failed to checkout book');
      }

      const data = await response.json();

      if (data.success) {
       alert('Book checked-out successfully.');
        navigate("/checked-out");
      }else{
        alert(data.message);
      }
    } catch(error){
      console.error("Error during checkout:", error);
      alert("An error occurred while checking out the book.");
    }
  };

  return (
    <div>
      <h2>Check-Out Book</h2>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CheckoutBook;
