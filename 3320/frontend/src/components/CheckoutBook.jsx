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

      const { success } = await response.json();

      if (success) {
        // On successful checkout, redirect to checked-out books page
        navigate("/checked-out-books");
      } else {
        alert("Error checking out book.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
    }
  };

  return (
    <div>
      <h2>Check Out Book</h2>
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
