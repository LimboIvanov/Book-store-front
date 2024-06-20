const useAuth = () => {
    const token = localStorage.getItem('token');
    return !!token; // Return true if token exists
};

export default useAuth;