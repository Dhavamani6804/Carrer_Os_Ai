import {
  BookOpen,
  Brain,
  Briefcase,
  Rocket,
} from "lucide-react";

const suggestions = [
  {
    title: "Spring Boot Roadmap",
    description: "Create a roadmap to master Spring Boot.",
    prompt:
      "Create a complete roadmap to become proficient in Spring Boot.",
    icon: Rocket,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Resume Review",
    description: "Improve your software developer resume.",
    prompt:
      "Review my resume and suggest improvements for software engineering jobs.",
    icon: Briefcase,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "DSA Interview",
    description: "Prepare for coding interviews.",
    prompt:
      "Give me a 30-day DSA interview preparation roadmap.",
    icon: Brain,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "SQL Preparation",
    description: "Master SQL interview questions.",
    prompt:
      "Teach me SQL from beginner to interview level.",
    icon: BookOpen,
    color: "bg-orange-100 text-orange-600",
  },
];

function WelcomeCards({ onSelect }) {
  return (
    <div className="mt-10">

      <h2 className="text-2xl font-semibold text-gray-800">
        👋 Welcome to CareerOS AI Mentor
      </h2>

      <p className="text-gray-500 mt-2">
        Choose a topic below or ask your own question.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        {suggestions.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.title}
              onClick={() => onSelect(item.prompt)}
              className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6 text-left"
            >

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-gray-800">
                {item.title}
              </h3>

              <p className="mt-2 text-gray-500">
                {item.description}
              </p>

            </button>

          );
        })}
      </div>
    </div>
  );
}

export default WelcomeCards;