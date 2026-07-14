import axiosClient from "../api/axiosClient";

export const getCareerHubStats = async () => {
  const { data } = await axiosClient.get("/career-hub/stats");
  return data;
};

export const getApplications = async () => {
  const { data } = await axiosClient.get("/career-hub");
  return data;
};

export const getApplicationById = async (applicationId) => {
  const { data } = await axiosClient.get(
    `/career-hub/${applicationId}`
  );

  return data;
};

export const analyzeJD = async (payload) => {
  const { data } = await axiosClient.post(
    "/career-hub/analyze",
    payload
  );

  return data;
};

function normalize(data) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === "" ? null : value,
    ])
  );
}

export const createApplication = async (payload) => {
  const { data } = await axiosClient.post(
    "/career-hub",
    normalize(payload)
  );

  return data;
};

export const updateApplicationStatus = async (
  applicationId,
  payload
) => {
  const { data } = await axiosClient.patch(
    `/career-hub/${applicationId}/status`,
    payload
  );

  return data;
};

export const deleteApplication = async (applicationId) => {
  await axiosClient.delete(`/career-hub/${applicationId}`);
};

export const updateNotes = async (applicationId, notes) => {
  const { data } = await axiosClient.patch(
    `/career-hub/${applicationId}/notes`,
    { notes }
  );

  return data;
};

export const addTimelineEvent = async (
  applicationId,
  payload
) => {
  const { data } = await axiosClient.post(
    `/career-hub/${applicationId}/timeline`,
    payload
  );

  return data;
};

export const updateTimelineEvent = async (
  applicationId,
  eventId,
  payload
) => {
  const { data } = await axiosClient.put(
    `/career-hub/${applicationId}/timeline/${eventId}`,
    payload
  );

  return data;
};

export const deleteTimelineEvent = async (
  applicationId,
  eventId
) => {
  await axiosClient.delete(
    `/career-hub/${applicationId}/timeline/${eventId}`
  );
};