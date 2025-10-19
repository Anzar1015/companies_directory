import React from "react";

export default function Filters({
  query,
  setQuery,
  industry,
  setIndustry,
  industries = [],
  location,
  setLocation,
  locations = [],
  sortBy,
  setSortBy,
  clear,
}) {
  return (
    <div className="bg-white shadow border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row gap-3 md:items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="🔍 Search by name, industry or location..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      <select
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        className="px-3 py-2 border border-gray-300 cursor-pointer rounded text-sm bg-gray-50 focus:ring-2 focus:ring-blue-300"
      >
        <option value="">All industries</option>
        {industries.map((i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="px-3 py-2 border border-gray-300 cursor-pointer rounded text-sm bg-gray-50 focus:ring-2 focus:ring-blue-300"
      >
        <option value="">All locations</option>
        {locations.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-3 py-2 border border-gray-300 cursor-pointer rounded text-sm bg-gray-50 focus:ring-2 focus:ring-blue-300"
      >
        <option value="name-asc">Name ↑</option>
        <option value="name-desc">Name ↓</option>
        <option value="employees-asc">Employees ↑</option>
        <option value="employees-desc">Employees ↓</option>
      </select>

      <button
        onClick={clear}
        className="ml-auto cursor-pointer md:ml-0 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Clear
      </button>
    </div>
  );
}
