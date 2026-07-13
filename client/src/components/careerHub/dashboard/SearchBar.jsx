import { Search } from "lucide-react";

function SearchBar({
  value,
  onChange,
}) {
  return (
    <div className="relative">
      <Search
        className="absolute left-4 top-3.5 text-gray-400"
        size={20}
      />

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search applications..."
        className="w-full bg-white rounded-xl border pl-12 pr-4 py-3"
      />
    </div>
  );
}

export default SearchBar;