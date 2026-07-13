function Card({
  title,
  value,
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-gray-500">{title}</p>

      <h2 className="text-3xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}

function StatsCards({
  stats,
}) {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-5">
      <Card
        title="Wishlist"
        value={stats.wishlist}
      />

      <Card
        title="Applied"
        value={stats.applied}
      />

      <Card
        title="Interview"
        value={stats.interviewing}
      />

      <Card
        title="Offers"
        value={stats.offers}
      />

      <Card
        title="Joined"
        value={stats.joined}
      />

      <Card
        title="Rejected"
        value={stats.rejected}
      />
    </div>
  );
}

export default StatsCards;