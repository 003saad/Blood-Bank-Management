const donationsData = [
  {
    id: 1,
    donorName: "John Doe",
    disease: "None",
    age: 30,
    bloodGroup: "A+",
    unit: 500,
    requestDate: "2023-10-01",
    status: "Approved",
    action: "500 units added to stock",
  },
  {
    id: 2,
    donorName: "Jane Smith",
    disease: "None",
    age: 25,
    bloodGroup: "B+",
    unit: 300,
    requestDate: "2023-10-02",
    status: "Approved",
    action: "300 units added to stock",
  },
];

export default function DonationsPage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-8">Donations Details</h1>
      <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="bg-red-700 p-2 text-left">Donor Name</th>
              <th className="bg-red-700 p-2 text-left">Disease</th>
              <th className="bg-red-700 p-2 text-left">Age</th>
              <th className="bg-red-700 p-2 text-left">Blood Group</th>
              <th className="bg-red-700 p-2 text-left">Unit (ml)</th>
              <th className="bg-red-700 p-2 text-left">Request Date</th>
              <th className="bg-red-700 p-2 text-left">Status</th>
              <th className="bg-red-700 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {donationsData.map((donation) => (
              <tr key={donation.id} className="border-b border-white/10">
                <td className="p-2 text-left">{donation.donorName}</td>
                <td className="p-2 text-left">{donation.disease}</td>
                <td className="p-2 text-left">{donation.age}</td>
                <td className="p-2 text-left">{donation.bloodGroup}</td>
                <td className="p-2 text-left">{donation.unit}</td>
                <td className="p-2 text-left">{donation.requestDate}</td>
                <td className="p-2 text-left">{donation.status}</td>
                <td className="p-2 text-left">{donation.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
