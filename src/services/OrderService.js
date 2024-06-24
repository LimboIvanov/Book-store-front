import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/orders';

export const getOrder = (userId) => axios.get(`${REST_API_BASE_URL}/user/${userId}`);
