import * as THREE from "three";

abstract class Drawable {

    public static readonly drawables: Drawable[] = []

    /**
     * Creates a Drawable object, and add it to the list of drawables
     */
    protected constructor(public visible: boolean = true) {
        Drawable.drawables.push(this)
    }

    /**
     * Remove this drawable from the list of drawables, and set it invisible.
     */
    public erase() {
        this.visible = false
        const index = Drawable.drawables.indexOf(this, 0)
        if (index > -1) {
            Drawable.drawables.splice(index, 1)
        }
    }

    /**
     * Method that returns the 3D object that represent the drawable element when drawn
    */
    public abstract get object3D(): THREE.Object3D;
}

export {Drawable}
