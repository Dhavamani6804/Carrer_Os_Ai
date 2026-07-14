import SettingsCard from "../common/SettingsCard";
import SettingRow from "../common/SettingRow";
import ToggleSwitch from "../common/ToggleSwitch";

function PrivacySettings({
    settings,
    setSettings
}) {

    return (

        <SettingsCard
            title="Privacy"
            description="Control how your information is shared."
        >

            <SettingRow
                label="Public Profile"
                description="Allow recruiters to discover your CareerOS profile."
            >

                <ToggleSwitch
                    checked={settings.profileVisible}
                    onChange={(value)=>

                        setSettings({

                            ...settings,

                            profileVisible:value

                        })

                    }
                />

            </SettingRow>

            <div className="border-t pt-6">

                <h3 className="font-semibold text-lg">

                    Export Data

                </h3>

                <p className="text-slate-500 mt-2">

                    Download all your CareerOS information.

                </p>

                <button
                    className="mt-5 rounded-xl border px-5 py-3 hover:bg-slate-100"
                >
                    Export My Data
                </button>

            </div>

        </SettingsCard>

    );

}

export default PrivacySettings;