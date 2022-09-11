import * as THREE from 'three'
import {GameScene} from "~app/ts/view/game-scene";
import {PhysicalElement} from "~app/ts/world/physical-element";

class View {
    // page attributes
    private _width: number
    private _height: number
    // three.js attributes
    private _renderer: THREE.WebGLRenderer
    private _mainCamera: THREE.PerspectiveCamera
    private _scene: GameScene

    /**
     * Creates a View object, a tool to manage the view.
     *
     * @param _physicalElementsGetter: function (or method) that when called returns all the physical elements to consider
     */
    constructor(private _physicalElementsGetter: () => PhysicalElement[]) {
        this._width = window.innerWidth
        this._height = window.innerHeight

        // creating the renderer, the tool that draws the part of the view that the camera sees
        // we set it onto the canvas named 'app'
        this._renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('app') as HTMLCanvasElement,
            antialias: true
        })
        // adding a tone mapping so it looks nicer TODO read more about it
        this._renderer.toneMapping = THREE.ACESFilmicToneMapping
        // the renderer area is the entire page
        this._renderer.setSize(this._width, this._height)
        // the background is blue (the sky)
        this._renderer.setClearColor(0x87ceff)

        // creating the main camera, the tool that decides how and from where the game will be seen
        // - vertical field of view is 60, so the camera is like and eye open at 60°
        // - aspect ratio is often 16/9
        // - objects between <near> and <far> will be visible
        this._mainCamera = new THREE.PerspectiveCamera(60, this._width / this._height, 5, 100)
        // setup of the camera: 40 away from the (0, 0), centered on the (0, 0)
        this._mainCamera.position.set(0, 0, 40)  // the closest to 40 the z axis of an element is, nearest it is
        this._mainCamera.lookAt(0, 0, 0)

        // creating the scene object, that represents the content that will be rendered
        this._scene = new GameScene()
    }

    /**
     * Creates the content of the view. Should be called before run
     */
    public initialize(): void {
        this._scene.initialize(this._physicalElementsGetter())
    }

    /**
     * Updates the view. Each call to <tick> actualizes the scene, then renders it.
     */
    private tick(): void {
        this._scene.actualize(this._physicalElementsGetter())
        this._renderer.render(this._scene, this._mainCamera)
    }

    /**
     * Start the view update loop. Setup should be called before run.
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
    public onResize() {
        // resetting the dimensions
        this._width = window.innerWidth
        this._height = window.innerHeight

        // resetting the renderer area as the entire page
        this._renderer.setSize(this._width, this._height)

        // resetting the aspect ratio
        this._mainCamera.aspect = this._width / this._height
        this._mainCamera.updateProjectionMatrix()
    }
}

export {View};
