import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../layouts/DashboardLayout";
import { getApplicationById } from "../../services/careerHubService";
import JobOverview from "../../components/careerHub/application/JobOverview";
import Timeline from "../../components/careerHub/application/Timeline";
import NotesCard from "../../components/careerHub/application/NotesCard";
import StatusBadge from "../../components/careerHub/application/StatusBadge";
import InfoChip from "../../components/careerHub/common/InfoChip";
import StatusSection from "../../components/careerHub/application/StatusSection";

function ApplicationDetailsPage() {
  const { applicationId } = useParams();

  const [application, setApplication] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplication();
  }, [applicationId]);

  async function loadApplication() {
    try {
      setLoading(true);

      const response = await getApplicationById(applicationId);

      setApplication(response);
    } catch (error) {
      console.error(error);

      toast.error("Unable to load application.");
    } finally {
      setLoading(false);
    }
  }

  async function loadApplication() {

  try {

    setLoading(true);

    const response = await getApplicationById(applicationId);

    setApplication(response);

  } catch (error) {

    console.error(error);

    toast.error("Unable to load application.");

  } finally {

    setLoading(false);

  }

}

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">Loading application...</div>
      </DashboardLayout>
    );
  }

  if (!application) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">Application not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 lg:p-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{application.role}</h1>

              <p className="mt-2 text-slate-500">{application.company}</p>
            </div>

            <StatusBadge status={application.status} />
          </div>

          <div className="grid md:grid-cols-4 gap-3 mt-8">
            <InfoChip label="Company" value={application.company} />

            <InfoChip label="Location" value={application.location} />

            <InfoChip label="Source" value={application.source} />

            <InfoChip label="Work Mode" value={application.workMode} />
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">

  <div className="space-y-6">

    <JobOverview
      application={application}
    />

    <StatusSection
      applicationId={application.id}
      currentStatus={application.status}
      onUpdated={loadApplication}
    />

  </div>

  <NotesCard
    notes={application.notes}
  />

</div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Timeline</h2>

          <div className="mt-6">
            <Timeline items={application.timeline || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ApplicationDetailsPage;
