import { MapPin, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function ApplicationCard({ application }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(`/career-hub/applications/${application.id}`)
      }
      className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition cursor-pointer"
    >
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {application.role}
          </h2>

          <p className="text-gray-500">
            {application.company}
          </p>
        </div>

        <StatusBadge status={application.status} />
      </div>

      <div className="flex gap-6 mt-5 text-gray-600 text-sm">
        <span className="flex items-center gap-1">
          <MapPin size={16} />
          {application.location}
        </span>

        <span className="flex items-center gap-1">
          <IndianRupee size={16} />
          {application.salary}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        {application.skills?.slice(0, 5).map((skill) => (
          <span
            key={skill}
            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ApplicationCard;