
import axiosClient from "../api/axiosClient";

export async function startPreparation(applicationId) {

    const response = await axiosClient.post(
        "/preparation/start",
        {
            applicationId
        }
    );

    return response.data;

}