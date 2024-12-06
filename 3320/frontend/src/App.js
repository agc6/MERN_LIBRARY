import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Navbar from './components/NavBar';



const App = () => (
  <Router>
    <Header />
    <Navbar />
    <Home />
    <Checkout />
   
  </Router>
);

export default App;
