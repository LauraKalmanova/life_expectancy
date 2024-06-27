import * as React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from 'react';

export default function Home() {
  const [cities, setCities] = useState([]);
  const [totalCities, setTotalCities] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [searchParams, setSearchParams] = useState({
    cityName: '',
    departmentName: '',
    regionName: '',
    lifeExpectancy: ''
  });

  useEffect(() => {
    fetchCities();
  }, [currentPage, pageSize, searchParams]);

  const handleInputChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setInputPage("");
    }
  };

  const handleSearch = (searchTerm, searchType) => {
    setCurrentPage(1);
    setSearchParams(prevParams => ({
      ...prevParams,
      cityName: searchType === 'city' ? searchTerm : '',
      departmentName: searchType === 'department' ? searchTerm : '',
      regionName: searchType === 'region' ? searchTerm : '',
      lifeExpectancy: searchType === 'life_expectancy' ? searchTerm : ''
    }));
  };

  const fetchCities = () => {
    let url = `http://localhost:3000/api/v1/cities?page=${currentPage}&pageSize=${pageSize}`;

    // Append search filters to URL if they exist
    if (searchParams.cityName) {
      url += `&cityName=${searchParams.cityName}`;
    }
    if (searchParams.departmentName) {
      url += `&departmentName=${searchParams.departmentName}`;
    }
    if (searchParams.regionName) {
      url += `&regionName=${searchParams.regionName}`;
    }
    if (searchParams.lifeExpectancy) {
      url += `&lifeExpectancy=${searchParams.lifeExpectancy}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCities(data.cities);
        setTotalCities(data.total);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevState => prevState + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <main className="flex-1 py-8 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid gap-8">
          <section>
            <h1 className="text-3xl font-bold mb-4">Espérance de vie en France</h1>
            <p className="text-muted-foreground">
              Découvrez l'espérance de vie moyenne dans les villes de France.
            </p>
          </section>
          <section>
            <SearchBar onSearch={handleSearch} />
            <div className="bg-card rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cities.map((city, index) => (
                    <div key={index} className="bg-background rounded-lg shadow p-4">
                        {city.name} - {city.LifeExpectancy.life_expectancy} ans
                      <p className="text-muted-foreground">
                        {city.Department.name}, {city.Department.Region.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="mt-4">
            <div className="flex justify-center space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
                className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
              >
                Précédent
              </button>
              <span>Page {currentPage} sur {totalPages}</span>
              <button
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
                className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <input
                type="number"
                value={inputPage}
                onChange={handleInputChange}
                className="px-4 py-2 border rounded"
                placeholder="Numéro de page"
              />
              <button
                onClick={handleGoToPage}
                className="px-4 py-2 bg-primary text-primary-foreground rounded ml-2"
              >
                Aller à la page
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}



function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
