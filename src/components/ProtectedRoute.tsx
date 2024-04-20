import { Navigate } from "react-router-dom";
import { useAuth } from "../services/authService";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedRoute = ({ children }: any) => {
    const { user } = useAuth()

    if (!user) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return <>{children}</>
};

export default ProtectedRoute