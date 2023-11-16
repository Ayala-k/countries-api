import { displayCountry } from "./singleCountry.js"
let container = document.querySelector("main")

export default class Country {
    constructor(data) {
        this.name = data.name.common,
            this.population = data.population,
            this.capital = data.capital[0],
            this.borders = data.borders,
            this.languages = data.languages,
            this.map = data.maps.googleMaps,
            this.lat = data.latlng[0],
            this.lng = data.latlng[1],
            this.flag = data.flags.png
    }


    render() {
        let div = document.createElement("div")
        div.className="country_div"
        div.setAttribute("data-aos", "fade-right");
        div.setAttribute("data-aos-duration", "1000"); 

        div.innerHTML = `<iframe width="500px" height="500px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
        src="https://maps.google.com/maps?q=${this.lat},${this.lng}&hl=es&z=6&amp;output=embed">
        </iframe><br>`

        let detailsDiv=document.createElement("div")
        detailsDiv.className="details_div"

        detailsDiv.innerHTML =
            `<img src=${this.flag}><br>
        Name: ${this.name}<br>
        Population: ${this.population}<br>
        Capital: ${this.capital}<br>`

        if (this.languages) {
            detailsDiv.innerHTML += "Languages: "
            for (let key in this.languages) {
                detailsDiv.innerHTML += this.languages[key] + " "
            }
            detailsDiv.innerHTML += "<br>"
        }

        if (this.borders) {
            let bordersDiv=document.createElement("div")
            bordersDiv.className="borders_div"

            detailsDiv.innerHTML += "Borders: "
            this.borders.forEach(async element => {
                let url = `https://restcountries.com/v3.1/alpha/${element}`;
                let resp = await fetch(url)
                let data = await resp.json()
                let a = document.createElement("a")
                a.innerHTML = data[0].name.common+" "
                a.addEventListener("click", function () {
                    displayCountry(data[0])
                })
                bordersDiv.appendChild(a)
            })
            detailsDiv.appendChild(bordersDiv)
        }
        div.appendChild(detailsDiv)

        container.innerHTML = ""
        container.appendChild(div)
    }
}