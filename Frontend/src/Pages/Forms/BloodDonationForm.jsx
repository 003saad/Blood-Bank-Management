import { useState } from "react";
import { useUser } from "../../providers/UserContext";
import axiosInstance from "../../utils/axiosConfig"; // Make sure you import your axiosInstance

export default function BloodDonationForm({
  donorName = "Jane Doe",
  bloodGroup = "O+",
}) {
  const { userData } = useUser();
  const [formData, setFormData] = useState({
    disease: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!formData.disease.trim()) {
      newErrors.disease = "Disease is required";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        // Send data to backend
        const response = await axiosInstance.post("/blood/donate", {
          donorName,
          bloodGroup,
          disease: formData.disease,
          mobile: userData.mobile, // Assuming userData contains the mobile number
        });
        console.log("Blood donation submitted:", response.data);
      } catch (error) {
        console.error("Error submitting donation:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-500/90 to-purple-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full w-full space-y-8 bg-white/10 backdrop-blur-sm p-8 rounded-xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Blood Donation Form
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="text-white">Name</label>
              <input
                type="text"
                value={userData.name}
                disabled
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none sm:text-sm"
              />
            </div>

            <div>
              <label className="text-white">Blood Group</label>
              <input
                type="text"
                value={userData.blood_group}
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
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Disease"
                value={formData.disease}
                onChange={handleChange}
              />
              {errors.disease && (
                <p className="text-yellow-200 text-sm mt-1">{errors.disease}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {isSubmitting ? "Submitting..." : "Submit Donation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
