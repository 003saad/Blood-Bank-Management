import { useState } from "react";
import { useUser } from "../../providers/UserContext";
import axiosInstance from "../../utils/axiosConfig"; // Adjust import path if needed

export default function BloodRequestForm() {
  const { userData } = useUser();
  console.log(userData);

  const [formData, setFormData] = useState({
    disease: "",
    bloodAmount: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // To handle loading state

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

    if (!formData.disease.trim()) newErrors.disease = "Disease is required";
    if (!formData.bloodAmount.trim())
      newErrors.bloodAmount = "Blood amount is required";
    else if (parseInt(formData.bloodAmount) <= 0)
      newErrors.bloodAmount = "Blood amount must be greater than 0";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // If form is valid, submit the data to the backend
      try {
        setLoading(true);
        const response = await axiosInstance.post("/blood/request", {
          ...formData,
          patientId: userData.id, // Add user ID if needed for backend
        });

        // Handle success response
        console.log("Blood request submitted:", response.data);
        // Optionally, reset the form here after successful submission
        setFormData({
          disease: "",
          bloodAmount: "",
        });
      } catch (error) {
        // Handle error response
        console.error("Error submitting blood request:", error);
        alert("There was an error submitting your request. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-500/90 to-purple-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full max-w-lg space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Blood Request Form
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label className="text-white">Patient Name</label>
                <input
                  type="text"
                  value={userData.name}
                  disabled
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none sm:text-sm"
                />
              </div>

              <div>
                <label className="text-white">Patient Age</label>
                <input
                  type="text"
                  value={userData.age}
                  disabled
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="disease" className="text-white">
                  Disease
                </label>
                <input
                  id="disease"
                  name="disease"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Disease"
                  value={formData.disease}
                  onChange={handleChange}
                />
                {errors.disease && (
                  <p className="text-yellow-200 text-sm mt-1">
                    {errors.disease}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="bloodAmount" className="text-white">
                  Blood Amount (ml)
                </label>
                <input
                  id="bloodAmount"
                  name="bloodAmount"
                  type="number"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Blood Amount"
                  value={formData.bloodAmount}
                  onChange={handleChange}
                />
                {errors.bloodAmount && (
                  <p className="text-yellow-200 text-sm mt-1">
                    {errors.bloodAmount}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={loading} // Disable the button while submitting
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                disabled={loading} // Disable the button while submitting
              >
                {loading ? "Submitting..." : "Emergency Request"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
