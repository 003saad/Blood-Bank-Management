import AdminLayout from "../../Layouts/AdminLayout";
import { Heart } from "lucide-react";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-3 text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl">
          Manage blood donation requests and inventory
        </p>

        <div className="mt-10 flex justify-center">
          <Heart
            className="h-32 w-32 text-red-600"
            fill="currentColor"
            strokeWidth={1.5}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
