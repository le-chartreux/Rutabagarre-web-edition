import {View} from "./view/view"
import {World} from "./world/world"

class Controller {

    private world: World
    private view: View

    /**
     * Creates a Controller, i.e. the class that manages the interaction between the View and the World, plus manages
     * user inputs.
     */
    constructor() {
        this.world = World.createDefaultWorld()
        this.view = new View()
    }

    /**
     * Setups this Controller, i.e. binds all the user inputs & threats actions on page
     */
    public setup(): void {
        // creating the event listener on resize
        window.addEventListener("resize", () => this.view.onResize())

        // TODO keybinding
    }

    /**
     * Starts both the World (model) and the View
     */
    public run(): void {
        this.view.run(() => this.world.physicalElements)
        this.world.run()
    }
}

export {Controller}

