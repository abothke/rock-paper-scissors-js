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

const startUpSound = new Audio("./assets/sounds/startup.wav")
const errorSound = new Audio("./assets/sounds/error.wav")
const scoreOfRound = document.querySelector("#scoreRound")
const domPlayerScore = document.querySelector("#playerScore")
const domCpuScore = document.querySelector("#cpuScore")
const domRounds = document.querySelector("#rounds")
const domPlayerWeapon = document.querySelector("#player")
const domCpuWeapon = document.querySelector("#computer")
const domPlayerTitle = document.querySelector("#playerTitle")
const domLetsPlay = document.querySelector("#letsPlay")
const restartButton = document.querySelector("#restart")
const finishedGame = document.querySelector("#finishedGame")
const restarContainer = document.querySelector("#restartContainer")
const mainGame = document.querySelector("#mainGame")
const restartPopup = document.querySelector("#restartPopup")

const boot = () =>{
    startUpSound.play()
}

boot();


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
    if (currentRound != rounds){
    currentRound++
    let weaponChoice = Math.floor(Math.random() * botWeapons.length)
    domPlayerTitle.style.display = "flex"
    botWeapon = botWeapons[weaponChoice]
    console.log(`Computer hat ${botWeapon} ausgewählt`);
    console.log(`${win[playerWeapon]} gewinnt gegen deine Waffe`);
    domRounds.textContent = `${currentRound-1} / ${rounds}`
    domPlayerWeapon.className = `${playerWeapon} emoji`
    domCpuWeapon.className = `${botWeapon} emoji`
    if (win[playerWeapon] === botWeapon){
        console.log("Du hast gewonnen!");
        scoreOfRound.textContent = `${playerWeapon} beats ${botWeapon}. You win!`
        playerScore++
        domPlayerScore.textContent = playerScore
    } else if (playerWeapon === botWeapon){
        console.log("Unentschieden!");
        scoreOfRound.textContent = `It's a draw. You both chose ${playerWeapon}`
    } else{
        console.log("Computer hat gewonnen");
        scoreOfRound.textContent = `${botWeapon} beats ${playerWeapon}. You lose!`
        cpuScore++
        domCpuScore.textContent = cpuScore
    }
    console.log(currentRound);
    } else {
    domRounds.textContent = `${currentRound} / ${rounds}`
    if(playerScore > cpuScore){
        errorSound.play()
        mainGame.style.display = "none"
        restarContainer.style.display = "flex"
        finishedGame.innerHTML = "<h3>You won! Want to play again?</h3>"
    } else if (playerScore < cpuScore){
        errorSound.play()
        mainGame.style.display = "none"
        restarContainer.style.display = "flex"
        finishedGame.innerHTML = "<h3>You lose. Try Again</h3>"
    } else{
        errorSound.play()
        mainGame.style.display = "none"
        restarContainer.style.display = "flex"
        finishedGame.innerHTML = "<h3>It's a draw! Try again</h3>"
    }
    console.log(cpuScore, playerScore);
}
}

restartButton.addEventListener("click", () =>{
    location.reload()
})

restartPopup.addEventListener("click", () =>{
    location.reload()
})