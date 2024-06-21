// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { setupAxiosInterceptors } from '../services/AxiosInterceptor.js'; // Adjust the path if needed
//
// const LoginComponent = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
//                 username,
//                 password
//             });
//             const token = response.data.token;
//             localStorage.setItem('token', token); // Store token in local storage
//             setupAxiosInterceptors(token);
//             navigate('/books'); // Navigate to the books page
//         } catch (error) {
//             console.error('Error during login', error);
//         }
//     };
//
//     return (
//         <div>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label>Username:</label>
//                     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };
//
// export default LoginComponent;




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { setupAxiosInterceptors } from '../services/AxiosInterceptor.js'; // Adjust the path if needed
//
// const LoginComponent = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
//                 username,
//                 password
//             });
//             const token = response.data.token;
//             localStorage.setItem('token', token); // Store token in local storage
//             setupAxiosInterceptors(); // Setup interceptors after login
//             navigate('/books'); // Navigate to the books page
//         } catch (error) {
//             console.error('Error during login', error);
//         }
//     };
//
//     return (
//         <div>
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label>Username:</label>
//                     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };
//
// export default LoginComponent;





import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setupAxiosInterceptors } from '../services/AxiosInterceptor.js';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
                username,
                password
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

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginComponent;