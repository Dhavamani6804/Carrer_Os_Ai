function LoadingState() {
  return (
    <div className="grid gap-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-white rounded-2xl h-44"
        />
      ))}
    </div>
  );
}

export default LoadingState;