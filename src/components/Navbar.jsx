import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          MCQ System
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-white">Welcome, {user.name}</span>
              <Link to="/exams" className="text-white hover:text-gray-200">
                Exams
              </Link>
              <Link to="/history" className="text-white hover:text-gray-200">
                History
              </Link>
              <button
                onClick={logout}
                className="text-white hover:text-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="text-white hover:text-gray-200">
                Register
              </Link>
              <Link to="/login" className="text-white hover:text-gray-200">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;