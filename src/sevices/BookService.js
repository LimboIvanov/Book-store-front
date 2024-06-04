import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/books';
const IMAGE_API_BASE_URL = 'http://localhost:8080/api/images';

export const listBooks = () => axios.get(REST_API_BASE_URL)

export const createBook = (book) => axios.post(REST_API_BASE_URL, book)

export const searchBooks = (bookSearchDto) => axios.post(`${REST_API_BASE_URL}/sort`, bookSearchDto);

export const getImage = (imageName) => axios.get(`${IMAGE_API_BASE_URL}/${encodeURIComponent(imageName)}`, { responseType: 'arraybuffer' });