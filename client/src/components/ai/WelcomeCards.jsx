import {
  Code2,
  Database,
  Brain,
  Calculator,
  Briefcase,
  Users,
  Rocket,
  MonitorSmartphone,
  Boxes,
  Workflow,
} from "lucide-react";

const categories = [
  {
    title: "Java",
    description: "Core Java, OOP, Collections, Multithreading",
    category: "Java",
    icon: Code2,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Spring Boot",
    description: "Spring, REST APIs, Security, JPA",
    category: "Spring Boot",
    icon: Rocket,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "DSA",
    description: "Coding interview preparation",
    category: "DSA",
    icon: Brain,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "SQL",
    description: "Queries, Joins, Indexes",
    category: "SQL",
    icon: Database,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "React",
    description: "Hooks, State, Routing",
    category: "React",
    icon: MonitorSmartphone,
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    title: "Node.js",
    description: "Express, JWT, REST APIs",
    category: "Node.js",
    icon: Boxes,
    color: "bg-lime-100 text-lime-600",
  },
  {
    title: "Aptitude",
    description: "Quantitative, Logical & Verbal",
    category: "Aptitude",
    icon: Calculator,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "HR Interview",
    description: "HR & Behavioral Questions",
    category: "HR",
    icon: Users,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "System Design",
    description: "LLD & HLD Basics",
    category: "System Design",
    icon: Workflow,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Resume Guidance",
    description: "Resume & Career Advice",
    category: "Resume",
    icon: Briefcase,
    color: "bg-blue-100 text-blue-600",
  },
];

function WelcomeCards({ onSelect }) {
  return (
    <div className="mt-10">

      <h2 className="text-3xl font-bold text-slate-800">
        Choose your learning track
      </h2>

      <p className="mt-2 text-slate-500">
        Your progress and conversation history are automatically saved.
      </p>

      <div className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">

        {categories.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.category}
              onClick={() => onSelect(item.category)}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-2 text-slate-500">
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