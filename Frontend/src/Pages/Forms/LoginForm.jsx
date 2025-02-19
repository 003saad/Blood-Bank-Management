import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axiosInstance from "../../utils/axiosConfig";
import { useUser } from "../../providers/UserContext";

export default function LoginForm() {
  const { setUserData, handleLogin } = useUser();
  const [credentials, setCredentials] = useState({
    mobile: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!credentials.mobile.trim())
      newErrors.mobile = "Mobile number is required";
    else if (!/^\d{11}$/.test(credentials.mobile))
      newErrors.mobile = "Invalid mobile number";

    if (!credentials.password) newErrors.password = "Password is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axiosInstance.post("/auth/login", credentials);
        const { token, userInfo } = response.data;

        localStorage.setItem("saadToken", token);
        setLoggedIn(true);
        // handleLogin(userInfo, token);

        console.log("Login successful", response.data);
        setUserData(response.data.userInfo);
        // Redirect to home page after login
        navigate("/"); // Redirect after successful login
      } catch (err) {
        console.error("Login error:", err);
        setErrors({ form: err.response?.data?.message || "Login failed" });
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("saadToken");
    setLoggedIn(false); // Set loggedIn to false
    setCredentials({ mobile: "", password: "" }); // Clear form fields
    setErrors({}); // Clear errors
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-500/90 to-purple-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Login to your account
          </h2>
        </div>

        {loggedIn ? (
          <div className="text-center">
            <h3 className="text-white">You are logged in!</h3>
            <button
              onClick={handleLogout}
              className="mt-4 text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="mobile" className="text-white">
                  Mobile
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Mobile Number"
                  value={credentials.mobile}
                  onChange={handleChange}
                />
                {errors.mobile && (
                  <p className="text-yellow-200 text-sm mt-1">
                    {errors.mobile}
                  </p>
                )}
              </div>

              <div className="relative">
                <label htmlFor="password" className="text-white">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-8 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-yellow-200 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>

            {errors.form && (
              <p className="text-yellow-200 text-sm mt-1">{errors.form}</p>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign in
              </button>
            </div>
            <p>new in this site? <Link to='/register'>Register Now</Link></p>
          </form>
        )}
      </div>
    </div>
  );
}
