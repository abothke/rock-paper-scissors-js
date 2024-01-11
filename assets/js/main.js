let playerWeapon, result, botWeapon
let playerScore = 0;
let cpuScore = 0;
let currentRound = 1;

let rounds = "5"
const botWeapons = ["rock", "paper", "scissors"]
const win = {
    "rock": "scissors",
    "paper": "rock",
    "scissor": "paper"
}

const scoreOfRound = document.querySelector("#scoreRound")
const domPlayerScore = document.querySelector("#playerScore")
const domCpuScore = document.querySelector("#cpuScore")
const domRounds = document.querySelector("#rounds")
const domPlayerWeapon = document.querySelector("#player")
const domCpuWeapon = document.querySelector("#computer")

document.querySelectorAll("input[type='radio']").forEach((el) =>{
    el.addEventListener("change", () =>{
    rounds = el.value
    console.log(rounds);
    })
})

document.querySelectorAll("[id^=ch-]").forEach((el) =>{
    el.addEventListener("click", () =>{
    playerWeapon = el.id.replace("ch-", "")
    console.log(`Du hast ${playerWeapon} ausgewählt`);
    startGame(rounds, playerWeapon)
    })
})

const startGame = (rounds, playerWeapon) => {
    let weaponChoice = Math.floor(Math.random() * botWeapons.length)
    botWeapon = botWeapons[weaponChoice]
    console.log(`Computer hat ${botWeapon} ausgewählt`);
    console.log(`${win[playerWeapon]} gewinnt gegen deine Waffe`);
    domRounds.textContent = `${currentRound} / ${rounds}`
    domPlayerWeapon.className = playerWeapon
    domCpuWeapon.className = botWeapon
    if (currentRound != rounds){
    if (win[playerWeapon] === botWeapon){
        console.log("Du hast gewonnen!");
        scoreOfRound.textContent = "Du hast gewonnen!"
        playerScore++
        domPlayerScore.textContent = playerScore
    } else if (playerWeapon === botWeapon){
        console.log("Unentschieden!");
        scoreOfRound.textContent = "Unentschieden!"
    } else{
        console.log("Computer hat gewonnen");
        scoreOfRound.textContent = "Du hast verloren!"
        cpuScore++
        domCpuScore.textContent = cpuScore
    }
    currentRound++
    console.log(currentRound);
} else {
    // domRounds.textContent = "VORBEI"
}
}