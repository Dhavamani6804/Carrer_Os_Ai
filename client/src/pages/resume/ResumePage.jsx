import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  uploadResume,
  getResume,
  deleteResume,
  downloadResume,
} from "../../services/resumeService";
import toast from "react-hot-toast";
import { useRef } from "react";

function ResumePage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [resume, setResume] = useState(null);

  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    loadResume();
  }, []);

  async function loadResume() {
    try {
      const data = await getResume();

      setResume(data);
    } catch {
      setResume(null);
    }
  }

  async function handleUpload() {
    if (!selectedFile) {
      toast.error("Please select a PDF");

      return;
    }

    setUploading(true);

    try {
      await uploadResume(selectedFile);

      await loadResume();

      setSelectedFile(null);

      toast.success("Resume uploaded successfully");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <h1 className="text-4xl font-bold">Resume</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpload();
          }}
        >
          <p className="text-gray-500 mt-2">
            Upload and manage your professional resume.
          </p>
          <div className="bg-white rounded-3xl shadow p-8">
            <h2 className="text-2xl font-semibold">Upload Resume</h2>

            <p className="text-gray-500 mt-2">PDF only (Max 5 MB)</p>

            {/* Hidden File Input */}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />

            {/* Choose Button */}

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="mt-6 px-6 py-3 border rounded-xl hover:bg-gray-100"
            >
              Choose PDF
            </button>

            {/* Selected File */}

            {selectedFile && (
              <p className="mt-4 text-green-600 font-medium">
                📄 {selectedFile.name}
              </p>
            )}

            {/* Upload Button */}

            <button
              type="submit"
              disabled={!selectedFile || uploading}
              className={`mt-6 ml-4 px-6 py-3 rounded-xl text-white ${
                !selectedFile || uploading
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {uploading ? "Uploading..." : "Upload Resume"}
            </button>
          </div>

          {resume ? (
            <div className="bg-white rounded-3xl shadow p-8 mt-8">
              <h2 className="text-2xl font-semibold">Current Resume</h2>

              <p className="mt-4">{resume.fileName}</p>

              <p>{(resume.fileSize / 1024).toFixed(1)} KB</p>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    downloadResume();
                    toast.success("Download started");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  Download
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await deleteResume();

                      setResume(null);

                      toast.success("Resume deleted successfully");
                    } catch (error) {
                      console.error(error);

                      toast.error("Unable to delete resume");
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow p-8 mt-8">
              <h2 className="text-2xl font-semibold">Current Resume</h2>

              <p className="text-gray-500 mt-4">No resume uploaded yet.</p>
            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}

export default ResumePage;
