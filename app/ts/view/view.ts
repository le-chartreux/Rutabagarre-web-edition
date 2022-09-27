import * as THREE from 'three'
import WebGL from 'three/examples/jsm/capabilities/WebGL'
import {GameScene} from "~app/ts/view/game-scene";
import {PhysicalElement} from "~app/ts/world/physical-element";
import {StructureDrawer} from "~app/ts/view/drawer/structure-drawer";

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
        // checking if webgl is available for this browser
        if (! WebGL.isWebGLAvailable()) {
            const errorMessage = "Error: your desktop doesn't support WebGL. Impossible to show the game."
            alert(errorMessage)
            throw new Error(errorMessage)
        }

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
        this._mainCamera = new THREE.PerspectiveCamera(60, this._width / this._height, 1, 1000)
        // setup of the camera: 40 away from the (0, 0), centered on the (0, 0)
        this._mainCamera.position.set(...this.cameraPosition)
        this._mainCamera.lookAt(...this.cameraTarget, 0)

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
        this._mainCamera.position.set(...this.cameraPosition)
        this._mainCamera.lookAt(...this.cameraTarget, 0)
        console.log("position: " + String(this.cameraPosition))
        console.log("target: " + String(this.cameraTarget))
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

    /**
     * @returns a tuple (x, y), the point to where the camera should look at, i.e. the center of the map if there is no
     *  incarnation and the average of the incarnation positions else
     */
    private get cameraTarget(): [number, number] {
        let xMin = Math.min(...this._physicalElementsGetter().map(function(elem: PhysicalElement) { return elem.x }))
        let xMax = Math.max(...this._physicalElementsGetter().map(function(elem: PhysicalElement) { return elem.x }))
        let yMin = Math.min(...this._physicalElementsGetter().map(function(elem: PhysicalElement) { return elem.y }))
        let yMax = Math.max(...this._physicalElementsGetter().map(function(elem: PhysicalElement) { return elem.y }))
        return [(xMin + xMax) / 2, (yMin + yMax) / 2]  // todo include possibility of player-centered camera
    }

    /**
     * @returns a tuple (x, y, z), the point to where the camera is, i.e. the camera target far enough to see all the
     *  players + a margin, so they can see around them if there is players, the whole map else
     */
    private get cameraPosition(): [number, number, number] {
        let fovInRad = (this._mainCamera.fov * 2 * Math.PI) / 360

        // TODO fix it (too small)
        let xMin = Math.min(...this._physicalElementsGetter().map(function(elem: PhysicalElement) { return elem.x }))
        let xMax = Math.max(...this._physicalElementsGetter().map(function(elem: PhysicalElement) { return elem.x }))
        // + 0.5 since object positions are their center
        let distanceForFullX = (((xMax + 0.5) - (xMin - 0.5)) / 2) / Math.tan(fovInRad / 2) / this._mainCamera.aspect

        // TODO fix it (too small)
        let yMin = Math.min(...this._physicalElementsGetter().map(function(elem: PhysicalElement) { return elem.y }))
        let yMax = Math.max(...this._physicalElementsGetter().map(function(elem: PhysicalElement) { return elem.y }))
        // + 0.5 since object positions are their center
        let distanceForFullY = (((yMax + 0.5) - (yMin - 0.5)) / 2) / Math.tan(fovInRad / 2)

        // * 1.1 to have a little more around
        return [...this.cameraTarget, Math.max(distanceForFullX, distanceForFullY) * 1.1]
    }
}

export {View};
