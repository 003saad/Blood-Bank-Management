import { useState } from "react";
import {
  Home,
  Users,
  User,
  Droplet,
  ClipboardList,
  History,
} from "lucide-react";

export default function Sidebar({ selectedItem, setSelectedItem }) {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "donor", icon: User, label: "Donor" },
    { id: "patient", icon: Users, label: "Patient" },
    // { id: "donations", icon: Droplet, label: "Donations" },
    // { id: "blood-requests", icon: ClipboardList, label: "Blood Requests" },
    // { id: "request-history", icon: History, label: "Request History" },
  ];

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isHovered ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ zIndex: 50 }} // Ensure a high z-index value
    >
      <nav className="flex h-full flex-col py-4">
        {menuItems.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setSelectedItem(id)}
            className={`flex items-center px-4 py-3 transition-colors ${
              selectedItem === id
                ? "bg-red-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
          >
            <Icon className="h-5 w-5 min-w-[1.25rem]" />
            <span
              className={`ml-4 whitespace-nowrap transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
