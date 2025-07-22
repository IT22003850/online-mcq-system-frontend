import { Link } from 'react-router-dom';

function ExamCard({ exam }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{exam.title}</h3>
      <p className="text-gray-600">{exam.description}</p>
      <Link
        to={`/exams/${exam._id}`}
        className="mt-2 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Start Exam
      </Link>
    </div>
  );
}

export default ExamCard;