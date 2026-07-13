import TimelineItem from "./TimelineItem";

function Timeline({ items = [] }) {
  if (items.length === 0) {
    return (
      <p className="text-slate-500">
        No timeline events yet.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          item={item}
        />
      ))}
    </div>
  );
}

export default Timeline;