import { useCallback, useEffect, useState } from "react";
import taskService from "../services/taskService";

export default function useDailyTasks() {

    const [tasks, setTasks] = useState([]);
    const [progress, setProgress] = useState(0);
    const [completedTasks, setCompletedTasks] = useState(0);
    const [totalTasks, setTotalTasks] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const calculateProgress = (taskList) => {

        const completed = taskList.filter(task => task.completed).length;

        const total = taskList.length;

        setCompletedTasks(completed);

        setTotalTasks(total);

        setProgress(
            total === 0 ? 0 : Math.round((completed / total) * 100)
        );
    };

    const fetchTasks = useCallback(async () => {

        try {

            setLoading(true);

            const response = await taskService.getTodayTasks();

            const list = response.tasks ?? [];

            setTasks(list);

            calculateProgress(list);

            setError(null);

        } catch (err) {

            console.error(err);

            setError(err);

        } finally {

            setLoading(false);

        }

    }, []);

    useEffect(() => {

        fetchTasks();

    }, [fetchTasks]);

    const addTask = async (title) => {

        await taskService.createTask(title);

        await fetchTasks();

    };

    const toggleTask = async (taskId) => {

        await taskService.toggleTask(taskId);

        await fetchTasks();

    };

    const deleteTask = async (taskId) => {

        await taskService.deleteTask(taskId);

        await fetchTasks();

    };

    return {

        tasks,

        loading,

        error,

        progress,

        completedTasks,

        totalTasks,

        addTask,

        toggleTask,

        deleteTask,

        refreshTasks: fetchTasks

    };

}