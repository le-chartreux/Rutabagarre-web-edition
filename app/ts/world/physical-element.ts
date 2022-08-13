class PhysicalElement {

    constructor(
        private x: number,
        private y: number,
        private hitboxes: [number, number][][]
    ) {}

    public touches(otherElem: PhysicalElement): boolean {
        return false  // TODO
    }

}

export {PhysicalElement}
