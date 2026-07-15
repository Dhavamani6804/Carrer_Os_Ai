import { Copy, X } from "lucide-react";
import toast from "react-hot-toast";

function TailoredResumeModal({

    open,

    onClose,

    resume

}) {

    if (!open) return null;

    async function handleCopy() {

        await navigator.clipboard.writeText(resume);

        toast.success("Copied.");

    }

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            <div className="flex h-[90vh] w-[90vw] flex-col rounded-3xl bg-white shadow-2xl">

                <div className="flex items-center justify-between border-b p-6">

                    <h2 className="text-2xl font-bold">

                        ✨ Tailored Resume

                    </h2>

                    <button onClick={onClose}>

                        <X />

                    </button>

                </div>

                <div className="flex-1 overflow-auto p-8">

                    <pre className="whitespace-pre-wrap font-sans leading-7 text-slate-700">

                        {resume}

                    </pre>

                </div>

                <div className="flex justify-end gap-3 border-t p-6">

                    <button

                        onClick={handleCopy}

                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"

                    >

                        <Copy size={18} />

                        Copy

                    </button>

                    <button

                        onClick={onClose}

                        className="rounded-xl border px-5 py-3"

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}

export default TailoredResumeModal;