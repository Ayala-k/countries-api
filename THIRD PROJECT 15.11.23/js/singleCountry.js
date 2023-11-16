import Country from './countryClass.js'


export async function onCountryClick(e) {
    let url = `https://restcountries.com/v3.1/name/${e.target.textContent}?fullText=true`
    let resp = await fetch(url)
    let data = await resp.json()
    displayCountry(data[0]);
}

export const displayCountry = async (data) => {
    let country=new Country(data)
    country.render()
}