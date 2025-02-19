const donorData = [
  {
    id: 1,
    name: "John Doe",
    bloodGroup: "A+",
    address: "123 Main St",
    mobile: "123-456-7890",
  },
];

export default function DonorPage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-8">Donor Details</h1>
      <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="bg-red-700 p-2 text-left">Name</th>
              <th className="bg-red-700 p-2 text-left">Blood Group</th>
              <th className="bg-red-700 p-2 text-left">Address</th>
              <th className="bg-red-700 p-2 text-left">Mobile</th>
              <th className="bg-red-700 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {donorData.map((donor) => (
              <tr key={donor.id} className="border-b border-white/10">
                <td className="p-2 text-left">{donor.name}</td>
                <td className="p-2 text-left">{donor.bloodGroup}</td>
                <td className="p-2 text-left">{donor.address}</td>
                <td className="p-2 text-left">{donor.mobile}</td>
                <td className="p-2 text-left">
                  <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
