// import axios from 'axios';
//
// const API_URL = 'http://localhost:8080/api/v1/auth';
//
// export const login = async (username, password) => {
//     const response = await axios.post(`${API_URL}/authenticate`, { username, password });
//     if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//     }
//     return response.data;
// };
//
// export const register = async (registerData) => {
//     const response = await axios.post(`${API_URL}/register`, registerData);
//     if (response.data.token) {
//         localStorage.setItem('token', response.data.token);
//     }
//     return response.data;
// };
//
// export const logout = () => {
//     localStorage.removeItem('token');
// };
//
// export const getToken = () => {
//     return localStorage.getItem('token');
// };


import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
            username: username,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const token = response.data.token;
        localStorage.setItem('token', token); // Store token in local storage
        setupAxiosInterceptors(); // Setup interceptors after login
        navigate('/books'); // Navigate to the books page
    } catch (error) {
        console.error('Error during login', error);
    }
};
