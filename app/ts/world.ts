import {Bloc} from "~app/ts/bloc/bloc";
import {Entity} from "~app/ts/entity/entity";

class World {
    private width: number
    private height: number
    private blocs: Bloc[]
    private entities: Entity[]

    constructor(width: number, height: number, blocs: Bloc[] = [], entities: Entity[] = []) {
        this.width = width
        this.height = height
        this.blocs = blocs
        this.entities = entities
    }

    static createDefaultWorld(): World {
        let defaultWorld = new World(30, 20)
        return defaultWorld
    }
}

export {World};
