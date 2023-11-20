const ShowMore = ({country}) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h1>{country.flag}</h1>
        </div>
    )
}

export default ShowMore