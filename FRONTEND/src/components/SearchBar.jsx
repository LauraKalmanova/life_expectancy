import * as React from "react";
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("city");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchTerm(""); // Réinitialiser le terme de recherche lorsque le type change
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, searchType);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="mb-4">
      <div className="flex items-center mb-2">
        <input
          type="text"
          placeholder={`Rechercher par ${searchType === "city" ? "ville" : searchType}`}
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-l p-2 w-full"
        />
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
          className="border rounded-r p-2 bg-primary text-primary-foreground"
        >
          <option value="city">Ville</option>
          <option value="department">Département</option>
          <option value="region">Région</option>
          <option value="life_expectancy">Espérance de vie</option>
        </select>
      </div>
      <button type="submit" className="bg-primary text-white p-2 rounded w-full">
        Rechercher
      </button>
    </form>
  );
}
