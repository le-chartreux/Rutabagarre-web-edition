import {View} from "./view"
import {World} from "./world"

class Controller {

    private world: World
    private view: View

    constructor() {
        this.world = World.createDefaultWorld()
        this.view = new View()
    }

    public setup(): void {

    }

    public run(): void {
        this.view.tick()
    }
}

export {Controller}

