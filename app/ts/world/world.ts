import {PhysicalElement} from "./physical-element";
import {Structure} from "./structure/structure";
import {StructureType} from "~app/ts/world/structure/structure-type";

class World {
    private readonly _delayBetweenComputations = 1000 / 6  // in ms, here 6 computations per second TODO higher

    /**
     * Creates a World, i.e. the main model that manages all the physical elements
     */
    constructor(private _physicalElements: PhysicalElement[] = []) {}

    /**
     * Factory that creates the default world.
     *
     * @returns the default world, a world with a main platform and three other little platforms above
     */
    static createDefaultWorld(): World {
        // TODO from json
        const createDirtBloc = (x: number, y: number): Structure => {
            return new Structure(x, y, [0, 0, 1, 1], StructureType.DIRT)
        }
        // main platform
        let structures: Structure[] = []
        structures.concat(Array.from({length:22}, (_, i) => createDirtBloc(i + 4, 4)))
        structures.concat(Array.from({length:22}, (_, i) => createDirtBloc(i + 4, 5)))
        structures.concat(Array.from({length:20}, (_, i) => createDirtBloc(i + 5, 4)))
        structures.concat(Array.from({length:6}, (_, i) => createDirtBloc(i + 9, 3)))
        structures.push(createDirtBloc(16, 3))
        structures.concat(Array.from({length:3}, (_, i) => createDirtBloc(i + 20, 3)))
        structures.concat(Array.from({length:3}, (_, i) => createDirtBloc(i + 11, 2)))
        structures.push(createDirtBloc(16, 2))

        // left small platform
        structures.concat(Array.from({length:4}, (_, i) => createDirtBloc(i + 7, 10)))
        // right small platform
        structures.concat(Array.from({length:4}, (_, i) => createDirtBloc(i + 19, 10)))
        // top platform
        structures.concat(Array.from({length:4}, (_, i) => createDirtBloc(i + 13, 14)))

        return new World(structures)
    }

    /**
     * Treats changes in the model.
     */
    private tick() {
        this._physicalElements.forEach((element) => element.update())
    }

    /**
     * Starts the model update loop. The model updates every <this._delayBetweenComputations> ms.
     */
    public run() {
        window.setInterval(() => this.tick(), this._delayBetweenComputations)
    }

    /**
     * @returns all the physical elements that constitute this world
     */
    public get physicalElements(): PhysicalElement[] {
        return this._physicalElements
    }
}

export {World};
