let playerWeapon, result, botWeapon
let booted = false;
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

const startUpSound = new AudioContext(); // AudioContext-Objekt erstellen (wird benötigt, um Audio abzuspielen)
const errorSound = new Audio("./assets/sounds/error.wav"); // Audio-Datei laden 
const scoreOfRound = document.querySelector("#scoreRound") // DOM-Element für die Anzeige des Ergebnisses
const domPlayerScore = document.querySelector("#playerScore") // DOM-Element für die Anzeige des Spieler-Scores
const domCpuScore = document.querySelector("#cpuScore") // DOM-Element für die Anzeige des CPU-Scores
const domRounds = document.querySelector("#rounds") // DOM-Element für die Anzeige der Runden
const domPlayerWeapon = document.querySelector("#player") // DOM-Element für die Anzeige der Spieler-Waffe
const domCpuWeapon = document.querySelector("#computer") // DOM-Element für die Anzeige der CPU-Waffe
const domPlayerTitle = document.querySelector("#playerTitle") // DOM-Element für die Namen der Spieler
const domLetsPlay = document.querySelector("#letsPlay")
const restartButton = document.querySelector("#restart") // DOM-Element für den Restart-Button
const finishedGame = document.querySelector("#finishedGame") // DOM-Element für die Anzeige des Ergebnisses
const restarContainer = document.querySelector("#restartContainer") // DOM-Element für die Anzeige des Spiel-Endes in einem neuen Container
const mainGame = document.querySelector("#mainGame") // DOM-Element für das Hauptspiel
const restartPopup = document.querySelector("#restartPopup") // DOM-Element für den Restart-Button im Popup


// Event-Listener für die Auswahl der Runden, indem die Variable "rounds" auf den Wert des ausgewählten Radio-Buttons gesetzt wird. ForEach-Schleife, um alle Radio-Buttons zu durchlaufen.
document.querySelectorAll("input[type='radio']").forEach((el) =>{
    el.addEventListener("change", () =>{
    rounds = el.value
    console.log(rounds);
    })
})

// Event-Listener für die Auswahl der Waffe, indem die Variable "playerWeapon" auf den Wert des ausgewählten Buttons gesetzt wird. ForEach-Schleife, um alle Buttons zu durchlaufen.
document.querySelectorAll("[id^=ch-]").forEach((el) =>{
    el.addEventListener("click", () =>{
    playerWeapon = el.id.replace("ch-", "") // Der Wert des Buttons wird aus dem ID-Attribut (jede ID beginnt mit "ch-") ausgelesen und in die Variable "playerWeapon" gespeichert.
    console.log(`Du hast ${playerWeapon} ausgewählt`);
    startGame(rounds, playerWeapon) // Die Funktion "startGame" wird mit den Parametern "rounds" und "playerWeapon" aufgerufen.
    })
})

