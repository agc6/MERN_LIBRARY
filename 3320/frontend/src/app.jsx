import React from 'react';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
     <Routes>
       <Route path= "/" element={<Home />} />
       <Route path=" /checkout" element={<Checkout />} />
     </Routes>
  </Router>
  );
};

export default App;
  
