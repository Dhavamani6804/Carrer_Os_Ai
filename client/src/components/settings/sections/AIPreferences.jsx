import SettingsCard from "../common/SettingsCard";

import ToggleSwitch from "../common/ToggleSwitch";

import SettingRow from "../common/SettingRow";

function AIPreferences({

    settings,

    setSettings

}) {

    return (

        <SettingsCard

            title="AI Preferences"

            description="Customize AI behavior."

        >

            <div>

                <label className="font-medium">

                    Mentor Level

                </label>

                <select

                    className="mt-2 w-full rounded-xl border p-3"

                    value={settings.mentorLevel}

                    onChange={(e) =>

                        setSettings({

                            ...settings,

                            mentorLevel: e.target.value

                        })

                    }

                >

                    <option>

                        BEGINNER

                    </option>

                    <option>

                        INTERMEDIATE

                    </option>

                    <option>

                        EXPERT

                    </option>

                </select>

            </div>

            <div>

                <label className="font-medium">

                    Answer Length

                </label>

                <select

                    className="mt-2 w-full rounded-xl border p-3"

                    value={settings.answerLength}

                    onChange={(e) =>

                        setSettings({

                            ...settings,

                            answerLength: e.target.value

                        })

                    }

                >

                    <option>

                        SHORT

                    </option>

                    <option>

                        MEDIUM

                    </option>

                    <option>

                        DETAILED

                    </option>

                </select>

            </div>

            <SettingRow

                label="Auto Generate Preparation"

            >

                <ToggleSwitch

                    checked={settings.autoGeneratePreparation}

                    onChange={(value) =>

                        setSettings({

                            ...settings,

                            autoGeneratePreparation: value

                        })

                    }

                />

            </SettingRow>

            <SettingRow

                label="Personalized Recommendations"

            >

                <ToggleSwitch

                    checked={settings.personalizedRecommendations}

                    onChange={(value) =>

                        setSettings({

                            ...settings,

                            personalizedRecommendations: value

                        })

                    }

                />

            </SettingRow>

        </SettingsCard>

    );

}

export default AIPreferences;