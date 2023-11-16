import declareEvents from "./declareEvents.js";
import { initializeCountriesDisplay } from './severalCountries.js'

window.onload =  function () {

    createSelectOptions()
    declareEvents()
    initializeCountriesDisplay()
}

async function createSelectOptions() {
    let url = `https://restcountries.com/v3.1/all`
    let resp = await fetch(url)
    let data = await resp.json()
    let countriesNames = data.map(country => country.name.common);

    let select = document.querySelector("#countries")

    countriesNames.forEach(element => {
        let option = document.createElement("option")
        option.innerHTML = element
        select.appendChild(option)
    });
}