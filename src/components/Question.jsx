function Question({ question, index, selectedOption, setSelectedOption }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold">
        {index + 1}. {question.question_text}
      </h3>
      <div className="mt-2">
        {question.options.map((option, idx) => (
          <label key={idx} className="block">
            <input
              type="radio"
              name={`question-${question._id}`}
              value={idx}
              checked={selectedOption === idx}
              onChange={() => setSelectedOption(idx)}
              className="mr-2"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Question;