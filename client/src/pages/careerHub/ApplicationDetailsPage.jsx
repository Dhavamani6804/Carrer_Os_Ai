import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getApplicationById,
  addTimelineEvent,
  updateTimelineEvent,
  deleteTimelineEvent,
} from "../../services/careerHubService";
import JobOverview from "../../components/careerHub/application/JobOverview";
import Timeline from "../../components/careerHub/application/Timeline";
import TimelineCard from "../../components/careerHub/application/TimelineCard";
import TimelineModal from "../../components/careerHub/application/TimelineModal";
import NotesCard from "../../components/careerHub/application/NotesCard";
import StatusBadge from "../../components/careerHub/application/StatusBadge";
import StatusSection from "../../components/careerHub/application/StatusSection";
import InfoChip from "../../components/careerHub/common/InfoChip";
import TailoredResumeModal from "../../components/careerHub/resume/TailoredResumeModal";
import useResumeTailor from "../../hooks/useResumeTailor";
import useAIDocument from "../../hooks/useAIDocument";
import GeneratedDocumentModal from "../../components/careerHub/ai/GeneratedDocumentModal";

function ApplicationDetailsPage() {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [saving, setSaving] = useState(false);

  const {
    loading: tailoring,
    resume,
    open: resumeOpen,
    setOpen: setResumeOpen,
    generate: generateResume,
  } = useResumeTailor();

  const {
    loadingType: documentLoadingType,
    open: documentOpen,
    title,
    content,
    generate: generateDocument,
    closeModal,
  } = useAIDocument();

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

  function handleAddEvent() {
    setSelectedEvent(null);
    setModalOpen(true);
  }

  function handleEditEvent(event) {
    setSelectedEvent(event);
    setModalOpen(true);
  }

  async function handleSaveEvent(data) {
    try {
      setSaving(true);

      if (selectedEvent) {
        await updateTimelineEvent(application.id, selectedEvent.id, data);

        toast.success("Timeline updated.");
      } else {
        await addTimelineEvent(application.id, data);

        toast.success("Timeline event added.");
      }

      setModalOpen(false);

      loadApplication();
    } catch (error) {
      console.error(error);

      toast.error("Unable to save event.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteEvent(event) {
    if (!window.confirm("Delete this timeline event?")) return;

    try {
      await deleteTimelineEvent(application.id, event.id);

      toast.success("Timeline event deleted.");

      loadApplication();
    } catch (error) {
      console.error(error);

      toast.error("Unable to delete event.");
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
      <div className="space-y-8 p-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{application.role}</h1>

              <p className="mt-2 text-slate-500">{application.company}</p>
            </div>

            <StatusBadge status={application.status} />
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-4">
            <InfoChip label="Company" value={application.company} />

            <InfoChip label="Location" value={application.location} />

            <InfoChip label="Source" value={application.source} />

            <InfoChip label="Work Mode" value={application.workMode} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <JobOverview application={application} />

            <StatusSection
              applicationId={application.id}
              currentStatus={application.status}
              onUpdated={loadApplication}
            />
          </div>

          <NotesCard
            applicationId={application.id}
            notes={application.notes}
            onUpdated={loadApplication}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate(`/preparation/${application.id}`)}
            className="rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
          >
            Prepare with AI
          </button>

          <button
            onClick={() => generateResume(application.id)}
            disabled={tailoring}
            className="rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {tailoring ? "Tailoring..." : "✨ Tailor Resume"}
          </button>
          <button
            onClick={() => generateDocument(application.id, "COVER_LETTER")}
            disabled={documentLoadingType !== null}
            className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {documentLoadingType === "COVER_LETTER"
              ? "Generating..."
              : "📝 Generate Cover Letter"}
          </button>
          <button
            onClick={() => generateDocument(application.id, "HR_EMAIL")}
            disabled={documentLoadingType !== null}
            className="rounded-xl bg-purple-600 px-5 py-3 text-white hover:bg-purple-700 disabled:opacity-50"
          >
            {documentLoadingType === "HR_EMAIL"
              ? "Generating..."
              : "✉️ Generate HR Email"}
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <TimelineCard onAdd={handleAddEvent} />

          <Timeline
            items={application.timeline || []}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        </div>
      </div>

      <TimelineModal
        open={modalOpen}
        title={selectedEvent ? "Edit Timeline Event" : "Add Timeline Event"}
        initialData={selectedEvent}
        loading={saving}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSaveEvent}
      />
      <TailoredResumeModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
        resume={resume}
      />
      <GeneratedDocumentModal
        open={documentOpen}
        title={title}
        content={content}
        onClose={closeModal}
      />
    </DashboardLayout>
  );
}

export default ApplicationDetailsPage;
