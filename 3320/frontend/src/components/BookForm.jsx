import React, {useState} from "react";

const BookForm = () => {
    const [isbn, setIsbn] =useState("");
    const [checkedOutBy, setCheckedOutBy] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the backend
            const response = await fetch("/books/check-out", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({isbn, checkedOutBy, dueDate}),
            });
            //Handle response from the server
            if(response.ok){
                const data = await response.json();
                setMessage('Book "${data.title}" checked out successfully!');
                //Clear form fields
                setIsbn("");
                setCheckedOutBy("");
                setDueDate("");
            } else{
                setMessage("Error: Unable to check out book. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again later.");
        }
    };
//Inputs for relevant info
    return (
        <div>
            <h2> Check Out a Book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ISBN:</label>
                    <input
                    type="text"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    required
                    />
                    </div>
                    <div>
                        <label>Checked Out By:</label>
                        <input
                        type="text"
                        value={checkedOutBy}
                        onChange={(e) => setCheckedOutBy(e.target.value)}
                        required
                        />
                        </div>
                        <div>
                         <label>Due Date:</label>
                         <input
                         type="date"
                         value={dueDate}
                         onChange={(e) => setDueDate(e.target.value)}
                         required
                        />
                        </div>
                        {/*Submission button*/}
                        <button type="submit">Check Out</button>
                        </form>
                        {/*Message displayed after submission*/}
                        {message && <p>{message}</p>}
                        </div>
    );
};

export default BookForm;
