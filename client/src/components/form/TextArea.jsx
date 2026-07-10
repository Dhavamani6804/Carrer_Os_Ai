function TextArea({
  label,

  value,

  onChange,

  rows = 5,

  placeholder,
}) {
  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">{label}</label>

      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    py-3
                    outline-none
                    transition-all
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-blue-500
                "
      />
    </div>
  );
}

export default TextArea;
