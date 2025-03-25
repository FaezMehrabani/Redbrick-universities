"use client"; // This is a client component

import React, { useState, useEffect } from "react";
import CountrySelector from "./countrySelector";
import SearchBox from "./searchBox";
import classes from "./filterableTable.module.scss";
import Table from "./table";

const countries = ["Canada", "United States", "Mexico", "France"]; // This would ideally come from an API or be more dynamic
const initialCountry = "CANADA";

const FilterableTable = () => {
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [favorites, setFavorites] = useState(new Set());
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [responseCode, setResponseCode] = useState<number | null>(null);

  const fetchData = async () => {
    const startTime = Date.now();
    try {
      const res = await fetch(
        `/api/universities?country=${selectedCountry}&name=${searchText}`
      );
      const endTime = Date.now();
      setResponseCode(res.status);
      setResponseTime(endTime - startTime);

      const data = await res.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedCountry, searchText]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const res = await fetch("/api/favorites");
      const data = await res.json();
      if (res.ok)
        setFavorites(new Set(data.map((fav: any) => fav.university_id)));
    };
    fetchFavorites();
  }, []);

  const onToggleFavorite = async (id: number) => {
    const startTime = Date.now();
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ universityId: id }),
      });

      const endTime = Date.now();
      setResponseCode(res.status);
      setResponseTime(endTime - startTime);

      const data = await res.json();
      if (res.ok) {
        setFavorites((prevFavorites) => {
          const newFavorites = new Set(prevFavorites);
          if (data.isFavorite) {
            newFavorites.add(id); // Add to favorites
          } else {
            newFavorites.delete(id); // Remove from favorites
          }
          return newFavorites;
        });
      } else {
        alert(data.error || "Failed to update favorites");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const clearFilters = () => {
    setSelectedCountry(initialCountry);
    setSearchText("");
  };

  return (
    <div className="container">
      <div className={classes.filterSection}>
        <CountrySelector
          countries={countries}
          selectedCountry={selectedCountry}
          onCountryChange={(e) => setSelectedCountry(e.target.value)}
        />
        <SearchBox
          searchText={searchText}
          onSearchChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={clearFilters}>Clear All Filters</button>
      </div>
      <Table
        data={data}
        onToggleFavorite={onToggleFavorite}
        favorites={favorites}
      />
      <div className={classes.apiInfo}>
        <p>API Response Code: {responseCode}</p>
        <p>API Response Time: {responseTime} ms</p>
      </div>
    </div>
  );
};

export default FilterableTable;
