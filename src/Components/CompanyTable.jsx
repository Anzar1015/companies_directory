import React from "react";

export default function CompanyTable({ companies = [], loading = false }) {
  if (loading)
    return (
      <div className="p-6 bg-white rounded shadow text-center text-blue-600">
        Loading companies...
      </div>
    );
  if (!companies.length)
    return (
      <div className="p-6 bg-white rounded shadow text-center text-gray-500">
        No companies found.
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {companies.map((c) => (
        <div
          key={c.id}
          className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{c.name}</h3>
              <div className="text-sm text-gray-500">
                {c.industry} • {c.location}
              </div>
            </div>
            <div className="text-right text-sm">
              <div className="font-semibold text-blue-600">
                {c.employees.toLocaleString()}
              </div>
              <div className="text-gray-400">Employees</div>
            </div>
          </div>

          <p className="mt-3 text-sm text-gray-700 leading-relaxed">
            {c.description}
          </p>

          <div className="mt-3 text-xs text-gray-500">
            Founded: {c.founded}
          </div>
        </div>
      ))}
    </div>
  );
}
