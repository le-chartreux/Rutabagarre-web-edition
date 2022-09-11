import {View} from "./view/view"
import {World} from "./world/world"

class Controller {

    private _world: World
    private _view: View

    /**
     * Creates a Controller, i.e. the class that manages the interaction between the View and the World, plus manages
     * user inputs.
     */
    constructor() {
        this._world = World.createDefaultWorld()
        this._view = new View(() => this._world.physicalElements)
    }

    /**
     * Setups this Controller, i.e. binds all the user inputs & threats actions on page
     */
    public setup(): void {
        // creating the event listener on resize
        window.addEventListener("resize", () => this._view.onResize())

        // TODO keybinding
    }

    /**
     * Starts both the World (model) and the View
     */
    public run(): void {
        this._view.initialize()
        this._view.run()
        this._world.run()
    }
}

export {Controller}

