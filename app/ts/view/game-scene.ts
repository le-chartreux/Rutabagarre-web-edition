import * as THREE from 'three'
import {PhysicalElement} from "~app/ts/world/physical-element";
import {Structure} from "~app/ts/world/structure/structure";
import {PhysicalElementDrawer} from "~app/ts/view/drawer/physical-element-drawer";
import {StructureDrawer} from "~app/ts/view/drawer/structure-drawer";

class GameScene extends THREE.Scene {

    private physicalElementDrawers: Map<string, PhysicalElementDrawer>

    public constructor() {
        super();
        this.physicalElementDrawers = new Map<string, PhysicalElementDrawer>()
    }

    /**
     * Clean the scene the creates all the objects. Should be called only one time
     */
    public initialize(physicalElements: PhysicalElement[]): void {
        this.clear()
        this.createLights()
        this.add(new THREE.AxesHelper(5))
        // creating all the physical elements
        physicalElements.forEach((value) => this.createPhysicalElement(value))
    }

    /**
     * Actualize all the representations of the physical elements
     */
    public actualize(physicalElements: PhysicalElement[]): void {
        // for each element, treating possible changes
        const allUuidOfChildren = this.children.map((object3D) => object3D.uuid)

        for (const physicalElement of physicalElements) {
            if (allUuidOfChildren.includes(physicalElement.uuid)) {
                // element already draw
                let object3DOfThisPhysicalElement = this.children.filter(
                    (object3D) => object3D.uuid == physicalElement.uuid
                )[0]
                // if it is already draw, it has a drawer
                let drawer = this.physicalElementDrawers.get(physicalElement.constructor.name) as PhysicalElementDrawer
                drawer.treatPossibleChanges(physicalElement, object3DOfThisPhysicalElement)
            } else {
                // element not draw => draw it
                this.createPhysicalElement(physicalElement)
            }
        }

        // for each child, checking if the element still exists (and removing it from the scene if not)
        // TODO
    }

    /**
     * Creates the lights of the view: one ambient light and one directional light
     */
    private createLights(): void {
        const aLight = new THREE.AmbientLight(0xFFFFFF, 0.4)
        aLight.position.set(0, 30, 0)
        this.add(aLight)

        const dLight = new THREE.DirectionalLight(0xFFFFFF, 0.6)
        dLight.position.set(0, 30, 20)
        dLight.lookAt(0, 0, 0)
        this.add(dLight)
    }

    /**
     * Creates one object of the scene
     */
    private createPhysicalElement(physicalElement: PhysicalElement): void {
        if (! this.physicalElementDrawers.has(physicalElement.constructor.name)) {
            // if there is no drawer for this type of physical element, then we create a new drawer
            switch (physicalElement.constructor.name) {
                case Structure.name:
                    this.physicalElementDrawers.set(physicalElement.constructor.name, new StructureDrawer())
                    break
                default:
                    throw Error(`Error: physical element ${physicalElement.constructor.name} has no drawer found.`)
            }
        }
        let drawer = this.physicalElementDrawers.get(physicalElement.constructor.name) as PhysicalElementDrawer
        let element = drawer.get3dObject(physicalElement)
        element.position.set(physicalElement.x, physicalElement.y, 0)
        element.uuid = physicalElement.uuid
        this.add(element)
    }
}

export {GameScene}
