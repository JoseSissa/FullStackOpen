const InfoCountry = ({ country }) => {
    return (
        <>
            <h2>{country.name.common}</h2>
            <p>{country.capital[0]}</p>
            <p>{country.area}</p>
            <p>Languages:</p>
            <ul>
                {
                    Object.values(country.languages).map(language => {
                        return <li key={language}>{language}</li>
                    })
                }
            </ul>
            <img src={country.flags.svg} alt={country.flags.alt} />
        </>
    )
}

export default InfoCountry