const img = document.getElementById('imageBox')

function calculateWeightOnPlanets(massOnEarth,planet) {
    // Gravitational accelerations on various planets (in m/s²)
    const gravitationalAccel = {
        Earth: 9.81,
        Mercury: 3.7,
        Venus: 8.87,
        Mars: 3.71,
        Jupiter: 24.79,
        Saturn: 10.44,
        Uranus: 8.69,
        Neptune: 11.15,
        Moon: 1.625,
        Pluto: 0.62 // Gravitational acceleration on Pluto
    };

    // Calculate weight on each planet
    const g = gravitationalAccel[planet];
    const weight = massOnEarth * g;
    return weight;
}

document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.getElementById("planets");
    const mass = document.querySelector('#mass')
    const button = document.querySelector("button");
    const massInfo = document.querySelector('#mass-info')
    // const imageBox = document.getElementById("imageBox")

    button.addEventListener("click",() => {
        if (mass.value === ''){
            massInfo.innerHTML = ''
            let massRequired = document.createElement('div')
            massRequired.className = "massRequired"
            massRequired.textContent = "Mass is required"
            massInfo.appendChild(massRequired)
        }
        else {
            let selectedValue = dropdown.value
            const newBackgroundImage = `style/images/${selectedValue}.png`
            let imagebox = document.createElement('div')
            imagebox.className = 'selectedImage'
            imagebox.style.backgroundImage = `url('${newBackgroundImage}')`
            massInfo.innerHTML = ''
            massInfo.appendChild(imagebox)
            const weight = calculateWeightOnPlanets(mass.value,selectedValue)
            let statement = `The weight of the object on ${selectedValue}`
            const statementbox = document.createElement('div')
            statementbox.className = 'resultBox'
            statementbox.textContent = statement
            const result = document.createElement('div')
            result.className = 'result'
            result.textContent = `${parseFloat(weight)} N`
            statementbox.appendChild(result)
            massInfo.appendChild(statementbox)         
        }
            
    })
});

