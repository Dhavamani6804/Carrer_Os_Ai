import axiosClient from "../api/axiosClient";

export const getJobs = async (filters = {}) => {
  const response = await axiosClient.get("/jobs", {
    params: {
      keyword: filters.keyword || undefined,
      location: filters.location || undefined,
      employmentType: filters.employmentType || undefined,
      experienceLevel: filters.experienceLevel || undefined,
    },
  });

  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await axiosClient.get(`/jobs/${jobId}`);
  return response.data;
};
