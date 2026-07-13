
import SkillsEditor from "./SkillsEditor";
import RequirementsEditor from "./RequirementsEditor";
import ResponsibilitiesEditor from "./ResponsibilitiesEditor";
import SaveApplicationButton from "./SaveApplicationButton";

function AIReviewForm({
  form,
  setForm,
  loading,
  onSave,
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-8">

      <h2 className="text-2xl font-bold">
        Review AI Extraction
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          value={form.company || ""}
          onChange={(e) =>
            setForm({
              ...form,
              company: e.target.value,
            })
          }
          placeholder="Company"
          className="border rounded-xl px-4 py-3"
        />

        <input
          value={form.salary || ""}
          onChange={(e) =>
            setForm({
              ...form,
              salary: e.target.value,
            })
          }
          placeholder="Salary"
          className="border rounded-xl px-4 py-3"
        />

        <input
          value={form.location || ""}
          onChange={(e) =>
            setForm({
              ...form,
              location: e.target.value,
            })
          }
          placeholder="Location"
          className="border rounded-xl px-4 py-3"
        />

        <input
          value={form.companyLogo || ""}
          onChange={(e) =>
            setForm({
              ...form,
              companyLogo: e.target.value,
            })
          }
          placeholder="Company Logo URL"
          className="border rounded-xl px-4 py-3"
        />
      </div>

      <SkillsEditor
        skills={form.skills}
        setSkills={(skills) =>
          setForm({
            ...form,
            skills,
          })
        }
      />

      <RequirementsEditor
        requirements={form.requirements}
        setRequirements={(requirements) =>
          setForm({
            ...form,
            requirements,
          })
        }
      />

      <ResponsibilitiesEditor
        responsibilities={form.responsibilities}
        setResponsibilities={(responsibilities) =>
          setForm({
            ...form,
            responsibilities,
          })
        }
      />

      <div className="flex justify-end">
        <SaveApplicationButton
          loading={loading}
          onClick={onSave}
        />
      </div>
    </div>
  );
}

export default AIReviewForm;