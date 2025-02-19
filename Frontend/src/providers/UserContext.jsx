import { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../utils/axiosConfig"; // Adjust the import path as needed

// Create the UserContext
const UserContext = createContext();

// Create a custom hook to access the context
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component to provide the context to your app
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null); // State to store user data
  const [token, setToken] = useState(null); // Token state
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserData = async () => {
      const storedToken = localStorage.getItem("saadToken");
      console.log("Stored Token:", storedToken);

      // Check if token is available before attempting to fetch user data
      if (storedToken) {
        setToken(storedToken); // Store the token in state

        try {
          const response = await axiosInstance.get("/auth/info", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          console.log("User data response:", response.data);

          if (response.data) {
            setUserData(response.data); // Set user data
          } else {
            console.error("No user data returned from API");
            setUserData(null); // Handle no data case
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
          localStorage.removeItem("saadToken"); // Clear invalid token
          setUserData(null); // Clear user data in case of error
        }
      } else {
        console.error("Token not found in localStorage");
        setUserData(null); // Clear user data if no token is found
      }

      setLoading(false); // Stop loading once data is fetched
    };

    fetchUserData();
  }, []); // Runs once on initial load

  const handleLogin = (user, tokens) => {
    localStorage.setItem("saadToken", tokens); // Replace with real token after successful login
    setUserData(user); // Update user data after login
    setToken(tokens); // Update token after login
  };

  const handleLogout = () => {
    localStorage.removeItem("saadToken");
    setUserData(null); // Clear user data
    setToken(null); // Clear token
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        loading,
        token,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
