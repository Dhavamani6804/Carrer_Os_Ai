import axiosClient from "../api/axiosClient";

export const getProfile = async () => {
    const response = await axiosClient.get("/profile");
    return response.data;
};

export const updateProfile = async (data) => {
    const response = await axiosClient.put("/profile", data);
    return response.data;
};  