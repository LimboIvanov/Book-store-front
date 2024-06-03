import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchBooks } from "../sevices/BookService.js";

const SearchBookComponent = () => {
    const [books, setBooks] = useState([]);
    const [searchCriteria, setSearchCriteria] = useState({
        title: "",
        author: "",
        genre: "",
        sort: "title", // Default sorting field
        dir: "ASC", // Default sorting direction
    });

    const navigate = useNavigate();
    const [sortDirection, setSortDirection] = useState("ASC"); // State for sorting direction

    const handleSearch = () => {
        searchBooks({ ...searchCriteria, dir: sortDirection })
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        handleSearch();
    }, []); // Empty dependency array to run only once on component mount

    const toggleSortDirection = () => {
        const newSortDirection = sortDirection === "ASC" ? "DESC" : "ASC";
        setSortDirection(newSortDirection);
    };

    const handleSortColumnChange = (e) => {
        setSearchCriteria({ ...searchCriteria, sort: e.target.value });
    };

    return (
        <div className="container">
            <h2 className="text-center">List of Books</h2>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={searchCriteria.title}
                    onChange={(e) =>
                        setSearchCriteria({ ...searchCriteria, title: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={searchCriteria.author}
                    onChange={(e) =>
                        setSearchCriteria({ ...searchCriteria, author: e.target.value })
                    }
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={searchCriteria.genre}
                    onChange={(e) =>
                        setSearchCriteria({ ...searchCriteria, genre: e.target.value })
                    }
                />
                <select value={searchCriteria.sort} onChange={handleSortColumnChange}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="genre">Genre</option>
                    {/* Add options for other columns as needed */}
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <button onClick={toggleSortDirection}>
                    {`Sort ${sortDirection === "ASC" ? "Ascending" : "Descending"}`}
                </button>
            </div>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Book Id</th>
                    <th>Book Title</th>
                    <th>Book Author</th>
                    <th>Book Genre</th>
                    <th>Book ISBN</th>
                    <th>Book Price</th>
                    <th>Book Description</th>
                    <th>Book Image Url</th>
                    <th>Book Rating</th>
                    <th>Book Inventory Count</th>
                </tr>
                </thead>
                <tbody>
                {books.map((book) => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.genre}</td>
                        <td>{book.isbn}</td>
                        <td>{book.price}</td>
                        <td>{book.description}</td>
                        <td>{book.imageUrl}</td>
                        <td>{book.rating}</td>
                        <td>{book.inventoryCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchBookComponent;
