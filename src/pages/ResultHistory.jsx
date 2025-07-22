import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../config';

function ResultHistory() {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/results/${user.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setResults(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch results');
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchResults();
  }, [user, navigate]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Result History</h2>
      {results.length === 0 ? (
        <p>No results available</p>
      ) : (
        <div className="space-y-4">
          {results.map((result) => (
            <div key={result.result_id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-semibold">{result.exam_title}</h3>
              <p>Score: {result.score} / 5</p>
              <p>Date: {new Date(result.timestamp).toLocaleString()}</p>
              <div className="mt-2">
                {result.answers.map((answer, index) => (
                  <div
                    key={answer.question_id}
                    className={`p-2 ${
                      answer.is_correct ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    <p>
                      {index + 1}. {answer.question_text}
                    </p>
                    <p>Your Answer: {answer.selected_option}</p>
                    <p>Correct Answer: {answer.correct_option}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResultHistory;