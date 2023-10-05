import countries_data from "./countries_data.js"

// sort the array based on their capital city in alphabetical order
function sortByCapital(countriesData) {
    const capitalSortedCountries = [...countriesData]
    capitalSortedCountries.sort((a, b) => {
        if (a.capital < b.capital) {
            return -1;
        } else if (a.capital > b.capital) {
            return 1;
        }
    })
    return capitalSortedCountries
}

// sort the array based on their population
function sortByPopulation(countriesData) {
    const populationSortedCountries = [...countriesData]
    populationSortedCountries.sort((a, b) => {
        if (a.population < b.population) {
            return -1;
        } else if (a.population > b.population) {
            return 1;
        }
    })
    return populationSortedCountries
}

// Function to get top 10 countries by population
function getTop10Countries(countries) {
    countries.sort((a, b) => b.population - a.population);
    const top10Countries = countries.slice(0, 10);
    return top10Countries
}

// get top 10 most spoken languages in the world
function getTop10Languages(countries) {
    const languageCount = {};

    countries.forEach(country => {
        const languages = country.languages;
        languages.forEach(language => {
            if (languageCount[language]) {
                languageCount[language]++;
            }
            else {
                languageCount[language] = 1;
            }
        })
    })

    const languageArray = Object.entries(languageCount).map(([language, count]) => ({ language, count }))

    languageArray.sort((a, b) => b.count - a.count)

    const top10Languages = languageArray.slice(0, 10)

    return top10Languages
}

// create the chart showing top 10 most populated countries
function getCountryChart(charts,countries) {
    charts.innerHTML = ''
    const canvas = document.createElement('canvas')
    canvas.width = '900px'
    canvas.heihgt = '600px'
    charts.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const top10Countries = getTop10Countries(countries)
    let countryNames = []
    let population = []
    for (let country of top10Countries) {
        countryNames.push(country.name)
        population.push(country.population)
    }
    const myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: countryNames,
            datasets: [{
                label: "Data",
                data: population,
                backgroundColor: "rgb(242, 169, 59)",
                borderColor: "rgb(242, 169, 59)",
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: {
                    display: false,
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                datalabels: {
                    color: 'black', // Label text color
                    anchor: 'end', // Text anchor point
                    align: 'end', // Align text to the end (right side) of the bars
                    font: {
                        weight: 'bold' // Label font weight
                    }
                }
            }
        }
    });

    myChart.config.data.datasets.forEach(dataset => {
        for (let i = 0; i < dataset.data.length; i++) {
            const model = myChart.getDatasetMeta(0).data[i]
            console.log(model)
            const value = dataset.data[i];
            ctx.fillStyle = 'black'; // Label text color
            ctx.font = '14px Arial'; // Label font style
            ctx.fillText(value, model.x + 10, model.y + model.height / 2 + 6); // Adjust the coordinates for label placement
        }
    });

}

