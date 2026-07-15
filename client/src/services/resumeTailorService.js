import axiosClient from "../api/axiosClient";

export async function tailorResume(applicationId) {

    const response = await axiosClient.post(
        `/career-hub/${applicationId}/tailor-resume`
    );

    return response.data;

}