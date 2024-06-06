import React, { useState, useEffect } from
        'react';
import { useParams } from 'react-router-dom';
import {getBook, getReviewsByBookId} from '../services/BookService.js';

const BookDetailComponent = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchBookDetails();
        fetchBookReviews();
    }, [id]);

    const fetchBookDetails = async () => {
        try {
            const response = await getBook(id);
            setBook(response.data);
        } catch (error) {
            console.error("Error fetching book details:", error);
        }
    };

    const fetchBookReviews = async () => {
        try {
            const response = await getReviewsByBookId(id);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching book reviews:", error);
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>ISBN: {book.isbn}</p>
            <p>Price: {book.price}</p>
            <p>Description: {book.description}</p>
            <p>Rating: {book.rating}</p>
            <p>Inventory Count: {book.inventoryCount}</p>
            <img src={`http://localhost:8080/api/images/${encodeURIComponent(book.imageUrl)}`} alt={book.title} />

            <h3>Reviews</h3>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.id}>
                        <p>Rating: {review.rating}</p>
                        <p>Comment: {review.comment}</p>
                        <p>Created At: {review.createdAt}</p>
                        <p>Created By: {review.createdBy.name}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>No reviews available for this book.</p>
            )}
        </div>
    );
};

export default BookDetailComponent;
