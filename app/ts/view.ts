import * as THREE from 'three'
import {GameScene} from "~app/ts/scene/game-scene";

class View {
    private readonly width
    private readonly height

    private renderer
    private mainCamera
    private scene

    constructor() {
        this.width = window.innerWidth
        this.height = window.innerHeight

        // creating the renderer, the tool that draws the part of the scene that the camera sees
        // we set it onto the canvas named 'app'
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('app') as HTMLCanvasElement
        })
        // the renderer area is the entire page
        this.renderer.setSize(this.width, this.height)

        // creating the main camera, the tool that decides how and from where the game will be seen
        // vertical field of view is 60, so the camera is like and eye open at 60°
        // aspect ratio is often 16/9
        // objects between <near> and <far> will be visible
        this.mainCamera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 100)

        // creating the scene object, that represents the content that will be rendered
        this.scene = new GameScene()
        this.scene.initialize()

    }

    public update(): void {
        this.scene.update()
        this.renderer.render(this.scene, this.mainCamera)
    }

    /**
     * Loop that updates the scene. Each call to <tick> updates the scene, then renders it, then asks to call tick later
     */
    public tick(): void {
        this.scene.update()
        this.renderer.render(this.scene, this.mainCamera)
        window.requestAnimationFrame(() => this.tick())
    }
}

export {View};
