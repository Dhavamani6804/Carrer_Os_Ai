import { useCallback, useEffect, useState } from "react";
import taskService from "../services/taskService";

export default function useDailyTasks() {

    const [tasks, setTasks] = useState([]);

    const [todayTasks, setTodayTasks] = useState([]);

    const [overdueTasks, setOverdueTasks] = useState([]);

    const [progress, setProgress] = useState(0);

    const [completedTasks, setCompletedTasks] = useState(0);

    const [totalTasks, setTotalTasks] = useState(0);

    const [loading, setLoading] = useState(true);

    const [actionTaskId, setActionTaskId] = useState(null);

    const [actionType, setActionType] = useState(null);

    const [error, setError] = useState(null);

    const fetchTasks = useCallback(async () => {

        try {

            setLoading(true);

            const response = await taskService.getTodayTasks();

            const list = response.tasks ?? [];

            setTasks(list);

            setTodayTasks(
                list.filter(task => !task.overdue)
            );

            setOverdueTasks(
                list.filter(task => task.overdue)
            );

            setProgress(response.progress ?? 0);

            setCompletedTasks(response.completedTasks ?? 0);

            setTotalTasks(response.totalTasks ?? 0);

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

        try {

            setActionTaskId(taskId);

            setActionType("toggle");

            await taskService.toggleTask(taskId);

            await fetchTasks();

        } finally {

            setActionTaskId(null);

            setActionType(null);

        }

    };

    const moveTaskToToday = async (taskId) => {

        try {

            setActionTaskId(taskId);

            setActionType("move");

            await taskService.moveTaskToToday(taskId);

            await fetchTasks();

        } finally {

            setActionTaskId(null);

            setActionType(null);

        }

    };

    const deleteTask = async (taskId) => {

        try {

            setActionTaskId(taskId);

            setActionType("delete");

            await taskService.deleteTask(taskId);

            await fetchTasks();

        } finally {

            setActionTaskId(null);

            setActionType(null);

        }

    };

    return {

        tasks,

        todayTasks,

        overdueTasks,

        loading,

        error,

        progress,

        completedTasks,

        totalTasks,

        actionTaskId,

        actionType,

        addTask,

        toggleTask,

        moveTaskToToday,

        deleteTask,


        refreshTasks: fetchTasks



    };

}