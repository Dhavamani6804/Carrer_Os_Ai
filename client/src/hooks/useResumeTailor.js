import { useState } from "react";
import toast from "react-hot-toast";

import { tailorResume } from "../services/resumeTailorService";

function useResumeTailor() {

    const [loading, setLoading] = useState(false);

    const [resume, setResume] = useState("");

    const [open, setOpen] = useState(false);

    async function generate(applicationId) {

        try {

            setLoading(true);

            const response =
                await tailorResume(applicationId);

            setResume(response.tailoredResume);

            setOpen(true);

            toast.success(
                "Resume tailored successfully."
            );

        } catch (e) {

            console.error(e);

            toast.error(
                "Unable to tailor resume."
            );

        } finally {

            setLoading(false);

        }

    }

    return {

        loading,

        resume,

        open,

        setOpen,

        generate

    };

}

export default useResumeTailor;