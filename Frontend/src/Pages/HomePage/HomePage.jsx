import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import Navbar from "../../components/NavBar";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log(localStorage.getItem("saadToken"));

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500/90 to-purple-400">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            Welcome to the Blood Donation Portal
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            "Opportunities knock the door sometimes, so don't let it go and
            donate blood."
          </p>
          <p className="mt-2 text-sm text-gray-200">-LazyCoder</p>

          <div className="mt-10 flex justify-center">
            <Heart
              className="h-32 w-32 text-red-600"
              fill="currentColor"
              strokeWidth={1.5}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
