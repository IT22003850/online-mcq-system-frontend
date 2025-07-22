import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ExamCard from '../components/ExamCard';
import { useNavigate } from 'react-router-dom';

function ExamList() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('/api/exams', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setExams(response.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch exams');
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchExams();
  }, [navigate]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Exams</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exams.map((exam) => (
          <ExamCard key={exam._id} exam={exam} />
        ))}
      </div>
    </div>
  );
}

export default ExamList;