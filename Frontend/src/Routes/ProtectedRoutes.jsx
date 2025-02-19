import { Navigate } from "react-router-dom";
import { useUser } from "../providers/UserContext"; // Import your context

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { userData, loading } = useUser(); // Get user data and loading state

  if (loading) {
    return <div>Loading...</div>; // Optionally, show a loading spinner
  }

  if (!userData) {
    // Redirect to login if no user data (i.e., user is not logged in)
    return <Navigate to="/login" />;
  }

  return children; // Render the protected component if user is authenticated
};

export default ProtectedRoute;
