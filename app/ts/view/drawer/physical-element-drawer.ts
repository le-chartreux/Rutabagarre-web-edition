import {PhysicalElement} from "~app/ts/world/physical-element";
import * as THREE from 'three'

interface PhysicalElementDrawer {
    get3dObject(physicalElement: PhysicalElement): THREE.Mesh

    treatPossibleChanges(physicalElement: PhysicalElement, object3DOfThisPhysicalElement: THREE.Object3D): void
}

export type {PhysicalElementDrawer}
