import {PhysicalElement} from "../physical-element";
import {StructureType} from "~app/ts/world/structure/structure-type";


class Structure extends PhysicalElement {

    /**
     * Creates a structure, that often represents a physical bloc.
     *
     * @param _x: horizontal position of the top-left corner of this structure, positive to right negative to left
     * @param _y: vertical position of the top-left corner this element, positive to up negative to down
     * @param _hitbox: rectangle that forms the hitbox of this element,
     *  [top-left x, top-left y, down-right x, down-right y], relatively to the (x, y)
     * @param _structureType: type of this structure
     */
    public constructor(
        protected _x: number,
        protected _y: number,
        protected _hitbox: [number, number, number, number],
        protected _structureType: StructureType
    ) {
        super(_x, _y, _hitbox);
    }

    public get structureType(): StructureType {
        return this._structureType
    }
}

export {Structure}
