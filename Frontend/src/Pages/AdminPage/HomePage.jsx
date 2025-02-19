import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig"; // Ensure this path is correct
import { Heart } from "lucide-react";

export default function HomePage() {
  const [bloodInventoryData, setBloodInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBloodInventory = async () => {
      try {
        const response = await axiosInstance.get("/admin/bloodcount");
        setBloodInventoryData(response.data.result); // Assuming API returns data in this format
      } catch (err) {
        console.error("Error fetching blood inventory:", err);
        setError("Failed to load blood inventory");
      } finally {
        setLoading(false);
      }
    };

    fetchBloodInventory();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-white text-center">{error}</div>;
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-8">Blood Inventory</h1>
      <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="bg-red-700 p-2 text-center">Blood Group</th>
              <th className="bg-red-700 p-2 text-center">Total Donor</th>
            </tr>
          </thead>
          <tbody>
            {bloodInventoryData.map((item) => (
              <tr key={item.blood_group} className="border-b border-white/10">
                <td className="p-2 text-center">{item.blood_group}</td>
                <td className="p-2 text-center">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
