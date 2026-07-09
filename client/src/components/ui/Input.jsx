import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import clsx from "clsx";

function Input({
  label,
  name,
  type = "text",
  placeholder = "",
  register,
  error,
  disabled = false,
  className = "",
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          {...register(name)}
          className={clsx(
            "w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none",
            error ? "border-red-500" : "border-gray-300",
            disabled && "bg-gray-100 cursor-not-allowed",
            className,
          )}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default Input;
