import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig"; // Adjust the import path if necessary

const RequestedTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axiosInstance.get("/blood/request"); // Replace with your actual endpoint
        setRequests(response.data.result); // Set the fetched data to the state
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-white text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-500/90 to-purple-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Requested Table
        </h2>
        <div className="overflow-x-auto bg-white/30 rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-6 py-4 text-center">ID</th>
                <th className="px-6 py-4 text-center">Date</th>
                <th className="px-6 py-4 text-center">Amount</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-200">
                  <td className="px-6 py-4 text-center">{request.id}</td>
                  <td className="px-6 py-4 text-center">
                    {request.date_requested}
                  </td>
                  <td className="px-6 py-4 text-center">{request.amount}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`${
                        request.req_status === "Completed"
                          ? "text-green-500"
                          : request.req_status === "Pending"
                          ? "text-yellow-500"
                          : "text-blue-500"
                      }`}
                    >
                      {request.req_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestedTable;
