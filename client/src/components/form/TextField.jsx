function TextField({
  label,

  value,

  onChange,

  placeholder,

  type = "text",

  disabled = false,
}) {
  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700">{label}</label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
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

export default TextField;
