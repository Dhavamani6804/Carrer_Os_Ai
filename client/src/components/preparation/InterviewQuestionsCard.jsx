
function InterviewQuestionsCard({ questions = [] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Technical Interview Questions
      </h2>

      <div className="mt-5 space-y-4">
        {questions.map((question, index) => (
          <div
            key={index}
            className="rounded-2xl bg-slate-50 p-4"
          >
            <span className="font-semibold text-blue-600">
              Q{index + 1}
            </span>

            <p className="mt-2">
              {question}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InterviewQuestionsCard;