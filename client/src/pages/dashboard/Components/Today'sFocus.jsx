import { useState } from "react";
import { Plus } from "lucide-react";

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

        tasks,

        loading,

        progress,

        completedTasks,

        totalTasks,

        addTask,

        toggleTask,

        deleteTask

    } = useDailyTasks();

    const [openModal, setOpenModal] = useState(false);

    return (

        <>

            <Card>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Side */}

                    <div className="flex-1">

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

                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"

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

                        {/* Tasks */}

                        <div className="mt-8 space-y-3">

                            {

                                loading ?

                                    (

                                        <div className="text-center py-10 text-gray-500">

                                            Loading tasks...

                                        </div>

                                    )

                                    :

                                    tasks.length === 0 ?

                                        (

                                            <div className="border-2 border-dashed rounded-xl py-10 text-center">

                                                <h3 className="font-semibold">

                                                    No Tasks Today

                                                </h3>

                                                <p className="text-gray-500 mt-2">

                                                    Add your first task to begin your streak.

                                                </p>

                                            </div>

                                        )

                                        :

                                        tasks.map(task => (

                                            <TaskItem

                                                key={task.id}

                                                task={task}

                                                onToggle={toggleTask}

                                                onDelete={deleteTask}

                                            />

                                        ))

                            }

                        </div>

                    </div>

                    {/* Right Side */}

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