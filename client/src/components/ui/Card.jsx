import clsx from "clsx";

function Card({ children, className = "" }) {
  return (
    <div
      className={clsx(
        "bg-white",
        "rounded-3xl",
        "shadow-xl",
        "border border-slate-200",
        "p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return <div className="mb-6">{children}</div>;
}

export function CardBody({ children }) {
  return <div>{children}</div>;
}

export function CardFooter({ children }) {
  return <div className="mt-6 pt-4 border-t border-gray-200">{children}</div>;
}

export default Card;
