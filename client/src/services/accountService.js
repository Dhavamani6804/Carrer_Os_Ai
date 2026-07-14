import axiosClient from "../api/axiosClient";

export async function resetPreparationProgress() {
  await axiosClient.delete("/account/progress");
}

export async function deleteCareerHub() {
  await axiosClient.delete("/account/career-hub");
}

export async function deleteAccount() {
  await axiosClient.delete("/account");
}