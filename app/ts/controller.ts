import {View} from "./view/view"
import {World} from "./world/world"

class Controller {

    private world: World
    private view: View

    constructor() {
        this.world = World.createDefaultWorld()
        this.view = new View()
    }

    public setup(): void {}

    public run(): void {
        this.view.run()
        this.world.run()
    }
}

export {Controller}

