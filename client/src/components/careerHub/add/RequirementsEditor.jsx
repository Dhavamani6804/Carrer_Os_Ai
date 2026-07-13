
function RequirementsEditor({
  requirements = [],
  setRequirements,
}) {
  function update(index, value) {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  }

  function add() {
    setRequirements([...requirements, ""]);
  }

  function remove(index) {
    setRequirements(
      requirements.filter((_, i) => i !== index)
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">
          Requirements
        </h3>

        <button
          onClick={add}
          type="button"
          className="text-blue-600 text-sm"
        >
          + Add
        </button>
      </div>

      <div className="space-y-2">
        {requirements.map((item, index) => (
          <div
            key={index}
            className="flex gap-2"
          >
            <textarea
              rows={2}
              value={item}
              onChange={(e) =>
                update(index, e.target.value)
              }
              className="flex-1 border rounded-xl p-3"
            />

            <button
              onClick={() => remove(index)}
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

export default RequirementsEditor;