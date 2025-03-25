import React, { ChangeEvent, FC } from "react";

interface SelectProps {
  countries: string[];
  selectedCountry: string;
  onCountryChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const CountrySelector: FC<SelectProps> = ({
  countries,
  selectedCountry,
  onCountryChange,
}) => {
  return (
    <div className="flex">
      <label htmlFor="country">Select Country:</label>
      <select id="country" value={selectedCountry} onChange={onCountryChange}>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
