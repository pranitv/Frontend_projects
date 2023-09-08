import countries from './countries.js';

function capitalize(str) {
   if (typeof str !== 'string' || str.length === 0) {
      return str; // Return the input unchanged if it's not a string or an empty string
   }

   return str.charAt(0).toUpperCase() + str.slice(1);
}

document.addEventListener("DOMContentLoaded", function () {
   const countryList = document.getElementById("countryList")
   const spanText = document.getElementById('info')
   for (let c of countries) {
      const country = document.createElement("div")
      country.className = "country"
      country.textContent = c
      countryList.appendChild(country)
   }

   const startingWord = document.getElementById('startsWith')
   const searchWith = document.getElementById('searchWith')
   const sort = document.getElementById('sort')
   const textInput = document.getElementById("searchText")

   startingWord.addEventListener("click", function () {
      textInput.addEventListener("input", function (event) {
         countryList.innerHTML = ''
         const typedText = event.target.value;
         const filteredList = countries.filter(item => item.startsWith(typedText))
         for (let c of filteredList) {
            const country = document.createElement("div")
            country.className = "country"
            country.textContent = c
            countryList.appendChild(country)
            if (typedText !== '') {
               spanText.textContent = `Countries startswith ${typedText} are ${filteredList.length}`
            }
         }
      }
      )

   })

   searchWith.addEventListener("click", function () {
      textInput.addEventListener("input", function (event) {
         countryList.innerHTML = ''
         spanText.innerHTML = '' 
         const typedText = event.target.value;
         const filteredList = countries.filter(item => item.includes(capitalize(typedText)))
         for (let c of filteredList) {
            const country = document.createElement("div")
            country.className = "country"
            country.textContent = c
            countryList.appendChild(country)
            if (typedText !== '') {
               spanText.textContent = `Countries containing ${typedText} are ${filteredList.length}`
            }
         }
      })
   })

   sort.addEventListener("click", function () {
      countryList.innerHTML = ''
      for (let c of countries.reverse()) {
         const country = document.createElement("div")
         country.className = "country"
         country.textContent = c
         console.log(c)
         countryList.appendChild(country)
      }
   })

});

