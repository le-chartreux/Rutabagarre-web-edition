import {PhysicalElement} from "./physical-element";

class World {
    private readonly delayBetweenComputations = 1000 / 60  // in ms, here 60 computations per second

    constructor(
        private width: number,
        private height: number,
        private physicalElements: PhysicalElement[] = []
    ) {}

    static createDefaultWorld(): World {
        let defaultWorld = new World(30, 20)
        return defaultWorld
    }

    private tick() {
        console.log("model tick")
    }

    public run() {
        window.setInterval(() => this.tick(), this.delayBetweenComputations)
    }
}

export {World};
