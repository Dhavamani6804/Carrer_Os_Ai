
import axiosClient from "../api/axiosClient";

export async function sendMessage(sessionId, message) {

    const response = await axiosClient.post(
        "/preparation/chat",
        {
            sessionId,
            message
        }
    );

    return response.data;

}