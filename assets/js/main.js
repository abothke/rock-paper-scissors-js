let playerWeapon, result, botWeapon
let rounds = "5"
const botWeapons = ["rock", "paper", "scissors"]
const win = {
    "rock": "scissors",
    "paper": "rock",
    "scissor": "paper"
}

document.querySelectorAll("input[type='radio']").forEach((el) =>{
    el.addEventListener("change", () =>{
    rounds = el.value
    console.log(rounds);
    })
})

document.querySelectorAll("[id^=ch-]").forEach((el) =>{
    el.addEventListener("click", () =>{
    playerWeapon = el.id.slice(3,10)
    console.log(`Du hast ${playerWeapon} ausgewählt`);
    startGame(rounds, playerWeapon)
    })
})

const startGame = (rounds, playerWeapon) => {
    let weaponChoice = Math.floor(Math.random() * botWeapons.length)
    botWeapon = botWeapons[weaponChoice]
    console.log(`Computer hat ${botWeapon} ausgewählt`);
    console.log(`${win[playerWeapon]} gewinnt gegen deine Waffe`);
    if (win[playerWeapon] === botWeapon){
        console.log("Du hast gewonnen!");
    } else if (playerWeapon === botWeapon){
        console.log("Unentschieden!");
    } else{
        console.log("Computer hat gewonnen");
    }
}
