import { onCountryClick } from "./singleCountry.js";
import { onCountriesSearch,onCountriesSelect } from "./severalCountries.js";

export default function declareEvents() {
    document.querySelectorAll("a").forEach(element => {
        element.addEventListener("click",onCountryClick)
    });

    document.querySelector("#search_btn").addEventListener("click",onCountriesSearch)

    document.querySelector("#countries_input").addEventListener("change",onCountriesSelect)
}