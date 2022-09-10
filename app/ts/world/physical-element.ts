abstract class PhysicalElement {

    /**
     * Creates a physical element, i.e. an element that has a hitbox.
     *
     * @param _x: horizontal position of the top-left corner of this element, positive to right negative to left
     * @param _y: vertical position of the top-left corner this element, positive to up negative to down
     * @param _hitbox: rectangle that forms the hitbox of this element,
     *  [top-left x, top-left y, down-right x, down-right y], relatively to the (x, y)
     */
    protected constructor(
        protected _x: number,
        protected _y: number,
        protected _hitbox: [number, number, number, number]
    ) {}

    /**
     * Updates this element (does everything needed on this tick)
     */
    public update(): void {
        console.log("elem updated")  // todo
    }

    /**
     * Method to look if this element intersects with the other element's hitbox
     *
     * @returns if this element's hitbox intersects the other element's hitbox
     */
    public touches(otherElem: PhysicalElement): boolean {
        return false  // TODO
    }

}

export {PhysicalElement}
