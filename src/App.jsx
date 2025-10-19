import React, { useEffect, useMemo, useState } from "react";
import companiesData from "./data/companies.json";
import CompanyTable from "./components/CompanyTable";
import Filters from "./components/Filters";

export default function App() {
  const [companies, setCompanies] = useState([]);
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  useEffect(() => {
    setCompanies(companiesData);
  }, []);

  const industries = useMemo(
    () => [...new Set(companies.map((c) => c.industry))],
    [companies]
  );
  const locations = useMemo(
    () => [...new Set(companies.map((c) => c.location))],
    [companies]
  );

  const filtered = useMemo(() => {
    let list = companies.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((c) =>
        (c.name + " " + c.industry + " " + c.location)
          .toLowerCase()
          .includes(q)
      );
    }
    if (industry) list = list.filter((c) => c.industry === industry);
    if (location) list = list.filter((c) => c.location === location);

    if (sortBy === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "name-desc")
      list.sort((a, b) => b.name.localeCompare(a.name));
    else if (sortBy === "employees-asc") list.sort((a, b) => a.employees - b.employees);
    else if (sortBy === "employees-desc") list.sort((a, b) => b.employees - a.employees);

    return list;
  }, [companies, query, industry, location, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-700">Companies Directory</h1>
        </header>

        <Filters
          query={query}
          setQuery={setQuery}
          industry={industry}
          setIndustry={setIndustry}
          industries={industries}
          location={location}
          setLocation={setLocation}
          locations={locations}
          sortBy={sortBy}
          setSortBy={setSortBy}
          clear={() => {
            setQuery("");
            setIndustry("");
            setLocation("");
            setSortBy("name-asc");
          }}
        />

        <main className="mt-8">
          <CompanyTable companies={paginated} loading={companies.length === 0} />

          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{paginated.length}</span> of{" "}
              <span className="font-semibold">{filtered.length}</span> results
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1 rounded bg-blue-100 cursor-pointer hover:bg-blue-200 text-blue-700 border border-blue-200 disabled:opacity-50"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </button>

              <div className="text-sm font-medium">
                Page {page} / {totalPages}
              </div>

              <button
                className="px-3 py-1 rounded bg-blue-100 cursor-pointer hover:bg-blue-200 text-blue-700 border border-blue-200 disabled:opacity-50"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
