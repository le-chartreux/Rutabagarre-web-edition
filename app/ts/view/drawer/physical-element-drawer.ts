import {PhysicalElement} from "~app/ts/world/physical-element";
import * as THREE from 'three'

interface PhysicalElementDrawer {
    get3dObject(physicalElement: PhysicalElement): THREE.Mesh
}

export type {PhysicalElementDrawer}
