import axiosClient from "../api/axiosClient";

export const getSettings = async () => {
  const response = await axiosClient.get("/settings");
  return response.data;
};

export const updateSettings = async (data) => {
  const response = await axiosClient.patch(
    "/settings",
    data
  );

  return response.data;
};

export const changePassword = async (data) => {
  await axiosClient.patch(
    "/settings/password",
    data
  );
};

export const deleteAccount = async ({ password }) => {
  await axiosClient.delete("/settings", {
    params: {
      password,
    },
  });
};