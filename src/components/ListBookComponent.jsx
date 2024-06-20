import React, { useEffect, useState } from "react";
import { listBooks, getImage, searchBooks } from "../services/BookService.js";
import { useNavigate } from 'react-router-dom';

const ListBookComponent = () => {
    const [books, setBooks] = useState([]);
    const [images, setImages] = useState({});
    const navigator = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await listBooks();
            setBooks(response.data);
            // Fetch images for all books
            response.data.forEach(book => fetchImage(book.id, book.imageUrl));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchImage = async (bookId, imageName) => {
        try {
            const response = await getImage(imageName);
            const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(imageBlob);
            setImages(prevImages => ({ ...prevImages, [bookId]: imageUrl }));
        } catch (error) {
            console.error("Error fetching the image:", error);
        }
    };

    const handleSort = async (sortField, direction) => {
        try {
            const response = await searchBooks({ sort: sortField, dir: direction });
            setBooks(response.data);
        } catch (error) {
            console.error(`Error sorting books by ${sortField} ${direction}:`, error);
        }
    };

    const navigateToDetail = (bookId) => {
        navigator(`/books/${bookId}`);
    };

    return (
        <div className='container'>
            <h2 className='text-center'>List of Books</h2>
            <button className='btn btn-primary mb-2' onClick={() => navigator('/books/add-book')}>Add Book</button>
            <button className='btn btn-primary mb-2' onClick={() => handleSort('price', 'ASC')}>Sort by Price ASC</button>
            <button className='btn btn-primary mb-2' onClick={() => handleSort('price', 'DESC')}>Sort by Price DESC</button>
            <button className='btn btn-primary mb-2' onClick={() => handleSort('rating', 'ASC')}>Sort by Rating ASC</button>
            <button className='btn btn-primary mb-2' onClick={() => handleSort('rating', 'DESC')}>Sort by Rating DESC</button>
            <table className='table table-striped table-bordered'>
                <thead>
                <tr>
                    <th>Book Id</th>
                    <th>Book Title</th>
                    <th>Book Author</th>
                    <th>Book Genre</th>
                    <th>Book ISBN</th>
                    <th>Book Price</th>
                    <th>Book Description</th>
                    <th>Book Image</th>
                    <th>Book Rating</th>
                    <th>Book Number</th>
                </tr>
                </thead>
                <tbody>
                {
                    books.map(book =>
                        <tr key={book.id} onClick={() => navigateToDetail(book.id)}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.isbn}</td>
                            <td>{book.price}</td>
                            <td>{book.description}</td>
                            <td>
                                {images[book.id] ? (
                                    <img
                                        src={images[book.id]}
                                        alt={book.title}
                                        style={{width: '100px', height: '100px'}}
                                    />
                                ) : (
                                    'Loading...'
                                )}
                            </td>
                            <td>{book.rating}</td>
                            <td>{book.inventoryCount}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default ListBookComponent;