import * as THREE from 'three'

class GameScene extends THREE.Scene {
    /**
     * Creates all the objects of the view
     */
    public initialize(): void {
        this.createLight()
        this.createIncarnations()
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
     * Creates all the incarnations of the view
     */
    private createIncarnations(): void {
        // for now, it only creates a cube

        // geometry = vertices
        const geometry = new THREE.BoxGeometry()
        // material = how the shape will look in terms of colors & textures; here orange
        const material = new THREE.MeshPhongMaterial({color: 0xFFAD00})
        const cube = new THREE.Mesh(geometry, material)
        cube.position.x = 0
        cube.position.y = -1
        cube.position.z = -5
        cube.name = "cube"
        this.add(cube)
    }

    /**
     * Updates everything in the view
     */
    private direction = 1
    public update(): void {
        let cube = this.getObjectByName("cube")
        if (cube != null) {
            if (cube.position.x > 5) {
                this.direction = -1
            } else if (cube.position.x < -5) {
                this.direction = 1
            }
            cube.position.x += 0.05 * this.direction

        } else {
            console.error("Can't find the cube")
        }
    }
}

export {GameScene}
