import { useLocation, Link } from 'react-router-dom';

function Result() {
  const { state } = useLocation();
  const { result } = state || {};

  if (!result) {
    return <div className="text-center">No result data available</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Exam Result</h2>
      <p className="text-lg mb-4">Your Score: {result.score} / 5</p>
      <div className="space-y-4">
        {result.answers.map((answer, index) => (
          <div
            key={answer.question_id}
            className={`p-4 rounded-lg ${
              answer.is_correct ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <h3 className="font-semibold">
              {index + 1}. {answer.question_text}
            </h3>
            <p>Your Answer: {answer.selected_option + 1}</p>
            <p>Correct Answer: {answer.correct_option + 1}</p>
            <p>Status: {answer.is_correct ? 'Correct' : 'Incorrect'}</p>
          </div>
        ))}
      </div>
      <Link
        to="/exams"
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Exams
      </Link>
    </div>
  );
}

export default Result;