import {World} from "./world";

function start() {
    alert("Game started");

    let world = new World(13, 200);
}

// binding
let startButton = document.getElementById("start-button")
if (startButton) {
    startButton.onclick = start
} else {
    console.error("Start button not found on DOM, so we can't bind it.")
}
