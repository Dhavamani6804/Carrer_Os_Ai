import InfoChip from "../common/InfoChip";

function JobOverview({ application }) {
  if (!application) return null;

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <InfoChip label="Company" value={application.company} />
      <InfoChip label="Location" value={application.location} />
      <InfoChip label="Status" value={application.status} />
      <InfoChip label="Work Mode" value={application.workMode} />
    </div>
  );
}

export default JobOverview;
