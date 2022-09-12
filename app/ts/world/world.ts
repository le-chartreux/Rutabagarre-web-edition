import {PhysicalElement} from "./physical-element";
import {Structure} from "./structure/structure";
import {StructureType} from "~app/ts/world/structure/structure-type";

class World {
    private readonly _delayBetweenComputations = 1000 / 6  // in ms, here 6 computations per second TODO faster

    /**
     * Creates a World, i.e. the main model that manages all the physical elements
     */
    public constructor(private _physicalElements: PhysicalElement[] = []) {}

    /**
     * Factory that creates the default world.
     *
     * @returns the default world, a world with a main platform and three other little platforms above
     */
    public static createDefaultWorld(): World {
        // TODO from json
        // main platform
        let structures = Array.from({length:22}, (_, i) => new Structure(i + 4, 6, [0, 0, 1, 1], StructureType.DIRT))
        structures.push(...Array.from({length:22}, (_, i) => new Structure(i + 4, 5, [0, 0, 1, 1], StructureType.DIRT)))
        structures.push(...Array.from({length:20}, (_, i) => new Structure(i + 5, 4, [0, 0, 1, 1], StructureType.DIRT)))
        structures.push(...Array.from({length:6}, (_, i) => new Structure(i + 9, 3, [0, 0, 1, 1], StructureType.DIRT)))
        structures.push(new Structure(16, 3, [0, 0, 1, 1], StructureType.DIRT))
        structures.push(...Array.from({length:3}, (_, i) => new Structure(i + 20, 3, [0, 0, 1, 1], StructureType.DIRT)))
        structures.push(...Array.from({length:3}, (_, i) => new Structure(i + 11, 2, [0, 0, 1, 1], StructureType.DIRT)))
        structures.push(new Structure(16, 2, [0, 0, 1, 1], StructureType.DIRT))

        // left small platform
        structures.push(...Array.from({length:4}, (_, i) => new Structure(i + 7, 10, [0, 0, 1, 1], StructureType.DIRT)))
        // right small platform
        structures.push(...Array.from({length:4}, (_, i) => new Structure(i + 19, 10, [0, 0, 1, 1], StructureType.DIRT)))
        // top platform
        structures.push(...Array.from({length:4}, (_, i) => new Structure(i + 13, 14, [0, 0, 1, 1], StructureType.DIRT)))

        return new World(structures)
    }

    /**
     * Treats changes in the model, i.e. updates all the elements.
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
