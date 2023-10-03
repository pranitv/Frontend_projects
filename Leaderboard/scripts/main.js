function displayPlayers(member, leaderboard) {
    const player = document.createElement("div")
    player.className = "member"
    player.innerHTML = `
    <div class="member-name">
        ${member.name}
        <span>${member.date}</span>
    </div>
    <div class="country-name">
        ${member.country}
    </div>
    <div class="score">
        ${member.score}
    </div>
    <div class="options">
        <button type="button" class="del-button" id="del-${member.id}"><i class="fas fa-trash"></i></button>
        <button type="button" class="inc-button" id="inc-${member.id}">+5</button>
        <button type="button" class="dec-button" id="dec-${member.id}">-5</button>
    </div>
    `
    leaderboard.appendChild(player)
}

function generateFiveDigitUniqueId() {
    const min = 10000; // Minimum 5-digit number
    const max = 99999; // Maximum 5-digit number
    const uniqueId = Math.floor(Math.random() * (max - min + 1)) + min;
    return uniqueId.toString(); // Convert to string to ensure it's always 5 digits
}



document.addEventListener("DOMContentLoaded", function () {
    let players = []
    const addPlayer = document.getElementById('addPlayer')
    const firstName = document.getElementById('firstName')
    const lastName = document.getElementById('lastName')
    const country = document.getElementById('country')
    const score = document.getElementById('score')
    const leaderboard = document.getElementById('leaderboard')

    // element add logic

    addPlayer.addEventListener("click", function () {
        leaderboard.innerHTML = ""
        let date = new Date()
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
        let day = String(date.getDay()).padStart(2, '0')
        let hours = String(date.getHours()).padStart(2, '0')
        let minutes = String(date.getMinutes()).padStart(2, '0')

        const player = {
            id: generateFiveDigitUniqueId(),
            name: `${firstName.value} ${lastName.value}`,
            country: `${country.value}`,
            score: `${score.value}`,
            date: `${months[date.getMonth() + 1]} ${day},${date.getFullYear()} ${hours}:${minutes}`
        }

        players.push(player)
        for (let member of players) {
            displayPlayers(member, leaderboard)
        }

        // Clear input fields
        firstName.value = "";
        lastName.value = "";
        country.value = "";
        score.value = "";
    })
    // element delete logic

    leaderboard.addEventListener("click", function (event) {
        if (event.target.className === "del-button") {
            leaderboard.innerHTML = ""
            const playerDiv = event.target.closest(".member");
            if (playerDiv) {
                const id = event.target.id.slice(4,)
                players = players.filter((player) => player.id !== id)
                for (let member of players) {
                    displayPlayers(member, leaderboard)
                }
            }
        }

        // score increament logic

        else if (event.target.className === "inc-button") {
            leaderboard.innerHTML = ""
            const playerDiv = event.target.closest(".member");
            if (playerDiv) {
                const id = event.target.id.slice(4,)
                for (let i = 0; i < players.length; i++) {
                    if (players[i].id === id) {
                        players[i].score = parseInt(players[i].score) + 5
                    }
                }
                for (let member of players) {
                    displayPlayers(member, leaderboard)
                }
            }
        }

        // score decrement logic

        else if (event.target.className === "dec-button") {
            leaderboard.innerHTML = ""
            const playerDiv = event.target.closest(".member");
            if (playerDiv) {
                const id = event.target.id.slice(4,)
                for (let i = 0; i < players.length; i++) {
                    if (players[i].id === id) {
                        players[i].score = parseInt(players[i].score) - 5
                    }
                }
                for (let member of players) {
                    displayPlayers(member, leaderboard)
                }
            }
        }
    })
})