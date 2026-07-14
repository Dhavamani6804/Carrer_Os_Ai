import SettingsCard from "../common/SettingsCard";

function CareerSettings({

    settings,

    setSettings

}) {

    return (

        <SettingsCard

            title="Career Preferences"

            description="Help AI personalize recommendations."

        >

            <div className="grid md:grid-cols-2 gap-6">

                <div>

                    <label className="font-medium">

                        Expected Salary

                    </label>

                    <input

                        className="mt-2 w-full rounded-xl border p-3"

                        value={settings.expectedSalary}

                        onChange={(e) =>

                            setSettings({

                                ...settings,

                                expectedSalary: e.target.value

                            })

                        }

                    />

                </div>

                <div>

                    <label className="font-medium">

                        Daily Study Goal (hours)

                    </label>

                    <input

                        type="number"

                        className="mt-2 w-full rounded-xl border p-3"

                        value={settings.dailyStudyGoal}

                        onChange={(e) =>

                            setSettings({

                                ...settings,

                                dailyStudyGoal:

                                    Number(e.target.value)

                            })

                        }

                    />

                </div>

            </div>

            <div>

                <label className="font-medium">

                    Preferred Skills

                </label>

                <input

                    className="mt-2 w-full rounded-xl border p-3"

                    value={settings.preferredSkills.join(", ")}

                    onChange={(e) =>

                        setSettings({

                            ...settings,

                            preferredSkills:

                                e.target.value

                                    .split(",")

                                    .map(skill => skill.trim())

                                    .filter(Boolean)

                        })

                    }

                />

            </div>

        </SettingsCard>

    );

}

export default CareerSettings;