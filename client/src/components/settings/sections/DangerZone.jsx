import SettingsCard from "../common/SettingsCard";
import useAccount from "../../../hooks/useAccount";

function DangerZone() {

    function confirmAction(message){

        return window.confirm(message);

    }
    const {

    resetProgress,

    clearCareerHub,

    removeAccount

} = useAccount();

    return (

        <SettingsCard
            title="Danger Zone"
            description="These actions cannot be undone."
        >

            <div className="space-y-6">

                <div className="rounded-2xl border border-red-200 p-5">

                    <h3 className="font-semibold">

                        Reset Preparation Progress

                    </h3>

                    <p className="mt-2 text-sm text-slate-500">

                        Delete all completed preparation progress.

                    </p>

                    <button

                        onClick={()=>{

                            if(confirmAction(
                                "Reset all preparation progress?"
                            )){

                                resetProgress();

                            }

                        }}

                        className="mt-4 rounded-xl bg-red-500 px-5 py-3 text-white"

                    >

                        Reset Progress

                    </button>

                </div>

                <div className="rounded-2xl border border-red-200 p-5">

                    <h3 className="font-semibold">

                        Delete Career Hub

                    </h3>

                    <p className="mt-2 text-sm text-slate-500">

                        Delete every saved application.

                    </p>

                    <button

                        onClick={()=>{

                            if(confirmAction(
                                "Delete all applications?"
                            )){

                                clearCareerHub();

                            }

                        }}

                        className="mt-4 rounded-xl bg-red-500 px-5 py-3 text-white"

                    >

                        Delete Applications

                    </button>

                </div>

                <div className="rounded-2xl border border-red-400 bg-red-50 p-5">

                    <h3 className="font-semibold text-red-700">

                        Delete Account

                    </h3>

                    <p className="mt-2 text-red-600">

                        Permanently delete your CareerOS account.

                    </p>

                    <button

                        onClick={()=>{

                            if(confirmAction(
                                "Delete your account permanently?"
                            )){

                                removeAccount();

                            }

                        }}

                        className="mt-4 rounded-xl bg-red-700 px-6 py-3 text-white"

                    >

                        Delete Account

                    </button>

                </div>

            </div>

        </SettingsCard>

    );

}

export default DangerZone;