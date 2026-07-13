import ApplicationCard from "./ApplicationCard";

function ApplicationList({ applications }) {
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
        />
      ))}
    </div>
  );
}

export default ApplicationList;