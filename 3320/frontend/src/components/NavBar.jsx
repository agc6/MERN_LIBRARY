import React from 'react';
import { Link } from 'react-router-dom';

const Navbar() => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Available Books</Link></li>
        <li><Link to="/checked-out">Checked-Out Books</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
