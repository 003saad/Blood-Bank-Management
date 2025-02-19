import { Droplet, History } from "lucide-react";
import { useState } from "react";

export default function Sidebar({ selectedItem, setSelectedItem }) {
  const [isHovered, setIsHovered] = useState(false);

  const menuItems = [
    { id: "request", icon: Droplet, label: "Request" },
    { id: "history", icon: History, label: "Requested Table" },
  ];

  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isHovered ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
