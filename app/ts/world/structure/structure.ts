import {PhysicalElement} from "../physical-element";
import * as THREE from "three";


class Structure extends PhysicalElement {

    private cube: any = null
    // geometry = vertices
    private readonly geometry = new THREE.BoxGeometry(1, 1, 1)
    // material = how the shape will look in terms of colors & textures; here orange
    private readonly material = new THREE.MeshStandardMaterial({color: 0xFFAD00})

    public get object3D(): THREE.Object3D {
        // for now, it only creates a cube
        if (this.cube == null) {
            this.cube = new THREE.Mesh(this.geometry, this.material)
        }
        this.cube.position.x = this.x
        this.cube.position.y = this.y
        this.cube.position.z = 0

        return this.cube
    }

}

export {Structure}
