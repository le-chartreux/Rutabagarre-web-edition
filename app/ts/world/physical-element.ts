import {Drawable} from "~app/ts/view/drawable";

abstract class PhysicalElement extends Drawable {

    constructor(
        protected x: number,
        protected y: number,
        protected hitboxes: [number, number][][]
    ) {
        super()
    }

    public update(): void {
        console.log("elem updated")
    }

    public touches(otherElem: PhysicalElement): boolean {
        return false  // TODO
    }

}

export {PhysicalElement}
