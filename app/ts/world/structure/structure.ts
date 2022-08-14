import {PhysicalElement} from "../physical-element";
import * as THREE from "three";


class Structure extends PhysicalElement {

    public get object3D(): THREE.Object3D {
        // for now, it only creates a cube

        // geometry = vertices
        const geometry = new THREE.BoxGeometry()
        // material = how the shape will look in terms of colors & textures; here orange
        const material = new THREE.MeshStandardMaterial({color: 0xFFAD00})
        const cube = new THREE.Mesh(geometry, material)
        cube.position.x = this.x
        cube.position.y = this.y
        cube.position.z = -5
        return cube
    }

}

export {Structure}
