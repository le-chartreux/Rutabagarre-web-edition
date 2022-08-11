import {View} from "./view"
import {Model} from "./model"

class Controller {

    private model: Model
    private view: View

    constructor(model: Model, view: View) {
        this.model = model
        this.view = view
    }

    public setup(): void {
        // binding buttons
        let startButton = document.getElementById("start-button")
        if (startButton) {
            startButton.onclick = this.start
        } else {
            console.error("Start button not found on DOM, so we can't bind it.")
        }
    }

    private start(): void{
        alert("start button clicked")
    }
}

export {Controller}

