import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Question from '../components/Question';
import { API_BASE_URL } from '../config';

function ExamAttempt() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/exams/${examId}/questions`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch questions');
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchQuestions();
  }, [examId, navigate]);

  const handleOptionChange = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(answers).length !== 5) {
      toast.error('Please answer all 5 questions');
      return;
    }

    const answerArray = Object.entries(answers).map(([question_id, selected_option]) => ({
      question_id,
      selected_option,
    }));

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/exams/${examId}/submit`,
        { answers: answerArray },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate(`/results/${examId}`, { state: { result: response.data } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Submission failed');
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Exam Questions</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <Question
            key={question._id}
            question={question}
            index={index}
            selectedOption={answers[question._id]}
            setSelectedOption={(optionIndex) =>
              handleOptionChange(question._id, optionIndex)
            }
          />
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit Exam
        </button>
      </form>
    </div>
  );
}

export default ExamAttempt;