// Create the chart showing top 10 most spoken languages in the world
function getLanguageChart(charts,countries) {
    charts.innerHTML = ''
    const canvas = document.createElement('canvas')
    canvas.width = '900px'
    canvas.heihgt = '600px'
    charts.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const top10Languages = getTop10Languages(countries)
    let languages = []
    let counts = []
    for (let i = 0; i < top10Languages.length; i++) {
        languages.push(top10Languages[i].language)
        counts.push(top10Languages[i].count)
    }
    const myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: languages,
            datasets: [{
                label: "Data",
                data: counts,
                backgroundColor: "rgb(242, 169, 59)",
                borderColor: "rgb(242, 169, 59)",
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: {
                    display: false,
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                datalabels: {
                    color: 'black', // Label text color
                    anchor: 'end', // Text anchor point
                    align: 'end', // Align text to the end (right side) of the bars
                    font: {
                        weight: 'bold' // Label font weight
                    }
                }
            }
        }
    })

    const datasetMeta = myChart.getDatasetMeta(0);

    if (datasetMeta && datasetMeta.data) {
        datasetMeta.data.forEach((bar, i) => {
            const model = bar._model;
            if (model) {
                const value = myChart.data.datasets[0].data[i];
                ctx.fillStyle = 'black'; // Label text color
                ctx.font = '14px Arial'; // Label font style
                ctx.fillText(value, model.x + 10, model.y + model.height / 2 + 6); // Adjust the coordinates for label placement
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const countryList = document.getElementById("countryList")
    const nameSort = document.getElementById("nameSort")
    const capitalSort = document.getElementById("capitalSort")
    const populationSort = document.getElementById("populationSort")
    const popButton = document.getElementById("population")
    const langButton = document.getElementById("language")
    const charts = document.getElementById("charts")
    const textInput = document.getElementById("searchText")
    let filteredCountries = [...countries_data]
    let capitalSortedCountries = sortByCapital(filteredCountries)
    let populationSortedCountries = sortByPopulation(filteredCountries)

    // getCountryChart(charts)
    // getTop10Countries(filteredCountries)


    for (let c of countries_data) {
        const country = document.createElement("div")
        country.className = "country"
        country.innerHTML = `<div class="flag" style="background-image: url(${c.flag});"></div>
        <span class="title">${c.name}</span>
        <p>Capital:${c.capital}</p> 
        <p>Language:${c.languages}</p>
        <p>Population:${c.population}</p>`
        countryList.appendChild(country)
    }
    getCountryChart(charts,filteredCountries)

    nameSort.addEventListener("click", function () {

        countryList.innerHTML = ""
        for (let c of filteredCountries.reverse()) {
            const country = document.createElement("div")
            country.className = "country"
            country.innerHTML = `<div class="flag" style="background-image: url(${c.flag});"></div>
            <span class="title">${c.name}</span>
            <p>Capital:${c.capital}</p> 
            <p>Language:${c.languages}</p>
            <p>Population:${c.population}</p>`
            countryList.appendChild(country)
        }

    })

    capitalSort.addEventListener("click", function () {

        countryList.innerHTML = ""
        for (let c of capitalSortedCountries.reverse()) {
            const country = document.createElement("div")
            country.className = "country"
            country.innerHTML = `<div class="flag" style="background-image: url(${c.flag});"></div>
            <span class="title">${c.name}</span>
            <p>Capital:${c.capital}</p> 
            <p>Language:${c.languages}</p>
            <p>Population:${c.population}</p>`
            countryList.appendChild(country)
        }

    })

    populationSort.addEventListener("click", function () {

        countryList.innerHTML = ""

        for (let c of populationSortedCountries.reverse()) {
            const country = document.createElement("div")
            country.className = "country"
            country.innerHTML = `<div class="flag" style="background-image: url(${c.flag});"></div>
            <span class="title">${c.name}</span>
            <p>Capital:${c.capital}</p> 
            <p>Language:${c.languages}</p>
            <p>Population:${c.population}</p>`
            countryList.appendChild(country)
        }

    })

    popButton.addEventListener("click", function () {
        getCountryChart(charts,filteredCountries)
    })

    langButton.addEventListener("click", function () {
        getLanguageChart(charts,filteredCountries)
    })

    textInput.addEventListener("input", () => {
        const searchText = textInput.value
        // console.log(searchText)
        filteredCountries = countries_data.filter(item => item.name.toLowerCase().includes(searchText) ||
            item.capital.toLowerCase().includes(searchText) || item.languages.join(",").toLowerCase().includes(searchText))
        capitalSortedCountries = sortByCapital(filteredCountries)
        populationSortedCountries = sortByPopulation(filteredCountries)
        countryList.innerHTML = ""

        for (let c of filteredCountries) {
            const country = document.createElement("div")
            country.className = "country"
            country.innerHTML = `<div class="flag" style="background-image: url(${c.flag});"></div>
            <span class="title">${c.name}</span>
            <p>Capital:${c.capital}</p> 
            <p>Language:${c.languages}</p>
            <p>Population:${c.population}</p>`
            countryList.appendChild(country)
        }

    })
})
