const historyData = [
  {
    id: 1,
    requesterName: "John Doe",
    requesterType: "Patient",
    bloodGroup: "A+",
    unit: 500,
    requestDate: "2023-10-01",
    status: "Approved",
  },
  {
    id: 2,
    requesterName: "Jane Smith",
    requesterType: "Donor",
    bloodGroup: "B+",
    unit: 300,
    requestDate: "2023-10-02",
    status: "Rejected",
  },
];

export default function RequestHistoryPage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-8">Request History</h1>
      <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="bg-red-700 p-2 text-left">Requester Name</th>
              <th className="bg-red-700 p-2 text-left">Requester Type</th>
              <th className="bg-red-700 p-2 text-left">Blood Group</th>
              <th className="bg-red-700 p-2 text-left">Unit (ml)</th>
              <th className="bg-red-700 p-2 text-left">Request Date</th>
              <th className="bg-red-700 p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((request) => (
              <tr key={request.id} className="border-b border-white/10">
                <td className="p-2 text-left">{request.requesterName}</td>
                <td className="p-2 text-left">{request.requesterType}</td>
                <td className="p-2 text-left">{request.bloodGroup}</td>
                <td className="p-2 text-left">{request.unit}</td>
                <td className="p-2 text-left">{request.requestDate}</td>
                <td className="p-2 text-left">{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
