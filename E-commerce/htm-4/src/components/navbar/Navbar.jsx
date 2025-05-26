import { Link } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { logo } from "../../assets/index"; // 🖼️ your logo

const Navbar = () => {
  const { user, logout } = useAuth(); // Access user and logout from AuthContext
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinks = [
    { id: "/", title: "Home" },
    { id: "/allproducts", title: "All Products" },
    { id: "/orderList", title: "Orders" },
    { id: "/dashboard", title: "Admin" },
  ];

  return (
    <nav className="w-full flex items-center justify-between px-6 sm:px-16 py-4 fixed top-0 z-20 bg-[#445D48]">
      {/* Left logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-9 h-9 object-contain scale-150" />
        <p className="text-white text-[18px] font-bold cursor-pointer">E-Mandi</p>
      </Link>

      {/* Center navigation links */}
      <ul className="hidden sm:flex gap-10">
        {navLinks.map((nav) => (
          <li key={nav.id}>
            <Link
              to={nav.id}
              className="text-secondary hover:text-white text-[18px] font-medium"
            >
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right icons */}
      <div className="flex items-center gap-6">
        {/* Cart */}
        <Link to="/cart" className="text-white relative">
          <BsCartFill className="w-6 h-6" />
        </Link>

        {/* Profile */}
        <div className="relative">
          <FaUserCircle
            className="text-white w-7 h-7 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-[#001524] rounded-xl shadow-lg py-2 w-40 z-30">
              {user ? (
                // If user is logged in, show Help and Logout
                <>
                  <Link
                    to="/help"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Help
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // If no user is logged in, show Login and Register
                <>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;