// import axios from 'axios';
//
// export const setupAxiosInterceptors = () => {
//     axios.interceptors.request.use(
//         config => {
//             const token = localStorage.getItem('token'); // Automatically get token from localStorage
//             if (token) {
//                 config.headers.Authorization = `Bearer ${token}`;
//             }
//             return config;
//         },
//         error => {
//             return Promise.reject(error);
//         }
//     );
// };


import axios from 'axios';

// Function to set up Axios interceptors
export const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(config => {
        const token = localStorage.getItem('token');
        if (token && !config.url.includes('/api/v1/auth/')) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, error => {
        return Promise.reject(error);
    });
};

// Call this function on application startup
setupAxiosInterceptors();