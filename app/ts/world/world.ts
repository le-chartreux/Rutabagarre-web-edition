import {PhysicalElement} from "./physical-element";

class World {
    private readonly delayBetweenComputations = 1000 / 60  // in ms, here 60 computations per second

    constructor(
        private width: number,
        private height: number,
        private physicalElements: PhysicalElement[] = []
    ) {}

    /**
     * Factory that creates the default world.
     */
    static createDefaultWorld(): World {
        let defaultWorld = new World(30, 20)
        return defaultWorld
    }

    /**
     * Treats changes in the model.
     */
    private tick() {
        console.log("model tick")
    }

    /**
     * Starts the model update loop. The model updates every <this.delayBetweenComputations> ms.
     */
    public run() {
        window.setInterval(() => this.tick(), this.delayBetweenComputations)
    }
}

export {World};
