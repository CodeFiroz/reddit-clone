import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { checkAuth } from "../../store/authService";
import { login, logout, setLoading } from "../../store/authSlice";

const ProtectRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchAuth = async () => {
            dispatch(setLoading(true)); // Start loading
            const user = await checkAuth(); // Call API to check auth
            
            if (user) {
                dispatch(login(user)); // Update store if authenticated
            } else {
                dispatch(logout()); // Update store if not authenticated
            }
            dispatch(setLoading(false)); // Stop loading
        };

        fetchAuth();
    }, [dispatch]);

    if (loading) return <p>Loading...</p>; // Show loading state

    return isAuthenticated ? children : <Navigate to="/sign-in" /> ;
};

export default ProtectRoute;
