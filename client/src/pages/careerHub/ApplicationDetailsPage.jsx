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

function ApplicationDetailsPage() {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [saving, setSaving] = useState(false);

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
        await updateTimelineEvent(
          application.id,
          selectedEvent.id,
          data
        );

        toast.success("Timeline updated.");
      } else {
        await addTimelineEvent(
          application.id,
          data
        );

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
    if (
      !window.confirm(
        "Delete this timeline event?"
      )
    )
      return;

    try {
      await deleteTimelineEvent(
        application.id,
        event.id
      );

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
        <div className="p-8 text-center">
          Loading application...
        </div>
      </DashboardLayout>
    );
  }

  if (!application) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          Application not found.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="space-y-8 p-8">

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <h1 className="text-3xl font-bold">
                {application.role}
              </h1>

              <p className="mt-2 text-slate-500">
                {application.company}
              </p>

            </div>

            <StatusBadge
              status={application.status}
            />

          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-4">

            <InfoChip
              label="Company"
              value={application.company}
            />

            <InfoChip
              label="Location"
              value={application.location}
            />

            <InfoChip
              label="Source"
              value={application.source}
            />

            <InfoChip
              label="Work Mode"
              value={application.workMode}
            />

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

        <button
          onClick={() =>
            navigate(`/preparation/${application.id}`)
          }
          className="rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
        >
          Prepare with AI
        </button>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

          <TimelineCard
            onAdd={handleAddEvent}
          />

          <Timeline
            items={application.timeline || []}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />

        </div>

      </div>

      <TimelineModal
        open={modalOpen}
        title={
          selectedEvent
            ? "Edit Timeline Event"
            : "Add Timeline Event"
        }
        initialData={selectedEvent}
        loading={saving}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSaveEvent}
      />

    </DashboardLayout>
  );
}

export default ApplicationDetailsPage;