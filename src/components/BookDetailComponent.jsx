import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBook, getReviewsByBookId, getImage } from '../services/BookService.js';

const BookDetailComponent = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchBookDetails();
        fetchBookReviews();
    }, [id]);

    const fetchBookDetails = async () => {
        try {
            const response = await getBook(id);
            setBook(response.data);
            fetchImage(id, response.data.imageUrl);
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

    const fetchImage = async (bookId, imageName) => {
        try {
            const response = await getImage(imageName);
            const imageBlob = new Blob([response.data], { type: 'image/jpeg' });
            const imageUrl = URL.createObjectURL(imageBlob);
            setImage(imageUrl);
        } catch (error) {
            console.error("Error fetching the image:", error);
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

            {image ? (
                <img src={image} alt={book.title} style={{ width: '100px', height: '100px' }} />
            ) : (
                'Loading Image...'
            )}

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

            {/*<button onClick={handleBuyClick}>Buy</button>*/}
        </div>
    );
};

export default BookDetailComponent;
