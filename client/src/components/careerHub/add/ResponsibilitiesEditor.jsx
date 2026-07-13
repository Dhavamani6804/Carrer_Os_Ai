
function ResponsibilitiesEditor({
  responsibilities = [],
  setResponsibilities,
}) {
  function update(index, value) {
    const updated = [...responsibilities];
    updated[index] = value;
    setResponsibilities(updated);
  }

  function add() {
    setResponsibilities([
      ...responsibilities,
      "",
    ]);
  }

  function remove(index) {
    setResponsibilities(
      responsibilities.filter((_, i) => i !== index)
    );
  }

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold">
          Responsibilities
        </h3>

        <button
          onClick={add}
          className="text-blue-600 text-sm"
        >
          + Add
        </button>
      </div>

      <div className="space-y-2">
        {responsibilities.map((item, index) => (
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

export default ResponsibilitiesEditor;