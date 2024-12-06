import React from "react";
import BookList from "../components/BookList";

//Homepage displaying available and checked-out books
const Home = () => {
    return (
        <div>
            <h1>Library Home</h1>
            <BookList filter="available" />
            <BookList filter="checked out" />
        </div>
    );
};

export default Home;