const startGame = (rounds, playerWeapon) => {
    if (currentRound != rounds){ // Wenn die aktuelle Runde nicht der Anzahl der Runden entspricht, wird der Code ausgeführt.
    currentRound++ // Die aktuelle Runde wird um 1 erhöht.
    let weaponChoice = Math.floor(Math.random() * botWeapons.length) // Eine Zufallszahl zwischen 0 und der Länge des Arrays "botWeapons" wird generiert und in die Variable "weaponChoice" gespeichert.
    domPlayerTitle.style.display = "flex" // Der Titel des Spielers wird angezeigt, indem der Wert des "display"-Attributs auf "flex" gesetzt wird anstatt auf "none".
    botWeapon = botWeapons[weaponChoice] // Die Variable "botWeapon" wird auf den Wert des Arrays "botWeapons" an der Stelle der Zufallszahl gesetzt.
    console.log(`Computer hat ${botWeapon} ausgewählt`);
    console.log(`${win[playerWeapon]} gewinnt gegen deine Waffe`);
    domRounds.textContent = `${currentRound-1} / ${rounds}` // Die aktuelle Runde wird im DOM angezeigt.
    domPlayerWeapon.className = `${playerWeapon} emoji` // Die Klasse des DOM-Elements für die Spieler-Waffe wird auf den Wert der Variable "playerWeapon" gesetzt. Die Klasse des Wertes der Variabel "playerWeapon" ist der Name der Waffe, die als CSS-Klasse definiert ist.
    domCpuWeapon.className = `${botWeapon} emoji` // Die Klasse des DOM-Elements für die CPU-Waffe wird auf den Wert der Variable "botWeapon" gesetzt.
    if (win[playerWeapon] === botWeapon){ // Wenn der Wert des Arrays "win" an der Stelle des Wertes der Variable "playerWeapon" dem Wert der Variable "botWeapon" entspricht, wird der Code ausgeführt.
        console.log("Du hast gewonnen!");
        scoreOfRound.textContent = `${playerWeapon} beats ${botWeapon}. You win!`
        playerScore++ // Der Wert der Variable "playerScore" wird um 1 erhöht.
        domPlayerScore.textContent = playerScore
    } else if (playerWeapon === botWeapon){ // Wenn der Wert der Variable "playerWeapon" dem Wert der Variable "botWeapon" entspricht, wird der Code ausgeführt.
        console.log("Unentschieden!");
        scoreOfRound.textContent = `It's a draw. You both chose ${playerWeapon}`
    } else{ // Wenn der Wert des Arrays "win" an der Stelle des Wertes der Variable "playerWeapon" nicht dem Wert der Variable "botWeapon" entspricht, wird der Code ausgeführt.
        console.log("Computer hat gewonnen");
        scoreOfRound.textContent = `${botWeapon} beats ${playerWeapon}. You lose!`
        cpuScore++ // Der Wert der Variable "cpuScore" wird um 1 erhöht.
        domCpuScore.textContent = cpuScore
    }
    console.log(currentRound);
    } else { // Wenn die aktuelle Runde der Anzahl der Runden entspricht, wird der Code ausgeführt.
    domRounds.textContent = `${currentRound} / ${rounds}`
    if(playerScore > cpuScore){ // Wenn der Wert der Variable "playerScore" größer als der Wert der Variable "cpuScore" ist, wird der Code ausgeführt.
        errorSound.play() // Der Sound wird abgespielt.
        mainGame.style.display = "none" // Das Hauptspiel wird ausgeblendet, indem der Wert des "display"-Attributs auf "none" gesetzt wird anstatt auf "flex".
        restarContainer.style.display = "flex" // Der Restart-Container wird angezeigt, indem der Wert des "display"-Attributs auf "flex" gesetzt wird anstatt auf "none".
        finishedGame.innerHTML = "<h3>You won! Want to play again?</h3>"
    } else if (playerScore < cpuScore){ // Wenn der Wert der Variable "playerScore" kleiner als der Wert der Variable "cpuScore" ist, wird der Code ausgeführt.
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

// Event-Listener für den Restart-Button, der die Seite neu lädt.
restartButton.addEventListener("click", () =>{
    location.reload()
})
// Event-Listener für den Restart-Button im Popup, der die Seite neu lädt.
restartPopup.addEventListener("click", () =>{
    location.reload()
})

// Funktion, die den Start-Up-Sound abspielt, wenn der Nutzer auf die Seite klickt.
const playStartUpSound = async () => {
    try {
        const response = await fetch("./assets/sounds/startup.wav");
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await startUpSound.decodeAudioData(arrayBuffer);
        const source = startUpSound.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(startUpSound.destination);
        source.start(0);
        booted = true;
    } catch (error) {
        console.error("Fehler beim Abspielen des Start-Up-Sounds:", error);
    }
};

// Event-Listener, der die Funktion "playStartUpSound" aufruft, wenn der Nutzer auf die Seite klickt und die Variable "booted" auf "true" setzt.
window.addEventListener("click", () => {
    if (booted === false){
    playStartUpSound();
}
});