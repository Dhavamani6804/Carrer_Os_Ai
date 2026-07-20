import { useState } from "react";
import {
    Plus,
    AlertTriangle,
    CheckCircle2
} from "lucide-react";

import Card from "../../../components/ui/Card";

import useDailyTasks from "../../../hooks/useDailyTasks";

import ProgressCircle from "./ProgressCircle";
import TaskItem from "./TaskItem";
import AddTaskModal from "./AddTaskModal";

function TodaysFocus({

    currentStreak = 0,

    bestStreak = 0

}) {

    const {

        todayTasks,

        overdueTasks,

        loading,

        progress,

        completedTasks,

        totalTasks,

        addTask,

        toggleTask,

        moveTaskToToday,

        deleteTask,

        actionTaskId,

        actionType

    } = useDailyTasks();

    const [openModal, setOpenModal] = useState(false);

    return (

        <>

            <Card>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* LEFT */}

                    <div className="flex-1">

                        {/* Header */}

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-2xl font-bold">

                                    Today's Focus

                                </h2>

                                <p className="text-slate-500 mt-1">

                                    Stay consistent. Complete today's goals.

                                </p>

                            </div>

                            <button

                                onClick={() => setOpenModal(true)}

                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"

                            >

                                <Plus size={18} />

                                Add Task

                            </button>

                        </div>

                        {/* Streak */}

                        <div className="grid grid-cols-2 gap-4 mt-6">

                            <div className="rounded-xl bg-orange-50 p-5">

                                <p className="text-orange-600 text-sm">

                                    🔥 Current Streak

                                </p>

                                <h2 className="text-3xl font-bold mt-2">

                                    {currentStreak}

                                </h2>

                                <p className="text-gray-500">

                                    Days

                                </p>

                            </div>

                            <div className="rounded-xl bg-emerald-50 p-5">

                                <p className="text-emerald-600 text-sm">

                                    🏆 Best Streak

                                </p>

                                <h2 className="text-3xl font-bold mt-2">

                                    {bestStreak}

                                </h2>

                                <p className="text-gray-500">

                                    Days

                                </p>

                            </div>

                        </div>

                        {/* Loading Skeleton */}

                        {

                            loading && (

                                <div className="space-y-3 py-8">

                                    {

                                        [...Array(4)].map((_, index) => (

                                            <div

                                                key={index}

                                                className="h-16 rounded-xl bg-slate-200 animate-pulse"

                                            />

                                        ))

                                    }

                                </div>

                            )

                        }

                        {/* Overdue Tasks */}

                        {

                            !loading && overdueTasks.length > 0 && (

                                <div className="mt-8">

                                    <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 p-4">

                                        <p className="font-semibold text-amber-700">

                                            ⚠ Attention Required

                                        </p>

                                        <p className="text-sm text-amber-700 mt-1">

                                            These tasks were not completed yesterday.

                                            Move them to today's list or delete them.

                                        </p>

                                    </div>

                                    <div className="flex items-center gap-2 mb-4">

                                        <AlertTriangle

                                            className="text-amber-500"

                                            size={22}

                                        />

                                        <h3 className="text-xl font-semibold">

                                            Overdue Tasks

                                        </h3>

                                    </div>

                                    <div className="space-y-3">

                                        {

                                            overdueTasks.map(task => (

                                                <TaskItem

                                                    key={task.id}

                                                    task={task}

                                                    onMove={moveTaskToToday}

                                                    onDelete={deleteTask}

                                                    actionTaskId={actionTaskId}

                                                    actionType={actionType}

                                                />

                                            ))

                                        }

                                    </div>

                                </div>

                            )

                        }

                        {/* Today's Tasks */}

                        {

                            !loading && (

                                <div className="mt-8">

                                    <div className="flex items-center gap-2 mb-4">

                                        <CheckCircle2

                                            className="text-blue-600"

                                            size={22}

                                        />

                                        <h3 className="text-xl font-semibold">

                                            Today's Tasks

                                        </h3>

                                    </div>

                                    {

                                        todayTasks.length === 0 ? (

                                            <div className="border-2 border-dashed rounded-xl py-12 text-center">

                                                <div className="text-5xl">

                                                    🎯

                                                </div>

                                                <h3 className="font-bold text-lg mt-4">

                                                    Ready for a productive day?

                                                </h3>

                                                <p className="text-gray-500 mt-2">

                                                    Add your first task and start building your streak.

                                                </p>

                                                <button

                                                    onClick={() => setOpenModal(true)}

                                                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"

                                                >

                                                    Add Your First Task

                                                </button>

                                            </div>

                                        ) : (

                                            <div className="space-y-3">

                                                {

                                                    todayTasks.map(task => (

                                                        <TaskItem

                                                            key={task.id}

                                                            task={task}

                                                            onToggle={toggleTask}

                                                            onDelete={deleteTask}

                                                            actionTaskId={actionTaskId}

                                                            actionType={actionType}

                                                        />

                                                    ))

                                                }

                                            </div>

                                        )

                                    }

                                </div>

                            )

                        }

                    </div>

                    {/* RIGHT */}

                    <div className="lg:w-80">

                        <ProgressCircle

                            progress={progress}

                            completed={completedTasks}

                            total={totalTasks}

                        />

                    </div>

                </div>

            </Card>

            <AddTaskModal

                open={openModal}

                onClose={() => setOpenModal(false)}

                onAdd={addTask}

            />

        </>

    );

}

export default TodaysFocus;