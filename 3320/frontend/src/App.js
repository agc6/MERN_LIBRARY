import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import AvailableBooks from './components/AvailableBooks';
import CheckedOutBooks from './components/CheckedOutBooks';
import CheckoutBook from './components/CheckoutBook';

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<AvailableBooks />} />
        <Route path="/checked-out" element={<CheckedOutBooks />} />
        <Route path="/checkout/:isbn" element={<CheckoutBook />} />
      </Routes>
    </Router>
  );
}

export default App;
