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
     * Clean the scene then creates all the objects
     */
    public draw(physicalElements: PhysicalElement[]): void {
        this.clear()
        this.createLight()
        this.createObjects(physicalElements)
    }

    /**
     * Creates the light of the view. It's a standard light: white and 100% intensity.
     */
    private createLight(): void {
        const aLight = new THREE.AmbientLight(0xFFFFFF, 0.1)
        // above the camera
        aLight.position.set(0, 30, 0)
        this.add(aLight)

        const dLight = new THREE.DirectionalLight(0xFFFFFF, 0.6)
        // above the camera
        dLight.position.set(0, 30, 0)
        this.add(dLight)
    }

    /**
     * Creates all the objects of the scene
     */
    private createObjects(physicalElements: PhysicalElement[]): void {
        for (let physicalElement of physicalElements) {
            if (!this.physicalElementDrawers.has(typeof physicalElement)) {
                switch (typeof physicalElement) {
                    case "Structure":
                        // TODO make it work
                        this.physicalElementDrawers.set(typeof physicalElement, new StructureDrawer())
                        break
                    default:
                        console.error("Error: physical element has no drawer found.")
                        return
                }
                let drawer = this.physicalElementDrawers.get(typeof physicalElement) as PhysicalElementDrawer
                this.add(drawer.get3dObject(physicalElement))
            }
        }
    }
}

export {GameScene}
