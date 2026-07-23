import axiosClient from "../api/axiosClient";

export async function generateDocument(applicationId, type) {

    const response = await axiosClient.post(
        "/ai/document",
        {
            applicationId,
            type
        }
    );

    return response.data;
}