import axiosClient from "../api/axiosClient";

const getTodayTasks = async () => {
    const { data } = await axiosClient.get("/tasks/today");
    return data;
};

const createTask = async (title) => {
    const { data } = await axiosClient.post("/tasks", { title });
    return data;
};

const toggleTask = async (taskId) => {
    const { data } = await axiosClient.patch(`/tasks/${taskId}/toggle`);
    return data;
};

const moveTaskToToday = async (taskId) => {
    const { data } = await axiosClient.patch(
        `/tasks/${taskId}/move-to-today`
    );
    return data;
};

const deleteTask = async (taskId) => {
    await axiosClient.delete(`/tasks/${taskId}`);
};

export default {
    getTodayTasks,
    createTask,
    toggleTask,
    moveTaskToToday,
    deleteTask
};