import { useState, useEffect } from "react";
import countryService from "./services/countries";
import weatherService from "./services/weather";

const Filter = ({ value, onChange }) => {
  return (
    <div>
      find countries: <input value={value} onChange={onChange} />
    </div>
  );
};

const Countries = ({ countries, showCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  return (
    <div>
      {countries.map((country) => (
        <p key={country.cca3}>
          {country.name.common}{" "}
          <button
            onClick={() => {
              showCountry(country.name.common);
            }}
          >
            Show
          </button>
        </p>
      ))}
    </div>
  );
};

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const [latitude, longitude] = country.latlng;

  useEffect(() => {
    weatherService.getWeather(latitude, longitude).then((response) => {
      setWeather(response.data.current);
    });
  }, [latitude, longitude]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
      </div>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>
        <img src={country.flags.svg} alt={country.flags.alt} width={200} />
      </div>

      {weather !== null && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature: {weather.temperature_2m} °C</p>
          <p>Wind: {weather.wind_speed_10m} m/s</p>
        </div>
      )}
    </div>
  );
};
const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    countryService.getAll().then((response) => {
      setCountries(response.data);
    });
  }, []);

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase()),
  );

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };
  const showCountry = (name) => {
    setNewFilter(name);
  };

  return (
    <>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <Countries countries={countriesToShow} showCountry={showCountry} />
    </>
  );
};

export default App;
