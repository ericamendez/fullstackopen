import { useState, useEffect } from "react";
import Find from "./components/Find";
import Country from "./components/Country";
import countriesServices from "../../services/countries";
import ShowMore from "./components/ShowMore";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState([]);
  const [chosenCountry, setChosenCountry] = useState(null)

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  useEffect(() => {
    countriesServices.getAll(userInput).then((countriesApi) => {
      setCountries(countriesApi);
    });
  }, []);

  useEffect(() => {
    console.log(userInput);
    const filteredList = countries.filter((country) =>
      country.name.official.toLowerCase().includes(userInput.toLowerCase())
    );
    console.log(filteredList);
    if (filteredList.length <= 10) {
      setFilter(filteredList);
      setChosenCountry(null)
    } else {
        setFilter([]);
        setChosenCountry(null)
    }
  }, [userInput]);

  const handleShowMore = (event) => {
    const chosen = filter.find(country => country.name.official === event.target.value)
    console.log(chosen);
    const data = {
        name: chosen.name.official,
        capital: chosen.capital[0],
        area: chosen.area,
        languages: chosen.languages,
        flag: chosen.flag
    }
    console.log(event.target.value);
    setChosenCountry(data)
  }

  return (
    <div>
      <Find handleInput={handleInputChange} />
      {filter.length > 0 && !chosenCountry? <Country countriesList={filter} handleButton={handleShowMore}/> : null}
      {userInput.length > 0 && filter.length === 0 ? <p>need more</p> : null}
      {chosenCountry ? <ShowMore country={chosenCountry} /> : null}
    </div>
  );
};

export default App;
