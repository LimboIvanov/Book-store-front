import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBook, getReviewsByBookId, getImage, createReview } from '../services/BookService.js';

const BookDetailComponent = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [image, setImage] = useState(null);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' });

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

    const handleAddReview = async (e) => {
        e.preventDefault();

        const review = {
            rating: newReview.rating,
            comment: newReview.comment,
            book: book // Send the full book object
        };

        try {
            const response = await createReview(review);
            setReviews([...reviews, response.data]); // Add new review to existing reviews
            setShowReviewForm(false); // Hide review form after submission
            setNewReview({ rating: '', comment: '' }); // Reset the form
        } catch (error) {
            console.error("Error adding review:", error);
        }
    };

    const handleReviewFormChange = (event) => {
        const { name, value } = event.target;
        setNewReview((prevReview) => ({
            ...prevReview,
            [name]: value
        }));
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

            <button onClick={() => setShowReviewForm(true)}>Add Review</button>

            {showReviewForm && (
                <div>
                    <form onSubmit={handleAddReview}>
                        <div>
                            <label className='form-label'>Comment:</label>
                            <input
                                type='text'
                                placeholder='Write comment here'
                                name='comment'
                                value={newReview.comment}
                                className='form-control'
                                onChange={handleReviewFormChange}
                            />
                        </div>

                        <div>
                            <label className='form-label'>Rating:</label>
                            <input
                                type='number'
                                placeholder='Write rating here'
                                name='rating'
                                value={newReview.rating}
                                className='form-control'
                                onChange={handleReviewFormChange}
                                min="1"
                                max="10"
                            />
                        </div>

                        <button type='submit' className='btn btn-success'>Submit</button>
                    </form>
                </div>
            )}

        </div>
    );
};

export default BookDetailComponent;
