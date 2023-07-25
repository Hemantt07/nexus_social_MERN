import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CountryDropdown ({ onChange }){
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v2/all')
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    onChange(selectedCountry);
  };

  return (
    <select value={selectedCountry} onChange={handleCountryChange}  className="form-select form-select-md mb-3">
      <option value="">Select a country</option>
      {countries.map((country) => (
        <option key={country.alpha2Code} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
};
