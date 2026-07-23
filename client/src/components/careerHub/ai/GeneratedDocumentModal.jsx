import { X, Copy, Download } from "lucide-react";

export default function GeneratedDocumentModal({

    open,
    title,
    content,
    onClose

}) {

    if (!open) return null;

    const handleCopy = async () => {

        try {

            await navigator.clipboard.writeText(content);

            alert("Copied to clipboard!");

        } catch {

            alert("Unable to copy.");

        }

    };

    const handleDownload = () => {

        const blob = new Blob(
            [content],
            { type: "text/plain;charset=utf-8" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = `${title}.txt`;

        link.click();

        URL.revokeObjectURL(url);

    };

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

            <div className="flex h-[80vh] w-[90%] max-w-5xl flex-col rounded-xl bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-xl font-semibold">

                        {title}

                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded p-2 transition hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Content */}

                <div className="flex-1 overflow-y-auto p-6">

                    <pre className="whitespace-pre-wrap break-words font-sans leading-7 text-gray-700">

                        {content}

                    </pre>

                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 border-t px-6 py-4">

                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                        <Copy size={18} />

                        Copy
                    </button>

                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                    >
                        <Download size={18} />

                        Download
                    </button>

                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );

}