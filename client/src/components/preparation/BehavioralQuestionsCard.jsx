function BehavioralQuestionsCard({ questions = [] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">
        Behavioral Questions
      </h2>

      <div className="mt-5 space-y-4">
        {questions.map((question, index) => (
          <div
            key={index}
            className="rounded-2xl bg-orange-50 p-4"
          >
            <span className="font-semibold text-orange-600">
              Q{index + 1}
            </span>

            <p className="mt-2 text-slate-700">
              {question}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BehavioralQuestionsCard;