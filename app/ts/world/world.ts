import {PhysicalElement} from "./physical-element";
import {Structure} from "~app/ts/world/structure/structure";

class World {
    private readonly delayBetweenComputations = 1000 / 6  // in ms, here 6 computations per second

    constructor(
        private width: number,
        private height: number,
        public physicalElements: PhysicalElement[] = []
    ) {}

    /**
     * Factory that creates the default world.
     */
    static createDefaultWorld(): World {

        // main platform
        let structures = Array.from({length:22}, (_, i) => new Structure(i + 4, 6, []))
        structures.concat(Array.from({length:22}, (_, i) => new Structure(i + 4, 5, [])))
        structures.concat(Array.from({length:20}, (_, i) => new Structure(i + 5, 4, [])))
        structures.concat(Array.from({length:6}, (_, i) => new Structure(i + 9, 3, [])))
        structures.push(new Structure(16, 3, []))
        structures.concat(Array.from({length:3}, (_, i) => new Structure(i + 20, 3, [])))
        structures.concat(Array.from({length:3}, (_, i) => new Structure(i + 11, 2, [])))
        structures.push(new Structure(16, 2, []))

        // left small platform
        structures.concat(Array.from({length:4}, (_, i) => new Structure(i + 7, 10, [])))
        // right small platform
        structures.concat(Array.from({length:4}, (_, i) => new Structure(i + 19, 10, [])))
        // top platform
        structures.concat(Array.from({length:4}, (_, i) => new Structure(i + 13, 14, [])))

        return new World(
            30,
            20,
            structures
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
