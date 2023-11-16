import { displayCountry } from "./singleCountry.js"
let container = document.querySelector("main")


export function initializeCountriesDisplay() {
    displaySeveralCountries(["Israel", "United States", "France", "United Kingdom", "Thailand"])
}


export function onCountriesSelect() {
    let searchValue = document.querySelector("#countries_input").value
    if (searchValue != "") {
        findCountries(searchValue)
    }
}


export async function onCountriesSearch() {
    let searchValue = document.querySelector("#search_input").value
    findCountries(searchValue)

}

async function findCountries(searchValue) {
    let url = 'https://restcountries.com/v3.1/all'
    let resp = await fetch(url)
    let data = await resp.json()

    let filteredCountries = data.filter(country =>
        country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    );

    let countriesNames = filteredCountries.map(country => country.name.common);

    displaySeveralCountries(countriesNames)
}


export async function displaySeveralCountries(countries) {
    container.innerHTML = ""
    if (countries.length == 0) {
        container.innerHTML = "Country not found. Please enter a valid country name."
        return
    }

    countries.forEach(async element => {
        let url = `https://restcountries.com/v3.1/name/${element}?fullText=true`
        let resp = await fetch(url)
        let data = await resp.json()

        let flagSrc = data[0].flags.png

        let div = document.createElement("div")
        div.className="several_countries_part"
        div.setAttribute("data-aos", "flip-right");
        div.setAttribute("data-aos-duration", "1500"); 

        div.innerHTML = `<img src=${flagSrc}><br>
        ${element} <br>`

        let btn = document.createElement("button")
        btn.innerHTML = "more details >>>"
        div.appendChild(btn)

        btn.addEventListener("click", function () {
            displayCountry(data[0])
        })

        container.appendChild(div)
    });
}