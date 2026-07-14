import axiosClient from "../api/axiosClient";

export const uploadResume = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await axiosClient.post(
        "/resume/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const getResume = async () => {

    const response = await axiosClient.get("/resume");

    return response.data;
};

export const downloadResume = () => {
    window.open(
        `${axiosClient.defaults.baseURL}/resume/download`,
        "_blank"
    );

};

export const deleteResume = async () => {

    await axiosClient.delete("/resume");

};
