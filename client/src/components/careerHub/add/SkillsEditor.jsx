
function SkillsEditor({ skills = [], setSkills }) {
  function updateSkill(index, value) {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);
  }

  function addSkill() {
    setSkills([...skills, ""]);
  }

  function removeSkill(index) {
    setSkills(skills.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold">Skills</h3>

        <button
          type="button"
          onClick={addSkill}
          className="text-blue-600 text-sm"
        >
          + Add
        </button>
      </div>

      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex gap-2"
          >
            <input
              value={skill}
              onChange={(e) =>
                updateSkill(index, e.target.value)
              }
              className="flex-1 border rounded-xl px-3 py-2"
            />

            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsEditor;