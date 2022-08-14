import * as THREE from 'three'
import {GameScene} from "~app/ts/view/game-scene";

class View {
    private width: number
    private height: number

    private renderer: THREE.WebGLRenderer
    private mainCamera: THREE.PerspectiveCamera
    private scene: GameScene

    /**
     * Creates a View object, a tool to manage the view.
     */
    constructor() {
        this.width = window.innerWidth
        this.height = window.innerHeight

        // creating the renderer, the tool that draws the part of the view that the camera sees
        // we set it onto the canvas named 'app'
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('app') as HTMLCanvasElement,
            antialias: true
        })
        // the renderer area is the entire page
        this.renderer.setSize(this.width, this.height)
        // the background is blue (the sky)
        this.renderer.setClearColor(0x87ceff)

        // creating the main camera, the tool that decides how and from where the game will be seen
        // vertical field of view is 60, so the camera is like and eye open at 60°
        // aspect ratio is often 16/9
        // objects between <near> and <far> will be visible
        this.mainCamera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 100)
        this.mainCamera.position.set(0, 0, 6)

        // creating the view object, that represents the content that will be rendered
        this.scene = new GameScene()

        // creating the event listener on resize
        window.addEventListener("resize", () => this.onResize())
    }

    /**
     * Updates the view. Each call to <tick> updates the scene, then renders it.
     */
    private tick(): void {
        this.scene.draw()
        this.renderer.render(this.scene, this.mainCamera)
    }

    /**
     * Start the view update loop.
     * Each call to <run> updates the view, then renders it, then asks to call <run> later with the
     * <requestAnimationFrame> function (for better performances than <setTimeout>)
     */
    public run(): void {
        this.tick()
        window.requestAnimationFrame(() => this.run())
    }

    /**
     * Method to update the viewport on resize
     */
    private onResize() {
        // resetting the dimensions
        this.width = window.innerWidth
        this.height = window.innerHeight

        // resetting the renderer area as the entire page
        this.renderer.setSize(this.width, this.height)

        // resetting the aspect ratio
        this.mainCamera.aspect = this.width / this.height
        this.mainCamera.updateProjectionMatrix()
    }
}

export {View};
