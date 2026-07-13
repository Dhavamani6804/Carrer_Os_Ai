import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

import JDInputCard from "../../components/careerHub/add/JDInputCard";
import AIProgress from "../../components/careerHub/add/AIProgress";
import AIReviewForm from "../../components/careerHub/add/AIReviewForm";

import { analyzeJD, createApplication } from "../../services/careerHubService";

function AddApplicationPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "",
    jobDescription: "",
    jobUrl: "",
    source: "LINKEDIN",

    company: "",
    companyLogo: "",

    salary: "",
    location: "",

    workMode: "",
    employmentType: "",
    experienceLevel: "",

    skills: [],
    requirements: [],
    responsibilities: [],

    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const [showReview, setShowReview] = useState(false);

  const [analyzing, setAnalyzing] = useState(false);

  async function handleAnalyze() {
    if (!form.role.trim()) {
      toast.error("Job role is required.");
      return;
    }

    if (!form.jobDescription.trim()) {
      toast.error("Please paste the Job Description.");
      return;
    }

    try {
      setAnalyzing(true);

      const analysis = await analyzeJD({
        role: form.role,
        jobDescription: form.jobDescription,
      });

      setForm((prev) => ({
        ...prev,

        company: analysis.company || "",
        companyLogo: analysis.companyLogo || "",

        salary: analysis.salary || "",
        location: analysis.location || "",

        workMode: analysis.workMode || "",
        employmentType: analysis.employmentType || "",
        experienceLevel: analysis.experienceLevel || "",

        skills: analysis.skills || [],
        requirements: analysis.requirements || [],
        responsibilities: analysis.responsibilities || [],
      }));

      setShowReview(true);

      toast.success("AI Analysis Complete ✨");
    } catch (error) {
      console.error(error);
      toast.error("Unable to analyze Job Description.");
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleSave() {
    try {
      setLoading(true);

      const payload = {
        ...form,

        workMode: form.workMode || null,
        employmentType: form.employmentType || null,
        experienceLevel: form.experienceLevel || null,

        salary: form.salary || null,
        location: form.location || null,
        companyLogo: form.companyLogo || null,
        jobUrl: form.jobUrl || null,
        notes: form.notes || null,
      };

      await createApplication(payload);

      toast.success("Application Added Successfully 🚀");

      navigate("/career-hub");
    } catch (error) {
      console.error(error);
      toast.error("Unable to save application.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        <JDInputCard
          form={form}
          setForm={setForm}
          loading={analyzing}
          onAnalyze={handleAnalyze}
        />

        {analyzing && <AIProgress />}

        {showReview && !analyzing && (
          <AIReviewForm
            form={form}
            setForm={setForm}
            loading={loading}
            onSave={handleSave}
          />
        )}
      </div>
    </DashboardLayout>
  );
}

export default AddApplicationPage;
