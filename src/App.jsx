import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ExamList from './pages/ExamList.jsx';
import ExamAttempt from './pages/ExamAttempt.jsx';
import Result from './pages/Result.jsx';
import ResultHistory from './pages/ResultHistory.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exams" element={<ExamList />} />
          <Route path="/exams/:examId" element={<ExamAttempt />} />
          <Route path="/results/:examId" element={<Result />} />
          <Route path="/history" element={<ResultHistory />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;