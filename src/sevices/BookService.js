import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/books';

export const listBooks = () => axios.get(REST_API_BASE_URL)

export const createBook = (book) => axios.post(REST_API_BASE_URL, book)