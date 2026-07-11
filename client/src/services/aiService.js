import axiosClient from "../api/axiosClient";


export async function askAI(question) {
  const response = await axiosClient.post("/ai/ask", {
    question,
  });

  return response.data;
}