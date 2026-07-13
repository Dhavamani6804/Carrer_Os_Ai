import { BriefcaseBusiness } from "lucide-react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CareerHubHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex items-center gap-3">
          <BriefcaseBusiness
            className="text-blue-600"
            size={30}
          />

          <h1 className="text-4xl font-bold">
            Career Hub
          </h1>
        </div>

        <p className="text-gray-500 mt-2">
          Track every application in one place.
        </p>
      </div>

      <button
        onClick={() => navigate("/career-hub/new")}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
      >
        <Plus size={18} />

        Add Application
      </button>
    </div>
  );
}

export default CareerHubHeader;