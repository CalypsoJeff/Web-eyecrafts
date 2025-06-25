import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      {/* Branding */}
      <Link to="/" className="text-xl font-bold">
        Blog App
      </Link>

      {/* Navigation Options */}
      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-100"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
