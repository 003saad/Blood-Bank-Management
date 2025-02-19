import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../../utils/axiosConfig";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function RegistrationForm() {
  const navigate = useNavigate(); // Initialize navigate hook
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    address: "",
    mobile: "",
    age: "",
    password: "",
    retypePassword: "",
    role: "Both", // Default value for the role dropdown
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [errors, setErrors] = useState({});

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const roles = ["Donor", "Patient", "Both"]; // Available roles

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{11}$/.test(formData.mobile))
      newErrors.mobile = "Invalid mobile number";

    if (!formData.age.trim()) newErrors.age = "Age is required";
    else if (parseInt(formData.age) < 18)
      newErrors.age = "Must be at least 18 years old";

    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.retypePassword) {
      newErrors.retypePassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        // Send data to the backend using axios
        const response = await axiosInstance.post("/auth/register", formData);
        console.log("Registration successful:", response.data);

        // Redirect to login page after successful registration
        navigate("/login");
      } catch (err) {
        // Check if err.response exists
        if (err.response) {
          console.error("Registration failed:", err.response.data);
          // Optionally, display the error message from the backend
        } else {
          console.error("Registration failed: No response received", err);
          // Handle cases where no response is received (network error, timeout, etc.)
        }
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-500/90 to-purple-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Register as a Donor
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="text-white">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-yellow-200 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="bloodGroup" className="text-white">
                Blood Group
              </label>
              <select
                id="bloodGroup"
                name="bloodGroup"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
              {errors.bloodGroup && (
                <p className="text-yellow-200 text-sm mt-1">
                  {errors.bloodGroup}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="text-white">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Your Address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <p className="text-yellow-200 text-sm mt-1">{errors.address}</p>
              )}
            </div>

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
                value={formData.mobile}
                onChange={handleChange}
              />
              {errors.mobile && (
                <p className="text-yellow-200 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label htmlFor="age" className="text-white">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Your Age"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && (
                <p className="text-yellow-200 text-sm mt-1">{errors.age}</p>
              )}
            </div>

            {/* Role Dropdown */}
            <div>
              <label htmlFor="role" className="text-white">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                value={formData.role}
                onChange={handleChange}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
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
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </div>
              {errors.password && (
                <p className="text-yellow-200 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="retypePassword" className="text-white">
                Retype Password
              </label>
              <input
                id="retypePassword"
                name="retypePassword"
                type={showRetypePassword ? "text" : "password"}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Retype Password"
                value={formData.retypePassword}
                onChange={handleChange}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowRetypePassword(!showRetypePassword)}
              >
                {showRetypePassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </div>
              {errors.retypePassword && (
                <p className="text-yellow-200 text-sm mt-1">
                  {errors.retypePassword}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
