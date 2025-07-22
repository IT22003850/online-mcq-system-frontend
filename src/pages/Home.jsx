import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Online MCQ System</h1>
      <p className="text-gray-600 mb-6">
        Test your knowledge with our mock exams!
      </p>
      {user ? (
        <Link
          to="/exams"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          View Exams
        </Link>
      ) : (
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
          >
            Login
        </Link>
        </div>
      )}
    </div>
  );
}

export default Home;