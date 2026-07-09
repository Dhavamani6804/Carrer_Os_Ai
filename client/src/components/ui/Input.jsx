function Input({
    type = "text",
    placeholder,
    register,
    name,
    error,
}) {
    return (
        <div className="mb-5">

            <input
                type={type}
                placeholder={placeholder}
                {...register(name)}
                className={`
                    w-full
                    px-4
                    py-3
                    rounded-lg
                    border
                    outline-none
                    transition

                    ${
                        error
                            ? "border-red-500"
                            : "border-gray-300 focus:border-blue-500"
                    }
                `}
            />

            {error && (
                <p className="mt-2 text-sm text-red-500">
                    {error.message}
                </p>
            )}

        </div>
    );
}

export default Input;