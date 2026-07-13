function DailyProgressCard({
    progress,
    totalTechnical = 0,
    totalCoding = 0,
    totalRoadmap = 0,
}) {

    const percentage =
        progress?.progressPercentage ?? 0;

    return (

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold">
                    Preparation Progress
                </h2>

                <span className="text-4xl font-bold text-blue-600">
                    {percentage}%
                </span>

            </div>

            <div className="mt-6 h-4 rounded-full bg-slate-200 overflow-hidden">

                <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
                    style={{
                        width: `${percentage}%`
                    }}
                />

            </div>

            <div className="mt-8 grid grid-cols-3 gap-5">

                <div className="rounded-xl bg-slate-50 p-4">

                    <p className="text-2xl font-bold">

                        {progress?.completedTechnicalTopics || 0}
                        {" / "}
                        {totalTechnical}

                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Technical
                    </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-4">

                    <p className="text-2xl font-bold">

                        {progress?.completedCodingTopics || 0}
                        {" / "}
                        {totalCoding}

                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Coding
                    </p>

                </div>

                <div className="rounded-xl bg-slate-50 p-4">

                    <p className="text-2xl font-bold">

                        {progress?.completedRoadmapSteps || 0}
                        {" / "}
                        {totalRoadmap}

                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                        Roadmap
                    </p>

                </div>

            </div>

        </div>

    );

}

export default DailyProgressCard;