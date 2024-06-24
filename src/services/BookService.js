import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/books';
const REST_API_BASE_URL_NOT_BOOKS = 'http://localhost:8080/api';
const IMAGE_API_BASE_URL = 'http://localhost:8080/api/images';

export const listBooks = () => axios.get(REST_API_BASE_URL)

export const createBook = (book) => axios.post(REST_API_BASE_URL, book)

export const searchBooks = (bookSearchDto) => axios.post(`${REST_API_BASE_URL}/sort`, bookSearchDto);

export const getImage = (imageName) => axios.get(`${IMAGE_API_BASE_URL}/${encodeURIComponent(imageName)}`, { responseType: 'arraybuffer' });

export const getBook = (id) => axios.get(`${REST_API_BASE_URL}/${id}`);

export const getReviewsByBookId = (bookId) => axios.get(`http://localhost:8080/api/reviews-by-book/${bookId}`);

export const createReview = (review) => axios.post(`http://localhost:8080/api/reviews`, review)

export const createOrderItem = (orderItem) => axios.post(`${REST_API_BASE_URL_NOT_BOOKS}/order-items`, orderItem);

export const createOrder = (order) => axios.post(`${REST_API_BASE_URL_NOT_BOOKS}/orders`, order);

export const getOrderById = (orderId) => axios.get(`${REST_API_BASE_URL_NOT_BOOKS}/orders/${orderId}`);