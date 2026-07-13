import { BriefcaseBusiness } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-2xl p-16 text-center">
      <BriefcaseBusiness
        size={60}
        className="mx-auto text-blue-500"
      />

      <h2 className="text-2xl font-bold mt-6">
        No Applications Yet
      </h2>

      <p className="text-gray-500 mt-2">
        Add your first application to begin tracking.
      </p>
    </div>
  );
}

export default EmptyState;