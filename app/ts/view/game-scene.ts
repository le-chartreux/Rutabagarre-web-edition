import * as THREE from 'three'
import {Drawable} from "~app/ts/view/drawable";

class GameScene extends THREE.Scene {

    /**
     * Clean the scene then creates all the objects
     */
    public draw(): void {
        this.clear()
        this.createLight()
        this.createObjects()
    }

    /**
     * Creates the light of the view. It's a standard light: white and 100% intensity.
     */
    private createLight(): void {
        const light = new THREE.DirectionalLight(0xFFFFFF, 1)
        // above the camera
        light.position.set(0, 4, 2)
        this.add(light)
    }

    /**
     * Creates all the objects of the scene
     */
    private createObjects(): void {
        for (let drawable of Drawable.drawables) {
            if (drawable.visible) {
                this.add(drawable.object3D)
            }
        }
    }
}

export {GameScene}
