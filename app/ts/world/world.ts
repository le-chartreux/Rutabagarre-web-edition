import {PhysicalElement} from "./physical-element";
import {Structure} from "~app/ts/world/structure/structure";

class World {
    private readonly delayBetweenComputations = 1000 / 60  // in ms, here 60 computations per second

    constructor(
        private width: number,
        private height: number,
        public physicalElements: PhysicalElement[] = []
    ) {}

    /**
     * Factory that creates the default world.
     */
    static createDefaultWorld(): World {
        return new World(
            30,
            20,
            [
                new Structure(0, -1, [[[0, 0], [1, 0], [1, 1], [0, 1]]]),
                new Structure(1, -1, [[[0, 0], [1, 0], [1, 1], [0, 1]]]),
                new Structure(2, -1, [[[0, 0], [1, 0], [1, 1], [0, 1]]]),
            ]
        )
    }

    /**
     * Treats changes in the model.
     */
    private tick() {
        this.physicalElements.forEach((element) => element.update())
    }

    /**
     * Starts the model update loop. The model updates every <this.delayBetweenComputations> ms.
     */
    public run() {
        window.setInterval(() => this.tick(), this.delayBetweenComputations)
    }
}

export {World};
