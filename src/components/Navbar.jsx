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
        <div className="flex space-x-4 items-center">
          {user ? (
            <>
              <span className="text-white text-sm md:text-base">Welcome, {user.name}</span>
              <Link
                to="/exams"
                className="text-white bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md text-sm md:text-base transition duration-200"
              >
                Exams
              </Link>
              <Link
                to="/history"
                className="text-white bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md text-sm md:text-base transition duration-200"
              >
                History
              </Link>
              <button
                onClick={logout}
                className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm md:text-base transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="text-white bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md text-sm md:text-base transition duration-200"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="text-white bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md text-sm md:text-base transition duration-200"
              >
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