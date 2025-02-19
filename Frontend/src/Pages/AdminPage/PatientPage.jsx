const patientData = [
  {
    id: 1,
    name: "Jane Doe",
    bloodGroup: "A+",
    age: 45,
    disease: "Diabetes",
    mobile: "123-456-7890",
  },
];

export default function PatientPage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-white mb-8">Patient Details</h1>
      <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="bg-red-700 p-2 text-left">Name</th>
              <th className="bg-red-700 p-2 text-left">Blood Group</th>
              <th className="bg-red-700 p-2 text-left">Age</th>
              <th className="bg-red-700 p-2 text-left">Disease</th>
              <th className="bg-red-700 p-2 text-left">Mobile</th>
              <th className="bg-red-700 p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {patientData.map((patient) => (
              <tr key={patient.id} className="border-b border-white/10">
                <td className="p-2 text-left">{patient.name}</td>
                <td className="p-2 text-left">{patient.bloodGroup}</td>
                <td className="p-2 text-left">{patient.age}</td>
                <td className="p-2 text-left">{patient.disease}</td>
                <td className="p-2 text-left">{patient.mobile}</td>
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
