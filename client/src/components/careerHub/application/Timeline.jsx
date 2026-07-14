import TimelineItem from "./TimelineItem";

function Timeline({
  items = [],
  onEdit,
  onDelete,
}) {
  if (!items.length) {
    return (
      <p className="text-slate-500">
        No timeline events yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <TimelineItem
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default Timeline;