import axiosClient from "../api/axiosClient";

export async function getProgress(sessionId) {

    const response = await axiosClient.get(
        `/progress/${sessionId}`
    );

    return response.data;
}

export async function updateProgress(data) {

    const response = await axiosClient.patch(
        "/progress",
        data
    );

    return response.data;
}