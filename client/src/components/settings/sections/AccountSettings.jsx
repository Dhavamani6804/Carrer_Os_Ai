import SettingsCard from "../common/SettingsCard";

function AccountSettings({

    settings,

    setSettings

}) {

    return (

        <SettingsCard

            title="Account"

            description="Manage your account information."

        >

            <div className="grid md:grid-cols-2 gap-6">

                <div>

                    <label className="font-medium">

                        Preferred Role

                    </label>

                    <input

                        className="mt-2 w-full rounded-xl border p-3"

                        value={settings.preferredRole}

                        onChange={(e) =>

                            setSettings({

                                ...settings,

                                preferredRole: e.target.value

                            })

                        }

                    />

                </div>

                <div>

                    <label className="font-medium">

                        Preferred Location

                    </label>

                    <input

                        className="mt-2 w-full rounded-xl border p-3"

                        value={settings.preferredLocation}

                        onChange={(e) =>

                            setSettings({

                                ...settings,

                                preferredLocation: e.target.value

                            })

                        }

                    />

                </div>

            </div>

        </SettingsCard>

    );

}

export default AccountSettings;