import React, { ChangeEvent, FC } from "react";

interface SearchBoxProps {
  searchText: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Searchbox: FC<SearchBoxProps> = ({ searchText, onSearchChange }) => {
  return (
    <div>
      <label htmlFor="search">Search by Name:</label>
      <input
        type="text"
        id="search_name"
        value={searchText}
        onChange={onSearchChange}
        placeholder="Search for..."
      />
    </div>
  );
};

export default Searchbox;
