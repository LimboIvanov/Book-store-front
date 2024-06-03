import React, {useEffect, useState} from "react";
import {listBooks} from "../sevices/BookService.js";
import { useNavigate } from 'react-router-dom'

const ListBookComponent = () => {

    const [books, setBooks] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        listBooks().then((response) => {
            setBooks(response.data);
        }).catch(error => {
            console.error(error);
        })

        }, [])

    function addNewBook() {
        navigator('/books/add-book')
    }

    function sort() {
        navigator('/books/sort')
    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Books</h2>
            <button className='btn btn-primary mb-2' onClick={addNewBook}>Add Book</button>
            <button className='btn btn-primary mb-2' onClick={sort}>Sort</button>
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
                    <th>Book Image Url</th>
                    <th>Book Rating</th>
                    <th>Book Number</th>
                </tr>
                </thead>
                <tbody>
                {
                    books.map(book =>
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
                        </tr>)
                }
                </tbody>
            </table>
        </div>
    )
}

export default ListBookComponent