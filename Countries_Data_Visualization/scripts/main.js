import countries_data from './countries_data.js';

function getTop10Countries(){
    countries_data.sort((a,b) => b.population - a.population);
    const top10Countries = countries_data.slice(0,10);
    return top10Countries
}

function getTop10Languages(){
    const languageCount = {};

    countries_data.forEach(country => {
        const languages = country.languages;
        languages.forEach(language => {
            if(languageCount[language]){
                languageCount[language]++;
            }
            else{
                languageCount[language] = 1;
            }
        }) 
    })

    const languageArray = Object.entries(languageCount).map(([language,count]) => ({language, count}))

    languageArray.sort((a,b) => b.count - a.count)

    const top10Languages = languageArray.slice(0,10)

    return top10Languages
}

function getCountryChart(charts){
    charts.innerHTML = ''
    const canvas = document.createElement('canvas')
    canvas.width = '900px'
    canvas.heihgt = '600px'
    charts.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const top10Countries = getTop10Countries()
    let countryNames  = []
    let population = []
    for (let country of top10Countries){
        countryNames.push(country.name)
        population.push(country.population)
    }
    const myChart = new Chart(ctx,{
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
                    grid:{
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
            const model = myChart.getDatasetMeta(0).data[i]._model;
            const value = dataset.data[i];
            ctx.fillStyle = 'black'; // Label text color
            ctx.font = '14px Arial'; // Label font style
            ctx.fillText(value, model.x + 10, model.y + model.height / 2 + 6); // Adjust the coordinates for label placement
        }
    });
    
}

function getLanguageChart(charts){
    charts.innerHTML = ''
    const canvas = document.createElement('canvas')
    canvas.width = '900px'
    canvas.heihgt = '600px'
    charts.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const top10Languages = getTop10Languages()
    let languages = []
    let counts = []
    for (let i=0;i<top10Languages.length;i++){
        languages.push(top10Languages[i].language)
        counts.push(top10Languages[i].count)
    }
    const myChart = new Chart(ctx,{
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
                    grid:{
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

    if (datasetMeta && datasetMeta.data){
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
    const popButton = document.getElementById("population")
    const langButton = document.getElementById("language")
    const charts = document.getElementById("charts")
    getLanguageChart(charts)
   
    popButton.addEventListener("click", function(){
        const optionText = document.getElementById('optionText')
        optionText.textContent = "10 Most populated countries in the world"
        getCountryChart(charts);
    })
    langButton.addEventListener("click",function(){
        const optionText = document.getElementById('optionText')
        optionText.textContent = "10 Most spoken languages in the world"
        getLanguageChart(charts);
    })
    
});

