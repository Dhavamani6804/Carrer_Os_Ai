function ToggleSwitch({
  checked,

  onChange,
}) {
  return (
    <button
      onClick={() =>
        onChange(!checked)
      }
      className={`relative h-7 w-14 rounded-full transition

${
  checked
    ? "bg-blue-600"
    : "bg-slate-300"
}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition

${
  checked
    ? "left-8"
    : "left-1"
}`}
      />
    </button>
  );
}

export default ToggleSwitch;