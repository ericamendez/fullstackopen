const Country = ({ countriesList, handleButton }) => {
  return (
    <div>
      {countriesList.map((country) => {
        return (
          <div key={country.area}>
            <p>{country.name.official}</p>
            <button value={country.name.official} onClick={handleButton}>show more</button>
          </div>
        );
      })}
    </div>
  );
};

export default Country;
