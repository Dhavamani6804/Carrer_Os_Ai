import clsx from "clsx";

function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled = false,
    className = "",
    ...props
}) {

    const baseStyles = "rounded-2xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md"   

    const variants = {
        primary:
            "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]",

        secondary:
            "bg-gray-200 text-gray-900 hover:bg-gray-300",

        danger:
            "bg-red-500 text-white hover:bg-red-600",

        outline:
            "border border-gray-300 bg-white hover:bg-gray-50",
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            className={clsx(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && "w-full",
                className
            )}
            {...props}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}

export default Button;