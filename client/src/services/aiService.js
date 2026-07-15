import axiosClient from "../api/axiosClient";

export async function startSession(category) {

  const response = await axiosClient.post(
    `/general-mentor/session/${encodeURIComponent(category)}`
  );

  return response.data;
}

export async function getSession(sessionId) {

  const response = await axiosClient.get(
    `/general-mentor/${sessionId}`
  );

  return response.data;
}

export async function askAI(sessionId, message) {

  const response = await axiosClient.post(
    `/general-mentor/chat/${sessionId}`,
    {
      message,
    }
  );

  return response.data;
}